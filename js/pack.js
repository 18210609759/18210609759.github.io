//JS 封装函数
//获取非行间样式
//获取的样式有优先级问题  谁生效谁获取
function getStyle(obj,name){
	if(obj.currentStyle){
		return obj.currentStyle[name];
	}else{
		return getComputedStyle(obj,false)[name];
	}
}
//return obj.currentStyle||getComputedStyle(obj,false)[name];
//随机数
function getRandom(n,m){
	return parseInt(Math.random()*(m-n)+n);
}
//查找数组里面是否有重复数字
function findInArr(n,arr){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==n){
			return true;
		}
	}
	return false;
}
//封装为时钟的函数
function toDou(n){//toDouble
	if(n<10){
		return '0'+n;
	}else{
		return ''+n;
	}
	//简写
	//return n<10?'0'+n:''+n;
}
//利用arguments封装数组求和
function sum(){
	var result=0;
	for(var i=0;i<arguments.length;i++){
		result+=arguments[i];
	}
	return result;
}
//利用json设置样式
function setStyle(){
	var obj=arguments[0];
	if(arguments.length==3){		
		var name=arguments[1];
		var value=arguments[2];
		obj.style[name]=value;
	}else if(arguments.length==2){		
		var json=arguments[1];
		for(name in json){
			obj.style[name]=json[name];
		}
	}
	//页面里设置样式 setStyle(obj,{'width':'100px','height':'100px'})
}
//获取className且兼容的封装
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle=oParent.getElementsByTagName('*');
		var arr=[];
		//循环
		for(var i=0;i<aEle.length;i++){
			//将所有classname名字切割成字符串
			var tmp=aEle[i].className.split(' ');
			//判断如果数组里面有字符串就给他添加属性
			if(findInArr('name',tmp)){
				arr.push(aEle[i]);
			}
		}
		return arr;
	}
}
//原生数组排序封装从小到大
function findMin(arr,start){
	var iMin=arr[start];
	var iMinIndex=start;
	for(var i=start;i<arr.length;i++){
		if(arr[i]<iMin){
			iMin=arr[i];
			iMinIndex=i			
		}
	}
	return iMinIndex;
}
//原生数组排序封装从大到小
function findMax(arr,start){
	var iMax=arr[start];
	var iMaxIndex=start;
	for(var i=start;i<arr.length;i++){
		if(arr[i]>iMax){
			iMax=arr[i];
			iMaxIndex=i;		
		}
	}
	return iMaxIndex;
}
//判断字符字节数
function getByLen(str,type){
	var result=0;
	//判断是不是中文  0x4e00  0x9fa5
	for( var i=0;i<str.length;i++){
		if(str.charCodeAt(i)>0x4e00&&str.charCodeAt(i)<0x9fa5){
			if(type=='utf-8'){
				result+=3;
			}else{
				result+=2;
			}
		}else{
			resultr+=1;
		}
	}
	return result;
}
//获得绝对距离的offset
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;	
	}
	return {left:l,top:t};
}
//封装绑定事件
function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}
//事件解绑封装
function removeEvent(obj,sEv,fn){
	if(obj.removeEventListener){
		obj.removeEventListener(sEv,fn,false);
	}else{
		obj.detachEvent('on'+sEv,fn);
	}
}
//拖拽封装
function drag(obj){			
	obj.onmousedown = function(ev){
		var oEv = ev || event;
		var disX = oEv.clientX - obj.offsetLeft;
		var disY = oEv.clientY - obj.offsetTop;	
		document.onmousemove = function(ev){
			var oEv = ev || event;
			obj.style.left = (oEv.clientX - disX) +'px';
			obj.style.top = (oEv.clientY - disY)+'px';
		}
		document.onmouseup = function(){
			document.onmouseup = document.onmousemove = null;
			obj.releaseCapture&&obj.releaseCapture();						
		}		           
		obj.setCapture&&obj.setCapture();
		return false;
	}	
	return obj;
}
//鼠标滚轮事件封装
function addWheel(obj,fn){
	function wheel(ev){
		var oEv=ev||event;
		var bDown=true;				
		bDown=oEv.wheelDelta?oEv.wheelDelta<0:oEv.detail>0;
		fn&&fn(bDown);
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		obj.addEventListener('DOMMouseScroll',wheel,false)
	}else{
		addEvent(obj,'mousewheel',wheel)
	}
}
//封装DOMready、
function domReady(fn){
	if(document.addEventListener){
		document.addEventListener('DOMContentLoaded',function(){
			fn&&fn();
		},false);
	}else{
		document.attachEvent('onreadystatechange',function(){
			if(document.readyState=='complete'){
				fn&&fn();
			}
		})
	}
}
//运动封装
function move(obj,json,options){
	//obj谁动  duration时间  complete函数   用来回调
	//匀速linear  加速 ease-in  缓冲 ease-out
	var options=options||{};
	options.duration=options.duration||3000;
	options.easing=options.easing||'ease-out';
	var count=Math.floor(options.duration/30); //总次数
	var start={};
	var s={};
	for(var name in json){
		start[name]=parseFloat(getStyle(obj,name));//getStyle是字符串  需要转化
		s[name]=json[name]-start[name];//总距离
	}				
	var n=0;//次数初始化
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var name in json){
			switch(options.easing){
				case 'linear':
					var a=n/count;
					var cur=start[name]+s[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+s[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+s[name]*(1-a*a*a);
					break;
			}
			var cur=start[name]+n*s[name]/count;
			if(name=='opacity'){
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}else{
				obj.style[name]=cur+'px';
			}	
		}									
		if(n>=count){
			clearInterval(obj.timer);
			//运动完要干嘛   传参 回调
			options.complete&&options.complete();
		}
	},30)
}
//Ajax封装
/*function ajax(url,fnSucc,fnFail){
	//创建ajax对象
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		//IE 6-8
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//连接后台
	oAjax.open('get',url,true);//true  是否异步
	//发送
	oAjax.send();
	//接收
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			//0 oAjax对象创建成功 1 建立与后台的连接 2 接收数据 3 接收数据完成 4 完成
			//200 完成 304 重定向(直接从缓存里面拿出来的东西)  403 请求成功但是被拒绝  404 请求失败
			//414 url太大   500后台代码 502服务挂掉
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				fnSucc(oAjax.responseText);
			}else{
				alert(oAjax.status);
			}
		}else{			
			fnFail&&fnFail(oAjax.status);
		}
	};
}*/
//把json转化为字符串
function toStr(data){
	var arr=[];
	data.t=Math.random();
	for(var name in json){		
		arr.push(name+'='+data[name]);
	}
	return arr.join('&');
}
//ajax库封装
function ajax(json){
	json=json||{};
	json.data=json.data||{};
	json.type=json.type||'get';
	json.time=json.time||2000;
	if(!json.url)return;
	var timer=null;
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('get',json.url+'?'+toStr(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('post',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(toStr(json.data));
			break;
	}
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status>=200&&oAjax.status<300||oAjax.status==304){
				json.fnSucc&&json.fnSucc(oAjax.responseText);
			}else{
				json.fnFail&&json.fnFail(oAjax.status);
			}
			clearTimeout(timer);
		}		
	}
	timer=setTimeout(function(){
		alert('请求超时');
		oAjax.onreadystatechange=null;
	},json.time);
}
//jsonp封装
function jsonp(json){
	json=json||{};
	json.data=json.data||{};
	json.Name=json.Name||'cb';
	if(!json.url)return;
	var fnName='show'+Math.random();
	fnName=fnName.replace('.','');
	window[fnName]=function(json1){
		json.fnSucc&&json.fnSucc(json1);
	}
	var arr=[];
	json.data[json.Name]=fnName;
	for(var name in json){
		arr.push(name+'='+json.data[name]);
	}
	var oS=document.createElement('script');
	oS.src=json.url+'?'+arr.join('&');
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
}
//表单输入验证
function form(id){
	var oForm=document.getElementById(id);
	var aInput=oForm.getElementsByTagName("input");
	var re={
		email:/^\w+@[a-z0-9]+(\.[a-z]{2,6}){1,2}$/,
		tel:/^(0\d{2,3}-)?[1-9]\d{6,7}$/,
		age:/^(1[89]|[2-9]\d|100)$/,
		zgName:/^[\u4e00-\u9fa5]{2,6}$/
	};
	function check(obj,re){
		if(obj.value){
			if(re.test(obj.value)){
				obj.className='ok';
				obj.parentNode.children[1].innerHTML='';
				return true;
			}else{
				obj.className='error';
				obj.parentNode.children[1].innerHTML=obj.getAttribute('name1');
				return false;
			}
			
		}else{
			obj.className='error';
			obj.parentNode.children[1].innerHTML='您还没有输入内容';
			return false;
		}
	}
	oForm.onsubmit=function(){
		var error=true;
		for(var i=0;i<aInput.length;i++){
			var reg=re[aInput[i].name];
			if(reg){
				if(!check(aInput[i],reg)){
					error=false;
				}							
			}
		}
		return error;
	}
	for(var i=0;i<aInput.length;i++){
		;(function(index){
			var reg=re[aInput[index].name];
			if(reg){
				aInput[i].onblur=function(){
					check(this,reg);
				}
			}
		})(i);					
	}
	oForm.onreset=function(){
		var t=confirm('您打算重置吗？');
		if(t){						
			for(var i=0;i<aInput.length-2;i++){
				aInput[i].className='';
				aInput[i].parentNode.children[1].innerHTML='';
			}
		}else{
			return false;
		}
	}
}
// class有无 添加及删除
function hasClass(obj,sClass){
	var re=new RegExp('\\b'+sClass+'\\b');
	return re.test(obj.className);
}
function addClass(obj,sClass){
	if(obj.className){
		if(!hasClass(obj,sClass)){
			obj.className+=' '+sClass;
		}
	}else{
		obj.className=sClass;
	}
}
function removeClass(obj,sClass){
	var re=new RegExp('\\b'+sClass+'\\b');
	if(hasClass(obj,sClass)){
		obj.className=obj.className.replace(re,'').replace(/^\s+|\s+$/,'').replace(/\s+/g,' ');
	}
}
//弹性运动封装
function elastic(obj,iTarget){
	var timer=null;
    var iSpeed=0;
    var iL=0;
    timer=setInterval(function(){
    	iSpeed+=(iTarget-obj.offsetLeft)/5;
    	iSpeed*=.7;    
    	iL+=iSpeed;               	
        obj.style.left=Math.round(iL)+Math.round(iSpeed)+'px'
        if(Math.round(iL)==300&&Math.abs(iSpeed)<.5){
        	clearInterval(timer);
        }
    },30);
}
//首字母大写
function toUpper(s) {  
    return s.toLowerCase().replace(/\b([\w|']+)\b/g, function(word) {   
        return word.replace(word.charAt(0), word.charAt(0).toUpperCase());  
    });  
}  
//判断参数里是否都是数字
function testNumber(){
	for(var i=0;i<arguments.length;i++){
		if(typeof arguments[i]!='number'){
			return false;
		}
	}
	return true;
}










