$(function() {
  var channel = window.channel,
      newChannel = {};

  channel.forEach(function(item, i) {
    var time = moment(item.time, "YYYY-MM-DD HH:mm:ss");
    item.parsedTime = time;
    date = item.parsedTime.format("YYYY-MM-DD");
    item.startTime = time.format("hh:mm A");
    item.endTime = time.add(1, 'hour').format("hh:mm A");

    if (newChannel[date] == undefined)
      newChannel[date] = {
        parsedTime: item.parsedTime.format("dddd, LL"),
        items: []
      };

    newChannel[date].items.push(item);
  });


  var sessionsTemplateHTML = $("#sessions-template").html();
  var sessionsTemplate = Handlebars.compile(sessionsTemplateHTML);

  var keys = Object.keys(newChannel),
             len = keys.length;

  keys.sort();

  for (i = 0; i < len; i++) {
    $('main').append(sessionsTemplate(newChannel[keys[i]]))
  }
});
