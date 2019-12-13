import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import "./SideBarItem.scss"
import { Link, withRouter } from 'react-router-dom';

class SideBarItem extends React.Component {


    shouldBeHighlighted = () => {
        const { pathname } = this.props.location;
        console.log('pathname = ', pathname);
        if (this.props.path === '/') {
            return pathname === this.props.path;
        }
        return pathname.includes(this.props.path);
    }


    render() {
        //console.log(this.props.path)
        const highlight = this.shouldBeHighlighted() ? 'highlight-item' : null;
        return (
            <Link to={{ pathname: this.props.path }}>
                <Menu.Item className={['sidebar-item', highlight].join(' ')}>

                    <div className='sidebar-item-alignment-container'>

                        <span> <Icon name={this.props.icon} size="large" /> </span>
                        <span>{this.props.label}</span>
                    </div>
                </Menu.Item>
            </Link>
        )

    }
}


export default withRouter(SideBarItem);