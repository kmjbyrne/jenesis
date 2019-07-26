import { UiParentComponent } from '../parent.component';
import { DomHelper } from '../helper';
import { HttpUtil } from '../../utils/http';

const Forms = (() => {
    const componentName = 'ui-form';
    let init = (node) => new FormComponent(node);
    DomHelper.init(componentName, init);
})();

export class FormComponent extends UiParentComponent {
    METHOD_KEY = 'data-method';
    URL_KEY = 'data-url';

    element: any;
    method: any;
    url: any;
    data: {};

    constructor(element) {
        super();
        this.element = element;
        this.method = this.element.getAttribute(this.METHOD_KEY);
        this.url = this.element.getAttribute(this.URL_KEY);
        this.init();
    }

    serialize() {
        let fields = this.select('form__field', this.element);
        this.data = {};
        for (let i = 0; i < fields.length; i++) {
            this.data[fields[i].name] = fields[i].value;
        }
        console.log(this.data);
    }

    showSnackbar(responseText) {
        let classStateName = 'snackbar--is-visible';
        let node = document.getElementsByClassName('ajax-request-snackbar')[0];
        if (node === undefined) {
            return false;
        }

        document.getElementById('snackbar-content').textContent = responseText;
        node.classList.toggle(classStateName);
        setTimeout(() => {
            node.classList.toggle(classStateName);
        }, 3000);
    }

    init() {
        this.element.addEventListener('submit', (event) => {
            event.preventDefault();

            console.log(this.serialize());

            if (this.method.toLowerCase() == 'GET'.toLowerCase()) {
                console.log(HttpUtil.get(this.url));
            }
            else if (this.method.toLowerCase() == 'POST'.toLowerCase()) {
                console.log(HttpUtil.post(this.url, this.data));
            }
            event.stopImmediatePropagation();
            return true;
        }, false);
    }
}
