import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.js';
import Logo from './components/Logo/Logo.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Particles from 'react-particles-js';
import './App.css';


const particleParams = {
  particles: {
    line_linked: {
      shadow: { enable: true, color: "white",blur: 3 }
    },
    number: {
      value: 40,
      density: { enable:true, value_area: 850 }
    }
  }
}


//Create an initial state. So when a new user signs in, the user state is cleared and no other users data(image) is ssen by the new user.
const initialState = {
  input : '',
  imageURL : '',
  box : {},
  route : 'signin',
  isSignedIn : false,
  user: {
      id : '',
      name : '',
      email : '',
      entries : 0,
      joined : ''
  }
}


class App extends Component {
    constructor(){
      super();
      this.state = initialState;

    }

    //function for updating Users after they are registered
    loadUser = (data) => {
      //update the state with the user that we receive from register page
      this.setState(
        {user : {
            id : data.id,
            name : data.name,
            email : data.email,
            entries : data.entries,
            joined : data.joined
        }}
      )
    }


    calculateFaceLocation = (data) => {
        const clarifaiFace =  data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - (clarifaiFace.bottom_row * height),
        }
    }


    displayFaceBox = (box) => {
      console.log('faceBox dimensions', box)
      this.setState({box: box});
    }


    onInputChange = (event) => {
      this.setState({input: event.target.value}); 
    }

    
    onBtnSubmit = () => {
      this.setState({imageURL : this.state.input});
      
      //export clarifai api call from server
      fetch('https://lit-spire-41800.herokuapp.com/imageurl', {
          method : 'post',
          headers : {'Content-Type' : 'application/json'},
          body : JSON.stringify({
              input : this.state.input
          })
      })
      .then(response => response.json())
      .then(response => {
         if(response){
           fetch('https://lit-spire-41800.herokuapp.com/image', {
                method : 'put',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({
                    id : this.state.user.id
                })
           })
           .then(response => response.json())
           .then(count => {
              this.setState(Object.assign(this.state.user , { entries : count } )) //changes the state of entries but keeps the rest of the values same. else you get undefined name when u update the entries
           })
           .catch(console.log) //improves error handling if we do catch after a .then
         }
         this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
    }


    onRouteChange = (route) => {
      if(route === 'signout') {
         this.setState(initialState); //when we signout we want to remove all info of the signed in user.
      } else if (route === 'home') {
         this.setState({ isSignedIn : true});
      }
      this.setState({ route: route });
    }


    render() {
        const {isSignedIn , imageURL , route , box} = this.state; //destructuring
        return (
          <div className="App">
            {/*Interactove Background Start*/}
            <Particles className='particles'
                  params={particleParams}
            />
            {/*Interactove Background End*/}
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
            {/*if route returns signin component then return Signin Form else return logo & other components means user is signed in*/}
            { route === 'home' 
                  ? <div> 
                        <Logo /> 
                        <Rank name={this.state.user.name} entries={this.state.user.entries} /> {/*To update the Rank with the states of the user*/}
                        <ImageLinkForm onInputChange={this.onInputChange} onBtnSubmit={this.onBtnSubmit}/>
                        <FaceRecognition box={box} imageURL={imageURL}/>
                    </div> 
                  : (
                    route === 'signin' 
                        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> //loadUser To load the User's id
                        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> //function call loadUser
                    )
            }
          </div>
        );
    }
}

export default App;
