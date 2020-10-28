$(function(){
    // 1.注册和登录表单显示与隐藏
    $('#reg_link').on('click',function(){
       $('.login-box').hide() 
       $('.reg-box').show()
    })
    $('#login_link').on('click',function(){
        $('.login-box').show() 
        $('.reg-box').hide()
     })

   //   2.自定义表单验证
   var form = layui.form
   form.verify({
      pwd: [
         /^[\S]{6,12}$/
         ,'密码必须6到12位，且不能出现空格'
       ] ,
       repwd: function (value) {
         var pwd1 = $('.reg-box input[name=password]').val()
         if (pwd1 !== value) {
             return '两次密码不一致！'
         }
     },
   })

   var layer=layui.layer
   // 3.注册ajax请求
   $('#form_reg').on('submit',function(e){
      e.preventDefault()
      $.ajax({
         method:'POST',
         url:'/api/reguser',
         data:{
            username:$('.reg-box [name=username]').val(),
            password:$('.reg-box [name=password]').val()
         },
         success:function(res){
            if(res.status!=0){
               return layer.msg(res.message)
            }
            layer.msg(res.message)
            $('#login_link').click()
            $('#form_reg')[0].reset()
         }
      })
   })

   // 登录
   $('#form_login').submit(function (e) {
      e.preventDefault()
      $.ajax({
          method: 'POST',
          url: '/api/login',
          data: $(this).serialize(),
          success: function (res) {
              if (res.status !== 0) return layer.message;
              layer.message
              localStorage.setItem('token', res.token)
              // 跳转到后台主页
              location.href = '/index.html'
          }
      })
  })


})