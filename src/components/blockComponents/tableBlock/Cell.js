import { useEffect, useRef, useState } from "react";
import Input from "../../Input";

function Cell({text, onChange, canBeEdited}) {
    const [editable, setEditable] = useState(false);
    const [value, setValue] = useState(text);
    const ref = useRef(null);

    useEffect(() => {
        setValue(text);
    }, [text]);

    useEffect(() => {
        if(ref.current){
            ref.current.focus();
        }
    }, [editable]);

    function handleOnDoubleClick() {
        setEditable(true);
    }

    function handleOnChange(e) {
        setValue(e.target.value);
    }

    function handleOnBlur() {
        onChange(value);
        setEditable(false);
    }

    function handleOnKeyDown(e) {
        if(e.key === "Enter") {
            e.target.blur();
        }
    }

    return editable && canBeEdited
        ?   (<td>
                <Input 
                    value={value} 
                    onChange={handleOnChange}
                    ref={ref}  
                    onBlur={handleOnBlur}  
                    onKeyDown={handleOnKeyDown}
                />
            </td>)
        :   (<td 
                key={crypto.randomUUID()}
                onDoubleClick={handleOnDoubleClick}>
                {value}
            </td>
        );
}

export default Cell;