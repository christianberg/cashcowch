function (keys, values, rereduce) {
  return sum(values);
  var amount = 0;
  for (var i=0; i < values.length; i++) {
    dollars += values[i].dollars;
    cents += (values[i].cents || 0);
  }
  return {
    "dollars": dollars, "cents": cents
  };
}