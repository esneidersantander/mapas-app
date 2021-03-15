import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1IjoibGltYmVydHNhbnRhbmRlciIsImEiOiJja205eDhjcGUxbWp5MnZvNHN6NnQxb2d2In0.g7cZ4mdJfSuvgS0CbT7nYA';

const puntoInicial = {
    lng:5,
    lat:34,
    zoom:2
}

export const MapaPage = () => {

    const mapaDiv = useRef();
    const [, setMapa] = useState();
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[puntoInicial.lng, puntoInicial.lat],
            zoom:puntoInicial.zoom
        });

            setMapa(map);
    }, []);

    return (
        <>
            
            <div
                ref={mapaDiv}
                className="mapContainer"
            />
        </>
    )
}
