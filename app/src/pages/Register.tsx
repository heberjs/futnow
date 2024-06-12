//@ts-nocheck
import { logger } from '../utils/index.ts'
import logic from '../logic'

import { useContext } from '../context.ts'


function Register({ onUserRegistered, onLoginClick }) {

    logger.debug('Register')
    const { showFeedback } = useContext()


    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const fullname = form.fullname.value
        const email = form.email.value
        const password = form.password.value

        try {
            logic.registerPlayer(fullname, email, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }

    }
    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    logger.debug('Register -> render')

    return <main className='flex flex-col justify-center items-center h-screen bg-[#1A2902]'>

        <div className='flex justify-center items-center '><img className='w-[300px] absolute top-20 animate-fade-down animate-duration-[2000ms] animate-ease-linear' src="/public/pelota-logo-fino-blanco.png" alt="" />
        </div>

        <form className='flex flex-col items-center mt-8' onSubmit={handleSubmit}>
            <div className='flex flex-col mb-4'>
                <label htmlFor="fullname" className='text-white font-semibold'>Full name</label>
                <input type="text" id="fullname" className='rounded-lg px-2 py-1' required />
            </div>

            <div className='flex flex-col mb-4'>
                <label htmlFor="email" className='text-white'>E-mail</label>
                <input type="email" id="email" className='rounded-lg px-2 py-1' required />
            </div>

            <div className='flex flex-col mb-4'>
                <label htmlFor="password" className='text-white'>Password</label>
                <input type="password" id="password" className='rounded-lg px-2 py-1' required />
            </div>

            <div className='flex mb-4'>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className='text-white text-xs ml-2'>Agree to the Terms and Conditions</label>
            </div>

            <button type='submit' className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-4'>Sign up</button>
        </form>
        <div className='fixed bottom-8'>
            <p className='font-semibold text-white'>Already a member? Go to <a href="" onClick={handleLoginClick} className='text-[#F7C815]'>Sign in</a></p>

        </div>

    </main>
}

export default Register