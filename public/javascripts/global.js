var gatewayData = [];

$(document).ready(function() {
	populateTable();
});

function populateTable() {
	var content = '';
	$.getJSON('/users/gateways', function(data) {
		$.each(data, function(){
			content += '<tr>';
			content += '<td>'+this.gateway+'</td>';
			content += '<td>'+convertEpoch(this.timestamp)+'</td>';
			content += '<td>'+this.watts+'</td>';
			content += '</tr>';
		});
		$('#gatewayList table tbody').html(content);
	});
}

function convertEpoch(timestamp) {
	var date = new Date(timestamp*1000);
	return (date.toGMTString() + date.toLocaleString());
}