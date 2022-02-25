export class Map {
    constructor(coords) {
        this.render(coords);
    }

    render(coordinates) {
        if (!google) { //global variable added by the google api
            alert('Could not load maps, try again later!');
            return;
        }
       const map = new google.maps.Map(document.getElementById('map'), { //accepts the identifier of the element where the map will be rendered, second argument to configure the map (ex: which place it will zoom in in the beginning)
            center: coordinates, //centers the map into the user position
            zoom: 16,
        }); 
        new google.maps.Marker({ //instatiates the constructor function for the marker
            position: coordinates,
            map: map, // this constructor function creates a brand new map which we then associate it to the other map by passing the constant as an value for the map property
        }); 
    };
}