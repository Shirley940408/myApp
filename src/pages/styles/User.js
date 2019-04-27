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
  }
}
export default styles;