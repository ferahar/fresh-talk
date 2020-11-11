import { Component, DomElement, EventBus }  from '../src/core/index';

const component = new Component({
    selector: 'component',
    selectorClass: 'header',
    template: '../test/component.html',
    listeners: {
        "click": 'onclick'
    },
    components: [

    ],
    props: {
        title: 'Component'
    }
})

// const componentNegative = new Component({
    
// })

describe('Проверка компонента:', () => {

    test('props', () => {
        expect( component.props ).toEqual({ title: 'Component' }) ;
    });

})

