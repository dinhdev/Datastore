$(function(){

    $("#data-type-manage-li").addClass("active");
    $("#data-type-list-li").attr("class","active");

});
function show_error(text) {
    $('.callout-danger > p').text(text);
    $('.callout-danger').css('display','block');
}

$('#btnUpdate').on('click',function(){
    var id = $('#data-type-id').val();
    var name = $('#data-type-name').val();

    if(name == ""){
        show_error("You must input the Name Field!");
        $('#data-type-name').focus();
        return;
    }

    $.ajax({
        url:'/admin/data_type/update',
        type:'POST',
        data:{
            id:id,
            name:name
        },
        success: function(data){
            if(data.resultCode == "success"){
                window.location.href = "/admin/data_type/list"
            }
            else{
                show_error(data.errorInfo);
                return;
            }
        }

    });

});