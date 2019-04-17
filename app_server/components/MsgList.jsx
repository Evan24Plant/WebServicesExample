const React = require('react');

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
                    <tr key={message._id}>
                        <td>{index+1}</td>
                        <td>{message.name}</td>
                        <td>{message.msg}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

module.exports = MsgList