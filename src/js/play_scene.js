'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}

var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}

 var regalitos;
 var caparazonitos;
 var martillitos;
 var puntos = 0;
 var scoreText;
 var lifeText 
 var coor = 0;
 var puedeganar = false;
 var numChimeneas;
 var elfo = true;
 var self;
//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 100, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.

    

    //Método constructor...
  create: function () {
  self = this;
  var elfo = true;
  	numChimeneas = 12;
  	puntos = 0;
  	 coor = 0;
  	  this._fondo = this.game.add.sprite(0,-150,'fondo');
  	  this._fondo.fixedToCamera = true;
  	  this._fondo.cameraOffset.setTo(0,0);
  	
  	scoreText = this.game.add.text(16, 1000, 'Score = 0/12', { fontSize: '32px', fill: '#000' });
  	scoreText.fixedToCamera=true;
  	scoreText.cameraOffset.setTo(10,10);

  	


  
      //Creamos al player con un sprite por defecto.
     // regalos = game.add.group();
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'

     this._rush = this.game.add.sprite(25,0,'rush');
    // this._rush = this.game.add.sprite(3000,0,'rush');
     this._rush.collideWorldBounds = true;
    /* this._elfo = this.game.add.sprite(2950,250,'elfo');
      this._elfo.scale.setTo(0.8,0.8);*/

      createElf(2950,250,this.game);
regalitos = this.game.add.group();
  	caparazonitos = this.game.add.group();
  	martillitos = this.game.add.group();
      this._trineo = this.game.add.sprite(3050,178,'trineo');
     
      this._trineo.scale.setTo(0.2,0.2);
    
     this._rush.scale.setTo(0.5,0.5);
     this._rush.anchor.setTo(0.5,0.5);


     createCaparazon(808,250,this.game);
    createCaparazon(1158,263,this.game);
    createCaparazon(1460,263,this.game);
    createCaparazon(1875,295,this.game);
   
    
      //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
      this.map = this.game.add.tilemap('tilemap');
    
      this.map.addTilesetImage('kek','madera');
      this.map.addTilesetImage('casa','ladrillos');
      this.map.addTilesetImage('Tileset','chimeneas');
      this.map.addTilesetImage('roca','roca');

this.musfondo = this.game.add.audio('musicafondo');
this.chek = this.game.add.audio('chek');
this.gover = this.game.add.audio('gover');
this.musfondo.loop = true;
this.musfondo.play();

      //Creacion de las layers
    this.backgroundLayer = this.map.createLayer('BackGroundLayer');
     this.groundLayer2 = this.map.createLayer('GroundLayer2');
      this.groundLayer = this.map.createLayer('GroundLayer');
      this.chimeneasLayer = this.map.createLayer('Chimeneas');
     
      //plano de muerte
      this.death = this.map.createLayer('Death');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this.map.setCollisionBetween(1, 5000, true, 'Death');
      this.map.setCollisionBetween(1, 5000, true, 'Chimeneas');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer');
      this.map.setCollisionBetween(1, 5000, true, 'GroundLayer2');
      //this.death.visible = false;
      //Cambia la escala a x3.
     
      
      //this.groundLayer.resiz eWorld(); //resize world and adjust to the screen
      
      //nombre de la animación, frames, framerate, isloop 
     this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('sprite',1,16,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('sprite',13,14,'',2),4,false);
     
    var key1 = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   // if(this._rush.martillos<=0)
    key1.onDown.add(DropPresent, this);
/*else if (this._rush.martillos > 0)
	 key1.onDown.add(DropMartillo, this);
*/
     var key2 = this.game.input.keyboard.addKey(Phaser.Keyboard.ESCAPE);
    key2.onDown.add(Pause, this);

      this.configure();
      this.groundLayer.resizeWorld();
     
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
		this.game.physics.arcade.collide(this._rush,martillitos,pierde,null,this);
		this.game.physics.arcade.collide(this.chimeneasLayer,regalitos,newPremio,null,this);
		this.game.physics.arcade.overlap(this._rush,this._trineo,gana,null,this);
		this.game.physics.arcade.overlap(this.game.elfo,this._rush,muerteElfo,null,this);
		
		

        var movement = this.GetMovement();

        
      
      
      

        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap,collisionWithTilemap1,collisionWithTilemap2)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                   
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
                moveDirection.x /= 2;
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
                    if(this._rush.scale.x > 0){
                        this._rush.scale.x *= -1; 
                }
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
        this.musfondo.stop();
        this.gover.play();
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
        this.game.physics.arcade.enable(this._trineo);
        this.game.physics.arcade.enable(this.game.elfo);
       
    
        
        this._rush.body.bounce.y = 1;
        this._rush.body.gravity.y = 20000;
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;

        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;


    },
    destroy: function(){
        
        this.tilemap.destroy();
        this.tiles.destroy();
        this.musfondo.stop();
       // this.game.world.setBounds(0,0,800,600);
       
    }
    //TODO 9 destruir los recursos tilemap, tiles y NO(logo).

};
  function DropPresent(){ 
    		console.log(this._rush.x +' '+ this._rush.y);
    	  	var regali = regalitos.create(this._rush.x-15,this._rush.y-10,'regalo');    
    	  	
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

    function createElf( x, y, xd){

    	  	 xd.elfo = xd.add.sprite(x,y,'elfo');
    	  	xd.elfo.scale.setTo(0.8,0.8);
    	  	xd.physics.arcade.enable(xd.elfo);
    setTimeout(function(){createMartillo(x,y,xd)},3000);
    xd.elfo.animations.add('stop',
                    Phaser.Animation.generateFrameNames('sprite',1,4),4,true);
    xd.elfo.animations.play('stop');

    }
    function createMartillo(x,y,xd){
var martilli = martillitos.create(x,y,'martillo');
    	  	xd.physics.arcade.enable(martilli);
    	  	martilli.body.velocity.setTo(xd.rnd.integerInRange(-80, -150),xd.rnd.integerInRange(-80, -150));
    	  	martilli.body.gravity.y = 200;
    	
    	  	setTimeout(function(){martilli.destroy()},2000);
    	  	if(elfo)
    	  	 setTimeout(function(){createMartillo(x,y,xd)},2000);
    }


    function perderRegalo(regalo){ 
    	regalo.kill();
    	  
    }
    function newPremio(regalo){
    	
    	regalo.kill();
    	if (regalo.x > coor+100){
        self.chek.play();
    	coor = regalo.x;
    	puntos++;

    }
    	scoreText.text = 'Score = ' + puntos +'/12';
    	if(puntos === numChimeneas)
    		puedeganar = true;
    		
    }
    function Pause(){
    	this.game.paused =! this.game.paused;
    }
    function gana(){
    	if (puedeganar)
      {
        this.musfondo.stop();
    	this.game.state.start('gg');
    }
    else{
       this.musfondo.stop();
       this.gover.play();
    	this.game.state.start('gameOver');
    }
    }
    function pierde(){
       this.musfondo.stop();
       this.gover.play();
    	this.game.state.start('gameOver');
    }
    function muerteElfo(elf){
    	elf.destroy();
    	elfo = false;
    }
   
   


module.exports = PlayScene;
