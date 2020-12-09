class Renderer{


    addClass(){
        $("#classInfo").css("display", "flex")
    }

    emergency(){
        $("#emergencyInfo").css("display","flex")
    }

    addPost(){
        $("#addingpost").css("display","flex")
    }

    switchdiv(){
        $("#saveTrip").css("display","grid")
        $("#addTrip").css("display","none")
    }

    hideAddClass(){
        $('#classInfo').css("display","none")
    }

    hideEmergency(){
        $('#emergencyInfo').css("display","none")
    }

    hidePost(){
        $('#addingpost').css("display","none")
    }

    removeStudent(){
        $("#studentInfo").css("display", "flex")
    }

    hideStudent(){
        $('#studentInfo').css("display","none")
    }

    
}