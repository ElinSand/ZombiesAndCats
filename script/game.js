const game = {
    size: 5, // Storleken på spelplanen (5x5)
    playerX: 0, 
    playerY: 0, 
    cats: [], 
    zombies: [], 
    score: 0, 
  
    // starta spelet
    start() {
      this.generateEntities();
      this.render();
      // Visar poäng
      document.getElementById('score').innerText = this.score;
    },
  
    // genererar katter och zombies
    generateEntities() {
      // Genererar katter slumpmässigt
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < this.size; j++) {
          if (Math.random() < 0.1) { // 10% chans att placera ut en katt
            this.cats.push({ x: i, y: j });
          }
        }
      }
  
      // Genererar zombies slumpmässigt
      for (let i = 0; i < 2; i++) {
        let x = Math.floor(Math.random() * this.size);
        let y = Math.floor(Math.random() * this.size);
        // Undviker att placera zombies på samma position som spelaren eller en katt
        while ((x === this.playerX && y === this.playerY) || this.cats.some(cat => cat.x === x && cat.y === y)) {
          x = Math.floor(Math.random() * this.size);
          y = Math.floor(Math.random() * this.size);
        }
        this.zombies.push({ x, y });
      }
    },
  
    // flytta spelaren
    movePlayer(direction) {
      if (this.playerX === -1 && this.playerY === -1) {
        return; // Om spelet är över, avbryt
      }
  
      let newX = this.playerX;
      let newY = this.playerY;
  
      switch (direction) {
        case 'north':
          newY = Math.max(0, this.playerY - 1);
          break;
        case 'south':
          newY = Math.min(this.size - 1, this.playerY + 1);
          break;
        case 'west':
          newX = Math.max(0, this.playerX - 1);
          break;
        case 'east':
          newX = Math.min(this.size - 1, this.playerX + 1);
          break;
      }
  
      // Kolla om ny position är upptagen av en zombie
      if (this.zombies.some(zombie => zombie.x === newX && zombie.y === newY)) {
        // Visa game over
        this.playerX = -1;
        this.playerY = -1;
       
        this.render();
        alert('Game Over! You were caught by a zombie.');
        return;
      }
  
      // Uppdatera spelarens position
      this.playerX = newX;
      this.playerY = newY;
  
      // Kolla om spelaren räddar en katt
      const savedCatIndex = this.cats.findIndex(cat => cat.x === this.playerX && cat.y === this.playerY);
      if (savedCatIndex !== -1) {
        this.cats.splice(savedCatIndex, 1); // Ta bort katten från arrayen
        // Öka poängen med 1
        this.score++;
        // Uppdatera poängvisning
        document.getElementById('score').innerText = this.score;
        //kör metoden showNewCat när en katt blir räddad
        if(this.score)
        {
          showNewCat();
        }

  
        // Kollar om alla katter är räddade
        if (this.cats.length === 0) {
          // Spelet är över
          this.playerX = -1;
          this.playerY = -1;
          this.render();
          alert('Congratulations! You saved all the cats. Game Over!');
          return;
        }

         
      }
  
      this.moveZombies(); 
      this.render(); // Uppdatera spelplanen
    },
  
   // Funktion för att flytta zombies slumpmässigt
moveZombies() {
  this.zombies.forEach(zombie => {
    // Slumpmässigt väljer en riktning att flytta
    const directions = ['north', 'south', 'west', 'east'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];

    // Flytta zombie i den slumpmässiga riktningen
    switch (randomDirection) {
      case 'north':
        zombie.y = Math.max(0, zombie.y - 1);
        break;
      case 'south':
        zombie.y = Math.min(this.size - 1, zombie.y + 1);
        break;
      case 'west':
        zombie.x = Math.max(0, zombie.x - 1);
        break;
      case 'east':
        zombie.x = Math.min(this.size - 1, zombie.x + 1);
        break;
    }

    // Kolla om en zombie har samma position som spelaren
    if (this.playerX === zombie.x && this.playerY === zombie.y) {
      // Visa game over
      this.playerX = -1;
      this.playerY = -1;
      this.render();
      alert('Game Over! You were caught by a zombie.');
      return;
    }
  });
},

  
    // Funktion för att rendera spelplanen
    render() {
      const gameBoard = document.getElementById('game-board');
      gameBoard.innerHTML = ''; // Rensa spelplanen
  
      for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
  
          let symbol = '';
          if (this.playerX === i && this.playerY === j) {
            symbol = '<img src="images/player.jpg">'; // Spelarens position
          } else if (this.cats.some(cat => cat.x === i && cat.y === j)) {
            symbol = '<img src="images/cat.jpg">'; // Katt
          } else if (this.zombies.some(zombie => zombie.x === i && zombie.y === j)) {
            symbol = '<img src="images/zombie.gif">'; // Zombie
          }
  
          cell.innerHTML = symbol;
          gameBoard.appendChild(cell);
        }
      }
    },
  };


    
  // Starta spelet när sidan laddas
  document.addEventListener('DOMContentLoaded', () => {
    game.start();

    
  function restartGame() {
    // Återställ spellogiken eller ladda om sidan
    location.reload(); // Ladda om sidan för enkelhetens skull
  }

// Reagerar på klickhändelsen för "Play Again" knappen
document.getElementById('play-again').addEventListener('click', restartGame);

  
    // Reagerar på knapptryckningar för att flytta spelaren
    document.getElementById('north').addEventListener('click', () => game.movePlayer('north'));
    document.getElementById('south').addEventListener('click', () => game.movePlayer('south'));
    document.getElementById('west').addEventListener('click', () => game.movePlayer('west'));
    document.getElementById('east').addEventListener('click', () => game.movePlayer('east'));
  });
  
  
  
