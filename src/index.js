import { Slideshow } from './components/slideshow';
import './main.scss';

const init = (() => {
    let x = new Slideshow();
    console.log('Test');
    return x;
})();

module.exports = { 
    init 
};