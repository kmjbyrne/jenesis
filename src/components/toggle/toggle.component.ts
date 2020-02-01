import { UiParentControl } from '../base/control.component';
import { DomHelper } from '../utils/dom-helper';

export class ToggleButtonControl extends UiParentControl {
    element: any;
    ACTIVE_STATE = 'active';
    name = 'navicon';

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

    setActivityListener(callback: undefined = null) {
        this.element.addEventListener('click', () => {
            this.toggleOpen();
        });
    }
}

export class ToggleButtonControlBuilder {
    static active() {
        const component = new ToggleButtonControl();
        const nodes = DomHelper.select(component.is());
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < nodes.length; i++) {
            component.init(nodes[i]);
        }
        return component;
    }
}
