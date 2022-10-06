import { forwardRef } from "react";
import Button from "../../Button";
import TableBlock from "./TableBlock";

function TableBlockView({data, columns, onChange, onCreate, onCreateNewColumn, onRemove}, ref) {

    function handleNewColumn() {
        const name = prompt("Nombre de la columna");
        if(!!name) {
            onCreateNewColumn(name);
        }
    }

    function handleNewRow() {
        onCreate();
    }

    function handleOnChange(rowIndex, property, value) {
        const item = data[rowIndex][property] = value;
        onChange({
            type: "table",
            id: item.id,
            text: item.text,
            completed: item.completed,
            updatedItem: item
        });
    }

    function handleRemoveColumn() {
        const name = prompt("Nombre de la columna a ELIMINAR");
        if(!!name) {
            onRemove(name);
        }
    }

    return (
        <div>
            <Button onClick={handleNewColumn}>Agregar nueva columna</Button>
            <Button onClick={handleNewRow}>Agregar nueva fila</Button>
            <Button onClick={handleRemoveColumn}>Eliminar columna</Button>
            <TableBlock 
                columns={columns} 
                data={data}
                onChange={handleOnChange}
            />
        </div>
    );
}

export default forwardRef(TableBlockView);