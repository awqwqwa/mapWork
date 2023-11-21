import React,{useEffect,useRef} from 'react'
import { Map,View } from 'ol'
import Tile from 'ol/layer/Tile'
import {XYZ} from "ol/source"
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Icon } from 'ol/style'
import axios from 'axios'
import store from '../redux/sotre'
import { message } from 'antd'
export default function TestMap(props) {
    const getData=(time)=>{

        axios.get("https://u81130-8cf6-64f1d2db.westb.seetacloud.com:8443/getShipsByPostime?postime="+time.toString()).then(
                res=>{  
                    testlist.current=JSON.parse(JSON.stringify(res.data))
                }
            ).catch(err=>{
                console.log(err)
            }

            )
    }
    const focusOn=(feature,map)=>{
        if(feature!==undefined&&feature!==null){
            map.getView().setCenter(feature.getGeometry().getFlatCoordinates())
            map.getView().setZoom(15);
        }else{
            if(feature===null){
                message.warning("当前MMIS不在列表中")
            }
        }
    }
    const testlist=useRef(
        [ {id:'00001',
        position:[110.27, 20.15],
        rotation:1,
        type:60,
        },
        {id:'00002',
        position:[110.28, 20.16],
        rotation:1,
        type:60,
        },
        {id:'00003',
        position:[110.30, 20.12],
        rotation:3,
        type:60,
        },
        {id:'00004',
        position:[110.21, 20.19],
        rotation:1,
        type:60,
        },
        {id:'00005',
        position:[110.20, 20.15],
        rotation:2,
        type:60,
        } ]
    )
    const time=useRef(1577808000)
    useEffect(()=>{

        store.subscribe(()=>{
            focusOn(source.getFeatureById(store.getState().searchMMSI.MMSI),map)
        })

        //getData(time.current)
        const interval=setInterval(() => {//定时发送请求
            time.current+=1;
            //getData(time.current)
            console.log("listnengfouxiugai",testlist.current)
            console.log(source.getFeatures())
        }, 10000);

        //地图初始化
        const map=new Map({target:'map' ,projection:'EPSG:4326'})
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


        //初始化加载船只
        let source = new VectorSource()  
        let vector = new VectorLayer({
            source: source
        })
        map.addLayer(vector)


        // 选中目标点
        map.on("singleclick", (e) => {
            let feature = map.forEachFeatureAtPixel(
              e.pixel,
              (feature) => feature
            );
            focusOn(feature,map)
            console.log(feature);
        });


        //动效实现，没有动画
        vector.on('postrender', e => {
            testlist.current.map(item=>{
                if(source.getFeatureById(item.id)===null){
                    let feature = new Feature({
                        geometry: new Point(fromLonLat(item.position))
                    })
                    feature.setStyle([
                        new Style({
                            image: new Icon({
                            anchor: [0.5,0.5],
                            rotation:item.rotation/57.3,
                            size: [20, 20],
                            src: require('../component/'+item.type+'.png')
                            })
                        })
                    ])
                    feature.setId(item.id)
                    source.addFeature(feature)
                }else{
                    source.getFeatureById(item.id).getGeometry().setCoordinates(fromLonLat(item.position))
                    source.getFeatureById(item.id).setStyle([
                        new Style({
                            image: new Icon({
                            anchor: [0.5,0.5],
                            rotation:item.rotation/57.3,
                            size: [20, 20],
                            src: require('../component/'+item.type+'.png')
                            })
                        })
                    ])
                }
                
            })
            
            map.render();
        });

        
        return ()=>clearInterval(interval)//离开页面时销毁interval计时器
    },[])
    return (
        <div id="map" className='map' style={{height:"100%", display:props.isShow?"":'none' }}></div>
    )
}
