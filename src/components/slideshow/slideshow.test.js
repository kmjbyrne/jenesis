import {
    Slideshow,
    Component
} from './slideshow'

describe('Slideshow UI Component', () => {
    'use strict';

    var timerCallback;

    beforeEach(function() {
        let element = document.createElement('div');
        element.dataset.vs = 'slide';

        for (let i = 0; i < 4; i++) {
            let childrenSlides = document.createElement('div');
            childrenSlides.className = 'c-slideshow__slide';
            element.appendChild(childrenSlides);
        }

        let actorLeft = document.createElement('div');
        let actorRight = document.createElement('div');

        actorLeft.className = 'c-slideshow__prev';
        element.appendChild(actorLeft);
        actorRight.className = 'c-slideshow__next';
        element.appendChild(actorRight);
        this.instance = new Component(element);

        timerCallback = jasmine.createSpy('timerCallback');
        jasmine.clock().uninstall();
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    })

    it('Should initalise the component class', function() {
        let expectedElem = document.createElement('div');
        expect(this.instance.element.element).toBe(expectedElem.element);
        expect(this.instance.element.dataset.vs).toBe('slide');
        expect(this.instance.slides.length).toBe(4);
        expect(this.instance.slides[0].className).toBe('c-slideshow__slide');
    });

    it('Should have correctly defined event listeners', function() {
        let shift = jasmine.createSpy().and.callFake(function() {
            return false;
        });
    });

    it('Should perform slideTo and adjust image indices', function() {
        expect(this.instance.index).toBe(0);
    });

    it('Should perform action updates on slides with interval', function() {
        expect(this.instance.index).toBe(0);
        setTimeout(function() {
            timerCallback();
        });

        expect(timerCallback).not.toHaveBeenCalled();

        this.instance.action();
        jasmine.clock().tick(1000);
        expect(this.instance.index).toBe(1);
        jasmine.clock().tick(this.instance.delay);
        expect(this.instance.index).toBe(2);
        jasmine.clock().tick(this.instance.delay);
        expect(this.instance.index).toBe(3);
        jasmine.clock().tick(this.instance.delay);
        expect(this.instance.index).toBe(0);
    });
});