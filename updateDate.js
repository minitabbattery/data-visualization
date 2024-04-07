document.addEventListener("DOMContentLoaded", function() {
    fetch("data.txt")
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split("\n");
            const lastLine = lines[lines.length - 1]; // Get the last line of data
            const [date, time, ...temps] = lastLine.split("\t");
            const formattedDate = formatDate(date); // Format the date
            document.getElementById("lastUpdatedDate").textContent = formattedDate; // Update the HTML element
        })
        .catch(error => console.error("Error fetching data:", error));
});

function formatDate(dateString) {
    const [month, day, year] = dateString.split("/"); // Assuming date format is MM/DD/YYYY
    return `${month}/${day}/${year}`;
}
