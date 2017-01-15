(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        this._baby = this.game.add.sprite(0,0,'bb');
        var button = this.game.add.button(100, 400, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 200, "You let the children without presents...");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var reseT = this.game.add.button(700,400,'button',this.reset,this,2,1,0);
        reseT.anchor.set(0.5);
        var texto = this.game.add.text(0,0 ,"Main Menu");
        texto.anchor.set(0.5);
        reseT.addChild(texto);
    },
    
    //TODO 7 declarar el callback del boton.
actionOnClick: function(){
    this.game.state.start('play');
},
reset: function(){
  this.game.state.start('menu');
}
};

module.exports = GameOver;
},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Congratulations");
        this._baby = this.game.add.sprite(0,0,'happy');
        var button = this.game.add.button(100, 400, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 50, "Congratulations, you did it!");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.
        var reseT = this.game.add.button(700,400,'button',this.reset,this,2,1,0);
        reseT.anchor.set(0.5);
        var texto = this.game.add.text(0,0 ,"Main Menu");
        texto.anchor.set(0.5);
        reseT.addChild(texto);
    },
    
    //TODO 7 declarar el callback del boton.
actionOnClick: function(){
    this.game.state.start('play');
},
reset: function(){
  this.game.state.start('menu');
}
};

module.exports = GameOver;
},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

//  The Google WebFont Loader will look for this object, so create it before loading the script.
var gameOver = require ('./gameover_scene.js');
var playScene = require ('./play_scene.js');
var menuScene = require ('./menu_scene.js');
var ggScene = require ('./gg_scene.js');



var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');

    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
     this.game.load.image('ss','images/savesanta.png');
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
   
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
      this.game.load.tilemap('tilemap','images/mapa.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('tiles', 'images/simples_pimples.png');
      this.game.load.image('roca', 'images/roca.png');
      this.game.load.image('chimeneas', 'images/chimenea.png');
      this.game.load.image('madera', 'images/madera.png');
      this.game.load.image('ladrillos', 'images/casa.jpeg');
      this.game.load.image('bb','images/baby.jpg');
       this.game.load.image('happy','images/happy.jpg');
     this.game.load.image('trineo','images/trineo.png');
      this.game.load.image('regalo','images/Present_sprite.png');
      this.game.load.image('enemigo','images/caparazon.png');
      this.game.load.image('rush','images/santa.png');
      //this.game.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json' ,Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      //TODO 2.2a Escuchar el evento onLoadComplete con el mismo método loadComplete que el state 'play'
      this.load.onLoadComplete.add(this.loadComplete, this);

    
  },

  loadStart: function () {
    console.log("Game Assets Loading ...");
  },
    
      //TODO 2.2b function loadComplete()
  loadComplete: function() {
  //  text.setText("Load Complete");  
    this.game.state.start('play')
    //this.ready = true;
  },
   

    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }

};
//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
 window.onload = function(){
      WebFont.load(wfconfig);
      
    };
 

//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().

function init () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
game.state.add('boot', BootScene);
game.state.add('menu', menuScene);
game.state.add('preloader', PreloaderScene);
game.state.add('play', playScene);
game.state.add('gameOver', gameOver);
game.state.add('gg', ggScene);
//TODO 1.3 iniciar el state 'boot'. 
game.state.start('boot');
    
};

},{"./gameover_scene.js":1,"./gg_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0,0,800,600);
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'ss');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}

