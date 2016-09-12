domReady(function(){
	// 页面懒加载效果
	function show(obj){
		var oHeight = obj.offsetTop;
		var winH = document.body.clientHeight;
		if(oHeight < winH){
			obj.style.transform = 'translateY(0px)';
			obj.style.transition = '1.5s all ease';
		}
	}

	var oCont = document.querySelector('.content');
	var oTit = document.querySelector('.title');

	show(oCont);
	show(oTit);

	var oUl = document.getElementById('list');
	var aLi = oUl.children;
	var oNext = document.getElementById('next');
	var oPrev = document.getElementById('prev');
	var iNow = 0;

	oUl.style.width = aLi[0].offsetWidth * aLi.length + 'px';
	oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';

	oNext.onclick = function(){
		iNow++;
		if(iNow == aLi.length){
			iNow = 0;
		}
		oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
		oUl.style.transition = '1s all ease';
	}
	oPrev.onclick = function(){
		iNow--;
		if(iNow == -1){
			iNow = aLi.length-1;
		}
		oUl.style.left = -iNow * aLi[0].offsetWidth + 'px';
		oUl.style.transition = '1s all ease';
	}

	var aWorks = oCont.querySelectorAll('.works span');

	for(var i=0; i<aWorks.length; i++){
		var aWidth = aWorks[i].offsetLeft;
		if(aWorks[i].offsetLeft == 0){
			aWorks[i].style.transform = 'translateY(0px)';
			aWorks[i].style.transition = '1.5s all ease';
		}
	}
});