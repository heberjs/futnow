//@ts-nocheck
import { logger } from '../utils'
import logic from '../logic'
import Header from './Header'
import FooterNav from './FooterNav'
import React, { useEffect, useState, memo } from 'react'
import moment from 'moment'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useContext } from '../context'



function MapComponent() {

    const { showFeedback, showConfirm } = useContext()
    const [matches, setMatches] = useState([])
    const [map, setMap] = useState(null)




    const loadMatches = () => {
        try {
            logic.retrieveMatches()
                .then(matches1 => {
                    const matches = matches1.filter(match => new Date(match.date) > new Date())
                    setMatches(matches)
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }


    useEffect(() => {
        loadMatches()

        const mapInstance = L.map('map').setView([41.3851, 2.1734], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance);

        mapInstance.locate({ setView: true, maxZoom: 16 })

        mapInstance.on('locationfound', (e) => {
            const radius = e.accuracy / 2

            L.marker(e.latlng).addTo(mapInstance).bindPopup(`you are here`)

            L.circle(e.latlng, { radius }).addTo(mapInstance)

        })

        mapInstance.on('locationerror', (e) => {
            showFeedback(e.message, 'error')
        })

        setMap(mapInstance)

        return () => {
            mapInstance.remove()
        }

    }, []);

    useEffect(() => {
        if (matches.length === 0 || !map) return

        matches.forEach(match => {
            const { latitude, longitude } = match.field.location

            const date = moment(match.date).format('dddd, MMMM, Do, h:mm a')
            const marker = L.marker([latitude, longitude]).addTo(map)
            marker.bindPopup(`<b>${match.field.name}</b><br>${match.field.address}<br>${date}`)
        })
    }, [matches, map])

    return <div id="map" className='h-screen z-0'></div>
}

export default MapComponent