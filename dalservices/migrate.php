<?php
require_once 'connection/connection.inc.php';
require_once 'query/query.inc.php';

function updateDepartamento() {
    $dep = new Query();
    $dep->select("departamento");
    $q = new Query();
    for ($i = 0; $i < count($dep->result); $i++) {
        $q->update("tmp_conflictos", array("departamento"), array($dep->result[$i]['id']), "departamento = '" . $dep->result[$i]['departamento'] . "'");
    }
}

function update($table, $field = "", $field2 = "") {
    if ($field == "") {
        $field = $table;
        $field2 = $table;
    }
    $dep = new Query();
    $dep->select($table);
    $q = new Query();
    for ($i = 0; $i < count($dep->result); $i++) {
        $q->update("tmp_conflictos", array($field), array($dep->result[$i]['id']), "$field = '" . $dep->result[$i][$field2] . "'");
    }
}

//update("departamento");
//update("ambito");
//update("fuente");
//update("medidasdepresion");
//update("sector", "sectora", "sector");
//update("sector", "sectorb", "sector");
update("tipo");


?>
