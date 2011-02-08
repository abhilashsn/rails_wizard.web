$(function() {
  // $("select, input:checkbox, input:radio, input:file").uniform();
  
  var hideFlash = function() { $('aside.flash').slideUp('slow'); }
  $('aside.flash').click(hideFlash);
  setTimeout(hideFlash, 5000);
  
  $('a.disabled').live('click', function(e) {
    e.preventDefault();
    return false;
  });

  if (generateTOC) {
    $('body').append('<section id="toc"><h1>Jump To Section</h1><nav></nav></section>');
  
    var hId = 1;
    $('#main h1').each(function() {
      if (!$(this).attr('id')) {
        $(this).attr('id', "heading_" + hId);
        hId++;
      }
    
      $('#toc nav').append('<a href="#' + $(this).attr('id') + '">' + $(this).text() + '</a>');
      $('#toc nav a').live('click',function() {
        var target = $($(this).attr('href'));
        $('html,body').animate({scrollTop:target.offset().top - 30});
        return false;
      });
    });
  }
  
  $('.field.radio, .field.check').checkable();
});