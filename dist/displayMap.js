
function getPreciseLocation() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    });
}

const loadPage = async function(pointsFromDB, wayPointsFromDB){
    //check user isLogged In 
    //if not LOCALSTORAGE 
    points = pointsFromDB.map(ele => {ele.lat, ele.lon})

    coord = await getPreciseLocation()
    console.log(coord)
    const lat = coord[0]
    const lon = coord[1]
    console.log(lat)
    console.log(lon)

    const mymap = L.map('mapid').setView([lat, lon], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFtYWxpYWJkZWxoYWkiLCJhIjoiY2tpZXYxZXpzMDhobjJ1cWt2bXA2ZjdwbSJ9.1PAlsL7vSMwXHpFFo5BKcA', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    // let marker = L.marker([lat, lon]).addTo(mymap);

    var greenIcon = L.icon({
        iconUrl: 'images/leaf-red.png',
        shadowUrl: 'images/leaf-shadow.png',
    
        iconSize:     [38, 95], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([lat, lon], {icon: greenIcon}).addTo(mymap);

    //for each points in pointsfromDB please render it in the map 
    // student is the fucking user 

    control = L.Routing.control({
        waypoints: wayPointsFromDB
    }).addTo(mymap);

// kind of the user 
// getting the kind of the user from localStorage as a status 
//if status is 0 then the user is a fucking teacher 
//ifstatus is 1 then the user is a fucking Student and dont give him to draw routes for the GOD sake 

    mymap.on('click', function (e) {
        if (!clicakble || points.length > 1) {
            return  
        }
        points.push(e.latlng)
        if (control) {
            mymap.removeControl(control);
        }
        control = L.Routing.control({
            waypoints: points
        }).addTo(mymap);
    })    
}