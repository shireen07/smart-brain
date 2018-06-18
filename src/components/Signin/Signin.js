import React  from 'react';


class Signin extends React.Component{
    //create the state
    constructor(props){ //so we can use props later
        super(props);
        this.state = {
            signInEmail : '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        //func listens for change of email while signing in
        this.setState({ signInEmail : event.target.value })
    }//end func

    onPasswordChange = (event) => {
        //func listens for change of password while signing in
        this.setState({ signInPassword : event.target.value })
    }//end func

    onSubmitSignIn = () => {
        //uses the state to fetch email and passowrd and check with the database if its a registered user
       // console.log(this.state);
       fetch('https://lit-spire-41800.herokuapp.com/signin' , {
           method : 'post', 
           headers : {'Content-Type' : 'application/json'},
           body : JSON.stringify({
               email : this.state.signInEmail,
               password : this.state.signInPassword
           })
       })
       .then(response => response.json())
       .then(user => {
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
             }
        })
    }


    render(){
        const { onRouteChange } = this.props;
        return (
                <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
                    <main className="pa4 black-80">
                        <div className="measure ">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           onChange={ this.onEmailChange } 
                                           type="email" 
                                           name="email-address"  
                                           id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                           onChange={ this.onPasswordChange } 
                                           type="password" 
                                           name="password"  
                                           id="password" />
                                </div>
                            </fieldset>
        
                            <div className="">
                                <input onClick={this.onSubmitSignIn} //we want this func to run only when onclick happens and then onclick will call this func. the way to acheive this is thru arrow functions
                                       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                       type="submit" 
                                       value="Sign in" 
                                    />
                            </div>
                        
                            <div className="lh-copy mt3 pointer">
                                <p onClick={() => onRouteChange('register')}
                                   className="f5 link dim black db">Register</p>
                            </div>
                        </div>
                    </main>
                </article>
            );
    }   
} 


export default Signin;