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
            // TODO show the loading box
            let room = new Room ()
            app.room = room

            room.once ('peerready', function () {
                // TODO let them know that we're having success
            })
            room.once ('roomready', function () {
                alert ('it is good and you got '+room.code)
            })
            room.makeRoom ()
        },
        'keyup [data-hook=join]': function (ev) {
            if (ev.target.value.length < 6) return
            let code = ev.target.value

            // TODO show the loading box
            let room = new Room ()
            app.room = room

            room.once ('badcode', function () {
                // TODO hide the box and make what happened clear
            })
            room.once ('peerready', function () {
                // TODO let them know that we're having success
            })
            room.once ('roomready', function () {
                alert ('it is good')
            })
            room.joinRoom (code)

        },
    },
})

module.exports = StartView
