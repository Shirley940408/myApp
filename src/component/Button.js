import React, { Component } from "react";
import styles from "../styles/button";
import '../styles/Button.css'
export default class Button extends Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
  }

  render() {
    const { onClick, style } = this.props;
    return (
      <button
        onClick={onClick}
        style={{ ...styles.style, opacity: this.state.hovered ? 0.5 : 1 }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}
        // className={styles.className}
        
      >
        {this.props.label}
      </button>
    );
  }
}

export class FloatButton extends Component {
  render(){
    const { ...rest } = this.props;
    return(
      <div style={styles.container_float_button} className='container-float-button' { ...rest }>
      <img 
      style={styles.icon}
      src={require('../imgs/icons/add.svg')}/>
      </div>
    );
  }
}