import { UIParentControl } from '../control.component';
import { DomHelper } from '../helper';

export class ToggleButtonControl extends UIParentControl {
    element: any;
    ACTIVE_STATE = 'open';
    componentName = 'toggle';

    constructor() {
        super();
    }

    init(element: any) {
        this.element = element;
        this.setActivityListener();
    }

    toggleOpen() {
        this.element.classList.toggle(this.getModifierKeyName(this.ACTIVE_STATE));
    }

    setToggleCallback(callbackFunction: any) {
        this.element.addEventListener('click', () => {
            callbackFunction();
        });
    }

    setActivityListener(callback = null) {
        this.element.addEventListener('click', () => {
            this.toggleOpen();
        });
    }
}

export class ToggleButtonControlBuilder {
    static active() {
        const component = new ToggleButtonControl();
        const nodes = DomHelper.select(component.getName());
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < nodes.length; i++) {
            component.init(nodes[i]);
        }
        return component;
    }
}
