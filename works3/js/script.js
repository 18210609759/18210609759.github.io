domReady(function(){
	// 拖拽照片墙
	;(function(){
		var oPicDrag = document.getElementById('pic-drag');
		var aLi = oPicDrag.getElementsByTagName('li');
		var oBtn = document.getElementById('drag-btn');
		var arr = [];
		var zIndex = 20;

		// 布局转化
		for(var i=0; i<aLi.length; i++){
			arr.push({
				'left' : aLi[i].offsetLeft,
				'top' : aLi[i].offsetTop
			});
		}
		for(var i=0; i<aLi.length; i++){
			aLi[i].style.position = 'absolute';
			aLi[i].style.left = arr[i].left + 'px';
			aLi[i].style.top = arr[i].top + 'px';
			aLi[i].style.margin = 0;
		}

		// 随机换位置
		oBtn.onclick = function() {
			arr.sort(function(){
				return Math.random()-0.5;
			});
			for(var i=0; i<aLi.length; i++) {
				move(aLi[i],{
					'left' : arr[i].left,
					'top' : arr[i].top
				});
			}
		}

		for(var i=0; i<aLi.length; i++){
			drag(aLi[i]);
			aLi[i].index = i;
		}
		// 拖拽
		function drag(obj){
			obj.onmousedown = function(ev){
				var oEvent = ev || event;
				var disX = oEvent.clientX - obj.offsetLeft;
				var disY = oEvent.clientY - obj.offsetTop;
				obj.style.zIndex = zIndex++;

				document.onmousemove = function(ev){
					var oEvent = ev || event;
					var l = oEvent.clientX - disX;
					var t = oEvent.clientY - disY;

					var oNear = findNear(obj);
					for(var i=0; i<aLi.length; i++){
						aLi[i].className = 'fl';
					}
					if(oNear){
						oNear.className = 'fl active';
					}

					obj.style.left = l + 'px';
					obj.style.top = t + 'px';
				}
				document.onmouseup = function(){
					var oNear = findNear(obj);
					if(oNear){
						move(oNear,{
							'left' : arr[obj.index].left,
							'top' : arr[obj.index].top
						});
						move(obj,{
							'left' : arr[oNear.index].left,
							'top' : arr[oNear.index].top
						});
						var car;
						car = oNear.index;
						oNear.index = obj.index;
						obj.index = car;
						oNear.className = '';
					}else{
						move(obj,{
							'left' : arr[obj.index].left,
							'top' : arr[obj.index].top
						});
					}

					document.onmousemove = null;
					document.onmouseup = null;
					obj.releaseCapture && obj.releaseCapture();
				}
				obj.setCapture && obj.setCapture();
				return false;
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
		// 求物体间距离
		function getDis(obj,obj2){
			var a = obj2.offsetLeft - obj.offsetLeft;
			var b = obj2.offsetTop - obj.offsetTop;
			return Math.sqrt(a*a+b*b);
		}
		// 找出碰撞的物体中距离最短的oNear
		function findNear(obj) {
			var iMin = 999999999999;
			var iMinIndex = -1;
			for(var i=0; i<aLi.length; i++) {
				if(obj == aLi[i])continue;
				if(collTest(obj,aLi[i])){
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
	})();

	// 无缝滚动
	;(function(){
		var oSlide = document.getElementById('slide');
		var oUl = oSlide.children[2];
		var aLi = oUl.children;
		var oNext = document.getElementById('next');
		var oPrev = document.getElementById('prev');
		var iNow = 1;

		oSlide.onmouseover = function(){
			oPrev.style.opacity = '1';
			oNext.style.opacity = '1';
		}
		oSlide.onmouseout = function(){
			oPrev.style.opacity = '0';
			oNext.style.opacity = '0';
		}

		oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';

		oNext.onclick = function(){
			iNow--;
			move(oUl,{
				left : -iNow * aLi[0].offsetWidth
			},{
				complete : function(){
					if(iNow == 0){
						iNow = aLi.length-2;
						oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
					}
				}
			});
		}
		oPrev.onclick = function(){
			iNow++;
			move(oUl,{
				left : -iNow * aLi[0].offsetWidth
			},{
				complete : function(){
					if(iNow == aLi.length-2){
						iNow = 0;
						oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
					}
				}
			});
		}
	})();

	// 图片轮换
	;(function(){

	})();

	// 分块运动
	;(function(){
		var oMove = document.getElementById('move');
		var R = 7;
		var C = 4;

		for(var c=0; c<C; c++){
			for(var r=0; r<R; r++){
				var oSpan = document.createElement('span');
				oMove.appendChild(oSpan);
				oSpan.style.width = oMove.offsetWidth/R + 'px';
				oSpan.style.height = oMove.offsetHeight/C + 'px';
				oSpan.style.position = 'absolute';
				oSpan.style.left = oMove.offsetWidth/R*r + 'px';
				oSpan.style.top = oMove.offsetHeight/C*c + 'px';
				oSpan.style.backgroundPosition = -oMove.offsetWidth/R*r+'px -'+oMove.offsetHeight/C*c+'px';
				oSpan.r = r;
				oSpan.c = c;
			}
		}

		var aSpan = oMove.children;
		var iNow = 0;
		var bSys = false;
		oMove.onclick = function() {
			if(bSys)return;
			bSys = true;
			oMove.style.backgroundImage = 'url(img/'+iNow%3+'.jpg)';
			iNow++;
			for(var i=0; i<aSpan.length; i++) {
				;(function(index){
					timer = setTimeout(function(){
						aSpan[index].style.backgroundImage = 'url(img/'+iNow%3+'.jpg)';
						aSpan[index].style.opacity = 0;
						move(aSpan[index],{
							'opacity' : 1
						});
						if(aSpan[index].r == R-1 && aSpan[index].c == C-1){
							bSys = false;
						}
					},150*(aSpan[index].r + aSpan[index].c));
				})(i);
			}
		}

	})();

	// iphone翻页效果
	;(function(){
		var oWrap = document.getElementById('wrap');
		var oUl = oWrap.getElementsByTagName('ul')[0];
		var aLi = oUl.children;
		var iNow = 0;

		oUl.onmousedown = function(ev) {
			var oEvent = ev || event;
			var disX = oEvent.clientX - oUl.offsetLeft;
			var down = oEvent.clientX;
			clearInterval(oUl.timer);
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				oUl.style.left = l + 'px';
			}
			document.onmouseup = function(ev) {
				var oEvent = ev || event;
				var up = oEvent.clientX;
				if(Math.abs(up-down) > 30){
					if(up > down){
						iNow++;
						if(iNow == 1){
							iNow = 0;
						}
						move(oUl,{
							'left' : iNow*aLi[0].offsetWidth
						},{'easing' : 'linear', 'duration' : '500'});
					}else{
						iNow--;
						if(iNow < -3){
							iNow = -3;
						}
						move(oUl,{
							'left' : iNow*aLi[0].offsetWidth
						},{'easing' : 'linear', 'duration' : '500'});
						
					}
				}else{
					move(oUl,{
						'left' : iNow*aLi[0].offsetWidth
					});
				}
				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}

	})();

	// 横向拖拽效果
	;(function(){
		var oBox = document.getElementById('slide-h');
		var oUl = oBox.children[0];
		var aLi = oUl.children;
		var aImg = oUl.getElementsByTagName('img');

		oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
		oUl.style.left = oBox.offsetWidth/2 - (2.5)*aLi[0].offsetWidth + 'px';
		toMove();

		for(var i=0; i<aLi.length; i++){
			var oSpan = document.createElement('span');
			aLi[i].appendChild(oSpan);
		}

		var aSpan = oUl.getElementsByTagName('span');
		// 拖拽
		oUl.onmousedown = function(ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX - oUl.offsetLeft;
			document.onmousemove = function(ev) {
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				if(l >= oBox.offsetWidth/2 - (.5)*aLi[0].offsetWidth){
					l = oBox.offsetWidth/2 - (.5)*aLi[0].offsetWidth;
				}
				if(l <= oBox.offsetWidth/2 - (aLi.length-1+.5)*aLi[0].offsetWidth){
					l = oBox.offsetWidth/2 - (aLi.length-1+.5)*aLi[0].offsetWidth;
				}
				toMove();
				oUl.style.left = l + 'px';
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}

		function toMove(){
			for(var i=0; i<aLi.length; i++){
				var L = Math.abs(oBox.offsetWidth/2 - aLi[0].offsetWidth/2 - oUl.offsetLeft -aLi[i].offsetLeft);
				var scale = (1-L/500).toFixed(2);
				if(scale <= 0.5){
					scale = 0.5;
				}
				aImg[i].style.width = 520*scale + 'px';
				aImg[i].style.height = 350*scale + 'px';
				aImg[i].style.marginLeft = -(520*scale-260)/2 + 'px';
				aImg[i].style.marginTop = -(350*scale-179)/2 + 'px';
				aLi[i].style.zIndex = scale*1000000000;
			}
		}

	})();

	// 手风琴效果
	;(function(){
		var oQin = document.getElementById('qin');
		var oUl = oQin.getElementsByTagName('ul')[0];
		var aLi = oQin.getElementsByTagName('li');
		var w = 50;

		for(var i=1; i<aLi.length; i++){
			aLi[i].style.left = oUl.offsetWidth - (aLi.length-i)*w + 'px';
		}

		for(var i=0; i<aLi.length; i++){
			aLi[i].index = i;
			aLi[i].onmouseover = function(){
				for(var j=0; j<aLi.length; j++){
					if(this.index >= j){
						move(aLi[j], {
							left: j * w
						})
					}else{
						move(aLi[j], {
							left: oUl.offsetWidth - (aLi.length-j)*w
						})
					}
				}
			}
		}
	})();
});