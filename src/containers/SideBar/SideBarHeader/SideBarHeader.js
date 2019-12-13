import React from 'react'
import "./SideBarHeader.scss"
import { Menu } from 'semantic-ui-react';
const SideBarHeader= (props) => {
    const heading =props.title? props.title.toUpperCase(): '';
   // console.log(props)
    return (
        <Menu.Item>
         <Menu.Header className="side-bar-header">
         
         {heading}
         </Menu.Header>
        
        </Menu.Item>
    )
}

export default SideBarHeader
