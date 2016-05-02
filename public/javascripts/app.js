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
        parsedTime: item.parsedTime,
        items: []
      };

    newChannel[date].items.push(item);
  });

  var sessionTemplateHTML = $("#session-template").html();
  var sessionTemplate = Handlebars.compile(sessionTemplateHTML);
  for (var day in newChannel) {
    if (newChannel.hasOwnProperty(day)) {
      $('<time class="day" />').html(newChannel[day].parsedTime.format("dddd, LL")).appendTo("#container");
      var ul = $("<ul />").addClass("session_list");
      newChannel[day].items.forEach(function(item) {
        ul.append(sessionTemplate(item));
      })
      ul.appendTo("#container");

    }
  }
});
