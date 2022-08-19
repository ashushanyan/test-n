$(document).ready(function () {
    // get Users
    domain = window.location.origin;

    setTimeout(function() {
        $(".filter-option-inner-inner").text('Invite User');

        $('.bootstrap-select').css({
            "width": "100%",
        });

        $('.dropdown-menu .inner').css({
            "height": "200px",
        });
    }, 500);
});

$('body').on('click', '.create-btn', function () {
    let tournament_type =  $('.tournament-type').find(":selected").val();
    let tournament_name =  $('.tournament-name').val();
    let userIds         =  getCreateData();
    let type            =  $('.team-type').find(":selected").val();


    // get Lab Types AJAX
    	$.ajax({
    		method: "POST",
    		url: domain + '/standing',
    		headers: {
    			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    		},
    		data: {
                'tournament_type': tournament_type,
                'tournament_name': tournament_name,
                'user_ids': userIds,
                'type': type,
    		}
    	}).done(function( response ) {
    	    if (response == 'success') {
                location.href= "/my-tournaments"
            }
    			console.log(response);
    		});


    // console.log(userIds, tournament_name ,tournament_type, teamType);
});

function getCreateData() {
    userIds = [] ;
    $(".selectpicker :selected").each(function()
    {
        userIds.push($(this).val());
    });

    return userIds;
}
