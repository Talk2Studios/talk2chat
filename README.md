<p align=center>
  <br>
  <img src="assets/icon.png" alt="Logo">
  <br>
  <br>
  <a target="_blank" href="https://www.youtube.com/channel/UCoif-_aktkxpc9-vPHEKAVw" title="Nightly Tests"><img src="assets/youtube.png" height="20px">Talk2 Studios</a>
  <a target="_blank" href="talk2-studios.ch"><img alt="Website" src="assets/icon.png" height="20px"> talk2-studios.ch</a>
</p>

# Talk2 Chat
Talk2 Chat usere eigen entwikelte Webchatapp zum Donloaden und selbst ausprobieren.<br>
Explain video: <a href="https://youtu.be/SobWpdG1_NE">Video</a>
# Instalation

## install node modules
if you already installed node.js you can skip the first point.
1. Download node <a href="https://nodejs.org/de/download/" target="_blank">hier</a> and install it on your PC.
2. Create a new folder where you want to safe the Website and Copy all he stuff from github in thid folder
3. Open the Terminal as **administrator** and navigate to the folder you just have created.
4. now we init a node Projekt(optional):
```
$ npm init

// Now you can set some informations about your projekt.
```

6. install socket.io and express
```
$ npm install --save socketio

$ npm install --save express@4.15.2
```
## Port
If you would like to chanche the Port the server is linsten on, open the index.js file and chanche the number in the 8. line of the file to the port you like. <br>
<img src="assets/port.jpg" alt="Logo">  

## Styles
- Romme style: The main stile for the room.htmls is in the maine Directory `/style.css` and `/styles/style.css`<br>
- Waiting room style: The style for the wait.html is in `/styles/wait.css`<br>
- Main Page style: The Style for the main index.html is in `/styles/mainstyle.css`<br>
