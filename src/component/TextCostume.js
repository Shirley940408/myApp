import React from 'react';
import'./Text.css';
export default function TextCostume({type, children,...rest}){
    return <div {...rest} className={'text-base '+type} > {children}</div>
}