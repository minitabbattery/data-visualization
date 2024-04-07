document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch JSON file names from server
    function fetchJsonFiles() {
        fetch('http://localhost:8001/desktop/data/data-visualization/list_files.php') // Update the URL with the correct port
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const jsonFileSelect = document.getElementById('jsonFileSelect');
                jsonFileSelect.innerHTML = ''; // Clear existing options
                data.forEach(fileName => {
                    const option = document.createElement('option');
                    option.value = fileName;
                    option.text = fileName;
                    jsonFileSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error fetching JSON files:', error);
            });
    }

    // Fetch JSON file names when the page loads
    fetchJsonFiles();
});
