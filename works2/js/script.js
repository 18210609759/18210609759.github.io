domReady(function(){
	;(function(){
		var aWork = document.querySelectorAll('.my-works');

		// 获取物体距离顶部高度
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

		window.onload = window.onscroll = function(){
			var scrollTop = document.body.scrollTop;
			var winH = document.documentElement.clientHeight;
			var scrollBottom = scrollTop + winH;

			for(var i=0; i<aWork.length; i++){
				aWork[i].style.opacity = 1;
				var aWorkH = getPos(aWork[i].children[0]).top;
				if(aWorkH < scrollBottom){
					aWork[i].classList.add('animated','fadeInDown');
				}
			}
		}
	})();

	// work-1  canvas画板
	;(function(){
		var oC = document.querySelector('#c1');
		var gd = oC.getContext('2d');

		gd.beginPath();
		gd.strokeStyle = '#75c8b9';
		gd.lineWidth = '3';
		oC.onmousedown = function(ev){
			gd.moveTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);

			document.onmousemove = function(ev){
				gd.clearRect(0,0,oC.width,oC.height);
				gd.lineTo(ev.pageX-oC.offsetLeft,ev.pageY-oC.offsetTop);
				gd.stroke();
			}
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
			ev.preventDefault();
		}
	})();

	// work-2 3d盒子
	;(function(){
		var oWork2 = document.querySelector('.work-2');
		var oBox = document.getElementById('box-3d');
		var x = 0;
		var y = 0;
		var lastX = 0;
		var lastY = 0;
		var speedX = 0;
		var speedY = 0;

		oBox.onmousedown = function(ev){
			var disX = ev.pageX - y;
			var disY = ev.pageY - x;

			document.onmousemove = function(ev){
				y = ev.pageX - disX;
				x = ev.pageY - disY;

				oBox.style.transform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';

				// 求速度
				speedX = x - lastX;
				speedY = y - lastY;
				lastX = x;
				lastY = y;
			}
			document.onmouseup = function(){
				oBox.timer = setInterval(function(){
					x+=speedX;
					y+=speedY;

					speedX*=.9;
					speedY*=.9;

					if(Math.abs(speedX) < 1){
						speedX = 0;
					}
					if(Math.abs(speedY) < 1){
						speedY = 0;
					}
					if(speedX == 0&&speedY == 0){
						clearInterval(oBox.timer);
					}

					oBox.style.transform = 'perspective(800px) rotateX('+-x/5+'deg) rotateY('+y/5+'deg)';
				},30);

				document.onmousemove = null;
				document.onmouseup = null;
			}
			ev.preventDefault();
		}
	})();

	// 文字倒影效果
	;(function(){
		var oT = document.getElementById('txt-shadow');

		document.onmousemove = function(ev){
			var x = ev.pageX - oT.offsetLeft - oT.offsetWidth/2;
			var y = ev.pageY - oT.offsetTop - oT.offsetHeight/2;
			var dis = Math.sqrt(x*x+y*y);
			
			oT.style.textShadow = -x/4+'px '+-y/4+'px '+dis/20+'px #000';
		}
	})();

	// css3时钟
	;(function(){
		var oClock = document.getElementById('clock');
		var oH = oClock.querySelector('.hour');
		var oM = oClock.querySelector('.min');
		var oS = oClock.querySelector('.sec');
		var timer = null;

		for(var i=0; i<60; i++){
			if(i%3 == 0){
				if(i%5 == 0){
					var oSpan = document.createElement('span');
					oSpan.style.transform = 'rotate('+i*6+'deg)';
					oSpan.innerHTML = '<p>'+(i==0?12:i/5)+'</p>';
					oSpan.children[0].style.transform = 'rotate('+(-i*6)+'deg)';
					oSpan.children[0].style.marginTop = '4px';
					oSpan.children[0].style.marginLeft = '-15px';
				}
				oClock.appendChild(oSpan);
			}	
		}

		timer = setInterval(time,30);
		time();

		function time(){
			var oDate = new Date();
			var h = oDate.getHours();
			var m = oDate.getMinutes();
			var s = oDate.getSeconds();
			var ms = oDate.getMilliseconds();

			oH.style.transform = 'rotate('+(h*30+m/60*30)+'deg)';
			oM.style.transform = 'rotate('+(m*6+s/60*6)+'deg)';
			oS.style.transform = 'rotate('+(s*6+ms/1000*6)+'deg)';
		}
	})();

	// 翻页效果
	// ;(function(){
	// 	var oTurn = document.getElementById('turning');

	// 	// 翻页
	// 	;(function(){
	// 		var oPage = document.createElement('div');
	// 		oPage.className = 'page1';
	// 		oPage.innerHTML = '<span id="front">前面</span>'
	// 						+'<span id="back">后面</span>';
	// 		oTurn.appendChild(oPage);
	// 	})();
	// })();

	// 旋转合并照片墙
	;(function(){
		var oCircu = document.getElementById('circu');
		var oNext = document.getElementById('cir-next');
		var oPrev = document.getElementById('cir-prev');
		var C = 6;
		var R = 4;

		for(var c=0; c<C; c++){
			for(var r=0; r<R; r++){
				var oDiv = document.createElement('div');
				oDiv.innerHTML = '<span></span>';
				oDiv.style.width = oCircu.offsetWidth/C + 'px';
				oDiv.style.height = oCircu.offsetHeight/R + 'px';
				oDiv.style.position = 'absolute';
				oDiv.style.left = oCircu.offsetWidth/C*c + 'px';
				oDiv.style.top = oCircu.offsetHeight/R*r + 'px';
				oDiv.style.backgroundPosition = -oCircu.offsetWidth/C*c+'px -'+oCircu.offsetHeight/R*r+'px';
				oCircu.appendChild(oDiv);
			}
		}

		// span背景图
		var aSpan = oCircu.querySelectorAll('span');
		var clicked = true;
		for(var i=0; i<aSpan.length; i++){
			aSpan[i].style.background = 'url(img/works7/'+(i+1)+'.jpg)';
		}

		var aDiv = oCircu.querySelectorAll('div');
		// 点击散开
		oCircu.onclick = function(){
			if(clicked){
				for(var i=0; i<aDiv.length; i++){
					aDiv[i].style.transition = '1s all ease';
					aSpan[i].style.transition = '1s all ease';
					// 求每个div距离中心的距离
					var x = aDiv[i].offsetLeft + aDiv[i].offsetWidth/2 - oCircu.offsetWidth/2;
					var y = aDiv[i].offsetTop + aDiv[i].offsetHeight/2 - oCircu.offsetHeight/2;

					aDiv[i].style.transform = 'rotateZ('+rnd(-20,20)+'deg) translate('+x/4+'px,'+y/4+'px)';
					aDiv[i].style.border = '4px solid #fff';
					aSpan[i].style.opacity = 1;
					oNext.style.display = oPrev.style.display = 'none';
				}
			}else{
				for(var i=0; i<aDiv.length; i++){
					aDiv[i].style.transition = '1s all ease';
					aSpan[i].style.transition = '1s all ease';
					// 求每个div距离中心的距离
					var x = aDiv[i].offsetLeft + aDiv[i].offsetWidth/2 - oCircu.offsetWidth/2;
					var y = aDiv[i].offsetTop + aDiv[i].offsetHeight/2 - oCircu.offsetHeight/2;

					aDiv[i].style.transform = 'rotateZ(0deg) translate(0px,0px)';
					aDiv[i].style.border = '1px solid #fff';
					aSpan[i].style.opacity = 0;
					oNext.style.display = oPrev.style.display = 'block';
				}
			}
			clicked=!clicked;
		}

		// 上一张、下一张效果
		var iNow = 4;
		var bReady = true;
		oNext.onclick = function(){
			if(!bReady)return;
			bReady = false;
			iNow++;
			for(var i=0; i<aDiv.length; i++){
				aDiv[i].style.transition = '1s all ease';
				aDiv[i].style.backgroundImage = 'url(img/works7/img/'+iNow%24+'.jpg)';
			}
			tab();
		}
		oPrev.onclick = function(){
			if(!bReady)return;
			bReady = false;
			iNow--;
			if(iNow == 0){
				iNow = 23;
			}
			for(var i=0; i<aDiv.length; i++){
				aDiv[i].style.transition = '1s all ease';
				aDiv[i].style.backgroundImage = 'url(img/works7/img/'+iNow%24+'.jpg)';
			}
			tab();
		}
		function tab(){
			aDiv[0].addEventListener('transitionend',function(){
				bReady = true;
			},false);
		}
	})();

	// canvas柱状图
	;(function(){
		var oC = document.getElementById('c2');
		var gd = oC.getContext('2d');
		var arr = [24,12,20,35,40,16,25,18];
		var aHeight = [];

		// 求最大高度
		var iMax = Math.max.apply(null,arr);
		// 求总数
		var sum = 0;
		for(var i=0; i<arr.length; i++){
			sum+=arr[i];
		}
		
		for(var i=0; i<arr.length; i++){
			aHeight.push(arr[i]/iMax*(oC.height-50));
		}

		var w = oC.width/(arr.length*3-2);
		var space = w*2;

		for(var i=0; i<arr.length; i++){
			draw((w+space)*i,oC.height-aHeight[i],w,aHeight[i],'rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')');
		}

		function draw(cx,cy,w,h,color){
			gd.beginPath();
			gd.fillStyle = color;
			gd.fillRect(cx,cy,w,h);
		}
	})();
});