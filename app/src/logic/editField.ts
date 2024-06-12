//@ts-nocheck

import { validate } from "com"

function editField(fieldId: string, name: string, address: string, location: [number, number]) {
    validate.text(name, 'name')
    validate.text(address, 'address')
    validate.coords(location)

    const [, payloadB64] = sessionStorage.token.split('.')
    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    const field = { name, address, location }

    const json = JSON.stringify(field)

    return fetch(`${import.meta.env.VITE_API_URL}/fields/edit/${fieldId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 200) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default editField