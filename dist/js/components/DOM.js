class DOM {
    static createDomElement(html) {
        const dom = new DOMParser().parseFromString(html, "text/html");
        return dom.body.firstElementChild;
    }
    static $ = (selector) => document.querySelector(selector);
    static $$ = (selector) => document.querySelectorAll(selector);
    static selectWithThrow = (selector) => {
        const el = DOM.$(selector);
        if (!el) {
            throw new Error(`Element not found: ${selector}`);
        }
        return el;
    };
    static addElementsToContainer(container, elements) {
        const fragment = document.createDocumentFragment();
        elements.forEach((el) => fragment.appendChild(el));
        container.appendChild(fragment);
    }
}
export { DOM };
export function html(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || "");
    });
    return str;
}
export function css(strings, ...values) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (values[i] || "");
    });
    return str;
}
export class CSSVariablesManager {
    element;
    constructor(element, defaultValues) {
        this.element = element;
        if (defaultValues) {
            Object.entries(defaultValues).forEach(([key, value]) => {
                this.set(key, value);
            });
        }
    }
    formatName(name) {
        if (name.startsWith("--")) {
            return name;
        }
        return `--${name}`;
    }
    set(name, value) {
        this.element.style.setProperty(this.formatName(name), String(value));
    }
    get(name) {
        return this.element.style.getPropertyValue(this.formatName(name));
    }
}
