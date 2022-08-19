$(document).ready(function () {
    domain = window.location.origin;
});


$(".feedback-btn").click(function () {
    $(".error-test").text('')
    $(".success-test").text('')
    var requestData = {
        name: $("#name").val(),
        phone: $("#phone").val(),
        email: $("#email").val()
    }

    if (checkValidation(requestData)) {
        sendFeedback(requestData)
    } else {
        $(".error-test").text('Name and Phone number is required! *')
    }
});

function checkValidation(data) {
    return data.name.length > 0 && data.phone.length > 0;

}

function sendFeedback(data) {

    $.ajax({
        method: "POST",
        url: domain + '/feedback',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        data: data
    }).done(function (response) {
        if (!response.error) {
            $(".success-test").text('Feedback already sent')
        } else {
            $(".error-test").text(response.message)
        }
    });
}
