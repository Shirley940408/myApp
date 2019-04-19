import React, { Component } from 'react';
// import Signup from './SignInSignUp';
import SignInSignUp from './SignInSignUp';
import {Route, Switch, Redirect,BrowserRouter }from 'react-router-dom';
// import avatar_default from '../imgs/avatar_default.jpg';
import Questions from './Questions';
import styles from './styles/App';
import Header from '../component/Header';
import { connect } from 'react-redux';
class App extends Component {

  state={
    user_token: null,
  }
  render() {
    const { token }=this.props;
    return (
 
      <BrowserRouter>
        <>
        
        {token ?
            <div style={styles.page}>
              {/* <Header avatarSrc={avatar_default} /> */}
              {/* <Header avatarSrc={require('../assets/imgs/avatar_default.jpg')} /> */}
              <Switch>
                {/* <Route path="/questions" render={(props) => <Questions {...props} />} /> */}
                <Route path="/questions" render={() => <Questions userToken={this.state.user_token} />}/>
                <Redirect to="/questions" />
              </Switch>
            </div> 
            :
            <Switch>
              <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp onLogin={this.onLogin} />} />
              <Redirect to="/login" />
            </Switch>
          }
           
          {/* <Switch>
            <Route path="/questions" render={() => <Questions userToken={this.state.user_token} />} />
            <Route path={['/', '/signin', '/login']} render={() => <SignInSignUp onLogin={this.onLogin} />} />
            <Redirect to="/login"/>
          </Switch> */}
          {/* <Popups ref={register} /> */}
        </>
      </BrowserRouter>

    );
  }
  onLogin=(user_token)=>{
    this.setState({user_token});
  }
}
  // function Route(props){
  //   return window.location.pathname ? <props.component/>:null;
  // }

export default connect(state=>({token: state.user_token}))(App) ;
