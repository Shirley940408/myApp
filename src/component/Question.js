import React from 'react';
import { NavLink, Link } from 'react-router-dom'
import Text from './TextCostume';
import styles from '../styles/Question';
import WhiteBlank from './WhiteBlank';

export default function Question(props) {
  const {
    title,
    content,
    style,
    id,
  } = props;
  console.log(id);
  return (
    <NavLink to={`/questions/${id}`}>
      <div style={{ ...styles.container, ...style }} >
      <Text type='Roboto-Regular bold' >{title}</Text>
      <WhiteBlank h={8} />
      <Text>{content}</Text>
    </div>
    </NavLink>
  );
}

Question.defaultProps = {
  title: "",
  content: "",
}
