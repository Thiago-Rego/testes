import{ useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fechData = async () => {
      const response = await axios.get('https://127.0.0.1:8000/sales.resumo');
      setData(response.data);
    };
    fechData();
  }, [data]);

  return (
   <div>Hellow</div>
  )
}

export default App
