import React from 'react';

import Text from './TextCostume';
import styles from '../styles/Question';
import WhiteBlank from './WhiteBlank';

export default function Question(props) {
  const {
    title,
    content,
    style,
  } = props;

  return (
    <div style={{ ...styles.container, ...style }}>
      <Text type='Roboto-Regular bold' >{title}</Text>
      <WhiteBlank h={8} />
      <Text>{content}</Text>
    </div>
  );
}

Question.defaultProps = {
  title: "",
  content: "",
}
