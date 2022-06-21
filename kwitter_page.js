
var firebaseConfig = {
      apiKey: "AIzaSyDoxkZucHYMQ5bq5UEN1QWIKsUzH1u1d2w",
      authDomain: "kwitter-b573a.firebaseapp.com",
      databaseURL: "https://kwitter-b573a-default-rtdb.firebaseio.com",
      projectId: "kwitter-b573a",
      storageBucket: "kwitter-b573a.appspot.com",
      messagingSenderId: "675223595815",
      appId: "1:675223595815:web:8b36d6837e0173420b1702"
    };
    firebase.initializeApp(firebaseConfig);
 user_name=localStorage.getItem("user_name");
 room_name=localStorage.getItem("room_name");

 function send(){
       msg=document.getElementById("msg").value;
       firebase.database().ref(room_name).push({
             Name:user_name,
             Message:msg,
             Like:0
       });
       document.getElementById("msg").value="";
 }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         name=message_data['Name'];
         message=message_data['Message'];
         like=message_data['Like'];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like:"+like+"</span></button><hr>";
         row=name_with_tag+message_with_tag+like_button+span_with_tag;
         document.getElementById("output").innerHTML+=row;


      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button :"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like:update_likes

      });
}
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}