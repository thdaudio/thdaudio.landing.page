$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phoneNumber = $("input#phoneNumber").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            // Using Email.js to send the email
            var templateParams = {
                from_email: email,
                from_name: name,
                to_email: "thdaudio@outlook.com",
                to_name: 'THDaudio',
                phone_number: phoneNumber,
                message: message
            };

            emailjs.send("service_1rm0cea", "template_4s5uwq1", templateParams, 'P3Qm15fnmpdQlRhHb')
                .then(function(response) {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Tin nhắn của bạn đã được gửi thành công! </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                }, function(error) {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Xin lỗi " + name + ", đã xảy ra lỗi trong quá trình gửi tin nhắn. Vui lòng thử lại sau!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                })
                .finally(function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
