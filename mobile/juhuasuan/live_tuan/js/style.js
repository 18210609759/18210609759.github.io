window.onload = function(){
	var oClassi = document.querySelector('.classify');
	var oClassiBox = document.querySelector('.classify_box');
	var oContTit = document.querySelector('#tit');
	var aBtn = oContTit.children;
	var oCont = document.querySelector('#cont');
	var aBox = oCont.querySelectorAll('.list');
	var oChange = document.querySelector('.change_area');
	var oChangeBox = document.querySelector('.change_area_box');
	var oChangeReturn = document.querySelector('#change_return');

	oClassi.addEventListener('click',function(){
		oClassiBox.style.display = 'block';
	},false);

	for(var i=0; i<aBtn.length; i++){
		aBtn[i].index = i;
		aBtn[i].addEventListener('click',function(){
			for(var i=0; i<aBtn.length; i++){
				aBtn[i].children[0].className = 'none';
				aBox[i].style.display = 'none';
			}
			this.children[0].className = 'active';
			aBox[this.index].style.display = 'block';
		},false);
	}

	oChange.addEventListener('click',function(){
		oChangeBox.style.display = 'block';
	},false);
	oChangeReturn.addEventListener('click',function(){
		oChangeBox.style.display = 'none';
	},false);


}