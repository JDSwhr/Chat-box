
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
document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";

function addRoom(){
  room_name=document.getElementById("room_name").value;
 firebase.database().ref("/").child("room_name").update({
       purpose:"adding room name"
 });
 localStorage.setItem("room_name",room_name);
 window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("roomname-"+Room_names);
      row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
      document.getElementById("output").innerHTML+=row;


      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}