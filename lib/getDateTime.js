const getDateTime = (date) => {
    if (!(date instanceof Date)){
        try {
            date = new Date(date)
        } catch {
            throw Error("Failed to parse date object")
        }
    }

    return `${date.toLocaleTimeString("en-GB", {hour: '2-digit', minute: '2-digit'})} ${date.toLocaleDateString("en-GB")}`
}

export default getDateTime