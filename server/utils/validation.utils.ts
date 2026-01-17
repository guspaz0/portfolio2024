export const toArrayOfNumbers = ({ value }: Record<string, any>) => {
    if (!import.meta.server) {
        if (Array.isArray(value)) {
            return value.map((val: string) => +val)
        }
        return [+value]
    }
    return value.split(',').map((val: string) => +val)
}