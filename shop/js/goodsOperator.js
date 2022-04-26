// Created by guoqy
//切换商品展示区中的图像
function changeGoodsImage(thumb) {
	//设置当前缩略图在商品展示区显示对应的大图
    var showGoodsPicture = document.getElementById("showGoodsPicture");   
    showGoodsPicture.src = thumb.src;
	//获取商品缩略图对应的li元素集合
    var goodsList = document.getElementById("goodsList");
	var items=goodsList.getElementsByTagName("li");
	//遍历li元素集合，将所有的图像边框颜色改为默认样式
    for (var i = 0; i < items.length; i++) {
		var thumbImages=items[i].getElementsByTagName("img");
		thumbImages[0].style.borderColor = "";
    }
	//设置当前缩略图为选中状态
    thumb.style.borderColor = "red";
}
//Tab标签的切换
function changeGoodsInfo(obj){
	var currentSelect=0;
	var goodsTabs=document.getElementById("goodsTabs");
	//获得商品的信息标签（商品详情、商品评价、成交记录）
	var goodsTitles=goodsTabs.getElementsByTagName("li");
	for(var i=0;i<goodsTitles.length;i++){
		goodsTitles[i].className="";
		//判断当前元素对应的位置
		if(obj==goodsTitles[i]){
			currentSelect=i;
		}
	}
	//当前标签处于激活状态
	obj.className="tab_active";
	//设置标签对应的内容部分
	var middleDiv=document.getElementsByClassName("middle");
	var tabCotents=middleDiv[0].getElementsByTagName("article");
	for(var j=0;j<tabCotents.length;j++){
		if(currentSelect==j){
			tabCotents[j].className="tab_content"+(j);
		}else{
			tabCotents[j].className="none tab_content"+(j);
		}
		console.log(tabCotents[j].className);
	}
}


/*放大镜效果部分*/
//获取元素的纵坐标（相对于body）
function getTop(e){
	var offset=e.offsetTop;
	if (e.offsetParent!=null){
		offset+=getTop(e.offsetParent);
	}
	return offset;
}
//获取元素的横坐标（相对于body）
function getLeft(e){
	var offset=e.offsetLeft;
	if(e.offsetParent!=null){
		offset+=getLeft(e.offsetParent);
	}
	return offset;
}

function zoomPicture() {
	var box=document.getElementById("box");
	var showGoodsPicture=document.getElementById("showGoodsPicture");
	var canvas=document.getElementById("canvas");
	var shade=document.getElementById("shade");
	if(showGoodsPicture==null) {
		return false;
	}
	//绑定鼠标移出所触发的事件
	box.onmouseout=function(){
		shade.style.display="none";
		canvas.style.display="none";
		document.body.style.cursor="default";
	};
	//绑定鼠标移动所触发的事件
	box.onmousemove =function(ev){
		//设定鼠标的样式
		document.body.style.cursor="move";
		var box = document.getElementById("box");
		var shadeX, shadeY;
		//获取box对象的左侧到浏览器窗口左侧的距离
		var boxX=getLeft(box);
		//获取box对象的顶部到浏览器窗口顶部的距离
		var boxY=getTop(box);
		//计算阴影区域的左上角的x坐标
		shadeX=ev.pageX-boxX-100;
		//计算阴影区域的左上角的y坐标
		shadeY=ev.pageY-boxY-100;
		//防止阴影区域移到图片之外
		if(shadeX<0){
			shadeX=0;
		}
		else if(shadeX>200){
			shadeX=200;
		}
		if(shadeY<0){
			shadeY=0;
		}
		else if(shadeY>200){
			shadeY=200;
		}
		//使用Canvas绘制遮罩区域，并进行放大
		var context=canvas.getContext("2d");
		shade.style.display="block";
		shade.style.left=shadeX+"px";
		shade.style.top=shadeY+"px";
		canvas.style.display="inline";
		context.clearRect(0, 0, 400, 400);
		var image=new Image();
		image.src=showGoodsPicture.src;
		context.drawImage(image, (shade.offsetLeft) * 2, (shade.offsetTop) * 2, 
				400, 400, 0, 0, 400, 400);
	}
}

//在onload事件中调用zoomPicture()函数
window.onload=function(){
	//默认第一个缩略图为选中状态
	var goodsList=document.getElementById("goodsList");
	var thumb_images=goodsList.getElementsByTagName("li")[0]
		.getElementsByTagName("img");
	changeGoodsImage(thumb_images[0]);
	zoomPicture();
};
