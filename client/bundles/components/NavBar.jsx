import React, { Component, Fragment } from 'react'
import { Menu, Input, Link } from 'semantic-ui-react'





const csrfToken = ReactOnRails.authenticityToken();

export default class NavBar extends Component {

    state = {
        signed_in: this.props.signed_in,
        activeItem: "home"
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




        return (
            <Menu secondary>
            <Menu.Item 
                href={this.props.url}
                name='home' 

                onClick={this.handleItemClick} 
                />
            <Menu.Item
                href={`${this.props.url}/posts/new`}
                name='new post'

                onClick={this.handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
                {this.props.signed_in === true ?
                    <Fragment>
                        <Menu.Item
                            name='my account'

                            href={`${this.props.url}/users/${this.props.current_user.id}`}
                        />
                        <Menu.Item
                            name='sign out'

                            onClick={this.handleSignOut}
                        />
                        
                    </Fragment>
                    :
                    <Menu.Item
                        href="/sign_in"
                        name='sign in'


                    />
            }
            </Menu.Menu>
        </Menu>
            


        )
    }
}