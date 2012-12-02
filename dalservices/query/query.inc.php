<?php
class Query {
    var $columnNames;
    var $result;
    var $link;
    
    function Query() {
        $this->columnNames = array();
        $this->queryResult = array(array());
        $this->link = connect();
    }
    
    function select($table, $condition = "1 = 1", $extra = "") {
        $sql = "select * from $table where $condition $extra";
        $result = mysql_query($sql, $this->link);
        $i = 0;
        while ($i < mysql_num_fields($result)) {
            $meta = mysql_fetch_field($result, $i);
            $this->columnNames[$i] = $meta->name;
            $i++;
        }
        $i = 0;
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $this->result[$i++] = $row;
        }
        mysql_free_result($result);
    }
    
    function selectColumns($table, $columns, $condition = "1 = 1", $extra = "") {
        $cols = "";
        for ($i = 0; $i < count($columns); $i++) {
            if ($i != 0) {
                $cols .= ", ";
            }
            $cols .= $columns[$i];
        }
        $sql = "select $cols from $table where $condition $extra";
        $result = mysql_query($sql, $this->link);
        $i = 0;
        while ($i < mysql_num_fields($result)) {
            $meta = mysql_fetch_field($result, $i);
            $this->columnNames[$i] = $meta->name;
            $i++;
        }
        $i = 0;
        while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
            $this->result[$i++] = $row;
        }
        mysql_free_result($result);
    }
    
    function insert($table, $values) {
        $vals = "";
        for ($i = 0; $i < count($values); $i++) {
            if ($i != 0) {
                $vals .= ", ";
            }
            $vals .= "'" . $values[$i] . "'";
        }
        $sql = "insert into $table values ($vals)";
        $result = mysql_query($sql, $this->link);
        $this->columnNames[0] = "result";
        $this->result[0] = mysql_affected_rows($this->link);
    }

    function insertColumns($table, $columns, $values) {
        $cols = "";
        for ($i = 0; $i < count($columns); $i++) {
            if ($i != 0) {
                $cols .= ", ";
            }
            $cols .= $columns[$i];
        }
        $vals = "";
        for ($i = 0; $i < count($values); $i++) {
            if ($i != 0) {
                $vals .= ", ";
            }
            $vals .= "'" . $values[$i] . "'";
        }
        $sql = "insert into $table ($cols) values ($vals)";
        $result = mysql_query($sql, $this->link);
        $this->columnNames[0] = "result";
        $this->result[0] = mysql_affected_rows($this->link);
    }
    
    function update($table, $columns, $values, $condition = "1 = 1") {
        $cols = "";
        for ($i = 0; $i < count($columns); $i++) {
            if ($i != 0) {
                $cols .= ", ";
            }
            $cols .= $columns[$i] . " = ";
            $cols .= "'" . $values[$i] . "'";
        }
        $sql = "update $table set $cols where $condition";
        $result = mysql_query($sql, $this->link);
        $this->columnNames[0] = "result";
        $this->result[0] = mysql_affected_rows($this->link);
    }
    
    function delete($table, $condition = "1 = 1") {
        $sql = "delete from $table where $condition";
        $result = mysql_query($sql, $this->link);
        $this->columnNames[0] = "result";
        $this->result[0] = mysql_affected_rows($this->link);
    }
    
}
/*
include 'config.php';
*/
function getAll() {
    $sql = "select * from conflictos limit 1";

    $dbhost = "localhost";
    $dbname = "conflictos";
    $dbuser = "root";
    $dbpass = "root";
    try {
           $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);        
           $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           $stmt = $dbh->query($sql);  
           $employees = $stmt->fetchAll(PDO::FETCH_OBJ);
           $dbh = null;
           echo '{"items":'. json_encode($employees) .'}'; 
    } catch(PDOException $e) {
           echo '{"error""text":'. $e->getMessage() .'}}'; 
    }
}

?>
