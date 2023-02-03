const { pid } = require("process");

//inpoertieren der Libarys 
try {
    // const { stat } = require("fs");

    var app = require("express")();
    var http = require("http").Server(app);
    var io = require("socket.io")(http);
    const net = require('net');
    const client = new net.Socket();
    // const client = net.connect({port: 8888, host: process.argv[2] ?? "localhost"})

    //how many Uers are logged in

    var usernum = 0

    // Wich Users are online in witch room

    var roomparray = []

    //Which Users are logged in on multiple devices/tabs

    var roompdouble = []

    // all Open rooms

    var openrooms = ["0", "1", "2", "3"]
    var crooms = ["1", "2", "3"]

    var openroomsdouble = []

    // max number of signups per min

    var signup = 10

    var signupindex = 0

    var signupdelay = 30000

    // number of send messages

    var msdnum = 0

    // Version of the chat

    var version = "v0.4.9"

    //Hosting server on port 80

    http.listen(5500, function () {
        console.log("Server is started")
        // setTimeout(sendserveron, 500)
        // function sendserveron() {
        //     io.emit("consolelog", time() + "Server is started")
        // }

    });


    app.use((req, res) => {

        var urlx = req.url.split("?");
        var urlx = urlx[0];
        if (urlx.slice(-10) == "/room.html") {
            console.log(req.query.room)
            res.send(sendRoom(req.query.room))

        } else if (urlx.slice(-1) == "/") {
            res.sendFile(__dirname + urlx + "index.html")
        } else {
            res.sendFile(__dirname + urlx)
        }
    })


    // class Connecton {
    //     constructor(yx) {

    //     }
    //     test(test2) {
    //         console.log(test2)
    //     }
    // }


    // client.connect(8888, '192.168.101.102', function () {

    //     try {
    //         // send("AUTH admin 1234");
    //         // send("USER CREATE xyz 1234");
    //         send("AUTH admin 1234");
    //         send("USER DELETE xyz");

    //         console.log('Connected to server');
    //     } catch (err) {
    //         console.log("Error Error Error")
    //     }
    // });

    // client.on('data', function (data) {
    //     console.log(data.toString());
    //     // client.write("EOF");
    // });

    // client.on('close', function () {
    //     console.log('Connection closed');
    // });

    // function send(message) {
    //     client.write(message + "\n")
    // }



    var users = ["admin", "Colin", "Niklaus", "Ralle", "user", "Laurenz", "Nevio", "Gian", "Raffael", "Willi", "Nadin", "Julian", "Nico", "Benjamin", "Loris", "Nat", "Florian", "Robin", "Silvan", "Timi", "Dilay", "Oliver_Macher", "Rubén_Fructuoso"]
    var userpass = ["password", "passwd", "passwd", "1234", "user", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234"]
    var pusers = []
    var puserpass = []

    var roomsalowed = [1, 2, 3,]

    var roompasrt1 = `<div id="chatroom-`
    var roompasrt2 = `" onclick="chancheroom('/room`
    var roompasrt3 = `.html','chatroom-`
    var roompasrt4 = `')" class="roomcon">
<span class="chatroom">
  <img src="/assets/icon.png" alt="chaticon"><span id="cr-`
    var roompasrt5 = `-name" class="name">Room `
    var roompasrt6 = `<span class="lmsg" id="room`
    var roompasrt7 = `lastmsg" >last
      message</span></span>
</span>
</div>`

    var rooms0 = `<div id="chatroom-01" onclick="chancheroom('/adminpanels.html','chatroom-01')" class="roomcon">
<span class="chatroom">
  <img src="/assets/adminico.png" alt="chaticon"><spanclass="name">Admin Panel<span class="lmsg"><br>Controle Panel</span></spanclass=>
</span>
</div>
<div id="chatroom-0" onclick="chancheroom('/adminroom.html','chatroom-0')" class="roomcon">
  <span class="chatroom">
    <img src="/assets/adminico.png" alt="chaticon"><span id="admin-1-name" class="name">Admin Chat<span
        class="lmsg">Bussines</span></span>
  </span>
</div>
`

    var beforrooms = `<div class="chatrooms">
<h2>Rooms</h2>
<div id="waitroom-1" onclick="chancheroom('/wait.html','waitroom-1')" class="roomcon curroom">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span id="wr-1-name" class="name">Waiting Room<span
        class="lmsg">login & sign up</span></span>
  </span>
</div>
`

    var afterrooms = `
<div id="chatroom-p" onclick="chancheroom('/roomp.html','chatroom-p')" class="roomcon">
  <span class="chatroom">
    <img src="/assets/icon.png" alt="chaticon"><span class="name">Private Rooms<span
        class="lmsg">Connect with ID</span></span>
  </span>
</div>
</div>
<div id="profile"onclick="logout()" class="roomcon">
<span class="chatroom">
  <div id="profile-logo"></div><span id="profil-name" class="name">Username<span
      class="lmsg">logout</span></span>
</span>
</div>
`


    var terminal = `<article class="terminal-con">
    <div id="terminal-filer-container">
    <div class="terminal-filter-el">
        <input type="checkbox" name="" id="terminal-filter-messages" class="terminal-filter-checkbox">
        <span class="terminal-filter-text">Don't show messages</span>
    </div>
</div>
<div id="serverlog">
</div>
</article>`

    var auser = ["admin", "Colin", "Niklaus", "Oliver_Macher"]

    io.on("connection", function (socket) {
        // new Connecton(socket)
        // console.log(socket)
        io.to(socket.id).emit("getid", socket.id, version)
        socket.on("check wait", function (user, pass, sid) {
            if (users.includes(user)) {
                var userposi = users.indexOf(user)
                if (userpass[userposi] == pass) {
                    usernum++
                    if (auser.includes(user)) {
                        var arooms = ""
                        var ararray = 0
                        for (var i = 0; roomsalowed.length > i; i++) {
                            arooms += roompasrt1 + roomsalowed[ararray] + roompasrt2 + roomsalowed[ararray] + roompasrt3 + roomsalowed[ararray] + roompasrt4 + roomsalowed[ararray] + roompasrt5 + roomsalowed[ararray] + roompasrt6 + roomsalowed[ararray] + roompasrt7
                            ararray++
                        }
                        arooms = beforrooms + rooms0 + arooms + afterrooms
                        io.to(sid).emit("check true", user, arooms, terminal)


                        console.log(time() + " 🟩 " + user + " logged in bc")
                        io.emit("consolelog", time() + " 🟩 " + user + " logged in bc")
                    } else {
                        var arooms = ""
                        var ararray = 0
                        for (var i = 0; roomsalowed.length > i; i++) {
                            arooms += roompasrt1 + roomsalowed[ararray] + roompasrt2 + roomsalowed[ararray] + roompasrt3 + roomsalowed[ararray] + roompasrt4 + roomsalowed[ararray] + roompasrt5 + roomsalowed[ararray] + roompasrt6 + roomsalowed[ararray] + roompasrt7
                            ararray++
                        }
                        arooms = beforrooms + arooms + afterrooms
                        io.to(sid).emit("check true", user, arooms)


                        console.log(time() + " 🟩 " + user + " logged in bc")
                        io.emit("consolelog", time() + " 🟩 " + user + " logged in bc")
                    }

                } else {
                    console.log(time() + " ❗ falsches pw bc")

                    io.emit("consolelog", time() + " ❗ falsches pw bc")
                    return false
                }
            } else {
                console.log(time() + " ❗ user existiert nicht bc " + " " + user + " " + pass)

                io.emit("consolelog", time() + " ❗ user existiert nicht bc " + " " + user + " " + pass)

                return false
            }
            socket.on("disconnect", function () {
                usernum--
            });
        });

        socket.on("reqinfo", function (regid) {
            // console.log(time() + " ❔ Informtions requested")
            // io.emit("consolelog", time() + " ❔ Informtions requested")
            socket.to(regid).emit("resinfo", users.length, usernum, openrooms, pusers, msdnum)
        });

        socket.on("requsers", function (sid) {
            var USERi = 0
            for (var i = 0; users.length != i; i++) {
                socket.emit("resusers", users[USERi], roomsalowed, auser)
                USERi++
            }
        });

        socket.on("requsersp", function (sid) {
            var USERi = 0
            for (var i = 0; pusers.length != i; i++) {
                socket.emit("resusersp", pusers[USERi], puserpass[USERi])
                USERi++
            }
        });

        socket.on("USER EDIT", function (USERNAME, ROOMS, AFT) {
            if (AFT == true) {
                if (!auser.includes(USERNAME)) {
                    auser.push(USERNAME)
                    // send("ADMIN " + "ADD " + USERNAME)
                    io.emit("consolelog", time() + " 📝  Edit " + USERNAME + "[A]")

                }
            } else {
                if (auser.includes(USERNAME)) {
                    auser.splice(auser.indexOf(USERNAME), 1)
                    // send("ADMIN " + "REMOVE " + USERNAME)
                    io.emit("consolelog", time() + " 📝  Edit " + USERNAME + "[-A]")
                }
            }
        });

        socket.on("USER CREATE", function (USERNAME, PASSWORD, ROOMS) {
            if (!users.includes(USERNAME)) {
                users.push(USERNAME)
                userpass.push(PASSWORD)
                // send("USER " + "CREATE " + USERNAME + " " + PASSWORD)
            }

            io.emit("consolelog", time() + " 📝 Create " + USERNAME + " [" + ROOMS + "]")
        });

        socket.on("USER PENDING", function (USERNAME, PASSWORD) {
            if (signup > signupindex) {
                if (!users.includes(USERNAME) && !pusers.includes(USERNAME)) {
                    pusers.push(USERNAME)
                    puserpass.push(PASSWORD)
                    // send("USER " + "CREATE " + USERNAME + " " + PASSWORD)
                    signupindex++
                    setTimeout(signupindexminus, signupdelay)
                }
            }
            io.emit("consolelog", time() + " 📝  Sign Up " + USERNAME)

        });

        socket.ip
        socket.on("CONFIRM USER", function (USERNAME, PASSWORD) {
            if (pusers.includes(USERNAME)) {
                var index = pusers.indexOf(USERNAME)
                users.push(USERNAME)
                userpass.push(puserpass[index])
                puserpass.splice(index, 1)
                pusers.splice(index, 1)
                // send("USER " + "CREATE " + USERNAME + " " + PASSWORD)
                io.emit("consolelog", time() + " 📝 Pending " + USERNAME + "[confirmed]")

            }
        });

        socket.on("REMOVE PENDING", function (USERNAME) {
            if (pusers.includes(USERNAME)) {
                puserpass.splice(pusers.indexOf(USERNAME), 1)
                pusers.splice(pusers.indexOf(USERNAME), 1)
            }
            io.emit("consolelog", time() + " 📝 Pending " + USERNAME + " [removed]")
        });

        socket.on("USER DEL", function (USERNAME) {
            if (users.includes(USERNAME)) {
                userpass.splice(users.indexOf(USERNAME), 1)
                users.splice(users.indexOf(USERNAME), 1)
                // send("USER " + DELETE " + USERNAME)
            }
            if (auser.includes(USERNAME)) {
                auser.splice(auser.indexOf(USERNAME), 1)
            }
            io.emit("consolelog", time() + " 📝 Delete " + USERNAME)

        });

        socket.on("relode", function (reloder) {
            console.log(time() + "Reload")
            socket.emit("RELODEALLCLIENTS",)
        });

        // socket.on("requsers", function (sid) {
        //     send("USER " + "LIST")
        //     do {
        //         client.on('data', function (data) {
        //             console.log('Received from server: ' + data.toString());
        //             // client.write("EOF");
        //         });
        //     } while (data == undefined)

        // });

        function signupindexminus() {
            signupindex--
        }

        socket.on("waitlogin", function (user, pass, sid) {
            if (users.includes(user)) {
                var userposi = users.indexOf(user)
                if (userpass[userposi] == pass) {
                    io.to(sid).emit("waittrue", user, pass)
                    console.log(time() + " 🟩 " + user + " logged in bl")

                    io.emit("consolelog", time() + " 🟩 " + user + " logged in bl")

                } else {
                    io.to(sid).emit("waitfalse", false)
                    console.log(time() + " ❗ falsches pw")

                    io.emit("consolelog", time() + " ❗ falsches pw")

                }
            } else {
                console.log(time() + " ❗ user existiert nicht")

                io.emit("consolelog", time() + " ❗ user existiert nicht")

                io.to(sid).emit("waitfalse", true)
            }
        });

        socket.on("istyping", function (istypinguser, room, status) {
            io.to(room).emit("useristyping", istypinguser, status)
        });
        socket.on("trylogin", function (user, pass, sid, clientroom) {

            socket.join(clientroom)
            console.log(time() + " 🟩 " + user + " joined Room (" + clientroom + ")")

            io.emit("consolelog", time() + " 🟩 " + user + " joined Room (" + clientroom + ")")
            if (users.includes(user)) {
                var userposi = users.indexOf(user)
                if (userpass[userposi] == pass) {
                    io.to(sid).emit("logintrue", user, pass, version)
                    if (openrooms.includes(clientroom)) {
                        openroomsdouble.push(clientroom)
                    } else {
                        openrooms.push(clientroom)
                    }
                    if (roomparray.includes(user + "@" + clientroom)) {
                        roompdouble.push(user + "@" + clientroom)
                        // console.log(roomadouble)
                        io.to(clientroom).emit("user join", user, roomparray, true)
                    } else {
                        roomparray.push(user + "@" + clientroom)
                        //wie viele User online sind
                        io.to(clientroom).emit("user join", user, roomparray, false)
                    }
                } else {
                    io.to(sid).emit("loginfalse")
                    console.log()
                    io.emit("consolelog", time() + " ❗ falsches pw")

                }
            } else {
                console.log(time() + " ❗ user existiert nicht")

                io.emit("consolelog", time() + " ❗ user existiert nicht")

                io.to(sid).emit("loginfalse")
            }
            socket.on("disconnect", function () {
                //wie viele User online sind
                if (openroomsdouble.includes(clientroom)) {
                    openroomsdouble.splice(openroomsdouble.indexOf(clientroom))
                } else {
                    openrooms.splice(openrooms.indexOf(clientroom))
                }
                if (roompdouble.includes(user + "@" + clientroom)) {
                    roompdouble.splice(roompdouble.indexOf(user + "@" + clientroom), 1)
                    if (roompdouble.includes(user + "@" + clientroom)) {
                    } else {
                        io.to(clientroom).emit("user leave", roomparray, { for: "everyone" });
                    }
                } else {
                    roomparray.splice(roomparray.indexOf(user + "@" + clientroom), 1);
                    io.to(clientroom).emit("user leave", roomparray, { for: "everyone" });
                }
                console.log(time() + " 🟥 " + user + " Leved room (" + clientroom + ")");

                io.emit("consolelog", time() + " 🟥 " + user + " Leved room (" + clientroom + ")")
            });

            socket.on("chat message", function (msg, bname, clientroom) {
                if (users.includes(bname)) {
                    if (msg != "") {
                        if (msg.length < 501) {
                            if (msg.includes("<") || msg.includes(">")) {
                                if (msg.includes("<img") || msg.includes("<a") || !msg.includes("<script")) {
                                    console.log(time() + " 📧 Message send from | " + bname + "@" + clientroom + " | " + msg);

                                    io.emit("consolelog", time() + " 📧 Message send from | " + bname + "@" + clientroom + " | " + msg)

                                    io.to(clientroom).emit("chat message", msg, bname);
                                    io.emit("lastmsg", clientroom, msg, bname)
                                    msdnum++

                                    // client.write("GET /")
                                    // client.end()
                                } else {
                                    console.log(time() + " 📧🟥 html injection | " + bname + "@" + clientroom + " | ");

                                    io.emit("consolelog", time() + " 📧🟥 html injection | " + bname + "@" + clientroom + " | ")

                                    io.emit("chat message", "HTML is not allowed", bname);
                                }
                            } else {
                                console.log(time() + " 📧 Message send from | " + bname + "@" + clientroom + " | " + msg);
                                io.to(clientroom).emit("chat message", msg, bname);
                                if (clientroom != "0" && crooms.includes(clientroom)) {
                                    io.emit("lastmsg", clientroom, msg, bname)
                                }
                                msdnum++
                                io.emit("consolelog", time() + " 📧 Message send from | " + bname + "@" + clientroom + "" + " | " + msg)
                            }
                            // send("MSG" + " SEND " + clientroom + " " + bname + " " + msg)
                        } else {

                            console.log(time() + " 📧🟥 to long | " + bname + "@" + clientroom + " | " + msg.length);

                            io.emit("consolelog", time() + " 📧🟥 to long | " + bname + "@" + clientroom + " | " + msg.length)

                        }
                    } else {

                        // console.log(time() + " 📧🟥 spam | " + bname + " (" + clientroom + ")" + " | ");
                    }
                } else {
                    console.log(time() + " 📧❗ kein gültiger Name | " + bname + "@" + clientroom + " | ");

                    io.emit("consolelog", time() + " 📧❗ kein gültiger Name | " + bname + "@" + clientroom + " | ")

                }


            });
        });
    });


    function checkTime(l) {
        if (l < 10) {
            l = "0" + l;
        }
        return l;
    }
    function checkms(l) {
        if (l < 10) {
            l = "00" + l;
        } else if (l < 100) {
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
        mo = checkTime(mo);
        d = checkTime(d);
        ms = checkms(ms);
        var alltime = (d + "-" + mo + "-" + y + " " + h + ":" + m + ":" + s + "," + ms)
        return alltime;
    }
} catch (e) {
    console.log("all error")
}
