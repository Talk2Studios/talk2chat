//inpoertieren der Libarys 
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const net = require("net")

const client = net.connect({port: 8888, host: process.argv[2] ?? "192.168.128.100"})

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
});

var users = ["admin", "Colin", "Niklaus", "Ralle", "user", "Laurenz", "Nevio", "Gian", "Raffael", "Willi", "Nadin", "Julian"]
var userpass = ["admin", "passwd", "passwd", "1234", "user", "1234", "1234", "1234", "1234", "1234", "1234", "1234"]



io.on("connection", function (socket) {

    socket.on("waitlogin", function (user, pass, sid) {
        if (users.includes(user)) {
            var userposi = users.indexOf(user)
            if (userpass[userposi] == pass) {
                io.to(sid).emit("waittrue", user, pass)
                console.log("🟩 logged in | id: " + sid + " | " + user)
            } else {
                io.to(sid).emit("waitfalse")
                console.log("❗ falsches pw")
            }
        } else {
            console.log("❗ user existiert nicht")
            io.to(sid).emit("waitfalse")
        }
    });

    socket.on("trylogin", function (user, pass, sid) {
        console.log("🟩 new user joined Room 1 | id: " + sid + " | " + user)
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
        socket.on("disconnect", function () {
            //wie viele User online sind
            usernum = usernum - 1
            console.log("🟥 a user Leved");
            io.emit("user leave", usernum, { for: "everyone" });

        });
    });

    socket.on("chat message", function (msg, bname) {
        if (users.includes(bname)) {
            if (msg != "") {
                if (msg.length < 501) {
                    if (msg.includes("<")) {
                        if (msg.includes("<img") || msg.includes("<a") || !msg.includes("<script")) {
                            console.log("📧 Nachricht versendet von |" + bname + "|" + msg);
                            io.emit("chat message", msg, bname);
                            client.write("GET /")
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
        } else {
            if (bname.length > 15) {
                bname = bname.slice(0, 14)
                console.log("📧🟥 kein gültiger Name |" + bname + "|");
            } else {
                console.log("📧🟥 kein gültiger Name |" + bname + "|");
            }
        }


    });
});