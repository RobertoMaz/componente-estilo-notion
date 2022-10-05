import ToDoBlock from "./ToDoBlock";
import { forwardRef, useEffect } from "react";

function ToDoBlockView({data, onChange, onCreate, focusId}, ref) {

    useEffect(() => {
        if(focusId){
            ref.current.focus();
        }
    }, [focusId]);

    function handleOnChange(item, e) {
        switch (e.target.name) {
            case "checkbox":
                onChange({
                    type: "todo",
                    id: item.id,
                    completed: e.target.checked    
                });
                
                break;
                case "text":
                    onChange({
                        type: "todo",
                        id: item.id,
                        text: e.target.value    
                    });   
                break;
        
            default:
                break;
        }
        // onChange({
        //     type: "text",
        //     id: item.id,
        //     text: e.target.value,
        //     completed: item.completed
        // });
    }

    function handleOnKeyDown(item, e) {
        if(e.key === "Enter"){
            onCreate();
        }
    }

    return data.map((item) => (
        <ToDoBlock 
            ref={ref}
            focus={focusId === item.id}
            key={item.id} 
            item={item} 
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}    
        />
    ));
}

export default forwardRef(ToDoBlockView);