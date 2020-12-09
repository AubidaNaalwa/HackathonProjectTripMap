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

    loadLogInPage(){
        $('.login-wrap').css('display','block')
        $('#teacher').css('display','none')
        $('#options').empty()
    }
    
    loadstudentPage(){
        this.templateOptionRender(true)
    }

    loadteacherPage(){
        this.templateOptionRender(false)
    }
    templateOptionRender(flag){
        $('.login-wrap').css('display','none')
        $('#teacher').css('display','block')
        const source = $('#options-template').html();
        const template = Handlebars.compile(source);
        let newHTML = template({flag});
        $('#options').empty().append(newHTML);
    }
    
}