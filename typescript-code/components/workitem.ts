import WebComponent from "./WebComponent.js";

abstract class DatasetHandler<T extends HTMLElement = HTMLElement> {
  constructor(public element: T, public dataset: DOMStringMap) {}
  abstract handle(dataAttrValue: string): void;
}

class AppTypeHandler extends DatasetHandler<HTMLParagraphElement> {
  handle(dataAttrValue: string): void {
    this.element.textContent = dataAttrValue;
  }
}

class MainImageHandler extends DatasetHandler<HTMLImageElement> {
  handle(dataAttrValue: string): void {
    this.element.src = dataAttrValue;
  }
}

class AppStackHandler extends DatasetHandler<HTMLParagraphElement> {
  handle(dataAttrValue: string): void {
    this.element.textContent = dataAttrValue;
  }
}

class AppTitleHandler extends DatasetHandler<HTMLHeadingElement> {
  handle(dataAttrValue: string): void {
    this.element.textContent = dataAttrValue;
  }
}

class DemoLinkHandler extends DatasetHandler<HTMLAnchorElement> {
  handle(dataAttrValue: string): void {
    this.element.href = dataAttrValue;
  }
}

class SeeLinkHandler extends DatasetHandler<HTMLAnchorElement> {
  handle(dataAttrValue: string): void {
    this.element.href = dataAttrValue;
  }
}

export default class WorkItem extends WebComponent {
  static content = `
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

  static override get observedAttributes() {
    return ["alt"] as const;
  }

  attributeChangedCallback(
    attrName: (typeof WorkItem)["observedAttributes"][number],
    oldVal: string,
    newVal: string
  ): void {
    if (attrName === "alt") {
      this.$<HTMLImageElement>("#main-image")!.alt = newVal;
    }
  }

  //   private desiredElementsMap: Record<string, HTMLElement>;
  constructor() {
    super({
      cssFileName: "workitem.css",
      HTMLContent: WorkItem.content,
      templateId: "work-item-template",
    });

    const datasetHandlerMap: Record<string, DatasetHandler> = {
      appType: new AppTypeHandler(
        this.$<HTMLParagraphElement>("#app-type")!,
        this.dataset
      ),
      mainImage: new MainImageHandler(
        this.$<HTMLImageElement>("#main-image")!,
        this.dataset
      ),
      appStack: new AppStackHandler(
        this.$<HTMLParagraphElement>("#app-stack")!,
        this.dataset
      ),
      appTitle: new AppTitleHandler(
        this.$<HTMLHeadingElement>("#app-title")!,
        this.dataset
      ),
      demoLink: new DemoLinkHandler(
        this.$<HTMLAnchorElement>("#demo-link")!,
        this.dataset
      ),
      seeLink: new SeeLinkHandler(
        this.$<HTMLAnchorElement>("#see-link")!,
        this.dataset
      ),
    };

    console.log(this.dataset); // camelcases attribute names
    for (let key in this.dataset) {
      if (!this.dataset[key]) throw new Error(`Data attribute ${key} is empty`);
      datasetHandlerMap[key].handle(this.dataset[key]!);
    }
  }
}
customElements.define("work-item", WorkItem);
