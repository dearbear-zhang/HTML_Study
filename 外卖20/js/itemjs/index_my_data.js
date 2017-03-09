$(document).ready(function(){
	my_message()
})



	FileUpload();

   function FileUpload() {
    window.onload = function () {
        var input = document.getElementById("file_input");
        var mypic = document.getElementById("mypic");
        if (typeof (FileReader) === 'undefined') {
            result.innerHTML = "抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！";
            input.setAttribute('disabled', 'disabled');
        } else {

              compressImg(this.result,200,function(data){//压缩完成后执行的callback

                   mypic.innerHTML= '<img src="'+data+'" alt="" id="my_infoImg" onclick="file_input.click()">' 

            });
            input.addEventListener('change', readFile, false);
        }
    }
}
function readFile() {
    if (this.files[0].size > 0) {
        uploadFile(this.files[0]);
    }
}
function uploadFile(_files) {
    var fd = new FormData();
    fd.append("file_input", _files);
    fd.append("memberid", userlocal.memberid);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.open("POST", server_ip+"Member/GetUpdatePhoto.ashx");//修改成自己的接口
    xhr.send(fd);
}
function uploadProgress(evt) {
    if (evt.lengthComputable) {
        var percentComplete = Math.round(evt.loaded * 100 / evt.total);
        // $(".upfile span").text('正在上传' + percentComplete.toString() + '%');
        // $(".upfile").show();
        if (percentComplete.toString()=='100') {
          
            setTimeout(function () {
                location.reload();
            }, 800)
        }
    }
    else {
        $(".upfile span").text('上传错误');
        setTimeout(function () {
            location.reload();
        }, 800)
    }
}
function uploadFailed(evt) {
    console.log(evt);
}



// 压缩
  function compressImg(imgData,maxHeight,onCompress){
      if(!imgData)return;
      onCompress = onCompress || function(){};
      maxHeight = maxHeight || 0;//默认最大高度200px
      var canvas = document.createElement('canvas');
      var img = new Image();
      img.onload = function(){ 
      if(img.height > maxHeight) {//按最大高度等比缩放
      img.width = 400; 
      img.height = maxHeight; 
      }
      var ctx = canvas.getContext("2d"); 
      ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
      //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上
      onCompress(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布

      };

      // 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
      img.src = imgData;
  }








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
		           	$("#my_infoImg").attr("src",htmldata.photo)
	
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

