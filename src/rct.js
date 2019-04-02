import React from 'react';
import ReactDOM from 'react-dom';

export default class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.style.display = 'contents'; 
        this.state = {name:"Wordl"};
    }

    componentDidMount() {
        document.body.appendChild(this.el);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
    }

    render() {
        return <h1>Hello, {this.state.name}</h1>;
    }
}