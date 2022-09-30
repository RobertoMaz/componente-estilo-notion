import { useRef, useState } from "react";
import TextBlockView from "./blockComponents/textBlock/TextBlockView";

function BlockView() {

    const ref = useRef(null);
    const [currentItem, setCurrentItem] = useState(null);
    const [type, setType] = useState("text");
    const [properties, setProperties] = useState(["id", "text", "completed"]);
    const [data, setData] = useState([
        {
            id: crypto.randomUUID(),
            text: "hola a todos",
            completed: false
        }
    ]);

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
    }

    function handleOnCreate() {
        const newItem = {
            id: crypto.randomUUID(),
            text: "hola",
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

    return (
        <div>
            <TextBlockView 
                ref={ref} 
                data={data} 
                onChange={handleChange} 
                onCreate={handleOnCreate}
            />

        </div>
    );
}

export default BlockView;