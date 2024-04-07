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

            plotChart("chartTemp1", "Temp1", labels, tempData.Temp1);
            plotChart("chartTemp2", "Temp2", labels, tempData.Temp2);
            plotChart("chartTemp3", "Temp3", labels, tempData.Temp3);
            plotChart("chartTemp4", "Temp4", labels, tempData.Temp4);
            plotChart("chartTemp5", "Temp5", labels, tempData.Temp5);
            plotChart("chartTemp6", "Temp6", labels, tempData.Temp6);
            plotChart("chartTemp7", "Temp7", labels, tempData.Temp7);
            plotChart("chartTemp8", "Temp8", labels, tempData.Temp8);
        })
        .catch(error => console.error("Error fetching data:", error));
});

function plotChart(canvasId, label, labels, data) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: getRandomColor(),
                backgroundColor: "rgba(0, 0, 0, 0.1)", // Set a transparent background color
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
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

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
