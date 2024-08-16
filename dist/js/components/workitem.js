import WebComponent from "./WebComponent.js";
class DatasetHandler {
    constructor(element, dataset) {
        this.element = element;
        this.dataset = dataset;
    }
}
class AppTypeHandler extends DatasetHandler {
    handle(property) {
        this.element.textContent = property;
    }
}
class MainImageHandler extends DatasetHandler {
    handle(property) { }
}
class WorkItem extends WebComponent {
    //   private desiredElementsMap: Record<string, HTMLElement>;
    constructor() {
        super({
            cssFileName: "workitem.css",
            HTMLContent: WorkItem.content,
            templateId: "work-item-template",
        });
        const desiredElementsMap = {
            "app-type": this.$("#app-type"),
            "main-image": this.$("#main-image"),
            "app-category": this.$("#app-category"),
            "app-title": this.$("#app-title"),
            "demo-link": this.$("#demo-link"),
            "see-link": this.$("#see-link"),
        };
        const datasetHandlerMap = {
            "app-type": new AppTypeHandler(desiredElementsMap["app-type"], this.dataset),
            "main-image": this.$("#main-image"),
            "app-category": this.$("#app-category"),
            "app-title": this.$("#app-title"),
            "demo-link": this.$("#demo-link"),
            "see-link": this.$("#see-link"),
        };
        console.log(this.dataset);
    }
}
WorkItem.content = `
    <div class="item">
        <div class="item-caption">
            <div>
                <img src="./images/myimages/Gradient.png" alt="" />
                <p id="app-type"></p>
            </div>
        </div>
        <div class="item-image">
            <img src="" alt="" id="main-image" />
        </div>
        <div class="item-text">
            <div class="item-text-wrap">
                <p class="item-text-category" id="app-category"></p>
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
