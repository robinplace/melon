'use strict'
var app = require ('ampersand-app')


const AppView = require ('./view/app.view')

app.view = new AppView ({
    el: document.body,
})

app.messages = {
    'making':  [ 'STARTING WORKTABLE', 'We\'re starting up your group', 'Contacting the room server...' ],
    'joining': [ 'JOINING WORKTABLE', 'Connecting you with your group', 'Contacting peers...' ],
    'authing': [ 'GETTING PERMISSION', 'You\'re group will be including you shortly', 'Waiting for response...' ],
    '...': [ 'CONNECTING', 'YOUR SESSION MIGHT BE LOADING...', 'Stuff is happening' ],
}
// start working
app.working = function (type) {
    let message = app.messages [type]
    app.view.workingView.title  = message [0]
    app.view.workingView.funny  = message [1]
    app.view.workingView.status = message [2]
    app.view.workingView.error = false

    app.view.workingView.open = true
}
app.done = function () {
    app.view.workingView.open = false
}
app.notify = function (notification) {
    app.view.renderSubview (notification)
}

window.app = app
window.console.log = window.console.log.bind (window.console)
