function parse_vars(url){
    var arreglo_parametros = [];
    var parametros = [];
    var valores = [];
	if(url.indexOf("?")>0){
		var url_data = url.split("?");
		arreglo_parametros = url_data[1].split("&");
	}
	for(var i=0;i<arreglo_parametros.length;i++){
		var parametro = arreglo_parametros[i];
		var param_data = parametro.split("=");
		parametros[i] = param_data[0];
		valores[i] = param_data[1];
	}
	return {
		parametros: parametros,
		valores: valores
	}
}
module.exports.parse_vars = parse_vars;