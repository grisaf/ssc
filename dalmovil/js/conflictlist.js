var serviceURL = "http://192.168.70.102/services/";

var conflicts;

$('#conflictListPage').bind('pageinit', function(event) {
	getConflictList();
});
function getConflictList() {
	$.getJSON(serviceURL + '?q=getAllConflictos&o=items&li=10&of=0', function(data) {
		$('#conflictList li').remove();
		conflicts = data.items;
		$.each(conflicts, function(index, conflict) {
			$('#conflictList').append('<li><a href="conflictdetails.html?id=' + conflict.id + '">' +
                    '<img src="img/thumbMap.png"/>'+
                    '<h1>' + conflict.asunto + '</h1>' +
					'<h4>' + conflict.actora + ' <b>contra</b> ' + conflict.actorb + '</h4>' +
					'<p>Medidas: ' + conflict.medidasdepresion + '</p>' +
                    '<p>Autor: ' + conflict.nombre +' '+conflict.apellidos+'</p>' +
					'<span class="ui-li-count">' + 'Ver Conflicto' + '</span></a></li>');
		});
		$('#conflictList').listview('refresh');
	});
}