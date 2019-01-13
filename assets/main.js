var config = {
    apiKey: "AIzaSyBiLAWZx_3VW0xrTNvoN_z_fZ8Osr-n2_Y",
    authDomain: "trainscheduler-f32ab.firebaseapp.com",
    databaseURL: "https://trainscheduler-f32ab.firebaseio.com",
    projectId: "trainscheduler-f32ab",
    storageBucket: "",
    messagingSenderId: "120928507471"
  };
  
  firebase.initializeApp(config);
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  var trainName = "";
  var destination = "";
  var frequency = "";
  var firstArrival = "";
  
  
  $("#addTrain").on("click", function () {
    event.preventDefault();
    trainName = $("#train-name").val().trim();
    destination = $("#train-dest").val().trim();
    frequency = $("#train-freq").val().trim();
    firstArrival = $("#train-time").val().trim();
  
    var newTrain = {
      trainName: trainName,
      destination: destination,
      firstArrival: firstArrival,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
  
    database.ref().push(newTrain);
  
    // console.log(newTrain.trainName);
    // console.log(newTrain.destination);
    // console.log(newTrain.firstArrival);
    // console.log(newTrain.frequency);
  
    $("#train-name").val("");
    $("#train-dest").val("");
    $("#train-time").val("");
    $("#train-freq").val("");
  
  
  
  })
  firebase.database().ref().on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());
  
    var tName = childSnapshot.val().trainName;
    var tDest = childSnapshot.val().destination;
    var tArrival = childSnapshot.val().firstArrival;
    var tFreq = childSnapshot.val().frequency;
  
    // console.log(tName,tDest,tArrival,tFreq);
  
    var tFrequency = tFreq;
    // frequency
    var firstTime = tArrival;
  // firstArrival
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    // console.log(firstTimeConverted);
  
    var currentTime = moment();
    // console.log("current time: " + moment(currentTime).format("hh:mm"));
  
    var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
    // console.log("Difference in Time:" + diffTime);
  
    var tRemainder = diffTime % tFrequency;
    // console.log("Remaining Minutes" + tRemainder);
  
    var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("Minutes Till Train: " + tMinutesTillTrain);
  
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm A");
    // console.log("Arrival Time: " + moment(nextTrain).format("hh:mm"));
  
      $("#train-table > tbody").append("<tr><td>" + tName + "</td><td>" +
      tDest + "</td><td>" + tFreq + "</td><td>" + nextTrain + "</td><td>" +
      tMinutesTillTrain + "</td>");
      
  
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
  
  