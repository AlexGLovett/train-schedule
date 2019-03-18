// Initialize Firebase
var config = {
    apiKey: "AIzaSyC05YBgl1S8mnyHhHYzC9l-WZd4k_gRpeQ",
    authDomain: "train-tracker-273e4.firebaseapp.com",
    databaseURL: "https://train-tracker-273e4.firebaseio.com",
    projectId: "train-tracker-273e4",
    storageBucket: "train-tracker-273e4.appspot.com",
    messagingSenderId: "899746228875"
  };
  firebase.initializeApp(config);
  var dataRef = firebase.database();

  dataRef.ref().on("child_added", function(childSnapshot) {

    var firstTimeConverted = moment(childSnapshot.val().first_train,"hh:mm").subtract(1, "day");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % childSnapshot.val().train_frequency;
    var tMinutesTillTrain = childSnapshot.val().train_frequency - tRemainder;

    var row = $("<tr>");
    $("<td>").text(childSnapshot.val().train_name).appendTo(row);
    $("<td>").text(childSnapshot.val().train_destination).appendTo(row);
    $("<td>").text(childSnapshot.val().train_frequency).appendTo(row);
    $("<td>").text(moment().add(tMinutesTillTrain,"minutes").format("hh:mm")).appendTo(row);
    $("<td>").text(tMinutesTillTrain).appendTo(row);
    row.appendTo("#tbody");

   }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
   });



$(document).on("click", "#add-user", function(event){
    AddRow(event);
});

function AddRow(event){

    event.preventDefault();

    dataRef.ref().push({
        train_name: $("#name-input").val(),
        train_destination: $("#destination-input").val(),
        train_frequency: $("#freq-input").val(),
        first_train: $("#time-input").val(),
      });

}

