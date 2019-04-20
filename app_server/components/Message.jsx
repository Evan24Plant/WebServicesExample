const React = require('react');

const Message = (props) => {


    if(props.loggedInUserName == props.message.name){
        return (
            <tr>
                <td>{props.index+1}</td>
                <td>{props.message.name}</td>
                <td>{props.message.msg}<br/><button className="btn btn-secondary">Edit</button>&nbsp;<button className="btn btn-primary">Delete</button></td>
            </tr>
        );
    } else {
        return (
            <tr>
                <td>{props.index+1}</td>
                <td>{props.message.name}</td>
                <td>{props.message.msg}</td>
            </tr>
        );
    }
}

module.exports = Message