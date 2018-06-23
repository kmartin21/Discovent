import React from 'react'
import ReactDOM from 'react-dom'

class Modal extends React.Component {
    constructor(props) {
      super(props);
      // Create a div that we'll render the modal into. Because each
      // Modal component has its own element, we can render multiple
      // modal components into the modal container.
      this.modalDiv = document.createElement('div');
      this.modalRoot = document.getElementById('modal-root')
    }
  
    componentDidMount() {
      // Append the element into the DOM on mount. We'll render
      // into the modal container element (see the HTML tab).
      this.modalRoot.appendChild(this.modalDiv);
    }
  
    componentWillUnmount() {
      // Remove the element from the DOM when we unmount
      this.modalRoot.removeChild(this.modalDiv);
    }
    
    render() {
      // Use a portal to render the children into the element
      const pa = <p>YOOOOOOOO</p>
      return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        this.props.children,
        // A DOM element
        this.modalDiv
      );
    }
  }

  export default Modal