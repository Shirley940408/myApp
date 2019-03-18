import React, { Component } from 'react';
import styles from '../styles/background';
import bgpic from '../imgs/background.jpg';
import Button from'../component/Button';
import TextInput from '../component/TextInput';
import WhiteBlank from '../component/WhiteBlank';
import {existance, pwdValidation, nameValidation, emailValidation} from '../util/validation';
// import App from './App';
import { Route, Link } from 'react-router-dom';
class SignInSignUp extends Component {
  state={
    emailErr:'',
    passwordErr:'',
    nameErr:''
  }
  input_values = {
    email: '',
    password: '',
    name: ''
  }

  onSubmit=()=>{
    console.log('submitted');  
    console.log(nameValidation(this.input_values.name));
      if(pwdValidation(this.input_values.password)){
        this.setState({
          passwordErr:pwdValidation(this.input_values.password),
        });    
      }
      if(nameValidation(this.input_values.name)){
        this.setState({
        nameErr:nameValidation(this.input_values.name),
        });
      }
      if(emailValidation(this.input_values.email)){
        this.setState({
          emailErr:emailValidation(this.input_values.email),
        }); 
        console.log('empty');
      }

  }
  onChange=({target:{id,value}})=>{
    this.input_values[id]= value;
    //live-change the property of the same name in the input_values

    
  }
  onBlur=({target:{id,value}})=>{
    console.log('on blur',value);
    console.log(id);
      this.setState({
          [id+'Err']:existance(value),
          //e.g if this id is 'email', then it will return emailErr:existance(value)
      })
  }

  render() {
    const { location : { pathname } } = this.props;
    return (  
      <div style={styles.container} className={styles.container_class}>
        <img src={bgpic} style={styles.image} className={styles.image_class}  alt=''/>
        <div style={styles.panel.container} className={styles.panel.container_class}>
          <div style={styles.panel_row} className={styles.panel_row_class}>
            <div style={styles.panel_col} className={styles.panel_col_class}>
              <div style={styles.panel.space} className={styles.panel.space_class}>
                
                <p style={styles.text_title}>BIG FISH</p>
                <TextInput id='email' onChange={this.onChange} onBlur={this.onBlur} errMsg={this.state.emailErr} placeholder="Email"/>
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

                <Button id="signup" onClick={this.onSubmit} label={ pathname ==='/signup'? 'SignUp': 'Login'}/>
              
              </div> 
              <div style={styles.panel.footer} className={styles.panel.footer_class}>
                <div className={styles.panel.footer_width}>
                <Route  path={'/signup'} render={()=>
                <>               
                  <span style={styles.text_bottom_left}>Already have an account?  </span>
                  <Link to='./login'><span style={styles.text_bottom_right}>Login</span></Link>
                </>
                }
                />
                <Route exact path={['/login', '/']} render={()=>
                <>               
                  <span style={styles.text_bottom_left}>Don't have an account?  </span>
                  <Link to='./signup'><span style={styles.text_bottom_right}>SignUp</span></Link>
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
