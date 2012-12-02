$(function(){
    loadConflictos();
});

var serverName = 'http://192.168.70.102/services/';
var ini = 0;

function loadConflictos() {
    $.getJSON(serverName + '?q=getAllConflictos&o=items', function(data) {
        var items = data['items'];
        for( var i=ini; i<10; i++ ) {
            var record = items[i];
            $('#content').append( getStructureConflicto( record['id'], record['asunto'], record['resumen'], record['sectora'], record['actora'], record['sectorb'], record['actorb'], record['localidad'], record['medidasdepresion'] ));
        }
        ini += 10;
    });
}

function loadMostRecent() {
    $.getJSON(serverName + '?q=getAllConflictos&o=items', function(data) {
        var items = data['items'];
        $.each( items, function() {
            $('#content').prepend( getStructureConflicto( record['id'], this['asunto'],  this['sectora'], this['actora'], this['sectorb'], this['actorb'], this['localidad'], this['medidasdepresion'] ));
        });
    });
}

function loadMore() {
    $.getJSON(serverName + '?q=getAllConflictos&o=items', function(data) {
        var items = data['items'];
        for( var i=ini; i< ini + 10; i++ ) {
            var record = items[i];
            $('#content').append( getStructureConflicto( record['id'], record['asunto'],  record['sectora'], record['actora'], record['sectorb'], record['actorb'], record['localidad'], record['medidasdepresion'] ));
        }
        ini += 10;
    });
}

 var conflicts;

            var infowindows = [];

            var marks = [];

            function removeInfowindows() {
                for (i = 0; i < infowindows.length; i++) {
                    infowindows[i].setMap(null);
                }
            }

            function getNearest(la, lo) {
                var pos = -1;
                var d = 9999999999;
                $.each(marks, function(index, mark){
                    if (index != 0) {
                        var ll = mark.get('position');
                        var lla = la - ll.lat();
                        var llo = lo - ll.lng();
                        var dd = Math.sqrt(lla * lla + llo * llo);
                        if (dd < d) {
                            d = dd;
                            pos = index;
                        }
                    }
                });
                if (pos != -1) {
                    $("#info").html("Parece que estas cerca de un conflicto, ¿sabes algo? click aqui.").click(function() {
                       infowindows[pos].open(marks[pos].getMap(), marks[pos]);
                    });
                }
            }

function showDetails( id ) {
    $.getJSON(serverName + '?q=getConflicto&id=' + id + '&o=item', function(data) {
        var item = data['item'];
        var record = item[0];

        $("#asuntoText").text( record['asunto'] );
        $("#sectora").text( record['sectora'] );
        $("#actora").text( record['actora'] );
        $("#sectorb").text( record['sectorb'] );
        $("#actorb").text( record['actorb'] );
        $("#resumenText").text( record['resumen'] );
        $("#presion").text( record['medidasdepresion'] );

        navigator.geolocation.getCurrentPosition(function(position){
            var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: clientPosition,
                zoom: 17,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map($('#map_canvas').get(0), mapOptions);
            var mark = new google.maps.Marker({position: clientPosition, bounds: true, title: "Usted esta aqui.", clickable: true, map: map});
            var infowindow = new google.maps.InfoWindow({
                content: "Usted esta aqui.",
                position: clientPosition
            });
            google.maps.event.addListener(mark, 'click', function() {
                removeInfowindows();
                infowindow.open(mark.get('map'), mark);
            });
            infowindows[0] = infowindow;
            marks[0] = mark;
            var shape = new google.maps.Circle({
                strokeWeight: 0,
                fillColor: "#008595",
                fillOpacity: 0.25,
                center: clientPosition,
                radius: 500,
                clickable: false,
                map: map
            });
            var query = "?q=getAllConflictos&o=items&li=10&of=0";
            var json = $.getJSON(serverName + query, function(data) {
                conflicts = data.items;
                $.each(conflicts, function(index, conflict) {
                    if (conflict.longitud != 0 && conflict.latitud != 0) {
                        var newPosition = new google.maps.LatLng(conflict.latitud, conflict.longitud);
                        var mark2 = new google.maps.Marker({position: newPosition, map: map});
                        var infowindow2 = new google.maps.InfoWindow({
                            content: "<a href=''>" + conflict.asunto + "<br>" + conflict.tipo + "</a>", //link al detalle del conflicto
                            position: clientPosition
                        });
                        google.maps.event.addListener(mark2, 'click', function() {
                            removeInfowindows();
                            infowindow2.open(mark2.get('map'), mark2);
                        });
                        infowindows[infowindows.length] = infowindow2;
                        marks[marks.length] = mark2;
                    }
                });
                getNearest(position.coords.latitude, position.coords.longitude);
            });
            google.maps.event.addListener(map, 'click', function(event) {
                removeInfowindows();
            });
        });

        displayAddPanel(true);
    });
}

