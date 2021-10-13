document.getElementById("chuckButton").onclick = function() {
  const url = "http://api.icndb.com/jokes/random?exclude=[explicit]";
  console.log(url);
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      console.log(json);
      results += "<h1>" + json.value.joke;
      results += "</h1>";
      document.getElementById("chuckJoke").innerHTML = results;
    });
};
