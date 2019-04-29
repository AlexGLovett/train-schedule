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


dataRef.ref().on("child_added", function (childSnapshot) {

  var firstTimeConverted = moment(childSnapshot.val().first_train, "hh:mm").subtract(1, "day");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % childSnapshot.val().train_frequency;
  var tMinutesTillTrain = childSnapshot.val().train_frequency - tRemainder;

  var row = $("<tr>");
  $("<td>").text(childSnapshot.val().train_name).appendTo(row);
  $("<td>").text(childSnapshot.val().train_destination).appendTo(row);
  $("<td>").text(childSnapshot.val().train_frequency).appendTo(row);
  $("<td>").text(moment().add(tMinutesTillTrain, "minutes").format("hh:mm")).appendTo(row);
  $("<td>").text(tMinutesTillTrain).appendTo(row);
  row.appendTo("#tbody");

}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



$(document).on("click", "#add-user", function (event) {
  AddRow(event);
});

function AddRow(event) {

  event.preventDefault();

  ValidateInputs();
}

function ValidateInputs() {
  var a = $("#name-input").val();
  var b = $("#destination-input").val();
  var c = $("#freq-input").val();
  var d = $("#time-input").val();
  if (a == "") alert("Please add a name for your train.");
  if (b == "") alert("Please add a name for your train's destination.");
  if (c == "") alert("Please add a frequency of arrival for your train.")
  else if (isNaN(c)) alert("Please ensure your frequency is a number in minutes. Use the number incrementer in the input box, or type in a numeric value [Ex: 1, 2, 3]")
  else if (c <= 0) alert("Please ensure your frequency is a positive number greater than zero.");
  if (d == "") alert("Please add a time of first arrival for your train.")
  else if (isNaN(d)) alert("Please ensure your first arrival time is a number in Military Time units. [Ex: 0000-2359]")
  else if (d < 0 || d >= 2400) alert("Please ensure your time of first arrival is a positive number greater than or equal to 0 and less than 2400 [Midnight = 0000]");
  if (a != "" && b != "" && c != "" && d != "" && isNaN(c) === false && c > 0 && isNaN(d) === false && d >= 0 && d < 2359) {
    console.log("Adding Train: " + a);
    dataRef.ref().push({
      train_name: $("#name-input").val(),
      train_destination: $("#destination-input").val(),
      train_frequency: $("#freq-input").val(),
      first_train: $("#time-input").val(),
    });
  }
}