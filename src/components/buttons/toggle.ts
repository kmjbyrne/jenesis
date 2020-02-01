import { UiParentControl } from '../base/control.component';

export class ToggleButtonComponent extends UiParentControl {
    name = 'navicon';
    active = 'active';

    constructor() {
        super();
    }

    init(element: any) {
        this.element = element;
        this.setActivityListener();
    }

    onClick(callback: any) {
        this.element.classList.toggle(this.getModifierKeyName(this.active));
    }

    setCallback(callback: any) {
        this.element.addEventListener('click', () => {
            callback();
        });
    }

    setActivityListener() {
        this.element.addEventListener('click', () => {
            this.onClick(false);
        });
    }
}