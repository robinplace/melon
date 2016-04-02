var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const bind = require ('lodash.bind')
const Room = require ('../state/room')

const NotificationView = AndView.extend ({
    props: {
        title: [ 'string', true ],
        timeout: 'number',
    },
    template: require ('../template/notification.html'),
    autoRender: true,
    initialize: function () {
        if (this.timeout) {
            setTimeout (bind (this.remove, this), this.timeout)
        }
    },
    bindings: {
        'title': { type: 'innerHTML', hook: 'title' },
    },
    // remove
})

module.exports = NotificationView


