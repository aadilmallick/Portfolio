import WebComponent from "./WebComponent.js";
class DatasetHandler {
    constructor(element, dataset) {
        this.element = element;
        this.dataset = dataset;
    }
}
class AppTypeHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.textContent = dataAttrValue;
    }
}
class MainImageHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.src = dataAttrValue;
    }
}
class AppStackHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.textContent = dataAttrValue;
    }
}
class AppTitleHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.textContent = dataAttrValue;
    }
}
class DemoLinkHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.href = dataAttrValue;
    }
}
class SeeLinkHandler extends DatasetHandler {
    handle(dataAttrValue) {
        this.element.href = dataAttrValue;
    }
}
class WorkItem extends WebComponent {
    static get observedAttributes() {
        return ["alt"];
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "alt") {
            this.$("#main-image").alt = newVal;
        }
    }
    //   private desiredElementsMap: Record<string, HTMLElement>;
    constructor() {
        super({
            cssFileName: "workitem.css",
            HTMLContent: WorkItem.content,
            templateId: "work-item-template",
        });
        const datasetHandlerMap = {
            appType: new AppTypeHandler(this.$("#app-type"), this.dataset),
            mainImage: new MainImageHandler(this.$("#main-image"), this.dataset),
            appStack: new AppStackHandler(this.$("#app-stack"), this.dataset),
            appTitle: new AppTitleHandler(this.$("#app-title"), this.dataset),
            demoLink: new DemoLinkHandler(this.$("#demo-link"), this.dataset),
            seeLink: new SeeLinkHandler(this.$("#see-link"), this.dataset),
        };
        console.log(this.dataset); // camelcases attribute names
        for (let key in this.dataset) {
            if (!this.dataset[key])
                throw new Error(`Data attribute ${key} is empty`);
            datasetHandlerMap[key].handle(this.dataset[key]);
        }
    }
}
WorkItem.content = `
    <div class="item">
        <div class="item-caption">
            <div>
                <img src="./images/myimages/Gradient.png" alt="" id="#gradient-image" loading="lazy" />
                <p id="app-type"></p>
            </div>
        </div>
        <div class="item-image">
            <img src="" alt="" id="main-image" loading="lazy" />
        </div>
        <div class="item-text">
            <div class="item-text-wrap">
                <p class="item-text-category" id="app-stack"></p>
                <h2 class="item-text-title" id="app-title"></h2>
                <div class="link-container">
                    <a href="" target="_blank" id="demo-link">Demo</a>
                    <a href="" id="see-link" target="_blank">See it</a>
                </div>
            </div>
        </div>
    </div>
  `;
export default WorkItem;
customElements.define("work-item", WorkItem);
