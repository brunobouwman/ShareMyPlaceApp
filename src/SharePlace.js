import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getAddressFromCoords, getCoordsFromAddress } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const addressFormBtn = document.querySelector('form button');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.sharedLinkInputEl = document.getElementById('share-link');

    addressFormBtn.addEventListener('click', this.findAdressHandler.bind(this));
    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this)); //adding eventlisteners to the constructor so they will be initialized in the instance (bind this so the handler function can utilize 'this' related to the class instance)
    this.shareBtn.addEventListener('click', this.sharePlaceHandler.bind(this));
  }

  sharePlaceHandler() {
    //if the doesn't support browser supports
    if (!navigator.clipboard) {
      this.sharedLinkInputEl.select(); //clipboard won't work but at least the button selects the address
      return;
    }
    //returns a promise and stores the value of the input (link address) in the user's clipboard
    navigator.clipboard.writeText(this.sharedLinkInputEl.value).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.log(err);
      this.sharedLinkInputEl.select();
    }); 
  }

  selectPlace(coordinates, address) {
    //checks if theres a map in place already and if there is reuses it (so theres no need to render a new map every time)
    if (this.map) {
      this.map.render(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    this.shareBtn.disabled = false;
    this.sharedLinkInputEl.value = `${
      location.origin
    }/my-place?address=${encodeURI(address)}&lat=${coordinates.lat}&lng=${
      coordinates.lng
    }`; //location.origin gives you the user current DOMAIN. '?' query parameter for extra data '&' another optional query parameter
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location not available in your browser, you can still manually enter the address.'
      );
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        //arrow function so this referes to the same as if used outside of the function and async because we need to AWAIT it's result
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        modal.hide(); //only executes when sucess is "triggered" hence promise complete
        const address = await getAddressFromCoords(coordinates);
        this.selectPlace(coordinates, address);
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
    if (!address || address.trim().lenght === 0) {
      //checks if the address was inputed (trim to ignore white spaces)
      alert('Invalid address entered, try again');
      return;
    }
    const modal = new Modal(
      'loading-modal-content',
      'Loading location - please wait'
    );
    modal.show();
    try {
      const coordinates = await getCoordsFromAddress(address); //returns a promise
      this.selectPlace(coordinates, address);
    } catch (err) {
      //catches any potential error in the proccess
      alert(err.message); //built-in error constructor function gives you the .message property (display messages created in the error handling configured in the location.js file)
    }
    modal.hide(); //only executes when the promise settled (wrapped into an 'invisble' then block)
  }
}

new PlaceFinder();
