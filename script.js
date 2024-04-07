document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);
});

function handleFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        const lines = contents.split('\n');
        const select = document.getElementById('columnSelect');
        select.innerHTML = '';
        lines[0].split('\t').forEach((column, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = column;
            select.appendChild(option);
        });
    };
    reader.readAsText(file);
}

function plotData() {
    const file = document.getElementById('fileInput').files[0];
    const columnIndex = document.getElementById('columnSelect').value;
    const reader = new FileReader();
    reader.onload = function (e) {
        const contents = e.target.result;
        const lines = contents.split('\n');
        const data = lines.slice(1).map(line => line.split('\t').map(parseFloat));
        const selectedData = data.map(row => [row[0], row[columnIndex]]);
        drawPlot(selectedData);
    };
    reader.readAsText(file);
}

function drawPlot(data) {
    const plotContainer = document.getElementById('plotContainer');
    plotContainer.innerHTML = '';

    const trace = {
        x: data.map(row => row[0]),
        y: data.map(row => row[1]),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue' },
        line: { shape: 'linear' }
    };

    const layout = {
        title: 'Temperature vs Time',
        xaxis: { title: 'Time' },
        yaxis: { title: 'Temperature' }
    };

    Plotly.newPlot('plotContainer', [trace], layout);
}
