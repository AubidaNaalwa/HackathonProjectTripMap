let checkUserAndAccess
const signIn = async function(){
   console.log("loging in")
   const username=$("#user").val()
   const password=$("#pass").val()
   const user = {username, password}
   console.log(user)
   localStorage.setItem('username', username)
   localStorage.setItem('isLoggedIn', 1)

   checkUserAndAccess = await model.checkUser(user)

   console.log(checkUserAndAccess)

   if(checkUserAndAccess.access == 0){
      renderer.loadteacherPage()
      loadPage([], [])
      console.log("teacher")
   }
   
  else if(checkUserAndAccess.access==1){
      renderer.loadstudentPage()
      loadPage([], [])
      console.log("student")
   }
   else console.log("fuckoff")
}  



