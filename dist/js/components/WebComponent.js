var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WebComponent extends HTMLElement {
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
        this.loadExternalCSS(options.cssFileName);
    }
    connectedCallback() {
        const content = this.template.content.cloneNode(true);
        this.shadow.appendChild(this.styles);
        this.shadow.appendChild(content);
    }
    loadExternalCSS(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = yield fetch(WebComponent.constants.CSS_PATH + "/" + file);
            const css = yield request.text();
            this.styles.textContent = css;
        });
    }
}
WebComponent.constants = {
    CSS_PATH: "./components-css",
};
export default WebComponent;
