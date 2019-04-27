import React from 'react';
import Text from './TextCostume';
import WhiteBlank from './WhiteBlank';
import { COLOR_LIGHT_ORANGE,  COLOR_THEME } from '../constants';
import { connect } from 'react-redux';


const Like = ({ num, liked, question_id, like, dislike, getAll}) => {
  // liked = true;
  const text_style = liked ? 's white' : 's red'
  return (
  <div className="hover-scale" 
  style={{...styles.container, backgroundColor: liked ? COLOR_THEME : COLOR_LIGHT_ORANGE}}
  onClick={(event)=>{
    // event.stopPropagation();
    event.preventDefault();
    liked? dislike(question_id, getAll): like(question_id, getAll);
  }}
  >
    <Text type={text_style}>▲</Text>
    <WhiteBlank w={11} />
    <Text type={text_style}>Agree {num}</Text>
  </div>)
}

const mapDispatch = ({questions:{like,dislike,getAll}})=>({
  like:(question_id,success_callback) => like({question_id,success_callback}),
  dislike:(question_id,success_callback) =>dislike({question_id,success_callback}),
  getAll: ()=>getAll(),
});
export default connect(null,mapDispatch)(Like);


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 109,
    height: 30,
    borderRadius: 5
  }
}

// export default Like;