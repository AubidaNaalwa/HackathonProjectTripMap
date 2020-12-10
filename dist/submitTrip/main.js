//load Classes do your shit 
let expanded = false;

function showCheckboxes(){
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
}
let classroomNames 
const fun = async function()
{
    classrooms = await model.loadClassRooms()
    console.log(classrooms)
    classroomNames = classrooms.map(cr => { return{'name': cr.name}})
    console.log(classroomNames)
    classroomNames.forEach(d => d.name)
    console.log(classroomNames)
    const source = $('#store-template').html();
    const template = Handlebars.compile(source);
    const newHTML = template({classroomNames});
    $('#checkboxes').empty().append(newHTML);
    console.log(localStorage.getItem('username'))
    $('#teacherå').attr('placeholder', localStorage.getItem('username'))
}

fun()


async function addTripToDB(){
        // need to the data from inde
 
        const trip = {
            classes: [],
            status: 0,
            teacher : localStorage.getItem('username'),
            coordinates : JSON.parse(localStorage.getItem('wayPoints')).map(ele => ({lat : ele.lat,lng:ele.lon})),
            name :$('#tripNameText').val()
        }
    
        for(let i of classroomNames )
        {
            
            if ($(`#${i.name}`).is(":checked"))
            {   
                trip.classes.push(i.name)
            }
        }
    
        await model.addNewTripToDb(trip)
}