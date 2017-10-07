/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		document.getElementById("setLocalStorage").addEventListener("click", setLocalStorage);
		document.getElementById("showLocalStorage").addEventListener("click", showLocalStorage); 
		document.getElementById("removeProjectFromLocalStorage").addEventListener("click", removeProjectFromLocalStorage);
		document.getElementById("getLocalStorageByKey").addEventListener("click", getLocalStorageByKey); 
		var localStorage = window.localStorage;
		document.addEventListener("volumeupbutton", callbackFunction, false);		
		document.addEventListener("backbutton", onBackKeyDown, false);		
        window.addEventListener("batterystatus", onBatteryStatus, false); 
		document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture); 
		document.getElementById("cameraGetPicture").addEventListener("click", cameraGetPicture); 
		document.getElementById("createContact").addEventListener("click", createContact);
		document.getElementById("findContact").addEventListener("click", findContact);
		document.getElementById("deleteContact").addEventListener("click", deleteContact);
		document.getElementById("cordovaDevice").addEventListener("click", cordovaDevice);
		document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
		document.getElementById("watchAcceleration").addEventListener("click", watchAcceleration);
		document.getElementById("getOrientation").addEventListener("click", getOrientation);
		document.getElementById("watchOrientation").addEventListener("click", watchOrientation);
		document.getElementById("dialogAlert").addEventListener("click", dialogAlert);
		document.getElementById("dialogConfirm").addEventListener("click", dialogConfirm);
		document.getElementById("dialogPrompt").addEventListener("click", dialogPrompt);
		document.getElementById("dialogBeep").addEventListener("click", dialogBeep);	
		document.getElementById("createFile").addEventListener("click", createFile);
		document.getElementById("writeFile").addEventListener("click", writeFile);
		document.getElementById("readFile").addEventListener("click", readFile);
		document.getElementById("removeFile").addEventListener("click", removeFile);
		document.getElementById("getLanguage").addEventListener("click", getLanguage);
		document.getElementById("getLocaleName").addEventListener("click", getLocaleName);
		document.getElementById("getDate").addEventListener("click", getDate);
		document.getElementById("getCurrency").addEventListener("click", getCurrency);  
        document.getElementById("playAudio").addEventListener("click", playAudio);
		document.getElementById("pauseAudio").addEventListener("click", pauseAudio);
		document.getElementById("stopAudio").addEventListener("click", stopAudio);
		document.getElementById("volumeUp").addEventListener("click", volumeUp);
		document.getElementById("volumeDown").addEventListener("click", volumeDown);
        document.getElementById("audioCapture").addEventListener("click", audioCapture);
		document.getElementById("imageCapture").addEventListener("click", imageCapture);
		document.getElementById("videoCapture").addEventListener("click", videoCapture);
		document.getElementById("networkInfo").addEventListener("click", networkInfo);
		document.addEventListener("offline", onOffline, false);
		document.addEventListener("online", onOnline, false);
		document.getElementById("vibration").addEventListener("click", vibration);
		document.getElementById("vibrationPattern").addEventListener("click", vibrationPattern);		
		
		
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
function setLocalStorage() { 
   localStorage.setItem("Name", "John"); 
   localStorage.setItem("Job", "Developer"); 
   localStorage.setItem("Project", "Cordova Project"); 
} 

function showLocalStorage() { 
   console.log(localStorage.getItem("Name")); 
   console.log(localStorage.getItem("Job")); 
   console.log(localStorage.getItem("Project")); 
} 

function removeProjectFromLocalStorage() {
   localStorage.removeItem("Project");
}

function getLocalStorageByKey() {
   console.log(localStorage.key(0));
}

function callbackFunction() {alert('Volume Up Button is pressed!');}

function onBackKeyDown(e) { 
   e.preventDefault(); 
   alert('Back Button is Pressed!'); 
}

function onBatteryStatus(info) { 
   alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged); 
}

function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50, 
      destinationType: Camera.DestinationType.DATA_URL 
   });  
   
   function onSuccess(imageData) { 
      var image = document.getElementById('myImage'); 
      image.src = "data:image/jpeg;base64," + imageData; 
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}

