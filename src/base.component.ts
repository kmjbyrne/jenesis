export class UiComponent {
    prefix = 'ui';
    block = '__';
    modifier = '--';
    componentName: string;

    constructor() { }

    is() {
        return `${this.prefix}-${this.componentName}`;
    }

    getModifierKeyName(modifier: string): string {
        return `${this.prefix}-${this.componentName}${this.modifier}${modifier}`;
    }

    define() {
        return this.prefix + '-' + this.componentName;
    }
}
