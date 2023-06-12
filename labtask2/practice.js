console.log("Clicked");
function func() {
  var result = document.getElementById("result");
  result.innerHTML = "Button Clicked";
}

function buttonAction() {
  var name = document.getElementById("name");
  var reges = document.getElementById("registration");
  var btch = document.getElementById("batch");
  var mail = document.getElementById("email");
  var no = document.getElementById("number");

  if (name.value && reges.value && btch.value && mail.value && no.value) {
    alert("Login successfull");
  } else {
    alert("Please enter full form");
  }
}
