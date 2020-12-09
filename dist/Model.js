class Model{ 
    async asignNewClassRoomToDB(className){
       return await  $.post('/class/asignClassroom',{name:className},function(response){
            return response
        })
    }

    async emergencySituation(emergencyText,trip){
        $.post('/Emergency',{text:emergencyText,trip},function(response){
            return response
        })
    }
    
    async addStudentToDB(student){ 
        return $.post('/Student',{student},function(response){
            return response
        })
    }

    async addNewTripToDb(Trip){
        $.post('/Trip',{Trip},function(response){
            return response
        })
    }

    async checkUser(user){
        return await $.post('/user',{Trip},function(response){
            return response
        })
    }

}
