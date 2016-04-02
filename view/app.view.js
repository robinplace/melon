const _ = require ('lodash')

const app = require ('ampersand-app')

const AndView = require ('ampersand-view')
const AndSwitcher = require ('ampersand-view-switcher')

const StartView = require ('./start.view')
const WorkingView = require ('./working.view')
const HomeView = require ('./home.view')
const WorkView = require ('./work.view')

const AppView = AndView.extend ({
    initialize: function () {
        this.startView = new StartView ({})
        this.workingView = new WorkingView ({}) // loading screen
        this.homeView = new HomeView ({})
        this.workView = new WorkView ({})

        this.render ()

        this.switcher.set (this.startView)
        this.on ('change:code', function () {
            this.homeView.code = this.code
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
    },
    goHome: function () {
        this.switcher.set (this.homeView)
    },
    goWork: function (page) {
        this.workView.swap (page)
        this.switcher.set (this.workView)
    },
    props: {
        code: 'string',
    },
})



module.exports = AppView
