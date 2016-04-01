'use strict'
var app = require ('ampersand-app')


const AppView = require ('./view/app.view')

new AppView ({
    el: document.body,
})

window.app = app
window.console.log = window.console.log.bind (window.console)
