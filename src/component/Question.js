import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import Text from './TextCostume';
import styles from '../styles/Question';
import WhiteBlank from './WhiteBlank';
import Like from './Like';

export default function Question(props) {
  const {
    title,
    content,
    style,
    id,
    numOfLikes,
    liked,
  } = props;
  console.log(id);
  return (
    <NavLink to={`/questions/${id}`}>
      <div style={{ ...styles.container, ...style }} >
      <Text type='Roboto-Regular bold' >{title}</Text>
      <WhiteBlank h={8} />
      <Text>{content}</Text>
      <WhiteBlank h={15}/>
      {<Like question_id={id} num={numOfLikes} liked={liked} />}
    </div>
    </NavLink>
  );
}

Question.defaultProps = {
  title: "",
  content: "",
}
