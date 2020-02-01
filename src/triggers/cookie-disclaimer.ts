import { UiParentComponent } from "../components/base/parent.component";
import { DomHelper } from "../components/utils/dom-helper";

export class CookieDisclaimer extends UiParentComponent {
    name = 'cookie-disclaimer';
    action = 'js-cookie-accept';
    controller: any;

    constructor() {
        super();
    }

    init(element: HTMLElement) {
        this.element = element;
        this.toggle();
        this.checkCookieAcceptance();
        this.getActionButton();
        this.setActivityListener();
    }

    toggle() {
        this.element.classList.add(this.getModifierKeyName('hide'));
    }

    checkCookieAcceptance() {
        if (localStorage.getItem('accepted') === 'true') {
            this.element.remove();
        } else {
            this.toggle();
        }
    }

    registerCookieAcceptance() {
        localStorage.setItem('accepted', 'true');
        this.checkCookieAcceptance();
    }

    getActionButton() {
        this.controller = this.element.getElementsByClassName(this.action)[0];
    }

    setActivityListener(callback: any = false) {
        this.controller.addEventListener('click', () => {
            this.registerCookieAcceptance();
        });
    }
}