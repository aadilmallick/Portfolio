import WebComponent from "./WebComponent";
class Navbar extends WebComponent {
    constructor() {
        super({
            cssFileName: "navbar.css",
            HTMLContent: Navbar.content,
            templateId: "navbar-template",
        });
    }
}
Navbar.content = `
    <header id="header-home" class="header-inner">
      <div class="container">
        <nav id="main-nav">
          <img src="images/logo-white.png" alt="my portfolio" class="logo" />
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="work.html" class="current">Work</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="https://aadilmallick.notion.site/Resume-Aadil-Mallick-d74ee18d708a4b0cb7c3a38bd11d2c62?pvs=4" target="_blank">Resume</a></li>
            <li><a href="https://buy.stripe.com/14k03B2kGbJH5X29AB" target="_blank">Donate</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
export default Navbar;
customElements.define("nav-bar", Navbar);