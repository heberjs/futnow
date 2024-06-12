//@ts-nocheck
import logic from '../logic'
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom'

function FooterNav({ onCreateFormClick, onCreateFieldForm }) {
    const navigate = useNavigate()

    const { pathname } = useLocation()

    const handleClickCreateFieldForm = () => onCreateFieldForm()
    const handleClickCreateForm = () => onCreateFormClick()


    const isManagerFieldsPath = pathname === "/manager/fields"
    return <>
        <nav className="fixed bottom-0 w-full flex justify-between lg:justify-around items-center box-border  bg-[#344C11] p-4">

            {logic.getLoggedInfo().role === 'manager' && (<Link to="/manager"><img className='w-8 h-8 top-1' src="/public/home-icon.png" alt="home icon" /></Link>)}
            {logic.getLoggedInfo().role === 'player' && (<Link to="/"><img className='w-8 h-8 top-1' src="/public/home-icon.png" alt="home icon" /></Link>)}




            {logic.getLoggedInfo().role === 'player' && (<Link to="/maps"><img className='w-8 h-8 top-1' src="/public/search-icon.png" alt="search icon" /></Link>)}

            {(logic.getLoggedInfo().role === 'manager' && isManagerFieldsPath) ? (
                <button onClick={handleClickCreateFieldForm}>
                    <img className='w-8 h-8 top-1' src='/public/create-icon.png' alt='create match icon' />
                </button>
            ) : (logic.getLoggedInfo().role === 'manager') ? (
                <button onClick={handleClickCreateForm}>
                    <img className='w-8 h-8 top-1' src='/public/create-icon.png' alt='create match icon' />
                </button>
            ) : null}

            {logic.getLoggedInfo().role === 'player' && (<Link to="/profile"><img className='w-11 h-11 top-1' src="/public/profile-icon.png" alt="profile icon" /></Link>)}
            {logic.getLoggedInfo().role === 'manager' && (<Link to="/manager/fields"><img className='w-11 h-11 top-1' src="/public/field-icon.png" alt="field icon" /></Link>)}



        </nav >

    </>
}


export default FooterNav