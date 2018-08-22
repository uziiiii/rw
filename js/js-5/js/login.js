$(function () {
    //登录点击事件
    $('#login').click(function () {
        // //获取用户名和密码
        var name = $("input").eq(0).val();;
        var password = $("input").eq(1).val();
        // console.log(name);
        // console.log(password);
        //正则表达式表单验证
        //用户名验证：4-16个字符，可使用字母，数字，下划线，需以字母开头
        var reguser = /\w{4,16}/;
        //验证密码：6-18个字符，字母和数字的组合，区分大小写
        var regpassword = /^[A-Za-z0-9]{6,18}$/;
        //判断输入内容是否正确
        if (name === "") {
            $('#cue').html("用户名不能为空");
        } else if (!reguser.test(name)) {
            $('#cue').html("用户名不符合要求");
        } else if (!regpassword.test(password)) {
            $('#cue').html("密码不符合要求");
        } else {
            //     //创建xmlHttpRequest对象
            //     var xhr = new XMLHttpRequest();
            //     // console.log(xhr)
            //     //打开xmlHttpRequest对象，并规定该请求的类型/地址/异步
            //     xhr.open("post", '/carrots-admin-ajax/a/login/', true);
            //     //添加http请求头
            //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            //     //发送XMLHttpRequest对象给服务器
            //     xhr.send("name=" + name + "&pwd=" + password);
            //     //当readyState属性改变时调用该函数
            //     xhr.onreadystatechange = function () {
            //         //判断请求完成并且响应就绪
            //         if (xhr.readyState == 4 && xhr.status == 200) {
            //             // console.log(responseText);
            //             //将json字符串转换为对象
            //             var jsonObj = JSON.parse(xhr.responseText);
            //             console.log(jsonObj);
            //             //当用户名和密码都正确跳转到后台页面
            //             if (jsonObj.message == "success") {
            //                 window.location.href = 'http://dev.admin.carrots.ptteng.com/#/dashboard';
            //             } else {
            //                 $('#cue').html(jsonObj.message);
            //             }
            //         }
            //     }
            // }
            //jquery ajax异步请求
            $.post("/carrots-admin-ajax/a/login/", {
                    name: name,
                    pwd: password
                },
                function (data, status) {
                    console.log(data)
                    var jsonObj = JSON.parse(data);
                    console.log(jsonObj);
                    //当用户名和密码都正确跳转到后台页面
                    if (jsonObj.message == "success") {
                        window.location.href = 'http://dev.admin.carrots.ptteng.com/#/dashboard';
                    } else {
                        $('#cue').html(jsonObj.message);
                    }
                }

            )
        }
    })
})