function displayAddPanel( display ) {
    displayPanel( "moreInformation", display );
}

function displayPanel( optionName, display ) {
    if( display ) {
        $("#blocker").css({"display": "block", opacity: 0.7, "width":$(document).width(),"height":$(document).height()});
        $("#dialogPanel").removeAttr( "style" );
        $("#" + optionName).removeAttr( "style" );
    } else {
        $("#" + optionName).attr( "style", "display:none;" );
        $("#dialogPanel").attr( "style", "display:none;" );
        $("#blocker").attr( "style", "display:none;" );
    }
}

function loadNew() {
    $('#content').prepend( getStructureConflicto( "", "asunto", "sectorA", "actorA", "sectorB", "actorB", "localidad", "presion" ) );
}

function getStructureConflicto( id, asunto, resumen, sectorA, actorA, sectorB, actorB, localidad, presion ) {
    return '<div class="record">'+
        '<div id="recordTitle' + id + '" class="recordTitle">'+
            '<a href="#" onclick="showDetails(' + id + ');" title="' + resumen + '">' + asunto + '</a>' +
        '</div>'+
        '<div class="recordContent">'+
            '<div class="involucrados">'+
                '<table>'+
                    '<tr>'+
                        '<td>'+
                            '<a href="#">' + sectorA + '</a>: <a href="#">' + actorA + '</a>'+
                        '</td>'+
                        '<td>'+
                            '<a class="viewMode"href="#">Ver mas...</a>'+
                        '</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<td>'+
                            '<a href="#">' + sectorB + '</a>: <a href="#">' + actorB + '</a>'+
                        '</td>'+
                        '<td>'+
                            '<a class="viewMode" href="#">Ver mas...</a>' +
                        '</td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+
            '<div><span class="text_format_02">Localidad:</span> ' + localidad + '</div>'+
            '<div><span class="text_format_02">Medida de Presion:</span> ' + presion + '</div>'+
            '<div class="social2">'+
                            '<fb:like href="https://www.google.com" show_faces="false" width="80" layout="button_count" send="true"></fb:like>'+
                            '<fb:share-button href="https://www.google.com" type="button"></fb:share-button>'+
                            '<a href="https://twitter.com/share" class="twitter-share-button" data-lang="es" data-url="http://test.com/aquiurl" data-via="CSS" text=""></a>'+
                        '</div>'+
        '</div>'+
    '</div>';
}


                                   /*
<div class="record">
    <div class="recordTitle">
        Asunto
    </div>
    <div class="recordContent">
        <div class="involucrados">
            <table>
                <tr>
                    <td>
                        <a class="invA" href="#">SectorA</a>: <a href="#">ActorA</a>
                    </td>
                    <td>
                        <a class="invB" href="#">SectorB</a>: <a href="#">ActorB</a>
                    </td>
                </tr>
            </table>
        </div>
        <div>Localidad</div>
        <div>Medida de Presion</div>
    </div>
</div>

                                           */