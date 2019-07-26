
import { FormComponent } from './components/forms/forms';
import { SidebarComponentBuilder } from './components/sidebar/sidebar.component';
import { ToggleButtonControlBuilder } from './components/button/button.component';
import { ComponentStateController } from './components/component.state';

const componentStateController = new ComponentStateController();

(() => {
    componentStateController.addComponent('sidebarToggle', ToggleButtonControlBuilder.active());

})();


declare global {
    interface Window { uistate: any; }
}
window.uistate = componentStateController;