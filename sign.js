var http = require('http');
/**
 * 接口转发
 */
 exports.find = function(req,success){
     var headers = req.headers;
     headers.host = 'https://api.github.com';
     var options = {
 	    host: 'https://api.github.com',
 	    path: '/repos/lcl-101/webpack-blog/issues',
 	    method: 'GET',
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'X-Requested-With, Content-Type'
      }
     };
     var req = http.request(options, function(res) {
      console.log(res.on);
 	    res.setEncoding('utf8');
      console.log(234);
 	    res.on('data', function (data) {
        console.log(data);
 	      var data = JSON.parse(data);
 	      success(res,data);
 	    });
     });
     req.on('error', function(e){
        console.log("auth_user error: " + e.message);
     });
     req.end();
 }
