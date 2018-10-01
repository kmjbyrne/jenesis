import DomHelper from './helper';

export default class BaseComponent {

    prefix = "ui";

    constructor() {

    }

    lookup(className, element) {
        console.log(className, element, element.getElementsByClassName(className));
        return element.getElementsByClassName(className);
    }

    select(className, element = document) {
        return this.lookup(this.getName(className), element);
    }

    selectOne(className, element = document) {
        return this.lookup(this.getName(className), element)[0];
    }

    getName(className) {
        return this.prefix + '-' + className;
    }

    define() {
        return this.prefix + '-' + this.componentName;
    }
}