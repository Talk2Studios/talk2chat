//inpoertieren der Libarys 
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var net = require('net');
var client = net.connect(8888, 'localhost');

var usernum = 0

//Server hosten auf port 80 
http.listen(80, function () {
    console.log("Server is started")
});


app.use((req, res) => {

    if (req.url.slice(-1) == "/") {
        res.sendFile(__dirname + req.url + "index.html")
    } else {
        res.sendFile(__dirname + req.url)
    }
})

io.on("connection", function (socket) {

    io.to(socket.id).emit("getid", socket.id)

    socket.on("disconnect", function () {
        //wie viele User online sind
        usernum = usernum - 1
        console.log("🟥 a user Leved");
        io.emit("user leave", usernum, { for: "everyone" });

    });
});


var users = ["admin", "Colin", "Niklaus", "Ralle", "user", "Laurenz", "Nevio", "Gian", "Raffael", "Willi", "Nadin", "Julian"]
var userpass = ["admin", "passwd", "passwd", "1234", "user", "1234", "1234", "1234", "1234", "1234", "1234", "1234"]


io.on("connection", function (socket) {

    socket.on("trylogin", function (user, pass, sid) {
        console.log("🟩 new user joined | id: " + sid + " | " + user)
        if (users.includes(user)) {
            var userposi = users.indexOf(user)
            if (userpass[userposi] == pass) {
                io.to(sid).emit("logintrue", user, pass)

                //wie viele User online sind
                usernum = usernum + 1
                io.emit("user join", usernum, user, { for: "everyone" })
            } else {
                io.to(sid).emit("loginfalse")
            }
        } else {
            console.log("user nicht vorhanden")
            io.to(sid).emit("loginfalse")
        }
    });

    socket.on("chat message", function (msg, bname) {
        if (bname.length > 20) {
            bname = bname.slice(0, 20)
        } else {
            if (msg != "") {
                if (msg.length < 501) {
                    if (msg.includes("<")) {
                        if (msg.includes("<img") || msg.includes("<a") || !msg.includes("<script")) {
                            console.log("📧 Nachricht versendet von |" + bname + "|" + msg);
                            io.emit("chat message", msg, bname);
                            client.write('Hello from node.js');
                            client.end()
                        } else {
                            console.log("📧🟥 html injection |" + bname + "|");
                            io.emit("chat message", "HTML is not allowed", bname);
                        }
                    }
                    else {
                        console.log("📧 Nachricht versendet von |" + bname + "|" + msg);
                        io.emit("chat message", msg, bname);
                    }
                } else {

                    console.log("📧🟥 to long |" + bname + "|" + msg.length);
                }
            } else {
                console.log("📧🟥 spam |" + bname + "|");
            }
        }

    });
});


