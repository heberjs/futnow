//@ts-nocheck
import { useNavigate, Route, Routes } from 'react-router-dom'
import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import FooterNav from '../components/FooterNav'
import MatchesList from '../components/MatchesList'
import FieldList from '../components/FieldList'
import CreateMatch from '../components/CreateMatch'
import CreateField from '../components/CreateField'
import EditMatch from '../components/EditMatch'

import { useContext } from '../context.ts'

function HomeManager() {
    const navigate = useNavigate()

    logger.debug('HomeManager -> Render')


    const [match, setMatch] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [matches, setMatches] = useState([])

    const { showFeedback } = useContext()


    const clearView = () => setView(null)
    const handleLoggedOut = () => navigate('/login')

    const loadMatches = () => {

        try {

            logic.retrieveManagerMatches()

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
    }, [stamp])



    const handleMatchCreated = () => {
        clearView()
        loadMatches()
    }



    const handleClickedCreateForm = () => setView(`create-match`)

    const handleCancelClicked = () => setView(null)

    const handleEditMatchFormClick = match => {
        setView('edit-match')
        setMatch(match)
    }
    const handleMatchEdited = () => {
        clearView()
        loadMatches()
        setMatch(null)
    }

    const handleOnDeleteMatchClick = () => loadMatches()

    const handleCreateFieldCancelled = () => clearView()

    const handleCreateFieldAccepted = () => {

        setStamp(Date.now())
        clearView()
    }

    const handleFieldEdited = () => {
        setStamp(Date.now())
    }


    logger.debug('Home/Manager -> render')
    return <>
        <Header onUserLoggedOut={handleLoggedOut} />


        <main className='flex flex-col min-h-screen max-h-full bg-[#1A2902]'>

            <Routes>

                <Route path="/*" element={<MatchesList matches={matches} stamp={stamp} onEditMatchFormClick={handleEditMatchFormClick} onDeleteMatchClick={handleOnDeleteMatchClick} />} />

                <Route path="/fields" element={<FieldList stamp={stamp} onFieldEdited={handleFieldEdited} />} />

            </Routes>


            {view === 'create-match' && <CreateMatch onMatchCreated={handleMatchCreated} onCancelClick={handleCancelClicked} />}

            {view === 'create-field' && <CreateField onFieldCreated={handleCreateFieldAccepted} onCancelClickField={handleCreateFieldCancelled} />}


            {view === 'edit-match' && < EditMatch match={match} onMatchEdited={handleMatchEdited} onCancelEditClick={handleCancelClicked} />}



        </main >

        <FooterNav onCreateFormClick={handleClickedCreateForm} onCreateFieldForm={() => setView('create-field')} />
    </>
}
export default HomeManager

