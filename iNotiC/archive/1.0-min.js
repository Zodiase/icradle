function iNotiC(h,d,e){var k=$('<ul class="iNotiC_stack">').appendTo(h);"function"!==typeof d&&(d=function(b,c){b.animate({marginLeft:"0%"},300,c)});"function"!==typeof e&&(e=function(b,c){b.animate({marginLeft:"100%"},300).animate({padding:"0",height:"0"},100,c)});var g=function(b,c,f){var a={$noteFrame:$('<li class="iNotiC_msg">'),$noteContent:$("<p>").text(b),active:!0,close:function(){a.active&&(a.active=!1,"undefined"!=typeof a.timer&&window.clearTimeout(a.timer),e.call(a.$noteFrame,a.$noteFrame,
function(){a.$noteFrame.remove()}))},text:function(b){return a.$noteContent.text(b)}};a.$noteFrame.append(a.$noteContent).addClass(c).click(a.close).appendTo(k);d.call(a.$noteFrame,a.$noteFrame,function(){"number"===typeof f&&0<f&&(a.timer=window.setTimeout(a.close,f))});return{close:a.close,text:a.text}};return{log:function(b,c){return g(b,!1,c)},warn:function(b){return g(b,"iNotiC_warn",-1)}}};
