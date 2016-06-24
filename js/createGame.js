

var createGameLayout=(function()
{	
	var el;
	var N;

	function createLayout()
	{
		var gameHeader=document.createElement('div');
		//gameHeader.style.width=width;
		gameHeader.setAttribute('id','gameHeader');
		
			var gameName=document.createElement('div');
			gameName.setAttribute('id','gameName');
			gameName.innerHTML='2048';
		
		
			var e1=document.createElement('div');
			e1.setAttribute('class','box');
				var e11=document.createElement('div');
				e11.innerHTML='SCORE';
				var e12=document.createElement('div');
				e12.setAttribute('id','score');
			e1.appendChild(e11);
			e1.appendChild(e12);
		
		
			var e2=document.createElement('div');
			e2.setAttribute('class','box');
				var e21=document.createElement('div');
				e21.innerHTML='BEST';
				var e22=document.createElement('div');
				e22.setAttribute('id','highScore');
			e2.appendChild(e21);
			e2.appendChild(e22);
		
		gameHeader.appendChild(gameName);
		gameHeader.appendChild(e1);
		gameHeader.appendChild(e2);
		
		var gameInstructions=document.createElement('div');
		//gameInstructions.style.width=width;
		gameInstructions.setAttribute('id','gameInstructions');
			
			e1=document.createElement('div');
			e1.innerHTML='Join the numbers and get to the 2048 tile!';
			
			
			e2=document.createElement('img');
			e2.setAttribute('id','undo');
			e2.setAttribute('src','undo.png');
			e2.style.width='35px';
			e2.style.height='35px';
			
			e3=document.createElement('div');
			e3.setAttribute('id','newGame');
			e3.innerHTML='New Game';
		
		gameInstructions.appendChild(e1);
		gameInstructions.appendChild(e2);
		gameInstructions.appendChild(e3);
		
			
		
		var gridContainer=document.createElement('div');
		gridContainer.setAttribute('id','gridContainer');
		/*gridContainer.style.width=width;
		gridContainer.style.height=width;*/
		gridContainer.style.position='relative';
		
		for(i=1;i<=(N*N);i++)
		{
			var e=document.createElement('div');
			e.style.lineHeight=e.style.height;
			e.setAttribute('id',('grid'+String(i)));
			gridContainer.appendChild(e);
		}
		
		e=document.createElement('div');
		e.setAttribute('class','hidden');
		/*e.style.width=width;
		e.style.height=width;*/
		e.setAttribute('id','gameOver');
		e.innerHTML='Game Over';
		gridContainer.appendChild(e);
		
		e=document.createElement('div');
		/*e.style.width=width;
		e.style.height=width;*/
		e.setAttribute('class','hidden');
		e.setAttribute('id','win');
		e.innerHTML='Congratulations !!You Win!!';
		gridContainer.appendChild(e);

		
		el.appendChild(gameHeader);
		el.appendChild(gameInstructions);
		el.appendChild(gridContainer);
		
	}
	
	function init(id,num)
	{
		el=document.getElementById(id);
		N=num;
		
		//el.style.width=width;
		
		createLayout();
	}
	
	return{
	init:init
	}
})();
