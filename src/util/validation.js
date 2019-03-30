export function existance(value){

    if(!value){
        const err='Required';
        return err;        
    }
}

//  const validations =  (value) => {
//         if(!value.match(/[\w-]+@([\w-]+)\.+[\w-]+/i)){
//             const err='invalid email';
//             return err;
//         }
//     }


// validations.email()
export function email(value){
    if(!value.match(/[\w-]+@([\w-]+)\.+[\w-]+/i)){
        const err='invalid email';
        return err;
    }
}


export function upperCase(value){
    if(!value.match(/[A-Z]/)){
        const err='At lease one uppercase';
        return err;              
    }          
}

export function lowerCase(value){
    if(!value.match(/[a-z]/)){
        const err='At lease one lowercase';
        return err;        
    }
}
export function pwdLength(value){
    var arr=value.split('');
    if(arr.length<6||arr.length>15){
        const err=`it should between 6 - 15`;
        return err;
    }
}
export function nameLength(value){
    var arr=value.split('');
    if(arr.length<=0||arr.length>20){
        const err=`it should between 1 - 19`;
        return err;
    }
}

//     function pwdValidation(value){
    
//     if(existance(value)){
//         const err=existance(value);
//         return err;
//     }
//     if(upperCase(value)){
//         const err=upperCase(value);
//         return err;
//     }
//     if(lowerCase(value)){
//         const err=lowerCase(value);
//         return err;
//     }
//     if(pwdLength(value)){
//         const err=pwdLength(value);
//         return err;
//     }
//  function nameValidation(value){
    
//     if(existance(value)){
//         const err=existance(value);
//         return err;
//     }
//     if(nameLength(value)){
//         const err=nameLength(value);
//         return err;
//     }        
//  function emailValidation(value){
    
//     if(existance(value)){
//         const err=existance(value);
//         return err;
//     }
//     if(email(value)){
//         const err=email(value);
//         return err;
//     } 
// }
export function validate(rules, value=''){
    if(rules.constructor != Array){
        rules = [rules];
    }
    const n=rules.length;
    for(let i=0; i<n; i++){
        if(rules[i](value)){
           return rules[i](value);  
        //    console.log(rules[i](value));
        }
    }
}
// var test=validate([upperCase, email],'Lalalaal');
// console.log(test);


// emailValidation(existance) = validate([existance, email], input)


