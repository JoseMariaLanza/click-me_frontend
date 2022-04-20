import Spinner from 'react-bootstrap/Spinner';

const RenderTableBody = ({ page, updating }) => {
    return !updating ? page.data.map((value, index) => {
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
    }) :
        <>
            <tr>
                <td colSpan={3}>
                    <Spinner animation='grow' role='status'></Spinner>
                </td>
            </tr>
        </>
}

export default RenderTableBody