export const convertEmailQueryParams =  <TQueryParameters extends Record<string, any>>(parameters: TQueryParameters) => {
    const { recipient = undefined, author = undefined} = parameters;
    let condition = {};

    if (recipient) {
        condition = {...condition, 'recipients': recipient}
    }

    if (author) {
        condition = {...condition, ...{ author }}
    }

    return condition
}
