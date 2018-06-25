var http = require('http');
var url = require("url");
var path = require('path');
var fs = require("fs");
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/', secret: 'root' });
var zlib = require('zlib');
var express = require('express');
var app = express();

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
    console.log(acceptEncoding);

    let ext = path.extname(pathName);
     ext = ext.split('.').pop();
     if(ext == 'html' || ext =='css'){
       res.setHeader('Content-Type', lookup(pathName));
    }

    if(acceptEncoding && acceptEncoding.indexOf('gzip')!=-1){ // 判断是否需要gzip压缩
      const gzip = zlib.createGzip();
      // 记得响应 Content-Encoding，告诉浏览器：文件被 gzip 压缩过
      res.writeHead(200, {
          'Content-Encoding': 'gzip'
      });
      readStream = fs.createReadStream(pathName).pipe(gzip);
      console.log('************');
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

//http.createServer(function (req, res) {
//  handler(req, res, function (err) {
//    console.log(req.url);
//    var url = '';
    //if(req.url == '/'){
      //req.url = '/index.html';
    //}
//    req.url = '/index.html';
//    url = path.resolve(__dirname,'blog/webpack-blog/dist');
//	console.log(url);
//    var pathName = path.join(url, path.normalize(req.url));
//	console.log(pathName);
//    routeHandler(pathName, req, res);
//  })
//}).listen(4000)

//静态文件
//app.use(express.static(path.join(__dirname, 'blog/webpack-blog/dist')));

app.get('/', function (req, res) {
   handlers(req,res);
});

app.get('*', function (req, res) {
  console.log(req.url)
   handlers(req,res);
});

// 匹配根路径的请求
app.get('/Home', function (req, res) {
   handlers(req,res);
});

app.get('/Posts', function (req, res) {
  handlers(req,res);
});

app.get('/About', function (req, res) {
  handlers(req,res);
});

app.get('/Projects', function (req, res) {
  handlers(req,res);
});

app.get('/Tags', function (req, res) {
  handlers(req,res);
});
app.get(/\d{9}$/, function (req, res) {
  handlers(req,res);
});
function handlers(req,res){
  handler(req, res, function (err) {
    var url = '';
    req.url = '/index.html';
    url = path.resolve(__dirname,'blog/webpack-blog/dist');
        console.log(url);
    var pathName = path.join(url, path.normalize(req.url));
        console.log(pathName);
    routeHandler(pathName, req, res);
  });
}

var server = app.listen(3000);

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})
