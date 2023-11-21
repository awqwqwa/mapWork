import React,{useState} from 'react'
import SideMenu from  '../../component/SideMenu'
import TopHeader from '../../component/TopHeader';
import {Switch,Route,Redirect} from 'react-router-dom'
import { Layout, FloatButton,Drawer} from 'antd';
import {FullscreenOutlined,FullscreenExitOutlined,SettingOutlined} from '@ant-design/icons';

import './Box.css'
import ViewSetting from '../viewsetting/ViewSetting';
import History from '../history/History';
import NoFoundPage from '../NoFoundPage'
import UploadFile from '../../component/UploadFile';
import WarningBox from '../../component/WarningBox'
import InfoBox from '../../component/InfoBox';
import TimeSelecter from '../../component/TimeSelecter';
import TestMap from '../../component/TestMap';
import HeatMap from '../../component/HeatMap';
import PointMap from '../../component/PointMap'
const {Content } = Layout;
export default function Box() {
  const [fullscreen,setFullscreen]=useState(false)
  const [open, setOpen] = useState(false);
  const length=window.location.href.split("/").length-1
  const isShow=window.location.href.split("/")[length]==="home"?true:false
  return (
    <Layout >
      {window.location.href.split("/")[length]==="home"?<FloatButton 
        icon={fullscreen?<FullscreenExitOutlined />:<FullscreenOutlined />}
        onClick={() =>{setFullscreen(!fullscreen)}} />
      :""}
      {window.location.href.split("/")[length-1]==="view"?<FloatButton 
        icon={<SettingOutlined />}
        onClick={() => setOpen(true)} />
      :""}

    
      <Drawer title="时间范围选择" placement="right" onClose={()=>setOpen(false)} open={open} maskClosable={false}>
        <TimeSelecter />
      </Drawer>
      
      {fullscreen?'':<SideMenu />}
    <Layout className="site-layout">
    {fullscreen?'':<TopHeader></TopHeader>}
    
    <Content
        className="site-layout-background"
        style={{
          overflow:'auto',
          minHeight: 280,
        }}
      >
        <TestMap isShow={isShow}/>
        {
          //因为数据不全，且并非真实时间戳，每次map组件重新渲染的话会回到最开始的状态，因此在此处先将其设置到大组件中去避免切换时重新渲染
        }
        <Switch>
          <Redirect from='/' to='/home' exact />
          <Route path='/viewsetting' component={ViewSetting} />
          <Route path='/history' component={History} />
          <Route path='/testw' component={WarningBox} />
          <Route path='/testi' component={InfoBox} />
          <Route path='/uploadFile' component={UploadFile} />
          <Route path='/view/speed' component={HeatMap}/>
          <Route path='/view/point' component={PointMap}/>
          <Route path="*" component={NoFoundPage}/>
        </Switch>
        </Content>
        
    </Layout>
</Layout>
  )
}
