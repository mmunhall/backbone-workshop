var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.Model.extend({

    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"), // localStorage replaces URL
        model: app.Contact
    });

    app.ContactRecordView = Backbone.View.extend({

    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.contacts.fetch();
            Backbone.history.start();
        },
        list: function () {
            console.log('route: list');
        },
        addOne: function (contact) {
            console.log('router: addOne');
            var recordView = new app.ContactRecordView({model: contact});
            recordView.render();
            $('table tbody').append(recordView.el);
        }
    });
})()

$(function () {
    var runtime = new app.ContactApp();
})