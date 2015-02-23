

//-----------
// MODEL
//-----------

var Item = Backbone.Model.extend({
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


// if($('.itemCategoryInput' === 'item_category').val)({
//
// });

var Items = Backbone.Collection.extend({
  model: Item,
  url: "https://api.parse.com/1/classes/Menu_items",
  parse: function(response) { return response.results; }
});


//------------
// VIEWS
//------------

var ItemListView = Backbone.View.extend ({

    el: '.sideBar',
    template: _.template($('[data-template-name="item-list"]').text()),

   events: {
     'click .item-list': 'showFullItem'
   },

   showFullPost: function() {
   },

   render: function() {
     var that = this;
     this.collection.each(function(item) {
       that.$el.append( that.template( item.toJSON() ) );
     });
     return this;
   }
});

// var PostAppetizerView = Backbone.View.extend ({
//
//   el: '.sideBar',
//   template: _.template($('[data-template-name="post-li"]').text()),
//
//   events: {
//     'click .post-li': 'showFullPost'
//   },
//
//   showFullPost: function() {
//   },
//
//   render: function() {
//     var that = this;
//     this.collection.each(function(post) {
//       that.$el.append( that.template( post.toJSON() ) );
//     });
//     return this;
//   }
// });


var ItemFullView = Backbone.View.extend({
  tagName: 'div',
  className: 'showItem',
  template: _.template($('[data-template-name="item-list"]').text()),
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
      'showItem/:id': 'showItem'
    },

    initialize: function() {
      this.items = new Items();
      this.itemsList = new ItemListView({collection: this.items});
    },

    index: function(){
      // var template= _.template($('data-template-name=post-li').text());
      // $('#sideBar').html(template());
      var that = this;
      this.items.fetch().done(function() {
        that.itemsList.render();
      });
    },


    showItem: function(id){
      // var template= _.template($('data-template-name=showPost').text());
      // $('#post-li').html(template());
      var that = this;
      this.items.fetch().done(function() {
        foundModel = that.items.get(id);
        var itemFull = new ItemFullView({model: foundModel});
        itemFull.render();
        $('.full-post').html(itemFull.el);
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
