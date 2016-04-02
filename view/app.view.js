const $ = jQuery = require ('jquery')
const _ = require ('lodash')

const app = require ('ampersand-app')

const AndView = require ('ampersand-view')

const StartView = require ('./start.view')
const WorkingView = require ('./working.view')

const AppView = AndView.extend ({
    initialize: function () {
        this.startView = new StartView ({})
        this.workingView = new WorkingView ({})
        /*
        this.homeView = new HomeView ({
        })
        this.mainView = new MainView ({
        })
        */

        this.renderSubview (this.startView, this.el)
        this.renderSubview (this.workingView, this.el)
    },
})



module.exports = AppView
