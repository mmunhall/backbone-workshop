var app = {};

(function () {
    "use strict";

    app.Contact = Backbone.Model.extend({

    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"), // localStorage replaces URL
    });

    app.ContactRecordView = Backbone.View.extend({

    });

    app.ContactEditView = Backbone.View.extend({

    });

    app.ContactApp = Backbone.Router.extend({

    });
})()

$(function () {
    var runtime = new app.ContactApp();
})