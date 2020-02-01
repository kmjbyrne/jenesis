export class UiComponent {
    prefix = 'bns';
    block = '__';
    modifier = '--';
    name: string;

    constructor() { }

    is() {
        return `${this.prefix}-${this.name}`;
    }

    getModifierKeyName(modifier: string): string {
        return `${this.prefix}-${this.name}${this.modifier}${modifier}`;
    }

    define() {
        return this.prefix + '-' + this.name;
    }

    defineBlock(block: string) {
        return this.prefix + '-' + this.name + this.block + block;
    }
}
