<?php
$files = glob("*.json"); // Get all JSON files in the current directory
echo json_encode($files); // Return the list of JSON files as a JSON array
?>
