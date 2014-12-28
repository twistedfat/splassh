/*UI.registerHelper ('truncate', function (str, len) {
  if (str.length > len) {
    var new_str = str.substr (0, len+1);

    while (new_str.length) {
      var ch = new_str.substr ( -1 );
      new_str = new_str.substr ( 0, -1 );

      if (ch == ' ') {
        break;
      }
    }

    if ( new_str === '' ) {
      new_str = str.substr ( 0, len );
    }

    return new Handlebars.SafeString ( new_str +'...' ); 
  }
  return str;
});
*/
UI.registerHelper ('truncate', function (str, len) {
    if (str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return new Handlebars.SafeString ( new_str +'...' ); 
    }
    return str;
});

UI.registerHelper("formatDate", function(datetime, format) {
  var DateFormats = {
       short: "DD MMMM - YYYY",
       long: "dddd MM.DD.YYYY HH:mm"
  };

  if (moment) {
    f = DateFormats[format];
    return moment(datetime).format(f);
  }
  else {
    return datetime;
  }
});