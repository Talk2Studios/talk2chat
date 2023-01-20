//inpoertieren der Libarys 
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
// const net = require("net")

// const client = net.connect({port: 8888, host: process.argv[2] ?? "localhost"})

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

var users = ["admin", "Colin", "Niklaus", "Ralle", "user", "Laurenz", "Nevio", "Gian", "Raffael", "Willi", "Nadin", "Julian"]
var userpass = ["admin", "passwd", "passwd", "1234", "user", "1234", "1234", "1234", "1234", "1234", "1234", "1234"]

var rooms = `<div class="chatrooms">
<h2>Rooms</h2>
<div id="waitroom-1" onclick="chancheroom('/wait.html','waitroom-1')" class="roomcon curroom">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span id="wr-1-name" class="name">Waiting Room<span
        class="lmsg">login & sign up</span></span>
  </span>
</div>
<div id="chatroom-1" onclick="chancheroom('/room1.html','chatroom-1')" class="roomcon">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span id="cr-1-name" class="name">Room 1<span class="lmsg" id="lmsg1" >last
        message</span></span>
  </span>
</div>
<div id="chatroom-2" onclick="chancheroom('/room2.html','chatroom-2')" class="roomcon">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span id="cr-2-name" class="name">Room 2<span class="lmsg">last
        message</span></span>
  </span>
</div>
<div id="chatroom-3" onclick="chancheroom('/room3.html','chatroom-3')" class="roomcon">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span id="cr-3-name" class="name">Room 3<span class="lmsg">last
        message</span></span>
  </span>
</div>
</div>
<div id="profile" class="roomcon">
<span class="chatroom">
  <img src="/assets/icon.png" alt="chaticon"><span id="profil-name" class="name">Username<span
      class="lmsg">settings</span></span>
</span>
</div>`


io.on("connection", function (socket) {

    io.to(socket.id).emit("getid", socket.id)

    socket.on("check wait", function (user, pass, sid) {
        if (users.includes(user)) {
            var userposi = users.indexOf(user)
            if (userpass[userposi] == pass) {
                io.to(sid).emit("check true", user, rooms)
                console.log(time() + " 🟩 " + user + " logged in bc | id: " + sid)
            } else {
                console.log(time() + " ❗ falsches pw bc")
                return false
            }
        } else {
            console.log(time() + " ❗ user existiert nicht bc" + user + pass)
            return false
        }
    });

    socket.on("waitlogin", function (user, pass, sid) {
        if (users.includes(user)) {
            var userposi = users.indexOf(user)
            if (userpass[userposi] == pass) {
                io.to(sid).emit("waittrue", user, pass)
                console.log(time() + " 🟩 " + user + " logged in bl | id: " + sid)
            } else {
                io.to(sid).emit("waitfalse")
                console.log(time() + " ❗ falsches pw")
            }
        } else {
            console.log(time() + " ❗ user existiert nicht")
            io.to(sid).emit("waitfalse")
        }
    });

    socket.on("trylogin", function (user, pass, sid) {
        console.log(time() + " 🟩 " + user + " joined Room 1 | id: " + sid)
        if (users.includes(user)) {
            var userposi = users.indexOf(user)
            if (userpass[userposi] == pass) {
                io.to(sid).emit("logintrue", user, pass)

                //wie viele User online sind
                usernum = usernum + 1
                io.emit("user join", usernum, user, { for: "everyone" })
            } else {
                io.to(sid).emit("loginfalse")
                console.log(time() + " ❗ falsches pw")
            }
        } else {
            console.log(time() + " ❗ user existiert nicht")
            io.to(sid).emit("loginfalse")
        }
        socket.on("disconnect", function () {
            //wie viele User online sind
            usernum = usernum - 1
            console.log(time() + " 🟥 a user Leved");
            io.emit("user leave", usernum, { for: "everyone" });

        });
    });

    socket.on("chat message", function (msg, bname) {
        if (users.includes(bname)) {
            if (msg != "") {
                if (msg.length < 501) {
                    if (msg.includes("<")) {
                        if (msg.includes("<img") || msg.includes("<a") || !msg.includes("<script")) {
                            console.log(time() + " 📧 Nachricht versendet von | " + bname + " | " + msg);
                            io.emit("chat message", msg, bname);
                            // client.write("GET /")
                            // client.end()
                        } else {
                            console.log(time() + " 📧🟥 html injection |" + bname + "|");
                            io.emit("chat message", "HTML is not allowed", bname);
                        }
                    }
                    else {
                        console.log(time() + " 📧 Nachricht versendet von | " + bname + " | " + msg);
                        io.emit("chat message", msg, bname);
                    }
                } else {

                    console.log(time() + " 📧🟥 to long |" + bname + "|" + msg.length);
                }
            } else {

                console.log(time() + " 📧🟥 spam |" + bname + "|");
            }
        } else {
            if (bname.length > 15) {
                bname = bname.slice(0, 14)
                console.log(time() + " 📧❗ kein gültiger Name |" + bname + "|");
            } else {
                console.log(time() + " 📧❗ kein gültiger Name |" + bname + "|");
            }
        }


    });
});
function checkTime(l) {
    if (l < 10) {
        l = "0" + l;
    }
    return l;
}

function time() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = today.getDate();
    var mo = today.getMonth();
    var y = today.getFullYear();
    var ms = today.getMilliseconds();
    mo++
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    var alltime = ("[" +/*d + "." + mo + "." + y + " " + */h + ":" + m + ":" + s + "." + ms + "]")
    return alltime;
}