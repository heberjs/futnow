//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useContext } from '../context.ts'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'




function Field({ item: field, onEditFieldClick, onDeleteFieldClick }) {

    const { showConfirm, showFeedback } = useContext()
    const { view, setView } = useState(null)
    const [map, setMap] = useState(null)

    const { latitude, longitude } = field.location


    const handleEditFieldClick = (field) => onEditFieldClick(field)

    const handleDeleteClick = (field) => {

        showConfirm('Are you Sure to delete?', (confirmed) => {
            if (confirmed) {
                try {

                    logic.removeField(field)
                        .then(() => onDeleteFieldClick())

                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
            }
        })
    }

    useEffect(() => {

        const mapInstance = L.map(`map-${field.id}`, {
            attributionControl: false,
            zoomControl: false
        }).setView([latitude, longitude], 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance)

        L.marker([latitude, longitude])
            .addTo(mapInstance)
            .bindPopup(`<b style="font-size: 12px">${field.name}</b>`)
            .openPopup();

        setMap(mapInstance)


        return () => {
            mapInstance.remove()


        }
    }, [latitude, longitude, field.id, field.name, field.address])



    logger.debug('Field -> render')
    return <article className='border-black border-2 flex-col bg-[#AEC09A] px-2 rounded-3xl mt-4'>
        <div className='flex justify-between gap-2 p-2'>
            <div className=''>
                <h3 className=' border-b-2 border-[#778D45] mr-2'><strong>{field.name}</strong></h3>
                <div className='pt-2'>
                    <p ><strong>{field.address}</strong></p>
                </div>

            </div>
            <div className='mt-2'>
                <div id={`map-${field.id}`} style={{ height: '150px', width: '150px', border: '1px solid', zIndex: '0' }}></div>
            </div>
        </div>
        <div className='flex justify-center items-center gap-8'>
            <button className='mt-2 flex items-center' onClick={() => handleEditFieldClick(field)}><img src="/public/update-icon.png" alt="update icon" className='w-6 h-6' /><p className='p-1'><strong>Update</strong></p></button>

            <button className='mt-2 flex items-center' onClick={() => handleDeleteClick(field.id)}><img src="/public/delete-icon.png" alt="delete icon" className='w-6 h-6' /><p className='p-1'><strong>Delete</strong></p></button>
        </div>
    </article >
}

export default Field