var http = require("http"),
	fs = require("fs"),
	parser = require("./parser_vars"),
	servidor = http.createServer();

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
				html_string = html_string.replace("{nombre}","Hola Mundo");
				console.log(body);
			}
			var vec = ruta.split('.');
	        var tipo = vec[vec.length-1];
	        res.writeHead(200, {'Content-Type': tipo});
			res.write(html_string);
			res.end();
		}
	});
}).listen(3000);