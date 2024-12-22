/**
 * Tips for using this class:
 *
 * 1. Always call connectedCallback() and always do super.connectedCallback() in the child class.
 * Always do DOM stuff in connectedCallback() and not in the constructor.
 */
export default class BetterWebComponent extends HTMLElement {
    shadow;
    styles;
    template;
    $;
    static register(name, _class) {
        if (!customElements.get(name)) {
            customElements.define(name, _class);
        }
    }
    /**
     * Might be blocked depending on CSP
     * @param str the string to interpolate
     * @param params  the object with the values to interpolate
     * @returns
     */
    static interpolate(str, params) {
        const names = Object.keys(params);
        const values = Object.values(params);
        return new Function(...names, `return \`${str}\`;`)(...values);
    }
    static createTemplate(templateId, HTMLContent) {
        const template = document.createElement("template");
        template.id = templateId;
        template.innerHTML = HTMLContent;
        return template;
    }
    async loadExternalCSS(filepath) {
        const request = await fetch(filepath);
        const css = await request.text();
        this.styles.textContent = css;
    }
    templateId;
    constructor(options) {
        // 1. always call super()
        super();
        this.templateId = options.templateId;
        // 2. create shadow DOM and create template
        this.shadow = this.attachShadow({ mode: "open" });
        this.$ = this.shadow.querySelector.bind(this.shadow);
        this.styles = document.createElement("style");
        this.template = BetterWebComponent.createTemplate(options.templateId, options.HTMLContent ??
            this.constructor.HTMLContent);
        // 3. attach styles
        if (options.cssContent)
            this.styles.textContent = options.cssContent;
        else if (options.cssFileName)
            this.loadExternalCSS(options.cssFileName);
        else
            this.styles.textContent = this.constructor.CSSContent;
    }
    static get HTMLContent() {
        return "";
    }
    static get CSSContent() {
        return "";
    }
    // called when element is inserted to the DOM
    connectedCallback() {
        this.createComponent();
        console.log(`${this.templateId}: connectedCallback finished executing`);
    }
    createComponent() {
        const content = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(content);
        // create utility selector
    }
    // triggered when element is removed from document
    disconnectedCallback() {
        console.log("disconnected");
    }
    // triggered when element is moved to new document (only with iframes)
    adoptedCallback() {
        console.log("adopted");
    }
    // region ATTRIBUTES
    // override this getter to specify which attributes to observe
    static get observedAttributes() {
        return [];
    }
    // gets an attribute from the observedAttributes
    getObservableAttr(attrName) {
        const attr = this.attributes.getNamedItem(attrName);
        return attr?.value;
    }
    // sets an attribute from the observedAttributes
    setObservableAttr(attrName, value) {
        this.setAttribute(attrName, value);
    }
    // removes an attribute from the observedAttributes
    removeObservableAttr(attrName) {
        this.removeAttribute(attrName);
    }
    // listens to changes of attributes from the observedAttributes
    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log("attributeChangedCallback run", attrName, oldVal, newVal);
    }
}
