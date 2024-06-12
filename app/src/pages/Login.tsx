//@ts-nocheck
import { logger } from '../utils/index.ts'
import logic from '../logic/index.ts'

import { useContext } from '../context.ts'

function Login({ onUserLoggedIn, onRegisterClick }) {

    logger.debug('Login')
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target
        const email = form.email.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit')

        try {
            logic.loginUser(email, password)
                .then(() => {
                    form.reset()

                    onUserLoggedIn()
                })
                .catch(error => showFeedback(error))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()
        onRegisterClick()
    }

    logger.debug('Login -> render')
    return <main className='flex flex-col justify-center items-center h-screen bg-[#1A2902]'>

        <div className='flex justify-center items-center'><img className='w-[300px] absolute top-20 animate-fade-down animate-duration-[1000ms] animate-ease-linear' src="/public/pelota-logo-fino-blanco.png" alt="logo futnow" /></div>

        <form onSubmit={handleSubmit} className='flex flex-col items-center mt-8'>

            <div className='flex flex-col mb-4'>
                <label htmlFor='email' className='text-white font-semibold'>E-mail</label>
                <input id='email' className='rounded-lg px-2 py-1' required />
            </div>

            <div className='flex flex-col mb-4'>
                <label htmlFor="password" className='text-white font-semibold'>Password</label>
                <input type="password" id='password' className='rounded-lg px-2 py-1' required />

                <a href="" className='text-white text-xs mt-2'>Forgot password?</a>

            </div>
            <button className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-8' type='submit'>Sign in</button>
        </form>
        <div className='fixed bottom-8'>
            <p className='font-semibold text-white'> Not a Memeber yet? Go to <a href="" onClick={handleRegisterClick} className='text-[#F7C815]'>Sign up</a></p>
        </div>

    </main>
}

export default Login