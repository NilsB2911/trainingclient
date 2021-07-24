import React, {Component} from 'react';

class UserCards extends Component {
    render() {
        return (
            <div id={"usersComponent"}>
                {this.props.allUsers.map((user) => {
                    return (
                        <div className={"circleNameWrapper"}>
                            <div className={"userCircle"}>
                                <img src={user.pb} className={"pbsInList"} alt={"other user"}/>
                            </div>
                            <div className={"showOnHover"}>
                                <p>{user.nickname}</p>
                            </div>
                        </div>

                    )
                })}
            </div>
        );
    }
}

export default UserCards;