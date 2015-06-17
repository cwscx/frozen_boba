UI.registerHelper('equals', function (a, b) {
    return a === b;
});

UI.registerHelper('round', function(a){
  if(a < 0)
    a = -a;

  return a.toFixed(2);
});

UI.registerHelper('bool', function(a){
  if(a == false)
    return "false";
  return "true";
});
