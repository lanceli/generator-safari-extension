'use strict';
<% if (Info.optionspage) { %>var handleChangeEvent, openOptionsPage, openTab, version;

handleChangeEvent = function(event) {
  if (event.key === 'options' && event.newValue === true) {
    safari.extension.settings.options = false;
    openOptionsPage();
  }
};

openTab = function(url) {
  var tab;
  if (safari.application.activeBrowserWindow) {
    tab = safari.application.activeBrowserWindow.openTab('foreground');
  } else {
    tab = safari.application.openBrowserWindow().activeTab;
  }
  tab.url = url;
};

openOptionsPage = function() {
  openTab(safari.extension.baseURI + 'options.html');
};

version = localStorage.getItem('version');

if (!version) {
  openOptionsPage();
}

localStorage.setItem('version', safari.extension.bundleVersion);

safari.extension.settings.addEventListener('change', handleChangeEvent, false);<% } %>

console.log('\'Allo \'Allo!');
