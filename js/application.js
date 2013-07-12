var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.View.extend({

    });

    app.ContactList = Backbone.Collection.extend({

    });

    app.ContactRecordView = Backbone.View.extend({

    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "create": "create",
            "edit/:id": "edit",
            "*actions": "list"
        },
        initialize: function () {
            Backbone.history.start();
        },
        list: function () {
            console.log('list');
        },
        create: function () {
            console.log('create');
        },
        edit: function (id) {
            console.log('edit ' + id);
        }
    });
})()

var runtime = new app.ContactApp();