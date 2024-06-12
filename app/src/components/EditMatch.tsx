//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import { useState } from 'react'
import { useContext } from '../context.ts'
import moment from 'moment'

function EditMatch({ match, onMatchEdited, onCancelEditClick }) {

    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value

        const description = form.description.value

        const date = form.date.value

        logger.debug('edit-match -> handleSubmit', title, description, date)

        try {

            logic.editMatch(match.id, title, description, date)
                .then(() => {
                    form.reset()

                    onMatchEdited()
                })
                .catch(error => showFeedBack(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => onCancelEditClick()

    const currentDate = new Date()
    const minDate = currentDate.toLocaleDateString('es-ES').slice(0, 16)


    logger.debug('Edit-Match Form -> Render')

    return <section className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center flex-col bg-black bg-opacity-70 '>
        <div className='border p-8 rounded-xl bg-[#1A2902] animate-jump-in animate-once'>
            <form onSubmit={handleSubmit}>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="title" className='text-white font-semibold'>Title</label>
                    <input type="text" id="title" defaultValue={match.title} className='rounded-lg px-2 py-1' required />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="description" className='text-white'>description</label>
                    <input type="text" id="description" defaultValue={match.description} className='rounded-lg px-2 py-1' maxLength={120} required />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="date" className='text-white'>Date time</label>
                    <input type="datetime-local" defaultValue={match.date ? moment(match.date).format('YYYY-MM-DDTHH:mm') : ''} id="date" min={minDate} max="2024-12-31T23:59" className='rounded-lg px-2 py-1' />
                </div>

                <button type='submit' className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-4'>Save</button>
            </form>
            <button className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-[220px] mt-4' onClick={handleCancelClick}>Cancel</button>
        </div>
    </section>


}

export default EditMatch