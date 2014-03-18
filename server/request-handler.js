exports.handleRequest = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "text/plain ";


  if(request.method ==="GET"){
    response.writeHead(statusCode, headers);
    response.end("GET worked");

  } else if(request.method ==="POST"){
    var str = '';
    response.writeHead(statusCode, headers);
    
    request.on('data', function(chunk){
     str += chunk;
    });

    
    request.on('end', function(){
      var parsedStr = JSON.parse(str);
      console.log(parsedStr);
      response.end("POST worked");
    });
  }

};

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
