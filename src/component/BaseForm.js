import React, { Component } from 'react';
import styles from '../styles/background';
import bgpic from '../imgs/background.jpg';
import Button from '../component/Button';
import TextInput from '../component/TextInput';
import WhiteBlank from '../component/WhiteBlank';
import { existance, email, upperCase, lowerCase, pwdLength, nameLength, validate } from '../util/validation';
import axios from 'axios';
// import App from './App';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { SERVER_ADDRESS } from '../constants';

const validation_items = {
    email: [existance, email],
    password: [existance, pwdLength, upperCase, lowerCase],
    name: [nameLength],
  }
export class BaseForm extends Component {

    constructor(props) {
      super(props);
      let _temp_state = {};
      this.input_values = {};
      props.inputs.forEach(input => {
        _temp_state[input.id + 'Err'] = '';
        this.input_values[input.id] = '';
      })
      this.state = _temp_state;
    }
  
    onChange = ({ target: { id, value } }) => {
      this.input_values[id] = value;
      //live-change the property of the same name in the input_values
  
    }
    onBlur = ({ target: { id, value } }) => {
      console.log('on blur', value);
      console.log(id);
      this.setState({
        [id + 'Err']: existance(value),
        //e.g if this id is 'email', then it will return emailErr:existance(value)
      })
    }
    onSubmit = () => {
      console.log('submitted');
      let _errMsgs = {};
      Object.keys(validation_items).forEach((value) => {
        // console.log(this.validation_items[value]);
        // console.log(this.input_values[value]);
        _errMsgs[`${value}Err`] = validate(validation_items[value], this.input_values[value]);
      });
      if (this._checkErr(_errMsgs)) {
        this.setState(_errMsgs);
      } else {
        this.props.onSubmit(this.input_values);
      }
  
    }
  
    _checkErr = obj => {
      for (let val in obj) {
        if (obj[val]) {
          return true;
        }
        return false;
      }
    }
    render() {
      const {
        inputs,
        btnLabel,
        footerText,
        link: {
          path,
          displayName,
        },
      } = this.props;
      return (
        <>
          {
            inputs.map((input, index) =>
              <>
                <TextInput id={input.id} onChange={this.onChange} onBlur={this.onBlur} errMsg={this.state[input.id + 'Err']} placeholder={input.placeholder} />
                {index !== inputs.length - 1 && <WhiteBlank w={'100%'} h='m' />}
              </>
            )
          }
  
          <Button onClick={this.onSubmit} label={btnLabel} />
  
        </>
      );
    }
  }