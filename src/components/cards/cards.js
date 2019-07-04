import BaseComponent from '../base';
import DomHelper from '../helper';

const Card = (() => {
    console.log('Init UI Cards');
    const componentName = 'ui-card';

    document.addEventListener("DOMContentLoaded", function(event) {
        // let base = new CardComponent(componentName);
        let nodes = DomHelper.select(componentName);
        let elements = [];
        for (let i = 0; i < nodes.length; i++) {
            elements.push(new CardComponent(nodes[i]));
        }
    });
})()

class ComponentProperties {
    heading = 'card__heading'
    content = 'card__content'
    group = 'card__group'
    link = 'card__link'
    visible = 'visible'
    active = 'active'

    constructor() {}
}

class CardComponent extends BaseComponent {
    componentName = 'card';
    name = 'Card Component';
    TIMER_KEY = 'data-timer';
    DELAY_KEY = 'data-delay';
    DEFAULT_TIMER = 5000;
    DEFAULT_DELAY = 1000;
    RESTART_DELAY = 3000;

    constructor(element) {
        super({});
        this.props = new ComponentProperties();
        this.element = element;
        this.setTimer(parseInt(element.getAttribute(this.TIMER_KEY)) || null);
        this.setDelay(parseInt(element.getAttribute(this.DELAY_KEY)) || null);

        this.links = this.select(this.props.link, this.element);

        this.index = 0;
        this.actions = {
            show: this.define() + '--' + this.props.visible,
            active: this.define() + '--' + this.props.active
        };
        this.start();
    }

    changeLink(index) {
        this.index = index;
        this.shift(index);
    }

    restartAction() {
        clearInterval(this.interval);

        setTimeout(() => {
            this.action();
        }, this.RESTART_DELAY);
    }

    pause() {
        clearInterval(this.interval);
    }

    bindLinkClickEvents() {
        for (let index = 0; index < this.links.length; index++) {
            let elem = this.links[index];
            elem.addEventListener("click", () => {
                this.changeLink(index);
            });

            elem.addEventListener("mouseover", () => {
                //this.changeLink(index);
                //this.pause();
            });

            elem.addEventListener("mouseout", () => {
                //this.restartAction();
            });
        }
    }

    setTimer(timer) {
        this.timer = timer || this.DEFAULT_TIMER;
    }

    setDelay(delay) {
        this.delay = delay || this.DEFAULT_DELAY;
    }

    start() {
        let content = this.select(this.props.content, this.element);
        this.contentGroups = this.select(this.props.group, content[0]);
        this.shift(this.index);
        this.bindLinkClickEvents();
        this.restartAction();
    }

    reset(current) {
        for (let index = 0; index < this.contentGroups.length; index++) {
            let group = this.contentGroups[index];
            if (group !== current) {
                group.classList.remove(this.actions.show);
            }
        }
    }

    resetLink(activeLink) {
        for (let index = 0; index < this.links.length; index++) {
            let link = this.links[index];
            if (activeLink !== link) {
                link.classList.remove(this.actions.active);
            }
        }
    }

    shift(index) {
        let current = this.contentGroups[index];
        let link = this.links[index];
        current.classList.add(this.actions.show);
        link.classList.add(this.actions.active);
        this.reset(current);
        this.resetLink(link);
    }

    action() {
        this.interval = setInterval(() => {
            this.index++;
            if (this.index >= this.contentGroups.length) {
                this.index = 0;
            }
            this.shift(this.index);
        }, this.timer);
    }

    describe() {
        return this.name;
    }
}