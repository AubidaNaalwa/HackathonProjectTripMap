
const addingClass = function(){
    //adding class name by the val from input 
   
    const className = $('.inpt').val()
    console.log(className)
    if(className==''){
        alert("Write A Class Name")
    }
    else
    model.asignNewClassRoomToDB(className)
    alert(`${className} is added`)
    console.log("adding class by his name ")
}

const saveTrip = function(){
    localStorage.setItem('wayPoints', JSON.stringify(control.getWaypoints()))
}

const submitTrips = function(){
    //adding the values from saveTrip.html to the DB to create new trip
    document.getElementById("studentForm").addEventListener("click", function(event){
          event.preventDefault()
      });
      const name = $('#tripNameText').val()
      const teacher = $('#teacherAdmin').val()
      const coordinates = [[lat1,lon1],[lat2,lon2]]
      const one = $('#one').val()
      const two = $('#two').val()
      const three = $('#three').val()
      const classes=[one,two,three]
      const trip = {name,teacher,coordinates}
      
      model.addNewTripToDb(trip)
      model.loadClassRooms()
    console.log("submiting Trip ")
    
    // alert("submiting Trip ")
}

const deleteTrip = function(){
    //deleting name of trip from DB
    control = L.Routing.control({
        waypoints: []
    }).addTo(mymap);
    
    alert("")
    }

const submitEmergency = function(){
    //send mail to parent about the emergency situation by taking the val of the input 
    const emergencyText = $('#emergencyText').val()
    if(emergencyText==''){
        alert("Write A Emergency Situation")
    }
    else
    model.emergencySituation(emergencyText)

    console.log("submit emergency situation")
}

const endTrip = function(){
    //send the parent email about ending the trip and update the status of the trip that done
    console.log("Ending Trip")
}

const submitRemoveStudent=function(){
//removes the student from the DB by his name from the input val
const text = $('#removeStudent').val()
if(text==''){
    alert("Write A Emergency Situation")
}
else
console.log("submiting remove student ")
}

const newStudent = function(){
    //adding the values from content.html to add new student
    document.getElementById("newStudentForm").addEventListener("click", function(event){
         //here add the saving student request 
      });
      const name = $('#studentNameText').val()
      const id = $('#studentId').val()
      const age = $('#ageText').val()
      const phoneNumber = $('#phoneStudentText').val()
      const email = $('#mailStudentText').val()
      const classRoom = $('#classRoomNameText').val()
    //   const parentPhoneNumber = $('#parentPhoneNumber').val()
    //   const parentEmail = $('#parentStudentEmail').val()

      const student = {name,id,age,phoneNumber,email,classRoom}
      model.addStudentToDB(student)

    console.log("adding new student")
}
