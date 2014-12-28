Template.mailingList.events({
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