import {
    Slideshow
} from './components/slideshow';
import {
    Parallax
} from './components/parallax';
import './main.scss';

const init = (() => {
    let slideshow = new Slideshow();
    let parallax = new Parallax();
})();

! function() {
    init();
};