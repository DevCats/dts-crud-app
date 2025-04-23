import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Table from './components/Table.jsx';
import Modal from './components/Modal.jsx';

const App = () => {

  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTasks = async() => {
    try {
      const response = await axios.get('http://localhost:3000/api/tasks');
      setTableData(response.data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleSubmit = async(_newTaskData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/tasks', _newTaskData);
      console.log('Client added: ', response.data);
      setTableData((prevData) => [...prevData, response.data]);
    } catch (err) {
      console.error('Error adding task', err.message);
    }
  }

  return (
    <>
      <Navbar 
        onOpen={ () => handleOpen() }
      />
      <Table 
        tableData={ tableData }
        setTableData={ setTableData }
      />
      <Modal 
        isOpen={ isOpen }
        onSubmit={ handleSubmit }
        onClose={ () => setIsOpen(false) }
      />
    </>
  )
}

export default App
