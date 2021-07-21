import React, {Component} from 'react';

class UserCards extends Component {
    render() {
        return (
            <div id={"usersComponent"}>
                {this.props.allUsers.map((user) => {
                    return (
                        <div>
                            <div className={"userCircle"}></div>
                            <p className={"showOnHover"}>{user.nickname}</p>
                        </div>

                    )
                })}
            </div>
        );
    }
}

export default UserCards;