function cameraGetPicture() {
   navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
   });

   function onSuccess(imageURL) {
      var image = document.getElementById('myImage');
      image.src = imageURL;
   }

   function onFail(message) {
      alert('Failed because: ' + message);
   }

}

function createContact() {
   var myContact = navigator.contacts.create({"displayName": "Test User"});
   myContact.save(contactSuccess, contactError);
    
   function contactSuccess() {
      alert("Contact is saved!");
   }
	
   function contactError(message) {
      alert('Failed because: ' + message);
   }
	
}

function findContacts() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);
    
   function contactfindSuccess(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         alert("Display Name = " + contacts[i].displayName);
      }
   }
	
   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
	
}

function deleteContact() {
   var options = new ContactFindOptions();
   options.filter = "Test User";
   options.multiple = false;
   fields = ["displayName"];
   navigator.contacts.find(fields, contactfindSuccess, contactfindError, options);

   function contactfindSuccess(contacts) {
      var contact = contacts[0];
      contact.remove(contactRemoveSuccess, contactRemoveError);

      function contactRemoveSuccess(contact) {
         alert("Contact Deleted");
      }

      function contactRemoveError(message) {
         alert('Failed because: ' + message);
      }
   }

   function contactfindError(message) {
      alert('Failed because: ' + message);
   }
	
}

function cordovaDevice() {
   alert("Cordova version: " + device.cordova + "\n" +
      "Device model: " + device.model + "\n" +
      "Device platform: " + device.platform + "\n" +
      "Device UUID: " + device.uuid + "\n" +
      "Device version: " + device.version);
}

function getAcceleration() {
   navigator.accelerometer.getCurrentAcceleration(
      accelerometerSuccess, accelerometerError);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');
   };

   function accelerometerError() {
      alert('onError!');
   };
}

function watchAcceleration() {
   var accelerometerOptions = {
      frequency: 3000
   }
   var watchID = navigator.accelerometer.watchAcceleration(
      accelerometerSuccess, accelerometerError, accelerometerOptions);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');

      setTimeout(function() {
         navigator.accelerometer.clearWatch(watchID);
      }, 10000);
   };

   function accelerometerError() {
      alert('onError!');
   };
	
}

function getOrientation() {
   navigator.compass.getCurrentHeading(compassSuccess, compassError);

   function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);
   };

   function compassError(error) {
      alert('CompassError: ' + error.code);
   };
}

function watchOrientation(){
   var compassOptions = {
      frequency: 3000
   }
   var watchID = navigator.compass.watchHeading(compassSuccess, 
      compassError, compassOptions);

   function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);

      setTimeout(function() {
         navigator.compass.clearWatch(watchID);
      }, 10000);
   };

   function compassError(error) {
      alert('CompassError: ' + error.code);
   };
}

function dialogAlert() {
   var message = "I am Alert Dialog!";
   var title = "ALERT";
   var buttonName = "Alert Button";
   navigator.notification.alert(message, alertCallback, title, buttonName);
   
   function alertCallback() {
      console.log("Alert is Dismissed!");
   }
}

function dialogConfirm() {
   var message = "Am I Confirm Dialog?";
   var title = "CONFIRM";
   var buttonLabels = "YES,NO";
   navigator.notification.confirm(message, confirmCallback, title, buttonLabels);

   function confirmCallback(buttonIndex) {
      console.log("You clicked " + buttonIndex + " button!");
   }
	
}

function dialogPrompt() {
   var message = "Am I Prompt Dialog?";
   var title = "PROMPT";
   var buttonLabels = ["YES","NO"];
   var defaultText = "Default"
   navigator.notification.prompt(message, promptCallback, 
      title, buttonLabels, defaultText);

   function promptCallback(result) {
      console.log("You clicked " + result.buttonIndex + " button! \n" + 
         "You entered " +  result.input1);
   }
	
}

function dialogBeep() {
   var times = 2;
   navigator.notification.beep(times);
}

function createFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!')
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
	
}

function writeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
               alert('Write completed.');
            };

            fileWriter.onerror = function(e) {
               alert('Write failed: ' + e.toString());
            };

            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
            fileWriter.write(blob);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function readFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {}, function(fileEntry) {

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               var txtArea = document.getElementById('textarea');
               txtArea.value = this.result;
            };
            reader.readAsText(file);
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function removeFile() {
   var type = window.TEMPORARY;
   var size = 5*1024*1024;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
            alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
}

function getLanguage() {
   navigator.globalization.getPreferredLanguage(onSuccess, onError);

   function onSuccess(language) {
      alert('language: ' + language.value + '\n');
   }

   function onError(){
      alert('Error getting language');
   }
}

function getLocaleName() {
   navigator.globalization.getLocaleName(onSuccess, onError);

   function onSuccess(locale) {
      alert('locale: ' + locale.value);
   }

   function onError(){
      alert('Error getting locale');
   }
}

function getDate() {
   var date = new Date();

   var options = {
      formatLength:'short',
      selector:'date and time'
   }
   navigator.globalization.dateToString(date, onSuccess, onError, options);

   function onSuccess(date) {
      alert('date: ' + date.value);
   }

   function onError(){
      alert('Error getting dateString');
   }
}

function getCurrency() {
   var currencyCode = 'EUR';
   navigator.globalization.getCurrencyPattern(currencyCode, onSuccess, onError);

   function onSuccess(pattern) {
      alert('pattern: '  + pattern.pattern  + '\n' +
         'code: '     + pattern.code     + '\n' +
         'fraction: ' + pattern.fraction + '\n' +
         'rounding: ' + pattern.rounding + '\n' +
         'decimal: '  + pattern.decimal  + '\n' +
         'grouping: ' + pattern.grouping);
   }

   function onError(){
      alert('Error getting pattern');
   }
}

var myMedia = null;
function playAudio() {
   var src = "/android_asset/www/got.mp3";

   if(myMedia === null) {
      myMedia = new Media(src, onSuccess, onError);

      function onSuccess() {
         console.log("playAudio Success");
      }

      function onError(error) {
         console.log("playAudio Error: " + error.code);
      }
   }
   myMedia.play();
}

function pauseAudio() {
   if(myMedia) {
      myMedia.pause();
   }
}

function stopAudio() {
   if(myMedia) {
      myMedia.stop(); 
   }
   myMedia = null;
}

var volumeValue = 0.5;
function volumeUp() {
   if(myMedia && volumeValue < 1) {
      myMedia.setVolume(volumeValue += 0.1);
   }
}

function volumeDown() {
   if(myMedia && volumeValue > 0) {
      myMedia.setVolume(volumeValue -= 0.1);
   }
}

function audioCapture() {
   var options = {
      limit: 1,
      duration: 10
   };
   navigator.device.capture.captureAudio(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
   }
}

function imageCapture() {
   var options = {
      limit: 1
   };
   navigator.device.capture.captureImage(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
   }
}

function videoCapture() {
   var options = {
      limit: 1,
      duration: 10
   };
   navigator.device.capture.captureVideo(onSuccess, onError, options);

   function onSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
         path = mediaFiles[i].fullPath;
         console.log(mediaFiles);
      }
   }

   function onError(error) {
      navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
   }
}

function networkInfo() {
   var networkState = navigator.connection.type;
   var states = {};
   states[Connection.UNKNOWN]  = 'Unknown connection';
   states[Connection.ETHERNET] = 'Ethernet connection';
   states[Connection.WIFI]     = 'WiFi connection';
   states[Connection.CELL_2G]  = 'Cell 2G connection';
   states[Connection.CELL_3G]  = 'Cell 3G connection';
   states[Connection.CELL_4G]  = 'Cell 4G connection';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';
   alert('Connection type: ' + states[networkState]);
}

function onOffline() {
   alert('You are now offline!');
}

function onOnline() {
   alert('You are now online!');
}

function vibration() {
   var time = 3000;
   navigator.vibrate(time);
}

function vibrationPattern() {
   var pattern = [1000, 1000, 1000, 1000];
   navigator.vibrate(pattern);
}



