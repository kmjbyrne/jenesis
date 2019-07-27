import { UiParentComponent } from '../parent.component';
import { DomHelper } from '../helper';
import { HttpUtil } from '../../utils/http';

export class FormControlBuilder {
    static active() {
        const component = new FormComponent();
        const nodes = DomHelper.select(component.is());
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < nodes.length; i++) {
            component.init(nodes[i]);
        }
        return component;
    }
}

export class FormComponent extends UiParentComponent {
    METHOD_KEY = 'data-method';
    URL_KEY = 'data-url';

    element: any;
    method: any;
    url: any;
    data: {};

    constructor() {
        super();

    }

    init(element: Element) {
        this.element = element;
        this.method = this.element.getAttribute(this.METHOD_KEY);
        this.url = this.element.getAttribute(this.URL_KEY);
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
}
