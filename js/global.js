var ua = navigator.userAgent.toLowerCase();
var ua_with_cases = navigator.userAgent;
let elem = document.querySelector('#ua');
elem.innerHTML = ua;

var os = ua_with_cases.match(/\((.*?)\)/)[1];
var os = os.split(';')[0];
elem = document.querySelector('#os');
elem.innerHTML = "Operating System: " + os;

var browser = ua.match(/chrome|firefox|opera|safari/);
elem = document.querySelector('#browser');
elem.innerHTML = "Browser: " + browser;

function save() {
    localStorage.setItem('lastUa', ua);
    localStorage.setItem('lastOs', os);
    localStorage.setItem('lastBrowser', browser);
}

function exportData() {
    var data = localStorage;
    var blob = new Blob([JSON.stringify(data)], {type: "application/json"});
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    window.URL.revokeObjectURL(url);
}

function importData() {
    var input = document.createElement('input');
    input.type = 'file';
    
    input.onchange = e => { 
    
       var file = e.target.files[0]; 
    
       var reader = new FileReader();
       reader.readAsText(file,'UTF-8');
    
       reader.onload = readerEvent => {
          var content = readerEvent.target.result;
            var data = JSON.parse(content);
            document.querySelector('#os').innerHTML = "Operating System: " + data.lastOs;
            document.querySelector('#browser').innerHTML = "Browser: " + data.lastBrowser;
            document.querySelector('#ua').innerHTML = data.lastUa;       
        }
    }
    
    input.click();
}

elem = document.querySelector('#lastBrowser');
elem.innerHTML = "Last Browser: " + localStorage.getItem('lastBrowser') + '<br> Last OS: ' + localStorage.getItem('lastOs') + '<br> Last UA: ' + localStorage.getItem('lastUa');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/detect/sw.js', {
        scope: '/detect'
    }).then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}
  