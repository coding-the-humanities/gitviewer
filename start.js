if (Meteor.isClient) {
  Session.set('fileContent', "iour conentn coomesh ere");

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
  });
}
