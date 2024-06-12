//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Field from './Field'
import EditField from './EditField'
import { useContext } from '../context.ts'



function FieldList({ stamp, onCreateFieldForm, onFieldEdited }) {
    logger.debug('Field List -> Render')

    const { showFeedback, showConfirm } = useContext()

    const [fields, setFields] = useState([])
    const [view, setView] = useState(null)
    const [field, setField] = useState([])



    const clearView = () => setView(null)


    const loadFields = () => {
        try {
            logic.retrieveFields()
                .then(fields => {
                    setFields(fields)

                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }

    }


    useEffect(() => {
        loadFields()
    }, [stamp])

    const handleonEditFormClick = (field) => {
        setView('edit-field')
        setField(field)
    }

    const handleOnDeletedfieldClick = () => loadFields()

    const handleCanceledFormEdit = () => clearView()

    const handleOnFieldEdited = () => {
        clearView()
        setField(field)
        onFieldEdited()
    }


    return <section className='pt-[90px] pb-[140px] min-h-screen max-h-full  flex-grow'>
        <h1 className='rounded-2xl py-4 px-2 ml-10'><span className='inline-flex animate-text-gradient bg-gradient-to-r from-[#a4c994] via-[#8bcda4] to-[#ade8b3] bg-[200%_auto] bg-clip-text text-transparent text-4xl'>
            Your Fields
        </span></h1>
        <article className='flex-grow'>

            <div className=' px-8 pt-2 flex flex-col gap-2 lg:max-w-[940px] lg:m-auto'>
                {fields.map(field => <Field key={field.id} item={field} stamp={stamp} onDeleteFieldClick={handleOnDeletedfieldClick} onEditFieldClick={handleonEditFormClick} />)}
            </div>

        </article>

        {view === 'edit-field' && < EditField field={field} onCancelFormEditClick={handleCanceledFormEdit} onFieldEdited={handleOnFieldEdited} />}
    </section >

}

export default FieldList