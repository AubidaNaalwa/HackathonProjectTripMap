
const addingPost = function(){
    const post = $('#postText').val()
    
    if(post==''){
        alert("Write A Post")
    }
    else
    //adding the text to location of the student + adding the post to DB (posts)
    console.log("adding post ")
    model.addNewPost(post)
}