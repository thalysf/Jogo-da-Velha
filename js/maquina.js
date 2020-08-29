var controlaJogada = {
    posicaoDaJogada: [-1, -1]
};
function jogadaMaquinaAleatoria(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function jogadaRandom()
{
    var i, j;  
    var posJogada = [0, 0];
    do{
        i = jogadaMaquinaAleatoria(0, 3);
        j = jogadaMaquinaAleatoria(0, 3);
    }while(jogoDaVelha.matriz[i][j] != 0);

    posJogada[0] = i; posJogada[1] = j;
    return posJogada;
}
function MaquinaJoga()
{
    selecionadaJogada();
    var i = controlaJogada.posicaoDaJogada[0];
    var j = controlaJogada.posicaoDaJogada[1];
    var cell;
    const cell00 = document.getElementById('c00');
    const cell01 = document.getElementById('c01');
    const cell02 = document.getElementById('c02');
    const cell10 = document.getElementById('c10');
    const cell11 = document.getElementById('c11');
    const cell12 = document.getElementById('c12');
    const cell20 = document.getElementById('c20');
    const cell21 = document.getElementById('c21');
    const cell22 = document.getElementById('c22');
   
    jogoDaVelha.matriz[i][j] = 2;
    if(i == 0 && j == 0)
    {
        cell = cell00;
    }
    else if(i == 0 && j == 1)
    {
        cell = cell01;
    }
    else if(i == 0 && j == 2)
    {
        cell = cell02;
    }
    else if(i == 1 && j == 0)
    {
        cell = cell10;
    }
    else if(i == 1 && j == 1)
    {
        cell = cell11;
    }
    else if(i == 1 && j == 2)
    {
        cell = cell12;
    }
    else if(i == 2 && j == 0)
    {
        cell = cell20;
    }
    else if(i == 2 && j == 1)
    {
        cell = cell21;
    }
    else{
        cell = cell22;
    }
    cell.classList.remove("efects");
    cell.innerHTML = "<i class='far fa-circle'></i>";
    jogoDaVelha.trocaXBola = 1;
    verificaSeDeuVelha();
    verificaVitoria();
   
}
function selecionadaJogada()
{
    var retorno = [0, 0];
    var aux = 0;
    // 1 -> random
    // 2 -> defesa
    // 3 -> ataque

    
    // Se não houver, verifica maneira de ganhar (ataque)
    // * Linhas
    if(verificaLinhas(2) && aux == 0)
    {
        tipo = 3;
        retorno = verificaLinhas(2);
        if(retorno) aux = 1;
    }
    // * Colunas

    if(verificaColunas(2) && aux == 0 )
    {
        tipo = 3;
        retorno = verificaColunas(2);
        if(retorno) aux = 1;
    }
    // * Diagonais
   
    if( verificaDiagonais(2) && aux == 0)
    {
        tipo = 3;
        retorno = verificaDiagonais(2);
        if(retorno) aux = 1;
    }
   // Verifica necessidade de defesa

    // * Linhas
  ;
    if(verificaLinhas(1) && aux == 0)
    {
        tipo = 2;
        retorno = verificaLinhas(1);
        if(retorno) aux = 1;
    }
   
    // * Colunas
  
    if(verificaColunas(1) && aux == 0)
    {
        tipo = 2;
        retorno = verificaColunas(1);
        if(retorno) aux = 1;
    }

    // * Diagonais
    if(verificaDiagonais(1) && aux == 0)
    {
        tipo = 2;
        retorno = verificaDiagonais(1);
        if(retorno) aux = 1;
    }

     // Se não houver, faz uma jogada randômica
    if(jogoDaVelha.matriz[retorno[0]][retorno[1]] != 0)
    {
        retorno = jogadaRandom();
    }
    console.log(aux);
    if(aux == 0) 
    {
        retorno = jogadaRandom();
        console.log('random');
        console.log(retorno);
    }
    console.log(retorno);
    fazJogada(retorno);
}
function fazJogada(retorno)
{
    controlaJogada.posicaoDaJogada[0] = retorno[0];
    controlaJogada.posicaoDaJogada[1] = retorno[1];
}
function verificaLinhas(simbolo)
{
    var qtdPreenchida = 0;
    var localDaJogada = [0, 0];
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            if(jogoDaVelha.matriz[i][j] == simbolo)
            {
                qtdPreenchida++;
            }
            else if(jogoDaVelha.matriz[i][j] != 0 && jogoDaVelha.matriz[i][j] != simbolo)
            {
                qtdPreenchida--;
            }
            if(jogoDaVelha.matriz[i][j] == 0){
                localDaJogada[0] = i;
                localDaJogada[1] = j;
            }
            if(qtdPreenchida == 2 && j == 2)
            {
                return localDaJogada;
            }
        }
        qtdPreenchida = 0;
    }
    return false;
}
function verificaColunas(simbolo)
{
    var qtdPreenchida = 0;
    var localDaJogada = [0, 0];
    for(let j = 0; j < 3; j++)
    {
        for(let i = 0; i < 3; i++)
        {
            if(jogoDaVelha.matriz[i][j] == simbolo)
            {
                qtdPreenchida++;
            }
            else if(jogoDaVelha.matriz[i][j] != 0 && jogoDaVelha.matriz[i][j] != simbolo)
            {
                qtdPreenchida--;
            }
            if(jogoDaVelha.matriz[i][j] == 0){
                localDaJogada[0] = i;
                localDaJogada[1] = j;
            }
            if(qtdPreenchida == 2 && i == 2)
            {
                return localDaJogada;
            }
        }
        qtdPreenchida = 0;
    }
    return false;
}
function verificaDiagonais(simbolo)
{
    var qtdPreenchida = 0;
    var localDaJogada = [0, 0];
    // Diagonal principal
    
    for(let i = 0; i < 3; i++)
    {
        for(let j = i; j <= i; j++)
        {
            if(jogoDaVelha.matriz[i][j] == simbolo)
            {
                qtdPreenchida++;
            }
            else if(jogoDaVelha.matriz[i][j] != 0 && jogoDaVelha.matriz[i][j] != simbolo)
            {
                qtdPreenchida--;
            }
            if(jogoDaVelha.matriz[i][j] == 0){
                localDaJogada[0] = i;
                localDaJogada[1] = j;
            }
            if(qtdPreenchida == 2 && j == 2)
            {
                return localDaJogada;
            }   
        }
    }
    
    qtdPreenchida = 0;
    localDaJogada = [0, 0];
    // Diagonal Secundária

    let i = 0, j = 2;
    while(i < 3 && j >= 0)
    {
        if(jogoDaVelha.matriz[i][j] == simbolo)
        {
            qtdPreenchida++;
        }
        else if(jogoDaVelha.matriz[i][j] != 0 && jogoDaVelha.matriz[i][j] != simbolo)
        {
                qtdPreenchida--;
        }
        if(jogoDaVelha.matriz[i][j] == 0){
            localDaJogada[0] = i;
            localDaJogada[1] = j;
        }
        if(qtdPreenchida == 2 && i == 2)
        {
            return localDaJogada;
        }
        i++; j--;
    }
    return false;
}