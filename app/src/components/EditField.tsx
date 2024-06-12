//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context.ts'



function EditField({ field, onCancelFormEditClick, onFieldEdited }) {
    const { showFeedback } = useContext()

    const handleCancelClick = () => onCancelFormEditClick()

    const handleOnSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        const address = form.address.value

        const coordinates = form.location.value

        const [longitude, latitude] = coordinates.split(',').map(coord => parseFloat(coord.trim()))

        const location = [longitude, latitude]

        logger.debug('edit-field -> handlesubmit')

        try {

            logic.editField(field.id, name, address, location)
                .then(() => {
                    form.reset()

                    onFieldEdited()
                })
                .catch(error => showFeedback(error), 'error')
        } catch (error) {
            showFeedback(error)
        }


    }

    return <section className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center flex-col bg-black bg-opacity-70 '>
        <div className='border p-8 rounded-xl bg-[#1A2902] animate-jump-in animate-once'>
            <form onSubmit={handleOnSubmit}>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="name" className='text-white font-semibold'>Name:</label>
                    <input type="text" id='name' defaultValue={field.name} className='rounded-lg px-2 py-1' />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="address" className='text-white font-semibold'>Address:</label>
                    <input type="text" id='address' defaultValue={field.address} className='rounded-lg px-2 py-1' />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor="location" className='text-white'>Location</label>
                    <input
                        type="text"
                        id="location"
                        className='rounded-lg px-2 py-1'
                        defaultValue={`${field.location.latitude}, ${field.location.longitude}`}

                    />
                </div>
                <button type='submit' className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-full mt-4'>Save</button>
            </form>
            <button className='bg-[#AEC670] hover:bg-[#AEC09A] font-semibold py-2 px-4 rounded w-[200px] mt-4' onClick={handleCancelClick}>Cancel</button>
        </div>
    </section>


}

export default EditField