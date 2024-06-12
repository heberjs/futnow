//@ts-nocheck

import { validate, errors } from 'com'

function registerManager(fullname: string, email: string, password: string) {
    validate.text(fullname)
    validate.email(email)
    validate.password(password)


    const user = { fullname, email, password }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/managers`, {
        method: 'POST',
        headers: {
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

export default registerManager