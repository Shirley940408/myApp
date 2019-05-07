const styles = {
  container:{
    width:'100vw',
  },
  panel_container:{
    //styling self
    marginLeft:'auto',
    marginRight:'auto',
    width: 1200,
    background:'white',
    marginTop:56,
    //styling children
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  info_container:{
    //styling children
    display:'flex',
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
  },
  avatar:{
    marginLeft:30,
    // marginTop:-36,
    position:'relative',
    top:-36,
  },
  avatar_image:{
    width:250,
    height:250,
    backgroundSize:'cover',
    backgroundPosition:'center',
  },
  overlay:{
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0,
    backgroundColor:'rgba(233,231,239,0.5)',
    cursor:'pointer',
    //styling children
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  icon_camera:{
    width:100,
    height:80,
  },
  text_avatar:{
    marginTop: 49,
  },
  row_first_container:{
    display:'flex',
    // flex
  },
  edit_button:{
    marginLeft: 30,
  }
}
export default styles;