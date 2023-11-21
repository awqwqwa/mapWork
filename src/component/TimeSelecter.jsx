import React , {useState}from 'react';
import { DatePicker, Space, Button } from 'antd';
const { RangePicker } = DatePicker;
const TimeSelecter = () => {
  const onChange = (value, dateString) => {
    setTimes({from:dateString[0],to:dateString[1]})
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  const [times,setTimes]=useState({from:new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toLocaleString(),to:new Date().toLocaleString( )})
  return(
  <Space direction="vertical" size={12}>
    <p>精确选择</p>
    <RangePicker
      presets
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY/MM/DD HH:mm"
      onChange={onChange}
      onOk={onOk}
    />
    <p>快捷方式</p>
    <Button 
      type="primary"
      onClick={()=>setTimes({from:new Date((new Date().getTime() - 24 * 60 * 60 * 1000)).toLocaleString(),to:new Date().toLocaleString( )})}
    >近24小时</Button>

    <Button 
      type="primary"
      onClick={()=>setTimes({from:new Date((new Date().getTime() - 3 * 24 * 60 * 60 * 1000)).toLocaleString(),to:new Date().toLocaleString( )})}
    >近3天</Button>

    <Button 
      type="primary"
      onClick={()=>setTimes({from:new Date((new Date().getTime() - 7 * 24 * 60 * 60 * 1000)).toLocaleString(),to:new Date().toLocaleString( )})}
    >近一周</Button>

    <Button 
      type="primary"
      onClick={()=>setTimes({from:new Date((new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).toLocaleString(),to:new Date().toLocaleString( )})}
    >近一个月</Button>
    
    <p>当前选择的时间范围：</p>
    <p>{times.from}-------{times.to}</p>
  </Space>
  )
};
export default TimeSelecter;