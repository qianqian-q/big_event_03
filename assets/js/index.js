// 入口函数
$(function(){
    getUserInfo()

    // 退出
    $('#getlogout').on('click',function(){
        // 框架
        layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
          });
    })
})

function getUserInfo() {
    $.ajax({
        url:'/my/userinfo',
        /* headers:{
            Authorization:localStorage.getItem("token")||""
        }, */
        success:function(res) {
            if(res.status!==0) return layui.layer.msg(res.message)
            renderAvatar(res.data)

        }
    })
}

function renderAvatar(user){
    var name = user.nickname||user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user. user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.user_avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.user_avatar').html(first).show()
    }
}