var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var result = document.querySelector('#searchMovie');
var micBtn = document.querySelector('#mic');
var inputLabel = document.querySelector('#inputLabel');
var divResults = document.querySelector('#divResults');
var listening = document.querySelector('#listening');

function testSpeech() {
    var recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        console.log(event.results);
        
        var speechResult = event.results[0][0].transcript;
        
        result.value = speechResult;
        inputLabel.classList.add("active");
        divResults.classList.remove("d-none");
        
        showResults(speechResult);

        console.log('Confidence: ' + event.results[0][0].confidence);
    }

    recognition.onspeechend = function () {
        recognition.stop();
        micBtn.disabled = false;
        console.log("SpeechRecognition.onspeechend");
    }

    recognition.onerror = function (event) {
        micBtn.disabled = false;
        console.log('Error occurred in recognition: ' + event.error);
    }

    recognition.onaudiostart = function (event) {
        //Fired when the user agent has started to capture audio.
        micBtn.classList.add("d-none");
        listening.classList.remove("d-none");
        console.log('SpeechRecognition.onaudiostart');
    }

    recognition.onaudioend = function (event) {
        //Fired when the user agent has finished capturing audio.
        listening.classList.add("d-none");
        micBtn.classList.remove("d-none");
        console.log('SpeechRecognition.onaudioend');
    }

    recognition.onend = function (event) {
        //Fired when the speech recognition service has disconnected.
        console.log('SpeechRecognition.onend');
    }

    recognition.onnomatch = function (event) {
        //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
        console.log('SpeechRecognition.onnomatch');
    }

    recognition.onsoundstart = function (event) {
        //Fired when any sound — recognisable speech or not — has been detected.
        console.log('SpeechRecognition.onsoundstart');
    }

    recognition.onsoundend = function (event) {
        //Fired when any sound — recognisable speech or not — has stopped being detected.
        console.log('SpeechRecognition.onsoundend');
    }

    recognition.onspeechstart = function (event) {
        //Fired when sound that is recognised by the speech recognition service as speech has been detected.
        console.log('SpeechRecognition.onspeechstart');
    }
    recognition.onstart = function (event) {
        //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
        console.log('SpeechRecognition.onstart');
    }
}

micBtn.addEventListener('click', testSpeech);
