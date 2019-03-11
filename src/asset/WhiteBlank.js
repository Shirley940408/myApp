import React, { Component } from 'react';
export default class WhiteBlank extends Component{
    static defaultProps={
        w:0,
        h:0
    }
    render(){

        let{
            w,
            h
        }=this.props;

        switch(h){
            case'm':
            h = 8;
            break;

            default:
            break;
        }

        return <div style={{width:w,height:h}}></div>
    }
    
}
