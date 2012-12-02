$(function(){
    $('#left_menu div ul li a').on('click', function(e){
		e.preventDefault();
        var page_url = $(this).prop('href');
        $('#content').load(page_url);
    });
});



