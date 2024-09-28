import { useEffect, useState } from "react";
import axios from "axios";

const TestComponent2 = () => {
  const [data, setData] = useState([]);
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/sales/resumo");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filteredData = data.filter(
        (item) =>
          new Date(item.data_saida).getFullYear() === year &&
          new Date(item.data_saida).getMonth() === month
      );

      setFilteredData(filteredData);
    }
  }, [data, year, month]);

  console.log("Year:", year, "Month:", month, "Filtered Data:", filteredData); // Para depuração

  return (
    <div>
      <h1>Teste</h1>
      <p>Este é um componente de teste</p>
      {/* Exiba os dados filtrados, se necessário */}
      {filteredData.length > 0 && (
        <ul>
          {filteredData.map((item, index) => (
            <li key={index}>{JSON.stringify(item.data)}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TestComponent2;
