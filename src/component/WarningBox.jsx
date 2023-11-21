import React,{useState} from 'react'
import { Alert, Button, Space } from 'antd';
export default function WarningBox() {
  const [info,setInfo]=useState([{
    message:"aaa",
    type:"success",
    showIcon:true
  },{
    message:"Success Tips",
    type:"info",
    showIcon:true,
    description:"Error Description Error Description Error Description Error Description"
  },{
    message:"Success Tips",
    type:"warning",
    showIcon:true,
    description:"Error Description Error Description Error Description Error Description"
  },{
    message:"Success Tips",
    type:"error",
    showIcon:true,
    description:"Error Description Error Description Error Description Error Description"
  }
  ]);
  const getInfos=(infolist)=>{
    console.log(infolist)
    return infolist.map(item=>{
      return  <Alert
        message={item.message}
        type={item.type}
        size="small"
        showIcon={item.showIcon}
        description={item.description}
        action={
          <Button size="small" type="text" onClick={()=>{
            const temp=info
            temp.push({
              message:"aaa",
              type:"success",
              showIcon:false
            })
            setInfo(temp)
          }}>
            UNDO
          </Button>
        }
        closable
      />
    }

    )
  }
  return (
    <div    style={{
        width:400,
        height:300,
        border:1,
        paddingRight:8,
        borderBlockColor:'black',
        overflow:'auto'
    }}>
        <Space
            direction="vertical"
            style={{
            width: '100%',
            }}
        >
          {getInfos(info)}
        </Space>
    </div>
  )
}
