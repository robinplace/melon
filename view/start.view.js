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
                alert ('it is good')
            })
            room.makeRoom ()
        },
        'focus [data-hook=join]': function () {
            // TODO show the loading box
            let room = new Room ()
            app.room = room

            room.once ('peerready', function () {
                // TODO let them know that we're having success
            })
            room.once ('roomready', function () {
                alert ('it is good')
            })
            room.makeRoom ()

        },
    },
})

module.exports = StartView
