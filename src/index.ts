import { FormControlBuilder } from './components/forms/forms';
// import { SidebarComponentBuilder } from './components/sidebar/sidebar.component';
import { ToggleButtonControlBuilder } from './components/button/button.component';
import { ComponentStateController } from './components/component.state';
import { CalendarComponentBuilder } from './components/calendar/calendar.component';

const componentStateController = new ComponentStateController();

(() => {
    CalendarComponentBuilder.active();
    FormControlBuilder.active();
    componentStateController.addComponent('sidebarToggle', ToggleButtonControlBuilder.active());
})();


declare global {
    interface Window { uistate: any; }
}
window.uistate = componentStateController;
