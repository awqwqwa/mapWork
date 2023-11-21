import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
  import React,{useEffect, useState} from 'react'
  import store from '../redux/sotre'
  import { withRouter } from 'react-router-dom';
  import { Layout ,  Menu } from 'antd';
  function getItem(label, key, icon, children=[], type) {
    return {
      key,
      icon,
      children, 
      label,
      type,
    };
  }
  const {Sider} = Layout;
  const { SubMenu } = Menu;
  const items = [
    getItem('告警中心', '/home', <DesktopOutlined />, ),
    getItem('事件统计', '/history', <MailOutlined />),
    getItem('统计中心', '/sub2', <PieChartOutlined />, [
      getItem('散点图', '/view/point'),
      getItem('危险总览', '/view/10'),
      getItem('航速异常', '/view/speed'),
      getItem('航向异常', '/view/direction'),
      getItem('位置异常', '/view/position'),
    ]),
    getItem('数据管理', '/sub1', <ContainerOutlined />, [
      getItem('数据上传', '/uploadFile'),
      getItem('数据导出', '/7'),
    ]),
    getItem('页面设置', '/viewsetting', <AppstoreOutlined />),
  ];
function SideMenu(props) {
    useEffect(()=>{
      store.subscribe(()=>{
        setCollapsed(store.getState().sideState.collapsed);
      })
    },[])

    const [collapsed, setCollapsed] = useState(store.getState().sideState.collapsed);

    const renderMenu = (mlist)=>{
      return mlist.map(item=>{
          if(item.children.length){
            return <SubMenu key={item.key} icon={item.icon} title={item.label}>
              {renderMenu(item.children)}
            </SubMenu>}
          else{
            return <Menu.Item key={item.key} icon={item.icon} onClick={
              ()=>{
                props.history.push(item.key)
              }
            }>{item.label}</Menu.Item>
          }
      })
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} >
      <div style={{display:"flex",height:"100%","flexDirection":"column"}}>
            <div style={{flex:1,"overflow":"auto"}}>
              <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.location.pathname,{/*控制刷新保持原有路径*/}]} defaultOpenKeys={["/"+props.location.pathname.split("/")[1]]}>
                {renderMenu(items)}
              </Menu>
          </div>
        </div>
        </Sider>
    );
  };
  export default withRouter(SideMenu);