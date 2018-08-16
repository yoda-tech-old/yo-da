var register = function(Handlebars) {

  var helpers = {

    filter: function(input) {
      word = 'unsubscribe'
      str = JSON.stringify(input)
      if (str.indexOf(word) >= 0) {
        return 'company'
      }
    },

    log: function(input) {
       console.log(input)
    },

    type: function(input) {

      console.log(input[0])
      // console.log(typeof input)
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    return helpers;
  }
};

module.exports.register = register;
module.exports.helpers = register(null);
