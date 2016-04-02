const _ = require ('lodash')

const app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const AndSwitcher = require ('ampersand-view-switcher')

const StartView = require ('./start.view')
const WorkingView = require ('./working.view')
const HomeView = require ('./home.view')
const WorkView = require ('./work.view')

const AppView = AndView.extend ({
    props: {
        code: 'string',
        talking: [ 'string', true, 'off' ],
    },
    initialize: function () {
        this.startView = new StartView ({})
        this.workingView = new WorkingView ({}) // loading screen
        this.workView = new WorkView ({})
        this.homeView = new HomeView ({ workView: this.workView })

        this.render ()

        this.switcher.set (this.startView)
        this.on ('change:code', function () {
            this.workView.code = this.code
        })
        this.on ('change:talking', function () {
            this.workView.talking = this.talking
        })
    },
    render: function () {
        this.renderSubview (this.workingView, this.el)

        this.switcher = new AndSwitcher (this.el, {
            hide: function (oldView, callback) {
                // animate away
                callback ()
            },
            show: function (newView) {
                document.title = app.room ? '#'+app.room.code+'---Melon'
                                          : 'Work Together---Melon'
            },
        })

        this.file = this.queryByHook ('file')
    },
    goHome: function () {
        this.switcher.set (this.homeView)
    },
    goWork: function (page) {
        this.workView.swap (page)
        this.switcher.set (this.workView)
    },
    toggleTalk: function () {
        if (app.room.peers.talking) {
            app.room.peers.untalk ()
        } else {
            app.room.peers.talk ()
        }
    },
    events: {
        'change input[type=file]': function (ev) {
            let input = ev.target
            app.room.send (input.files [0])
        },
    },
})



module.exports = AppView
