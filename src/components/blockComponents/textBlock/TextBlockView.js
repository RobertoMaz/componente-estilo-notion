import { forwardRef, useEffect } from "react";
import TextBlock from "./TextBlock";

function TextBlockView({data, onChange, onCreate, focusId}, ref) {

    useEffect(() => {
        if(focusId){
            ref.current.focus();
        }
    }, [focusId]);

    function handleOnChange(item, e) {
        onChange({
            type: "text",
            id: item.id,
            text: e.target.value,
            completed: item.completed
        });
    }

    function handleOnKeyDown(item, e) {
        if(e.key === "Enter"){
            onCreate();
        }
    }

    return data.map((item) => (
        <TextBlock 
            ref={ref}
            focus={focusId === item.id}
            key={item.id} 
            item={item} 
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}    
        />
    ));
}

export default forwardRef(TextBlockView);