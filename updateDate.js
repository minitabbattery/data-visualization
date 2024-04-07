document.addEventListener("DOMContentLoaded", function() {
    fetch("data.txt")
        .then(response => response.headers.get('last-modified')) // Get the last modified date from response headers
        .then(lastModified => {
            const lastUpdatedDateElement = document.getElementById("lastUpdatedDate");
            const formattedDate = new Date(lastModified).toLocaleString(); // Format the last modified date
            lastUpdatedDateElement.textContent = formattedDate; // Update the text content of the span element
        })
        .catch(error => console.error("Error fetching data:", error));
});
