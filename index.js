//inpoertieren der Libarys 2
var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var usernum = 0

//Server hosten auf port 80 3
http.listen(80, function () {
    console.log("Server is started")
});

//dem Client die Websiten Daten schicken 4
app.use((req, res) => {

    if (req.url.slice(-1) == "/") {
        res.sendFile(__dirname + req.url + "index.html")
    } else {
        res.sendFile(__dirname + req.url)
    }
})
// Löst eine Funktion aus wen ein neuer Nutzer sich verbindet 5
io.on("connection", function (socket) {
    console.log("🟩 new user joined")
    //wie viele User online sind
    usernum = usernum + 1
    io.emit("user join", usernum, { for: "everyone" })


    // Löst eine Funktion aus wen ein neuer Nutzer die Verbindung aufhebt
    socket.on("disconnect", function () {
        //wie viele User online sind
        usernum = usernum - 1
        console.log("🟥 a user Leved");
        io.emit("user leave", usernum, { for: "everyone" });

    });
});
io.emit("some event", { for: "everyone" });

//Sendet die erhaltene Nachricht eines Clients an alle Clients zurück 8
io.on("connection", function (socket) {
    socket.on("chat message", function (msg, bname) {
        console.log("📧 Nachricht versendet von |" + bname + "|" + msg);
        io.emit("chat message", msg, bname);
    });
});

