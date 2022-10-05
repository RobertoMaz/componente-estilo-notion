import { forwardRef } from "react";
import Cell from "./Cell";
import Headers from "./Headers";
import "./table.css"

function TableBlock({columns, data, onChange}) {
    return (
        <table>
            <thead>
                <Headers columns={columns}/>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={crypto.randomUUID()}>
                        {columns.map((cell, cellIndex) => (
                            <Cell 
                                key={crypto.randomUUID()} 
                                text={row[cell].toString() ?? ""}
                                onChange={(value) => onChange(rowIndex, cell, value)}
                                canBeEdited={columns[cellIndex] !== "id" && columns[cellIndex] !== "completed"}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default forwardRef(TableBlock);