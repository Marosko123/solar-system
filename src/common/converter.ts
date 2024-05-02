export const converter = {
    dateToString: (date: Date): string => {
        return date.toISOString().slice(0, 10)
    }
}
