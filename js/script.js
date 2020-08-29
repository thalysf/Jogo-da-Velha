var jogoDaVelha = {
    trocaXBola: 1, // 1 -> X | 2 -> Bola
    matriz: [ 
        [0, 0, 0], 
        [0, 0, 0], 
        [0, 0, 0] 
    ],
    sequenciasVitoriosas: [
        // Linhas
        '0.0, 0.1, 0.2', '1.0, 1.1, 1.2', '2.0, 2.1, 2.2',
        // Colunas
        '0.0, 1.0, 2.0', '0.1, 1.1, 2.1', '0.2, 1.2, 2.2',
        // Diagonais
        '0.0, 1.1, 2.2', '0.2, 1.1, 2.0'
    ],
    win: 0, // win == 1 -> significa que teve ganhador
    sequenciaGanhadora: 0,
    jogadasRealizas: 0,
    alternaEfeitosSonoros: 1,
    mute: 0
};
document.onload = main();
function main()
{
    if(!jogoDaVelha.mute) startGameSom();
    // Jogador
    const cell00 = document.getElementById('c00');
    const cell01 = document.getElementById('c01');
    const cell02 = document.getElementById('c02');
    const cell10 = document.getElementById('c10');
    const cell11 = document.getElementById('c11');
    const cell12 = document.getElementById('c12');
    const cell20 = document.getElementById('c20');
    const cell21 = document.getElementById('c21');
    const cell22 = document.getElementById('c22');
   // Controls
    const som = document.querySelector("p#som i");
    const refresh = document.querySelector("p#refresh i");
    som.addEventListener('click', function(){
        console.log('clicado')
        if(jogoDaVelha.mute == 0)
        {
            jogoDaVelha.mute = 1;
            som.classList.remove("fa-volume-up");
            som.classList.add("fa-volume-mute");
        }
        else{
            som.classList.remove("fa-volume-mute")
            som.classList.add("fa-volume-up");
            jogoDaVelha.mute = 0;
        }
    });
    refresh.addEventListener('click', resetPalco)
    cell00.addEventListener('click', ()=>
    {
        verificaXBola(cell00, 0, 0);
    });
    cell01.addEventListener('click', ()=>
    {
        verificaXBola(cell01, 0, 1);
    });
    cell02.addEventListener('click', ()=>
    {
        verificaXBola(cell02, 0, 2);
    });
    cell10.addEventListener('click', ()=>
    {
        verificaXBola(cell10, 1, 0);
    });
    cell11.addEventListener('click', ()=>
    {
        verificaXBola(cell11, 1, 1);
    });
    cell12.addEventListener('click', ()=>
    {
        verificaXBola(cell12, 1, 2);
    });
    cell20.addEventListener('click', ()=>
    {
        verificaXBola(cell20, 2, 0);
    });
    cell21.addEventListener('click', ()=>
    {
        verificaXBola(cell21, 2, 1);
    });
    cell22.addEventListener('click', ()=>
    {
        verificaXBola(cell22, 2, 2);
    });
    
    document.getElementById('playAgain').addEventListener('click', resetPalco);
}

