import React from 'react';
import TextCostume from './TextCostume';
import styles from '../styles/Question';
import WhiteBlank from './WhiteBlank';
import Avatar from './Avatar';
import Like from './Like';
// import UserFetcher from './UserFetcher';

export default function Answer(props) {
  const {
    content,
    style,
    className,
    createAt,
    numOfLikes,
    userID
  } = props;

  return (
    <div className={className} style={{ ...styles.container, ...style }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
        {/* <UserFetcher id={userID}>
          {
            (user) => */}
              <>
                <Avatar size={63}/>
                <WhiteBlank w={15} />
                <div style={{ flex: 1 }}>
                  <TextCostume>{'HaHaHa'}</TextCostume>
                  <WhiteBlank h={5} />
                  <TextCostume type="light">{createAt.slice(0, 10)}</TextCostume>
                </div>
              </>
          {/* }
        </UserFetcher> */}

      </div>
      <WhiteBlank h={5} />
      <TextCostume>{content}</TextCostume>
      <WhiteBlank h={8} />
      {/* <Like num={numOfLikes} /> */}
    </div>
  );
}

Answer.defaultProps = {
  content: "",
}
