<?php

$db = "darcikhe_movies";
$user = "darcikhe_movieus";
$pass = "B3~}K$!4(4d[";
$srv = "localhost";
$host = "localhost";
$charset = "utf8mb4";

/* local dev
$db = "darcikhe_movies";
$user = "movie_user";
$pass = "password";
$srv = "192.168.64.2";
$host = "192.168.64.2";
$charset = "utf8mb4";
*/

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
   PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
   PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
   PDO::ATTR_EMULATE_PREPARES   => false,
];
$pdo = new PDO($dsn, $user, $pass, $opt);

$movieId = $_POST["id"];

$stmt = $pdo->prepare("DELETE FROM movies WHERE id = ?");
$deleted = $stmt->execute([$movieId]);

http_response_code(200);
//echo "you sent ". $name . " " . $studio. " " . $year . " " . $description . " " .$price;
//echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
echo "movie has been deleted!"
?>