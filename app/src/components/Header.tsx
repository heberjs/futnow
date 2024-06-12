//@ts-nocheck
import logic from '../logic'
import { useState, useEffect } from 'react'
import { useContext } from '../context.ts';



function Header({ onUserLoggedOut }) {
    const { showFeedback } = useContext()

    const [user, setUser] = useState(null)

    useEffect(() => {

        try {
            if (logic.getLoggedInfo().role === 'player') {

                logic.retrieveOwnPlayer()
                    .then(setUser)
                    .catch(error => showFeedback(error))

            } else if (logic.getLoggedInfo().role === 'manager') {
                logic.retrieveManager()

                    .then(setUser)
                    .catch(error => showFeedback(error))
            }
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }

    return <header className='fixed top-0 w-full h-[90px] flex lg:justify-around justify-between bg-[#344C11] px-4 lg:px-12 py-6 z-10 rounded-b-xl'>
        <div className='flex mt-2'>
            {user && <h1 className='text-white font-semibold mr-10'>{user.fullname}</h1>}
        </div>

        <div className='flex justify-center items-center'><img className='w-[200px] top-20' src="/public/pelota-logo-fino-blanco.png" alt="logo" /></div>

        <button onClick={handleLogoutClick}><img src="/public/power.png" className='w-10 h-10  ml-14 lg:ml-0' alt="button logout" /></button>
    </header >
}

export default Header