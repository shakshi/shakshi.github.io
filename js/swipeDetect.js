


var onSwipeDetect=(function(){

 var threshold=150;	//min this much distance(px) should be travelled for it to be a swipe
 var errorMargin=50;	//so that if goes full diagonally then not a swipe
 var startx,starty;
 var allowedTime=1500;	//in ms
 var startTime;
 var el;
 var swipeHandler;
 
function onTouchStart(e){

	var touchobj=e.changedTouches[0];	//list of touch events list as there can be multiple touches
										//we want the single touch events
	startTime=new Date().getTime();		//Date named constructor
	startx=touchobj.pageX;
	starty=touchobj.pageY;		//can use clientX and clientY
	e.preventDefault();			//to prevent the click on the div
	
 }
 
 function onTouchMove(e){
	e.preventDefault();	//to prevent scrolling of the page on touch move 
 } 
 
 function onTouchEnd(e){
	var touchobj=e.changedTouches[0];
											//local variable _case and global by camel case
	var dist_x=touchobj.pageX-startx;
	var dist_y=touchobj.pageY-starty;
	e.preventDefault();	
	var swipedir='none';
	
	var elapsed_time=new Date().getTime()-startTime;	

	
	if(elapsed_time <= allowedTime){
		
		if((Math.abs(dist_x)>=threshold) && (Math.abs(dist_y)<=errorMargin)){
			swipedir=dist_x>0 ? 'right':'left';
		}
		else if((Math.abs(dist_y)>=threshold) && (Math.abs(dist_x)<=errorMargin)){
			swipedir=dist_y>0 ? 'down':'up';
		}
	}
	swipeHandler(swipedir);
}

 return {
	 init:function(id,onswipedetect)
	 {
		 if(!id || !onswipedetect)
			 return;
		el=document.getElementById(id);
		
		swipeHandler=onswipedetect;
		el.addEventListener('touchstart',onTouchStart);
		el.addEventListener('touchmove',onTouchMove);
		el.addEventListener('touchend',onTouchEnd);
		
	 }
 };
})();


 
