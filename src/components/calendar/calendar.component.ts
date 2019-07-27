import { UiParentComponent } from '../parent.component';
import { UiParentControl } from '../control.component';
import { DomHelper } from '../helper';


const WEEKDAYS = {
    mon: 0,
    tue: 1,
    wed: 2,
    thu: 3,
    fri: 4,
    sat: 5,
    sun: 6,
};

export class CalenderComponentControl extends UiParentControl {
    constructor() {
        super();
    }

    init(element: any) {
        this.element = element;
    }

    setToggleCallback(callbackFunction: any) {
        console.log(this);
        this.element.addEventListener('click', () => {
            callbackFunction();
        });
    }
}

export class CalendarComponent extends UiParentComponent {
    element: any;
    next = 'next';
    weeks = 'weeks';
    day = 'day';
    currentElement = 'current-day';
    previous = 'previous';
    componentName = 'calendar';
    currentDate = new Date();
    currentDisplay = DomHelper.select(this.is() + '__' + this.currentElement)[0];

    actions = {
        next: new CalenderComponentControl(),
        previous: new CalenderComponentControl()
    };

    constructor() {
        super();
    }

    init(element: any) {
        this.element = element;
        this.actions.next.init(DomHelper.select(this.is() + '__' + this.next)[0]);
        this.actions.next.setToggleCallback(this.nextMonth.bind(this));

        this.actions.previous.init(DomHelper.select(this.is() + '__' + this.previous)[0]);
        this.actions.previous.setToggleCallback(this.previousMonth.bind(this));

        this.currentDisplay.innerHTML = new Date().toDateString();
    }

    setControllers() {

    }

    previousMonth() {
        console.log('Back one month');
        const newDate = this.currentDate;
        newDate.setMonth(newDate.getMonth() - 1);
        this.currentDisplay.innerHTML = newDate.toDateString();
        this.currentDate = newDate;
        console.log(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).toDateString());
    }

    nextMonth() {
        console.log('Forward one month');
        const newDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        newDate.setMonth(newDate.getMonth() + 1);
        this.currentDisplay.innerHTML = newDate.toDateString();
        this.currentDate = newDate;
        this.buildDays();
    }

    clearWeekNodes() {
        const weekNodes = DomHelper.select(this.is() + '__' + this.weeks);
        for (let i = 0; i < weekNodes.length; i++) {
            this.element.removeChild(weekNodes[i]);
        }
    }

    buildDays() {
        this.clearWeekNodes();
        const newWeekNode = document.createElement('div');
        const newWeekDayNode = document.createElement('div');
        newWeekNode.classList.add(this.defineBlock(this.weeks));
        newWeekDayNode.classList.add(this.defineBlock('week'));

        const currentDayOfWeek = this.currentDate.getDay();
        let actualDatedDay = 1;

        console.log('Day of month: ' + currentDayOfWeek);

        let catchDifference = 0;
        for (let i = 0; i < 7; i++) {
            if (currentDayOfWeek <= i) {
                catchDifference = i;
                newWeekDayNode.append(this.createDayNode(actualDatedDay));
                actualDatedDay++;
            }
            else {
                newWeekDayNode.append(this.createDayNode(''));
            }
        }
        newWeekNode.append(newWeekDayNode);
        this.element.append(newWeekNode);
    }

    createDayNode(dayValue: any) {
        const node = document.createElement('div');
        node.classList.add(this.defineBlock(this.day));
        node.innerHTML = dayValue.toString();
        return node;
    }
}

export class CalendarComponentBuilder {
    static active() {
        const component = new CalendarComponent();
        const nodes = DomHelper.select(component.is());
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < nodes.length; i++) {
            component.init(nodes[i]);
        }
        return component;
    }
}
