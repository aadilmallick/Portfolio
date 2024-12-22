import WebComponent from "./WebComponent.js";
class Navbar extends WebComponent {
    static content = `
    <header id="header-home" class="header-inner">
      <div class="container">
        <nav id="main-nav">
          <img src="images/logo-white.png" alt="my portfolio" class="logo" />
          <ul id="link-list">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="work.html">Work</a></li>
            <li><a href="contact.html">Contact & Tutoring</a></li>
            <li><a href="https://aadilmallick.notion.site/Resume-Aadil-Mallick-d74ee18d708a4b0cb7c3a38bd11d2c62?pvs=4" target="_blank">Resume</a></li>
            <li><a href="https://buy.stripe.com/14k03B2kGbJH5X29AB" target="_blank">Donate</a></li>
          </ul>
        </nav>
      </div>
    </header>
  `;
    linkList;
    constructor() {
        super({
            cssFileName: "navbar.css",
            HTMLContent: Navbar.content,
            templateId: "navbar-template",
        });
        this.linkList = this.$("#link-list");
        const filename = window.location.pathname.split("/").pop();
        if (filename) {
            const links = Array.from(this.linkList.querySelectorAll("a"));
            const currentLink = links.find((link) => link.getAttribute("href") === filename);
            currentLink?.classList.add("current");
        }
    }
}
export default Navbar;
customElements.define("nav-bar", Navbar);
