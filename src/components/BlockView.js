import { useRef, useState } from "react";
import TableBlockView from "./blockComponents/tableBlock/TableBlockView";
import TextBlockView from "./blockComponents/textBlock/TextBlockView";
import ToDoBlockView from "./blockComponents/toDoBlock/ToDoBlockView";
import Button from "./Button";
import "./blockView.css";

function BlockView() {
    const ref = useRef(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [type, setType] = useState("text");
    const [properties, setProperties] = useState(["id", "text", "completed"]);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState([
        {
            id: crypto.randomUUID(),
            text: "",
            completed: false
        }
    ]);

    // handleChange, realiza cambios en el estado de data dependiendo de en que type estamos.
    function handleChange(item){
        const {type, text, id} = item;

        if(type === "text"){
            const temp = [...data];
            const editItem = temp.find(i => i.id === id);
            if(editItem){
                editItem.text = text;
                setData(temp);
            }
        }

        if(type === "todo"){
            const temp = [...data];
            const editItem = temp.find(i => i.id === id);
            if(editItem){
                editItem.text = text ?? editItem.text;
                editItem.completed = item.completed ?? editItem.completed;
                setData(temp);
            }
        }

        if(type === "table"){
            const temp = [...data];
            let editItem = temp.find(i => i.id === id);
            if(editItem){
                editItem = item.updatedItem;
                setData(temp);
            }
        }
    }

    // handleOnCreate, podemos crear campos nuevos
    function handleOnCreate() {
        const newItem = {
            id: crypto.randomUUID(),
            text: "",
            completed: false
        };

        properties.forEach(props => {
            if(!newItem.hasOwnProperty(props)){
                newItem[props] = "";
            }
        });

        const temp = [...data, newItem];
        setData(temp);
        setCurrentItem(newItem);
    }

    // TypesSelector, podemos seleccionar el type de los botones.
    function TypesSelector() {
        return ( 
            <div style={{position: "relative", marginTop: "20px"}}>
                
                {/* Button es un styled component que va abrir el menu de seleccion. */}
                <Button inverted menu onClick={() => setVisible(!visible)}>...</Button>
                <div className="typesSelectorButtons" style={{display: visible ? "flex" : "none"}}>
                    <button className="blockViewButton" onClick={() => setType("text")}>LISTA DE TAREAS</button>
                    <button className="blockViewButton" onClick={() => setType("todo")}>TAREAS REALIZADAS</button>
                    <button className="blockViewButton" onClick={() => setType("table")}>TABLA DE TAREAS</button>
                </div>
            </div>
        );
    }

    // handleNewColumn, nos permite crear nuevas columnas
    function handleNewColumn(name) {
        const newProperties = [...properties, name];
        const temp = [...data];

        for(let i = 0; i < temp.length; i++){
            const item = temp[i];

            for(let j = 0; j < newProperties.length; j++){
                const prop = newProperties[j];

                if(item.hasOwnProperty(prop)){
                    console.log("ya existe la propiedad", prop);
                } else {
                    item[prop] = "";
                }
            }
        }
        setProperties(newProperties);
        setData(temp);
    }

    if(type === "todo"){
        return (
            <div className="blockViewContainer">
                <TypesSelector />
                <ToDoBlockView
                    ref={ref} 
                    focusId={currentItem?.id}
                    data={data} 
                    onChange={handleChange} 
                    onCreate={handleOnCreate}
                />
            </div>
        );
    }

    //TODO: crear boton para borrar columnas
    if(type === "table"){
        return (
            <div className="blockViewContainer">
                <TypesSelector />
                <TableBlockView
                    ref={ref} 
                    focusId={currentItem?.id}
                    data={data} 
                    columns={properties}
                    onChange={handleChange} 
                    onCreate={handleOnCreate}
                    onCreateNewColumn={handleNewColumn}
                />
            </div>
        );
    }

    return (
        <div className="blockViewContainer">
            <TypesSelector />
            <TextBlockView 
                ref={ref} 
                focusId={currentItem?.id}
                data={data} 
                onChange={handleChange} 
                onCreate={handleOnCreate}
            />
        </div>
    );
}

export default BlockView;