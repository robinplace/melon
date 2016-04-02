var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const Room = require ('../state/room')

const WorkingView = AndView.extend ({
    props: {
        open: 'boolean',
        title: 'string',
        funny: 'string',
        status: 'string',
    },
    template: require ('../template/working.html'),
    autoRender: true,
    bindings: {
        'open': { type: 'booleanClass', name: 'open' },
        'title': { type: 'innerHTML', hook: 'title' },
        'funny': { type: 'innerHTML', hook: 'funny' },
        'status': { type: 'innerHTML', hook: 'status' },
    },
})

module.exports = WorkingView

