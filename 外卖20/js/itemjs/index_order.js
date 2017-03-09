IsLoginUser()//判断是否登录




function mesdetail(status) {

//用来判断屏幕高度然后显示几个pageSize
  var scroheight = $("#scroll1").height()//获取高度
  var scrolist = 108;//li 高度
  var pageheight = parseInt(scroheight)/parseInt(scrolist)//平均

  switch(status) {
    case '-1':
    curr = curr0;
    break;
    case 0:
    curr = curr1;
    break;
    case 1:
    curr = curr2;
    break;
    case 2:
    curr = curr3;
    break;

  }
  var statuss;
  var money = '';
  var logourl;
  var clickfunc;
  var data = {};
  var data2= {};
  var pageSize = parseInt(pageheight);
  

  switch(status) {
    case '-1':
    statuss = -1;
    break;
    case 0:
    statuss = 2;
    break;
    case 1:
    statuss = 3;
    break;
    case 2:
    statuss = 6;
    break;

  }
  var jsonData = JSON.stringify(data2);

  var radnum = RndNum(8);
  var ajaxdata = {
    "memberid":userlocal.memberid,
    "status":statuss,
    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
    "pagesize":pageSize,
    "nonce_str": radnum
  }
  var ajaxsdata = {
    "memberid":userlocal.memberid,
    "status":statuss,
    "startrownumber":((curr = curr == 0 ? 1 : curr) - 1) * pageSize,
    "pagesize":pageSize,
    "nonce_str": radnum,
    "sign": encrypt(ajaxdata)
  }


  $.ajax({
    type: "post",
    url: server_ip+"Customer/OrderList.ashx",
    data:ajaxsdata,
    success: function(rs) {
     
      switch(status) {
        case '-1':
        if(rs.data==""&& secondmark0 == 1) {
          endmark0 = 1;
          self.endPullUpToRefresh(true);
        }
        break;
        case 0:
        if(rs.data==""&& secondmark0 == 1) {
          endmark1 = 1;
          self.endPullUpToRefresh(true);
        }
        break;
        case 1:
        if(rs.data==""&& secondmark0 == 1) {
          endmark2 = 1;
          self.endPullUpToRefresh(true);
        }
        break;
        case 2:
        if(rs.data==""&& secondmark0 == 1) {
          endmark3 = 1;
          self.endPullUpToRefresh(true);
        }
        break;
      }

      if(rs.status==1) {
        var resultHtml = rs.data;
        var html = "";
        $.each(resultHtml, function(index) {

          var temdata = {}

          temdata.orderid = resultHtml[index].orderid//订单ID
          temdata.goodsname = resultHtml[index].goodsname//商品名
          temdata.status = resultHtml[index].status//状态
          temdata.logo = resultHtml[index].logo//店家LOGO
          temdata.shoperName = resultHtml[index].shoperName//店名
          temdata.toaddress = resultHtml[index].toaddress//配送地址
          temdata.deliverytime = resultHtml[index].deliverytime//配送时间
          temdata.ordercode = resultHtml[index].ordercode//订单号
          temdata.addtime = resultHtml[index].addtime//下单时间
          temdata.paytype = resultHtml[index].paytype//支付方式

          localStorage.setItem("temdat_all",JSON.stringify(resultHtml))
          
          
          switch(status) {
            case '-1':
            alldata0.push(temdata);
            break;
            case 0:
            alldata1.push(temdata);
            break;
            case 1:
            alldata2.push(temdata);
            break;
            case 2:
            alldata3.push(temdata);
            break;

          }


          var time =resultHtml[index].addtime;
          var time1=time.substr(0,10);
          var time2=time.substr(11,5);
          var timeall=time1+'&nbsp;&nbsp;'+time2;


          var sta=resultHtml[index].status
          switch(sta){
            case  0:
            sta ="未支付" ;
            break;
            case  1:
            sta ="已支付" ;
            break;
            case  2:
            sta ="未接单" ;
            break;
            case  3:
            sta ="已接单" ;
            break;
            case  4:
            sta ="做餐中" ;
            break;
            case  5:
            sta ="配送中" ;
            break;
            case  6:
            sta ="已完成" ;
            break;
            case  7:
            sta ="取消" ;
            break;
            case  8:
            sta ="申请退款中" ;
            break;
            case  9:
            sta ="已退款" ;
            break;

          }

          if (resultHtml[index].goodsname==null) {
            var goodsname="不知道吃的是什么"
          }else {goodsname=resultHtml[index].goodsname};
          
          html += '<li class="order_box be-box box-p-a" onclick="order_detail('+index+','+resultHtml[index].status+','+resultHtml[index].orderid+','+resultHtml[index].paytype+')">'
          html += '<div class="imgl"><img src="'+resultHtml[index].logo+'" alt=""></div>'
          html += '<div class="intror">'
          html += '<div class="inta be-box box-p-a"><h5 class="box-flex1">'+goodsname+'<time>'+timeall+'</time></h5><span>'+sta+'</span><p><img src="images/coomon/address_jt.png" alt=""></p></div>'
          html += '<div class="intb"><span>'+goodsname+'等<em>'+resultHtml[index].goodsqty+'</em>件商品</span><small>￥'+resultHtml[index].summarketcost+'</small></div></div></li>';

        })
switch(status) {
  case '-1':
  if(resultHtml.length < 5 && secondmark0 == 1) {
    endmark0 = 1;
    self.endPullUpToRefresh(true);
  }
  $(".mui-table-view:eq(0)").append(html);
  curr0++;
  secondmark0 = 1;
  break;
  case 0:
  if(resultHtml.length < 5 && secondmark1 == 1) {
    endmark1 = 1;
    self.endPullUpToRefresh(true);
  }
  $(".mui-table-view:eq(1)").append(html);
  curr1++;
  secondmark1 = 1;
  break;
  case 1:
  if(resultHtml.length < 5 && secondmark2 == 1) {
    endmark2 = 1;
    self.endPullUpToRefresh(true);
  }
  $(".mui-table-view:eq(2)").append(html);
  curr2++;
  secondmark2 = 1;
  break;
  case 2:
  if(resultHtml.length < 5 && secondmark3 == 1) {
    endmark3 = 1;
    self.endPullUpToRefresh(true);
  }
  $(".mui-table-view:eq(3)").append(html);
  curr3++;
  secondmark3 = 1;
  break;
}
}
},
error: function() {
  console.log("请求失败！");
  
}
})

}




  //  底部导航
  mui('.mui-bar-tab').on('tap', 'a', function(e) {
    if(this.querySelector('.mui-tab-label').innerHTML == '外卖'){
     mui.openWindow({
       url:'index.html',
       waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                  }
                });
   }
   if(this.querySelector('.mui-tab-label').innerHTML == '订单'){
     mui.openWindow({
       url:'index_order.html',
       waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                  }
                });
   }
   if(this.querySelector('.mui-tab-label').innerHTML == '我的'){
     mui.openWindow({
       url:'index_my.html',
       waiting: {
                    autoShow: true, //自动显示等待框，默认为true
                  }
                });
   }
 })

    // 订单状态跳转
    function order_detail(index,status,orderid,paytype){

      switch (status){
        case 0://未支付
        mui.openWindow({
          url:'index_payment.html?orderid='+orderid+'&paytype='+paytype,
        });
        break;
        case 1://已支付
        mui.openWindow({
          url:'index_order_details.html?index='+index,
        });
        break;
        case 2://未接单
        mui.openWindow({
          url:'index_order_details.html?index='+index,
        });
        break;
        case 3:
        mui.openWindow({
          url:'index_order_details.html?index='+index,
        });
        break;
      }

      
    }
    