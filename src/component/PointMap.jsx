import React,{useEffect} from 'react'
import { Map,View } from 'ol'
import Tile from 'ol/layer/Tile'
import {XYZ} from "ol/source"
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Circle ,Fill} from 'ol/style'
import { Vector as VectorLayer} from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
export default function HeatMap() {
    const codeList = [
        { lng: 104.061902, lat: 30.609503 },
        { lng: 106.619126, lat: 30.474142 },
        { lng: 104.673612, lat: 31.492565 },
        { lng: 103.031653, lat: 30.018895 },
        { lng: 104.797794, lat: 29.368322 },
        { lng: 104.610964, lat: 28.781347 },
        { lng: 101.592433, lat: 30.426712 }
    ];
    useEffect(()=>{
        const map=new Map({target:'speedmap' ,projection:'EPSG:4326'})
        const layerTile = new Tile({
            source: new XYZ({
            url: 'http://static.hifleet.com/Tiles/Z{z}/{x}/{y}/{x}_{y}.png?id=2020-03'
            })
        })
        const view = new View({
            center: fromLonLat([110.27, 20.15]),
            zoom: 12
        })
        map.setView(view)
        map.addLayer(layerTile)
        let source = new VectorSource()  
        let layer = new VectorLayer({
            source: source,
        })
        map.addLayer(layer)
        codeList.map(item=>{
            var f = new Feature({
                geometry: new Point(
                    fromLonLat([item.lng, item.lat])
                )
            });
            f.setStyle([
                new Style({
                    image: new Circle({
                        radius: 5,
                        fill: new Fill({
                                 color: '#1fca04',//颜色模块
                                 opacity: 0.5
                         })
           })
                })   
            ])
            layer.getSource().addFeature(f);
        })
    },[])
    return (
        <div id="speedmap" className='speedmap' style={{height:"100%"}}></div>
    )
}
