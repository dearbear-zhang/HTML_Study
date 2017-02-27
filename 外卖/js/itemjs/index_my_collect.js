var refishmark = 0;

function collect(curr){

var pageSize =3
	var radnum = RndNum(8);
	var ajaxdata = {
	    "memberid": userlocal.memberid,
	    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
	    "pagesize":3,
	    "nonce_str": radnum,
	}
	var ajaxsdata = {
	    "memberid": userlocal.memberid,
	    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
	    "pagesize":3,
	    "nonce_str": radnum,
	    "sign": encrypt(ajaxdata)
	}
	$.ajax({
	    type: "post",
	    url: server_ip + 'Member/MemberCollectionList.ashx',
	    data: ajaxsdata,
	    success: function (data) {
	    	htmldata = data;
        var datamesg = htmldata.data;
        var total = htmldata.rownumber;
       
  	   if(datamesg.length <= 0) {
          myself.endPullUpToRefresh(true);
          return;
        }
        if(total <= pageSize) {
        refishmark = 1;
      }

            var html = "";
	        if (data.status == 1) {
	        	$.each(datamesg,function(index){
	        		this_index=index
  	        		html+='<li class="be-box box-p-j">'
        	        		+'<div class="merchant_l">'
                         +'<img src="images/coomon/merchant_01.jpg" alt="">'
                     +'</div>'
                     +'<div class="merchant_r">'
                         +'<h5>'+datamesg[index].cusname+'</h5>'
                         +'<p class="p1"><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx02.png" alt=""><img src="images/coomon/xx01.png" alt=""><span>月销量200单</span></p>'
                         +'<p class="p2"><span>起送￥'+datamesg[index].startprice+'</span>|<span>配送￥'+datamesg[index].deliverycost+'</span><em>830M 31分钟</em></p>'
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



 