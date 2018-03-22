var baseUrl="http://a18099.sanlogic.cn/";
var picUrl="http://a18090.sanlogic.cn/";
$('#operation_process_table').bootstrapTable({
    striped:true,
    classes:"table table-no-bordered",
    data: [{1:"栽培",2:"1",3:"1",4:"false",5:"2018-3-2",6:"false",7:"1111"}],
    columns: [
        {field: '1',title: '名称',align:"center"}, 
        {field: '2',title: '编号',align:"center"}, 
        // {field: '3',title: '排序',align:"center"},
        // {field: '4',title: '默认',align:"center"},
        // {field: '5',title: '创建时间',align:"center"}, 
        {field: '6',title: '有效',align:"center"},
        {field: '7',title: '备注',align:"center"},
    ],
    onClickRow:function(row,ele,field){
        console.log(row);
    }
});
$('#operation_field_table').bootstrapTable({
    striped:true,
    classes:"table table-no-bordered",
    data: [{1:"content",2:"1",3:"1",4:"false",5:"2018-3-2",6:"false",7:"1111"}],
    columns: [
        {field: '1',title: '字段名称',align:"center"}, 
        {field: '2',title: '字段类型',align:"center"}, 
        // {field: '3',title: '编码',align:"center"},
        // {field: '4',title: '排序',align:"center"},
        // {field: '5',title: '创建时间',align:"center"}, 
        {field: '6',title: '有效',align:"center"},
        {field: '7',title: '备注',align:"center"},
    ],
    onClickRow:function(row,ele,field){
        console.log(row);
    }
});

/*
*首页 search
*number 追溯号（可选）
*/
function searchIndex(number){
    var num=(number?number:$("#index #searchIndex").val());
    if(num==undefined){
        $.toast("请输入追溯号");
        return;
    }
    var ele=$("#index .content .timeLine");
    
    $.ajax({
        type: "get",
        url: baseUrl+'api/Origin/GetProgramByNumber?findNumber='+num,
        dataType: 'json',
        async: false,//同步
        success: function (data) {
            if(data.Response!=null){
                ele.find("h3").html("<a>"+data.Response.F_Name+"</a> - 追溯信息")
                ele.find("ul").html("");
                $.ajax({
                    type:"get",
                    url:baseUrl+'api/Origin/GetProgramChildList?programId='+data.Response.F_Id,
                    dataType:'json',
                    async:false,
                    success:function(data){
                        if(data.Response.length>0){
                            for(var i=0;i<data.Response.length;i++){
                                ele.find("ul").append('<li class="cls">'+
                                                        '<p class="date">'+data.Response[i].F_OperateTime.split("T")[0]+'</p>'+
                                                        '<p class="intro">'+data.Response[i].F_OperationName+'</p>'+
                                                        '<div class="more">'+
                                                          '<p>操作人：'+data.Response[i].F_OperateUserName+'</p>'+
                                                        '</div>'+
                                                      '</li>');
                                $.ajax({
                                    type:"get",
                                    url:baseUrl+'api/Origin/GetProgramChildDetail?childId='+data.Response[i].F_Id,
                                    dataType:'json',
                                    async:false,
                                    success:function(data){
                                        if(data.Response!=null){
                                            for(var i_detail=0;i_detail<data.Response.length;i_detail++){
                                                if(data.Response[i_detail].F_Type=="P"){
                                                    var eleHtml='<p><span>'+data.Response[i_detail].F_Name+'：</span><a data-picUrl="'+data.Response[i_detail].F_Value+'" onclick="viewImg(this)">查看附件</a>'
                                                }
                                                else{
                                                    var eleHtml='<p>'+data.Response[i_detail].F_Name+'：'+data.Response[i_detail].F_Value+'</p>';
                                                }
                                                ele.find("ul li").last().find(".more").append(eleHtml);
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        else{
                            ele.find("ul").html('<li class="cls"><p class="intro">未查到追溯信息</p></li>');
                            $.toast("未获取到追溯信息");
                        }
                        
                    }
                })
				$("#index .content").height();
                // alert("content height:"+$("#index .content").height()+" ,timeLine Height:"+$("#index .content .timeLine").height()+" ,ul height:"+$("#index .content .timeLine ul").height());
            }
            else{
                ele.find("h3").html("追溯信息")
                ele.find("ul").html('<li class="cls"><p class="intro">未获取到追溯信息</p></li>');
                $.toast("未获取到追溯信息");
            }
            
        }
    })
}

/*
*查看图片
*thiz 点击的a元素
*/
function viewImg(thiz){
    var pic=$(thiz).attr("data-picUrl").split(",");
    pic.pop();
    pic=pic.map(function(value){
        return value=picUrl+value;
    })
    var picList=$.photoBrowser({
        photos:pic
    })
    picList.open();
}

$(function(){
    //微信配置
    var pageUrl=window.location.href;
    $.ajax({
        type: "get",
        url: baseUrl+'api/WX/GetConfigInfo?url='+pageUrl,
        dataType: 'json',
        success:function(result){
            result=result.Response;
            wx.config({
                // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                debug: false,
                // 必填，公众号的唯一标识
                appId: result.appId,
                // 必填，生成签名的时间戳
                timestamp:""+result.timestamp,
                // 必填，生成签名的随机串
                nonceStr:result.nonceStr,
                 // 必填，签名，见附录1
                 signature:result.signature,
                 // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                 jsApiList : [ 'checkJsApi', 'scanQRCode' ]
             });
        }  
    })

    wx.error(function(res) {
        alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });

    wx.ready(function() {
        wx.checkJsApi({
             jsApiList : ['scanQRCode'],
             success : function(res) {

             }
        });

        //点击按钮扫描二维码
        document.querySelector('#qrscan').onclick = function() {
            wx.scanQRCode({
                needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success : function(res) {
                    var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                    searchIndex(result);
                }
            });
        };
    });
})

