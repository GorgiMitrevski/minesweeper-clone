// set fields and bombs from same user input width-height 
class Fields {
    constructor(){
        this.first = document.querySelector('.main');
        this.sec = 0;
    }
    setFields(){
        // this.prompt = prompt("Enter number of fields - height, width between 3-20 ", "10");
        this.prompt = parseInt(document.getElementById('user-input').value);
        if(this.prompt > 20 || this.prompt < 3 || this.prompt === "" || isNaN(this.prompt) ){
            this.prompt = 10;
        }
        this.N = this.prompt * this.prompt;
        numberBigWidth = this.N;
        numberSmallWidth = this.prompt;

        this.tempN = this.N;
        for(let i = 0; i < this.tempN; i++){
            const div = document.createElement('div');
            for(let j = 0; j < this.prompt; j++){
                const btn = document.createElement('button');
                btn.className = 'one-piece';
                div.appendChild(btn);  
            }
            this.first.appendChild(div);
            this.tempN = this.tempN - this.prompt;
        }
        this.firstBtn = document.querySelectorAll('.one-piece');
    }

    setBombs(){
        if(this.N < 21){ this.numberBombs = 3; }
        else if(this.N < 101){ this.numberBombs = 10; }
        else if(this.N < 201){ this.numberBombs = 25; }
        else if(this.N < 301){ this.numberBombs = 40; }
        else if(this.N < 401){ this.numberBombs = 55; }

        for(let i = 0; i < this.numberBombs; i++){
            let randomIndex = Math.ceil(Math.random() * this.N-1);
            if(this.firstBtn[randomIndex].classList.contains('have-bomb')){
                i = i-1;
                continue;
            }
            else{
                this.firstBtn[randomIndex].classList.add('have-bomb');
            }
        }
    }

    setEmpty(){
        for(let i = 0 ; i < this.firstBtn.length; i++){
            if( !(this.firstBtn[i].classList.contains('have-bomb') ) ){
                this.firstBtn[i].classList.add('no-bomb');
            }
        }
    }

    setSeconds(){
        let time = 0;
        this.countUp = setInterval(() => {
            time++;
            document.getElementById('seconds').innerHTML = time;  
        }, 1000);
    }

}

// check possible mines around clicked field
class Mines{
    constructor(){
        this.firstBtn = document.querySelectorAll('.one-piece');
    }

