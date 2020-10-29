var baseURL = 'http://ajax.frontend.itheima.net'
$.ajaxPrefilter(function(option){
    option.url = baseURL + option.url

    // 对需要权限的接口配置信息
    if(option.url.indexOf('/my/')!==-1) {
        option.headers={
            Authorization:localStorage.getItem("token")||""
        }
    }

    option.complete=function(res){
        console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status ==1 && obj.message=='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
        }
    }
    
})