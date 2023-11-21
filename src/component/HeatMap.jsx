import React,{useEffect} from 'react'
import { Map,View } from 'ol'
import Tile from 'ol/layer/Tile'
import {XYZ} from "ol/source"
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Heatmap as HeatmapLayer} from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
export default function HeatMap() {
    const colors = [
        "#2200FF",
        "#16D9CC",
        "#4DEE12",
        "#E8D225",
        "#EF1616"
    ];
    const hatmapData = [
        { name: "成都市" },
        { name: "绵阳市" },
        { name: "广安市" },
        { name: "雅安市" },
        { name: "自贡市" },
        { name: "甘孜藏族自治州市" }
    ];
    const codeList = {
        成都市: { center: { lng: 104.061902, lat: 30.609503 } },
        广安市: { center: { lng: 104.619126, lat: 30.474142 } },
        绵阳市: { center: { lng: 104.673612, lat: 31.492565 } },
        雅安市: { center: { lng: 104.031653, lat: 30.018895 } },
        自贡市: { center: { lng: 104.797794, lat: 30.368322 } },
        宜宾市: { center: { lng: 104.610964, lat: 30.781347 } },
        甘孜藏族自治州市: {
            center: { lng: 101.592433, lat: 30.426712 }
        }
    };


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
        let heatlayer = new HeatmapLayer({
            source: source,
            blur: 30,
            radius: 15,
            gradient: colors
        })
        map.addLayer(heatlayer)
        hatmapData.map(item=>{
            if(codeList[item.name]){
                var coords = codeList[item.name];
                var f = new Feature({
                    geometry: new Point(
                        fromLonLat([coords.center.lng, coords.center.lat])
                    )
                });
                heatlayer.getSource().addFeature(f);
            }
        })
    },[])
    return (
        <div id="speedmap" className='speedmap' style={{height:"100%"}}></div>
    )
}
