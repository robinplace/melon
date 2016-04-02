var app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const Room = require ('../state/room')

const WorkingView = AndView.extend ({
    props: {
        open: 'boolean',
        title: 'string',
        funny: 'string',
        status: 'string',
        error: 'boolean',
    },
    template: require ('../template/working.html'),
    autoRender: true,
    bindings: {
        'error': { type: 'booleanClass', name: 'error' },
        'open': { type: 'booleanClass', name: 'open' },
        'title': { type: 'innerHTML', hook: 'title' },
        'funny': { type: 'innerHTML', hook: 'funny' },
        'status': { type: 'innerHTML', hook: 'status' },
    },
})

module.exports = WorkingView

