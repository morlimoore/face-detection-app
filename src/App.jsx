import React, { Component } from 'react';
import Registration from './components/registration/Registration';
import SignIn from './components/signIn/SignIn';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import InfoPane from './components/infoPane/InfoPane';
import FaceDetection from './components/faceDetection/FaceDetection';
import Particles from 'react-particles-js';
import 'tachyons';
import './App.css';
import Clarifai from 'clarifai';
import particlesOptions from './particlesJS';

const app = new Clarifai.App({apiKey: 'b57fdc38eab0440dba24d41655c57066'});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL:'',
      faceBox: {},
      route: 'signin',
      isSignedIn: false,
      
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
        }
      }
    }

  loadUser = (data) => {
    this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/')
      .then(response => response.json())
      .then(console.log)
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    }
    else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageURL: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      if (response) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(data => data.json())
        .then(count => 
          this.setState(Object.assign(this.state.user, { entries: count })))
      }
        this.displayFaceBox(this.computeFaceLocation(response))})
    .catch(err => console.log(err));
  }

  computeFaceLocation = (data) => {
    const coordinates = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: coordinates.left_col * width,
      topRow: coordinates.top_row * height,
      rightCol: width - (coordinates.right_col * width),
      bottomRow: height - (coordinates.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({faceBox:box});
  }

  render () {
    const { imageURL, faceBox, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route === 'home' ? 
          <div>
            <Logo />
            <InfoPane name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceDetection imageURL={imageURL} faceBox={faceBox}/>
          </div>
            :
            (
              this.state.route === 'signin' 
                ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
                : <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
}

export default App;

// https://cdn.thingiverse.com/assets/ff/0f/83/65/d7/WomanFace.jpg