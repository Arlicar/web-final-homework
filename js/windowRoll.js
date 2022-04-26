// 窗体滚动
function animate(obj,target,callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var step = (target - window.pageYOffset)/10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if(window.pageYOffset == target){
            //停止动画 本质是停止定时器
            clearInterval(obj.timer);
            if(callback){
                callback();
            }
        }
        window.scroll(0,window.pageYOffset + step )
    },15);
}