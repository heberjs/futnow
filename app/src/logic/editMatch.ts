//@ts-nocheck
import { validate } from "com"

function editMatch(matchId: string, title: string, description: string, date: string) {


    const [, payloadB64] = sessionStorage.token.split('.')
    const payloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    const match = { title, description, date }

    const json = JSON.stringify(match)

    return fetch(`${import.meta.env.VITE_API_URL}/matches/edit/${matchId}`, {
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

export default editMatch