backbone-workshop
=================

workshop/start
--------------
Begin here. This branch contains the JavaScript dependencies, some CSS and an index.html file to get started.

workshop/add-dependencies
-------------------------
Create an application.js file with some bootstrap code to get started.

workshop/create-first-objects
-----------------------------
We'll build the first Backbone objects we plan to use in our application.

workshop/start-html-file
------------------------
Begin building the HTML of our application.

workshop/add-list-table
-----------------------
Create the HTML table for the listing of contacts.

workshop/create-list-route
--------------------------
Create a default route for listing contacts.

workshop/init-collection
------------------------
Intialize a collection of contacts, fetch existing saved contacts, and start Backbone.history.start() to route the default URL.

workshop/temp-reset
-------------------
Since we have no exiting contacts to fetch, we'll replace fetch() with reset() until we have implemented the create feature of the application.

workshop/create-recordview-template
-----------------------------------
Create a template for our record view.

workshop/begin-recordview
-------------------------
Add some properties to the record view object so that contacts will be rendered into the page.

workshop/add-another-contact
----------------------------
Add another object to the collection for good measure. Notice that we are now passing an array to reset rather than a single object. Also, note that any name/value pair can be sent and the model will be dutifully created using that inforamtion.

workshop/add-create-form
------------------------
Add a form to the HTML page for creating new contacts.

workshop/start-create-view
--------------------------
Begin building the view to control the create form, and instantiate the new view from the application router.

workshop/extend-app-with-events
-------------------------------
Extend the application with Backbone.Events, which will allow us to trigger and listen for custom events.

workshop/persist-new-contact
----------------------------
Trigger an event when the save button is clicked, listen for the triggered event in the router, add the new model to the collection, listen for the add event on the model.