$(document).ready(function(){
	my_message()
})


// 获取会员资料
function my_message(){
	if (userlocal!=null) {
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
		    url: server_ip + 'member/GetMemberMessage.ashx',
		    data: ajaxsdata,
		    success: function (data) {
		    	var htmldata=data.data[0]
		        if (data.status == 1) {
		        	// $(".img").attr("src",htmldata.photo)
		           	$(".name").html(htmldata.membername)
		           	$(".phone").html(htmldata.phone)

	
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

//上传头像start
var picstr=false;
var mypic = document.getElementById("mypic"); //获取显示图片的div元素
var input = document.getElementById("file_input"); //获取选择图片的input元素

      //这边是判断本浏览器是否支持这个API。
if(typeof FileReader==='undefined'){ 
    mypic.innerHTML = "抱歉，你的浏览器不支持 FileReader"; 
    input.setAttribute('disabled','disabled'); 
}else{ 
    input.addEventListener('change',readFile,false); //如果支持就监听改变事件，一旦改变了就运行readFile函数。
} 

      
function readFile(){ 
    var file = this.files[0]; //获取file对象
    //判断file的类型是不是图片类型。
    if(!/image\/\w+/.test(file.type)){ 
        alert("文件必须为图片！"); 
        return false; 
    } 
    
    var reader = new FileReader(); //声明一个FileReader实例
    reader.readAsDataURL(file); //调用readAsDataURL方法来读取选中的图像文件
    //最后在onload事件中，获取到成功读取的文件内容，并以插入一个img节点的方式显示选中的图片
    reader.onload = function(e){ 
        mypic.innerHTML = '<img src="'+this.result+'" alt="" id="my_infoImg" onclick="file_input.click()">' 
        console.log(this.result)
    } 
	picstr=true;
}