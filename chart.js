// Pridobi podatke iz localStorage
let data = JSON.parse(localStorage.getItem("exerciseData")) || {};

// Razvrsti datume po kronološkem vrstnem redu
let sortedDates = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

// Pretvori datume v prikazno obliko (npr. "25.4.")
let labels = sortedDates.map(dateStr => {
  let d = new Date(dateStr);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
});

// Ustvari podatke za sklece (totalReps) in max set (maxSets[0])
let totalRepsData = sortedDates.map(dateStr => data[dateStr].totalReps);
let maxSetsData = sortedDates.map(dateStr => data[dateStr].maxSets[0]);

// Ustvari graf
const ctx = document.getElementById('exerciseChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: labels,
    datasets: [
      {
        label: 'Sklece',
        data: totalRepsData,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      },
      {
        label: 'Max',
        data: maxSetsData,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        fill: false,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Število',
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Datum',
          color: '#333',
          font: {
            size: 14
          }
        }
      }
    }
  }
});
