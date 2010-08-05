function (newDoc, oldDoc, userCtx, secObj) {
  var v = require("lib/validate").init(newDoc, oldDoc, userCtx, secObj);

  if (newDoc.type == "transaction") {
    v.require("date", "from", "to", "amount");
    v.dateFormat("date");
    v.isInteger("amount");
  }
}