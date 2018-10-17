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
            emotionmax.textContent = data[0].faceAttributes.emotion;
            console.log(data[0].faceAttributes.age);

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
    };

    // request.onload = function() {
    // var jsonObj = request.response;
    // console.log(jsonObj);
    //
    // showJson(jsonObj);
    //
    // function showJson(){
    //   var h1 = document.createElement('h1');
    //   h1.textContent = request.response.faceId;
    // }
