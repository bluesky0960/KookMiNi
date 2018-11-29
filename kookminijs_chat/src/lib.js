

$(document).ready(function(){
    $('input').click(function(){
        $.ajax({
            type:"GET",
            url:"data/list.html",
            success:function(html){
                var list = $.parseHTML(html);
                $("#after").append(list);

                $.each(list, function(i,el){
                    $("#type").append(el.nodeName);
                });
            }
        })
    });
});