<?php
function connect() {
    $host = "localhost";
    $user = "root";
    $password = "root";
    $db = "conflictos";
    $link = mysql_connect($host, $user, $password);
    mysql_selectdb($db, $link);
    return $link;
}

function disconnect($link) {
    mysql_close($link);
}

?>
