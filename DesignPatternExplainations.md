#Req 11 Design Patterns

###Facade

The "Meteor methods" object included in the Meteor framework acts as our Facade. It combines many of the features of our app together into a functions that can be used in both the client and server side of the code.

The best example of "Meteor methods" acting as a Facade is the "createCustomer" method. It combines the User factory, creation of a threshold and payment, and the Roles package into one function. Create a customer would be a complicated mess without the Facade.

###Mediator

The best example of a Mediator is the "Roles" object. It decouples the actions between the Roles and the User objects, and helps decide whether a user is in a role or not.

Another good example is the Collections object in general. Using Collections as a Mediator actually prevents many of our classes from interacting with each other directly. If a User, for example, wants to retrieve all of its Services, it has to go through the Collections class and use "find()". This conveniently decouples a lot of our objects that need to interact with each other!

###Factory

We have factories mainly for Users, Services, and Packages. They are pretty self-explanatory, and can be found in the `factories.js` file.  

###Rule

The rule object is included when checking the threshold. It uses a predefined rule to see if the threshold has passed. If so, the helper automatically sets the notification.

###Rule Action

The rule action was a little weird to implement since the helpers react automatically. In a way, the helper ***itself*** is an action as a result of the rule. We implemented a RuleAction object just in case, but since the helper acts like the Rule's Action, we thought it was a bit redundant. Working with Meteor is different from traditional Rule / Action patterns, but we did our best to show that we understand the concept.  
