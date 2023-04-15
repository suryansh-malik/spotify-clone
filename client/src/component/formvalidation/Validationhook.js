import { useState } from 'react';
const Validationhook = (validatevalue) => {
    const [inputvalue, setinputvalue] = useState('')
    const [touched, settouched] = useState(false);
    const inputisvalid = validatevalue(inputvalue) && touched;
    let classname = "valid-input";
    const changetouched = (value) => {
        settouched(value)
    }
    const changeinputvalue = (value) => {
        setinputvalue(value);
    }
    const reset = () => {
        settouched(false)
        setinputvalue('')
    }
    if (touched) {
        if (inputisvalid) {
    classname="valid-input"
    } else {
        classname="invalid-input"
}
    }
    


    return {
        inputisvalid,
        changetouched,
        changeinputvalue,
        reset,
        classname,
        touched,
        inputvalue

        
}
}
export default Validationhook