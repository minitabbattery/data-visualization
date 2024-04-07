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
                Temp8: [],
		Temp9: [],
                Temp10: []
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
    const numCharts = 10; // 4 rows x 2 columns = 8 charts
    const chartsContainer = document.getElementById("charts-container");
    const chartWidth = 600; // Set the width of each chart canvas
    const chartHeight = 400; // Set the height of each chart canvas

    for (let i = 0; i < numCharts; i++) {
        const chartCanvas = document.createElement("canvas");
        chartCanvas.id = `chartTemp${i + 1}`;
        chartCanvas.width = chartWidth;
        chartCanvas.height = chartHeight;
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
                responsive: false,
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

        // Calculate the row and column for each chart
        const row = Math.floor(i / 2) + 1; // 2 columns per row
        const col = (i % 2) + 1; // 2 columns per row

        // Set the position of the chart within the grid layout
        chartCanvas.style.gridRow = row;
        chartCanvas.style.gridColumn = col;
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
