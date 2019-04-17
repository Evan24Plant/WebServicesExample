const React = require('react');

class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.login = this.login.bind(this);
        this.handleText = this.handleText.bind(this);
        this.register = this.register.bind(this);
    }

    render() {
        let loginFailText;

        if (this.props.loginFail) {
            loginFailText = <p className="card-text pt-1 text-danger">Failed Login Attempt.&nbsp;{this.props.loginAttempts} attempts remaining.</p>
        }

        return(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Log in to post a Message:</h5>
                    <form onSubmit={this.login}>
                        <div className="form-group">
                            <div className="row">
                                <label htmlFor="email" className="col-1 col-form-label">
                                    Email: 
                                </label>
                                <div className="col-4">
                                    <input id="email" type="text" className="form-control" placeholder="enter email" value={this.state.email} onChange={this.handleText}/>
                                </div>
                                <label htmlFor="password" className="col-1 col-form-label">
                                    Password: 
                                </label>
                                <div className="col-4">
                                    <input id="password" type="password" className="form-control" placeholder="enter password" value={this.state.password} onChange={this.handleText}/>
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary">
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    {loginFailText}
                    <span className="card-text">Not registered?&nbsp;&nbsp;</span>
                    <button className="btn btn-secondary" onClick={this.register}>Register</button>
                </div>
            </div>
        );
    }

    handleText(event) {
        if(event.target.id === "email") {
            this.setState({
                email: event.target.value
            });
        } else {
            this.setState({
                password: event.target.value
            });
        }
    }

    login(event) {
        event.preventDefault();

        // pass control to the MsgBoard and send the email & pass the user entered
        this.props.loginCallback({
            email: this.state.email,
            password: this.state.password
        });
    }

    register(event) {
        this.props.registerCallback()
    }
}

module.exports = Login