import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Table from './components/Table.jsx';
import Modal from './components/Modal.jsx';

const App = () => {

  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetches all tasks, orders them by ASC ID, and updates tableData state
  const fetchTasks = async() => {
    try {
      const response = await axios.get('https://dts-crud-app-backend.vercel.app/api/tasks');
      response.data.sort((a, b) => a.id - b.id);
      setTableData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Creates a task, and then updates the current tableData state
  const handleCreate = async(_newTaskData) => {
    try {
      const response = await axios.post('https://dts-crud-app-backend.vercel.app/api/tasks', _newTaskData);
      console.log('Client added: ', response.data);
      setTableData((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.error('Error adding task', err.message);
    }
  }

  const handleOpen = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Navbar 
      // Attaching handleOpen to onOpen prop so I don't have to pass in isOpen
        onOpen={ () => handleOpen() }
        onSearch={ setSearchTerm }
      />
      <Table 
        tableData={ tableData }
        setTableData={ setTableData }
        searchTerm={ searchTerm }
      />
      <Modal 
        isOpen={ isOpen }
        onCreate={ handleCreate }
        // e was passed to prevent the form attempting to submit on close
        // Unsure why this was the case - something to do with event bubbling/propagation?
        onClose={ (e) => {
          e.preventDefault(); 
          setIsOpen(false) 
        }}
      />
    </>
  )
}

export default App
