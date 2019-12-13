import React from 'react'
import HeaderNav from '../../containers/HeaderNav/HeaderNav'
import "./AppLayout.scss"
import ScrollTop from '../ScrollTop/ScrollTop'

const AppLayout = (props) => {
    return (
        <ScrollTop >
            <div className="app-layout">
                <HeaderNav />
                {props.children}
            </div>
        </ScrollTop>
    )
}


export default AppLayout
