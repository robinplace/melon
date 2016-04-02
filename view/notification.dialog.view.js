var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const Room = require ('../state/room')

const NotificationView = require ('./notification.view')

const NotificationDialogView = NotificationView.extend ({
    props: {
        ok: [ 'string', true, 'OK' ],
        cancel: [ 'string', true, 'Cancel' ],
    },
    template: require ('../template/notification.dialog.html'),
    autoRender: true,
    bindings: {
        'title': { type: 'innerHTML', hook: 'title' },
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

module.exports = NotificationDialogView


