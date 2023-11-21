import React from 'react'
import TestMap from '../../component/TestMap'
//import WarningBox from '../../component/WarningBox'
export default function Home() {
  return (
    <div style={{
      height:'100%',
      position:'relative'
    }}>
      <div style={{
        height:'100%',
        zIndex:1
      }}>
      <TestMap />
      </div>

      {/*(<div style={{
        position:'relative',
        left:50,
        bottom:800,
        zIndex:10
      }}>
      <WarningBox></WarningBox>
    </div>*/}
    </div>

  )
}
