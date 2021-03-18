import mapboxgl from 'mapbox-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs';
import { v4 } from 'uuid';

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
    
    //refgrencia a los marcadores
    const marcadores = useRef({});

    //observables de rxjs
    const movimientoMarcador=useRef(new Subject());
    const nuevoMarcador = useRef(new Subject());

    //mapa y coords
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    //funcion para agregarun nuevo marcador
    const agregarMarcador = useCallback(
        (e) => {
            const {lng, lat} = e.lngLat;
            const marker = new mapboxgl.Marker();
            marker.id = v4();

            marker
                .setLngLat([lng, lat])
                .addTo(mapa.current)
                .setDraggable(true);

            marcadores.current[marker.id] = marker
            
            //
            nuevoMarcador.current.next({
                id:marker.id,
                lng,
                lat
            })

            //escuchar movimientos del marcador
            marker.on('drag', ({target})=>{
                const {id} = target;
                const {lng, lat} = target.getLngLat();
                movimientoMarcador.current.next({
                    id,
                    lng,
                    lat
                })

            })
        },
        [],
    )


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


    //agregar marcadores cuando se hace clic
    useEffect(() => {
        mapa.current?.on('click', (e)=>{
            agregarMarcador(e)
        })
    }, [agregarMarcador])


    return {
        agregarMarcador,
        coords,
        marcadores,
        nuevoMarcador$:nuevoMarcador.current,
        movimientoMarcador$:movimientoMarcador.current,
        setRef
    }
}
