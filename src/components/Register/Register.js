import React  from 'react';


class Register extends React.Component{
        //create the state
        constructor(props){ //so we can use props later
            super(props);
            this.state = {
            email : '',
            password: '',
            name: ''
            }
        }
    
        onNameChange = (event) => {
            //func listens for change of email while signing in
            this.setState({ name : event.target.value })
        }//end func

        onEmailChange = (event) => {
            //func listens for change of email while signing in
            this.setState({ email : event.target.value })
        }//end func
    
        onPasswordChange = (event) => {
            //func listens for change of password while signing in
            this.setState({ password : event.target.value })
        }//end func

        onSubmitSignIn = () => {
            //uses the state to fetch email and passowrd and check with the database if its a registered user
           // console.log(this.state);
           fetch('https://lit-spire-41800.herokuapp.com/register' , {
               method : 'post', 
               headers : {'Content-Type' : 'application/json'},
               body : JSON.stringify({
                   email : this.state.email,
                   password : this.state.password,
                   name : this.state.name
               })
           })
           .then(response => response.json())
           .then(user => {
               if(user.id){
                   this.props.loadUser(user); //function call
                    this.props.onRouteChange('home'); //route change
               }
           })
        }


    render(){
        //const { onRouteChange } = this.props;
        return (
            <article className="br3 ba mv4 w-100 w-50-m w-25-l mw6 shadow-4 center">
                <main className="pa4 black-80">
                    <div className="measure ">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="text" 
                                       name="name"  
                                       id="name" 
                                       onChange = { this.onNameChange } />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="email" 
                                       name="email-address"  
                                       id="email-address"
                                       onChange = { this.onEmailChange } />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       type="password" 
                                       name="password"  
                                       id="password" 
                                       onChange = { this.onPasswordChange } />
                            </div>
                        </fieldset>
    
                        <div className="">
                            <input onClick={this.onSubmitSignIn} //we want this func to run only when onclick happens and then onclick will call this func. the way to acheive this is thru arrow functions
                                   className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f5 dib" 
                                   type="submit" 
                                   value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        );
    }   
}




export default Register;