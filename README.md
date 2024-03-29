<p align=center>
  <br>
  <img src="assets/icon.png" alt="Logo">
  <br>
  <br>
  <a target="_blank" href="https://www.youtube.com/@talk2studios" Tests"><img src="assets/youtube.png" height="20px">Talk2 Studios</a>
  <a target="_blank" href="https://www.youtube.com/@Code--Zone" Tests"><img src="assets/youtube.png" height="20px">Code--Zone</a>
  <a target="_blank" href="talk2-studios.ch"><img alt="Website" src="assets/icon.png" height="20px"> talk2-studios.ch</a><br><br>
  <a href="#einleitung">Talk2 Chat</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Installation</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#port">Port</a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#styles">Styles</a>
  <br><br>
  <img src="assets/Studio_Projekt.jpg" alt="intro">
</p>
<a id="einleitung"></a>

# Talk2 Chat

## Info
- this Chatapp is developed on Windows but it probably works on ULinux Ubuntu aswel
- We used XAMPP to host the MySQLü
 

Our own chatapp to download and try for yourself. A product of the third laboratory work of the 2022/23 Wibilea Bassislehrjahr.<br>
The documentation: <a href="https://www.youtube.com/@Code--Zone">Code--Zone</a>

## contributing

### Frontend

- Colin Heggli

### Backend

- Niklaus Külling

# Installation

## install and init node.js

if You already installed node.js you can skip the first point.

1. Download node.js <a href="https://nodejs.org/de/download/" target="_blank">hier</a> and install it on your PC.
2. Create a new folder where you want to save the Website and copy all he stuff from github in this folder
3. Open the Terminal as <strong><u>administrator</u></strong> and navigate to the folder you just have created.
4. Now we init a node Projekt (optional):

```
$ npm init

// Now you can set some informations about your projekt.
```

6. install socket.io and express

```
npm install --save socketio

npm install --save express
```
**OR**
```
npm install --save Socketio express
```

## Start Node.js

1. Open the CMD, Terminal or a terminal thats build in a programm and navigate to the folder where you have the Chat files.
2. Type in this command to start de Server

```
node index.js
```
## Start Java Server

1. Be sure you have installed JAVA 19, if not download and install it <a href="https://www.oracle.com/java/technologies/javase/jdk19-archive-downloads.html" target="_blank">hier</a>.
2. Open the CMD, Terminal or a terminal thats build in a programm and navigate to the folder where you have the x.jar file.
3. Type in this command to start de Server

```
java -jar x.jar
```
## Start MySQL

We used XAMPP for this, but feel free to use another program.

Move the messages Directory in the data directory of XAMPP.
If you installed XAMPP normaly you will finde the directory for the databases here
```
C:\xampp\mysql\data
```

Now open XAMPP and click on this button. <br>
The MySQL will start on Port 3306
<img src="assets/xampp.jpg" alt="Logo">

## Port

If you would like to chanche the Port the server is linsten on, open the index.js file and chanche the number in the 57th line of the file to the port you like.<br>
<img src="assets/port.jpg" alt="Logo">  

## Styles

- Roome style: The main style for the room.htmls is in the maine Directory `/style.css`<br>
- Iframe and room switch: The style for the Iframe and the chat room icons in in `/styles/style.css`<br>
- Waiting room style: The style for the wait.html is in `/styles/wait.css`<br>
- Main Page style: The Style for the main index.html is in `/styles/mainstyle.css`<br>
- Admin Panel style: The Style for the admin Panels is in `/styles/panel.css`<br>
