var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const Room = require ('../state/room')

const StartView = AndView.extend ({
    template: require ('../template/start.html'),
    initialize: function () {
        this.render ()
    },
    events: {
        'click [data-hook=start]': function () {
            app.working ('making')

            let room = new Room ()
            app.room = room

            this.listenToOnce (room, 'roomready', function () {
                app.done ()
                console.log (room.code)
                // TODO show the home page
            })
            room.makeRoom ()
        },
        'keydown [data-hook=join]': function (ev) {
            this.failed = false
        },
        'keyup [data-hook=join]': function (ev) {
            if (ev.target.value.length < 6) return
            let code = ev.target.value
            ev.target.value = ''
            ev.target.disabled = true

            app.working ('joining')

            let room = new Room ()
            app.room = room

            this.listenToOnce (room, 'badcode', function () {
                app.done ()
                this.failed = true
                ev.target.disabled = false
                // TODO hide the box and make what happened clear
            })
            this.listenToOnce (room, 'askingpermission', function () {
                app.working ('authing')
            })
            this.listenToOnce (room, 'roomready', function () {
                app.done ()
                // TODO show the home page
            })
            room.joinRoom (code)
        },
    },
    bindings: {
        'failed': {
            type: 'booleanClass',
            hook: 'join',
            name: 'failed',
        },
    },
})

module.exports = StartView
