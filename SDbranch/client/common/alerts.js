/*
Deprecated due to Toastr.

Template.alerts.rendered = function() {
    var cursor = Alerts.find();
    cursor.observe({
        added: function(alert) {
            if(alert.type == "info") {
                toastr.info(alert.message);
            } else if(alert.type == "error" || alert.type == "danger") {
                toastr.error(alert.message);
            } else {
                toastr.info(alert.message);
            }
        }
    });
}

Template.alert.rendered = function() {
  var alert = this.data;
  Meteor.defer(function() { // waits about a millisecond after template has been rendered
    Alerts.update(alert._id, {$set: {seen: true}});
  });
};
*/