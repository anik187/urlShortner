import * as z from 'zod'

const prettifyError = (zodError) => {
    return z.prettifyError(zodError)
}

export default prettifyError