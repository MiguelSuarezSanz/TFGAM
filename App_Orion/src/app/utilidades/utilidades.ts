export function formatDate(date: Date | string): string {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // meses: 0-11
    const year = d.getFullYear();

 return `${day}-${month}-${year}`;
}



export function parseErrorsApi(response: any): string[] {
    const result: string[] = [];

    if (response.error) {
        if (typeof response.error === 'string') {
            result.push(response.error)
        } else if (Array.isArray(response.error)) {
            response.error.forEach((valor: { description: string; }) =>
                result.push(valor.description)
            );
        } else {
            const mapErrors = response.error.errors;
            const entries = Object.entries(mapErrors);

            entries.forEach((arreglo: any[]) => {
                const campo = arreglo[0];

                arreglo[1].forEach((messageError: any) => {
                    result.push(`${campo}: ${messageError}`);
                })
            })
        }
    }

    return result;
}