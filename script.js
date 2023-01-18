const currentYear = new Date().getFullYear()

function year() {
  currentYear
  //console.log(currentYear)
  return currentYear
}

window.onload = curdate

function curdate() {
  const footerinhalt = (`
  <div class="footer-nav">
  <div class="footer-l-div">
    <div class="social">
      <p>Social</p>
      <a href="https://github.com/Talk2Studios/" target="_blank"><img src="/assets/github.png" alt="github" /></a>
      <a href="https://www.youtube.com/channel/UCoif-_aktkxpc9-vPHEKAVw" target="_blank"><img
          src="/assets/youtube.png" alt="youtube" /></a>
    </div>
    <p class="lbundig">
      If you have any ideas or <br />suggestions on how we<br />
      can improve the website, <br />
      please contact us here. &darr;<br /><br /><a href="mailto:Talk2.studios@gmail.com"
        class="mail">Talk2.studios@gmail.com</a>
    </p>
  </div>
  <div class="footer-nav-container">
    <div class="footer-nav-wrap">
      <div class="footer-nav-home footer-nav-con">
        <a href="/" class="footer-nav-title">Home</a>
        <a href="/contact" class="footer-nav-links">Contact</a>
      </div>
      <div class="footer-nav-calc footer-nav-con">
        <a href="/programms/rechner/" class="footer-nav-title">Calculator</a>
        <a href="/programms/rechner/#simplemath" class="footer-nav-links">Simple Math</a>
        <a href="/programms/rechner/#arithmetic" class="footer-nav-links">Arithmetic</a>
        <a href="/programms/rechner/#physic" class="footer-nav-links">Physic</a>
      </div>
      <div class="footer-nav-games footer-nav-con">
        <a href="/games/" class="footer-nav-title">Games</a>
        <a href="/games/#snake" class="footer-nav-links">Snake</a>
        <a href="/games/#blackjack" class="footer-nav-links">Blackjack</a>
        <a href="/games/tictactoe" class="footer-nav-links">TicTacToe</a>
      </div>
    </div>
    <div class="footer-nav-wrap">
      <div class="footer-nav-about footer-nav-con">
        <a href="/aboutus/" class="footer-nav-title">About us</a>
        <a href="/aboutus/#team" class="footer-nav-links">Team</a>
        <a href="/aboutus/#ziele" class="footer-nav-links">Ziele</a>
      </div>
      <div class="footer-nav-chat footer-nav-con">
        <a href="http://talk2chat.internet-box.ch/" class="footer-nav-title">Talk2 Chat</a>
        <a href="https://www.youtube.com/@Code--Zone" target="_blank"class="footer-nav-links">Infos</a>
      </div>
    </div>
  </div>

</div class="copyright>
<p class="rbundig"><img src="/assets/icon.png" alt="logo" class="headerlogo">
  <p>&copy; ` + year() + ` Talk2 Studios <br>Webdesign by <a href="/aboutus/#colin-about" class="webdesign">Colin Heggli</a></p>
</p>
  `)

  document.getElementById("footerin").innerHTML = footerinhalt;
}

var broom = "waitroom-1"

function chancheroom(iroom, croom) {
  document.getElementById("roomframe").src = iroom;
  document.getElementById(broom).classList.remove("curroom")
  document.getElementById(croom).classList.add("curroom");
  broom = croom
}
// Copy Button link--------------------------------------------------------------------------------------------------

function glink(copybtn) {
  var linput1 = document.getElementById("generate-link-in1").value
  var linput2 = document.getElementById("generate-link-in2").value
  navigator.clipboard.writeText(`<a href="` + linput1 + `" target="_blank">` + linput2 + `</a>`)
  document.getElementById("generate-link-in1").value = ""
  document.getElementById("generate-link-in2").value = ""
  document.getElementById(copybtn).value = "Copied"
  setTimeout(chanbacklink, 1500)

  function chanbacklink() {
    document.getElementById(copybtn).value = "Generate and copy link"
  }
}

// Copy Button img--------------------------------------------------------------------------------------------------


function gimg(copybtn) {
  var iinput1 = document.getElementById("generate-img-in1").value
  var iinput2 = document.getElementById("generate-img-in2").value
  navigator.clipboard.writeText(`<a href="` + iinput1 + `" target="_blank">` + iinput2 + `</a>`)
  document.getElementById("generate-img-in1").value = ""
  document.getElementById("generate-img-in2").value = ""
  document.getElementById(copybtn).value = "Copied"
  setTimeout(chanbacklink, 1500)

  function chanbacklink() {
    document.getElementById(copybtn).value = "Generate and copy img"
  }
}

