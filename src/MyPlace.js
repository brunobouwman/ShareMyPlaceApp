import { Map } from './UI/Map'

class loadedPlace {
    constructor(coordinates, address) {
        new Map(coordinates);
        const headerTitleEl = document.querySelector('header h1'); //Selects first h1 element inside the firs header element
        headerTitleEl.textContent = address;
    }
}

const url = new URL(location.href); //built in URL constructor function (class) which creates an object of information about the URL. location.href = current location loaded in the browser
const queryParams = url.searchParams; // stores everything after the question mark as property/values
const coords = {
    lat: +queryParams.get('lat'), //retrieves values from the lat parameter (lat= in the URL) as strings. The '+' operator transforms it into a number
    lng: +queryParams.get('lng')
}
const address = queryParams.get('address'); //automatically parsed into an human readable 
new loadedPlace(coords, address);