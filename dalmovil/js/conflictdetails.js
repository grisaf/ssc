//http://192.168.70.102/services/?q=getConflicto&id=1
$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getConflicto.php?id='+id, displayEmployee);
});

function displayEmployee(data) {
	var conflict = data.item;
	console.log(conflict);
	$('#conflictPic').attr('src', 'pics/' + conflict.picture);
	$('#fullName').text(conflict.firstName + ' ' + conflict.lastName);
	$('#conflictTitle').text(conflict.title);
	$('#city').text(conflict.city);
	console.log(conflict.officePhone);
	if (conflict.managerId>0) {
		$('#actionList').append('<li><a href="conflictdetails.html?id=' + conflict.managerId + '"><h3>View Manager</h3>' +
				'<p>' + conflict.managerFirstName + ' ' + conflict.managerLastName + '</p></a></li>');
	}
	if (conflict.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + conflict.id + '"><h3>View Direct Reports</h3>' +
				'<p>' + conflict.reportCount + '</p></a></li>');
	}
	if (conflict.email) {
		$('#actionList').append('<li><a href="mailto:' + conflict.email + '"><h3>Email</h3>' +
				'<p>' + conflict.email + '</p></a></li>');
	}
	if (conflict.officePhone) {
		$('#actionList').append('<li><a href="tel:' + conflict.officePhone + '"><h3>Call Office</h3>' +
				'<p>' + conflict.officePhone + '</p></a></li>');
	}
	if (conflict.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + conflict.cellPhone + '"><h3>Call Cell</h3>' +
				'<p>' + conflict.cellPhone + '</p></a></li>');
		$('#actionList').append('<li><a href="sms:' + conflict.cellPhone + '"><h3>SMS</h3>' +
				'<p>' + conflict.cellPhone + '</p></a></li>');
	}
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