function verificaXBola(jogadaX, x, y)
{
    if(jogoDaVelha.matriz[x][y] != 0)
    {
        return;
    }
    else{
        let xOrBall = document.createElement('i');
        let aux = 0;
        if(jogoDaVelha.trocaXBola == 1 && jogoDaVelha.matriz[x][y] == 0)
        {
            jogoDaVelha.trocaXBola = 2;
            jogoDaVelha.matriz[x][y] = 1;
            xOrBall.innerHTML = "<i class='fas fa-times'></i>";
            if(!jogoDaVelha.mute)  cliqueJogadorSom();
            aux = 1;
        }
        if(aux)
        {
            jogadaX.appendChild(xOrBall);
        }
        jogadaX.classList.remove("efects");
        jogoDaVelha.jogadasRealizas++;
        verificaVitoria();
        if(jogoDaVelha.jogadasRealizas < 9 && jogoDaVelha.win == 0)
        {
            setTimeout(MaquinaJoga, 1000);
            if(!jogoDaVelha.mute) setTimeout( jogadaBolaSom, 1000);
            jogoDaVelha.jogadasRealizas++;
        }
        verificaSeDeuVelha();
    }
    
}
function verificaVitoria(){
    for(let i = 0; i < 8; i++)
    {
        let vitoria = jogoDaVelha.sequenciasVitoriosas[i].split(",");
        let p1 = vitoria[0].split('.');
        let p2 = vitoria[1].split('.');
        let p3 = vitoria[2].split('.');
        toNumber(p1); toNumber(p2); toNumber(p3);
        if(jogoDaVelha.matriz[p1[0]][p1[1]] == 1 && jogoDaVelha.matriz[p2[0]][p2[1]] == 1
             && jogoDaVelha.matriz[p3[0]][p3[1]] == 1)
            {
                winner(1)
                jogoDaVelha.win = 1;
                jogoDaVelha.sequenciaGanhadora = i+1;
                
            }
        else if(jogoDaVelha.matriz[p1[0]][p1[1]] == 2 && jogoDaVelha.matriz[p2[0]][p2[1]] == 2
              && jogoDaVelha.matriz[p3[0]][p3[1]] == 2)
            {
                winner(2);
                jogoDaVelha.win = 1;
                jogoDaVelha.sequenciaGanhadora = i+1;
            }  
    } 
    desenhaLinha();
}
function toNumber(vect)
{
    for(let i = 0; i<2;i++)
    {
        vect[i] = Number(vect[i]);
    }
}
function deuVelha()
{
    document.getElementById('modalLabel').innerText = "Deu Velha, jogo empatado!"
    document.getElementsByClassName('modal-body')[0].innerHTML = "<i class='far fa-meh-blank empate'></i>";
    document.getElementById('btn-modal').click();
    if(!jogoDaVelha.mute) empateSom();
    limpaMatriz();
}
function winner(vencedor){
    if(vencedor == 1)
    {
        document.getElementById('modalLabel').innerText = `Parabéns jogador, você venceu!`;
        document.getElementsByClassName('modal-body')[0].innerHTML = "<i class='fas fa-trophy'></i>";
        if(jogoDaVelha.alternaEfeitosSonoros == 1)
        {
            if(!jogoDaVelha.mute)
            {
                vitoriaSom01(); 
                jogoDaVelha.alternaEfeitosSonoros = 2;
            } 
            
        }
        else{
            if(!jogoDaVelha.mute)
            {
                vitoriaSom02();
                jogoDaVelha.alternaEfeitosSonoros = 1;
            }  
        }
    }
    else{
        document.getElementById('modalLabel').innerText = `Não foi dessa vez, a máquina venceu!`;
        document.getElementsByClassName('modal-body')[0].innerHTML = "<i class='fas fa-robot machineWin'></i>";
        if(jogoDaVelha.alternaEfeitosSonoros == 1)
        {
            
            if(!jogoDaVelha.mute){
                derrotaSom01(); 
                jogoDaVelha.alternaEfeitosSonoros = 2;
             }
           
        }
        else{
            if(!jogoDaVelha.mute){
                derrotaSom02(); 
                jogoDaVelha.alternaEfeitosSonoros = 1;
             }
        }
    }
    document.getElementById('btn-modal').click();
    
}
function verificaSeDeuVelha()
{
    let camposPreenchidos = 0;
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(jogoDaVelha.matriz[i][j] != 0)
            {
                camposPreenchidos++;
            }
        }
    }
    if(camposPreenchidos == 9 && jogoDaVelha.win == 0)
    {
        deuVelha();
    }
}
function resetPalco()
{
  
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            jogoDaVelha.matriz[i][j] = 0;
        }
    }
    
    let cells = document.getElementsByClassName('col-md-4');
    for(i = 0; i < cells.length; i++){
        cells[i].innerHTML = '';
    }
    jogoDaVelha.trocaXBola = 1;
    jogoDaVelha.win = 0;
    jogoDaVelha.sequenciaGanhadora = 0;
   
    document.getElementById('canvasLinhas').remove();
    const canv = document.createElement('canvas');
    canv.id = 'canvasLinhas';
    document.getElementsByClassName('area-jogo-da-velha')[0].appendChild(canv);
   
    let celulas = document.getElementsByClassName('col-md-4');
    for(let i = 0; i < celulas.length; i++)
    {
        let celula = celulas[i];
        celula.classList.add("efects");
        celula.innerHTML = "<i class='fas fa-times hovercel'></i>"
    }
    jogoDaVelha.jogadasRealizas = 0;
}
function limpaMatriz(){
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            jogoDaVelha.matriz[i][j] = 0;
        }
    }
}

function desenhaLinha()
{
    if(jogoDaVelha.sequenciaGanhadora != 0)
    {
        document.getElementById('canvasLinhas').style.display = "block";
        switch(jogoDaVelha.sequenciaGanhadora)
        {
            case 1: draw(0, 23.2, 2)     
                    break;
            case 2: draw(0, 74, 2)     
                    break;
            case 3: draw(0, 125, 2)     
                    break;
            case 4: draw(49, 0, 1)                   
                    break;
            case 5: draw(149, 0, 1)
                    break;
            case 6: draw(250, 0, 1) 
                    break; 
            case 7: draw(0, 0, 3)
                    break;
            case 8: draw(300, 0, 4)
                    break;            
        }
    }
}