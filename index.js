var express = require('express');
var fs = require('fs');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();
var port = process.env.PORT || 4000;

writecount = (data) => {
    fs.writeFile(`count.json`, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }
     
        console.log("JSON file has been saved.");
    });
}

var count = 0;
io.on('connection', (socket) => {    
    count++;
    console.clear();
    console.log(count + " users online.");
    io.emit('usrcount', {count});
    writecount(JSON.stringify({count: count}));

    socket.on('disconnect', () => {
        count--;
        console.clear();
        console.log(count + " users online.");
        io.emit('usrcount', {count});
        writecount(JSON.stringify({count: count}));
    })
})


app.get('/', (req, res) => {
    res.render("index.ejs"); 
});

app.get('/count', (req, res) => {
    res.json({count: count});
})


http.listen(4000, () => {
    console.log(`listening on http://localhost:${port}`);
})