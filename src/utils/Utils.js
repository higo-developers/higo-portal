export const isNullOrUndefined = (value) => { return value === null || value === undefined; };
export const isNotNullOrUndefined = (value) => { return !isNullOrUndefined(value) };

export const handlePossibleErrorResponse = (response) => {
    if (isNotNullOrUndefined(response.errorMessage))
        throw new Error(response.errorMessage)
};