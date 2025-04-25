// Pridobi podatke
let data = JSON.parse(localStorage.getItem("exerciseData")) || {};

// Sortiraj datume po času (chronological)
let sortedDates = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

// Pripravi labels (npr. 10.4., 11.4., ...)
let labels = sortedDates.map(dateStr => {
  let d = new Date(dateStr);
  return `${d.getDate()}.${d.getMonth() + 1}.`;
});

// Pripravi podatke za graf (npr. totalReps)
let dataPoints = sortedDates.map(dateStr => data[dateStr].totalReps);

// Ustvari graf
const ctx = document.getElementById('exerciseChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{
      label: 'Ponovitve',
      data: dataPoints,
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
