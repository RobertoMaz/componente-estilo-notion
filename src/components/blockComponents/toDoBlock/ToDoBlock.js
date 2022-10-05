import { forwardRef } from "react";
import Input from "../../Input";


function ToDoBlock({focus, item, onChange, onKeyDown}, ref) {

    function handleOnChange(e) {
        onChange(item, e);
    }

    function handleOnKeyDown(e) {
        onKeyDown(item, e);
    }


    return (
        <div>
            <input 
                type="checkbox" 
                name="checkbox" 
                onChange={handleOnChange}
                checked={item.completed}    
            />
            <Input 
                name="text"
                ref={focus ? ref : null}
                value={item.text} 
                onChange={handleOnChange}
                onKeyDown={handleOnKeyDown}
            />         
        </div>
    );
}

export default forwardRef(ToDoBlock);