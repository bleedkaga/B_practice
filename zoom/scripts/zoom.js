(() => {
    function $(classname){
        return document.querySelectorAll(classname)
    }

    let [prev, next] = $(".zoom_operation span");
    let moved = 0;
    let zoom_move = $('.operation_inline')[0];
    let moveWidth = 68;
    let aLi = document.querySelector('.operation_inline').children;
    let len = aLi.length;
    let currentSrc = null;
    prev.onclick = function(){
        move(-1)
    }
    
    next.onclick = function(){
        move(1)
    }

    $('.operation_inline')[0].onmouseover = ( e ) => {
        for(let i = 0; i < aLi.length; i++){  
            aLi[i].classList.remove('img-hover')
        }
        e.target.parentNode.classList.add('img-hover')
        if(e.target.nodeName !== "IMG")return;
        currentSrc = e.target.dataset.md;
        $('.zoom_preview_img')[0].src = currentSrc;
        $('.zoom_preview_img')[0].dataset.lg = e.target.dataset.lg;
    }

    function move( m ){
        moved += m;
        checkBtnDisabled();
        if(moved < 0 ){
            moved = 0;
            return;
        };
        if(moved > len - 5){
            moved = len - 5;
        };
        
        zoom_move.style.marginLeft = - moved * moveWidth +'px'
    }

    function checkBtnDisabled(){
        if(moved == 0){
            prev.classList.add('btn-disabled')
        } else {
            prev.classList.remove('btn-disabled')
        }

        moved >= len - 5 ?  next.classList.add('btn-disabled') :  next.classList.remove('btn-disabled')
    }


    // 放大镜
    let preview = document.getElementById('zoomPreview');
    let mask = document.getElementById('zoomMask');
    let Img = document.getElementById('zoomImg')
    let SMask = document.getElementById('SMask')
    let largeDiv = document.getElementById('largeDiv')

    preview.onmouseover = (e) => {
        mask.style.opacity = .5;
        largeDiv.style.display = 'block'
        largeDiv.style.backgroundImage = `url(${Img.dataset.lg})`
    }
    SMask.onmousemove = (e) => {
        var offsetX = e.offsetX, offsetY = e.offsetY;
        var w = 118, h = w;
        var top = offsetY - h,
            left = offsetX - w;
        mask.style.top = top + 'px'
        mask.style.left = left + 'px'

        if(parseInt(mask.style.top) < 0){
            mask.style.top = 0;
        }
        if(parseInt(mask.style.left) < 0){
            mask.style.left = 0;
        }

        if(parseInt(mask.style.top) > 216){
            mask.style.top = 218+'px'
        }
        if(parseInt(mask.style.left) > 216){
            mask.style.left = 214+'px'
        }

        largeDiv.style.backgroundPosition = 
                (-parseInt(mask.style.left) * 1.31) + 'px '
                +(-parseInt(mask.style.top) * 1.31) + 'px'
    }
    preview.onmouseout = e => {
        mask.style.opacity = 0;
        largeDiv.style.display = 'none'
    }
})()