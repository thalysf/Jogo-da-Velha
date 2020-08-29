function draw(x, y, mode) {
    const normal = 5;
    const fast = 2;
    var canvas = document.getElementById('canvasLinhas');
    var context = canvas.getContext('2d');
    context.strokeStyle = 'red';
    context.lineWidth = 2;
    context.beginPath();
    // Colunas
    if(mode == 1)
    {
        setInterval(function(){
            context.lineTo(x, y);
            context.stroke();
            y += 1;
        }, normal);
    }
    // Linhas
    else if(mode == 2)
    {
        setInterval(function(){
            context.lineTo(x, y);
            context.stroke();
            x += 1;
        }, normal);
    }
    // Diaogonal principal
    else if(mode == 3){
        setInterval(function(){
            context.lineTo(x, y);
            context.stroke();
            x += 1;
            y += 0.5;
        }, fast);
    }
     // Diaogonal secundária
     else{
        setInterval(function(){
            context.lineTo(x, y);
            context.stroke();
            x += -1;
            y += 0.5;
            
        }, fast);
     }
    context.closePath();
}
