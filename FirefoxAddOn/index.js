var self = require('sdk/self');
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var injectWorker = null;
var sideWorker = null;

var sidebar = require("sdk/ui/sidebar").Sidebar({
  id: 'my-sidebar',
  title: 'My sidebar',
  url: "./index.html",
  onAttach: function(worker) {
    
    sideWorker = worker;
    worker.port.on('onSearch', function(message) {
        console.log('Add On received onSearch and route it to tab');
        injectWorker.port.emit('onSearch', message);  
    });
  }
});

var button = buttons.ActionButton({
  id: "mozilla-link",
  label: "Visit Mozilla",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

function handleClick(state) {
  tabs.open("http://www.youtube.com/");
  tabs.activeTab.on("ready", runScript);
  sidebar.show();
}

tabs.on("ready", runScript);
 
function runScript(tab) {
  
  injectWorker = tab.attach({
    contentScriptFile: self.data.url("injectApp.js")
  });
  
  injectWorker.port.on('onAddLink', function(message){
    console.log('Add On received onAddLink and route it to side bar');
     sideWorker.port.emit('onAddLink', message); 
  });
  
}

console.log('addon started!!!');
