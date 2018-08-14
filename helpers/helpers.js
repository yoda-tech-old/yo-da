
var register = function(Handlebars) {


    var helpers = {

      filter: function(input) {
      word = 'unsubscribe'
      str = JSON.stringify(input)
      if  (str.indexOf(word) >= 0){
        return 'company'}




      function wordInString(s, word){
  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
}





        return 'hello'
    },
    foo: function(var1, var2) {
        return var1+var2
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
