class WebComponent extends HTMLElement {
    shadow;
    styles;
    template;
    $;
    // change this depending on where the css files are located
    static constants = {
        CSS_PATH: "js/components/components-css",
    };
    static createTemplate(templateId, HTMLContent) {
        const template = document.createElement("template");
        template.id = templateId;
        template.innerHTML = HTMLContent;
        return template;
    }
    constructor(options) {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.styles = document.createElement("style");
        this.template = WebComponent.createTemplate(options.templateId, options.HTMLContent);
        this.$ = this.template.content.querySelector.bind(this.template.content);
        this.loadExternalCSS(options.cssFileName);
    }
    // called when element is inserted to the DOM
    connectedCallback() {
        const content = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(content);
    }
    disconnectedCallback() { } // triggered when element is removed from document
    adoptedCallback() { } // triggered when element is moved to new document (only with iframes)
    // region ATTRIBUTES
    static get observedAttributes() {
        return [];
    }
    getAttr(attrName) {
        const attr = this.attributes.getNamedItem(attrName);
        return attr?.value;
    }
    setAttr(attrName, value) {
        this.setAttribute(attrName, value);
    }
    removeAttr(attrName) {
        this.removeAttribute(attrName);
    }
    // removed when any keys in the observedAttributes getter changes.
    attributeChangedCallback(attrName, oldVal, newVal) { }
    async loadExternalCSS(file) {
        const request = await fetch(WebComponent.constants.CSS_PATH + "/" + file);
        const css = await request.text();
        this.styles.textContent = css;
    }
}
export default WebComponent;
