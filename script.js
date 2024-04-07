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
                Temp5: []
            };

            lines.forEach((line, index) => {
                if (index !== 0) { // Skip the header row
                    const [time, temp1, temp2, temp3, temp4, temp5] = line.split("\t");
                    labels.push(time);

                    tempData.Temp1.push(parseFloat(temp1));
                    tempData.Temp2.push(parseFloat(temp2));
                    tempData.Temp3.push(parseFloat(temp3));
                    tempData.Temp4.push(parseFloat(temp4));
                    tempData.Temp5.push(parseFloat(temp5));
                }
            });

            plotChart("chartTemp1", "Temp1", labels, tempData.Temp1);
            plotChart("chartTemp2", "Temp2", labels, tempData.Temp2);
            plotChart("chartTemp3", "Temp3", labels, tempData.Temp3);
            plotChart("chartTemp4", "Temp4", labels, tempData.Temp4);
            plotChart("chartTemp5", "Temp5", labels, tempData.Temp5);
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
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
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
