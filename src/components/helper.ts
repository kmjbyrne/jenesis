export class DomHelper {

    static init(componentName, init) {
        document.addEventListener("DOMContentLoaded", function(event) {
            // let base = new CardComponent(componentName);
            let nodes = DomHelper.select(componentName);
            let elements = [];
            console.log(nodes);
            for (let i = 0; i < nodes.length; i++) {
                elements.push(init(nodes[i]));
            }
        });
    }
    static select(className, element = document) {
        return element.getElementsByClassName(className);
    }

}