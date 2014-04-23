var gatewayData = [];

$(document).ready(function() {
	populateDropdown();
	$(":button").on("click", function(){
		populateTable($('select').val());
	});
});

function populateDropdown() {
	var content = '';
	var array = [];

	$.getJSON('/users/gateways', function(data) {
		$.each(data, function(){
			if ($.inArray(this.gateway, array) === -1) {
				array.push(this.gateway);
				content += '<option value="';
				content += this.gateway+'">';
				content += this.gateway+'</option>';
			}	
		});
		$('#selectionDropdown select').html(content);
	});
}

function populateTable(value) {
	var content = '';
	$.getJSON('/users/gateways', function(data) {
		$.each(data, function(){
			if (value === this.gateway) {
				content += '<tr>';
				content += '<td>'+this.gateway+'</td>';
				content += '<td>'+convertEpoch(this.timestamp)+'</td>';
				content += '<td>'+this.watts+'</td>';
				content += '</tr>';
			}
		});
		$('#gatewayList table tbody').html(content);
	});
}

function convertEpoch(timestamp) {
	var date = new Date(timestamp*1000);
	return (date.toLocaleString());
}