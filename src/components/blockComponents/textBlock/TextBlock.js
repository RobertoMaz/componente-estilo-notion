import { forwardRef } from "react";
import Input from "../../Input";

function TextBlock({item, onChange, onKeyDown, focus}, ref) {

    function handleOnChange(e) {
        onChange(item, e);
    }

    function handleOnKeyDown(e) {
        onKeyDown(item, e);
    }

    return (
        <Input 
            border
            placeholder="Ingresa tu tarea"
            ref={focus ? ref : null}
            value={item.text} 
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
        >      
        </Input>
    );
}

export default forwardRef(TextBlock);