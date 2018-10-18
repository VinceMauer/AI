var age = document.querySelector("h2.age");
var gender = document.querySelector("h2.gender");
var emotionmax = document.querySelector("h2.emotion-max");
var selectCover = document.querySelector('img.cover');
var suggestButton = document.querySelector('.suggest');
var resultHeader = document.querySelector(".movie-result");
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
                var angerMoviesArray = [jsonObj[2], jsonObj[7], jsonObj[10]];
                var happinessMoviesArray = [jsonObj[5], jsonObj[3], jsonObj[11]];
                var disgustMoviesArray = [jsonObj[1], jsonObj[8], jsonObj[9]];
                var contemptMoviesArray = [jsonObj[10], jsonObj[7], jsonObj[3]];
                var sadnessMoviesArray = [jsonObj[4], jsonObj[0], jsonObj[5]];

                var film1 = {cover:"https://fesapusewebsite.blob.core.windows.net/fathom/castleinthesky-1000x1480-r3-f6aba65dfc41c4fc47fc9289c1674057.jpg"};
                var film2 = {cover:"http://www.gablescinema.com/media/filmassets/Grave_of_the_Fireflies_Poster.jpg.500x715_q85_crop-smart.jpg"};
                var film3 = {cover:"https://fesapusewebsite.blob.core.windows.net/fathom/totoro-eventposter-24729b7943d6fce9198fcb8af5b602b3.jpg"};
                var film4 = {cover:"https://i.pinimg.com/originals/9f/b5/a4/9fb5a43fe303b14e140ca4276d28091e.jpg"};
                var film5 = {cover:"https://d3fa68hw0m2vcc.cloudfront.net/814/102017248.jpeg"};
                var film6 = {cover:"https://uvmbored.com/wp-content/uploads/2018/05/porcorosso-1000x1480-r2-4f67caff60f8deda5ff0bf39bc430f67.jpg"};
                var film7 = {cover:"https://s.s-bol.com/imgbase0/imagebase3/large/FC/5/0/0/7/1002004004607005.jpg"};
                var film8 = {cover:"https://images-na.ssl-images-amazon.com/images/I/91k9zjN55iL._SY445_.jpg"};
                var film9 = {cover:"https://fesapusewebsite.blob.core.windows.net/fathom/princessmononoke-1000x1480-r5-468f9dd25a9f87a92d72c6c1ac3ca1ff.jpg"};
                var film10 = {cover:"https://vignette.wikia.nocookie.net/dubbing9585/images/f/fa/My-neighbors-the-yamadas-poster.jpg/revision/latest?cb=20171223052252"};
                var film11 = {cover:"https://fesapusewebsite.blob.core.windows.net/fathom/spiritedaway-1000x1480-r2-81ce56a4d406c5cc5bf5a9bb50a2772b.jpg"};
                var film12 = {cover:"https://prodimage.images-bn.com/pimages/0826663181593_p0_v1_s550x406.jpg"};
                //
                function merge(objSrc, objTarget){
                 return Object.keys(objTarget).reduce(function(src, prop){
                   if(!src.hasOwnProperty(prop)) src[prop] = objTarget[prop];
                   return src;
                 }, objSrc);
                }
                //
                merge(jsonObj[0], film1);
                merge(jsonObj[1], film2);
                merge(jsonObj[2], film3);
                merge(jsonObj[3], film4);
                merge(jsonObj[4], film5);
                merge(jsonObj[5], film6);
                merge(jsonObj[6], film7);
                merge(jsonObj[7], film8);
                merge(jsonObj[8], film9);
                merge(jsonObj[9], film10);
                merge(jsonObj[10], film11);
                merge(jsonObj[11], film12);

                // console.log(jsonObj[3]);
                document.querySelector("#sourceImage").style.border = "5px solid white";
                document.querySelector("#sourceImage").style.outline = "5px solid #1abc9c";
resultHeader.textContent = "Movie you'd like: "

                if(emotionmax.textContent == "neutral" && age.textContent > "18" ) {
                  // console.log("neutral bitch");
                  document.body.style.backgroundImage = "linear-gradient( 45deg, #355c7d, #6c5b7b, #c06c84)";


                  var randomNeutral = neutralMoviesArray[Math.floor(neutralMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomNeutral["title"];
                  descriptionofmovie.textContent = randomNeutral["description"];
                  directorofmovie.textContent = "Director: "+ randomNeutral["director"];
                  releasedateofmovie.textContent = randomNeutral["release_date"];
                  // loadMore.setAttribute('class', 'more');
                  selectCover.src = randomNeutral["cover"];
                  suggestButton.style.display = "block";
                }  else if (emotionmax.textContent == "anger") {
                  // console.log("angry bitch");
                  document.body.style.backgroundImage = "linear-gradient( 45deg, #333333, #dd1818)";

                  var randomAnger = angerMoviesArray[Math.floor(angerMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomAnger["title"];
                  descriptionofmovie.textContent = randomAnger["description"];
                  directorofmovie.textContent = "Director: "+randomAnger["director"];
                  releasedateofmovie.textContent = randomAnger["release_date"];
                  selectCover.src = randomAnger["cover"];
                } else if (emotionmax.textContent == "happiness") {

                  document.body.style.backgroundImage = "linear-gradient( 45deg, #36d1dc, #5b86e5)";

                  var randomHappiness = happinessMoviesArray[Math.floor(happinessMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomHappiness["title"];
                  descriptionofmovie.textContent = randomHappiness["description"];
                  directorofmovie.textContent = "Director: "+randomHappiness["director"];
                  releasedateofmovie.textContent = randomHappiness["release_date"];
                  selectCover.src = randomHappiness["cover"];
                } else if (emotionmax.textContent == "contempt") {
                  // console.log("contempt bitch");
                  document.body.style.backgroundImage = "linear-gradient( 45deg, #20002c, #cbb4d4)";

                  var randomContempt = contemptMoviesArray[Math.floor(contemptMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomContempt["title"];
                  descriptionofmovie.textContent = randomContempt["description"];
                  directorofmovie.textContent = "Director: "+ randomContempt["director"];
                  releasedateofmovie.textContent = randomContempt["release_date"];
                  selectCover.src = randomContempt["cover"];
                } else if (emotionmax.textContent == "disgust") {
                  // console.log("disgust bitch");
                  document.body.style.backgroundImage = "linear-gradient( -135deg, #a80077, #66ff00)";

                  var randomDisgust = disgustMoviesArray[Math.floor(disgustMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomDisgust["title"];
                  descriptionofmovie.textContent = randomDisgust["description"];
                  directorofmovie.textContent = "Director: "+randomDisgust["director"];
                  releasedateofmovie.textContent = randomDisgust["release_date"];
                  selectCover.src = randomDisgust["cover"];
                } else if (emotionmax.textContent == "sadness") {

                  document.body.style.backgroundImage = "linear-gradient( 45deg, #360033, #0b8793)";

                  var randomSadness = sadnessMoviesArray[Math.floor(sadnessMoviesArray.length * Math.random())];

                  titleofmovie.textContent = randomSadness["title"];
                  descriptionofmovie.textContent = randomSadness["description"];
                  directorofmovie.textContent = "Director: "+randomSadness["director"];
                  releasedateofmovie.textContent = randomSadness["release_date"];
                  selectCover.src = randomSadness["cover"];
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
