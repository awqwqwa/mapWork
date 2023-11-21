import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';
import React,{useEffect, useState} from 'react'
import store from '../redux/sotre'
import {Layout,Input} from 'antd';
import { changeSide ,searchMMSI} from '../redux/actions/actions';
const { Search } = Input;
const { Header} = Layout;
export default function TopHeader() {
    useEffect(()=>{
        store.subscribe(()=>{
          setCollapsed(store.getState().collapsed);
        })
      },[])
    const [collapsed, setCollapsed] = useState(store.getState().collapsed);
    const toggleCollapsed = () => {
        store.dispatch(changeSide()) 
    };
  return (
    <Header className="site-layout-background">
      {collapsed ? <MenuUnfoldOutlined onClick={toggleCollapsed} /> : <MenuFoldOutlined onClick={toggleCollapsed} />}
      <span className="logo" >航海预警系统</span>
      <Search
      placeholder="请输入船舶MMSI:"
      allowClear
      enterButton="搜索"
      size="large"
      onSearch={(e)=>{store.dispatch(searchMMSI(e))}}
      style={{
        margin: 10,
        float:'right',
        width: 304,
      }}
    />
  </Header>
  )
}
