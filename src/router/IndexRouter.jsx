import React from 'react'
import { HashRouter, Route,Switch } from 'react-router-dom'
import Login from '../view/login/Login'
import Box from '../view/box/Box'
export default function IndexRouter() {
  return (
    <HashRouter>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={()=>
                <Box></Box>
            }/>
        </Switch>
        
    </HashRouter>
  )
}