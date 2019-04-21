const React = require('react');
const MsgList = require('./MsgList.jsx');
const NewMsg = require('./NewMsg.jsx');
const Login = require('./Login.jsx');
const Registration = require('../../client_side/Registration.jsx');

class MsgBoard extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            messages: this.props.messages,
            loginForm: true,
            loginAttempts: 3,
            loginFail: false,
            userCredentials: {
                email: '',
                password: ''
            },
            registrationForm: false,
            registrationFail: false,
            loggedInUserId: '',
            loggedInUserName: '',
            loggedInAdmin: false
        };
        this.addMessage = this.addMessage.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.deleteAllMessages = this.deleteAllMessages.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
    }

    componentDidMount() {
        fetch(`${process.env.API_URL}/msgs`)
        .then(response=> this.handleHTTPErrors(response))
        .then(response=> response.json())
        .then(result=> {
            this.setState({
                messages: result
            });
        })
        .catch(error=> {
            console.log(error);
        });       
    }

    render() {
        if (this.state.registrationForm) {
            let failedRegistration;

            if (this.state.registrationFail) {
                failedRegistration = <p className="text-danger">User already Registered or Registration Error.</p>
            }

            return (
                <div>
                    <Registration registerNewUserCallback={this.addNewUser}/>
                    {failedRegistration}
                </div>
            )
        } else {
            let form;
            
            if (this.state.loginForm) {
                form = <Login registerCallback={this.register}
                    loginCallback={this.login}
                    loginFail={this.state.loginFail}
                    loginAttempts={this.state.loginAttempts}
                />
            } else {
                form = <NewMsg addMsgCallback={this.addMessage} userName={this.state.loggedInUserName}/>
            }

            if (this.state.loggedInAdmin) {
                return(
                    <div>
                        {form}
                        <MsgList messages={this.state.messages} loggedInUserId={this.state.loggedInUserId} loggedInUserName={this.state.loggedInUserName} updateMsgCallback={this.updateMessage} />
                        <button onClick={this.deleteAllMessages} className="btn btn-primary">Delete All Messages</button>
                    </div>
                )
            } else {
                return(
                    <div>
                        {form}
                        <MsgList messages={this.state.messages} loggedInUserId={this.state.loggedInUserId} loggedInUserName={this.state.loggedInUserName} updateMsgCallback={this.updateMessage} />
                    </div>
                )
            }            
        }
    }

    addMessage(message) {
        const basicString = this.state.userCredentials.email + ':' + this.state.userCredentials.password;

        // update back-end data
        fetch(`${process.env.API_URL}/msgs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
            this.setState({
                messages: [result].concat(this.state.messages)
            });
        })
        .catch(error=> {
            console.log(error);
        });    
    }

    addNewUser(userDetails) {
        fetch(`${process.env.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(userDetails)
        })
        .then(response => {
            if (response.status === 201) {
                // User successfully registered, disable the registration form
                this.setState({
                    registrationForm: false,
                    registrationFail: false
                });
            } else {
                // Some error or User already exists
                this.setState({
                    registrationFail: true
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    deleteAllMessages() {
        console.log("Deleting all messages...");
    }

    handleHTTPErrors(response) {
        if (!response.ok) throw Error(response.status + ': ' + response.statusText);
        return response;
    }

    login(userCredentials) {
        // userCredentials is passed in from Login Component
        // For basic Authentication it is username:password (but we're using email)
        const basicString = userCredentials.email + ':' + userCredentials.password;

        fetch(`${process.env.API_URL}/users/login`, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(basicString)
            }
        })
        .then(response => {
            // No more login attempts, throw an error
            if (this.state.loginAttempts === 0) throw 'locked out';

            // OK response, credentials accepted
            if (response.status === 200) {
                this.setState({
                    userCredentials: userCredentials,
                    loginForm: false,
                    loginFail: false
                });
                return response;
            } else {
                // Credentials are wrong
                this.setState((state) => {
                    return({
                        loginFail: true,
                        loginAttempts: state.loginAttempts - 1
                    });
                });
            }
        }).then(result=> result.json())
        .then(result=> {
            this.setState({
                loggedInUserId: result._id,
                loggedInUserName: result.username,
                loggedInAdmin: result.admin
            });
        }).catch(error => {
            console.log(error);
        })
    }

    register() {
        this.setState({
            registrationForm: true
        });
    }

    updateMessage(message) {
        console.log("Message received by MsgBoard: " + message.msg + "\nMaking API call.");

        const basicString = this.state.userCredentials.email + ':' + this.state.userCredentials.password;
        const msgId = message._id;

        // update back-end data
        fetch(`${process.env.API_URL}/msgs/${msgId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(basicString)
            },
            body: JSON.stringify(message)
        })
        .then(response=> this.handleHTTPErrors(response))
        .then(result => result.json())
        .then(result => {
            const msgArrIndex = this.state.messages.findIndex( (element) => {
                return (element._id == result._id);
            });

            this.state.messages.splice(msgArrIndex, 1, result);
        })
        .catch(error=> {
            console.log(error);
        });    
    }
}

module.exports = MsgBoard