var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}

 var regalitos;
 var caparazonitos;
 var puntos = 0;
 var scoreText;
 var coor = 0;
 var puedeganar = false;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 700, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

    

    //Método constructor...
  create: function () {
  	puntos = 0;
  	regalitos = this.game.add.group();
  	caparazonitos = this.game.add.group();
  	scoreText = this.game.add.text(16, 1000, 'Score: 0', { fontSize: '32px', fill: '#000' });

  	scoreText.fixedToCamera=true;
  	scoreText.cameraOffset.setTo(10,10);


  
      //Creamos al player con un sprite por defecto.
     // regalos = game.add.group();
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
      this._rush = this.game.add.sprite(100,0,'rush');
     
      this._trineo = this.game.add.sprite(900,900,'trineo');
      this._trineo.scale.setTo(0.2,0.2);
    
     this._rush.scale.setTo(0.5,0.5);


     createCaparazon(808,250,this.game);
    createCaparazon(1158,263,this.game);
    createCaparazon(1460,263,this.game);
    createCaparazon(1875,295,this.game);
    createCaparazon(3046,263,this.game);
    
      //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
      this.map = this.game.add.tilemap('tilemap');
    //  this.map.addTilesetImage('patrones','tiles');
      this.map.addTilesetImage('kek','madera');
      this.map.addTilesetImage('casa','ladrillos');
      this.map.addTilesetImage('Tileset','chimeneas');
      this.map.addTilesetImage('roca','roca');



console.log(this.game.camera);
      //Creacion de las layers
    this.backgroundLayer = this.map.createLayer('BackGroundLayer');
     this.groundLayer2 = this.map.createLayer('GroundLayer2');
      this.groundLayer = this.map.createLayer('GroundLayer');
      this.chimeneasLayer = this.map.createLayer('Chimeneas');
     
      //plano de muerte
      this.death = this.map.createLayer('Death');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 50000, true, 'Death');
      this.map.setCollisionBetween(1, 50000, true, 'Chimeneas');
      this.map.setCollisionBetween(1, 50000, true, 'GroundLayer');
      this.map.setCollisionBetween(1, 50000, true, 'GroundLayer2');
      //this.death.visible = false;
      //Cambia la escala a x3.
     
      
      //this.groundLayer.resizeWorld(); //resize world and adjust to the screen
      
      //nombre de la animación, frames, framerate, isloop
     /* this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
                     */
    var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key1.onDown.add(DropPresent, this);

     var key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.ESCAPE);
    key2.onDown.add(Pause, this);

      this.configure();
      this.groundLayer.resizeWorld();
     // debug.log(this.groundLayer.scale());
      this.death.resizeWorld();
      this.groundLayer2.resizeWorld();

  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.groundLayer);
        var collisionWithTilemap1 =this.game.physics.arcade.collide(this._rush, this.groundLayer2);
         var collisionWithTilemap2 =this.game.physics.arcade.collide(this._rush, this.chimeneasLayer);
        
        this.game.physics.arcade.collide(regalitos, this.groundLayer);
        this.game.physics.arcade.collide(caparazonitos, this.groundLayer);
        this.game.physics.arcade.collide(caparazonitos, this.groundLayer2);
        this.game.physics.arcade.collide(caparazonitos, this.chimeneasLayer);
       
		this.game.physics.arcade.collide(this.death,regalitos,perderRegalo,null,this);
		this.game.physics.arcade.collide(this._rush,caparazonitos,pierde,null,this);
		this.game.physics.arcade.collide(this.chimeneasLayer,regalitos,newPremio,null,this);

        var movement = this.GetMovement();
      
      
      

        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap,collisionWithTilemap1,collisionWithTilemap2)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;     
        }
        //States
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                    moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;
                }
                else if (movement === Direction.LEFT){
                    moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1; 
                }
                else {
                	moveDirection.x = 0;
                }
                if(this._playerState === PlayerState.JUMP)
                    moveDirection.y = -this._jumpSpeed;
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection,5,
                      this.backgroundLayer.layer.widthInPixels*this.backgroundLayer.scale.x - 10);
        this.checkPlayerFell();
    },
    
    
    canJump: function(collisionWithTilemap,collisionWithTilemap1,collisionWithTilemap2){
        return this.isStanding() && (collisionWithTilemap ||collisionWithTilemap1 ||
        collisionWithTilemap2);
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver';
        this.game.state.start('gameOver');
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.arcade.collide(this._rush, this.death) || this.game.physics.arcade.overlap(this._rush, this.caparazonitos) )
            this.onPlayerFell();
      
        
      
    },

    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap,collisionWithTilemap1,collisionWithTilemap2){
        return this.canJump(collisionWithTilemap,collisionWithTilemap1,collisionWithTilemap2) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.UP);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        return movement;
    },
  
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 2400, 160);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#c9f0ff';
        this.game.physics.arcade.enable(this._rush);
       
    
        
        this._rush.body.bounce.y = 1;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;

        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    destroy: function(){
        
        this.tilemap.destroy();
        this.tiles.destroy();
       // this.game.world.setBounds(0,0,800,600);
       
    }
    //TODO 9 destruir los recursos tilemap, tiles y NO(logo).

};
  function DropPresent(){ 
    		console.log(this._rush.x +' '+ this._rush.y);
    	  	var regali = regalitos.create(this._rush.x,this._rush.y+10,'regalo');    
    	  	//regali.scale.setTo(2,2);
    	  	 this.game.physics.arcade.enable(regali);
   			 regali.body.gravity.y = 1000;
   			 regali.body.bounce.setTo(0.3,0.3);
   			 regali.body.velocity.x = this._rush.body.velocity.x/2;
   			 regali.body.drag.setTo(100,0);
   			setTimeout(function(){regali.destroy()},3000);


    	  
   
    }
    function createCaparazon( x, y, xd){

    	  	var caparazoni = caparazonitos.create(x,y,'enemigo');
    	  	xd.physics.arcade.enable(caparazoni);
    	  	caparazoni.scale.setTo(0.08,0.08);
    	  	caparazoni.body.bounce.setTo(1,0.1);
    	  	
    	  	caparazoni.body.gravity.y = 100;
    	  	caparazoni.body.velocity.x = 200;

    }
    function perderRegalo(regalo){ 
    	regalo.kill();
    	  
    }
    function newPremio(regalo){
    	
    	regalo.kill();
    	if (regalo.x > coor+100){
    	coor = regalo.x;
    	puntos++;

    }
    	scoreText.text = 'Score = ' + puntos +'/12';
    	if(puntos === 12)
    		puedeganar = true;
    		
    }
    function Pause(){
    	this.game.paused = !this.game.paused;
    }
    function gana(){
    	this.game.state.start('gg');
    }
    function pierde(){
    	this.game.state.start('gameOver');
    }

module.exports = PlayScene;

},{}]},{},[3]);