    removeNoBomb(i){ // check for game over (WIN) / remove classes 'no-bomb'
        this.firstBtn[i].classList.remove('no-bomb');
        let numberBombs = 0;
        for(let i = 0; i < this.firstBtn.length; i++){
            if( this.firstBtn[i].classList.contains('no-bomb') ){
                numberBombs++;
            }
        }
        if(numberBombs === 0){
            for(let i = 0; i < this.firstBtn.length; i++){
                if( this.firstBtn[i].classList.contains('have-bomb') ){
                    this.firstBtn[i].classList.add('finished');
                }
            } 
            //
            let id = window.setInterval(function() {}, 0); // clear all intervals
            while (id--) {window.clearInterval(id);}
            //
            const resultLabel = document.getElementById('result-label');
            resultLabel.style.color = 'green';
            setTimeout(function(){ resultLabel.textContent = `You win for ${document.getElementById('seconds').textContent} seconds!` }, 25);
            document.getElementById('modal').classList.add('modal-display');
        }
    }
    checkEnd(indexOne, indexTwo, indexThree, i){ // for i = krajnite (agolnite) indeksi
        let bombs = 0;
        if(this.firstBtn[indexOne].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexTwo].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexThree].classList.contains('have-bomb')){ bombs++; }
        if(bombs === 0 ){ this.firstBtn[i].classList.add('empty'); this.removeNoBomb(i); }
        else if(bombs === 1){ this.firstBtn[i].classList.add('one-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 2){ this.firstBtn[i].classList.add('two-bomb-around');this.removeNoBomb(i);}
        else if(bombs === 3){ this.firstBtn[i].classList.add('three-bomb-around'); this.removeNoBomb(i);}
    } 
    // posle 0 index do predposleden vo row gorni / isto za dolna linija / leva i desna strana so isklucok na krajnite(agolnite)
    checkFirstLine(indexOne, indexTwo, indexThree, indexFour, indexFive, i){  
        let bombs = 0;
        if(this.firstBtn[indexOne].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexTwo].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexThree].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexFour].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexFive].classList.contains('have-bomb')){ bombs++; }
        if(bombs === 0 ){ this.firstBtn[i].classList.add('empty'); this.removeNoBomb(i);}
        else if(bombs === 1){ this.firstBtn[i].classList.add('one-bomb-around'); this.removeNoBomb(i); }
        else if(bombs === 2){ this.firstBtn[i].classList.add('two-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 3){ this.firstBtn[i].classList.add('three-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 4){ this.firstBtn[i].classList.add('four-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 5){ this.firstBtn[i].classList.add('five-bomb-around'); this.removeNoBomb(i); }
    } 
    // za site drugi elementi (vnatresnite)
    checkOthers(indexOne, indexTwo, indexThree, indexFour, indexFive, indexSix, indexSeven, indexEight, i){
        let bombs = 0;
        if(this.firstBtn[indexOne].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexTwo].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexThree].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexFour].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexFive].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexSix].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexSeven].classList.contains('have-bomb')){ bombs++; }
        if(this.firstBtn[indexEight].classList.contains('have-bomb')){ bombs++; }
        if(bombs === 0 ){ this.firstBtn[i].classList.add('empty'); }
        else if(bombs === 1){ this.firstBtn[i].classList.add('one-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 2){ this.firstBtn[i].classList.add('two-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 3){ this.firstBtn[i].classList.add('three-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 4){ this.firstBtn[i].classList.add('four-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 5){ this.firstBtn[i].classList.add('five-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 6){ this.firstBtn[i].classList.add('five-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 7){ this.firstBtn[i].classList.add('five-bomb-around'); this.removeNoBomb(i);}
        else if(bombs === 8){ this.firstBtn[i].classList.add('five-bomb-around'); this.removeNoBomb(i);}
    }

}

// check all
class Check {
    constructor(mines){
        this.firstBtn = document.querySelectorAll('.one-piece');

        for(let i = 0; i < this.firstBtn.length; i++){
            this.firstBtn[i].addEventListener('click', () => {
                if(this.firstBtn[i].classList.contains('have-bomb') )
                {
                    for(let j = 0; j < this.firstBtn.length; j++){
                        if( this.firstBtn[j].classList.contains('have-bomb') ){
                            this.firstBtn[j].classList.add('cube-bomb');
                        }
                    } 
                    //
                    let id = window.setInterval(function() {}, 0); // clear all intervals
                    while (id--) {window.clearInterval(id);}
                    //
                    // setTimeout(function(){ alert('You loose, there is mine !'); }, 25);
                    const resultLabel = document.getElementById('result-label');
                    resultLabel.style.color = 'red';
                    setTimeout(function(){ resultLabel.textContent = 'You loose, there is mine !' }, 25);
                    document.getElementById('modal').classList.add('modal-display');
                } else if(i === 0){
                    mines.checkEnd(i+1, i+(numberSmallWidth-0), i+1+(numberSmallWidth-0), i);
                } else if(i === numberSmallWidth-1){
                    mines.checkEnd(i-1, i+(numberSmallWidth-0), i+(numberSmallWidth-1), i);
                } else if(i === (numberBigWidth - numberSmallWidth)){
                    mines.checkEnd(i+1, i-(numberSmallWidth-0), i+1-(numberSmallWidth-0), i);
                } else if(i === (numberBigWidth-1) ){
                    mines.checkEnd(i-1, i-(numberSmallWidth-0), i-1-(numberSmallWidth-0), i);
                } else if(i > 0  && i < (numberSmallWidth-1) ){ 
                    mines.checkFirstLine(i-1, i+1, i+(numberSmallWidth-1), i+(numberSmallWidth-0), i+1+(numberSmallWidth-0), i);
                } else if(i > (numberBigWidth - numberSmallWidth) && i < (numberBigWidth-1)){ 
                    mines.checkFirstLine(i-1, i+1, i-(numberSmallWidth-1), i-(numberSmallWidth-0), (i-numberSmallWidth-1), i);
                } else if(i === (numberSmallWidth*1) || i === (numberSmallWidth*2) || i === (numberSmallWidth*3) ||  
                        i === (numberSmallWidth*4) || i === (numberSmallWidth*5) || 
                        i === (numberSmallWidth*6) || i === (numberSmallWidth*7) || i === (numberSmallWidth*8) || 
                        i === (numberSmallWidth*9) || i === (numberSmallWidth*10) || i === (numberSmallWidth*11) || 
                        i === (numberSmallWidth*12) || i === (numberSmallWidth*13) || i === (numberSmallWidth*14) || i === (numberSmallWidth*15) ||
                        i === (numberSmallWidth*16) || i === (numberSmallWidth*17) || i === (numberSmallWidth*18) || i === (numberSmallWidth*19) ) {
                    mines.checkFirstLine(i+1, i-(numberSmallWidth-1), i-(numberSmallWidth-0), i+1+(numberSmallWidth-0), i+(numberSmallWidth-0), i);
                } else if(i === (numberSmallWidth*2)-1 || i === (numberSmallWidth*3)-1 || i === (numberSmallWidth*4)-1 || // ok
                        i === (numberSmallWidth*5)-1 || i === (numberSmallWidth*6)-1 || i === (numberSmallWidth*7)-1 ||
                        i === (numberSmallWidth*8)-1 || i === (numberSmallWidth*9)-1 ||i === (numberSmallWidth*10)-1 || 
                        i === (numberSmallWidth*11)-1 || i === (numberSmallWidth*12)-1 || i === (numberSmallWidth*13)-1 ||
                        i === (numberSmallWidth*14)-1 || i === (numberSmallWidth*15)-1 || i === (numberSmallWidth*16)-1 || 
                        i === (numberSmallWidth*17)-1 || i === (numberSmallWidth*18)-1 || i === (numberSmallWidth*19)-1 ){
                    mines.checkFirstLine(i-1, (i-numberSmallWidth), i-(numberSmallWidth-0)-1, i+(numberSmallWidth-1), i+(numberSmallWidth-0), i);
                } else{
                    mines.checkOthers(i-1, i+1, i-(numberSmallWidth-1), i-(numberSmallWidth-0), (i-numberSmallWidth-1), i+(numberSmallWidth-1), i+(numberSmallWidth-0), i+1+(numberSmallWidth-0), i);
                }
            });
        }
    }
}

let numberBigWidth;
let numberSmallWidth;

class App{
    constructor(){
        this.field = new Fields();
        this.field.setFields();
        this.field.setBombs();
        this.field.setEmpty();
        this.field.setSeconds();
        this.mines = new Check(new Mines());
    }
}

const btnStart = document.getElementById('enter-btn');
const btnNewGame = document.getElementById('new-game');

btnStart.addEventListener('click', () => {
    new App();
    btnStart.style.display = 'none';
    document.getElementById('user-input').style.display = 'none';
    document.getElementById('label').style.display = 'none';
    btnNewGame.style.display = 'block';
});

btnNewGame.addEventListener('click', () => {
    location.reload();
});