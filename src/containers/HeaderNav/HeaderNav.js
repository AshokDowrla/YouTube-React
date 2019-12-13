import React from "react";
import { Menu, Image, Form, Input, Icon } from "semantic-ui-react"
import "./HeaderNav.scss"
import { Link,withRouter } from "react-router-dom"
import logo from "../../assets/images/logo.jpg"
class HeaderNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
    }


    onSubmit = () => {
        const escapedSearchQuery = encodeURI(this.state.query);
        this.props.history.push(`/results?search_query=${escapedSearchQuery}`);
    };

    onInputChange = (event) => {
        this.setState({
            query: event.target.value,
        });

        //console.log(event.target.value)
    };
    render() {
        return (
            <Menu borderless className="top-menu" fixed="top">
                <Menu.Item className="logo" >
                    <Link to="/"> <Image src={logo} size="tiny" className="image" /></Link>
                </Menu.Item>

                <Menu.Menu className="nav-container">

                    <Menu.Item className="search-input">
                        <Form onSubmit={this.onSubmit}>
                            <Form.Field>
                                <Input placeholder="Search" size="small" action="Search"  value={this.state.query}
                                onChange={this.onInputChange} />
                            </Form.Field>
                        </Form>

                    </Menu.Item>
                    <Menu.Menu position="right">
                        <Menu.Item>

                            <Icon className="header-icon" name="video camera" size='large' />
                        </Menu.Item>


                        <Menu.Item>

                            <Icon className="header-icon" name="grid layout" size='large' />
                        </Menu.Item>


                        <Menu.Item>

                            <Icon className="header-icon" name="alarm" size='large' />
                        </Menu.Item>



                        <Menu.Item name='avatar'>
                            <Image src='http://via.placeholder.com/80x80' avatar />
                        </Menu.Item>

                    </Menu.Menu>
                </Menu.Menu>
            </Menu>
        )
    }

}

export default withRouter(HeaderNav)