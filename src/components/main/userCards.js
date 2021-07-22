import React, {Component} from 'react';

class UserCards extends Component {
    render() {
        return (
            <div id={"usersComponent"}>
                {this.props.allUsers.map((user) => {
                    return (
                        <div>
                            <div className={"userCircle"}>
                                <img src={user.pb} className={"pbsInList"} alt={"other user"}/>
                            </div>
                            <p className={"showOnHover"}>{user.nickname}</p>
                        </div>

                    )
                })}
            </div>
        );
    }
}

export default UserCards;