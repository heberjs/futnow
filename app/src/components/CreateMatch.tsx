//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import { useEffect, useState } from 'react'
import { useContext } from '../context.ts'

function CreateMatch({ onCancelClick, onMatchCreated }) {
    const [fields, setFields] = useState([])
    const [selectedField, setSelectedField] = useState([])

    const { showFeedback } = useContext()


    //me traigo los fields, para poder usarlos en el form y los seteo para q me aparezcan
    useEffect(() => {
        try {

            logic.retrieveFields()
                .then(fields => setFields(fields))
                .catch(error => showFeedBack(error, 'error'))
        } catch (error) {
            showFeedback(error, 'error')
        }

    }, [])

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const title = form.title.value

        const description = form.description.value

        const date = form.date.value

        const fieldId = selectedField ? selectedField.id : null


        try {

            logic.createMatch(title, description, date, fieldId)
                .then(() => {
                    form.reset()

                    onMatchCreated()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleFieldChange = event => {
        const selectedFieldId = event.target.value;
        const field = fields.find(field => field.id === selectedFieldId);
        setSelectedField(field);
    }


    const currentDate = new Date()
    const minDate = currentDate.toISOString().slice(0, 16)


    const handleCancelClick = () => onCancelClick()


    logger.debug('Create-Match Form -> Render')
    return <section className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center flex-col bg-black bg-opacity-70 p-4 md:p-8'>


        <div className='border p-8 rounded-xl bg-[#1A2902] animate-jump-in animate-once w-full max-w-md'>
            <form onSubmit={handleSubmit}>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="title" className='text-white font-semibold'>Title</label>
                    <input type="text" id="title" className='rounded-lg px-2 py-1' placeholder='Futbol 5' required />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="description" className='text-white'>Description</label>
                    <input type="text" id="description" className='rounded-lg px-2 py-1' maxLength={120} placeholder='About the game' required />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="date" className='text-white'>Date time</label>
                    <input type="datetime-local" id="date" min={minDate} max="2024-12-31T23:59" className='rounded-lg px-2 py-1' />
                </div>

                <div className='flex flex-col mb-4'>
                    <label htmlFor="field" className='text-white'>Fields</label>

                    <select id="field" className='rounded-lg px-2 py-1' onChange={handleFieldChange} value={selectedField ? selectedField._id : ''}>
                        <option value="">Select a field</option>
                        {fields.map(field => (
                            <option key={field.id} value={field.id}>{field.name} - {field.address}</option>
                        ))}
                    </select>


                </div>

                <button type='submit' className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-4'>Create Match</button>
            </form>
            <button className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-6' onClick={handleCancelClick}>Cancel</button>
        </div>

    </section >


}

export default CreateMatch