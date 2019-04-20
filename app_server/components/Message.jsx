const React = require('react');

const Message = (props) => {
    return (
        <tr key={props.message._id}>
            <td>{props.index+1}</td>
            <td>{props.message.name}</td>
            <td>{props.message.msg}</td>
        </tr>
    );
}

module.exports = Message