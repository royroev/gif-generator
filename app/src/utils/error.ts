export const getErrorMessage = (error: Error | { message: string } | string) =>
    typeof error !== 'string' ? error.message : error
