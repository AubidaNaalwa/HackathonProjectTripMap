


const loadPage = function(){
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        console.log(lat)
        console.log(long)
        const mymap = L.map('mapid').setView([lat, long], 13);


        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFtYWxpYWJkZWxoYWkiLCJhIjoiY2tpZXYxZXpzMDhobjJ1cWt2bXA2ZjdwbSJ9.1PAlsL7vSMwXHpFFo5BKcA', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'your.mapbox.access.token'
        }).addTo(mymap);

    

        // var marker = L.marker([lat, long]).addTo(mymap);
        // marker.bindPopup("<b>Hello world!</b><br>I'm here!.").openPopup();

        const littleton = L.marker([lat, long]).bindPopup('This is Littleton, CO.'),
             denver   = L.marker([lat+0.01, long+0.0001]).bindPopup('This is Denver, CO.'),
             aurora   = L.marker([lat+0.02, long+0.02]).bindPopup('This is Aurora, CO.'),
             golden   = L.marker([lat+0.04, long+0.02]).bindPopup('This is Golden, CO.');
    
        const stops = L.layerGroup([littleton, denver, aurora, golden]);
        const lines = L.polyline([[lat, long],[lat+0.01, long+0.0001], [lat+0.02, long+0.02], [lat+0.04, long+0.02]]);




        const  grayscale = L.tileLayer("https://www.mapbox.com/", {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'}),
        streets   = L.tileLayer("https://www.mapbox.com/", {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'});

        var baseMaps = {
            "Grayscale": grayscale,
            "Streets": streets
        };
        
        var overlayMaps = {
            "Stops": stops,
            "Lines": lines
        };


        L.control.layers(baseMaps, overlayMaps).addTo(mymap);

        var baseMaps = {
            "<span style='color: gray'>Grayscale</span>": grayscale,
            "Streets": streets
        };

          

              
        

        



        // marker.bindTooltip("my tooltip text").openTooltip();

        // mymap.on('click', function(e){
        //     alert("You clicked the map at " + e.latlng);

        // });

        // var popup = L.popup();

        // mymap.on('click', function(e){
        //     popup
        //     .setLatLng(e.latlng)
        //     .setContent("You clicked the map at " + e.latlng.toString())
        //     .openOn(mymap);
        // });




        
    })
}

loadPage()






