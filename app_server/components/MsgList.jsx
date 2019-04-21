const React = require('react');
const Message = require('./Message.jsx');

const MsgList = (props) => {
    return (
        <table className="table table-striped table-bordered">
            <thead>
                <tr>
                    <th className="w-25" scope="col">#</th>
                    <th className="w-25" scope="col">Name</th>
                    <th className="w-50" scope="col">Message</th>
                </tr>
            </thead>
            <tbody>
                {props.messages.map((message, index) => 
                    <Message key={message._id} message={message} index={index} loggedInUserId={props.loggedInUserId} loggedInUserName={props.loggedInUserName} updateMsgCallback={props.updateMsgCallback}/>
                )}
            </tbody>
        </table>
    );
}

module.exports = MsgList