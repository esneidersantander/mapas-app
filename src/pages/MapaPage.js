import React, { useEffect } from 'react'
import { useMapBox } from '../hooks/useMapBox';

const puntoInicial = {
    lng:-122.4725,
    lat:37.8010,
    zoom:13.5
}

export const MapaPage = () => {

    //    const [mapa, setMapa] = useState();

    const {coords, setRef, nuevoMarcador$}= useMapBox(puntoInicial);

    useEffect(() => {
        nuevoMarcador$.subscribe(marcador =>{
            console.log(marcador);
        })
    }, [nuevoMarcador$])

    return (
        <>
            <div className="info">
                Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
            </div>
            <div
                ref={setRef}
                className="mapContainer"
            />
        </>
    )
}
