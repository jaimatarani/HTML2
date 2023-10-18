//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyB8PVAyjuQqn7asgq0LTjybxM7FNh3VAYc",
      authDomain: "classtest-da8c0.firebaseapp.com",
      databaseURL: "https://classtest-da8c0-default-rtdb.firebaseio.com",
      projectId: "classtest-da8c0",
      storageBucket: "classtest-da8c0.appspot.com",
      messagingSenderId: "126601634333",
      appId: "1:126601634333:web:b5dc32a12c6625e50a5cf4",
      measurementId: "G-CTTQL66YXH"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "</h4>";
                        message_with_tag = "<h4> class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + "value=" + like + "onclick='updateLike(this.id)>Likes :" + like + "</button>";
                        row = name_with_tag + message_with_tag + like_button;
                        document.getElementById("output").innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();
function updateLike(message_id) {
      console.log("clicked on like button -" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).ariaValueMax;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name")
      window.location.replace("index.html");
}


function send() {

      msg = document.getElementById("msg").value;
      firebase.database().ref(Room_Name).push({
            Name: user_Name,
            message: msg,
            likr: 0
      });


      document.getElementById("msg").value = "";

}