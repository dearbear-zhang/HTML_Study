/**
 * Created by BYPC006 on 2017/3/2.
 */
var key = "key=appdc9622f8c3f62f68";

function getSignParm(paramMap) {
    var i = 0;
    var change = [];
    $.each(paramMap, function (index) {
        if (paramMap[index]){
            change[i++] = index + '=' + paramMap[index];
        }
    });

    var data = change.sort();
    var stringBuffer = "";
    $.each(data, function (index) {
        stringBuffer += data[index]+'&';
        if (index == data.length-1){
            stringBuffer += key;
        }
    })
    return hcx_md5(stringBuffer.toLowerCase()).toUpperCase()
}