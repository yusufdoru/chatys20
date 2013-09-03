this.getClientIp = function(req) { // Bağlanan kişinin ipsi döner.
  var ipAddress;

  var forwardedIpsStr = req.header('x-forwarded-for'); 
  if (forwardedIpsStr) {

    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
}

this.GetRandomColor = function() { // Rastgele renk döner.
    Colors = {};
    Colors.names = {
        aqua: "#00ffff",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        black: "#000000",
        blue: "#0000ff",
        brown: "#a52a2a",
        cyan: "#00ffff",       
        fuchsia: "#ff00ff",
        gold: "#ffd700",
        green: "#008000",
        indigo: "#4b0082",
        khaki: "#f0e68c",
        lightblue: "#add8e6",
        lightcyan: "#e0ffff",
        lightgreen: "#90ee90",
        lightgrey: "#d3d3d3",
        lightpink: "#ffb6c1",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        magenta: "#ff00ff",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        orange: "#ffa500",
        pink: "#ffc0cb",
        purple: "#800080",
        violet: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        white: "#ffffff",
        yellow: "#ffff00"
    };
    Colors.random = function() {
        var result;
        var count = 0;
        for (var prop in this.names)
            if (Math.random() < 1/++count)
               result = prop;
        return result;
    };
    return Colors.random();
}

this.removeTags = function(html) { // HTML etiketleri temizler.
    
var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

var tagOrComment = new RegExp(
    '<(?:'
    // Comment body.
    + '!--(?:(?:-*[^->])*--+|-?)'
    // Special "raw text" elements whose content should be elided.
    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
    // Regular name
    + '|/?[a-z]'
    + tagBody
    + ')>',
    'gi');
    
  var oldHtml;
  do {
    oldHtml = html;
    html = html.replace(tagOrComment, '');
  } while (html !== oldHtml);
  return html.replace(/</g, '&lt;');
}

this.GetObjById = function(id,jsondata){ // kisiler = [{ id:1,"yusuf"}]; GetObjById(1,kisiler) = { id:1,"yusuf"}
    for(var i = 0;i<jsondata.length;i++)
        if(id === jsondata[i].id)        
            return jsondata[i];
    
}
 
this.DelObjById = function(id,jsondata){ // kisiler = [{ id:1,"yusuf"}]; GetObjById(1,kisiler) = [];
    for(var i = 0;i<jsondata.length;i++)
    {
        if(id === jsondata[i].id)       
        {       
            jsondata.splice(i,1);             
        }
    }
    return jsondata;
}
