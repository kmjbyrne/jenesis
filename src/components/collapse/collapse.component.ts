import { UiParentComponent } from '../base/parent.component';
import { DomHelper } from '../utils/dom-helper';
import { AjaxUtil } from '../../utils/ajax.service';
import { UiParentControl } from '../base/control.component';

class UiCollapseComponent extends UiParentComponent {
    private responseKey: string;
    public element: HTMLElement;
    name = 'collapse';
    active = 'show';

    constructor(name: string) {
        super();
    }

    init(element: HTMLElement) {
        this.element = element;
        this.setActivityListener();

        if (document.body.classList.contains('open')) {
            this.toggle();
        }
    }

    open() {
        const content = <HTMLElement>this.element.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }

    toggle() {
        this.element.classList.toggle(this.getModifierKeyName(this.active));
        this.open();
    }

    setActivityListener() {
        this.element.addEventListener('click', () => {
            this.toggle();
        });
    }
}

export class UiCollapseComponentBuilder extends UiParentComponent {
    name = 'collapse';
    init(element: HTMLElement) {
        let instance = new UiCollapseComponent(name);
        instance.init(element);
    }
}