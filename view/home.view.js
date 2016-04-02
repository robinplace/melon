const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

/* TILE WELCOME SCREEN */
const HomeView = AndView.extend ({
    template: require ('../template/home.html'),
    initialize: function () {
        this.render ()
    },
    render: function () {
        this.renderWithTemplate ()
    },
    props: {
        code: 'string',
    },
    bindings: {
        'code': {
            type: 'value',
            hook: 'code',
        },
    },
    events: {
        'click [data-hook=thumbdrive]':   function () { this.swap ('thumbdrive') },
        'click [data-hook=drawingboard]': function () { this.swap ('drawingboard') },
        'click [data-hook=todo]':         function () { this.swap ('todo') },
        'click [data-hook=brainstorm]':   function () { this.swap ('brainstorm') },
        'click [data-hook=talk]':         function () { this.swap ('talk') },
    },
    swap: function (page) {
        app.view.goWork (page)
    },
})



module.exports = HomeView


