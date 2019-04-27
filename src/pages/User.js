import React, { Component } from 'react';
import UserFetcher from '../component/UserFetcher';
import styles from './styles/User';
import defaultAvatar from '../imgs/avatar_default.jpg';
import TextCostume from '../component/TextCostume';
import {connect} from 'react-redux';
class User extends Component{
  
  render(){
    const { id } = this.props.match.params;
    const { user_token } = this.props;
    console.log(id);
    return(
      <div style={styles.container}>
      <UserFetcher id={id}>
      {user=>{
        return(
          <div style={styles.panel_container}>
            <Avatar style={styles.avatar} 
            avatarURL={user.avatar_url}
            editable={user_token.user_id == id}
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
const mapState = state =>({
  user_token: state.user_token
})
export default connect (mapState,null)(User);
class Avatar extends Component{
  fileInputRef = ref => {
    this._file_input = ref;
  }
  onClick=()=>{
    this._file_input && this._file_input.click();
  }
  stopBubble = e =>{
    // e.stopPropagation();
    // e.preventDefault();
  }
  render(){
    const {avatarURL, style, editable}=this.props;
    // console.log(editable);
    return(
      <div style={{...style, backgroundImage:`url(${avatarURL||defaultAvatar})`, ...styles.avatar_image}}>
      {editable? 
      <div style={styles.overlay}
      onClick={this.onClick}>
        <img style={styles.icon_camera} src={require('../imgs/icons/photo-camera.svg')}/>
        <TextCostume type='white' style={styles.text_avatar}>Edit your avatar</TextCostume>
        <input onClick={this.stopBubble} type='file' style={{display:'none'}} ref={this.fileInputRef}/>
      </div>:null
      }
      </div>
    );
  }
} 