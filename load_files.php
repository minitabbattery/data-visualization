<?php
$file = $_GET['file'];
$contents = file_get_contents($file);
echo json_encode($contents);
