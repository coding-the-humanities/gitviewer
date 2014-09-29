

if (Meteor.isClient) {
  Session.set(fileContent);

  Students = new Meteor.Collection("students");

  Template.groupList.helpers({
    names: function(){
      return Meteor.users.find();
    },
  });

  Template.gistsList.helpers({
    gists: function(){
     return Session.get('gists');
    }
  });

  Template.memberName.helpers({
    name: function(){
      return this.services.github.username;
    }
  });

Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      // retrieve the input field values
      var email = t.find('#login-email').value
        , uvaID = t.find('#login-uvaID').value;

        // Trim and validate your fields here.... 

        // If validation passes, supply the appropriate fields to the
        // Meteor.loginWithPassword() function.
        Meteor.login(email, uvaID, function(err){
        if (err)
          // The user might not have been found, or their passwword
          // could be incorrect. Inform the user that their
          // login attempt has failed. 
          return "try again";
        else
          // The user has been logged in.
        return "you have been registered";
      });
         return false; 
      }
  });

  Template.memberName.events({
    'click': function(){
      var userName = this.services.github.username;
      Meteor.call('getGistsFromUser', userName, function(err, gists){
        Session.set('gists', gists);
      });
    }
  });

  Template.gistsListItem.helpers({
    title: function(){
      var fileNames = Object.keys(this.files);
      return fileNames[0];
    }
  });


  Template.gistViewer.helpers({
    fileContent: function(){
      return Session.get('fileContent');
    }
  });

  Template.gistsListItem.events({
    'click': function(){
      Meteor.call('getGistContent', function(err, gist){
        Session.set('fileContent', gist);
      });
    }
  });


}

if (Meteor.isServer) {
  var GithubApi = Meteor.npmRequire('github');

  var github = new GithubApi({
    version: "3.0.0"
  });


  
}

  Meteor.methods({


    getGistContent: function(){
      // todo
      return "hello world";
    },

    getGistsFromUser: function(userName){


      var gists = Async.runSync(function(done){

        // github.authenticate({
        //   type: "basic",
        //   username: "ZaturrbyTester",
        //   password: "SolidSnake25"
        // });

        github.gists.getFromUser({"user": userName}, function(err, data){
          done(null, data);

        });

      });

      return gists.result;
    }
  });
  
     Meteor.startup(function () {
    }
  ); 