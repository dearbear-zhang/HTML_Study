var refishmark = 0;

function collect(curr){

var pageSize =5
	var radnum = RndNum(8);
	var ajaxdata = {
	    "memberid": userlocal.memberid,
	    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
	    "pagesize":pageSize,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
	    "memberid": userlocal.memberid,
	    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
	    "pagesize":pageSize,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'Member/MemberCollectionList.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	    	htmldata = data;
        var DataList = htmldata.data;
        var total = htmldata.rownumber;
       console.log(DataList)
  	   if(DataList.length <= 0) {
          myself.endPullUpToRefresh(true);
          return;
        }
        if(total <= pageSize) {
        refishmark = 1;
      }

            var html = "";
	        if (data.status == 1) {
	        	localStorage.setItem("Dataall",JSON.stringify(data))
	        	 var photo; 
        	     $.each(DataList,function(index){
        	     		//下单时间拼接
        	     	  var time =DataList[index].addtime;
        	     	  var time1=time.substr(0,10);
        	     	  var time2=time.substr(11,5);
        	     	  var timeall=time1+'&nbsp;&nbsp;'+time2;

        	         if (DataList[index].logo==null) {
        	            photo = 'images/coomon/merchant_01.jpg'
        	         }else{photo = DataList[index].logo};  
        	         var tpl= JSON.stringify(DataList[index])
        	         html+='<li class="be-box box-p-j" onclick=link_details('+tpl+','+index+')>'
        	                   +'<div class="merchant_l">'
        	                        +'<img src="'+photo+'" alt="">'
        	                    +'</div>'
        	                    +'<div class="merchant_r">'
        	                        +'<h5>'+DataList[index].cusname+'</h5>'
        	                        +'<p class="p1"><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx01.png" alt=""><span>月销量'+DataList[index].monthlysales+'单</span></p>'
        	                        +'<p class="p2"><span>起送￥'+DataList[index].startprice+'</span><span>配送￥'+DataList[index].deliverycost+'</span></p><p><em>收藏时间：'+timeall+'</em></p>'
        	                        +'<div class="p5" id="activity'+DataList[index].customerid+'"></div>'
        	                    +'</div>'
        	                +'</li>'
        	                
        	                 
        	     })
        	$(".mui-table-view").append(html)
			  //新建收货地址

			 $('.merchant_l').click(function(){
			 	 mui.openWindow({
			             url:'index_details.html'
			         });
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



  // 商家详情页跳转
 function link_details(data,index){
     data=JSON.stringify(data)
     mui.openWindow({
           url:'index_details.html?data='+encodeURIComponent(data)+'&index='+index,
       });
 }