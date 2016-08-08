window.onload=function(){
	//轮播图
	var oSilderBox=document.querySelector('.slide-box');
	var aImg=oSilderBox.getElementsByTagName('img');
	var aLi=oSilderBox.getElementsByTagName('li');
	var count=0;
	var timer=null;
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			count=this.index;
			tab();
	}
	function tab(){
		for(var j=0;j<aLi.length;j++){			
				aLi[j].className='';
				aImg[j].style.display='none';
			}
			aLi[count].className='active';
			aImg[count].style.display='block';
		}
	}
	function next(){
		count++;
		if(count==aLi.length){
			count=0;
		}
		tab();
	}
	timer=setInterval(next,1500);
	oSilderBox.onmouseover=function(){
		clearInterval(timer);
	}
	oSilderBox.onmouseout=function(){
		clearInterval(timer);
		timer=setInterval(next,1500);
	}
}

