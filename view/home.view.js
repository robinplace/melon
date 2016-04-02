const app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const WorkView = require ('./work.view')

/* TILE WELCOME SCREEN */
const HomeView = AndView.extend ({
    template: require ('../template/home.html'),
    initialize: function () {
        this.render ()
        this.queryByHook ('code').value = this.workView.code
    },
    props: {
        workView: 'state',
    },
    bindings: {
        'workView.code': {
            type: 'value',
            hook: 'code',
        },
    },
    render: function () {
        this.renderWithTemplate ()
    },
    events: {
        'click [data-hook=drawingboard]': function () { this.swap ('sketchpad') },
        'click [data-hook=todo]':         function () { this.swap ('todo') },
        'click [data-hook=brainstorm]':   function () { this.swap ('brainstorm') },
        'click [data-hook=talk]':         function () { app.view.toggleTalk () },
    },
    swap: function (page) {
        app.view.goWork (page)
    },
})



module.exports = HomeView


