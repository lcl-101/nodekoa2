var http = require('http')
var url = require("url")
var path = require('path');
var fs = require("fs")
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'root' })
var zlib = require('zlib');

function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";

  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}

var mimeTypes = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg"
};

function lookup(pathName){
    let ext = path.extname(pathName);
    ext = ext.split('.').pop();
    return mimeTypes[ext] || mimeTypes['txt'];
}

function respondNotFound(req, res) {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    res.end(`<h1>Not Found</h1><p>The requested URL ${req.url} was not found on this server.</p>`);
}
function respondFile(pathName, req, res) {
    var readStream = '';
    var acceptEncoding = req.headers['accept-encoding'];


    let ext = path.extname(pathName);
     ext = ext.split('.').pop();
     if(ext == 'html' || ext =='css'){
       res.setHeader('Content-Type', lookup(pathName));
    }

    if(acceptEncoding && acceptEncoding.indexOf('gzip')!=-1){
      const gzip = zlib.createGzip();

      res.writeHead(200, {
          'Content-Encoding': 'gzip'
      });
      readStream = fs.createReadStream(pathName).pipe(gzip);
    }else{
      readStream = fs.createReadStream(pathName);
    }


    readStream.pipe(res);
}

function routeHandler(pathName, req, res) {
  fs.stat(pathName, (err, stat) => {
      if (!err) {
          respondFile(pathName, req, res);
      } else {
          respondNotFound(req, res);
      }
  });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777);


handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})
