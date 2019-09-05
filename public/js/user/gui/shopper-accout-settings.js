//
$(document).ready(function () {

    // click on shopper profile form button
    $("#btn-shopper-profile").on('click', function () {
        const shoppername = $("#name").val();
        const contact = $("#mobile").val();
        const form = $("#form-shopper-profile");

        $("#error-profile").addClass("hidden");
        $("#success-profile").addClass("hidden");

        if (shoppername.length > 0 && contact.length > 0) {
            if (contact.length == 10) {
                const formData = {
                    name: shoppername,
                    mobile: contact
                }

                $.ajax({
                    url: "/shopper/update/info",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(formData),
                    success: function () {
                        $("#shopper-identity").load(location.href + " #shopper-identity");
                        $("#error-profile").addClass("hidden");
                        $("#success-profile").removeClass("hidden");
                    },
                    contentType: "application/json"
                });
            } else {
                $("#success-profile").addClass("hidden");
                $("#error-profile").removeClass("hidden");
                $("#error-profile-message").html("Invalid contact number");
            }
        } else {
            $("#success-profile").addClass("hidden");
            $("#error-profile").removeClass("hidden");
            $("#error-profile-message").html("The fields cannot be blank");
        }

        setTimeout(() => {
            $("#error-profile").addClass("hidden");
            $("#success-profile").addClass("hidden");
        }, 6000);
    });

    // click on shopper privacy form button
    $("#btn-shopper-privacy").on('click', function () {
        const password = $("#new-password").val();
        const confirm = $("#confirm-password").val();
        const form = $("#form-shopper-privacy");

        $("#error-privacy").addClass("hidden");
        $("#success-privacy").addClass("hidden");

        if (password.length > 0 && confirm.length > 0) {
            if (password === confirm) {
                const formData = {
                    password: password
                }

                $.ajax({
                    url: "/shopper/update/info",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(formData),
                    success: function (status) {
                        if (status.success == true) {
                            $("#error-privacy").addClass("hidden");
                            $("#success-privacy").removeClass("hidden");
                        } else {
                            $("#success-privacy").addClass("hidden");
                            $("#error-privacy").removeClass("hidden");
                            $("#error-privacy-message").html(status.error);
                        }
                        $("#new-password").val("");
                        $("#confirm-password").val("");
                    },
                    contentType: "application/json"
                });
            } else {
                $("#success-privacy").addClass("hidden");
                $("#error-privacy").removeClass("hidden");
                $("#error-privacy-message").html("Password does not match the confirm password.");
            }
        } else {
            $("#success-privacy").addClass("hidden");
            $("#error-privacy").removeClass("hidden");
            $("#error-privacy-message").html("The fields cannot be blank");
        }

        setTimeout(() => {
            $("#error-privacy").addClass("hidden");
            $("#success-privacy").addClass("hidden");
        }, 6000)
    });

    // click on shopper login form button
    $("#btn-error-close").on('click', function () {
        $("#error-privacy").addClass("hidden");
    });
});