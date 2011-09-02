var express = require('express');
var model = require('./model');
var util = require('./lib/util');

var facebookGameId = "<your_facebook_game_id_here>";
var facebookCanvasUrl = "<your facebook canvas url here>";

var port = process.env.PORT || 3000;
var server = express.createServer();

var base64ToString = function(str) {
    return (new Buffer(str || "", "base64")).toString("ascii");
};

var base64UrlToString = function(str) {
    return base64ToString(base64UrlToBase64(str));
};

var base64UrlToBase64 = function(str) {
    var paddingNeeded = (4 - (str.length % 4));
    for (var i = 0; i < paddingNeeded; i++) {
        str = str + '=';
    }
    return str.replace(/\-/g, '+').replace(/_/g, '/')
};

server.configure(
    function() {
        server.use(express.static(__dirname + '/root/'));
    }
);

server.get('/game',
    function(req, res) {
        util.render(res,'game.html');
    }
);

server.post('/game', function(req,res) {
    res.redirect('http://www.facebook.com/dialog/oauth?client_id='+facebookGameId+'&redirect_uri='+facebookCanvasUrl);
});


server.get(/^.*$/,
    function(req, res) {
        res.redirect('/game.html');
    }
);

server.listen(port);
