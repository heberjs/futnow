//@ts-nocheck

import logic from '../logic'
import { useState, useEffect } from 'react'
import MatchesList from './MatchesList'
import { useContext } from '../context.ts'

function Profile({ setStamp }) {
    const [matches, setMatches] = useState([])
    const [view, setView] = useState(null)

    const { showFeedback } = useContext()

    const clearView = () => setView(null)

    const loadMatches = () => {

        try {
            logic.retrieveJoinedMatches()
                .then(matches => {
                    const upComingMatches = matches.filter(match => new Date(match.date) > new Date())
                    setMatches(upComingMatches)
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadMatches()
    }, [])

    const handleOnJoinedClick = () => {

        clearView()
        loadMatches()
    }

    const handleOnUnJoinedClick = () => {
        clearView()
        loadMatches()
        setStamp(Date.now())
    }

    return <>

        <section className='flex flex-col min-h-screen max-h-full'>



            <MatchesList matches={matches} onJoinedClick={handleOnJoinedClick} onUnJoinedClick={handleOnUnJoinedClick} />
        </section>
    </>
}

export default Profile