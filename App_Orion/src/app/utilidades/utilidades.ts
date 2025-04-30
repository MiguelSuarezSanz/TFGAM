export function formatDate(date: Date){
    date = new Date(date);

    const format = new Intl.DateTimeFormat('en', {
        year:'numeric',
        month: '2-digit',
        day: '2-digit'
    });
    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date)

    return `${day}-${month}-${year}`;

}


export function parseErrorsApi(response: any): string[]{
    const result: string[] = [];

    if(response.error){
        if(typeof response.error === 'string'){
            result.push(response.error)
        }else if(Array.isArray(response.error)){
            response.error.forEach((valor: { description: string; }) => 
                result.push(valor.description)
            );
        }else{
            const mapErrors = response.error.errors;
            const entries = Object.entries(mapErrors);

            entries.forEach((arreglo: any[]) => {
                const campo = arreglo[0];

                arreglo[1].forEach( (messageError: any) => {
                    result.push(`${campo}: ${messageError}`);
                })
            })
        }
    }

    return result;
}