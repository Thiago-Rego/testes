import { useEffect, useState } from "react";
import axios from "axios";

const TestComponent2 = () => {
  const [data, setData] = useState([]);
  const [selectedFilial, setSelectedFilial] = useState([7]);
  const [year, setYear] = useState([new Date().getFullYear()]);
  const [month, setMonth] = useState([new Date().getMonth() + 1]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/sales/resumo");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        alert("Erro ao buscar dados. Por favor, tente novamente mais tarde.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const filtered = data.filter((item) => {
        const itemYear = new Date(item.data_saida).getFullYear();
        const itemMonth = new Date(item.data_saida).getMonth();
        return (
          (selectedFilial === null || item.cod_filial === selectedFilial) &&
          itemYear === year &&
          itemMonth === month
        );
      });

      setFilteredData(filtered);
    }
  }, [data, selectedFilial, year, month]);

  console.log("Filtered Data:", data); // Para depuração

  return <div></div>;
};

export default TestComponent2;
