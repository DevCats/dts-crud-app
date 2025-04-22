import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Navbar from './components/Navbar.jsx';
import Table from './components/Table.jsx';

const App = () => {

  const [tableData, setTableData] = useState([]);

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

  return (
    <>
      <Navbar />
      <Table 
        tableData={ tableData }
        setTableData={ setTableData }
      />
    </>
  )
}

export default App
