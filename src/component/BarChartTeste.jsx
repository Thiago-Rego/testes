import { useEffect, useState } from "react";
import axios from "axios";

const BarChartTeste = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/sales/filial");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setError(
          "Erro ao buscar dados. Por favor, tente novamente mais tarde."
        );
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const monthlySales = {};

    data.forEach((item) => {
      const month = new Date(item.mes).getMonth() + 1;
      const year = new Date(item.mes).getFullYear();
      const key = `${year}-${month}`;
      const filial = item.cod_filial;
      const sales = item.total_venda;

      const salesKey = `${filial}-${key}`;

      if (!monthlySales[salesKey]) {
        monthlySales[salesKey] = [];
      }
      monthlySales[salesKey] += sales;

      console.log({ monthlySales });
      return { filial, sales, month, key };
    });
  }, [data]);

  return (
    <div>
      <h1>BarChartTeste</h1>
    </div>
  );
};

export default BarChartTeste;
