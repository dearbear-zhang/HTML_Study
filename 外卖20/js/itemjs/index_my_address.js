$(document).ready(function(){
address()
})

var domid;//获取地址ID











// 地址
function address(){

	var radnum = RndNum(8);
	var ajaxdata = {
	    "memberid": userlocal.memberid,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
	    "memberid": userlocal.memberid,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'Member/GetMemberAddress.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	    	var htmldata=data.data
	    	var html="";
	    	var is_defaut=""
	        if (data.status == 1) {
	        	$.each(htmldata,function(index){
	        		if (htmldata[index].is_defaut==1) {
	        			is_defaut="默认"
	        		}else{is_defaut="";$("#userphone").css("background","#fff")};
	        	
	        		html+='<div class="receipt_box" id="bx'+index+'">'
	                +'<div class="r_con">'
	                  +'<p>'
	                    +'<em class="taglist">'+htmldata[index].div+'</em>'
	                    +'<em class="username">'+htmldata[index].name+'</em>'
	                    +'<em class="userphone">'+htmldata[index].phone+'</em>'
	                    +'<i class="is_defaut">'+is_defaut+'</i>'
	                    +'<span id="'+htmldata[index].id+'" onclick="insert_address(this,'+index+')"><img src="images/coomon/bj_address.png" alt=""></span>'
	                  +'</p>'
	                  +'<small class="useraddress">'+htmldata[index].address+'</small>'
	                  +'<small class="deleaddress" onclick="Delete_address('+htmldata[index].id+')">删除</small>'
	                +'</div>'
	                 +'</div>'

	                 // insert_address(htmldata[index].id)
	        	})
			 $(".receipt_wrap").prepend(html)
			  //新建收货地址

			 
	        } else {
	            mui.toast(data.msg);
	        }
	    },
	    error: function () {
	        console.log("请求失败！");
	    }
	})
}

$('.r_tit span').click(function(){
	 mui.openWindow({
         url:'index_my_newaddress.html'
     });
})	





function insert_address(thi,index){
	domid = $(thi).attr("id")
	var taglist = $("#bx"+index).find(".taglist").html()
	var username = $("#bx"+index).find(".username").html()
	var userphone = $("#bx"+index).find(".userphone").html()
	var useraddress = $("#bx"+index).find(".useraddress").html()
	var is_defaut = $("#bx"+index).find(".is_defaut").html()
console.log(is_defaut)
	switch (is_defaut) {
		case "默认":
		$("#default").html("默认:是")
		break;
		case "":
		$("#default").html("默认:否")
		break;
	}

	switch (taglist){
		case "无":
		$('.newa button').removeClass("btncolor");
		$('.newa button').eq(0).addClass("btncolor");
		break;
		case "公司":
		$('.newa button').removeClass("btncolor");
		$('.newa button').eq(1).addClass("btncolor");
		break;
		case "家里":
		$('.newa button').removeClass("btncolor");
		$('.newa button').eq(2).addClass("btncolor");
		break;
		case "学校":
		$('.newa button').removeClass("btncolor");
		$('.newa button').eq(3).addClass("btncolor");
		break;
	}
	var name = $("#contacts").val(username);
	var phone = $("#phone").val(userphone);
	var address = $("#address").val(useraddress);
	
	switch (is_defaut) {
		case "默认":
		$('.mui-switch').addClass("mui-active")
		break;
		case "":
		$('.mui-switch').removeClass("mui-active")
		break;
	}
	
	$(".add_popover").show()
	$(".setaddress").fadeIn()

}




//修改地址

function Update_address(){
	var id = domid
	var name = $("#contacts").val();
	var phone = $("#phone").val();
	var address = $("#address").val();
	var is_defaut= $("#default").html()
	switch (is_defaut) {
		case "默认:是":
		is_defaut=1;
		
		break;
		case "默认:否":
		is_defaut=0;
		$("#default").html("默认:否")
		break;
	}

	var radnum = RndNum(8);
	var ajaxdata = {
		"memberid":userlocal.memberid,
	    "id": id,
	    "name":name,
	    "phone":phone,
	    "address":address,
	    "div":tag,
	    "is_defaut":is_defaut,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
		"memberid":userlocal.memberid,
	     "id": id,
	    "name":name,
	    "phone":phone,
	    "address":address,
	    "div":tag,
	    "is_defaut":is_defaut,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'Member/MemberUpdateAddress.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	    	var htmldata=data.data
	    	var html="";
	        if (data.status == 1) {
				mui.alert("修改成功","",function(){location.reload() });
				
			 
	        } else {
	            mui.toast(data.msg);
	        }
	    },
	    error: function () {
	        console.log("请求失败！");
	    }
	})
}


//删除地址

function Delete_address(id){
	
	var radnum = RndNum(8);
	var ajaxdata = {
	    "id": id,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
	    "id": id,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}

	var btnArray = ['否', '是'];
	  mui.confirm('确认,删除地址？', '', btnArray, function(e) 
	  {
	      if (e.index == 1) 
	      {
	          $.ajax({
	              type: "post",
	              url: server_ip + 'Member/MemberDeleteAddress.ashx',
	              data: ajaxsdata,
	              success: function (data) {
	              	var htmldata=data.data
	              	var html="";
	                  if (data.status == 1) {
	          			mui.toast("删除成功")
	          		 		location.reload()
	                  } else {
	                      mui.toast(data.msg);
	                  }
	              },
	              error: function () {
	                  console.log("请求失败！");
	              }
	          })
	      } 
	    
	  })

	
}



$(".add_popover").click(function(){
	
	$(".add_popover").hide()
	$(".setaddress").fadeOut()
})

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