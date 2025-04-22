import { useState } from 'react';
import axios from 'axios';

const Table = ({ tableData, setTableData }) => {

    // const tableData = [
    //     {id: 1, title: "Task #1", description: "Description for task #1", status: "Not Started", due: "2025-04-28 13:00:00+01"},
    //     {id: 2, title: "Task #2", description: "Description for task #2", status: "In Progress", due: "2025-05-05 10:00:00+01"},
    //     {id: 3, title: "Task #3", description: "Description for task #3", status: "Stuck", due: "2025-05-12 17:00:00+01"},
    //     {id: 4, title: "Task #4", description: "Description for task #4", status: "Complete", due: "2025-05-19 12:30:00+01"},
    // ];

    const handleDelete = async(_id) => {
        const confirmDelete = window.confirm("Are you sure you would like to delete this task?");
        if (confirmDelete) {
            try{
                await axios.delete(`http://localhost:3000/api/tasks/${_id}`);
                setTableData((prevData) => prevData.filter(task => task.id !== _id));
            } catch (err) {
                console.error(err.message);
            }
        }
    }

    const handleUpdate = async(_id, _newStatus) => {
        try {
            await axios.put(`http://localhost:3000/api/tasks/${_id}`, { status: _newStatus });
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <>
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
                        { tableData.map(task => (
                            <tr className="hover:bg-base-300" key={`row-id-${task.id}`}>
                                <th>{ task.id }</th>
                                <td>{ task.title }</td>
                                <td>{ task.description }</td>
                                <td>
                                    <select className="select" defaultValue={ task.status } onChange={ (e) => handleUpdate(task.id, e.currentTarget.value) }>
                                        <option>Not Started</option>
                                        <option>In Progress</option>
                                        <option>Stuck</option>
                                        <option>Complete</option>
                                    </select>
                                </td>
                                <td>{ task.due }</td>
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