//Libraries:
import React from 'react';
import axios from 'axios';
//Components:
import PopUpGallery from './components/PopUpGallery.jsx';
import Image from './components/Image.jsx';
import SeedMongoData from '../../server/mongoSeeder'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPhoto: '',
      productUrls: [],
      productId: 3,
      productName: '',
      hover: false,
      hoverMain: false,
      showPopUp: false,
    };

    this.hoverChoose = this.hoverChoose.bind(this);
    this.fullHover = this.fullHover.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
    this.clickChoose = this.clickChoose.bind(this);
  }

  componentDidMount() {
    this.getRequest();
    window.addEventListener('click', (event) => {
      if (event.target.getAttribute('data-id') && event.target.getAttribute('data-id') !== this.state.productId) {
        this.setState({ productId: event.target.getAttribute('data-id') }, () => {
          this.getRequest();
        });
      }
    });
  }

  getRequest() {
  //get request sends productId and sets state with response urls/product name
    axios.get('http://fecimages-env.pjpdatnnmu.us-east-1.elasticbeanstalk.com/getImages', {
      params:
    { productId: this.state.productId },
    })
      .then((response) => {
      //clears product urls
        this.setState({
          productUrls: [],
        });
        //maps over urls
        response.data.map((url) => {
          this.setState({
            productUrls: [...this.state.productUrls, url.imgUrl],
            productName: url.productName,
          });
        });
        //sets current photo to first url
        this.setState({
          currentPhoto: this.state.productUrls[0],
        });
      })
      .catch((err) => { console.error('no soup for you'); });
  }

  hoverChoose(event) {
    //Hover over thumbnails to choose current image to show
    event.preventDefault();
    this.setState({
      currentPhoto: event.target.src,
      hover: !this.state.hover,
    });
  }

  clickChoose(event) {
    //Click on thumbnail to choose current image in popup
    event.preventDefault();
    this.setState({
      currentPhoto: event.target.src,
    });
  }

  fullHover(event) {
    //Hover over the main image to change the text below it
    event.preventDefault();
    this.setState({
      hoverMain: !this.state.hoverMain,
    });
  }

  togglePopUp(event) {
    //Click to toggle the popup view
    event.preventDefault();
    this.setState({
      showPopUp: !this.state.showPopUp,
    });
  }

  // hoverZoom(event) {
  //   //Hover over main image to zoom
  // }

  render() {
    return (
      <div className="tay-prodImg">
        <Image
          images={this.state.productUrls}
          id={this.state.productId}
          currentPhoto={this.state.currentPhoto}
          hoverChoose={this.hoverChoose}
          hover={this.state.hover}
          hoverMain={this.state.hoverMain}
          fullHover={this.fullHover}
          togglePopUp={this.togglePopUp}
        />
        {this.state.showPopUp ?
          (
            <PopUpGallery
              images={this.state.productUrls}
              id={this.state.productId}
              currentPhoto={this.state.currentPhoto}
              togglePopUp={this.togglePopUp}
              prodName={this.state.productName}
              clickChoose={this.clickChoose}
            />
          ) : null }
      </div>
    );
  }
}

export default App;
