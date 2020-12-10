
let points = []
let control



//refresh page 
async function loadThePage() {

     const loadingStatus = checkLocalStorageData()
    
     if(!loadingStatus.isLoggedIn){
        renderer.loadLogInPage()
        return
     }
     else{
         if(loadingStatus.status == 0){ 
            renderer.loadteacherPage()
            const user = await  model.checkUser(loadingStatus.username)
            loadPage([], user.trip.wayPoints) // todo
            loadPage([], [])
         }
         else{
             if(loadingStatus.status == 1){
                renderer.loadstudentPage()
                  // const user = await model.checkUser(loadingStatus.username)
                // loadPage(user.posts, user.trip.coordinates)

                loadPage([], [])
            }
        }
    }
}



// Events

// const model = new Model()
// const renderer = new Renderer()


const post = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        const text = $('#postText').val()
        var marker = L.marker([lat, long]).addTo(mymap);
        marker.bindPopup(`<b>${text}</b>`).openPopup();
        let email = $('#mailStudentText').val()
        let post = {lat, lon, text}
        model.addNewPost(post, email)
    })
}
var popup = L.popup();

// console.log(L.latLng(57.74, 11.94))

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
})

$('#emergencyButton').on('click', async function () {
    const emergencyText = $("#emergencyText").val()
    if (!emergencyText) {
        return
    }
    const trip = "" // get the field of the trip
    model.emergencySituation(emergencyText, trip)
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


let flagClass = 0
const addClass = function () {
    if (flagClass == 0) {
        renderer.addClass()
        flagClass = 1
    } else {
        renderer.hideAddClass()
        flagClass = 0
    }
}

let flagStudent = 0
const removeStudent = function () {
    if (flagStudent == 0) {
        renderer.removeStudent()
        flagStudent = 1
    } else {
        renderer.hideStudent()
        flagStudent = 0
    }
}

let flagEmergency = 0
const emergency = function () {
    if (flagEmergency == 0) {
        renderer.emergency()
        flagEmergency = 1
    } else {
        renderer.hideEmergency()
        flagEmergency = 0
    }
}



let flagPost = 0
const addPost = function () {
    if (flagPost == 0) {
        renderer.addPost()
        flagPost = 1
    } else {
        renderer.hidePost()
        flagPost = 0
    }
}



const switchdiv = function () {
    renderer.switchdiv()

}

const hideAddClass = function () {
    renderer.hideAddClass()
}

const hideEmergency = function () {
    renderer.hideEmergency()
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

$('#options').on('click', '#addTrip',function () {

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



function setLocalStorageData(username, status) {
    localStorage.setItem('UserName', username)
    localStorage.setItem('isLoggedIn', true)
    localStorage.setItem('status', status)
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


function checkLocalStorageData() {
    return {
        username :localStorage.getItem('username'),
        status :  localStorage.getItem('status'),
        isLoggedIn :  localStorage.getItem('isLoggedIn')
    }
}


const logOut = function()
{
    localStorage.clear();
    loadThePage()
}


