// controller for contact.html
// using meteor autoform

AutoForm.addHooks(['insertContactForm'], {
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error(error);
        } else {
          toastr.info("Thanks! We'll get in touch within 2 business days.");
        }
      }/*,
      update: function(error) {
        if (error) {
          console.log("Update Error:", error);
        } else {
          console.log("Updated!");
        }
      },
      remove: function(error) {
        console.log("Remove Error:", error);
      }
      */
    }
  });


Template.insertContactForm.events({
  'submit form': function(e,t) {
    e.preventDefault();
    /*
    var form = $('#insertContactForm');
    form.validate();
    // if succcessful send us notifications somehow? email? just check database?
    if (form.valid()) {
      toastr.info('Thanks for the feedback! We\'ll get in touch.'); // todo: what if submission fails?
    }
    */
  }
});