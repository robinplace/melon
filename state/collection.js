'use strict'
const AndCollection = require ('ampersand-collection')
const isArray = require('lodash.isarray')
const slice = [].slice
const State = require ('./state')

const Collection = AndCollection.extend ({
    model: State,
    mainIndex: 'uuid',

    props: {
        counter: [ 'number', true, 0 ],
    },

    removed: null,
    initialize: function () {
        this.removed = {}
    },
    // prevent adding an already-removed model
    _prepareModel: function (attrs) {
        if (this.removed [attrs.uuid]) return false

        if (!attrs.counter) {
            attrs.counter = this.counter || 0
        }

        return AndCollection.prototype._prepareModel.apply (this, arguments)
    },
    // store removed uuids and do removal
    remove: function (models, options) {
        models = !isArray (models) ? [ models ] : slice.call (models)

        let that = this
        models.forEach (function (model) {
            let uuid = model.uuid || model
            that.removed [uuid] = true
        })

        return AndCollection.prototype.remove.apply (this, arguments)
    },
    // sort by this property derived from counter and user
    comparator: 'sort',
})

module.exports = Collection


