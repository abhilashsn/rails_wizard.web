$(function() { if ($('#unused_recipes').length > 0) {
  $('ul.recipes').isotope({
    itemSelector:'li',
    layoutMode:'fitRows',
    animationEngine:'best-available',
    getSortData:{
      name:function(recipe){ return recipe.attr('data-name'); }
    },
    sortBy:'name'
  });

  $('#recipe_filters a').click(function() {
    $('#unused_recipes').isotope({
      filter:$(this).attr('data-filter')
    }); 
    return false;
  });

  $('ul.recipes li').live('recipe:add', function() {
    $('#selected_recipes').isotope('insert', $(this).clone());
    $(this).addClass('disabled');
    $('#unused_recipes').find('li[data-exclusive=' + $(this).attr('data-exclusive') + ']').addClass('disabled');
    $('#name_filter').val('');
    $('#help_text li').removeClass('visible');
  });

  $('ul.recipes li').live('recipe:remove', function() {
    $('#selected_recipes').isotope('remove',$(this)).isotope('reLayout');
    $('#unused_recipes').find('li[data-name=' + $(this).attr('data-name') + ']').removeClass('disabled');
    $('#unused_recipes').find('li[data-exclusive=' + $(this).attr('data-exclusive') + ']').removeClass('disabled');
    $('#help_text li').removeClass('visible');  
  });

  $('#unused_recipes').delegate('li:not(.disabled)','click',function() {
    $(this).trigger('recipe:add');
    return false;
  });

  $('#selected_recipes').delegate('li:not(.disabled)','click',function() {
    $(this).trigger('recipe:remove');
    return false;
  });

  setInterval(function() {
    $('#recipe_picker').css('margin-top', $('#new_rails_template').height() + 25);
  });

  $('ul.recipes li').live('mouseover', function() {
    $('#help_' + $(this).find('input').val()).addClass('visible');
  });
  
  $('ul.recipes li').live('mouseout', function() {
    $('#help_' + $(this).find('input').val()).removeClass('visible');  
  })

  $('#name_filter').keyup(function() {
    if ($(this).val() == '')
      var filter = "*"
    else
      var filter = "[data-name^=" + $(this).val() + "]"
    
    $('#unused_recipes').isotope({filter:filter}); 
  });

  var letters = "abcdefghijklmnopqrstuvwxyz".split('');
  $(document).keydown(function(e) {
    if ($(e.target).is('input, textarea')) return true;

    var input = $('#name_filter')
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      input.val(input.val() + letters[e.which - 65]);
      input.trigger('keyup');
    } else if (e.keyCode === 8) {
      input.val(input.val().substring(0, input.val().length - 1));
      input.trigger('keyup');
      return false;
    } else if (e.keyCode === 13) {
      activeRecipes = $('#unused_recipes li:not(.isotope-hidden, .disabled)');
      if (activeRecipes.length == 1) {
        activeRecipes.click();
      }
    } else if (e.keyCode === 27) {
      input.val('');
      $('#unused_recipes').isotope({filter:'*'});    
    }
  });
} });
