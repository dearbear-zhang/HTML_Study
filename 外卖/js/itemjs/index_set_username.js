function set_pwd () {
	var newuser = $("#newuser").val()
	if (newuser=="") {
		mui.toast("用户名不能为空")
		return;
	};
	var radnum = RndNum(8);
	var ajaxdata = {
		"memberid":getQueryString("memberid"),
	    'name':newuser,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
		"memberid":getQueryString("memberid"),
	    'name':newuser,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'member/MemberUpdateMessage.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	        if (data.status == 1) {
	           	mui.toast(data.msg);
	            setTimeout(function(){location.href="index_my.html"},2000)
	        } else {
	            mui.toast(data.msg);
	        }
	    },
	    error: function () {
	        console.log("请求失败！");
	    }
	})
}