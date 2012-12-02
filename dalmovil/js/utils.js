var serviceURL = "http://192.168.70.102/services/";

var tipos;
$('#newstep1').live('pageshow', function(event) {
    $.getJSON(serviceURL + '?q=getAllTipos&o=items', function(data) {
        tipos = data.items;
        var options = '';
        $.each(tipos, function(index, tipo) {
            if((tipo.tipo!=null)){
                options += '<option value="' + tipo.id+ '">' + tipo.tipo+ '</option>';
            }
        });
        $("#conflicttype").html(options);
    });
});