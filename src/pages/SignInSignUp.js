
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
import { BaseForm } from '../component/BaseForm';


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
    // const { location: { pathname } } = this.props;
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
  state={
    should_redirect: false,
  }
  render(){
    if(this.state.should_redirect) return <Redirect to= {{ pathname: '/login'}}/>
    return(
      <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email' },
        { id: 'password', placeholder: 'Password' },
        { id: 'name', placeholder: 'Name' },
      ]}
      btnLabel='SignUp'
      footerText='Already have an account ?'
      link={{ path: '/login', displayName: 'Login' }}
      onSubmit={this.onSubmit}
    />
    );
  }

  onSubmit = (input_values)=>{
    let request= axios({
      method: 'post',
      url: SERVER_ADDRESS +'/users',
      data: {
        user: {
          email: input_values['email'],
          password: input_values['password'],
          name: input_values['name'],
        }
      },
      validateStatus: (status)=>{
        if((status>= 200 && status<= 300)||(status >=400 && status <500)) {
          return true;
        }else{
          return false;
        }
      }
    });

    request.then((response)=>{
      console.log(response);
      if(response.status == 201 ){
        this.setState({should_redirect: true});
      }else if(response.status == 400){
        let error_first = response.data.errors[0];
        if(error_first.code == 'duplicated_field'){
          alert("The email has been registered!");
        }else{
          alert("Unexpected error happened, please contact lalala@gmail.com");
        }
      }
    }, (error)=>{
      alert("Unexpected error happened, please contact lalala@gmail.com");
    });
  }
}
class LoginForm extends Component{
  state={
    should_redirect: false,
  }
  render(){
    if (this.state.should_redirect) return <Redirect to={{pathname : '/questions'}}/>
    return(
      <BaseForm
      inputs={[
        { id: 'email', placeholder: 'Email' },
        { id: 'password', placeholder: 'Password' },
      ]}
      btnLabel='Login'
      footerText='Already have an account ?'
      link={{ path: '/login', displayName: 'Login' }}
      onSubmit={this.onSubmit}
    />
    );
  }
  onSubmit=(input_values)=>{
    let request = axios({
      method: 'post',
      url : SERVER_ADDRESS + '/user_tokens',
      data: {
        credential: {
          email: input_values['email'],
          password: input_values['password'],
        }
      },
      validateStatus: (status) =>{
        if((status <=200 && status < 300) || (status >=400 || status <500) ){
          return true;
        }else{
          return false;
        }
      }
    });
    request.then((response)=>{
      if(response.status == 201) {
        this.props.onLogin && this.props.onLogin(response.data.user_token);
        this.setState({should_redirect : true});
      }else if(response.status == 400){
        let error_first = response.data.errors[0];
        if(error_first.code == 'invalid_credential'){
          alert('Email or password is wrong!');
        }else{
          alert('Unexpected error happened, please contact lalala@gmail.com');
        }
      }else{
        alert('Unexpected error happened, please contact lalala@gmail.com');
      }
    },()=>{
      alert('Unexpected error happened, please contact lalala@gmail.com');
    });
  }
}

