import React from 'react';
import { Menu, Input, Dropdown, Icon, Message, Image} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class NavBar extends React.Component {

    validateAddress = () => {
        if (!this.props.user.address_line_1 || !this.props.user.city || !this.props.user.postcode) {
            return <Message error as={Link} to={'/profile'}>Please complete address information</Message>
        }
    }

    render() {
        const user = this.props.user
        return (
            <Menu fixed="top" color={'blue'} >
                <Menu.Item header as={Link} to={'/'} className={'borderless'}>
                    Brewers Market
                </Menu.Item>

                    {user 
                        ?

                            <Menu.Menu position="right">
                                <Menu.Item className={'borderless'}>
                                    {this.validateAddress()}
                                </Menu.Item>
                                <Menu.Item>
                                    <Input placeholder="Search..." action={{ icon: 'search' }} value={this.props.search} onChange={this.props.setSearch} />
                                </Menu.Item>
                                
                                <Menu.Item as={Link} to={'/cart'} >
                                    <Icon name='cart' /><strong>{Object.keys(this.props.cart).length}</strong>
                                </Menu.Item>

                                {
                                    user.brewery && 
                                        <Dropdown 
                                        item 
                                        icon={<Image src={user.brewery.profile_img} avatar style={{marginLeft:'1em'}}/>}
                                        text={user.brewery.name} 
                                        >
                                        <Dropdown.Menu>
                                            <Dropdown.Item as={Link} to={'/brewery/profile'}>Brewery Details</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={'/brewery/products'}>Manage Products</Dropdown.Item>
                                            <Dropdown.Item as={Link} to={'/help'}>Help</Dropdown.Item>
                                            <Dropdown.Item onClick={this.props.signOut} as={Link} to={'/'} >Sign Out</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                }
                                
                                <Dropdown 
                                    item 
                                    icon={<Image src={user.profile_img} avatar style={{marginLeft:'1em'}}/>}
                                    text={`${user.first_name} ${user.last_name}`} 
                                    >
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={'/profile'} >My Details</Dropdown.Item>
                                        <Dropdown.Item as={Link} to={'/orders'}>Orders</Dropdown.Item>
                                        <Dropdown.Item as={Link} to={'/help'}>Help</Dropdown.Item>
                                        <Dropdown.Item onClick={this.props.signOut} as={Link} to={'/'} >Sign Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu> 
                        :
                            <Menu.Menu position="right">
                                <Menu.Item as={Link} to={'/signin'} >Sign In</Menu.Item>
                            </Menu.Menu>
                    } 
            </Menu>
        )
    }
}
