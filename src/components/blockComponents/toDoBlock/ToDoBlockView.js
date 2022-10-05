import ToDoBlock from "./ToDoBlock";
import { forwardRef } from "react";

function ToDoBlockView({data, onChange, onCreate, focusId}, ref) {

    //handleOnChange, nos permite  hacer switch entre checkbox y text, despues pasa parametros a onChange, para poder realizar los cambios.
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
    }

    // handleOnKeyDown, esta a la espera del Evento en este caso seria cuando apretamos "Enter", ejecutar onCreate();
    function handleOnKeyDown(e) {
        if(e.key === "Enter"){
            onCreate();
        }
    }

    return data.map((item) => (
        // en ToDoBlock vamos a encontrar los inputs de la seccion ToDo.
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