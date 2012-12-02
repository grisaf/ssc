$(function(){
	defineDataTable();
    defineTableRowAction();
});

var serverName = 'http://192.168.70.102/services/';
//var serverName = 'http://localhost/services/';

var oTable;
function defineDataTable() {
    oTable = $('#tableList').dataTable( {
        "bSort": true,
        "bFilter": true,
        "bAutoWidth": false,
        "bProcessing": true,
        "iDisplayLength": 50,
        "bSortClasses": false,
        "sAjaxSource": serverName + '?q=getAllAmbitos&o=aaData',
        "aoColumns": [
            { "mDataProp": "ambito", "sTitle": "Descripcion"},
            { "mDataProp": "id", "sTitle": "Id", "sName" : "Id", "bVisible":false },
            { "mDataProp": "id", sWidth:"25px", "bSortable": false, "fnRender": function ( oObj ) {
				var id = oObj.aData['id'];
				return "<a href='#' onclick='deleteData(" + id + ", event)' > <img src='images/delete.png' title='Eliminar'/> </a>";
			}}
        ],
        "aaSorting": [[0,'asc']]
	});

    oTable.$('td').hover( function() {
        var iCol = $('td', this.parentNode).index(this) % 5;
        $('td:nth-child('+(iCol+1)+')', oTable.$('tr')).addClass( 'highlighted' );
    }, function() {
        oTable.$('td.highlighted').removeClass('highlighted');
    } );
}

function defineTableRowAction() {
    $('#tableList tbody td').live('click', function (event) {
        var aPos = oTable.fnGetPosition( this );
	    var aData = oTable.fnGetData( aPos[0] );
	    var id = aData['id'];
        var description = aData['tipo'];

        setEditionData( id, description );
        displayEditionPanel( true );
    });
}

function cancelActionPanel() {
    $("#tipoEditar").val( "" );
    displayEditionPanel( false );
    displayAddPanel( false );
}

function setEditionData( id, description ) {
    $("#idEditar").val( id );
    $("#tipoEditar").val( description );
}

function displayEditionPanel( display ) {
    displayPanel( "editPanel", display );
}

function displayAddPanel( display ) {
    displayPanel( "addPanel", display );
}

function displayPanel( optionName, display ) {
    if( display ) {
        $("#blocker").css({"display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
        $("#dialogPanel").removeAttr( "style" );
        $("#" + optionName).removeAttr( "style" );
        $("#tipoEditar").focus();
    } else {
        $("#" + optionName).attr( "style", "display:none;" );
        $("#dialogPanel").attr( "style", "display:none;" );
        $("#blocker").attr( "style", "display:none;" );
    }
}

function editData() {
    var id = $("#idEditar").val();
    var description = $("#tipoEditar").val();

    $.post( serverName, { q:'postAmbito', a: 'u', id: id, va: description },
    function(data) {
        refreshTable();
        displayEditionPanel( false );
    });
}

//, XDEBUG_SESSION_START:'netbeans-xdebug'
function addData() {
    var description = $("#tipoAdicionar").val();
    $.post( serverName, { q:'postAmbito', a: 'i', va: description },
    function(data) {
        refreshTable();
        displayEditionPanel( false );
    });
}

function deleteData( id, event ) {
    cancelWindowEvent( event );
    $.post( serverName, { q:'postAmbito', a: 'd', id: id },
    function(data) {
        refreshTable();
    });
}

function refreshTable() {
    oTable.fnReloadAjax();
}

function cancelWindowEvent( event ) {
	if(window.event) {
        window.event.cancelBubble = true;
    } else {
        event.stopPropagation();
    }
}