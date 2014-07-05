'use strict'
<% if (Info.optionspage) { %>

handleChangeEvent = (event) ->
  if event.key is 'options' and event.newValue is true
    safari.extension.settings.options = false
    openOptionsPage()
  return

openTab = (url) ->
  if safari.application.activeBrowserWindow
    tab = safari.application.activeBrowserWindow.openTab('foreground')
  else
    tab = safari.application.openBrowserWindow().activeTab
  tab.url = url
  return

openOptionsPage = () ->
  openTab(safari.extension.baseURI + 'options.html')
  return

version = localStorage.getItem('version')
if !version
  openOptionsPage()
localStorage.setItem('version', safari.extension.bundleVersion)

safari.extension.settings.addEventListener('change', handleChangeEvent, false)<% } %>

console.log('\'Allo \'Allo!')
