function inviaRichiesta(method, url, parameters={}) {
	let contentType;
	console.log(parameters);
	contentType="application/x-www-form-urlencoded;charset=utf-8";

	return $.ajax({
		url: url,
		contentType:contentType,
		data: parameters,
		type: method,
		dataType:"JSON",
		timeout: 5000,      // default
	});
}

function error(jqXHR) {
	if (jqXHR.status == 0)
		alert("server timeout");
	else if (jqXHR.status == 200)
		alert("Formato dei dati non corretto : " + jqXHR.responseText);
	else
		alert("Server Error: " + jqXHR.status + " - " + jqXHR.responseText);
}