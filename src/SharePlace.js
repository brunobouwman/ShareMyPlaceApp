import { Modal } from './UI/Modal';
import { Map } from './UI/Map';

class PlaceFinder {
    constructor() {
      const addressForm = document.querySelector('form');
      const locateUserBtn = document.getElementById('locate-btn');
      addressForm.addEventListener('click', this.locateUserForm.bind(this));
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
  
    findAdressHandler() {}
  }
  
  new PlaceFinder();
  