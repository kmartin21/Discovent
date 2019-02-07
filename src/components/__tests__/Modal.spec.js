import React from 'react'
import Modal from '../Modal'
import { mount } from 'enzyme'

describe('Modal', () => {
    const Child = () => <div>Child div</div>
    let mountedModal

    const modalRoot = global.document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    const body = global.document.querySelector('body')
    body.appendChild(modalRoot)

    beforeEach(() => {
        mountedModal = mount(
            <Modal>
                <Child />
            </Modal>
        )
    })

    it('always renders a div', () => {
        expect(mountedModal.find('div').length).toBeGreaterThan(0)
        mountedModal.unmount()
    })

    it('always renders the children', () => {
        expect(mountedModal.find(Child).length).toBeGreaterThan(0)
        mountedModal.unmount()
    })

    it('always mounts modal on the div with id `modal-root`', () => {
        expect(modalRoot.hasChildNodes()).toBeTruthy()
        mountedModal.unmount()
    })

    it('always clears the div with id `modal-root` on unmount', () => {
        mountedModal.unmount()
        expect(modalRoot.hasChildNodes()).toBeFalsy()
    })
})