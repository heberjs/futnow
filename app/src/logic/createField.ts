//@ts-nocheck
import { validate, errors } from 'com'


function createField(name: string, address: string, location: [number, number]) {
    validate.text(name)
    validate.text(address)
    validate.coords(location)

    const field = { name, address, location }

    const json = JSON.stringify(field)

    return fetch(`${import.meta.env.VITE_API_URL}/fields`, {
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

export default createField