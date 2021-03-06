import { Scrollbars } from 'react-custom-scrollbars';
import { render, unmountComponentAtNode } from 'react-dom';
import React from 'react';

export default function createTests() {
    let node;
    beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
    });
    afterEach(() => {
        unmountComponentAtNode(node);
        document.body.removeChild(node);
    });

    describe('universal', () => {
        describe('when rendered', () => {
            it('should hide overflow', done => {
                class ScrollbarsTest extends Scrollbars {
                    // Override componentDidMount, so we can check, how the markup
                    // looks like on the first rendering
                    componentDidMount() {}
                }
                render((
                    <ScrollbarsTest universal style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </ScrollbarsTest>
                ), node, function callback() {
                    const { view, trackHorizontal, trackVertical } = this.refs;
                    expect(view.style.position).toEqual('absolute');
                    expect(view.style.overflow).toEqual('hidden');
                    expect(view.style.top).toEqual('0px');
                    expect(view.style.bottom).toEqual('0px');
                    expect(view.style.left).toEqual('0px');
                    expect(view.style.right).toEqual('0px');
                    expect(trackHorizontal.style.display).toEqual('none');
                    expect(trackVertical.style.display).toEqual('none');
                    done();
                });
            });
        });
        describe('when componentDidMount', () => {
            it('should rerender', done => {
                render((
                    <Scrollbars universal style={{ width: 100, height: 100 }}>
                        <div style={{ width: 200, height: 200 }}/>
                    </Scrollbars>
                ), node, function callback() {
                    const { view } = this.refs;
                    expect(view.style.overflow).toEqual('scroll');
                    done();
                });
            });
        });
    });
}
