

//登录
function user_login() {
    var phone = $("#phone").val();
    var pass = $("#pass").val();
    if ($.trim(phone) == '') {
        mui.alert("请输入账号！");   
        return;
    } else if ($.trim(pass) == '') {
        mui.alert("请输入密码！");
        return;
    }
    var radnum = RndNum(8);
    var ajaxdata = {
        "phone": phone,
        "pwd": hcx_md5(pass),
        "nonce_str": radnum,
    }
    var ajaxsdata = {
        "phone": phone,
        "pwd": hcx_md5(pass),
        "nonce_str": radnum,
        "sign": encrypt(ajaxdata)
    }
    $.ajax({
        type: "post",
        url: server_ip + 'member/MemberLogin.ashx',
        data: ajaxsdata,
        success: function (data) {
            if (data.status == 1) {
                 mui.toast(data.data[0].message);
                 localStorage.setItem("userdata",JSON.stringify(data.data[0]))//存储在本地
                   mui.openWindow({
                      url:'index_my.html'
                  });      
            } else {
                mui.toast(data.msg);
            }
        },
        error: function () {
            console.log("请求失败！");
        }
    })


}

