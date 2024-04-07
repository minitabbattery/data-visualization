document.addEventListener('DOMContentLoaded', function () {
    const fileSelect = document.getElementById('fileSelect');
    fetchFiles().then(files => {
        files.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
            option.textContent = file;
            fileSelect.appendChild(option);
        });
    });

    fileSelect.addEventListener('change', handleFileSelect);
});

async function fetchFiles() {
    const response = await fetch('list_files.php');
    const files = await response.json();
    return files;
}

function handleFileSelect() {
    const selectedFile = document.getElementById('fileSelect').value;
    fetch(`load_file.php?file=${selectedFile}`)
        .then(response => response.json())
        .then(data => populateColumnSelect(data));
}

function populateColumnSelect(data) {
    const lines = data.split('\n');
    const select = document.getElementById('columnSelect');
    select.innerHTML = '';
    lines[0].split('\t').forEach((column, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = column;
        select.appendChild(option);
    });
}

function plotData() {
    const selectedFile = document.getElementById('fileSelect').value;
    const columnIndex = document.getElementById('columnSelect').value;
    fetch(`load_file.php?file=${selectedFile}`)
        .then(response => response.json())
        .then(data => {
            const lines = data.split('\n');
            const fileData = lines.slice(1).map(line => line.split('\t').map(parseFloat));
            const selectedData = fileData.map(row => [row[0], row[columnIndex]]);
            drawPlot(selectedData);
        });
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
