<?php
$directory = __DIR__ . '/markdown_files/';

$mdFiles = array_filter(scandir($directory), function($file) {
  return pathinfo($file, PATHINFO_EXTENSION) === 'md';
});

// Convert the array to a list of filenames
$mdFileList = array_values($mdFiles);

header('Content-Type: application/json');
echo json_encode($mdFileList);
?>
