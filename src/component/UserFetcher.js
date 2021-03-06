import { connect } from 'react-redux';
function UserFetcher({id,user,getUser,children}){
  // console.log(getUser)
  !user && getUser(id)
  return children(user||{});
}
const mapState = (state,own_props)=>({
  user : state.users[own_props.id]
})

const mapDispatch = dispatch =>({
  getUser: id => dispatch.users.getUser(id)
})

export default connect (mapState,mapDispatch)(UserFetcher)