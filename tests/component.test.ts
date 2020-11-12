import { Component, Config } from "../src/core/component"

export class Box extends Component {

    static TEMPLATE = '../app/components/button/button.html'

    constructor(config: Config) {
        super( config );
    }

}

const box = new Box({
    props: {
        title: 'Morgan',
        size: 12,
        type: 'book',
        closed: true
    }
})

test('adds 1 + 2 to equal 3', () => {
    const title = box.props.title
    expect( title ).toBe( 'Morgan' );
});