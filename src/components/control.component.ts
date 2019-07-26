import { UiComponent } from './base.component';

export class UIParentControl extends UiComponent {
    componentName: string;
    name: string;
    element: any;

    constructor() {
        super();
    }

    init(element: HTMLElement) {
        this.element = element;
    }

    getName() {
        return `${this.prefix}-${this.componentName}`;
    }

    setInputClass(className: string) {
        console.log(this, className);
        this.element.classList.toggle(this.componentName + '--' + className);
    }

    removeInputClass(className: string) {
        this.element.classList.remove(this.componentName + '--' + className);
    }
}
