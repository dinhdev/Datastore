$(function(){

    $("#data-frequency-manage-li").addClass("active");
    $("#data-frequency-list-li").attr("class","active");

});
function show_error(text) {
    $('.callout-danger > p').text(text);
    $('.callout-danger').css('display','block');
}

$('#btnUpdate').on('click',function(){
    var id = $('#data-id').val();
    var name = $('#data-name').val();

    if(name == ""){
        show_error("You must input the Name Field!");
        $('#data-name').focus();
        return;
    }

    $.ajax({
        url:'/admin/data_frequency/update',
        type:'POST',
        data:{
            id:id,
            name:name
        },
        success: function(data){
            if(data.resultCode == "success"){
                window.location.href = "/admin/data_frequency/list"
            }
            else{
                show_error(data.errorInfo);
                return;
            }
        }

    });

});