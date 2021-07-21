import React, {Component} from 'react';

class UserCards extends Component {
    render() {
        return (
            <div id={"listedUsers"}>
                {this.props.allUserInRoom.length > 0 ? <div>
                        {this.props.allUserInRoom.map((userObj, index) => {
                            return (
                                <div className={"usernameWrapper"} key={index}>
                                    {/*<CameraView stream={this.state.myWeb}/>*/}
                                    <p>{userObj.nickname}</p>
                                </div>
                            )
                        })}

                    </div>
                    : <p>No mate in room yet</p>
                }
            </div>
        );
    }
}

export default UserCards;