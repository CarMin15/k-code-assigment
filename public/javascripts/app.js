$(function() {
  var newChannel = {},
      channel = window.channel,
      sessionsTemplateHTML = $("#sessions-template").html(),
      sessionsTemplate = Handlebars.compile(sessionsTemplateHTML)

  // Create a new channel object that groups same day sessions together
  channel.forEach(function(item, i) {
    var time = moment(item.time, "YYYY-MM-DD HH:mm:ss");

    // Define new properties for Handlebars
    item.parsedTime = time;
    item.startTime = time.format("hh:mm A");
    item.endTime = time.add(1, 'hour').format("hh:mm A");

    date = item.parsedTime.format("YYYY-MM-DD");

    if (newChannel[date] == undefined)
      newChannel[date] = {
        parsedTime: item.parsedTime.format("dddd, LL"),
        items: []
      };

    newChannel[date].items.push(item);
  });

  // Sort the associative array by date
  var keys = Object.keys(newChannel),
             len = keys.length;

  keys.sort();

  for (i = 0; i < len; i++) {
    // Render the template and append it to the page
    var sessionHTML = sessionsTemplate(newChannel[keys[i]]);
    $('main').append(sessionHTML);
  }
});
