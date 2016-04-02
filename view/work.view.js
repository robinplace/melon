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
    swap: function (page) {
        this.switcher.set (this [page])
    },
})



module.exports = WorkView

