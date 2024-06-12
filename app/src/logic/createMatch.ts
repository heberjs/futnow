//@ts-nocheck
import { validate, errors } from 'com'


function createMatch(title, description, date, fieldId) {
    validate.text(title)
    validate.text(description)
    validate.text(date)
    validate.text(fieldId, 'fieldId', true)
    validate.token(sessionStorage.token)

    const match = { fieldId, title, description, date }

    const json = JSON.stringify(match)

    return fetch(`${import.meta.env.VITE_API_URL}/matches`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default createMatch
