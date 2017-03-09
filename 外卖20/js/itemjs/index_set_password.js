function set_pwd () {
	var oldpwd = $("#oldpwd").val()
	var newpwd = $("#newpwd").val()

	var radnum = RndNum(8);
	var ajaxdata = {
	    "phone":user_mea.phone,
	    'oldpwd':hcx_md5(oldpwd),
	    "newpwd": hcx_md5(newpwd),
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
	    "phone":user_mea.phone,
	    'oldpwd':hcx_md5(oldpwd),
	    "newpwd": hcx_md5(newpwd),
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'member/MemberUpdatePwd.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	        if (data.status == 1) {
	           mui.alert(data.msg,'',function(){

	           	window.location.href="index_my.html"
	           })
	            
	        } else {
	            mui.toast(data.msg);
	        }
	    },
	    error: function () {
	        console.log("请求失败！");
	    }
	})
}