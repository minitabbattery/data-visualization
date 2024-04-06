document.addEventListener('DOMContentLoaded', function() {
    fetch('temp.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Parse the data from temp.txt
            const rows = data.trim().split('\n');
            const labels = [];
            const amps = [];
            const volts = [];

            rows.forEach(row => {
                // Split each row by tabs or spaces (whitespace)
                const [amp, volt] = row.split(/[\t\s]+/);
                labels.push('Data Point'); // You can customize labels as needed
                amps.push(parseFloat(amp));
                volts.push(parseFloat(volt));
            });

            // Create a chart using Chart.js for Amps
            const ctxAmps = document.getElementById('chartAmps').getContext('2d');
            const chartAmps = new Chart(ctxAmps, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Amps',
                        data: amps,
                        borderColor: 'blue',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Amps Data Visualization'
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Amps'
                            }
                        }
                    }
                }
            });

            // Create a chart using Chart.js for Volts
            const ctxVolts = document.getElementById('chartVolts').getContext('2d');
            const chartVolts = new Chart(ctxVolts, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Volts',
                        data: volts,
                        borderColor: 'red',
                        borderWidth: 1,
                        fill: false
                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        display: true,
                        text: 'Volts Data Visualization'
                    },
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: 'Volts'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
