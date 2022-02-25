import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import {getCoordsFromAddress} from './Utility/Location'

class PlaceFinder {
    constructor() {
      const addressFormBtn = document.querySelector('form button');
      const locateUserBtn = document.getElementById('locate-btn');
      addressFormBtn.addEventListener('click', this.findAdressHandler.bind(this));
      locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this)); //adding eventlisteners to the constructor so they will be initialized in the instance (bind this so the handler function can utilize 'this' related to the class instance)
    }

  selectPlace(coordinates) {
        if (this.map) { //checks if theres a map in place already and if there is reuses it (so theres no need to render a new map every time)
            this.map.render(coordinates);
        } else {
            this.map =  new Map(coordinates);
        }
    }
  
    locateUserHandler() {
      if (!navigator.geolocation) {
        alert(
          'Location not available in your browser, you can still manually enter the address.'
        );
        return;
      }
      const modal = new Modal('loading-modal-content', 'Loading location - please wait');
      modal.show();
      navigator.geolocation.getCurrentPosition(
        (successResult) => { //arrow function so this referes to the same as if used outside of the function
            modal.hide(); //only executes when sucess is "triggered" hence promise complete
          const coordinates = {
            lat: successResult.coords.latitude,
            lng: successResult.coords.longitude,
          };
          this.selectPlace(coordinates);
        },
        (error) => {
            modal.hide();
          alert('Could not locate you, please enter an address manually.');
        }
      );
    }
  
    async findAdressHandler(event) {
      // console.log(event.target.parentElement.querySelector('input'));
      event.preventDefault(); //prevents the default submit event by the browser (reload the page)
      const address = event.target.parentElement.querySelector('input').value; //target is the form itself
      if (!address || address.trim().lenght === 0) { //checks if the address was inputed (trim to ignore white spaces)
       alert('Invalid address entered, try again');
       return; 
      }
      const modal = new Modal('loading-modal-content', 'Loading location - please wait');
      modal.show();
      try {
     const coordinates = await getCoordsFromAddress(address); //returns a promise
     this.selectPlace(coordinates);
      }catch (err) { //catches any potential error in the proccess
        alert(err.message); //built-in error constructor function gives you the .message property (display messages created in the error handling configured in the location.js file)
      }
      modal.hide(); //only executes when the promise settled (wrapped into an 'invisble' then block)
      }
  }
  
  new PlaceFinder();
  