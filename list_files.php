<?php
$files = array_values(array_filter(scandir('.'), function($file) {
    return pathinfo($file, PATHINFO_EXTENSION) === 'txt';
}));
echo json_encode($files);
