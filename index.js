// const { pid } = require("process");

// inpoertieren der Libarys 

// const { stat } = require("fs");

var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
const net = require('net');
const client = new net.Socket();
// const client = net.connect({port: 8888, host: process.argv[2] ?? "localhost"})

// how many Uers are logged in

var usernum = 0

// Wich Users are online in witch room

var roomparray = []

//Which Users are logged in on multiple devices/tabs

var roompdouble = []

// all Open rooms

var openrooms = ["0", "1", "2", "3"]
var crooms = ["1", "2", "3"]

var openroomsdouble = []

// message delay

var msgdelay = []

var msgdelaytime = 1000

// max number of signups per min

var signup = 10

var signupindex = 0

var signupdelay = 30000

// number of send messages

var msdnum = 0

// Version of the chat

var version = "v0.5.0"

//Hosting server on port 80

var serverport = 6969

http.listen(serverport, function () {
    console.log(time() + " [SERVER] Sever on🔴 Port: " + serverport)
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


// client.connect(8888, '127.69.69.69', function () {

//     try {
//         send("AUTH admin 1234")
//         send("GROUP ")
//         // send("AUTH admin 1234");
//         // send("USER CREATE Colin passwd");
//         // send("USER CREATE user user");
//         // send("USER CREATE Laurenz 1234");
//         console.log('Connected to server');
//     } catch (err) {
//         console.log("Error Error Error")
//     }
// });

// client.on('data', function (data) {
//     console.log(data.toString());
//     // client.write("EOF");
// });

client.on('close', function () {
    console.log(time() + ' [JAVA] - Connection closed');
});

function send(message) {
    client.write(message + "\n")
}



// var users = ["admin", "Colin", "Niklaus", "Ralle", "user", "Laurenz", "Nevio", "Gian", "Raffael", "Willi", "Nadin", "Julian", "Nico", "Benjamin", "Loris", "Nat", "Florian", "Robin", "Silvan", "Timi", "Dilay", "Oliver_Macher", "Rubén_Fructuoso"]
// var userpass = ["password", "passwd", "passwd", "1234", "user", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234", "1234"]
var pusers = []
var puserpass = []

var rusers = []
var ruserpass = []

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
        <span class="terminal-filter-text">show messages</span>
        <input type="checkbox" name="" id="terminal-filter-info" class="terminal-filter-checkbox">
        <span class="terminal-filter-text">show info</span>
        <input type="checkbox" name="" id="terminal-filter-admin" class="terminal-filter-checkbox">
        <span class="terminal-filter-text">show admin</span>
        <input type="checkbox" name="" id="terminal-filter-java" class="terminal-filter-checkbox">
        <span class="terminal-filter-text">show java</span>
        <input type="checkbox" name="" id="terminal-filter-error" class="terminal-filter-checkbox">
        <span class="terminal-filter-text">show error</span>
    </div>
</div>
<div id="serverlog">
</div>
</article>`



client.on('data', function (data) {
    console.log(time() + " [JAVA] - ALL LOG: " + data.toString());
});

io.on("connection", function (socket) {
    io.to(socket.id).emit("getid", socket.id, version)
    socket.on("check wait", function (user, pass, sid) {
        client.connect(8888, '127.69.69.69', function () {
            logger(' [JAVA] - Connected to server');
            send("AUTH " + user + " " + pass)
            logger(" [INFO] - " + user + " login attempt")
            client.once('data', function (data) {
                data = data.toString().split(":")
                if (data[0] === "OK") {
                    usernum++
                    var arooms = ""
                    var ararray = 0
                    if (data[1].includes("true")) {
                        for (var i = 0; roomsalowed.length > i; i++) {
                            arooms += roompasrt1 + roomsalowed[ararray] + roompasrt2 + roomsalowed[ararray] + roompasrt3 + roomsalowed[ararray] + roompasrt4 + roomsalowed[ararray] + roompasrt5 + roomsalowed[ararray] + roompasrt6 + roomsalowed[ararray] + roompasrt7
                            ararray++
                        }
                        arooms = beforrooms + rooms0 + arooms + afterrooms
                        io.to(sid).emit("check true", user, arooms, terminal)
                        logger(" [INFO] - " + user + " login successed [A]")
                    } else {
                        for (var i = 0; roomsalowed.length > i; i++) {
                            arooms += roompasrt1 + roomsalowed[ararray] + roompasrt2 + roomsalowed[ararray] + roompasrt3 + roomsalowed[ararray] + roompasrt4 + roomsalowed[ararray] + roompasrt5 + roomsalowed[ararray] + roompasrt6 + roomsalowed[ararray] + roompasrt7
                            ararray++
                        }
                        arooms = beforrooms + arooms + afterrooms
                        io.to(sid).emit("check true", user, arooms)
                        logger(" [INFO] - " + user + " login successed")
                    }
                } else {
                    logger(" [INFO] - " + user + " login failed")
                }
            });
            try {
                send("EOF");
            }
            catch {
                console.error("Login ERROR");
            }
        });

        socket.on("disconnect", function () {
            usernum--
            // logger(" [SERVER] - Disconnect")
        });
    });

    socket.on("reqinfo", function (regid) {
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH admin 1234")
            send("USER LIST")
            client.once("data", function (data) {
                if (data.toString().split(":")[0] === "OK")
                    client.once("data", function (data) {
                        let userlength = data.toString().split(";").length - 1
                        socket.to(regid).emit("resinfo", userlength, usernum, openrooms, pusers, msdnum)
                        send("EOF")
                    });


            });


        });
    });

    socket.on("requsers", function (sid) {
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH admin 1234")
            send("USER LIST")
            client.once("data", function (data) {
                client.once("data", function (data) {
                    let userlist = data.toString().split(";")
                    userlist.pop()
                    send("ADMIN LIST")
                    client.once("data", function (data) {
                        let adminlist = data.toString()
                        send("EOF")
                        var USERi = 0
                        for (var i = 0; userlist.length != i; i++) {
                            socket.emit("resusers", userlist[USERi], roomsalowed, adminlist)
                            USERi++
                        }
                    });
                });
            });
        });
    });

    function logger(conslog) {
        try {
            io.emit("consolelog", time() + conslog)
            console.log(time() + conslog);
        } catch (err) {
            console.log("Log ERROR")
        }

    }


    socket.on("requsersp", function (sid) {
        var USERi = 0
        for (var i = 0; pusers.length != i; i++) {
            socket.emit("resusersp", pusers[USERi], puserpass[USERi])
            USERi++
        }
    });
    socket.on("USER EDIT", function (USERNAME, ROOMS, AFT, NPASSWORD) {
        if (AFT == true) {
            client.connect(8888, '127.69.69.69', function () {

                send("AUTH admin 1234")
                send("ADMIN ADD " + USERNAME)
                send("EOF")
            });
        } else {
            client.connect(8888, '127.69.69.69', function () {
                send("AUTH admin 1234")
                send("ADMIN " + "REMOVE " + USERNAME)
                send("EOF")
            });
        }
        if (NPASSWORD != undefined) {
            send("USER CHP " + USERNAME + " " + NPASSWORD)
        }

    });

    socket.on("USER CREATE", function (USERNAME, PASSWORD, ROOMS) {
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH admin 1234")
            send("USER " + "CREATE " + USERNAME + " " + PASSWORD)
            send("EOF")
            logger(" [ADMIN] - 📝 Create " + USERNAME + " [" + ROOMS + "]")
        });
    });

    socket.on("USER PENDING", function (USERNAME, PASSWORD) {
        if (signup > signupindex) {
            client.connect(8888, '127.69.69.69', function () {
                send("AUTH admin 1234")
                send("USER " + "LIST")
                client.once("data", function (data) {
                    client.once("data", function (data) {
                        if (!data.toString().includes(USERNAME) && !pusers.includes(USERNAME)) {
                            pusers.push(USERNAME)
                            puserpass.push(PASSWORD)
                            signupindex++
                            setTimeout(signupindexminus, signupdelay)
                        }
                        send("EOF")
                    });
                });
            });
            logger(" [INFO] - 📝  Sign Up " + USERNAME)
        } else {
            logger(" [ERROR] - 📝  No sign up available at the time")
        }
    });

    socket.on("CONFIRM USER", function (USERNAME, PASSWORD) {
        if (pusers.includes(USERNAME)) {
            var index = pusers.indexOf(USERNAME)
            client.connect(8888, '127.69.69.69', function () {
                send("AUTH admin 1234")
                send("USER CREATE " + pusers[index] + " " + puserpass[index])
                logger(" [ADMIN] - 📝 Pending " + USERNAME + " [confirmed]")
                send("EOF")
                puserpass.splice(index, 1)
                pusers.splice(index, 1)
            });
        }
    });

    socket.on("REMOVE PENDING", function (USERNAME) {
        if (pusers.includes(USERNAME)) {
            puserpass.splice(pusers.indexOf(USERNAME), 1)
            pusers.splice(pusers.indexOf(USERNAME), 1)
        }
        logger(" [ADMIN] - 📝 Pending " + USERNAME + " [removed]")
    });

    socket.on("USER DEL", function (USERNAME) {
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH admin 1234")
            send("USER DELETE " + USERNAME)
            send("EOF")
            logger(" [ADMIN] - 📝 Delete " + USERNAME)
        });

    });

    socket.on("relode", function (reloder) {
        logger(" [RELOAD] - Admin send Reload")
        io.emit("RELODEALLCLIENTS")
    });

    socket.on("waitlogin", function (user, pass, sid) {
        try {
            client.destroy()
        } catch (err) {
            logger(" [ERROR] - this is the error " + err)
        }
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH " + user + " " + pass)
            client.once('data', function (data) {
                data = data.toString().split(":");
                if (data[0] === "OK") {
                    io.to(sid).emit("waittrue", user, pass);
                    logger(" [INFO] - " + user + " logged in at wait");
                } else {
                    io.to(sid).emit("waitfalse");
                    logger(" [ERROR] - " + user + " No user with this password");
                }
                try {
                    client.destroy()
                } catch (err) {
                    logger(" [JAVA] - no open Socket connection")
                }
            });
        });
    });

    socket.on("istyping", function (istypinguser, room, status) {
        io.to(room).emit("useristyping", istypinguser, status)
    });

    socket.on("trylogin", function (user, pass, sid, clientroom) {

        socket.join(clientroom)
        logger(" [INFO] - 🟩 " + user + " joined Room (" + clientroom + ")")
        try {
            client.destroy()
        } catch (err) {
            logger(" [ERROR] - this is the error " + err)
        }
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH " + user + " " + pass)
            client.once('data', function (data) {
                data = data.toString().split(":")
                if (data[0] === "OK") {
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
                    logger(" [ERROR] - ❗ no user with this password")
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
                    logger(" [INFO] - 🟥 " + user + " Leved room (" + clientroom + ")")
                });
                try {
                    client.destroy()
                } catch (err) {
                    logger(" [JAVA] - no open Socket connection")
                }
            });
        });

    });

    socket.on("chat message", function (msg, bname, clientroom, password) {
        try {
            client.destroy()
        } catch (err) {
            console.log("this is the error " + err)
        }
        client.connect(8888, '127.69.69.69', function () {
            send("AUTH " + bname + " " + password)
            client.once('data', function (data) {
                data = data.toString().split(":");
                if (data[0] != "OK") {
                    logger(" [MESSAGE] - 📧❗ no user with this password | " + bname + "@" + clientroom + " | ")
                } else if (msgdelay.includes(bname)) {
                    logger(" [MESSAGE] - 📧❗ spam | " + bname + " (" + clientroom + ")" + " | ");
                } else if (msg === "") {
                    // logger(" [MESSAGE] - 📧❗ spam | " + bname + " (" + clientroom + ")" + " | ");
                } else if (msg.length > 500) {
                    logger(" [MESSAAGE] - 📧❗ to long | " + bname + "@" + clientroom + " | " + msg.length)
                } else if (msg.includes("<") || msg.includes(">")) {
                    logger(" [MESSAGE] - 📧❗ html injection | " + bname + "@" + clientroom + " | ")
                } else {
                    var adminindi = false
                    if (data[1].includes("true")) {
                        adminindi = true
                    } else {
                        msgdelay.push(bname)
                        setTimeout(removedelay, msgdelaytime)
                    }
                    logger(" [MESSAGE] - 📧 Message send from | " + bname + "@" + clientroom + " | " + msg)
                    io.to(clientroom).emit("chat message", msg, bname, adminindi);
                    io.emit("lastmsg", clientroom, msg, bname)
                    // send("MSG " + clientroom + " " + msg)
                    msdnum++
                }

                try {
                    client.destroy()
                } catch (err) {
                    console.log(" [JAVA] - no open Socket connection")
                }
            });
        });
    });
});



function removedelay(USERNAME) {
    msgdelay.splice(msgdelay.indexOf(USERNAME), 1)
}

function signupindexminus() {
    signupindex--
}

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
    var alltime = (/*d + "-" + mo + "-" + y + " " + */h + ":" + m + ":" + s + "," + ms)
    return alltime;
}


