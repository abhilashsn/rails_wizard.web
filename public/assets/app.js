(function($) {
  $.checkable = {
    options:{
      focusedClass:'focused',
      checkedClass:'checked',
      disabledClass:'disabled'
    }
  };
  
  $.fn.checkable = function(options) {
    var options = $.extend($.checkable.options, options);
    
    return this.each(function() {
      var container = $(this);
      var input = $(this).find('input:radio');
      
      if (input.is(':disabled'))
        container.addClass('disabled');
      
      container.click(function(e) {
        if ($(e.target).is('label') || input.is(':disabled')) { return true; }
        
        if (input.is(':checkbox')) {
          input.is(':checked') ? input.attr('checked',false) : input.attr('checked',true);
          input.trigger('checkable.change');
        } else {
          input.attr('checked',true);
          $('input:radio[name=' + input.attr('name') + ']').trigger('checkable.change'); 
        }
      });
      
      input.css({'position':'absolute','left':'-999em'});
      input.focus(function() { container.addClass(options.focusedClass) });
      input.blur(function() { container.removeClass(options.focusedClass); input.trigger('checkable.change') });
      input.change(function() {
        input.trigger('checkable.change');
        $('input:radio[name=' + input.attr('name') + ']').trigger('checkable.change'); 
      });
      
      input.bind('checkable.change', function() {
        if ($(this).is(':checked')) {
          container.addClass(options.checkedClass);
        } else {
          container.removeClass(options.checkedClass);
        }
      });
      
      input.trigger('checkable.change');
    });
  };
})(jQuery);
/**
 * Isotope v1.0.110225
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2011 David DeSandro / Metafizzy
 */
