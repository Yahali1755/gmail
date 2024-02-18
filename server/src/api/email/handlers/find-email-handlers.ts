export const convertEmailQueryParams =  <TQueryParameters extends Record<string, any>>(parameters: TQueryParameters) => {
    const { recipient, author} = parameters;
    const condition = [];

    if (recipient) {
        condition.push({recipients: recipient})
    }

    if (author) {
        condition.push({ author })
    }

    return {$and: condition}
}
