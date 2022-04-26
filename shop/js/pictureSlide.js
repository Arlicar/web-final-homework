// Created by guoqy
// 图片轮播效果
//用于标识当前轮播到第几幅图片
var sign = 2;

var showget="<div class=\" alert alert-warning alert-dismissible fade show\" role=\"alert\">More info goto the\n" +
    "                    <strong><a  target=\"view_window\" href=\"http://yjl.cool:9901/\">seven.cool</a></strong> You can learn more html.\n" +
    "                    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
    "                        <span aria-hidden=\"true\">&times;</span>\n" +
    "                    </button>\n" +
    "                </div>";

//显示轮播图片
function showPic(index) {
    //轮播效果，中当前显示的图片
    var focusImg = document.getElementById("focusImg");
    //图片路径
    var imgSrc = "images/index/pic";
    imgSrc = imgSrc + index + ".jpg";
    //更换轮播图片
    focusImg.src = imgSrc;    
}



//对轮播图片进行计算处理
function setCurrentPic() {
    showPic(sign);
    sign++;
    if (sign == 4) {
        sign = 1;
    }
}

//窗体加载时，指定显示的图片
window.onload = function () {
    showPic(1);
}

//设置定时器
window.setInterval("setCurrentPic()", 1000);
