import React from 'react';
import Text from './TextCostume';
import WhiteBlank from './WhiteBlank';
import { COLOR_LIGHT_ORANGE,  COLOR_THEME } from '../constants';


const Like = ({ num, liked }) => {
  const text_style = liked ? 's white' : 's red'
  return <div className="hover-scale" style={{...styles.container, backgroundColor: liked ? COLOR_THEME : COLOR_LIGHT_ORANGE}}>
    <Text type={text_style}>▲</Text>
    <WhiteBlank w={11} />
    <Text type={text_style}>Agree {num}</Text>
  </div>
}


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

export default Like;