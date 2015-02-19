// Input Items Form

(function(){

  var Post = Backbone.Model.extend({
    idAttribute: 'objectId',
    defaults: function(options) {
      var options = options || {};
      return _.defaults({
        'item_title': 'Invalid Item',
        'item_description': 'N/A',
        'item_price': 'N/A',
        'item_category': 'N/A'

      });
    }
  });

  var Posts = Backbone.Collection.extend({
    model: Post,
    url: "https://api.parse.com/1/classes/Menu_items"
  });

  var PostNewView = Backbone.View.extend({
    el: '#item-info',
    events: {
      'submit' : 'itemInfo'
    },
    itemInfo: function(e) {
      e.preventDefault();
      var itemTitle = this.$('.itemTitleInput').val();
      var itemDescription = this.$('.itemDescriptionInput').val();
      var itemPrice = this.$('.itemPriceInput').val();
      var itemCategory = this.$('.itemCategoryInput').val();

      this.collection.create({item_title: itemTitle, item_description: itemDescription, item_price: itemPrice, item_category: itemCategory});
      this.$('.itemTitleInput').val('');
      this.$('.itemDescriptionInput').val('');
      this.$('.itemPriceInput').val('');
      this.$('.itemCategoryInput').val('');


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

  var posts = new Posts();
  var postNew = new PostNewView({collection: posts});

})();
