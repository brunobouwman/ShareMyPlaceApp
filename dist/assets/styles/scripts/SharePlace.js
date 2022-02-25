class PlaceFinder {
  constructor() {
    const addressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler); //adding eventlisteners to the constructor so they will be initialized in the instance
    addressForm.addEventListener('submit', this.findAdressHandler);
    console.log(locateUserBtn);
  }

  locateUserHandler() {
    if (!navigator.geolocation) {
      alert(
        'Location not available in your browser, you can still manually enter the address.'
      );
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        console.log(coordinates);
      },
      (error) => {
        alert('Could not locate you, please enter an address manually.');
      }
    );
  }

  findAdressHandler() {}
}

new PlaceFinder();
