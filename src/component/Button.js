import React, { Component } from "react";
import styles from "../styles/button";
import '../styles/Button.css'
import TextCostume from './TextCostume';
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
    const { style, ...rest } = this.props;
    return(
      <div style={{...styles.container_float_button,...style}} className='container-float-button' {...rest}>
      <img 
      style={styles.icon}
      src={require('../imgs/icons/add.svg')}/>
      </div>
    );
  }
}
export class EditButton extends Component{
  render(){
    const { style } = this.props
    return(
      <div
        style={{...styles.container_edit_button, ...style}}
        onClick={this.props.onClick}
      >
        <img style={styles.icon_edit} src={require("../imgs/icons/pencil-edit-button.svg")} alt=""/>
        <TextCostume type='red' style={styles.label_edit}>Edit</TextCostume>
      </div>
    );
  }
}

export class ButtonSmallPositive extends Component {

  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  render() {
    const { style, onClick } = this.props
    return (
      <button
        onClick={onClick}
        style={{ ...styles.button_small_positive, opacity: this.state.hovered ? 0.5 : 1, ...style }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}>
        <TextCostume type="white">{this.props.label}</TextCostume>
      </button>
    );
  }

}

export class ButtonSmallNegative extends Component {

  constructor() {
    super();
    this.state = {
      hovered: false,
    };
  }

  render() {
    const { style, onClick } = this.props
    return (
      <button
        onClick={onClick}
        style={{ ...styles.button_small_negative, opacity: this.state.hovered ? 0.5 : 1, ...style }}
        onMouseEnter={() => {
          this.setState({ hovered: true });
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false });
        }}>
        <TextCostume >{this.props.label}</TextCostume>
      </button>
    );
  }

}