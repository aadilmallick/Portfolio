export default abstract class WebComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  protected styles: HTMLStyleElement;
  protected template: HTMLTemplateElement;
  public $: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K):
      | HTMLElementTagNameMap[K]
      | null;
    <K extends keyof SVGElementTagNameMap>(selectors: K):
      | SVGElementTagNameMap[K]
      | null;
    <K extends keyof MathMLElementTagNameMap>(selectors: K):
      | MathMLElementTagNameMap[K]
      | null;
    <K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K):
      | HTMLElementDeprecatedTagNameMap[K]
      | null;
    <E extends Element = Element>(selectors: string): E | null;
  };

  // change this depending on where the css files are located
  static constants = {
    CSS_PATH: "js/components/components-css",
  };

  

  static createTemplate(templateId: string, HTMLContent: string) {
    const template = document.createElement("template");
    template.id = templateId;
    template.innerHTML = HTMLContent;
    return template;
  }

  constructor(options: {
    templateId: string;
    HTMLContent: string;
    cssFileName: string;
  }) {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.styles = document.createElement("style");
    this.template = WebComponent.createTemplate(
      options.templateId,
      options.HTMLContent
    );
    this.$ = this.template.content.querySelector.bind(this.template.content);
    this.loadExternalCSS(options.cssFileName);
  }

  // called when element is inserted to the DOM
  connectedCallback() {
    const content = this.template.content.cloneNode(true);
    this.shadow.appendChild(this.styles);
    this.shadow.appendChild(content);
  }

  disconnectedCallback() {} // triggered when element is removed from document
  adoptedCallback() {} // triggered when element is moved to new document (only with iframes)



  // region ATTRIBUTES
  static get observedAttributes() {
    return [] as const
  }

  getAttr(attrName: (typeof WebComponent["observedAttributes"])[number]) {
    const attr = this.attributes.getNamedItem(attrName)
    return attr?.value
  }

  setAttr(attrName: (typeof WebComponent["observedAttributes"])[number], value: string) {
    this.setAttribute(attrName, value)
  }

  removeAttr(attrName: (typeof WebComponent["observedAttributes"])[number]) {
    this.removeAttribute(attrName)
  }

  // removed when any keys in the observedAttributes getter changes.
  attributeChangedCallback(attrName: (typeof WebComponent["observedAttributes"])[number], oldVal: string, newVal: string) {}

  async loadExternalCSS(file: string) {
    const request = await fetch(WebComponent.constants.CSS_PATH + "/" + file);
    const css = await request.text();
    this.styles.textContent = css;
  }
}
