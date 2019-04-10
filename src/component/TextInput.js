import React, { Component } from 'react';
import styles from '../styles/Text';
import TextCostume from './TextCostume';
import './Text.css';
export default class TextInput extends Component{

    render(){
        const{
            style,
            errMsg,
            children,
            ...rest
        }=this.props;
        return(
            <div style={style}>
                <input {...rest} style={styles}/>

                <div style={styles.line(errMsg)}></div>
                {/* <div style={{...styles.line, borderColor: this.props.errMsg? 'red':'#D8D8D8'}}></div> */}

                {/* <div ></div> */}
                <TextCostume style={styles.errorBlock} type='xs err'><span>{errMsg}</span></TextCostume>
            </div>
            
            

            
                            
            
            
        )
    }
}

