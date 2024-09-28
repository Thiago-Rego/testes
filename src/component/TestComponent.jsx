import { useEffect, useState } from "react";
import axios from "axios";

const TestComponent = () => {
  // Declaração dos estados para armazenar os dados recebidos da API
  const [data, setData] = useState([]);
  const [sales, setSales] = useState([]);
  const [month, setMonth] = useState([]);

  // Efeito colateral para buscar dados da API quando o componente for montado
  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchData = async () => {
      try {
        // Requisição GET para a API para buscar dados
        const response = await axios.get("http://127.0.0.1:8000/sales/resumo");

        // Atualiza o estado 'data' com os dados recebidos da API
        setData(response.data);

        // Mapeia os dados recebidos para extrair vendas e meses
        const sales = response.data.map((item) => item.vl_atendido);
        const month = response.data.map((item) => item.data_saida);

        // Atualiza os estados 'sales' e 'month' com os valores extraídos
        setMonth(month);
        setSales(sales);
      } catch (error) {
        // Loga qualquer erro que ocorra durante a requisição
        console.log(error);
      }
    };
    fetchData(); // Chamada da função para buscar dados quando o componente é montado
  }, []);
  console.log(data);

  return (
    <div>
      <h1>Teste</h1>
      <p>Este é um componente de teste</p>
    </div>
  );
};

export default TestComponent;
