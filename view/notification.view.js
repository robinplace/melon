var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const Room = require ('../state/room')

const NotificationView = AndView.extend ({
    props: {
        title: [ 'string', true ],
        message: [ 'string', true ],
        ok: [ 'string', true, 'OK' ],
        cancel: [ 'string', true, 'Cancel' ],
    },
    template: require ('../template/notification.html'),
    autoRender: true,
    bindings: {
        'title': { type: 'innerHTML', hook: 'title' },
        'message': { type: 'innerHTML', hook: 'message' },
        'ok': { type: 'innerHTML', hook: 'ok' },
        'cancel': { type: 'innerHTML', hook: 'cancel' },
    },
    // remove
    events: {
        'click [data-hook=ok]': function () {
            this.trigger ('ok')
            this.remove ()
        },
        'click [data-hook=cancel]': function () {
            this.trigger ('cancel')
            this.remove ()
        },
    },
})

module.exports = NotificationView


