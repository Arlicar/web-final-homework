// Created by guoqy
//购物车的显示与隐藏
function showCar(){
	var shopCar = document.getElementsByClassName("dropdown")[0];
	var rightNav = document.getElementsByClassName("right_nav")[0];
	switch(shopCar.style.display){
		case "":
		case "none":
			shopCar.style.display = "block";
			rightNav.style.position = "relative";
			//下移热门推荐模块
			//rightNav.style.top = "100px";
			shopCar.innerHTML = loadCar();
			break;
		case "block":
			shopCar.style.display = "none";
			rightNav.style.position = "static";
			break;
	}
}

//定义一个商品对象
var goods={goodsSrc: null, goodsNum: 1};

//设置拖拽效果
function drag(e){
	e=e||event;
	e.dataTransfer.effectAllowed = "copy";
	//IE需通过服务器访问方式，FF、chrome支持本地方式进行访问
	e.dataTransfer.setData("text", e.target.src);			//IE兼容写法
	//e.dataTransfer.setData("text/plain", e.target.src);	//标准写法
}

//拖拽释放效果
function drop(e){
	//方式拖拽事件传播
	allowDrop(e);
	//从拖拽事件中获取数据
	var data=e.dataTransfer.getData("text");
	//e.target.id=="dropdown"，表示目标对象是div（dropdown）
	//e.target.parentNode.id=="dropdown"表示目标对象是dropdown的直接子元素UL
	//e.target.parentNode.parentNode.id=="dropdown" 表示目标对象是UL中的LI
	//e.target.parentNode.parentNode.parentNode.id=="dropdown"表示目标对是<a>元素
	//e.target.parentNode.parentNode.parentNode.parentNode.id=="dropdown"表示目标对象是<img>元素
	if(e.target.id=="dropdown" || e.target.parentNode.id=="dropdown" 
		|| e.target.parentNode.parentNode.id=="dropdown" 
		|| e.target.parentNode.parentNode.parentNode.id=="dropdown" 
		|| e.target.parentNode.parentNode.parentNode
			.parentNode.id=="dropdown"){
		//从localStorage中尝试根据Src读取数据
		var newGoods=readFromStorage(data);
		//如果localStorage中存在当前商品，则在原基础上加1
		if (newGoods!=null){
			for(var i=0; i<localStorage.length; i++){
				if(data==newGoods.goodsSrc) {
					newGoods.goodsNum+=1;
					goods=newGoods;
					break;
				}
			}
		}else{
			//如果localStorage中，没有该商品，创建一个新对象，且商品数量为1
			goods.goodsSrc=data;
			goods.goodsNum=1;
		}
		//把处理后的商品信息存储到localStorage
		localStorage.setItem(data, JSON.stringify(goods));
		//重新加载并刷新页面中的购物车
		document.getElementsByClassName("dropdown")[0].innerHTML=loadCar();
	}
}
//阻止被拖拽的图片在新窗口打开
function allowDrop(e){
	e.preventDefault();//通知浏览器不再执行事件相关的默认动作
	e.stopPropagation();//阻止事件冒
}
//根据key读取localStorage的值并封装成JSON
function readFromStorage(key){
	var jsonStr=localStorage.getItem(key);
	var newGoods=JSON.parse(jsonStr);
	return newGoods;
}

//加载购物车
function loadCar(){
	//localStorage不为空时，将购物车中的信息读出来并显示到页面中
	if(localStorage.length!=0){
		var ulObject=document.createElement("ul");
		ulObject.className="shop_pic";
		for(var i=0; i<localStorage.length; i++){
			var key=localStorage.key(i);
			goods=readFromStorage(key);
			if(goods!=null) {
				var liObject=document.createElement("li");
				liObject.innerHTML='<a href="#"><img src="'+goods.goodsSrc
				  +'" width="80px" height="96px"/></a><p>'+goods.goodsNum
				  +'件<a href="javascript:void(0)" 	onclick="delStorage(this)"><span class="orange floatr">删除</span></a></p>';
			}
			ulObject.appendChild(liObject);
		}
		return ulObject.outerHTML;
	}
	return "购物车还是空的，赶快加点东西吧~";
}

//从localStorage中删除某个元素
function delStorage(element){
	//获得被点击的<a>元素的对应的img标签的src属性
	var targetSrc=element.parentNode.parentNode.childNodes[0]
					.childNodes[0].src;
	//根据src属性读取localStorage中的商品
	var delGoods=readFromStorage(targetSrc);
	delGoods.goodsNum-=1;
	//如果商品数量等于0，则移除该商品
	if(delGoods.goodsNum==0){
		localStorage.removeItem(targetSrc);
	}else{
		//如果商品数量大于0，将修改后的信息保存到localStorage中
		localStorage.setItem(targetSrc,JSON.stringify(delGoods));
	}
	//删除成功后，重新加载并更新页面中的购物车
	document.getElementsByClassName("dropdown")[0].innerHTML=loadCar();
}

//窗口加载时，为允许拖拽的图片添加draggable属性和ondragstart事件
window.onload=function(){
	var pic_list=document.getElementsByClassName("pic_list")[0];
	var pic_list_div=pic_list.getElementsByTagName("div");
	for(var i=0;i<pic_list_div.length;i++){
		var image=pic_list_div[i].getElementsByTagName("img")[0];
		image.setAttribute("draggable",true);
		image.ondragstart=drag;
	}
}
