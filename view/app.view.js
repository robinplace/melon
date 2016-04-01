const $ = jQuery = require ('jquery')
const _ = require ('lodash')

const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const StartView = require ('./start.view')

const AppView = AndView.extend ({
    initialize: function () {
        this.startView = new StartView ({
        })
        this.registerSubview (this.startView)
        /*
        this.homeView = new HomeView ({
        })
        this.mainView = new MainView ({
        })
        */
       this.render ()
    },
    render: function () {
        this.renderSubview (this.startView, this.el)
    },
})



module.exports = AppView
