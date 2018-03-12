// $(document).on("pageInit", function(e, pageId, $page) {
//   $.closePanel("#panel-left")
// });
// $(document).on("click", ".open-panel", function() {
//   $.openPanel("#panel-left");
// });
//这段代 主要是获取摄像头的视频流并显示在Video 签中    
var canvas=null,context=null,video=null;     
window.addEventListener("DOMContentLoaded", function ()  
{  
    try{  
        canvas = document.getElementById("canvas");  
        context = canvas.getContext("2d");  
        video = document.getElementById("video");  
          
        var videoObj = { "video": true,audio:false},  
        flag=true,  
        MediaErr = function (error)  
        {             
            flag=false;    
            if (error.PERMISSION_DENIED)  
            {  
                 alert('用户拒绝了浏览器请求媒体的权限', '提示');  
            } else if (error.NOT_SUPPORTED_ERROR) {  
                 alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');  
            } else if (error.MANDATORY_UNSATISFIED_ERROR) {  
                 alert('指定的媒体类型未接收到媒体流', '提示');  
            } else {  
                 alert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');  
            }  
        };  
        //获取媒体的兼容代码，目前只支持（Firefox,Chrome,Opera）  
        if (navigator.getUserMedia)  
        {  
            //qq浏览器不支持  
            if (navigator.userAgent.indexOf('MQQBrowser') > -1) {  
                 alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');  
                 return false;  
            }  
            navigator.getUserMedia(videoObj, function (stream) {  
                video.src = stream;                  
                video.play();        
            }, MediaErr);             
        }  
        else if(navigator.webkitGetUserMedia)  
        {  
           navigator.webkitGetUserMedia(videoObj, function (stream)  
           {            
             video.src = window.webkitURL.createObjectURL(stream);             
             video.play();             
            }, MediaErr);             
        }  
        else if (navigator.mozGetUserMedia)  
        {  
            navigator.mozGetUserMedia(videoObj, function (stream) {  
                 video.src = window.URL.createObjectURL(stream);  
                 video.play();  
            }, MediaErr);  
        }  
        else if (navigator.msGetUserMedia)  
        {   
             navigator.msGetUserMedia(videoObj, function (stream) {  
                $(document).scrollTop($(window).height());  
                video.src = window.URL.createObjectURL(stream);  
                video.play();  
             }, MediaErr);  
        }else{  
            alert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器');  
            return false;  
        }  
        if(flag){  
            //alert('为了获得更准确的测试结果，请尽量将二维码置于框中，然后进行拍摄、扫描。 请确保浏览器有权限使用摄像功能');  
        }  
         //这个是拍照按钮的事件，            
        $("#snap").click(function () {startPat();}).css('display','block');  
    }catch(e){        
        printHtml("浏览器不支持HTML5 CANVAS");         
    }   
}, false);  
      
//打印内容到页面        
function printHtml(content){  
    $(window.document.body).append(content+"<br/>");  
}  
//开始拍照  
function startPat(){  
    setTimeout(function(){//防止调用过快  
        if(context)  
        {  
            context.drawImage(video, 0, 0, 320, 320);       
            CatchCode();   
        }  
    },200);  
}   
//抓屏获取图像流，并上传到服务器        
function CatchCode() {          
    if(canvas!=null)  
    {    
        //以下开始编 数据     
        var imgData = canvas.toDataURL();   
		qrcode.decode(imgData);
    }  
}
function pageload(){
	qrcode.success = function (d) { alert('javascript读出的二维码信息为：' + d) };
	qrcode.error = function (d) { startPat() };
	//qrcode.callback = function (d, status) { alert('读取二维码信息' + (status == 1 ? '成功' : '失败') + '：' + d);  };
}

$("#my-input").calendar();

$(document).on("pageInit", function(e, pageId, $page) {
  setTimeout('$.closePanel()',0);
});