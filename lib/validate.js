// a library for validations
// taken from github.com/jchris/sofa
exports.init = function(newDoc, oldDoc, userCtx, secObj) {
  var v = {};

  v.forbidden = function(message) {
    throw({forbidden: message});
  };

  v.unauthorized = function(message) {
    throw({unauthorized: message});
  };

  v.assert = function(should, message) {
    if (!should) v.forbidden(message);
  };

  v.isAdmin = function() {
    return userCtx.roles.indexOf('_admin') != -1;
  };

  v.require = function() {
    for (var i=0; i < arguments.length; i++) {
      var field = arguments[i];
      message = "The '"+field+"' field is required.";
      if (typeof newDoc[field] == "undefined") v.forbidden(message);
    };
  };

  v.unchanged = function(field) {
    if (oldDoc && oldDoc[field] != newDoc[field])
      v.forbidden("You must not change then '"+field+"' field");
  };

  v.matches = function(field, regex, message) {
    if (!newDoc[field].match(regex)) {
      message = message || "Format of '"+field+"' field is invalid.";
      v.forbidden(message);
    }
  };

  v.dateFormat = function(field) {
    message = "Sorry, '"+field+"' is not a valid date format. Try: 2010-02-24T17:00:03.432Z";
    v.matches(field, /\d{4}\-\d{2}\-\d{2}T\d{2}:\d{2}:\d{2}(\.\d*)?Z/, message);
  };

  v.isInteger = function(field) {
    if (parseInt(newDoc[field]) != newDoc[field]) {
      message = "Field '"+field+"' must be an Integer.";
      v.forbidden(message);
    }
  };

  return v;
};