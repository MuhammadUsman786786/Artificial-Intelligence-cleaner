var myArray=[];
	var minDistanceInfo=[];
	var functionCounter=0;



	function generateNoise()
	{	

		document.getElementById("removeDust").disabled=false;

		if(myArray.length==30)
			document.getElementById("createDust").disabled=true;
		


		var tempSize=myArray.length;
		if(myArray.length==0)
		{
			myArray[0]={"row":0,"col":0};
				//document.getElementById(0+""+0).style.background="yellow";

			}

			if(tempSize==0)
				counter=9;
			else
				counter=10;

			for(var i=0;i<counter;i++)
			{
				let ckeck=false,tempObject,row,col;
				do
				{
					row=Math.floor(Math.random() * 10);
					col=Math.floor(Math.random()*10);
					tempObject={"row":row,"col":col};
					check=searchObject(tempObject);	

				}
				while(check==false)

					document.getElementById(row+""+col).style.background="#CCD6DD";
				document.getElementById(row+""+col).innerHTML="Dirt :"+(myArray.length);	
				myArray[myArray.length]=tempObject;

				
				
			}
			
		}

		function searchObject(tempObject)
		{

			for(var i=0;i<myArray.length;i++)
			{
				if(JSON.stringify(tempObject)===JSON.stringify(myArray[i]))
				{
					return false;
				}

			}

			true;

		}

		function createTable() {
			document.getElementById("removeDust").disabled=true;
			var table = document.getElementById("myTable");

			


			for(let i=0;i<10;i++)
			{
				var row = table.insertRow(i);
				for(let j=0;j<10;j++)
				{
					var cell1 = row.insertCell(j);
					cell1.width="50px";
					cell1.height="50px";
					
					cell1.id=i+""+j;
				}

			}

			//generateNoise();
			//calculateMinimum();
			//drawPath();
		}


		function calculateMinimum()
		{

			var counter=myArray.length-1;
			for(var i=0;i<counter;i++)
				tempFunc();




		}


		function tempFunc()
		{
			let row,col,row1=0,col1=0;
			row=myArray[0].row;
			col=myArray[0].col;
			var distance=1000;
			var tempDistance=1000;
			var index=0;
			var xDistance;
			var yDistance;
			for(var i=1;i<myArray.length;i++)
			{
				row1=myArray[i].row;
				col1=myArray[i].col;

				tempDistance=Math.abs(row1-row)+Math.abs(col1-col);

				if(tempDistance<distance)
				{
					xDistance=col1-col;
					yDistance=row1-row;

					distance=tempDistance;
					index=i;
				}

			}



			let minObject=myArray[index];
			let startObject=myArray[0];

			
			myArray.splice(index,1);
			myArray.splice(0,1);
			myArray.splice(0,0,minObject);
			
			minDistanceInfo[minDistanceInfo.length]=
			{"row":minObject.row,"col":minObject.col,"xDistance":xDistance,"yDistance":yDistance};	


		}


		function drawPath()
		{


			document.getElementById("removeDust").disabled=true;
			document.getElementById("createDust").disabled=true;
			calculateMinimum();

			for(var i=0;i<minDistanceInfo.length;i++)
			{

				showAnimation(minDistanceInfo[i]);
				
			}

		}


		function showAnimation(animationObject)
		{
			//console.log(animationObject);
			var tempPath="";



			var counter=Math.abs(animationObject.xDistance);
			for(var i=0;i<counter;i++)
			{
				if(animationObject.xDistance>0)
				{

					tempPath=tempPath+">";
					moveRight();
				}
				else{
					tempPath=tempPath+"<";	
					moveLeft();	
				}

			}

			counter=Math.abs(animationObject.yDistance);
			for(var j=0;j<counter;j++)
			{
				if(animationObject.yDistance>0){
					tempPath=tempPath+"?";
					moveDown();
				}
				else{
					tempPath=tempPath+"^";
					moveUp();
				}

			}

			zoomInOut();
			let sum=0;
			for(var i=0;i<=functionCounter;i++)
			{
				let ppp=Math.abs(minDistanceInfo[i].xDistance)+Math.abs(minDistanceInfo[i].yDistance);
				sum=sum+ppp+1;
			}
			
			sum=sum*1500;
			setInterval(function()
			{
				document.getElementById(animationObject.row+""+animationObject.col).style.background="white";
				document.getElementById(animationObject.row+""+animationObject.col).innerHTML = "Sucked ";
			},sum);



			
			//console.log(tempPath);
			
			functionCounter++;
		}


		function zoomInOut()
		{
			$('#myBox').animate({'width':'40px','height':'40px'},750);
			$('#myBox').animate({'width':'50px','height':'50px'},750);



		}

		function moveLeft()
		{
			$("#myBox").animate({
				left: "-=50"
			},1500);


		}
		function moveUp(){

			$("#myBox").animate({
				top: "-=50"
			},1500);

		}

		function moveRight(){


			$("#myBox").animate({
				left: "+=50"
			},1500);	

		}
		function moveDown(){
			$("#myBox").animate({
				top: "+=50"
			},1500);

		}

		function refresh() {

			setTimeout(function () {
				location.reload()
			}, 100);
		}

