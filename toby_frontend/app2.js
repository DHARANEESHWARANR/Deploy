import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom';
import FormPage from './components/FormPage';
import HomePage from './components/HomePage';
function App() {
  const [message, setMessage] = useState('');
  const [data,setData] = useState('');

  useEffect(() => {
    axios.get('http://192.168.32.134:3001/api/welcome/index') // Adjust the port if necessary
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
      console.log(setMessage)
      
  }, []);

  const handlClick = async()=>{
    const response = axios.get('http://192.168.32.134:3001/api/welcome/index');
    setData((await response).data.message);
  }
  return (
    // <div>
    //   <h1>{message}</h1>
    //   <button onClick={handlClick}>click here..</button>
    //   <h1>{data}</h1>
    // </div>
    <Router>
          <div>
       <h1>{message}</h1>
      <button onClick={handlClick}>click here..</button>
       <h1>{data}</h1>
        </div>
         <div>
          <h1>Welcome To My Toby</h1>
          <button>
            <Link to="/form">Click Here</Link>
          </button>
         </div>
         <Routes>
            <Route path="/form" element={<FormPage />} />
            <Route path="/" element={<HomePage />} />
         </Routes>
    </Router>
  );
}

export default App;
