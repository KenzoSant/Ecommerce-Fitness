import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios'; // Importar o axios para fazer requisições HTTP

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/dashboard');
        const data = response.data;

        const ctx = chartRef.current.getContext('2d');


        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            datasets: [{
              label: 'Numero de pedidos por mês',
              data: data,
              borderColor: '#f6a40c',
              backgroundColor: '#f6a40c',
              borderWidth: 2,
              pointRadius: 7,
              pointHoverRadius: 15
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function (value) {
                    if (value % 1 === 0) {
                      return value;
                    }
                  }
                }
              },
            },
          },
        });

      } catch (error) {
        console.error('Erro ao buscar dados do endpoint:', error);
      }
    };

    fetchData();

  }, []);

  return (
    <div className="list">
      <h1>Dashboard</h1>
      <div style={{ width: '80%', height: '100%' }}>
        <canvas ref={chartRef} />
      </div>
    </div>

  );
};

export default LineChart;
