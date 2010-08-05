function(doc) {
  function combinations(tags) {
    var first = tags.shift();
    if (tags.length==0) {
      return [[], [first]];
    } else {
      var result = [];
      var sub_combinations = combinations(tags);
      for (var i=0; i<sub_combinations.length; i++) {
        result.push([first].concat(sub_combinations[i]));
        result.push(sub_combinations[i]);
      }
      return result;
    }
  };

  function calendarWeek(date) {
    var D = date.getDay();
    if (D == 0) D = 7;
    date.setDate(date.getDate() + (4 - D));
    var y = date.getFullYear();
    var ZBDoCY = Math.floor((date.getTime() - new Date(y, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY/7);
    return [y, WN, D];
  };

  if (doc.type == 'transaction') {
    doc.from.sort();
    doc.to.sort();
    var date = new Date(doc.date);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var cw = calendarWeek(date);
    var amount = parseInt(doc.amount) || 0;
    var combs = combinations(doc.from);
    for (var i=0; i < combs.length; i++) {
      emit(['d', combs[i], year, month, day], -1*amount);
      emit(['w', combs[i]].concat(cw), -1*amount);
    }
    combs = combinations(doc.to);
    for (i=0; i < combs.length; i++) {
      emit(['d', combs[i], year, month, day], amount);
      emit(['w', combs[i]].concat(cw), amount);
    }
  }
}