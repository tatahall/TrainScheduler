console.log("I'm a goddess")

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyA8D0xL8DLPWJo-hoBdaNcMNZm11026RUA",
  authDomain: "trainscheduler-8b89a.firebaseapp.com",
  databaseURL: "https://trainscheduler-8b89a.firebaseio.com",
  projectId: "trainscheduler-8b89a",
  storageBucket: "",
  messagingSenderId: "827410912174",
  appId: "1:827410912174:web:b20f09d46b376452696e3f"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();
  // Get user input
  let trainName = $("#train-name-input").val().trim();
  let destination = $("#destination-input").val().trim();
  let firstTrain = $("#time-input").val().trim();
  let frequency = $("#minute-input").val().trim();
  
    // Creates local "temporary" object for holding train data
  newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrain);
  console.log(newTrain.frequency);

  alert(newTrain.name + " has been added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#minute-input").val("");

  return false;
});

let newFirstTrain;
let difference;
let remainder;
let minutesToArrival;
let nextArrival;
let currentTime;
let firstTrainCon;
// 3. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  let trainName = childSnapshot.val().name;
  let destination = childSnapshot.val().destination;
  let firstTrain = childSnapshot.val().firstTrain;
  let frequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  //create a variable to get the current time using momement.js.
 currentTime = moment().format("HH:mm");

 firstTrain = 0;
  
  //first train arrival
  firstTrainCon = moment(firstTrain, "HH:mm").subtract(1, "years");

  
  /*//change format of time for first train
  newFirstTrain = moment.unix(firstTrainCon).format("hh:mm");*/

  //need the time between times
  difference = moment().diff(moment(firstTrainCon), "minutes");

  //time apart between trains
  remainder = difference % frequency;

  //minutes to arrival
  minutesToArrival = frequency - remainder;

  //next train arrival
  nextArrival = moment().add(minutesToArrival, "minutes").format("hh:mm");

  // Create the new row.
  let newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(newFirstTrain),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesToArrival),

  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

