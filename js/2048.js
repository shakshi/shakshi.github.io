

function allTilesEmpty(tiles,n){
	var i,j;
	if(tiles==undefined)
		return;
	for(i=0;i<n;i++)
	{
		for(j=0;j<n;j++)
		{
			if(tiles[i][j]!=0)
				return false;
		}
	}
	return true;

}

var gamePlay=(function()
{ 	
	var tile=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	var prevState=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	var score=0;
	var highScore=0;
	var reached2048=false;
	var prevScore=0;
	var N;	
	
	
	function isTileEmpty(row,col)
    {	if((tile[row][col]==0)===true)
		    return true;
		else
			return false;
    }
	
	function generateRandomNo()
    {   
		var r=Math.floor(Math.random()*(N));
		var c=Math.floor(Math.random()*(N));
        var index={first:r,second:c};
		return index;
	}
	
	function allTilesFilled()
    {	var i,j;
        for(i=0;i<N;i++)
        {	for(j=0;j<N;j++)
            {	if(tile[i][j]===0)
                    return false;
            }
        }
        return true;
	}
	
	function createNewTile()
    {	
		if(allTilesFilled()===true)
            return;
        var tmp,i,j,index;
        index=generateRandomNo();
	
        while(isTileEmpty(index.first,index.second)===false)
        {
            index=generateRandomNo();
        }

        tmp=Math.floor(Math.random()*9+1);
            if(tmp<8)
				tile[index.first][index.second]=2;
            else
				tile[index.first][index.second]=4;
	}
	
	function moveLeft()
    {   var i,j,k,l;
        var temp=[];
        var Merge;

        for(i=0;i<N;i++)    //-5n^2 time
        {   //for each row
            //shifting numbers to the left-2n time
            k=0;
            for(j=0;j<N;j++)
            {	if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
            }
            while(k<N)
                temp[k++]=0;
            
            for(j=0;j<N;j++)
                {tile[i][j]=temp[j];

                }

            //joining the same numbered tiles-n time
            Merge=false;    //considering no merge will take place
            for(j=0;j<N-1;j++)
            {
                if(tile[i][j]==tile[i][j+1] && tile[i][j]!=0)
                {   score+=(2*tile[i][j]);
					if(tile[i][j]==1024)
						reached2048=true;
                    tile[i][j]=2*tile[i][j];
                    tile[i][j+1]=0;
                    Merge=true;         //merge takes place so have to shift again
                }
            }
            
            if(Merge)           //if merge takes place then shift again-2n
            {
                k=0;
                for(j=0;j<N;j++)
                {
                    if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
                }
                while(k<N)
                    temp[k++]=0;

                for(j=0;j<N;j++)
                tile[i][j]=temp[j];
            }
        }

        for(i=0;i<N;i++)
        {	for(j=0;j<N;j++)
            {if(tile[i][j]!=prevState[i][j])
                    return true;
			}
        }
        return false;
    }
	
	function moveRight()
    {   var i,j,k,l;
        var temp=[];
        var Merge;

        for(i=0;i<N;i++)    //-5n^2 time
        {   //for each row
            //shifting numbers to the right-2n time
            k=0;
            
            for(j=0;j<N;j++)
            {   if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
            }


            for(j=0;j<(N-k);j++)
                {   tile[i][j]=0;}
                    
					for(l=0;l<k;l++,j++)
                {tile[i][j]=temp[l];
                 
                }

            //joining the same numbered tiles-n time
            Merge=false;    //considering no merge will take place
            for(j=N-1;j>0;j--)
            {
                if(tile[i][j]==tile[i][j-1] && tile[i][j]!=0)
                {   score+=(2*tile[i][j]);
					if(tile[i][j]==1024)
						reached2048=true;
                    tile[i][j]=2*tile[i][j];
                    tile[i][j-1]=0;
                    Merge=true;         //merge takes place so have to shift again
                }
            }
            
            if(Merge)           //if merge takes place then shift again-2n
            {
                k=0;
                for(j=0;j<N;j++)
                {   if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
                }

                for(j=0;j<(N-k);j++)
                {   tile[i][j]=0;
                }
                for(l=0;l<k;l++,j++)
                tile[i][j]=temp[l];
            }
        }

        for(i=0;i<N;i++)
        {
            for(j=0;j<N;j++)
            {   if(tile[i][j]!=prevState[i][j])
                    return true;
            }
        }
        return false;
    }
	
	function moveUp()
    {
        var temp=[];
        var Merge;
        var i,j,k,l;

        for(j=0;j<N;j++)    //-5n^2 time
        {   //for each row
            //shifting numbers to the up-2n time
            k=0;
            for(i=0;i<N;i++)
            {   if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
            }
            while(k<N)
                temp[k++]=0;
            
            for(i=0;i<N;i++)
                {tile[i][j]=temp[i];
              }

            //joining the same numbered tiles-n time
            Merge=false;    //considering no merge will take place
            for(i=0;i<N-1;i++)
            {
                if(tile[i][j]==tile[i+1][j] && tile[i][j]!=0)
                {   if(tile[i][j]==1024)
						reached2048=true;
					score+=(2*tile[i][j]);
                    tile[i][j]=2*tile[i][j];
                    tile[i+1][j]=0;
                    Merge=true;         //merge takes place so have to shift again
                }
            }
            
            if(Merge)           //if merge takes place then shift again-2n
            {
                k=0;
                for(i=0;i<N;i++)
                {
                    if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
                }
                while(k<N)
                    temp[k++]=0;

                for(i=0;i<N;i++)
                tile[i][j]=temp[i];
			}
		}

        for(i=0;i<N;i++)
        {   for(j=0;j<N;j++)
            {   if(tile[i][j]!=prevState[i][j])
                    return true;
            }
        }
        return false;
    }
	
	function moveDown()
    {
        var temp=[];
        var Merge;
        var i,j,k,l;

       // console.log("after move:\n)";
        for(j=0;j<N;j++)    //-5n^2 time
        {   //for each row
            //shifting numbers to the down-2n time
            k=0;
            for(i=0;i<N;i++)
            {   if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
            }

            for(i=0;i<(N-k);i++)
                tile[i][j]=0;
            for(l=0;l<k;l++,i++)
                tile[i][j]=temp[l];

            /*console.log("\n ");
			//console.log(j); console.log("\n");
            for(i=0;i<N;i++)
            {	console.log(tile[i][j]);
				console.log(" ");	}*/

            //joining the same numbered tiles-n time
            Merge=false;    //considering no merge will take place
            for(i=N-1;i>0;i--)
            {
                if(tile[i][j]==tile[i-1][j] && tile[i][j]!=0)
                {   if(tile[i][j]==1024)
						reached2048=true;
					score+=(2*tile[i][j]);
                    tile[i][j]=2*tile[i][j];
                    tile[i-1][j]=0;
                    Merge=true;         //merge takes place so have to shift again
                }
            }
            //console.log("\n merge=");
			//console.log(Merge);
			//console.log("\n");
			//console.log("after merge\n");
            if(Merge)           //if merge takes place then shift again-2n
            {
                k=0;
                for(i=0;i<N;i++)
                {
                    if(tile[i][j]!=0)
                    temp[k++]=tile[i][j];
                }

                for(i=0;i<(N-k);i++)
                tile[i][j]=0;

                for(l=0;l<k;l++,i++)
                tile[i][j]=temp[l];

               /* for(i=0;i<N;i++)
			   {console.log(tile[i][j]);console.log(" ");
			   console.log("\n");}*/
            }

        }

        for(i=0;i<N;i++)
        {   for(j=0;j<N;j++)
            {   if(tile[i][j]!=prevState[i][j])
                    return true;
            }
        }
        return false;
    }
	
	function restart()
	{	
		var i,j;
		for(i=0;i<N;i++)
		{	for(j=0;j<N;j++)
			{
				tile[i][j]=0;
			}
		}
		for(i=0;i<N;i++)
        {
            for(j=0;j<N;j++)
            {
                prevState[i][j]=0;
            }
        }
        createNewTile();
        createNewTile();
        if(highScore < score)
            highScore=score;

        score=0;
		document.getElementById("gameOver").style.display='none';
		updateTiles();
	
	}
	
	function updateTiles()
	{   var i,j;
		
		for(i=0;i<N;i++)
		{  
			for(j=0;j<N;j++)
            {	
				var el=document.getElementById('grid'+String(i*N+j+1));
				if(tile[i][j]===0)
					el.setAttribute('class','blank');
				else
				{	el.setAttribute('class',('box'+String(tile[i][j]) ) );
	
				}
            }
		}
		var scoreElement=document.getElementById('score');
		scoreElement.innerHTML=score;
		var highScoreElement=document.getElementById('highScore');
		highScoreElement.innerHTML=highScore;
	}
	
	function move(e)
	{	
        for(var i=0;i<N;i++)
        {   for(var j=0;j<N;j++)
            {   prevState[i][j]=tile[i][j];
            }
        }
        prevScore=score;
		switch(e.keyCode)
		{
			case 37:    if(moveLeft())
                    {   createNewTile();
                    }
                    break;

			case 39:   if(moveRight())
                    {   createNewTile();
                    }
                    break;

			case 38:   if(moveUp())
                    {   createNewTile();
                    }
                    break;


			case 40:   if(moveDown())
                    {   createNewTile();
                    }
                    break;

		}
		updateTiles();
	}
	function onSwipe(swipedir)
	{	
	switch(swipedir)
	{
		case 'left':    if(moveLeft())
                    {   createNewTile();
                    }
                    break;
		case 'right':if(moveRight())
                    {   createNewTile();
                    }
                    break;

		case 'up':    if(moveUp())
                    {   createNewTile();
                    }
                    break;

		case 'down': if(moveDown())
                    {   createNewTile();
                    }
                    break;
	}
	updateTiles();

	}

	function gameOver()
	{	
		var i,j;
        if(allTilesFilled()=== false)
            return false;//move is possible therefore false
        for(i=0;i<N;i++)
        {   for(j=0;j<N-1;j++)
            {   if(tile[i][j]==tile[i][j+1])
                    return false;
            }
        }
        for(j=0;j<N;j++)
        {   for(i=0;i<N-1;i++)
            {   if(tile[i][j]==tile[i+1][j])
                    return false;
            }
        }
        return true;
	}
    
	function undoMove()
	{
		var i,j;
		for(i=0;i<N;i++)
        {
            for(j=0;j<N;j++)
            {
                tile[i][j]=prevState[i][j];
            }
        }
        score=prevScore;
		
		updateTiles();
	}
	function hasReached2048()
	{	return reached2048;
	}
	
	function init(num)
	{	
		N=num;
		var old_tile=JSON.parse(localStorage.getItem('mytile'));
		var old_score=JSON.parse(localStorage.getItem('myscore'));
		var old_highScore=JSON.parse(localStorage.getItem('myhighscore'));
		highScore=old_highScore;
		
		if(old_tile===null)
			restart();
		else if(allTilesEmpty(old_tile,N) && old_score==0)
			restart();
		else
		{
			var i,j;
			score=old_score;
			for(i=0;i<N;i++)
			{
				for(j=0;j<N;j++)
				{
					tile[i][j]=old_tile[i][j];
				}
			}
			updateTiles();
		}
				
		window.addEventListener('keydown',function(e){
			move(e);
			if(gameOver())
			{	document.getElementById('gameOver').style.display='block';
				var i,j;
				for(i=0;i<N;i++)
				{
					for(j=0;j<N;j++)
					{
						tile[i][j]=0;
					}
				}
				score=0;
				
			}
			if(hasReached2048())
			{	document.getElementById('win').style.display='block';
				reached2048=false;
			}
		
		});
		
		onSwipeDetect.init('gridContainer',onSwipe);
		
		document.getElementById('newGame').addEventListener('click',restart);
		
		document.getElementById('undo').addEventListener('click',undoMove);
		
		window.addEventListener('beforeunload',function(){
			var tile_str=JSON.stringify(tile);
			var score_str=JSON.stringify(score);
			var highscore_str=JSON.stringify(highScore);
			localStorage.setItem('mytile',tile_str);
			localStorage.setItem('myscore',score_str);
			localStorage.setItem('myhighscore',highscore_str);
		});
	}
	
	return {
		init:init	
	}
})();


