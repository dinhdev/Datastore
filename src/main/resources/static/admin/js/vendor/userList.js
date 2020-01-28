$(function() {


    $("#vendor-manage-li").addClass("active");
    $("#vendor-list-li").attr("class","active");
   // $("#user-list-li").parent().addClass("in");

    var page = $("#current-page").val();
    if (page == null || page == 0) {
        page = 1;
    }
    $.ajax({
        url: '/admin/user/initPage',
        data: {
            'page':page
        },
        success: function (data) {
            $("#total-num").text(data.totalCount);
            $("#total-page").text(data.totalPageNum);
            $("#current-page").text(data.page);
            if (data.totalCount > 0) {
                $.jqPaginator('#pagination', {
                    totalPages: data.totalPageNum,
                    visiblePages: 5,
                    currentPage: data.page,
                    prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
                    next: '<li class="next"><a href="javascript:;">Next</a></li>',
                    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                    onPageChange: function (num, type) {
                        $("#current-page").text(num);
                        loadUserList();
                    }
                });
            }
            else{
                $("#dataList").html("");
            }
        }
    });
});


function loadUserList(){
	var param = $("#keyword").val();
	var page = $("#current-page").text();
	if(isEmpty(page) || page == 0){
		page = 1;
	}
	
	$.ajax({
        url : '/admin/vendor/load',
        data : 'page='+page+"&userName="+param,
        success  : function(data) {
        	$("#dataList").html(data);
		}
    });

}

$("#tag-search").on('click',function () {
    $.ajax({
        url: '/admin/vendor/initPage',
        data: {
            'page':1,
            'search_str':$("#keyword").val()
        },
        success: function (data) {
            $("#total-num").text(data.totalCount);
            $("#total-page").text(data.totalPageNum);
            $("#current-page").text(data.page);
            if (data.totalCount > 0) {
                $.jqPaginator('#pagination', {
                    totalPages: data.totalPageNum,
                    visiblePages: 5,
                    currentPage: data.page,
                    prev: '<li class="prev"><a href="javascript:;">Previous</a></li>',
                    next: '<li class="next"><a href="javascript:;">Next</a></li>',
                    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                    onPageChange: function (num, type) {
                        $("#current-page").text(num);
                        loadUserList();
                    }
                });
            }
            else{
                $("#dataList").html("");
            }
        }
    });
});

$("#dataList").on('click','.user-delete',function () {
    var id = $(this).parent().data("id");
    new $.flavr({
        content: 'Confirm?',
        buttons: {
            primary: {
                text: 'OK', style: 'primary', action: function () {
                    $.ajax({
                        url : '/admin/vendor/delete',
                        method: "POST",
                        data:'id='+id,
                        success  : function(data) {
                            if(data.resultCode == 'success'){
                                autoCloseAlert(data.errorInfo,1000);
                                window.location.href = "/admin/vendor/list";
                            }else{
                                autoCloseAlert(data.errorInfo,1000);
                            }
                        }
                    });
                }
            },
            success: {
                text: 'Cancel', style: 'danger', action: function () {

                }
            }
        }
    });

});

$("#dataList").on('click','.user-edit',function () {
    var id = $(this).parent().data("id");
	window.location.href= "/admin/vendor/edit/"+id;
});


$("#dataList").on('click','.user-activate',function () {
    var id = $(this).parent().data("id");
    new $.flavr({
        content: 'Confirm?',
        buttons: {
            primary: {
                text: 'OK', style: 'primary', action: function () {
                    $.ajax({
                        url : '/admin/vendor/activate',
                        method: "POST",
                        data:{
                            'id':id,
                            'flag' : 1
                        },
                        success  : function(data) {
                            if(data.resultCode == 'success'){
                                autoCloseAlert(data.errorInfo,1000);
                                window.location.href = "/admin/vendor/list";
                            }else{
                                autoCloseAlert(data.errorInfo,1000);
                            }
                        }
                    });
                }
            },
            success: {
                text: 'Cancel', style: 'danger', action: function () {

                }
            }
        }
    });

});



$("#dataList").on('click','.user-deactivate',function () {
    var id = $(this).parent().data("id");
    new $.flavr({
        content: 'Confirm?',
        buttons: {
            primary: {
                text: 'OK', style: 'primary', action: function () {
                    $.ajax({
                        url : '/admin/vendor/activate',
                        method: "POST",
                        data:{
                            'id':id,
                            'flag' : 0
                        },
                        success  : function(data) {
                            if(data.resultCode == 'success'){
                                autoCloseAlert(data.errorInfo,1000);
                                window.location.href = "/admin/vendor/list";
                            }else{
                                autoCloseAlert(data.errorInfo,1000);
                            }
                        }
                    });
                }
            },
            success: {
                text: 'Cancel', style: 'danger', action: function () {

                }
            }
        }
    });

});
