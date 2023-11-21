import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Map,View } from 'ol'
import Tile from 'ol/layer/Tile'
import {XYZ} from "ol/source"
import { fromLonLat } from 'ol/proj'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import { Style, Icon } from 'ol/style'
import { getVectorContext } from 'ol/render'
export default function GetData() {
    const [list,setList]=useState([
        {id:'00001',
        position:[110.27, 20.15],
        rotation:1,
        type:'blueship',
        },
        {id:'00002',
        position:[110.28, 20.16],
        rotation:1,
        type:'redship',
        },
        {id:'00003',
        position:[110.30, 20.12],
        rotation:3,
        type:'redship',
        },
        {id:'00004',
        position:[110.21, 20.19],
        rotation:1,
        type:'yellowship',
        },
        {id:'00005',
        position:[110.20, 20.15],
        rotation:2,
        type:'blueship',
        }
    ])
    const getData=(time)=>{
        axios.get("https://u81130-8cf6-64f1d2db.westb.seetacloud.com:8443/getShipsByPostime?postime="+time.toString()).then(
            res=>{  
                setList(JSON.parse(JSON.stringify(res.data)))
            }
        )
}
var tt=1577808000;
useEffect(()=>{
    const interval=setInterval(() => {//定时发送请求
      getData(tt)
      tt+=1;
  }, 2000);
  return ()=>clearInterval(interval)
  },[])
  return (
    <div></div>
    
  )
}
