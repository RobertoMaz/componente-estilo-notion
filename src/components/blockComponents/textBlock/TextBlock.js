import Input from "../../Input";

function TextBlock({item, onChange, onKeyDown}) {


    function handleOnChange(e) {
        onChange(item, e);
    }

    function handleOnKeyDown(e) {
        onKeyDown(item, e);
    }

    return (
        <Input 
            value={item.text} 
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
        >      
        </Input>
    );
}

export default TextBlock;