// rem计算
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px';


//url传值公共函数
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
} 	

//部署到正式服务器时要改为正式服务器的ip图片地址
//var server_ip = "112.124.11.72:8080";	
var server_ip = "http://120.26.208.28:8088/";	


/*居中窗口jquery 开始*/	   
function popup(popupName,maskshow){
    var _scrollHeight = $(document).scrollTop(),//获取当前窗口距离页面顶部高度
    _windowHeight = $(window).height(),//获取当前窗口高度
    _windowWidth = $(window).width(),//获取当前窗口宽度
    _popupHeight = popupName.height(),//获取弹出层高度
    _popupWeight = popupName.width();//获取弹出层宽度
    _posiTop = (_windowHeight - _popupHeight)/2 + _scrollHeight;
    _posiLeft = (_windowWidth - _popupWeight)/2;
    popupName.css({"left": _posiLeft + "px","top":_posiTop + "px","display":"block"});//设置position
	
	 var document_height=$(document).height();
	$(maskshow).show().css("height",document_height);

}



function encrypt(my) {
	var you = eval(my)
	var they = [];
	var i = 0;
	$.each(you, function (index) {
	    if (you[index] || you[index]==0)
	    {
	        they[i] = index + '=' + you[index];
	        i++;
	    }
	})
	var thefirst = they.sort();
	var thelast = '';
	$.each(thefirst, function(index) {
		thelast += thefirst[index]+'&';
		if(index == thefirst.length - 1) {
			thelast += 'key=appdc9622f8c3f62f68';
		}
	})
	
	return hcx_md5(thelast.toLowerCase()).toUpperCase();
}

function RndNum(n){
  var rnd="";
  for(var i=0;i<n;i++)
     rnd+=Math.floor(Math.random()*10);
  return rnd;
}



	
	//手机号正则表达式
function checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
    }
    return true;
}
//本地储存用户数据
var userlocal=(function (){
	 if (localStorage.getItem("userdata")!= null) {
        return JSON.parse(localStorage.getItem("userdata"));
    }
})()

// 用户资料
var user_mea=(function (){
	 if (localStorage.getItem("user_message")!= null) {
        return JSON.parse(localStorage.getItem("user_message"));
    }
})()
// 退出登录返回主页
function IsLoing() {
	if (userlocal==null) {
		mui.toast("无账号信息")
		return;
	};
    var ue = localStorage.removeItem("userdata");//删除本地信息
    if (ue==null) {
    	mui.toast("退出成功")
    	setTimeout(function(){location.href = 'index.html';},2000)	
    };
}


// 判断是否有登录
function IsLoginUser() {
	mui.toast("aaa")
    if (userlocal == null) {
        mui.toast("请先登录！");
        return false;
    }
    return true
}


