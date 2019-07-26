import { UiComponent } from './base.component';

class ComponentObject {
    private component: any;
    private key: string;

    constructor(key: string, component) {
        this.key = key;
        this.component = component;
    }
}

export class StateStore {
    static components = {};

    static add(key, component) {
        StateStore.components[key] = component;
    }

    static get(key) {
        return StateStore.components[key];
    }
}

export class StateAccessor {
    static getComponent() {

    }
}

export class ComponentStateController {
    private components = StateStore;
    constructor() {
        this.initialised = new Date();
    }
    private initialised: Date;

    getComponent(key: string) {
        return StateStore.get(key);
    }

    addComponent(key: string, component: UiComponent) {
        StateStore.add(key, component);
    }
}
