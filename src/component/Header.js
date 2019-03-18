import React from 'react';
import './Text.css';
import styles from '../styles/Header';
import Text from './TextCostume';

export default function Header(props) {
  return (
    <div style={styles.container}>
      <Text type='l RussoOne' style={styles.logo}>BIG FISH</Text>
      <img
        style={styles.avatar}
        src={props.avatarSrc}
        alt="avatar" />
    </div>
  );
}
