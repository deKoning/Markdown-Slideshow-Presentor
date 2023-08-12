<?php
$markdownContent = $_POST['markdownContent'];
$filename = $_POST['filename'];

$directory = __DIR__ . '/markdown_files/';

if (!is_dir($directory)) {
    mkdir($directory, 0777, true);
}

$filePath = $directory . $filename;

if (file_put_contents($filePath, $markdownContent) !== false) {
    echo json_encode(array('status' => 'success', 'message' => 'Markdown content saved successfully.'));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Error saving Markdown content.'));
}
?>
