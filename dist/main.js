

const mymap = L.map('mapid').setView([32.0853, 34.7818], 13);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaWFtYWxpYWJkZWxoYWkiLCJhIjoiY2tpZXYxZXpzMDhobjJ1cWt2bXA2ZjdwbSJ9.1PAlsL7vSMwXHpFFo5BKcA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);



// Events

const model = new Model()
const renderer = new Renderer()

$('#classButton').on('click', async function () {
    const className = $('#className').val()
    if (!className) {
        return
    }
    const response = await model.asignNewClassRoomToDB(className)
    $('#className').val("")
    if (response.err) {
        console.log(response.err)

        return
    }
}
)

$('#emergencyButton').on('click', async function () {
    const emergencyText = $("#emergencyText").val()
    if (!emergencyText) {
        return
    }
    const trip = "" // get the field of the trip
    model.emergencySituation(emergencyText,trip)
    alert('emergency sent')
    $("#emergencyText").val("")
})

function getStudentObject() {
    const name = $('#studentNameText').val()
    const age = $('#ageText').val()
    const id = $('#idText').val()
    const mail = $('#mailStudentText').val()
    const phone = $('#phoneStudentText').val()
    const classRoomName = $('#classRoomNameText').val()
    const parentPhone = $('#parentPhoneNumber').val()
    const parentEmail = $('#parentStudentEmail').val()
    return {
        name,
        age,
        id,
        mail,
        phone,
        classRoomName,
        parentPhone,
        parentEmail
    }

}

function checkFullAttributes(obj) {
    const keys = Object.keys(obj)
    for (let i of keys) {
        if (!obj[i])
            return false
    }
    return true
}


const addClass= function(){
        $("#classInfo").css("display", "flex")
}
    


const emergency= function(){
    $("#emergencyInfo").empty().append(`<div class="info"  id="emergencyInfo">
    <input type="text" class="inpt" id="emergencyText" placeholder="What's your emergency?">
    <button id='submit'>SUBMIT</button>`
    )
}  


const switchdiv = function(){
    $("#saveTrip").css("display","grid")
    $("#addTrip").css("display","none")
    
}  


function clearStudentFields() {
    $('#studentNameText').val("")
    $('#ageText').val("")
    $('#idText').val("")
    $('#mailStudentText').val("")
    $('#phoneStudentText').val("")
    $('#classRoomNameText').val("")
    $('#parentPhoneNumber').val("")
    $('#parentStudentEmail').val("")
}

$('#submit-student').on('click', async function () {
    //studentNameText
    const obj = getStudentObject()
    if (!checkFullAttributes(obj)) {
        alert('insert full fields')
    }
    model.addStudentToDB(obj)
    clearStudentFields()
})

let clicakble = 0;

$('#addTrip').on('click', function () {
    clicakble = 1;

})

$('#sendbtn').on('click', function () {
    if (points.length < 2) {
        alert('insert Trip Route')
        points = []
        return
    }
    model.addNewTripToDb({
        teacherName: "",
        TripName: "",
        wayPoints: control.getWaypoints(),
        classRooms: []
    })

  
})

let points = []
let control;
console.log(L.latLng(57.74, 11.94))
mymap.on('click', function (e) {
    if (!clicakble) {
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

function setLocalStorageData(username, status) {
    localStorage.setItem('UserName', username)
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('status', status)
}


var expanded = false;

function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
            checkboxes.style.display = "none";
            expanded = false;
        }
}
            

$('#logInSubmit').on('click', async function () {
    const username = $('#user').val()
    const pass = $('#pass').val()
    if (!pass || !username) {
        alert('missing informations')
    }
    const kind = await model.checkUser({ username, pass })
    if (kind.err) {
        alert('userName or Password are incorrect')
        return
    }
    setLocalStorageData(username, kind.status)
})


function checkLocalStorageData(){
    return {
        username :localStorage.getItem('UserName'),
        status :  localStorage.getItem('status'),
        isLoggedIn :  localStorage.getItem('isLoggedIn')
    }
}


function loadThePage() {
    // userLoad from localStorage
    // load the map if he have a map on his name
     const loadingStatus = checkLocalStorageData()
     if(!loadingStatus.username || !loadingStatus.isLoggedIn){
         // go to the logIn page
         return
     }
     if(status){
         // loadMap
     }
     // load main map with  logged in as a existing user
}