(function(l,f,r){var m=function(){var a=["Moz","Webkit","Khtml","O","Ms"],b={};return function(c,d){d=d||document.documentElement;var e=d.style,g,h,i,s;if(arguments.length===1&&typeof b[c]==="string")return b[c];if(typeof e[c]==="string")return b[c]=c;h=c.charAt(0).toUpperCase()+c.slice(1);i=0;for(s=a.length;i<s;i++){g=a[i]+h;if(typeof e[g]==="string")return b[c]=g}}}(),t=document.documentElement,v=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),n=[{name:"csstransforms",getResult:function(){return!!m("transform")}},
{name:"csstransforms3d",getResult:function(){var a=!!m("perspective");if(a){var b=document.createElement("style"),c=document.createElement("div");a="@media ("+v.join("transform-3d),(")+"modernizr)";b.textContent=a+"{#modernizr{height:3px}}";(document.head||document.getElementsByTagName("head")[0]).appendChild(b);c.id="modernizr";t.appendChild(c);a=c.offsetHeight===3;b.parentNode.removeChild(b);c.parentNode.removeChild(c)}return!!a}},{name:"csstransitions",getResult:function(){return!!m("transitionProperty")}}],
j,u=n.length;if(l.Modernizr)for(j=0;j<u;j++){var o=n[j];Modernizr.hasOwnProperty(o.name)||Modernizr.addTest(o.name,o.getResult)}else l.Modernizr=function(){var a={_version:"1.6ish: miniModernizr for Isotope"},b=[],c,d;for(j=0;j<u;j++){c=n[j];d=c.getResult();a[c.name]=d;c=(d?"":"no-")+c.name;b.push(c)}t.className+=" "+b.join(" ");return a}();var k={transformProp:m("transform"),fnUtils:Modernizr.csstransforms3d?{translate:function(a){return"translate3d("+a[0]+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+
a+", "+a+", 1) "}}:{translate:function(a){return"translate("+a[0]+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},set:function(a,b,c){var d=f(a),e=d.data("isoTransform")||{},g={},h,i={};g[b]=c;f.extend(e,g);for(h in e)i[h]=(0,k.fnUtils[h])(e[h]);b=(i.translate||"")+(i.scale||"");d.data("isoTransform",e);a.style[k.transformProp]=b}};f.cssNumber.scale=true;f.cssHooks.scale={set:function(a,b){if(typeof b==="string")b=parseFloat(b);k.set(a,"scale",b)},get:function(a){return(a=f.data(a,"transform"))&&
a.scale?a.scale:1}};f.fx.step.scale=function(a){f.cssHooks.scale.set(a.elem,a.now+a.unit)};f.cssNumber.translate=true;f.cssHooks.translate={set:function(a,b){k.set(a,"translate",b)},get:function(a){return(a=f.data(a,"transform"))&&a.translate?a.translate:[0,0]}};var p=f.event,q;p.special.smartresize={setup:function(){f(this).bind("resize",p.special.smartresize.handler)},teardown:function(){f(this).unbind("resize",p.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type=
"smartresize";q&&clearTimeout(q);q=setTimeout(function(){jQuery.event.handle.apply(c,d)},b==="execAsap"?0:100)}};f.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])};f.Isotope=function(a,b){this.element=f(b);this._create(a);this._init()};f.Isotope.prototype={options:{resizable:true,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:Modernizr.csstransforms&&!f.browser.opera?{opacity:0,
scale:0.0010}:{opacity:0},visibleStyle:Modernizr.csstransforms&&!f.browser.opera?{opacity:1,scale:1}:{opacity:1},animationEngine:f.browser.opera?"jquery":"best-available",animationOptions:{queue:false,duration:800},sortBy:"original-order",sortAscending:true,resizesContainer:true},_filterFind:function(a,b){return b?a.filter(b).add(a.find(b)):a},_create:function(a){this.options=f.extend(true,{},this.options,a);this.isNew={};this.styleQueue=[];this.elemCount=0;this.$allAtoms=this._filterFind(this.element.children(),
this.options.itemSelector);this.element.css({overflow:"hidden",position:"relative"});a=false;switch(this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,"")){case "none":this.applyStyleFnName="css";break;case "jquery":this.applyStyleFnName="animate";a=true;break;default:this.applyStyleFnName=Modernizr.csstransitions?"css":"animate"}this.getPositionStyles=(this.usingTransforms=Modernizr.csstransforms&&Modernizr.csstransitions&&!a)?this._translate:this._positionAbs;this.options.getSortData=
f.extend(this.options.getSortData,{"original-order":function(c,d){return d.elemCount}});this._setupAtoms(this.$allAtoms);a=f(document.createElement("div"));this.element.prepend(a);this.posTop=Math.round(a.position().top);this.posLeft=Math.round(a.position().left);a.remove();var b=this;setTimeout(function(){b.element.addClass(b.options.containerClass)},0);this.options.resizable&&f(l).bind("smartresize.isotope",function(){b.element.isotope("resize")})},_isNewProp:function(a){return this.prevOpts?this.options[a]!==
this.prevOpts[a]:true},_init:function(a){var b=this;f.each(["filter","sortBy","sortAscending"],function(c,d){b.isNew[d]=b._isNewProp(d)});this.$filteredAtoms=this.isNew.filter?this._filter(this.$allAtoms):this.$allAtoms;if(this.isNew.filter||this.isNew.sortBy||this.isNew.sortAscending)this._sort();this.reLayout(a)},option:function(a,b){if(f.isPlainObject(a))this.options=f.extend(true,this.options,a);else if(a&&typeof b==="undefined")return this.options[a];else this.options[a]=b;return this},_setupAtoms:function(a){var b=
{position:"absolute"};if(this.usingTransforms){b.left=0;b.top=0}a.css(b).addClass(this.options.itemClass);this.updateSortData(a,true)},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(b){var c=this.options.hiddenClass,d="."+c,e=a.not(d),g=a.filter(d);d=g;a=a.filter(b);if(b!=="*"){d=g.filter(b);b=e.not(b).toggleClass(c);b.addClass(c);this.styleQueue.push({$el:b,style:this.options.hiddenStyle})}this.styleQueue.push({$el:d,style:this.options.visibleStyle});d.removeClass(c)}return a},
updateSortData:function(a,b){var c=this,d=this.options.getSortData,e,g;a.each(function(){e=f(this);g={};for(var h in d)g[h]=d[h](e,c);e.data("isotope-sort-data",g);b&&c.elemCount++})},_sort:function(){var a=this,b=function(d){return f(d).data("isotope-sort-data")[a.options.sortBy]},c=this.options.sortAscending?1:-1;this.$filteredAtoms.sort(function(d,e){var g=b(d),h=b(e);return(g>h?1:g<h?-1:0)*c});return this},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){return{left:a,
top:b}},_pushPosition:function(a,b,c){b=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:b})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);this.options.resizesContainer&&this.styleQueue.push({$el:this.element,style:this["_"+c+"GetContainerSize"]()});var d=this.applyStyleFnName==="animate"&&!this.isLaidOut?"css":this.applyStyleFnName,e=this.options.animationOptions;f.each(this.styleQueue,function(g,h){h.$el[d](h.style,e)});this.styleQueue=[];b&&b.call(a);
this.isLaidOut=true;return this},resize:function(){return this["_"+this.options.layoutMode+"Resize"]()},reLayout:function(a){return this["_"+this.options.layoutMode+"Reset"]().layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._filterFind(a,this.options.itemSelector);this._setupAtoms(c);this.$allAtoms=this.$allAtoms.add(c);b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(d){d=c._filter(d);c.$filteredAtoms=c.$filteredAtoms.add(d)});this._sort().reLayout(b)},
appended:function(a,b){var c=this;this.addItems(a,function(d){c.$filteredAtoms=c.$filteredAtoms.add(d);c.layout(d,b)})},remove:function(a){this.$allAtoms=this.$allAtoms.not(a);this.$filteredAtoms=this.$filteredAtoms.not(a);a.remove()},_shuffleArray:function(a){var b,c,d=a.length;if(d)for(;--d;){c=~~(Math.random()*(d+1));b=a[c];a[c]=a[d];a[d]=b}return a},shuffle:function(a){this.options.sortBy="shuffle";this.$allAtoms=this._shuffleArray(this.$allAtoms);this.$filteredAtoms=this._filter(this.$allAtoms);
return this.reLayout(a)},destroy:function(){var a=f.extend(this.options.visibleStyle,{position:"relative",top:"auto",left:"auto"});if(this.usingTransforms)a[k.transformProp]="none";this.$allAtoms.css(a).removeClass(this.options.hiddenClass+" "+this.options.itemClass);this.element.css({width:"auto",height:"auto"}).unbind(".isotope").removeClass(this.options.containerClass).removeData("isotope");f(l).unbind(".isotope")},_getSegments:function(a,b){var c=b?"rowHeight":"columnWidth",d=b?"height":"width",
e=b?"rows":"cols";this[a][c]=this.options[a]&&this.options[a][c]||this.$allAtoms["outer"+(b?"Height":"Width")](true);if(!this[a][c]){f.error(c+" calculated to be zero. Stopping Isotope plugin before divide by zero. Check that the width of first child inside the isotope container is not zero.");return this}this[d]=this.element[d]();this[a][e]=Math.max(Math.floor(this[d]/this[a][c]),1);return this},_masonryPlaceBrick:function(a,b,c){b=Math.min.apply(Math,c);for(var d=b+a.outerHeight(true),e=c.length,
g=e,h=this.masonry.cols+1-e;e--;)if(c[e]===b)g=e;this._pushPosition(a,this.masonry.columnWidth*g+this.posLeft,b);for(e=0;e<h;e++)this.masonry.colYs[g+e]=d},_masonryLayout:function(a){var b=this;a.each(function(){var c=f(this),d=Math.ceil(c.outerWidth(true)/b.masonry.columnWidth);d=Math.min(d,b.masonry.cols);if(d===1)b._masonryPlaceBrick(c,b.masonry.cols,b.masonry.colYs);else{var e=b.masonry.cols+1-d,g=[],h,i;for(i=0;i<e;i++){h=b.masonry.colYs.slice(i,i+d);g[i]=Math.max.apply(Math,h)}b._masonryPlaceBrick(c,
e,g)}});return this},_masonryReset:function(){this.masonry={};this._getSegments("masonry");var a=this.masonry.cols;for(this.masonry.colYs=[];a--;)this.masonry.colYs.push(this.posTop);return this},_masonryResize:function(){var a=this.masonry.cols;this._getSegments("masonry");this.masonry.cols!==a&&this.reLayout();return this},_masonryGetContainerSize:function(){return{height:Math.max.apply(Math,this.masonry.colYs)-this.posTop}},_fitRowsLayout:function(a){this.width=this.element.width();var b=this;
a.each(function(){var c=f(this),d=c.outerWidth(true),e=c.outerHeight(true);if(b.fitRows.x!==0&&d+b.fitRows.x>b.width){b.fitRows.x=0;b.fitRows.y=b.fitRows.height}b._pushPosition(c,b.fitRows.x+b.posLeft,b.fitRows.y+b.posTop);b.fitRows.height=Math.max(b.fitRows.y+e,b.fitRows.height);b.fitRows.x+=d});return this},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0};return this},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResize:function(){return this.reLayout()},
_cellsByRowReset:function(){this.cellsByRow={};this._getSegments("cellsByRow");this.cellsByRow.rowHeight=this.options.cellsByRow.rowHeight||this.$allAtoms.outerHeight(true);return this},_cellsByRowLayout:function(a){var b=this,c=this.cellsByRow.cols;this.cellsByRow.atomsLen=a.length;a.each(function(d){var e=f(this),g=(d%c+0.5)*b.cellsByRow.columnWidth-e.outerWidth(true)/2+b.posLeft;d=(~~(d/c)+0.5)*b.cellsByRow.rowHeight-e.outerHeight(true)/2+b.posTop;b._pushPosition(e,g,d)});return this},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.cellsByRow.atomsLen/
this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.posTop}},_cellsByRowResize:function(){var a=this.cellsByRow.cols;this._getSegments("cellsByRow");this.cellsByRow.cols!==a&&this.reLayout();return this},_straightDownReset:function(){this.straightDown={y:0};return this},_straightDownLayout:function(a){var b=this;a.each(function(){var c=f(this);b._pushPosition(c,b.posLeft,b.straightDown.y+b.posTop);b.straightDown.y+=c.outerHeight(true)});return this},_straightDownGetContainerSize:function(){return{height:this.straightDown.y+
this.posTop}},_straightDownResize:function(){this.reLayout();return this},_masonryHorizontalPlaceBrick:function(a,b,c){b=Math.min.apply(Math,c);for(var d=b+a.outerWidth(true),e=c.length,g=e,h=this.masonryHorizontal.rows+1-e;e--;)if(c[e]===b)g=e;this._pushPosition(a,b,this.masonryHorizontal.rowHeight*g+this.posTop);for(e=0;e<h;e++)this.masonryHorizontal.rowXs[g+e]=d},_masonryHorizontalLayout:function(a){var b=this;a.each(function(){var c=f(this),d=Math.ceil(c.outerHeight(true)/b.masonryHorizontal.rowHeight);
d=Math.min(d,b.masonryHorizontal.rows);if(d===1)b._masonryHorizontalPlaceBrick(c,b.masonryHorizontal.rows,b.masonryHorizontal.rowXs);else{var e=b.masonryHorizontal.rows+1-d,g=[],h,i;for(i=0;i<e;i++){h=b.masonryHorizontal.rowXs.slice(i,i+d);g[i]=Math.max.apply(Math,h)}b._masonryHorizontalPlaceBrick(c,e,g)}});return this},_masonryHorizontalReset:function(){this.masonryHorizontal={};this._getSegments("masonryHorizontal",true);var a=this.masonryHorizontal.rows;for(this.masonryHorizontal.rowXs=[];a--;)this.masonryHorizontal.rowXs.push(this.posLeft);
return this},_masonryHorizontalResize:function(){var a=this.masonryHorizontal.rows;this._getSegments("masonryHorizontal",true);this.masonryHorizontal.rows!==a&&this.reLayout();return this},_masonryHorizontalGetContainerSize:function(){return{width:Math.max.apply(Math,this.masonryHorizontal.rowXs)-this.posLeft}},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0};return this},_fitColumnsLayout:function(a){var b=this;this.height=this.element.height();a.each(function(){var c=f(this),d=c.outerWidth(true),
e=c.outerHeight(true);if(b.fitColumns.y!==0&&e+b.fitColumns.y>b.height){b.fitColumns.x=b.fitColumns.width;b.fitColumns.y=0}b._pushPosition(c,b.fitColumns.x+b.posLeft,b.fitColumns.y+b.posTop);b.fitColumns.width=Math.max(b.fitColumns.x+d,b.fitColumns.width);b.fitColumns.y+=e});return this},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResize:function(){return this.reLayout()},_cellsByColumnReset:function(){this.cellsByColumn={};this._getSegments("cellsByColumn",
true);this.cellsByColumn.columnWidth=this.options.cellsByColumn.columnWidth||this.$allAtoms.outerHeight(true);return this},_cellsByColumnLayout:function(a){var b=this,c=this.cellsByColumn.rows;this.cellsByColumn.atomsLen=a.length;a.each(function(d){var e=f(this),g=(~~(d/c)+0.5)*b.cellsByColumn.columnWidth-e.outerWidth(true)/2+b.posLeft;d=(d%c+0.5)*b.cellsByColumn.rowHeight-e.outerHeight(true)/2+b.posTop;b._pushPosition(e,g,d)});return this},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.cellsByColumn.atomsLen/
this.cellsByColumn.rows)*this.cellsByColumn.columnWidth+this.posLeft}},_cellsByColumnResize:function(){var a=this.cellsByColumn.rows;this._getSegments("cellsByColumn",true);this.cellsByColumn.rows!==a&&this.reLayout();return this}};f.fn.imagesLoaded=function(a){var b=this.find("img"),c=b.length,d=this;b.length||a.call(this);b.bind("load",function(){--c<=0&&a.call(d)}).each(function(){if(this.complete||this.complete===r){var e=this.src;this.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
this.src=e}});return this};f.widget=f.widget||{};f.widget.bridge=f.widget.bridge||function(a,b){f.fn[a]=function(c){var d=typeof c==="string",e=Array.prototype.slice.call(arguments,1),g=this;c=!d&&e.length?f.extend.apply(null,[true,c].concat(e)):c;if(d&&c.charAt(0)==="_")return g;d?this.each(function(){var h=f.data(this,a);if(!h)return f.error("cannot call methods on "+a+" prior to initialization; attempted to call method '"+c+"'");if(!f.isFunction(h[c]))return f.error("no such method '"+c+"' for "+
a+" widget instance");var i=h[c].apply(h,e);if(i!==h&&i!==r){g=i;return false}}):this.each(function(){var h=f.data(this,a);h?h.option(c||{})._init():f.data(this,a,new b(c,this))});return g}};f.widget.bridge("isotope",f.Isotope)})(window,jQuery);


