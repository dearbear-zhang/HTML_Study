

// 新增地址
function add_address(){
	var contacts = $('#contacts').val()
	var phone = $('#phone').val()
	var address = $('#address').val()
	var is_defaut= $("#default").html()
	switch (is_defaut) {
		case "默认:是":
		is_defaut=1;
		break;
		case "默认:否":
		is_defaut=0;
		break;
	}
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
		    "is_defaut":is_defaut,
		    "nonce_str": radnum,
		}
		var ajaxsdata = {
		    "memberid": userlocal.memberid,
		     "name": contacts,
		    "phone": phone,
		    "address": address,
		    "div":tag,
		    "is_defaut":is_defaut,
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
			        mui.alert(data.msg,'',function(){

			        	window.location.href="index_my_address.html"
			        })
	
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



mui('.mui-content .mui-switch').each(function() { //循环所有toggle
	//toggle.classList.contains('mui-active') 可识别该toggle的开关状态
	this.parentNode.querySelector('span').innerText = '默认:' + (this.classList.contains('mui-active') ? '是' : '否');
	/**
	 * toggle 事件监听
	 */
	this.addEventListener('toggle', function(event) {
		//event.detail.isActive 可直接获取当前状态
		this.parentNode.querySelector('span').innerText = '默认:' + (event.detail.isActive ? '是' : '否');
	});
});