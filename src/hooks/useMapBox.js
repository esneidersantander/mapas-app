import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibGltYmVydHNhbnRhbmRlciIsImEiOiJja205eDhjcGUxbWp5MnZvNHN6NnQxb2d2In0.g7cZ4mdJfSuvgS0CbT7nYA';


export const useMapBox = (puntoInicial) => {

    ///referencia al div del mapa
    const mapaDiv = useRef();
    const setRef = useCallback(
        (node) => {
            mapaDiv.current = node
        },
        [],
    )
    
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center:[puntoInicial.lng, puntoInicial.lat],
            zoom:puntoInicial.zoom
        });

        mapa.current = map;
    }, [puntoInicial]);

    //cuando se mueve el mapa
    useEffect(() => {
        mapa.current?.on('move',()=>{
            const {lng, lat} = mapa.current.getCenter();
            setCoords({
                lng:lng.toFixed(4),
                lat:lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2)
            })
        })
    }, [])
    return {
        coords, 
        setRef
    }
}
