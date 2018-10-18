var age = document.querySelector("h2.age");
var gender = document.querySelector("h2.gender");
var emotionmax = document.querySelector("h2.emotion-max");

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

            if(emotionmax.textContent == "neutral") {
              console.log("neutral bitch");
            }  else if (emotionmax.textContent == "anger") {
              console.log("angry bitch");
            } else if (emotionmax.textContent == "hapiness") {
              console.log("happy bitch");
            } else if (emotionmax.textContent == "contempt") {
              console.log("contempt bitch");
            } else if (emotionmax.textContent == "disgust") {
              console.log("disgust bitch");
            } else if (emotionmax.textContent == "sadness") {
              console.log("sadness bitch");
            }


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

        console.log()
    }
