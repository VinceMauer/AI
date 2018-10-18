var age = document.querySelector("h2.age");
var gender = document.querySelector("h2.gender");
var emotionmax = document.querySelector("h2.emotion-max");
var selectCover = document.querySelector('img.cover');

var titleofmovie = document.querySelector(".movie-title");
var descriptionofmovie = document.querySelector(".movie-description");
var directorofmovie = document.querySelector(".movie-director");
var releasedateofmovie = document.querySelector(".movie-releasedate");


// var requestURL = "https://api.themoviedb.org/3/movie/76341?api_key=bf3a9791e387b162ce2e5dbad7d6a36a";
var requestURL = "https://ghibliapi.herokuapp.com/films";

var request = new XMLHttpRequest();

// request.open('GET', requestURL);
// request.responseType = 'json';
// setTimeout(function(){
//     request.send();
//     request.onload = function() {
//     var jsonObj = request.response;
//     console.log(jsonObj);
//     console.log(jsonObj[0].title);
//
//
//     };
// },1);

//******************Load state******************

var checkLoad = setInterval(function(){
    console.log(request.status);
    if (request.status === 200) {
        console.log('Load complete...');
        clearInterval(checkLoad);
    }
},10);

function processImage() {
        // Replace <Subscription Key> with your valid subscription key.
        var subscriptionKey = "fc5a37bf5de84e4eb6281fc8e6f4595e";

        // NOTE: You must use the same region in your REST call as you used to
        // obtain your subscription keys. For example, if you obtained your
        // subscription keys from westus, replace "westcentralus" in the URL
        // below with "westus".
        //
        // Free trial subscription keys are generated in the westcentralus region.
        // If you use a free trial subscription key, you shouldn't need to change
        // this region.
        var uriBase =
            "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes":
                "age,gender,headPose,smile,facialHair,glasses,emotion," +
                "hair,makeup,occlusion,accessories,blur,exposure,noise"
        };

        // Display the image.
        var sourceImageUrl = document.getElementById("inputImage").value;
        document.querySelector("#sourceImage").src = sourceImageUrl;

        // Perform the REST API call.
        $.ajax({
            url: uriBase + "?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {
            // Show formatted JSON on webpage.


            $("#responseTextArea").val(JSON.stringify(data, null, 2));






            gender.textContent = data[0].faceAttributes.gender;
            age.textContent = data[0].faceAttributes.age;

            var emotionsarray = [data[0].faceAttributes.emotion["anger"], data[0].faceAttributes.emotion["happiness"], data[0].faceAttributes.emotion["neutral"], data[0].faceAttributes.emotion["contempt"], data[0].faceAttributes.emotion["disgust"], data[0].faceAttributes.emotion["sadness"]];
            var namearray = {anger: emotionsarray[0], happy: emotionsarray[1], neutral: emotionsarray[2], contempt: emotionsarray[3], disgust: emotionsarray[4], sadness: emotionsarray[5]};

            function findMax(namearray){
              var keys = Object.keys(namearray);
              var max = keys[0];
              for (var i = 1, n = keys.length; i < n; ++i) {
                var k = keys[i];
                if (namearray[k] > namearray[max]) {
                  max = k;
                }
              }
              return max;
            }

            emotionmax.textContent = findMax(namearray);
            console.log(findMax(namearray));



            // request
            request.open('GET', requestURL);
            request.responseType = 'json';
            setTimeout(function(){
                request.send();
                request.onload = function() {
                var jsonObj = request.response;
                console.log(jsonObj);

                var neutralMoviesArray = [jsonObj[0], jsonObj[4], jsonObj[6]];
                var angerMoviesArray = [jsonObj[2], jsonObj[7], jsonObj[12]];
                var happinessMoviesArray = [jsonObj[5], jsonObj[3], jsonObj[11]];
                var disgustMoviesArray = [jsonObj[1], jsonObj[8], jsonObj[9]];
                var contemptMoviesArray = [jsonObj[10], jsonObj[7], jsonObj[3]];
                var sadnessMoviesArray = [jsonObj[4], jsonObj[0], jsonObj[5]];

                var film1 = {cover:"https://fesapusewebsite.blob.core.windows.net/fathom/castleinthesky-1000x1480-r3-f6aba65dfc41c4fc47fc9289c1674057.jpg"};
                // var film2 = {mood:"anger", age:"18", gender:"male"};
                // var film3 = {mood:"contempt", age:"18", gender:"female"};
                // var film4 = {mood:"happiness", age:"18", gender:"male"};
                // var film5 = {mood:"sadness", age:"18", gender:"female"};
                // var film6 = {mood:"disgust", age:"18", gender:"male"};
                // var film7 = {mood:"anger", age:"18", gender:"female"};
                // var film8 = {mood:"contempt", age:"18", gender:"male"};
                // var film9 = {mood:"anger", age:"18", gender:"male"};
                // var film10 = {mood:"neutral", age:"18", gender:"male"};
                // var film11 = {mood:"neutral", age:"0", gender:"female"};
                // var film12 = {mood:"hapiness", age:"0", gender:"male"};
                //
                function merge(objSrc, objTarget){
                 return Object.keys(objTarget).reduce(function(src, prop){
                   if(!src.hasOwnProperty(prop)) src[prop] = objTarget[prop];
                   return src;
                 }, objSrc);
                }
                //
                merge(jsonObj[0], film1);
                // merge(jsonObj[1], film2);
                // merge(jsonObj[2], film3);
                // merge(jsonObj[3], film4);
                // merge(jsonObj[4], film5);
                // merge(jsonObj[5], film6);
                // merge(jsonObj[6], film7);
                // merge(jsonObj[7], film8);
                // merge(jsonObj[8], film9);
                // merge(jsonObj[9], film10);
                // merge(jsonObj[10], film11);
                // merge(jsonObj[11], film12);
                //
                // console.log(jsonObj[3]);


                if(emotionmax.textContent == "neutral" && age.textContent > "18" ) {
                  // console.log("neutral bitch");
                  document.querySelector("body").style.color = "grey";

                  var randomNeutral = neutralMoviesArray[Math.floor(neutralMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomNeutral["title"];
                  descriptionofmovie.textContent = randomNeutral["description"];
                  directorofmovie.textContent = randomNeutral["director"];
                  releasedateofmovie.textContent = randomNeutral["release_date"];
                  // loadMore.setAttribute('class', 'more');
                  selectCover.src = randomNeutral["cover"];
                }  else if (emotionmax.textContent == "anger") {
                  // console.log("angry bitch");
                  document.querySelector("body").style.color = "red";

                  var randomAnger = angerMoviesArray[Math.floor(angerMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomAnger["title"];
                  descriptionofmovie.textContent = randomAnger["description"];
                  directorofmovie.textContent = randomAnger["director"];
                  releasedateofmovie.textContent = randomAnger["release_date"];
                } else if (emotionmax.textContent == "happiness") {
                  // console.log("happy bitch");
                  var randomHappiness = happinessMoviesArray[Math.floor(happinessMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomHappiness["title"];
                  descriptionofmovie.textContent = randomHappiness["description"];
                  directorofmovie.textContent = randomHappiness["director"];
                  releasedateofmovie.textContent = randomHappiness["release_date"];
                } else if (emotionmax.textContent == "contempt") {
                  // console.log("contempt bitch");
                  var randomContempt = contemptMoviesArray[Math.floor(contemptMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomContempt["title"];
                  descriptionofmovie.textContent = randomContempt["description"];
                  directorofmovie.textContent = randomContempt["director"];
                  releasedateofmovie.textContent = randomContempt["release_date"];
                } else if (emotionmax.textContent == "disgust") {
                  // console.log("disgust bitch");
                  var randomDisgust = disgustMoviesArray[Math.floor(disgustMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomDisgust["title"];
                  descriptionofmovie.textContent = randomDisgust["description"];
                  directorofmovie.textContent = randomDisgust["director"];
                  releasedateofmovie.textContent = randomDisgust["release_date"];
                } else if (emotionmax.textContent == "sadness") {
                  // console.log("sadness bitch");
                  var randomSadness = sadnessMoviesArray[Math.floor(sadnessMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomSadness["title"];
                  descriptionofmovie.textContent = randomSadness["description"];
                  directorofmovie.textContent = randomSadness["director"];
                  releasedateofmovie.textContent = randomSadness["release_date"];
                }

                };
            },1);



        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

    }
