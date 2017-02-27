

// 新增地址
function add_address(){
	var contacts = $('#contacts').val()
	var phone = $('#phone').val()
	var address = $('#address').val()

	if (contacts=="") {
		mui.toast("联系人为空");
		return;
	};
	if (phone=="") {
		mui.toast("手机为空");
		return;
	};
	if (address=="") {
		mui.toast("地址为空");
		return;
	};

	
	if (userlocal!=null) {
		var radnum = RndNum(8);
		var ajaxdata = {
		    "memberid": userlocal.memberid,
		    "name": contacts,
		    "phone": phone,
		    "address": address,
		    "div":tag,
		    "nonce_str": radnum,
		}
		var ajaxsdata = {
		    "memberid": userlocal.memberid,
		     "name": contacts,
		    "phone": phone,
		    "address": address,
		    "div":tag,
		    "nonce_str": radnum,
		    "sign": encrypt(ajaxdata)
		}
		$.ajax({
		    type: "post",
		    url: server_ip + 'member/MemberAddAddress.ashx',
		    data: ajaxsdata,
		    success: function (data) {
		    	var htmldata=data.data[0]
		        if (data.status == 1) {
		        
		        	mui.alert(data.msg)
	
		        } else {
		            mui.toast(data.msg);
		        }
		    },
		    error: function () {
		        console.log("请求失败！");
		    }
		})
	};
}

