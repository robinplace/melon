const app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const AndSwitcher = require ('ampersand-view-switcher')

const BrainstormView = require ('./brainstorm.view')

/* PARENT FOR EVERYTHING */
const WorkView = AndView.extend ({
    template: require ('../template/work.html'),
    initialize: function () {
        this.render ()

        this.listenTo (app, 'inroom', function (room) {
            this.brainstorm = new BrainstormView ({ collection: room.brainstorm })
        })
    },
    props: {
        code: 'string',
        talking: 'string',
    },
    bindings: {
        'talking': {
            type: 'switchAttribute',
            selector: '[data-hook=talk] img',
            name: 'src',
            cases: {
                off: 'assets/off.svg',
                talking: 'assets/talking.svg',
                muted: 'assets/muted.svg',
            },
        },
    },
    render: function () {
        this.renderWithTemplate ()

        this.switcher = new AndSwitcher (this.queryByHook ('main'), {
            hide: function (oldView, callback) {
                // animate away
                callback ()
            },
            show: function (newView) {
                window.title = newView.title
            },
        })
    },
    events: {
        'click [data-hook=thumbdrive]':   function () { this.swap ('thumbdrive') },
        'click [data-hook=drawingboard]': function () { this.swap ('drawingboard') },
        'click [data-hook=todo]':         function () { this.swap ('todo') },
        'click [data-hook=brainstorm]':   function () { this.swap ('brainstorm') },
        'click [data-hook=talk]':         function () { app.view.toggleTalk () },
    },
    swap: function (page) {
        this.switcher.set (this [page])
    },
})



module.exports = WorkView

