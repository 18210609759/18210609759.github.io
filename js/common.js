// 随机数函数
function rnd(n,m){
	return parseInt(Math.random()*(m-n)+n);
}

// domready
function domReady(fn) {
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			// 高级浏览器
			fn && fn();
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState == 'complete'){
				// 低版本浏览器
				fn && fn();
			}
		});
	}
}

// 运动函数
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
// iTarget 走到哪  
function move(obj,json,options) {
	// move(obj,name,iTarget,duration,easing,complete)
	// obj -> 元素
	// name -> 属性
	// iTarget -> 目标点
	// duration -> 时间
	// easing -> 运动类型
	// complete -> 回调函数
	// options{duration:  , easing: , complete}
	options = options || {};
	options.duration = options.duration || 1000;
	options.easing = options.easing || 'ease-out';
	var count = Math.floor(options.duration/30);
	var start = {};
	var dis = {};
	for(var name in json){
		start[name] = parseFloat(getStyle(obj,name));
		dis[name] = json[name] - start[name];
	}
	var n = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				// 匀速
				case 'linear' :
					var a = n/count;
					var cur = start[name]+dis[name]*a;
					break;
				// 加速
				case 'ease-in' :
					var a = n/count;
					var cur = start[name]+dis[name]*a*a*a;
					break;
				// 缓冲
				case 'ease-out' :
					var a = 1-n/count;
					var cur = start[name]+dis[name]*(1-a*a*a);
					break;
			}
			if(name == 'opacity'){
				obj.style[name] = cur;
				obj.style.filter = 'alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name] = cur + 'px';
			}
		}
		if(n >= count){
			clearInterval(obj.timer);
			options.complete && options.complete();
		}
	},30);
}

// 滚轮事件
function addEvnet(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
function addWheel(obj,fn){
	function wheel(ev){
		var oEvent = ev || event;
		var bDown = true;
		bDown = oEvent.wheelDelta?oEvent.wheelDelta < 0:bDown = oEvent.detail > 0;
		fn && fn(bDown);
		oEvent.preventDefault && oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox') != -1){
		obj.addEventListener('DOMMouseScroll',wheel,false);
	}else{
		addEvnet(obj,'mousewheel',wheel);
	}
}

// 查找数组中是否有此值
function findInArr(n,arr){
	for(var i=0; i<arr.length; i++){
		if(n == arr[i]){
			return true;
		}
	}
	return false;
}

// 通过class获取元素
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var arr = [];
		for(var i=0; i<aEle.length; i++){
			var tmp = aEle[i].className.split(' ');
			if(findInArr(sClass,tmp)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}

// 求div间的距离
function getDis(obj,obj2){
	var a = obj2.offsetLeft - obj.offsetLeft;
	var b = obj2.offsetTop - obj.offsetTop;
	return Math.sqrt(a*a+b*b);
}
// 求最小距离
function findNear(obj){
	var iMin = 9999999999;
	var iMinIndex = -1;
	for(var i=0; i<aLi.length; i++){
		if(obj == aLi[i])continue;
		if(collTest(obj.aLi[i])){
			var dis = getDis(obj,aLi[i]);
			if(dis < iMin){
				iMin = dis;
				iMinIndex = i;
			}
		}
	}
	if(iMinIndex == -1){
		return false;
	}else{
		return aLi[iMinIndex];
	}
}
// 碰撞检测
function collTest(obj,obj2){
	var l1 = obj.offsetLeft;
	var t1 = obj.offsetTop;
	var r1 = obj.offsetLeft + obj.offsetWidth;
	var b1 = obj.offsetTop + obj.offsetHeight;
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var r2 = obj2.offsetLeft + obj2.offsetWidth;
	var b2 = obj2.offsetTop + obj2.offsetHeight;
	if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
		return false;
	}else{
		return true;
	}
}

// 角度转弧度
function d2a(n){
	return n/180*Math.PI;
}

// 弧度转角度
function a2b(n){
	return n*180*Math.PI;
}

// 距离顶部距离
function getPos(obj) {
	var l = 0;
	var t = 0;
	if(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj = obj.offsetParent;
	}
	return {left:l, top:t};
}
