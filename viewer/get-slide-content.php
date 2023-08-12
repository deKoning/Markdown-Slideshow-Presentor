<?php
// get_slide.php

include 'config.php'; // Include the configuration file

if (isset($_GET['filename'])) {
    $filename = $_GET['filename'];
    $filePath = $slidesDir . $filename;

    if (strpos($filePath, $slidesDir) === 0 && endsWith($filePath, '.md')) {
        $slideContent = file_get_contents($filePath);
        if ($slideContent !== false) {
            header('Content-Type: text/plain');
            echo $slideContent;
        } else {
            http_response_code(500);
            echo 'Error loading slide content.';
        }
    } else {
        http_response_code(403);
        echo 'Access denied.';
    }
} else {
    http_response_code(400);
    echo 'Missing filename parameter.';
}

function endsWith($haystack, $needle) {
    $length = strlen($needle);
    if ($length == 0) {
        return true;
    }
    return (substr($haystack, -$length) === $needle);
}
?>
