import React, { Component } from 'react';
import styles from '../styles/background';
import bgpic from '../imgs/background.jpg';
import Button from '../component/Button';
import TextInput from '../component/TextInput';
import WhiteBlank from '../component/WhiteBlank';
import { existance, email, upperCase, lowerCase, pwdLength, nameLength, validate } from '../util/validation';
// import App from './App';
import { Route, Link, Switch } from 'react-router-dom';

const validation_items = {
  email: [existance, email],
  password: [existance, pwdLength, upperCase, lowerCase],
  name: [nameLength],
}
class SignInSignUp extends Component {
    // state={
    //   emailErr:'',
    //   passwordErr:'',
    //   nameErr:''
    // }
    // input_values = {
    //   email: '',
    //   password: '',
    //   name: ''
    // }


    // onChange=({target:{id,value}})=>{
    //   this.input_values[id]= value;
    //   //live-change the property of the same name in the input_values    
    // }
    // onBlur=({target:{id,value}})=>{
    //   console.log('on blur',value);
    //   console.log(id);
    //     this.setState({
    //         [id+'Err']:existance(value),
    //         //e.g if this id is 'email', then it will return emailErr:existance(value)
    //     })
    // }
    // onSubmit=()=>{
    //   console.log('submitted');  
    //     // if(pwdValidation(this.input_values.password)){
    //     //   this.setState({
    //     //     passwordErr:pwdValidation(this.input_values.password),
    //     //   });    
    //     // }
    //     // if(nameValidation(this.input_values.name)){
    //     //   this.setState({
    //     //   nameErr:nameValidation(this.input_values.name),
    //     //   });
    //     // }
    //     // if(emailValidation(this.input_values.email)){
    //     //   this.setState({
    //     //     emailErr:emailValidation(this.input_values.email),
    //     //   }); 
    //     //   console.log('empty');
    //     // }
    //   Object.keys(validation_items).forEach((value) => {
    //     // console.log(this.validation_items[value]);
    //     // console.log(this.input_values[value]);
    //     this.setState({
    //       [`${value}Err`]:validate(validation_items[value], this.input_values[value]) 
    //     });
    //   });
    // }

  render() {
    const { location: { pathname } } = this.props;
    return (
      <div style={styles.container} className={styles.container_class}>
        <img src={bgpic} style={styles.image} className={styles.image_class} alt='' />
        <div style={styles.panel.container} className={styles.panel.container_class}>
          <div style={styles.panel_row} className={styles.panel_row_class}>
            <div style={styles.panel_col} className={styles.panel_col_class}>
              <div style={styles.panel.space} className={styles.panel.space_class}>

                <p style={styles.text_title}>BIG FISH</p>
                {/* <TextInput id='email' onChange={this.onChange} onBlur={this.onBlur} errMsg={this.state.emailErr} placeholder="Email"/>
                <WhiteBlank w={'100%'} h='m'/>
                <TextInput id='password' onChange={this.onChange} onBlur={this.onBlur} errMsg={this.state.passwordErr}  placeholder="Password"/>
                <WhiteBlank w={'100%'} h='m'/>
                <Route path='/signup' render={()=>
                <>               
                <TextInput id='name' onChange={this.onChange} onBlur={this.onBlur} errMsg={this.state.nameErr} placeholder="Name"/>
                <WhiteBlank/>
                </>
                }
                />

                <Button id="signup" onClick={this.onSubmit} label={ pathname ==='/signup'? 'SignUp': 'Login'}/> */}
                <Switch>
                  <Route path='/signup' render={()=><SignUpForm/>}/>
                  <Route path='/' render={()=><LoginForm onLogin={this.props.onLogin}/>}/>
                </Switch>
                {/* <BaseForm
                  inputs={[
                    { id: 'email', placeholder: 'Email' },
                    { id: 'password', placeholder: 'Password' },
                    { id: 'name', placeholder: 'Name' },
                  ]}
                  btnLabel={pathname==='/Signup' ? 'Signup':'Login'}
                  footerText='Already have an account ?'
                  link={{ path: '/login', displayName: 'Login' }}
                /> */}


              </div>
              <div style={styles.panel.footer} className={styles.panel.footer_class}>
                <div className={styles.panel.footer_width}>
                  <Route path={'/signup'} render={() =>
                    <>
                      <span style={styles.text_bottom_left}>Already have an account?  </span>
                      <Link to='/login'><span style={styles.text_bottom_right}>Login</span></Link>
                    </>
                  }
                  />
                  <Route exact path={['/login', '/']} render={() =>
                    <>
                      <span style={styles.text_bottom_left}>Don't have an account?  </span>
                      <Link to='/signup'><span style={styles.text_bottom_right}>SignUp</span></Link>
                    </>
                  }
                  />

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInSignUp;

class SignUpForm extends Component{
  render(){
    return(
      <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email' },
        { id: 'password', placeholder: 'Password' },
        { id: 'name', placeholder: 'Name' },
      ]}
      // btnLabel={ pathname==='/Signup' ? 'Signup':'Login'}
      btnLabel='SignUp'
      footerText='Already have an account ?'
      link={{ path: '/login', displayName: 'Login' }}
    />
    );
  }
}
class LoginForm extends Component{
  render(){
    return(
      <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email' },
        { id: 'password', placeholder: 'Password' },
      ]}
      // btnLabel={ pathname==='/Signup' ? 'Signup':'Login'}
      btnLabel='Login'
      footerText='Already have an account ?'
      link={{ path: '/login', displayName: 'Login' }}
    />
    );
  }
}

class BaseForm extends Component {
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