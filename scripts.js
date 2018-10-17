var dataURL;
(function () {
    // The width and height of the captured photo. We will set the
    // width to the value defined here, but the height will be
    // calculated based on the aspect ratio of the input stream.
    var width = 320; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream
    // |streaming| indicates whether or not we're currently streaming
    // video from the camera. Obviously, we start at false.
    var streaming = false;
    // The various HTML elements we need to configure or control. These
    // will be set by the startup() function.
    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({
            video: true
            , audio: false
        }, function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            }
            else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        }, function (err) {
            console.log("An error occured! " + err);
        });
        video.addEventListener('canplay', function (ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);
                // Firefox currently has a bug where the height can't be read from
                // the video, so we will make assumptions if this happens.
                if (isNaN(height)) {
                    height = width / (4 / 3);
                }
                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);
        startbutton.addEventListener('click', function (ev) {
            takepicture();
            makeblob();
            ev.preventDefault();
        }, false);
        clearphoto();
    }
    // Fill the photo with an indication that none has been
    // captured.
    function clearphoto() {
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL('image/png');
        photo.setAttribute('src', dataURL);
    }
    // Capture a photo by fetching the current contents of the video
    // and drawing it into a canvas, then converting that to a PNG
    // format data URL. By drawing it on an offscreen canvas and then
    // drawing that to the screen, we can change its size and/or apply
    // other changes before drawing it.
    function takepicture() {
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var dataURL = canvas.toDataURL('image/png');
            photo.setAttribute('src', dataURL);
        }
        else {
            clearphoto();
        }
    }
    // Set up our event listener to run the startup process
    // once loading is complete.
    window.addEventListener('load', startup, false);
})();

function processImage() {
    function makeblob(dataURL) {
        var BASE64_MARKER = ';base64,';
        if (dataURL.indexOf(BASE64_MARKER) == -1) {
            var parts = dataURL.split(',');
            var contentType = parts[0].split(':')[1];
            var raw = decodeURIComponent(parts[1]);
            return new Blob([raw], {
                type: contentType
            });
        }
        var parts = dataURL.split(BASE64_MARKER);
        var contentType = parts[0].split(':')[1];
        var raw = window.atob(parts[1]);
        var rawLength = raw.length;
        var uInt8Array = new Uint8Array(rawLength);
        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    }
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
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    // Request parameters.
    var params = {
        "returnFaceId": "true"
        , "returnFaceLandmarks": "false"
        , "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion," + "hair,makeup,occlusion,accessories,blur,exposure,noise"
    };
    // Display the image.
    var sourceImageUrl = document.getElementById("photo").src;
    document.querySelector("#sourceImage").src = sourceImageUrl;
    // Perform the REST API call.
    $.ajax({
        url: uriBase + "?" + $.param(params), // Request headers.
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Content-Type", "application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        }
        , type: 'POST'
        , processData: false
        , contentType: 'application/octet-stream'
        , body: makeblob(dataURL)
    }).done(function (data) {
        // Show formatted JSON on webpage.
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Display error message.
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ? jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
        alert(errorString);
    });
