<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $file = $_FILES['file']['tmp_name'];
    $columnIndex = $_POST['columnIndex'];
    $lines = file($file, FILE_IGNORE_NEW_LINES);
    $data = [];
    foreach ($lines as $line) {
        $values = explode("\t", $line);
        $data[] = [$values[0], $values[$columnIndex]];
    }
    echo json_encode($data);
}
?>
