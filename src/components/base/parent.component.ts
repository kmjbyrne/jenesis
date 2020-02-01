import { UiComponent } from './base.component';

export class UiParentComponent extends UiComponent {
    protected element: HTMLElement;
    constructor() {
        super();
    }

    lookup(className: string, element: any) {
        return element.getElementsByClassName(className);
    }

    select(className: string, element: any = document) {
        return this.lookup(this.getName(className), element);
    }

    selectOne(className: string, element: any = document) {
        return this.lookup(this.getName(className), element)[0];
    }

    getName(className: string) {
        return this.prefix + '-' + className;
    }

    getBlockName(fieldName: string) {
        return `${this.prefix}-${this.name}${this.block}${fieldName}`;
    }

}
