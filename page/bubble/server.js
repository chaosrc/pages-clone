const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req,res)=>{
	let urlPath = url.parse(req.url).pathname;
	console.log('requst '+urlPath);
	if(urlPath === '/') urlPath = 'index.html';
	readFile(urlPath).then((data)=>{
		res.setHeader('Content-Type',mimeType(path.extname(urlPath))) ;
		res.write(data);
	})
	.then(()=>res.end())
	.catch((err)=>{
		res.statecode = 404;
		res.end(urlPath+" not found \n"+err);
	});
});

server.listen(8000,(x)=>{
	console.log('server listening');
	console.log(`please open: 127.0.0.1:8000`);
});

//read file async
function readFile(p){
	if(p[0] === '/'){
		p = p.slice(1);
	}
	return new Promise((resolve,reject)=>{
		fs.readFile(path.resolve(__dirname,p),(err,data)=>{
			if(err) reject();
			resolve(data);
		});
	});
}

function mimeType(ext){
	let mime;
	switch(ext){
		case '.css':
		mime ='text/css';
		break;

		case '.html':
		mime = 'text/html';
		break;

		case '.png': 
		mime = 'image/png';
		break;

		case '.js':
		mime = 'text/javascript';
		break;

		default:
		mime = 'text/plain';

	}
	return mime;
}