<?php
header('Access-Control-Allow-Origin: *');

require_once 'connection/connection.inc.php';
require_once 'query/query.inc.php';

$request = $_REQUEST["q"];
$extra = "";
if (isset($_REQUEST["li"])) {
    $limit = $_REQUEST["li"];
    $extra = " limit $limit ";
}
if (isset($_REQUEST["of"])) {
    $offset = $_REQUEST["of"];
    $extra .= " offset $offset ";
}


if ($request == "getAllConflictos") {
    $obj = $_REQUEST["o"];
    $query = new Query();
    if ($extra == "") {
        $query->select("usuario u join conflictos c on c.usuario = u.id");
    } else {
        $query->select("usuario u join conflictos c on c.usuario = u.id", "1 = 1", $extra);
    }
    for ($i = 0; $i < count($query->result); $i++) {
        foreach ($query->result[$i] as $key => $value) {
            $result[$i][$key] = utf8_encode($value);
        }
    }
    echo '{"' . $obj . '":' . json_encode($result) . '}';
}
if ($request == "getConflicto") {
    $obj = $_REQUEST["o"];
    $id = $_REQUEST["id"];
    $query = new Query();
    $query->select("conflictos", "id = '$id'");
    for ($i = 0; $i < count($query->result); $i++) {
        foreach ($query->result[$i] as $key => $value) {
            $result[$i][$key] = utf8_encode($value);
        }
    }
    echo '{"' . $obj . '":' . json_encode($result) . '}';
}
if ($request == "getAllTipos") {
    $obj = $_REQUEST["o"];
    $query = new Query();
    $query->select("tipo");
    for ($i = 0; $i < count($query->result); $i++) {
        foreach ($query->result[$i] as $key => $value) {
            $result[$i][$key] = utf8_encode($value);
        }
    }
    echo '{"' . $obj . '":' . json_encode($result) . '}';
}
if ($request == "postTipo") {
    $action = $_REQUEST['a'];
    $id = $_REQUEST['id'];
    $value = $_REQUEST['va'];
    $table = "tipo";
    $query = new Query();
    if ($action == "i") {
        $query->insert($table, array($id, $value));
    } else if ($action == "u") {
        $query->update($table, array("tipo"), array($value), "id = '$id'");
    } else if ($action == "d") {
        $query->delete($table, "id = '$id'");
    }
    echo json_encode($result);
}
if ($request == "postTipo") {
    $action = $_REQUEST['a'];
    $id = $_REQUEST['id'];
    $value = $_REQUEST['va'];
    $table = "tipo";
    $query = new Query();
    if ($action == "i") {
        $query->insert($table, array($id, $value));
    } else if ($action == "u") {
        $query->update($table, array("tipo"), array($value), "id = '$id'");
    } else if ($action == "d") {
        $query->delete($table, "id = '$id'");
    }
    echo json_encode($query->result);
}
if ($request == "postConflicto") {
    $action = $_REQUEST['a'];
    $id = $_REQUEST['id'];
    $nro = $_REQUEST['nro'];
    $actora = $_REQUEST['actora'];
    $sectora = $_REQUEST['sectora'];
    $actorb = $_REQUEST['actorb'];
    $sectorb = $_REQUEST['sectorb'];
    $localidad = $_REQUEST['localidad'];
    $provincia = $_REQUEST['provincia'];
    $departamento = $_REQUEST['departamento'];
    $asunto = $_REQUEST['asunto'];
    $resumen = $_REQUEST['resumen'];
    $tipo = $_REQUEST['tipo'];
    $ambito = $_REQUEST['ambito'];
    $fecha = date("yyyy-mm-dd");
    $medidasdepresion = $_REQUEST['medidasdepresion'];
    $nivel = $_REQUEST['nivel'];
    $alcance = $_REQUEST['alcance'];
    $salida = $_REQUEST['salida'];
    $longitud = $_REQUEST['longitud'];
    $latitud = $_REQUEST['latitud'];
    $usuario = $_REQUEST['usuario'];
    $table = "conflictos";
    $query = new Query();
    if ($action == "i") {
        $query->insert($table, array($id, $nro, $actora, $sectora, $actorb, $sectorb, $localidad, $provincia, $departamento, $asunto, $resumen, $tipo, $ambito, $fecha, $medidasdepresion, $nivel, $alcance, $salida, $longitud, $latitud, $usuario));
    } else if ($action == "u") {
        $query->update($table, array("nro", "actora", "sectora", "actorb", "sectorb", "localidad", "provincia", "departamento", "asunto", "resumen", "tipo", "ambito", "fecha", "medidasdepresion", "nivel", "alcance", "salida", "longitud", "latitud", "usuario"), array($nro, $actora, $sectora, $actorb, $sectorb, $localidad, $provincia, $departamento, $asunto, $resumen, $tipo, $ambito, $fecha, $medidasdepresion, $nivel, $alcance, $salida, $longitud, $latitud, $usuario), "id = '$id'");
    } else if ($action == "d") {
        $query->delete($table, "id = '$id'");
    }
    echo json_encode($query->result);
}
if ($request == "getAllConflictosPage") {
    $page = $_REQUEST["p"];
    $pageSize = $_REQUEST["ps"];
    $query = new Query();
    $query->select("usuario u join conflictos c on c.usuario = u.id");
    $result['total'] = count($query->result);
    $result['page'] = $page;
    $ini = $page * $pageSize;
    $fin = $ini + $pageSize;
    $result['ini'] = $ini;
    $result['fin'] = $fin;
    $j = 0;
    for ($i = $ini; $i < count($query->result) && $i < $fin; $i++) {
        foreach ($query->result[$i] as $key => $value) {
            $result['rows']['cell'][$j++][$key] = utf8_encode($value);
        }
    }
    echo json_encode($result);
}

?>
