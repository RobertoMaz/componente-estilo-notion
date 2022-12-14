function Headers({columns}) {
    return (
        <tr>
            {columns.map((head) => (<th key={crypto.randomUUID()}>{head}</th>))}
        </tr>
    );
}

export default Headers;