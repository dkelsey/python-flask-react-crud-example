import React, { Component } from 'react';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
        console.log(userInfo);
        this.setState({username: userInfo.preferred_username, name: userInfo.name, email: userInfo.email, id: userInfo.sub})
    });
  }

  render() {
    return (
      <div className="UserInfo">
        <p>UserName: {this.state.username}</p>
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
      </div>
    );
  }
}
export default UserInfo;
