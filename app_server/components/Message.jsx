const React = require('react');

class Message extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            editingMessage: false,
            loggedInUserName: props.loggedInUserName,
            loggedInUserId: props.loggedInUserId,
            message: props.message,
            index: props.index,
            prevMessage: props.message
        };
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
        this.editMessage = this.editMessage.bind(this);
        this.handleText = this.handleText.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            loggedInUserName: nextProps.loggedInUserName,
            loggedInUserId: nextProps.loggedInUserId,
            message: nextProps.message,
            index: nextProps.index,
            prevMessage: nextProps.message
        });
    }

    render() {
        if (this.state.editingMessage) {
            return (
                <tr>
                    <td>{this.state.index+1}</td>
                    <td>{this.state.message.name}</td>
                    <td>
                        <form>
                            <input type="text" value={this.state.message.msg} onChange={this.handleText}/>
                            <br/>
                            <button type="submit" onClick={this.updateMessage} className="btn btn-primary">Save</button>
                            &nbsp;
                            <button onClick={this.cancelEdit} className="btn btn-secondary">Cancel</button>
                        </form>
                    </td>
                </tr>
            );
        }

        if (this.state.loggedInUserName == this.state.message.name){
            return (
                <tr>
                    <td>{this.state.index+1}</td>
                    <td>{this.state.message.name}</td>
                    <td>{this.state.message.msg}<br/>
                        <button onClick={this.editMessage} className="btn btn-secondary">Edit</button>
                        &nbsp;
                        <button onClick={this.deleteMessage} className="btn btn-primary">Delete</button>
                    </td>
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

    cancelEdit() {
        console.log("Cancelling edit of message: " + this.state.prevMessage.msg);
        this.setState({
            message: this.state.prevMessage,
            editingMessage: false
        });
    }

    deleteMessage() {
        console.log("Delete message: " + this.state.message.msg);
    }

    editMessage() {
        console.log("Edit message: " + this.state.message.msg);
        this.setState({
            editingMessage: true,
            prevMessage: this.state.message
        });
    }

    handleText(event) {
        this.setState({
            message: { "__v": this.state.message.__v, "_id": this.state.message._id, "name": this.state.message.name, "msg": event.target.value }
        });
    }

    updateMessage() {
        console.log("Updating message: " + this.props.message.msg + " -> " + this.state.message.msg);
        this.setState({
            editingMessage: false
        });
    }
}

module.exports = Message