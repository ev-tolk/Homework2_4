var canvas1 = document.getElementById('canvas1');
var ctx = canvas1.getContext('2d');

var backgroundImg = new Image();
backgroundImg.src = "images/background.jpg";

window.onload = function(){
    document.getElementById('play-game').onclick = function(){
        playGame();
    };

    document.getElementById('play-game2').onclick = function(){
        playGame2();
    };

    document.getElementById('play-game3').onclick = function(){
        playGame3();
    };

    function playGame(){
        tom.vx = 4;
        tom.vy = 2;
        jerry.speedX = 15;
        jerry.speedY = 15;
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 2500);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 8000);
    }

    function playGame2(){
        tom.vx = 10;
        tom.vy = 12;
        jerry.speedX = 15;
        jerry.speedY = 15;
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();;
            }, 2500);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 6000);
    }

    function playGame3(){
        tom.vx = 14;
        tom.vy = 14;
        jerry.speedX = 16;
        jerry.speedY = 16;
        updateCanvas1();

        setInterval(    // Таймер который работает циклически за указанный промежуток времени
            function(){
                cheese.newProduct();
                cheese.createCheese();
            }, 2500);      
        
        setInterval( function(){
            var random = tom.displayRandomTom();
            tom.createTom(random[0], random[1]);
        }, 4000);
    }
};

var keysPressed = {
    top: false,
    bottom: false,
    right: false, 
    left: false   //left
};

var TOP_KEY = 38;
var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var BOTTOM_KEY = 40;

document.onkeydown = function(event){
    event.preventDefault();
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = true;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = true;  //Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = true;
        break;
        case LEFT_KEY:
        keysPressed.left = true;
        break;
    }
};

document.onkeyup = function(event){
    switch (event.keyCode){
        case TOP_KEY:
        keysPressed.top = false;
        break;
        case BOTTOM_KEY:
        keysPressed.bottom = false;//Поменять забыл при копировании свойства
        break;
        case RIGHT_KEY:
        keysPressed.right = false;
        break;
        case LEFT_KEY:
        keysPressed.left = false;
        break;
    }
};


function updateCanvas1(){
    Object.keys(keysPressed).forEach(function(edit){
        if(keysPressed[edit]){
            jerry.move(edit);
        }
    });


ctx.drawImage(backgroundImg, 0, 0);

ctx.fillText("Текущие баллы : " + jerry.pointCounter + 'очков', 700 , 20);


jerry.draw();
tom.draw();
tom.move(tom.tomArray);

cheese.draw();

if(jerry.isDead(tom.tomArray)){
    gameOver();
}

for(var i = 0; i < cheese.cheeseArr.length; i++){
    if(cheese.cheeseArr.length !== 0){
        if(jerry.eatCheese(cheese.cheeseArr) === true){
            if(cheese.cheeseArr[i].name === 'normal'){   //Тут тоже неправильно было написано cheese и Arr
                jerry.pointCounter += 50;
            } else if (cheese.cheeseArr[i].name === 'bad'){   //Тут тоже неправильно было написано cheese
                jerry.pointCounter += 100;
                jerry.speedX = 5;
                jerry.speedY = 5;
                setTimeout(function(){
                    jerry.speedX = 15;  //jerry был неправильно написан
                    jerry.speedY = 15;
                }, 2500);
            }
            cheese.cheeseArr.splice(
                cheese.cheeseArr.indexOf(cheese.cheeseArr[i]), 1   //Тут тоже неправильно было написано cheese
            );
        }
    }
}

requestAnimationFrame(updateCanvas1);


};


// Создание экзмепляров класса
var cheese = new ProductCheese();
var jerry = new Jerry();
var tom = new Tom();

function gameOver(){
    cancelAnimationFrame(cheese);
    cancelAnimationFrame(jerry);
    cancelAnimationFrame(tom);

    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas1.width, canvas1.width)
    ctx.fillStyle = 'black';

    ctx.fillText('Конец игры', canvas1.width / 2 - 200, canvas1.height / 2);
    ctx.fillText('Игрок Jerry набрал' + jerry.pointCounter, canvas1.width / 2 - 100, canvas1.height / 2 + 50);

    var maxPoints = localStorage.getItem('Points');
    if(jerry.pointCounter > maxPoints){
        localStorage.setItem('Points', jerry.pointCounter);
        ctx.fillText('ВАУ! Максимальный рекорд! Вы набрали: ' + jerry.pointCounter, canvas1.width / 2 - 200, canvas1.height / 2 + 100)
    } else{
        ctx.fillText('Максимальный рекорд: ' + maxPoints, canvas1.width / 2 - 200, canvas1.height / 2 + 100)
    }
    

    setInterval(function(){
        location.reload();
    }, 10000)

    jerry.pointCounter();
 
}