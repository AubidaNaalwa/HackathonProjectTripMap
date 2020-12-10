class Model{ 

    async asignNewClassRoomToDB(className){
       return  $.post('/class/asignClassroom',{name:className},function(response){
            return response
        })
    }

    async deleteTripFromDB(tripName, userName){
        return  $.post('/tripdelete',{name :tripName, teacher:userName},function(response){
            return response
        })
    }

    async emergencySituation(emergencyText, userName){
        return await $.post('/sos',{emergencyText, userName},function(response){
            return response
        })
    }
    
    async addStudentToDB(student){ 
        return $.post('/Student',student,function(response){
            return response
        })
    }

    async addNewTripToDb(trip){
        return $.post('/trip',trip,function(response){
            return response
        })
    }

    async checkUser(user){
        return $.post(`/user`,user,function(response){
            return response
        })
    }

    async loadClassRooms(){
        return $.get('/classRooms',function(response){
            return response
        })
    }

    
    async addTeacherToDb(teacher){
        return $.post('/addteacher', teacher,function(response){
            return response
        })   
    }

    async addNewPost(post, email){
        return  $.post('/postText',{post, email},function(response){
            return response
        })
    }

    async loadPosts(email){
        return  $.get('/post',email,function(response){
            return response
        })
    }
}

const model = new Model()
