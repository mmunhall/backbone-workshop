var app = {};

(function () {
    "use strict";

    _.extend(app, Backbone.Events);

    app.Contact = Backbone.Model.extend({
        /* Some things we _could_ provide here:
            1) Validation
            2) URL
            3) Defaults
         */
    });

    app.ContactList = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage("backbone-workshop"), // localStorage replaces URL
        model: app.Contact
        // We could use a comparator here to maintain an alphabetical list, but the ordering does not seem to work with localStorage.
    });

    app.CreateContactView = Backbone.View.extend({
        el: $('div#createContainer'),
        events: {
            'click input[type="button"]': 'create'
        },
        initialize: function () {
            this.listenTo(app, 'create:done', this.clearForm);
        },
        create: function () {
            console.log('createView: create');
            app.trigger('create:new', {
                lastName: $('input[name="lastName"]').val(),
                firstName: $('input[name="firstName"]').val(),
                phone: $('input[name="phone"]').val(),
                email: $('input[name="email"]').val()
            });
        },
        clearForm: function () {
            console.log('createView: clearForm');
            this.$('input[type="text"]').val("");
        }
    });

    app.ContactRecordView = Backbone.View.extend({
        tagName: 'tr',
        className: 'recordView',
        template: Handlebars.compile($('script#contactRecordViewTemplate').html()),
        id: function () {
            return 'recordView_' + this.model.id;
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
            'click a.deleteLink': 'delete'
        },
        render: function () {
            console.log('recordView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        delete: function () {
            console.log('recordView: delete');
            this.model.destroy();
        }
    });

    app.ContactEditView = Backbone.View.extend({
        tagName: 'tr',
        className: 'hidden editView',
        id: function () {
            return 'editView_' + this.model.get('id');
        },
        template: Handlebars.compile($('script#contactRecordEditTemplate').html()),
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
        },
        events: {
            'click a': 'cancel',
            'click input[type="button"]': 'save'
        },
        render: function () {
            console.log('editView: render');
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        cancel: function (e) { // this would be better using a custom event.
            console.log('editView: cancel');
            e.preventDefault();
            this.render();
            app.trigger('edit:done');
        },
        save: function (e) {
            console.log('editView: save');
            e.preventDefault();
            this.model.save({
                lastName: this.$el.find('span:eq(0)').text(),
                firstName: this.$el.find('span:eq(1)').text(),
                email: this.$el.find('span:eq(2)').text(),
                phone: this.$el.find('span:eq(3)').text()
            });
            app.trigger('edit:done');
        }
    });

    app.ContactApp = Backbone.Router.extend({
        routes: {
            "edit/:id": "edit",
            "*actions": "list"
        },
        initialize: function () {
            this.contacts = new app.ContactList();
            this.createView = new app.CreateContactView({el: $('div#createContainer')});
            this.listenTo(this.contacts, 'add', this.addOne);
            this.listenTo(app, 'edit:done', this.afterEdit);
            this.listenTo(app, 'create:new', this.create);
            this.contacts.fetch();
            Backbone.history.start();
        },
        list: function () {
            console.log('route: list');
            $('tr.recordView').removeClass('hidden');
            $('tr.editView').addClass('hidden');
        },
        edit: function (id) {
            console.log('route: edit ' + id);
            $('tr#recordView_' + id).addClass('hidden');
            $('tr#editView_' + id).removeClass('hidden');
        },
        afterEdit: function () {
            console.log('router: doneEditing');
            this.navigate('/', {trigger: true});
        },
        create: function (attrs) {
            console.log('router: create');
            this.contacts.create(attrs, {wait: true});
            app.trigger('create:done');
        },
        addOne: function (contact) {
            console.log('router: addOne');
            var recordView = new app.ContactRecordView({model: contact}),
                editView = new app.ContactEditView({model: contact});
            recordView.render();
            editView.render();
            $('table tbody').append(recordView.el);
            $('table tbody').append(editView.el);
        }
    });
})()

$(function () {
    var runtime = new app.ContactApp();
})