const app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const WorkView = require ('./work.view')

/* TILE WELCOME SCREEN */
const HomeView = AndView.extend ({
    template: require ('../template/home.html'),
    initialize: function () {
        this.render ()
    },
    props: {
        workView: 'state',
    },
    bindings: {
        'workView.code': {
            type: 'value',
            hook: 'code',
        },
        'workView.talking': {
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
    },
    events: {
        'click [data-hook=thumbdrive]':   function () { this.swap ('thumbdrive') },
        'click [data-hook=drawingboard]': function () { this.swap ('drawingboard') },
        'click [data-hook=todo]':         function () { this.swap ('todo') },
        'click [data-hook=brainstorm]':   function () { this.swap ('brainstorm') },
        'click [data-hook=talk]':         function () { app.view.toggleTalk () },
    },
    swap: function (page) {
        app.view.goWork (page)
    },
})



module.exports = HomeView


