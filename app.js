var http = require("http"),
	fs = require("fs"),
	parser = require("./parser_vars"),
	p = parser.parse_vars;
	servidor = http.createServer();

	var parametros = [],
		valores = [],
		arreglo_parametros = [];

const mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'jpg'  : 'image/jpg',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

servidor.on('request',function(req,res){
	var body = [];
	var metodo = req.method;
	var ruta = req.url;
	if(ruta=="/"){
		ruta = "/index.html";
	}
	req.on('data',function(chunk){
		body.push(chunk);
	}).on('end',function(){
		body = Buffer.concat(body).toString();
	});
	fs.readFile("."+ruta,function(err,contenido){
		if (!err) {
			var html_string = contenido.toString();
			if(metodo=="POST" && ruta=="/respuesta.html"){

			//Obteniendo variables y datos
			if(body.indexOf('&') > 0){
				var body_datos = body.split('&');
				arreglo_parametros = body_datos;
				console.log(arreglo_parametros);
			}
					
			for (var i=0; i<arreglo_parametros.length; i++){
				var parametro = arreglo_parametros[i];
				var param_data = parametro.split('=');
				parametros[i] = param_data[0];
				valores[i] = param_data[1];
				
			}
				console.log(body);
				//console.log(parametros);
				//console.log(valores);

			for(var i = 0; i<parametros.length; i++){
				html_string = html_string.replace('{'+parametros[i]+'}', valores[i]);
			}
				
			}
			
			var vec = ruta.split('.');
			var tipo = vec[vec.length-1];
			tipomime = mime[tipo];
			console.log(tipomime);
	        res.writeHead(200, {'Content-Type': tipomime});
			res.write(html_string);
			res.end();
		}
	});
}).listen(3000);