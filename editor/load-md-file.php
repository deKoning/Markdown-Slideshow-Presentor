<?php
$filename = $_GET['filename'];

$directory = __DIR__ . '/markdown_files/';

if (!is_dir($directory)) {
    die('Markdown directory does not exist.');
}

$filePath = $directory . $filename;

if (!file_exists($filePath)) {
    die('Markdown file not found.');
}

$markdownContent = file_get_contents($filePath);

header('Content-Type: text/plain');
echo $markdownContent;
?>
