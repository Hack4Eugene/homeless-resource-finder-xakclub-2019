// index.js -- The index file for handling basic JS crap.

element = document.getElementById('page-swipe');

window.swipePagination = new Swipe(element, {
    startSlide: 0,
    auto: 3000,
    draggable: true,
    autoRestart: false,
    continuous: false,
    disableScroll: true,
    stopPropagation: true,
    callback: function(index, element) {},
    transitionEnd: function(index, element) {}
});

$('.hover').hover(function() {
   $(this).css('opacity', '1'); 
}, function() {
    $(this).css('opacity', '.5');
});

$('.interactive').click(function() {
    
})