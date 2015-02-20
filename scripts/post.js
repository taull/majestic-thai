

//-----------
// MODEL
//-----------

var Post = Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: function(options) {
    options = options || {};
    return _.defaults({
      item_title: 'default',
      item_description: 'default',
      item_price: 'default',
      item_category: 'default'

    });
  }
});


var Posts = Backbone.Collection.extend({
  model: Post,
  url: "https://api.parse.com/1/classes/Menu_items",
  parse: function(response) { return response.results; }
});


//------------
// VIEWS
//------------

var PostListView = Backbone.View.extend ({

    el: '.sideBar',
    template: _.template($('[data-template-name="post-li"]').text()),

  //  render: function(){
  //    this.$el.html(this.template());
  //    return this;
  //  },

   events: {
     'click .post-li': 'showFullPost'
   },

   showFullPost: function() {
   },

   render: function() {
     var that = this;
     this.collection.each(function(post) {
       that.$el.append( that.template( post.toJSON() ) );
     });
     return this;
   }
});


var PostFullView = Backbone.View.extend({
  tagName: 'div',
  className: 'showPost',
  template: _.template($('[data-template-name="showPost"]').text()),
  render: function() {
    this.$el.append(this.template(this.model.toJSON()));
    return this;
  }
});



  //--------------
  // ROUTER
  //--------------

  var AppRouter = Backbone.Router.extend ({
    routes: {
      '': 'index',
      'showPost/:id': 'showPost'
    },

    initialize: function() {
      this.posts = new Posts();
      this.postsList = new PostListView({collection: this.posts});
    },

    index: function(){
      // var template= _.template($('data-template-name=post-li').text());
      // $('#sideBar').html(template());
      var that = this;
      this.posts.fetch().done(function() {
        that.postsList.render();
      });
    },


    showPost: function(id){
      // var template= _.template($('data-template-name=showPost').text());
      // $('#post-li').html(template());
      var that = this;
      this.posts.fetch().done(function() {
        foundModel = that.posts.get(id);
        var postFull = new PostFullView({model: foundModel});
        postFull.render();
        $('.full-post').html(postFull.el);
      });
    }
  });






  //----------------
  // Configuration
  //----------------

  $.ajaxSetup({
    headers: {
      "X-Parse-Application-Id": "p4LcteLYlQmXIHi2ptMCOj4Zqtx9TcNHNB6EWi1l",
      "X-Parse-REST-API-Key": "bGWZQP5qEfxdepnoxfH6g0sIeqDChMLGn8Y5avXH"
    }
  });

  $(document).ready(function() {
    window.appRouter = new AppRouter();
    Backbone.history.start();
  });
