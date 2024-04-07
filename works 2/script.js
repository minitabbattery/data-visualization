document.addEventListener("DOMContentLoaded", function() {
    fetch("data.txt")
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split("\n");
            const labels = [];
            const tempData = {
                Temp1: [],
                Temp2: [],
                Temp3: [],
                Temp4: [],
                Temp5: [],
                Temp6: [],
                Temp7: [],
                Temp8: []
            };

            lines.forEach((line, index) => {
                if (index !== 0) { // Skip the header row
                    const [time, ...temps] = line.split("\t");
                    labels.push(time);

                    temps.forEach((temp, i) => {
                        tempData[`Temp${i + 1}`].push(parseFloat(temp));
                    });
                }
            });

            plotMultipleCharts(labels, tempData);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function plotMultipleCharts(labels, tempData) {
    const numCharts = 8; // 4 rows x 2 columns = 8 charts
    const chartsContainer = document.getElementById("charts-container");

    for (let i = 0; i < numCharts; i++) {
        const chartCanvas = document.createElement("canvas");
        chartCanvas.id = `chartTemp${i + 1}`;
        chartCanvas.width = 800; // Set the width of each chart canvas
        chartCanvas.height = 600; // Set the height of each chart canvas
        chartsContainer.appendChild(chartCanvas);

        const ctx = chartCanvas.getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: `Temp${i + 1}`,
                        data: tempData[`Temp${i + 1}`],
                        borderColor: getRandomColor(),
                        borderWidth: 2,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: false, // Set responsive to false to prevent resizing
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                }
            }
        });
    }
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
