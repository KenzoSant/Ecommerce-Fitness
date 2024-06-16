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
            labels: ['Jan', 'Fev','Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'], 
            datasets: [{
              label: 'Numero de pedidos por mês',
              data: data, 
              borderColor: 'rgba(255, 99, 132, 0.9)', 
              backgroundColor: 'rgba(255, 99, 132, 0.2)', 
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
                  callback: function(value) {
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
    <div style={{ width: '80%', height: '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;
