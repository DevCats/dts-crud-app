import { useState } from 'react';

const Modal = ({ isOpen, onClose, onCreate }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [due, setDue] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const taskData = { title, description, status, due };
            await onCreate(taskData);
            onClose();
        } catch (err) {
            console.error('Unable to create task', err.message);
        }
    }

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={ isOpen }>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">Task Details</h3>
                    <form method="dialog" onSubmit={ handleSubmit }>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Title</legend>
                            <input type="text" className="input" placeholder="Type here" onChange={ (e) => setTitle(e.target.value) } />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Description</legend>
                            <textarea className="textarea h-24" placeholder="Type here" onChange={ (e) => setDescription(e.target.value) }></textarea>
                            <div className="fieldset-label">Optional</div>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Status</legend>
                            <select defaultValue="Select..." className="select" onChange={ (e) => setStatus(e.target.value) }>
                                <option disabled={true}>Select...</option>
                                <option>Not Started</option>
                                <option>In Progress</option>
                                <option>Stuck</option>
                                <option>Complete</option>
                            </select>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Due Date</legend>
                            <input type="datetime-local" className="input" onChange={ (e) => setDue(e.target.value) }/>
                        </fieldset>
                    
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={ onClose }>✕</button>
                        <button type="submit" className="btn btn-success mt-4">Create</button>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default Modal