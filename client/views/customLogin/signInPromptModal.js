showSignInPrompt = function(cb) {
    $('#signInModal').modal('show');
    
    $("form.form-signin").submit(function(e) {
        e.preventDefault();
        
        var options = {
           // username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };
        
        $('#signInModal').modal('hide');
        
        if ($("form.form-signin button[type=submit]").text() == "Sign in") {
            Meteor.loginWithPassword({email: options.email}, options.password, cb);
        } else {
           toastr.warning('Attempting to login.'); 
        }/*else {
            Accounts.createUser(options, function() {
                Meteor.loginWithPassword({email: options.email}, options.password, cb);
            });
        }*/
    });
    /*
    $("form.form-signin #btnToggleSignIn").click(function() {
        if ($("form.form-signin button[type=submit]").text() == "Sign in") {
            $("form.form-signin #username").show();
            $("form.form-signin button[type=submit]").text("Sign Up");
            $("#btnToggleSignIn").text("Sign in");
        } else {
            $("form.form-signin #username").hide();
            $("form.form-signin button[type=submit]").text("Sign in");
            $("#btnToggleSignIn").text("Create account");
        }
    });
    */
}
