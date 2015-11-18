// controller for contact.html
// using meteor autoform

AutoForm.addHooks(['contact'], {
    after: {
      insert: function(error, result) {
        if (error) {
          toastr.error(error);
        } else {
          toastr.info("Thanks! We'll be in touch.");
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


Template.contact.events({
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
  },

    'submit form.form-mailing-list': function(e, t) {
        e.preventDefault();
        
        //TODO: Validate email using regex.
        var email = $('#mailing-list-email').val();
        addEmailToMailingList(email, function(err, id) {
            if(err) {
                throwAlert(email + " cannot be added!", "error");
            } else {
                throwAlert(email + " was successfully added!");
                $('#mailing-list-div').html(Template.mailingListThankYou.render().toHTML());
            }
        });
    }
});
