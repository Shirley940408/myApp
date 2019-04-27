import React, { Component } from 'react';
import UserFetcher from '../component/UserFetcher';
import styles from './styles/User';
import defaultAvatar from '../imgs/avatar_default.jpg'
export default class User extends Component{
  
  render(){
    const { id }= this.props.match.params;
    console.log(id);
    return(
      <div style={styles.container}>
      <UserFetcher id={id}>
      {user=>{
        return(
          <div style={styles.panel_container}>
            <img style={styles.avatar_image} src={user.avatar_url||defaultAvatar} alt=""/>
            <div style={styles.info_container}>
              
            </div>
          </div>
        )
      }}
      </UserFetcher>
      </div>
    );
  }
}
