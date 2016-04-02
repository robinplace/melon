'use strict'
var app = require ('ampersand-app')


const AppView = require ('./view/app.view')

app.view = new AppView ({
    el: document.body,
})

app.messages = {
    'making':  [ 'STARTING WORKTABLE', 'YOUR SESSION MIGHT BE LOADING...', 'Stuff is happening' ],
    'joining': [ 'JOINING WORKTABLE', 'YOUR SESSION MIGHT BE LOADING...', 'Stuff is happening' ],
    'authing': [ 'WAITING TO BE LET IN', 'YOUR SESSION MIGHT BE LOADING...', 'Stuff is happening' ],
    '...': [ 'CONNECTING', 'YOUR SESSION MIGHT BE LOADING...', 'Stuff is happening' ],
}
// start working
app.working = function (type) {
    app.view.workingView.open = true

    let message = app.messages [type]
    app.view.workingView.title  = message [0]
    app.view.workingView.funny  = message [1]
    app.view.workingView.status = message [2]
}
app.done = function () {
    app.view.workingView.open = false
}
app.notify = function (notification) {
    app.view.renderSubview (notification)
}

window.app = app
window.console.log = window.console.log.bind (window.console)
