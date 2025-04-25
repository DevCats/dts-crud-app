import axios from 'axios';
import { useState } from 'react';

const Table = ({ tableData, setTableData, searchTerm }) => {

    const [error, setError] = useState(null);

    // Filters current value of tableData based on whether data contains the current value of searchTerm prop
    // Extend proposed functionality of being able to search by ID b/c search by title/description/status seemed more likely
    const filteredData = tableData.filter(task => 
        task.id == searchTerm ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Converts the timestamp returned into a more human-readable format
    // Only considering "en-GB" locale because original spec was for HMCTS & assumed overseas work would likely not be allowed
    const convertDate = (_timestamp) => {
        const fullDate = new Date(_timestamp);
        const date = fullDate.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
        const time = fullDate.toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit" });
        return `${date} @ ${time}`;

    }

    // Deletes a task, and then updates the current tableData state
    const handleDelete = async(_id) => {
        const confirmDelete = window.confirm("Are you sure you would like to delete this task?");
        if (confirmDelete) {
            try{
                await axios.delete(`http://localhost:3000/api/tasks/${_id}`);
                setTableData((prevData) => prevData.filter(task => task.id !== _id));
            } catch (err) {
                setError(err.message);
            }
        }
    }

    // Updates status of a task
    // No state changes as <select> change does not necessitate re-rendering
    const handleUpdate = async(_id, _newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/tasks/${_id}`, { status: _newStatus });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <>
            {error && <div className="alert alert-error">{error}</div>}

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due</th>
                    </tr>
                    </thead>
                    <tbody>
                        { filteredData.map(task => (
                            <tr className="hover:bg-base-300" key={`row-id-${task.id}`}>
                                <th>{ task.id }</th>
                                <td>{ task.title }</td>
                                <td>{ task.description || '' }</td>
                                <td>
                                    <select className="select" defaultValue={ task.status } onChange={ (e) => handleUpdate(task.id, e.currentTarget.value) }>
                                        <option>Not Started</option>
                                        <option>In Progress</option>
                                        <option>Stuck</option>
                                        <option>Complete</option>
                                    </select>
                                </td>
                                <td>{ convertDate(task.due) }</td>
                                <td>
                                    <button className="btn btn-secondary btn-sm btn-wide" onClick={ () => handleDelete(task.id) }>Delete</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table