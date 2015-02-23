






// Input Items Form

(function(){

  var Item = Backbone.Model.extend({
    idAttribute: 'objectId',
    defaults: function(options) {
      // var options = options || {};
      return _.defaults({
        'item_title': 'Invalid Item',
        'item_description': 'N/A',
        'item_price': 'N/A',
        'item_category': 'N/A'
      });
    }
  });


  // var Order = Backbone.Model.extend({
  //   // define defaults as a function, otherwise the items array will be shared
  //   // among all orders. See http://backbonejs.org/#Model-defaults
  //   defaults: function(attributes){
  //     attributes = attributes || {};
  //     return _.defaults(attributes, {
  //       items: []
  //     });
  //   },
  //
  //   addItem: function(menuItem){
  //     // 1. use item.toJSON since we need to turn a model into an object that
  //     //    looks like {name: "Cool Food", price: 100}
  //     // 2. use set + concat because, if you were to just modify items in place
  //     //    (e.g. using .push) it wouldn't fire a change event. .concat takes an
  //     //    array and returns a new array of the two arrays combined, so it will
  //     //    fire a change event.
  //     this.set('menuItems', this.get('menuItems').concat([menuItem.toJSON()]));
  //   },
  //
  //   totalPrice: function(){
  //     return this.get('menuItems').reduce(function(acum, item) {
  //       return acum + item.price;
  //     }, 0);
  //   }
  // });



  var Items = Backbone.Collection.extend({
    model: Item,
    url: "https://api.parse.com/1/classes/Menu_items",
    // parse: function(response) { return response.results; }

  });

  var ItemNewView = Backbone.View.extend({
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

  var items = new Items();
  var itemNew = new ItemNewView({collection: items});



})();
