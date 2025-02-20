let recognition;
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
        }
        document.getElementById('text').value = transcript;
    };

    recognition.onstart = function() {
        document.querySelector('.container').classList.add('recording');
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.stop').style.display = 'inline-block';
    };

    recognition.onend = function() {
        document.querySelector('.container').classList.remove('recording');
        document.querySelector('.start').style.display = 'inline-block';
        document.querySelector('.stop').style.display = 'none';
    };
} else {
    alert("Speech Recognition is not supported in your browser.");
}

function startRecognition() {
    if (recognition) recognition.start();
}

function stopRecognition() {
    if (recognition) recognition.stop();
}

function resetText() {
    document.getElementById('text').value = '';
}

function copyText() {
    let textArea = document.getElementById('text');
    textArea.select();
    document.execCommand('copy');

    // Create a new toast popup
    let toast = document.createElement('div');
    toast.className = 'toast-popup show';  // Add 'show' class to make it visible
    toast.innerText = 'Copied to clipboard!';
    document.body.appendChild(toast);

    // Set a timeout to hide the toast after 2 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');  // Add fade-out class to make it disappear
        setTimeout(() => {
            toast.remove();  // Remove the toast from the DOM after the fade-out animation
        }, 500);  // Delay for fade-out effect
    }, 2000);  // Toast stays visible for 2 seconds
}


