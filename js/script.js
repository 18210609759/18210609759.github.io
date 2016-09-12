domReady(function(){
	// page
	(function(){
		var aPage = document.querySelectorAll('.page');
		var winW = document.documentElement.clientWidth;
		var winH = document.documentElement.clientHeight;

		window.onload = window.onresize = function(){
			for(var i=0; i<aPage.length; i++){
				aPage[i].style.width = winW + 'px';
				aPage[i].style.height = winH + 'px';
			}
		}
	})();

	// 首页打字效果
	;(function(){
		var oBegin = document.getElementById('begin');
		var str = '热衷于新技术的学习和探讨，热衷页面布局。崇尚化繁为简理念对互联网发展趋势高兴趣关注，积极配合开发同事完成工作';
		var timer = null;

		for(var i=0; i<str.length; i++){
			var oSpan = document.createElement('span');
			oSpan.innerHTML = str.charAt(i);
			oBegin.appendChild(oSpan);
		}

		var aSpan = oBegin.children;
		var n = 0;
		timer = setInterval(function(){
			n++;
			aSpan[n].style.transition = '1s all ease';
			aSpan[n].style.opacity = 1;
			if(n == str.length-1){
				clearInterval(timer);
			}
		},100);

	})();

	// 页面滚动
	(function(){
		var oPageTip = document.querySelector('.page_tip');
		var aLi = oPageTip.querySelectorAll('li');
		var aSpan = oPageTip.querySelectorAll('span');
		var oTxt = oPageTip.querySelectorAll('p');

		var curIndex = 0;
	    // var container = $("#container");
	    var oContent = document.querySelector('.content');
	    // var sumCount = $(".section").length;
	    var sumCount = document.querySelectorAll('.page').length;
	    var duration = 500;
	    //时间控制
	    var aniTime = 0;

	    var oFace = document.getElementById('face');

	    var scrollFunc = function (e) {
	        //如果动画还没执行完，则return
	        if(new Date().getTime() < aniTime + duration){
	            return;
	        }
	        e = e || window.event;
	        var t = 0;
	        if (e.wheelDelta) {//IE/Opera/Chrome
	            t = e.wheelDelta;
	            if (t > 0 && curIndex > 0) {
	                //上滚动
	                movePrev();
	            } else if (t < 0 && curIndex < sumCount - 1) {
	                //下滚动
			        if(curIndex > 2){
			        	curIndex = 2;
			        }
	                moveNext();
	            }
	        } else if (e.detail) {//Firefox
	            t = e.detail;
	            if (t < 0 && curIndex > 0) {
	                //上滚动
	                movePrev();
	            } else if (t > 0 && curIndex < sumCount - 1) {
	                //下滚动
	                moveNext();
	            }
	        }
	    };
	    var winH = document.documentElement.clientHeight;

	    function moveNext(){
	        //获取动画开始时的时间
	        aniTime = new Date().getTime();
	        oContent.style.transform = 'translate3D(0, -' + (++curIndex) * winH + 'px, 0)';
	        active(curIndex);
	    }

	    function movePrev(){
	        //获取动画开始时的时间
	        aniTime = new Date().getTime();
	        oContent.style.transform = 'translate3D(0, -' + (--curIndex) * winH + 'px, 0)';
	        active(curIndex);
	    }

	    function init(){
	        /*注册事件*/
	        if (document.addEventListener) {
	            document.addEventListener('DOMMouseScroll', scrollFunc, false);
	        }//W3C
	        window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome

	        oContent.style.transition = '1s all ease';
	    }

	    init();

	    // 翻页标识
		for(var i=0; i<aLi.length; i++){
			aLi[i].index = i;
			aLi[i].onmouseover = function(){
				oTxt[this.index].style.opacity = 1;
			}
			aLi[i].onmouseout = function(){
				oTxt[this.index].style.opacity = 0;
			}

			aLi[i].onclick = function(){
				curIndex = this.index;
				oContent.style.transform = 'translate3D(0, -' + this.index * winH + 'px, 0)';
				active(this.index);
			}

			function active(index){
				for(var i=0; i<aSpan.length; i++){
		        	aSpan[i].classList.remove('p_on');
		        }
				aSpan[index].classList.add('p_on');
			}
		}
	})();

	// about-me轮播效果
	;(function(){
		var oPrev = document.getElementById('info-btn-prev');
		var oNext = document.getElementById('info-btn-next');
		var oList = document.getElementById('info-list');
		var aLi = oList.children;
		var iNow = 1;
		var bReady = true;
		var winW = document.documentElement.clientWidth;

		oList.style.width = winW * aLi.length + 'px';
		console.log(getStyle(aLi[0],'width'));
		oList.style.left = -iNow * winW + 'px';

		// 向右轮播
		oNext.onclick = function(){
			if(!bReady)return;
			bReady = false;
			iNow++;
			oList.style.left = -iNow * winW + 'px';
			oList.style.transition = '1s all ease';
		}
		oPrev.onclick = function(){
			if(!bReady)return;
			bReady = false;
			iNow--;
			oList.style.left = -iNow * winW + 'px';
			oList.style.transition = '1s all ease';
		}

		oList.addEventListener('transitionend',function(){
			if(iNow == aLi.length-1){
				iNow = 1;
				oList.style.left = -iNow * winW + 'px';
				oList.style.transition = 'none';
			}
			if(iNow == 0){
				iNow = aLi.length-2;
				oList.style.left = -iNow * winW + 'px';
				oList.style.transition = 'none';
			}
			bReady = true;
		},false);
	})();

	// skill-level 
	;(function(){
		drawLev(95,'c1','#e74c3c');
		drawLev(85,'c2','#3498db');
		drawLev(80,'c3','#2ecc71');
		drawLev(90,'c4','#f39c12');
		drawLev(85,'c5','#12F3E8');
		drawLev(95,'c6','#DB3460');

		function drawLev(lev,id,col){
			var oC = document.getElementById(id);
			var gd = oC.getContext('2d');
			var cx = oC.offsetWidth/2;
			var cy = oC.offsetHeight/2;

			drawArc(0,100,'#fff');
			drawArc(0,lev,col);

			// 画圆
			function drawArc(s,lev,color){
				var e = (lev/100)*360;
				gd.beginPath();
				gd.moveTo(cx,cy);
				gd.fillStyle = color;
				gd.arc(cx,cy,60,d2a(s-90),d2a(e-90),false);
				gd.closePath();
				gd.fill();
			};
		}

		var oScroll = document.getElementById('scroll');
		var oBar = oScroll.children[0];
		var oUl = document.getElementById('bar-list');
		var oCont = document.querySelector('.bar-list');

		oScroll.onmouseover = function(){
			this.style.transition = '.7s all ease';
			this.style.opacity = 1;
		}
		oScroll.onmouseout = function(){
			this.style.transition = '.7s all ease';
			this.style.opacity = 0.1;
		}

		oBar.onmousedown = function(ev){
			var disY = ev.clientY - oBar.offsetTop;

			oScroll.style.opacity = 1;

			document.onmousemove = function(ev){
				oScroll.style.opacity = 1;
				var t = ev.clientY - disY;

				if(t < 0){
					t = 0;
				}
				if(t > oScroll.offsetHeight - oBar.offsetHeight){
					t = oScroll.offsetHeight - oBar.offsetHeight;
				}

				var scale = oBar.offsetTop / (oScroll.offsetHeight - oBar.offsetHeight);
				oUl.style.top = -oCont.offsetHeight * scale + 'px';

				oBar.style.top = t + 'px';
			}
			document.onmouseup = function(){
				oScroll.style.opacity = 0;
				document.onmousemove = null;
				document.onmouseup = null;
			}
			return false;
		}
	})();

	// my works 移入效果
	(function(){
		var oMyWorks = document.querySelector('.my_works');
		var aLi = oMyWorks.querySelectorAll('li');
		var aA = oMyWorks.querySelectorAll('a');

		for(var i=0; i<aLi.length; i++){
			aLi[i].index = i;
			aLi[i].onmouseenter = function(){
				aA[this.index].className = 'animated zoomIn';
				aA[this.index].style.opacity = 1;
			}

			aLi[i].onmouseleave = function(){
				aA[this.index].className = 'animated zoomOut';
				aA[this.index].style.opacity = 0;
			}
		}
	})();
});
