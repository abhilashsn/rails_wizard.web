$(function() {
  // $("select, input:checkbox, input:radio, input:file").uniform();
  
  var hideFlash = function() { $('aside.flash').slideUp('slow'); }
  $('aside.flash').click(hideFlash);
  setTimeout(hideFlash, 5000);
  
  $('a.disabled').live('click', function(e) {
    e.preventDefault();
    return false;
  });
  
});
