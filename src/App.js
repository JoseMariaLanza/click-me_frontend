import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import useClickList from './hooks/useClickList';
import RenderTableBody from './components/RenderTableBody';

const API_URL = 'http://localhost:8000/api/'

function App() {

  const clickHistory = useClickList(API_URL)
  const [updating, setUpdating] = useState(false)
  const [updateClickHistory, setUpdateClickHistory] = useState(null)
  const [timesClicked, setTimesClicked] = useState(clickHistory[1])
  const [submit, setSubmit] = useState(false)
  const [increment, setIncrement] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimesClicked(timesClicked + 1)
    setIncrement(true)
    setSubmit(true)
  }

  useEffect(() => {
    if (clickHistory[0].data && !increment) {
      setTimesClicked(clickHistory[1])
    }

    if (submit) {


      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ times_clicked: timesClicked }),
      }

      const timer = setTimeout(() => {
        setUpdating(true)
        fetch(API_URL, requestOptions)
          .then(response => response.json())
          .then(response => {
            setSubmit(false)
            if (response.errorInfo) {
              console.log(response.errorInfo)
              return response
            }
            setUpdating(false)
            console.log('updated: ', response)
            setTimesClicked(response.data.initial_value)
            setUpdateClickHistory(response.data.page)
            return response.data.page
          })
          .catch(error => console.log(error))
      }, 1500);
      return () => {
        setUpdating(false)
        return clearTimeout(timer)
      }
    }
  }, [timesClicked, clickHistory[0], clickHistory[1], submit, increment]);

  return (
    <div className="App">
      <div className='vertical-center'>
        <div className='container'>
          {clickHistory[0].data ?
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>{timesClicked}</Card.Title>
                  <Card.Text>
                    The value will be reset to 0 after 12:00:00 AM.
                  </Card.Text>
                  <Form>
                    <Button variant="primary" type='submit'
                      onClick={!updating ? e => handleSubmit(e) : null}
                      disabled={updating}>
                      {updating ? 'Loading…' : 'Click Me!'}</Button>
                  </Form>
                </Card.Body>
              </Card>

              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Times Clicked</th>
                    <th>Last Time Clicked</th>
                  </tr>
                </thead>
                <tbody>
                  <RenderTableBody updating={updating} page={updateClickHistory ? updateClickHistory : clickHistory[0]} />
                </tbody>
              </Table>
            </div> :
            <Spinner animation='grow' role='status'></Spinner>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
