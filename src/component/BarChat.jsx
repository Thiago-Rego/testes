import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesFilialBarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Vendas Mensais",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const monthlySales = data.reduce((acc, item) => {
      const month = new Date(item.data_saida).getMonth() + 1; // 1 a 12 para Janeiro a Dezembro
      const year = new Date(item.data_saida).getFullYear(); // Obtenha o ano
      const key = `${year}-${month}`; // Chave "year-month"
      // Inicializando o valor do mês se não existir
      if (!acc[key]) {
        acc[key] = 0;
      }
      // Acumulando as vendas
      acc[key] += item.vl_atendido;
      return acc;
    });
    // Transformando os dados acumulados em arrays para o gráfico
    const labels = Object.keys(monthlySales)
      .sort()
      .map((key) => {
        const [year, month] = key.split("-");
        return new Date(year, month - 1).toLocaleString("pt-BR", {
          month: "short",
        });
      });
    const salesData = Object.values(monthlySales).sort();

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Vendas Mensais",
          data: salesData,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  }, [data]);
  console.log("Chart", chartData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Gráfico de Vendas Mensais",
      },
    },
  };
  if (loading) {
    return <p>Carregando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return <Bar data={chartData} options={options} />;
};

export default SalesFilialBarChart;
