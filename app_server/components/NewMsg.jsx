const React = require('react');

class NewMsg extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            msg: ""
        };
        this.handleText = this.handleText.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

    render() {
        return(
            <form onSubmit={this.addMessage}>
                <div className="form-group">
                    <div className="row">
                        <label htmlFor="msg" className="col-12 col-form-label">
                            Enter Message: 
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-11">
                            <input id="msg" type="text" className="form-control" placeholder="Your Message" value={this.state.msg} onChange={this.handleText}/>
                        </div>
                        <div className="col-1">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }

    addMessage(event) {
        event.preventDefault();

        // save state vars to local
        let name = this.props.userName;
        let msg = this.state.msg;

        // make sure neither field is empty
        if (!name || !msg) {
            return console.error('Name and/or Msg cannot be empty');
        }

        // trim any whitespace
        name = name.trim(); 
        msg = msg.trim();

        // pass control to MsgBoard so it can make the API Call and update message
        this.props.addMsgCallback({ name: name, msg: msg });
    }
    
    handleText(event) {
        this.setState({
            msg: event.target.value
        });
    }
}

module.exports = NewMsg