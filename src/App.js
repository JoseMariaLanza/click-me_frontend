import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import useClickList from './hooks/useClickList';
import { Form } from 'react-bootstrap';

function App() {

  const clickHistory = useClickList('http://localhost:8000/api/')
  const [timesClicked, setTimesClicked] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    setTimesClicked(timesClicked+1)
    console.log(timesClicked)
  }

  return (
    <div className="App">
      <div className='vertical-center'>
        <div className='container'>
          {clickHistory.data ?
            <div>
              <Card>
                <Card.Body>
                  <Card.Title>{timesClicked}</Card.Title>
                  <Card.Text>
                    The value will be reset to 0 after 12:00:00 AM.
                  </Card.Text>
                  <Form>
                    <Button variant="primary" type='submit' onClick={e => handleSubmit(e)}>Click Me!</Button>
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
                  {clickHistory.data.map((value, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          {value.id}
                        </td>
                        <td>
                          {value.times_clicked}
                        </td>
                        <td>
                          {value.updated_at}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div> :
            <Spinner animation='grow' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
