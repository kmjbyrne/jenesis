export class DomHelper {

    static init(componentName: string, init: any) {
        document.addEventListener("DOMContentLoaded", function (event) {
            // let base = new CardComponent(componentName);
            let nodes = DomHelper.select(componentName);
            let elements = [];
            for (let i = 0; i < nodes.length; i++) {
                elements.push(init(nodes[i]));
            }
        });
    }
    static select(className: string, element = document) {
        return element.getElementsByClassName(className);
    }
}