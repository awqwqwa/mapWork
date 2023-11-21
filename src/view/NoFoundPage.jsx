import React from 'react';
import { Button, Result } from 'antd';
const NoFoundPage = (props) => {
  return(
    <Result
    status="404"
    title="404"
    subTitle="页面不存在"
    extra={<Button type="primary" onClick={
      ()=>{
        props.history.push('/home')
      }
    }>回到首页</Button>}
  />
  )

};
export default NoFoundPage;