/*

Uniform v1.7.5
Copyright © 2009 Josh Pyles / Pixelmatrix Design LLC
http://pixelmatrixdesign.com

Requires jQuery 1.4 or newer

Much thanks to Thomas Reynolds and Buck Wilson for their help and advice on this

Disabling text selection is made possible by Mathias Bynens <http://mathiasbynens.be/>
and his noSelect plugin. <http://github.com/mathiasbynens/noSelect-jQuery-Plugin>

Also, thanks to David Kaneda and Eugene Bond for their contributions to the plugin

License:
MIT License - http://www.opensource.org/licenses/mit-license.php

Enjoy!

*/

(function($) {
  $.uniform = {
    options: {
      selectClass:   'selector',
      radioClass: 'radio',
      checkboxClass: 'checker',
      fileClass: 'uploader',
      filenameClass: 'filename',
      fileBtnClass: 'action',
      fileDefaultText: 'No file selected',
      fileBtnText: 'Choose File',
      checkedClass: 'checked',
      focusClass: 'focus',
      disabledClass: 'disabled',
      buttonClass: 'button',
      activeClass: 'active',
      hoverClass: 'hover',
      useID: true,
      idPrefix: 'uniform',
      resetSelector: false,
      autoHide: true
    },
    elements: []
  };

  if($.browser.msie && $.browser.version < 7){
    $.support.selectOpacity = false;
  }else{
    $.support.selectOpacity = true;
  }

  $.fn.uniform = function(options) {

    options = $.extend($.uniform.options, options);

    var el = this;
    //code for specifying a reset button
    if(options.resetSelector != false){
      $(options.resetSelector).mouseup(function(){
        function resetThis(){
          $.uniform.update(el);
        }
        setTimeout(resetThis, 10);
      });
    }
    
    function doInput(elem){
      $el = $(elem);
      $el.addClass($el.attr("type"));
      storeElement(elem);
    }
    
    function doTextarea(elem){
      $(elem).addClass("uniform");
      storeElement(elem);
    }
    
    function doButton(elem){
      var $el = $(elem);
      
      var divTag = $("<div>"),
          spanTag = $("<span>");
      
      divTag.addClass(options.buttonClass);
      
      if(options.useID && $el.attr("id") != "") divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      
      var btnText;
      
      if($el.is("a") || $el.is("button")){
        btnText = $el.text();
      }else if($el.is(":submit") || $el.is(":reset") || $el.is("input[type=button]")){
        btnText = $el.attr("value");
      }
      
      btnText = btnText == "" ? $el.is(":reset") ? "Reset" : "Submit" : btnText;
      
      spanTag.html(btnText);
      
      $el.css("opacity", 0);
      $el.wrap(divTag);
      $el.wrap(spanTag);
      
      //redefine variables
      divTag = $el.closest("div");
      spanTag = $el.closest("span");
      
      if($el.is(":disabled")) divTag.addClass(options.disabledClass);
      
      divTag.bind({
        "mouseenter.uniform": function(){
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function(){
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function(){
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(e){
          if($(e.target).is("span") || $(e.target).is("div")){    
            if(elem[0].dispatchEvent){
              var ev = document.createEvent('MouseEvents');
              ev.initEvent( 'click', true, true );
              elem[0].dispatchEvent(ev);
            }else{
              elem[0].click();
            }
          }
        }
      });
      
      elem.bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        }
      });
      
      $.uniform.noSelect(divTag);
      storeElement(elem);
      
    }

    function doSelect(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.selectClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }
      
      var selected = elem.find(":selected:first");
      if(selected.length == 0){
        selected = elem.find("option:first");
      }
      spanTag.html(selected.html());
      
      elem.css('opacity', 0);
      elem.wrap(divTag);
      elem.before(spanTag);

      //redefine variables
      divTag = elem.parent("div");
      spanTag = elem.siblings("span");

      elem.bind({
        "change.uniform": function() {
          spanTag.text(elem.find(":selected").html());
          divTag.removeClass(options.activeClass);
        },
        "focus.uniform": function() {
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function() {
          divTag.removeClass(options.focusClass);
          divTag.removeClass(options.activeClass);
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "click.uniform touchend.uniform": function(){
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        },
        "keyup.uniform": function(){
          spanTag.text(elem.find(":selected").html());
        }
      });
      
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      $.uniform.noSelect(spanTag);
      
      storeElement(elem);

    }

    function doCheckbox(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }
      
      divTag.addClass(options.checkboxClass);

      //assign the id of the element
      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span.
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchbegin.uniform": function() {
          divTag.addClass(options.activeClass);
        },
        "mouseup.uniform touchend.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });
      
      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check our box
        spanTag.addClass(options.checkedClass);
      }

      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);
    }

    function doRadio(elem){
      var $el = $(elem);
      
      var divTag = $('<div />'),
          spanTag = $('<span />');
          
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.radioClass);

      if(options.useID && elem.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+elem.attr("id"));
      }

      //wrap with the proper elements
      $(elem).wrap(divTag);
      $(elem).wrap(spanTag);

      //redefine variables
      spanTag = elem.parent();
      divTag = spanTag.parent();

      //hide normal input and add focus classes
      $(elem)
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "click.uniform touchend.uniform": function(){
          if(!$(elem).attr("checked")){
            //box was just unchecked, uncheck span
            spanTag.removeClass(options.checkedClass);
          }else{
            //box was just checked, check span
            var classes = options.radioClass.split(" ")[0];
            $("." + classes + " span." + options.checkedClass + ":has([name='" + $(elem).attr('name') + "'])").removeClass(options.checkedClass);
            spanTag.addClass(options.checkedClass);
          }
        },
        "mousedown.uniform touchend.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform touchbegin.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform touchend.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      //handle defaults
      if($(elem).attr("checked")){
        //box is checked by default, check span
        spanTag.addClass(options.checkedClass);
      }
      //handle disabled state
      if($(elem).attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }

      storeElement(elem);

    }

    function doFile(elem){
      //sanitize input
      var $el = $(elem);

      var divTag = $('<div />'),
          filenameTag = $('<span>'+options.fileDefaultText+'</span>'),
          btnTag = $('<span>'+options.fileBtnText+'</span>');
      
      if(!$el.css("display") == "none" && options.autoHide){
        divTag.hide();
      }

      divTag.addClass(options.fileClass);
      filenameTag.addClass(options.filenameClass);
      btnTag.addClass(options.fileBtnClass);

      if(options.useID && $el.attr("id") != ""){
        divTag.attr("id", options.idPrefix+"-"+$el.attr("id"));
      }

      //wrap with the proper elements
      $el.wrap(divTag);
      $el.after(btnTag);
      $el.after(filenameTag);

      //redefine variables
      divTag = $el.closest("div");
      filenameTag = $el.siblings("."+options.filenameClass);
      btnTag = $el.siblings("."+options.fileBtnClass);

      //set the size
      if(!$el.attr("size")){
        var divWidth = divTag.width();
        //$el.css("width", divWidth);
        $el.attr("size", divWidth/10);
      }

      //actions
      var setFilename = function()
      {
        var filename = $el.val();
        if (filename === '')
        {
          filename = options.fileDefaultText;
        }
        else
        {
          filename = filename.split(/[\/\\]+/);
          filename = filename[(filename.length-1)];
        }
        filenameTag.text(filename);
      };

      // Account for input saved across refreshes
      setFilename();

      $el
      .css("opacity", 0)
      .bind({
        "focus.uniform": function(){
          divTag.addClass(options.focusClass);
        },
        "blur.uniform": function(){
          divTag.removeClass(options.focusClass);
        },
        "mousedown.uniform": function() {
          if(!$(elem).is(":disabled")){
            divTag.addClass(options.activeClass);
          }
        },
        "mouseup.uniform": function() {
          divTag.removeClass(options.activeClass);
        },
        "mouseenter.uniform": function() {
          divTag.addClass(options.hoverClass);
        },
        "mouseleave.uniform": function() {
          divTag.removeClass(options.hoverClass);
          divTag.removeClass(options.activeClass);
        }
      });

      // IE7 doesn't fire onChange until blur or second fire.
      if ($.browser.msie){
        // IE considers browser chrome blocking I/O, so it
        // suspends tiemouts until after the file has been selected.
        $el.bind('click.uniform.ie7', function() {
          setTimeout(setFilename, 0);
        });
      }else{
        // All other browsers behave properly
        $el.bind('change.uniform', setFilename);
      }

      //handle defaults
      if($el.attr("disabled")){
        //box is checked by default, check our box
        divTag.addClass(options.disabledClass);
      }
      
      $.uniform.noSelect(filenameTag);
      $.uniform.noSelect(btnTag);
      
      storeElement(elem);

    }
    
    $.uniform.restore = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      
      $(elem).each(function(){
        if($(this).is(":checkbox")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is("select")){
          //remove sibling span
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is(":radio")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }else if($(this).is(":file")){
          //remove sibling spans
          $(this).siblings("span").remove();
          //unwrap parent div
          $(this).unwrap();
        }else if($(this).is("button, :submit, :reset, a, input[type='button']")){
          //unwrap from span and div
          $(this).unwrap().unwrap();
        }
        
        //unbind events
        $(this).unbind(".uniform");
        
        //reset inline style
        $(this).css("opacity", "1");
        
        //remove item from list of uniformed elements
        var index = $.inArray($(elem), $.uniform.elements);
        $.uniform.elements.splice(index, 1);
      });
    };

    function storeElement(elem){
      //store this element in our global array
      elem = $(elem).get();
      if(elem.length > 1){
        $.each(elem, function(i, val){
          $.uniform.elements.push(val);
        });
      }else{
        $.uniform.elements.push(elem);
      }
    }
    
    //noSelect v1.0
    $.uniform.noSelect = function(elem) {
      function f() {
       return false;
      };
      $(elem).each(function() {
       this.onselectstart = this.ondragstart = f; // Webkit & IE
       $(this)
        .mousedown(f) // Webkit & Opera
        .css({ MozUserSelect: 'none' }); // Firefox
      });
     };

    $.uniform.update = function(elem){
      if(elem == undefined){
        elem = $($.uniform.elements);
      }
      //sanitize input
      elem = $(elem);

      elem.each(function(){
        //do to each item in the selector
        //function to reset all classes
        var $e = $(this);

        if($e.is("select")){
          //element is a select
          var spanTag = $e.siblings("span");
          var divTag = $e.parent("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          //reset current selected text
          spanTag.html($e.find(":selected").html());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":checkbox")){
          //element is a checkbox
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }

        }else if($e.is(":radio")){
          //element is a radio
          var spanTag = $e.closest("span");
          var divTag = $e.closest("div");

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          spanTag.removeClass(options.checkedClass);

          if($e.is(":checked")){
            spanTag.addClass(options.checkedClass);
          }

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":file")){
          var divTag = $e.parent("div");
          var filenameTag = $e.siblings(options.filenameClass);
          btnTag = $e.siblings(options.fileBtnClass);

          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);

          filenameTag.text($e.val());

          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
        }else if($e.is(":submit") || $e.is(":reset") || $e.is("button") || $e.is("a") || elem.is("input[type=button]")){
          var divTag = $e.closest("div");
          divTag.removeClass(options.hoverClass+" "+options.focusClass+" "+options.activeClass);
          
          if($e.is(":disabled")){
            divTag.addClass(options.disabledClass);
          }else{
            divTag.removeClass(options.disabledClass);
          }
          
        }
        
      });
    };

    return this.each(function() {
      if($.support.selectOpacity){
        var elem = $(this);

        if(elem.is("select")){
          //element is a select
          if(elem.attr("multiple") != true){
            //element is not a multi-select
            if(elem.attr("size") == undefined || elem.attr("size") <= 1){
              doSelect(elem);
            }
          }
        }else if(elem.is(":checkbox")){
          //element is a checkbox
          doCheckbox(elem);
        }else if(elem.is(":radio")){
          //element is a radio
          doRadio(elem);
        }else if(elem.is(":file")){
          //element is a file upload
          doFile(elem);
        }else if(elem.is(":text, :password, input[type='email']")){
          doInput(elem);
        }else if(elem.is("textarea")){
          doTextarea(elem);
        }else if(elem.is("a") || elem.is(":submit") || elem.is(":reset") || elem.is("button") || elem.is("input[type=button]")){
          doButton(elem);
        }
          
      }
    });
  };
})(jQuery);
jQuery(function ($) {
    var csrf_token = $('meta[name=csrf-token]').attr('content'),
        csrf_param = $('meta[name=csrf-param]').attr('content');

    $.fn.extend({
        /**
         * Triggers a custom event on an element and returns the event result
         * this is used to get around not being able to ensure callbacks are placed
         * at the end of the chain.
         *
         * TODO: deprecate with jQuery 1.4.2 release, in favor of subscribing to our
         *       own events and placing ourselves at the end of the chain.
         */
        triggerAndReturn: function (name, data) {
            var event = new $.Event(name);
            this.trigger(event, data);

            return event.result !== false;
        },

        /**
         * Handles execution of remote calls firing overridable events along the way
         */
        callRemote: function () {
            var el      = this,
                method  = el.attr('method') || el.attr('data-method') || 'GET',
                url     = el.attr('action') || el.attr('href'),
                dataType  = el.attr('data-type')  || 'script';

            if (url === undefined) {
              throw "No URL specified for remote call (action or href must be present).";
            } else {
                if (el.triggerAndReturn('ajax:before')) {
                    var data = el.is('form') ? el.serializeArray() : [];
                    $.ajax({
                        url: url,
                        data: data,
                        dataType: dataType,
                        type: method.toUpperCase(),
                        beforeSend: function (xhr) {
                            el.trigger('ajax:loading', xhr);
                        },
                        success: function (data, status, xhr) {
                            el.trigger('ajax:success', [data, status, xhr]);
                        },
                        complete: function (xhr) {
                            el.trigger('ajax:complete', xhr);
                        },
                        error: function (xhr, status, error) {
                            el.trigger('ajax:failure', [xhr, status, error]);
                        }
                    });
                }

                el.trigger('ajax:after');
            }
        }
    });

    /**
     *  confirmation handler
     */
    $('a[data-confirm],input[data-confirm]').live('click', function () {
        var el = $(this);
        if (el.triggerAndReturn('confirm')) {
            if (!confirm(el.attr('data-confirm'))) {
                return false;
            }
        }
    });


    /**
     * remote handlers
     */
    $('form[data-remote]').live('submit', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-remote],input[data-remote]').live('click', function (e) {
        $(this).callRemote();
        e.preventDefault();
    });

    $('a[data-method]:not([data-remote])').live('click', function (e){
        var link = $(this),
            href = link.attr('href'),
            method = link.attr('data-method'),
            form = $('<form method="post" action="'+href+'"></form>'),
            metadata_input = '<input name="_method" value="'+method+'" type="hidden" />';

        if (csrf_param != null && csrf_token != null) {
          metadata_input += '<input name="'+csrf_param+'" value="'+csrf_token+'" type="hidden" />';
        }

        form.hide()
            .append(metadata_input)
            .appendTo('body');

        e.preventDefault();
        form.submit();
    });

    /**
     * disable-with handlers
     */
    var disable_with_input_selector           = 'input[data-disable-with]';
    var disable_with_form_remote_selector     = 'form[data-remote]:has('       + disable_with_input_selector + ')';
    var disable_with_form_not_remote_selector = 'form:not([data-remote]):has(' + disable_with_input_selector + ')';

    var disable_with_input_function = function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.data('enable-with', input.val())
                .attr('value', input.attr('data-disable-with'))
                .attr('disabled', 'disabled');
        });
    };

    $(disable_with_form_remote_selector).live('ajax:before', disable_with_input_function);
    $(disable_with_form_not_remote_selector).live('submit', disable_with_input_function);

    $(disable_with_form_remote_selector).live('ajax:complete', function () {
        $(this).find(disable_with_input_selector).each(function () {
            var input = $(this);
            input.removeAttr('disabled')
                 .val(input.data('enable-with'));
        });
    });

});
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
