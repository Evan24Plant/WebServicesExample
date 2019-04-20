const React = require('react');

class Message extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedInUserName: props.loggedInUserName,
            loggedInUserId: props.loggedInUserId,
            message: props.message,
            index: props.index
        };
    }

    render() {
        if(this.state.loggedInUserName == this.state.message.name){
            return (
                <tr>
                    <td>{this.state.index+1}</td>
                    <td>{this.state.message.name}</td>
                    <td>{this.state.message.msg}<br/><button className="btn btn-secondary">Edit</button>&nbsp;<button className="btn btn-primary">Delete</button></td>
                </tr>
            );
        } else {
            return (
                <tr>
                    <td>{this.state.index+1}</td>
                    <td>{this.state.message.name}</td>
                    <td>{this.state.message.msg}</td>
                </tr>
            );
        }
    }
}

module.exports = Message