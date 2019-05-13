import React, { Component, Fragment } from 'react'
import { Menu, Input, Link } from 'semantic-ui-react'





const csrfToken = ReactOnRails.authenticityToken();

export default class NavBar extends Component {

    state = {
        signed_in: this.props.signed_in
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSignOut = () => {
        fetch(`${this.props.url}/sign_out`,{
            method: "DELETE",
            headers: {
                "X-CSRF-Token": csrfToken,
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest"
            }
        }).then(() => window.location.reload())
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu secondary>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Item
                name='posts'
                active={activeItem === 'posts'}
                onClick={this.handleItemClick}
            />
            <Menu.Item
                name='users'
                active={activeItem === 'users'}
                onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                {this.props.signed_in === true ?
                    <Menu.Item
                        name='sign out'
                        active={activeItem === 'sign out'}
                        onClick={this.handleSignOut}
                    />
                    :
                    <Menu.Item
                        href="/sign_in"
                        name='sign in'
                        active={activeItem === 'sign in'}

                    />
            }
            </Menu.Menu>
        </Menu>
            


        )
    }
}