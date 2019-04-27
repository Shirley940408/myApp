import React, { Component } from 'react';
import UserFetcher from '../component/UserFetcher';
import styles from './styles/User';
import defaultAvatar from '../imgs/avatar_default.jpg';
import TextCostume from '../component/TextCostume';
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
            <Avatar style={styles.avatar} 
            avatarURL={user.avatar_url}
            />
            <div style={styles.info_container}>
              <TextCostume type='xl'>{user.name}</TextCostume>
              {/* <TextCostume ></TextCostume> */}
            </div>
          </div>
        )
      }}
      </UserFetcher>
      </div>
    );
  }
}

class Avatar extends Component{
  render(){
    const {avatarURL,style}=this.props;
    return(
      <img style={{...style,...styles.avatar_image}} src={avatarURL||defaultAvatar} alt=""/>
    );
  }
}