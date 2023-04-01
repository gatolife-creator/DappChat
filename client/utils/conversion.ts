export const solidityTimestampToDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}

export const timestampToDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`;
}