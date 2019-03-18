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
function email(value){
    if(!value.match(/[\w-]+@([\w-]+)\.+[\w-]+/i)){
        const err='invalid email';
        return err;
    }
}


function upperCase(value){
    if(!value.match(/[A-Z]/)){
        const err='At lease one uppercase';
        return err;              
    }          
}

function lowerCase(value){
    if(!value.match(/[a-z]/)){
        const err='At lease one lowercase';
        return err;        
    }
}
function pwdLength(value){
    var arr=value.split('');
    if(arr.length<6||arr.length>15){
        const err=`it should between 6 - 15`;
        return err;
    }
}
function nameLength(value){
    var arr=value.split('');
    if(arr.length<=0||arr.length>20){
        const err=`it should between 1 - 19`;
        return err;
    }
}

//format 位置传 validation
export function pwdValidation(value){
    
    if(existance(value)){
        const err=existance(value);
        return err;
    }
    if(upperCase(value)){
        const err=upperCase(value);
        return err;
    }
    if(lowerCase(value)){
        const err=lowerCase(value);
        return err;
    }
    if(pwdLength(value)){
        const err=pwdLength(value);
        return err;
    }
}
export function nameValidation(value){
    
    if(existance(value)){
        const err=existance(value);
        return err;
    }
    if(nameLength(value)){
        const err=nameLength(value);
        return err;
    }        
}
export function emailValidation(value){
    
    if(existance(value)){
        const err=existance(value);
        return err;
    }
    if(email(value)){
        const err=email(value);
        return err;
    } 
}


// emailValidation(existance) = validate([existance, email], input)


