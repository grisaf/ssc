<?php
require_once 'connection/connection.inc.php';
require_once 'query/query.inc.php';

$query = new Query();
$query->select("conflictos");
?>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title></title>
        <script src="../Test1JQ/js/jquery-1.8.3.js" type="text/javascript"></script>
        <script>
        $.ready(getList);
        function getList() {
            $.getJSON("http://localhost/services/?q=getConflicto&id=1", function(data) {
                var table_obj = $('table');
                $.each(data.items, function(index, item){
                     table_obj.append($('<tr id="'+item.id+'"><td>'+item.data+'</td></tr>'));
                })
            });
        }
        </script>
    </head>
    <body>
        <table border="1">
        </table>
        <button onclick="getList()" value="aa" />
        <?php /* ?>
        <table border="1">
            <tr>
                <?php for ($i = 0; $i < count($query->columnNames); $i++) { ?>
                <th>
                    <?php echo $query->columnNames[$i]; ?>
                </th>
                <?php } ?>
            </tr>
            <?php for ($i = 0; $i < count($query->result); $i++) { ?>
            <tr>
                <?php for ($j = 0; $j < count($query->result[$i]); $j++) { ?>
                <td>
                    <?php echo $query->result[$i][$query->columnNames[$j]]; ?>
                </td>
                <?php } ?>
            </tr>
            <?php } ?>
        </table>
        <?php */ ?>
    </body>
</html>
