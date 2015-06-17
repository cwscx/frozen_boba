Meteor 101
=================
*Written by a guy who didn't know jack shit about Meteor before writing this Guide aka jezhou*

Meteor is a *full-stack framework* designed for extremely fast app development. It is flexible and relatively easy to learn with a minimal amount of background knowledge and effort.

##Topics
  - Meteor Commands
  - Meteor Structure
  - Templates
  - Routing
  - Database

##Meteor Structure

Because Meteor is an extremely new Framework, there isn't a "set" structure for what's considered good practice yet. However, because Meteor is extremely flexible, a set structure isn't really needed to make everything run. In fact, you only really need a .html, .js. and .css file to make everything work!

However, there are a few folders you can create to make everything more organized.
  - *client:* The client folder contains all the files that will run on the client side of the application.
  - *server:* The server folder contains all the files the will run on the server side of the application.
  - *lib:* The lib folder will hold common code like collections (the Mongo database) and constants used in the project

In terms of code, those are the three folders you really need. You will store all of your views / templates in the client folder, all of your private non-client methods in the server folder, and database / router stuff in the lib folder.
