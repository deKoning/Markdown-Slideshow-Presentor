<?php
// get_slides.php
include 'config.php'; // Include the configuration file

$slides = array_diff(scandir($slidesDir), array('..', '.'));

header('Content-Type: application/json');
echo json_encode(array_values($slides));
?>
