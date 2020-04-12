import React, { Component } from 'react';

class SignIn extends Component {
    constructor(){
        super();
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onSignInEmail = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onSignInPassword = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSignInSubmit = () => {
        fetch('https://nameless-hamlet-56582.herokuapp.com/signin', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        const { onRouteChange } = this.props;
         return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 ontop">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  autoComplete="username" onChange={this.onSignInEmail}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="current-password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  autoComplete="current-password" onChange={this.onSignInPassword}/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSignInSubmit}                                                                                                                                                                                                                                                                                                                       
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" 
                                value="Sign in" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
   
}

export default SignIn;