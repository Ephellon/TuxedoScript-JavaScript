// TuxedoScript 7.5.3 - Ephellon Dantzler: Tue Sept 8, 2015 23:51 CDT -06:00
// Free for use, as long as my name, CoffeeScript, and ECMA are mentioned
"use strict";

var TUX; // the parsable string return from Tuxedo()

function Tuxedo(__ts__, __os__) { // main function, executes the code [input-element, output-element]
  var __dq__, __sq__, __ga__, __rx__, __cms__, __cmm__, dq_, sq_, ga_, rx_, cms_, cmm_, __, _, _o, x, y, z, a, b, c, _eval, _htmleditor, _jseditor, _clean, _math, _advance, _ugly, _hide, _legacy, _wordy, nch_, sch_, tch_, __nch__, __sch__, __tch__, _notch, _sotch, _totch, N, S, T;
  __dq__ = /("[^\n]+")/; // used to hide, and keep quotes from being executed
  __sq__ = /('[^\n]+')/; // single quotes
  __ga__ = /(`[^\n]+`)/; // grave accents
  __rx__ = /(\/[^\n]+\/[gmi,\.;\n])/; // regular expressions ** problem when using quotes and $1 within them **
  __nch__ = /##\/([\w\W]+)\/##/; // no.t.ch
  __sch__ = /##\-([\w\W]+)\-##/; // so.t.ch
  __tch__ = /##\\([\w\W]+)\\##/; // to.t.ch [no reason so far, proposed]
  // __cms__ = /(\/\/.+\n)|(##.+\n)/; // single-line comments, only replace them so parsing wont generate errors
  // __cmm__ = /(\/\*[\w\W]+\*\/)|(#\*[\w\W]+\##)/; // multi-line comments

  dq_ = []; // holder for double-quotes
  sq_ = []; // holder for single-quotes
  ga_ = []; // holder of grave accents
  rx_ = []; // holder of regular expressions
  nch_ = []; // holder of no.t.ch
  sch_ = []; // holder of so.t.ch
  tch_ = []; // holder of to.t.ch
  // cms_ = []; // holder for sinlge-line comments
  // cmm_ = []; // holder for multi-line comments ** error with @tags not switching **

  x = y = z = a = b = c = N = S = T = 0;

  var K = document.querySelectorAll('script');
  for(var k = 0; k < K.length; k++) {
    if(/\*\*TS\*\*/.test(K[k].innerHTML)) {
      K[k].setAttribute("type", "text\/ts");
      K[k].innerHTML = K[k].innerHTML
        .replace(/\/\*\*TS\*\*/, "## Tuxedo Script") // TS in JS
        .replace(/\*\*TS\*\*\/\s*/g, "\n//");
      __ts__ = K[k];
    }
  }

  _ = ['ts','tux','tuxs','tuxedo','tux-script','tuxedoscript','tuxedo-script','tscript','t-script']; // accepted types for type attribute to execute tuxedo-script
  for(var k = 0; k < _.length; k++) { // find which one matches
    __ts__ = __ts__ || document.querySelector('[type="text/' + _[k] + '"]'); // finds only the first one
  }

  if(!__ts__) { // stop execution here
    return Error("No TuxedoScript element found");
  }

  _o = ['tso','tuxo','tuxso','tuxedoo','tux-script-out','tuxedoscriptout','tuxedo-script-out','tscriptout','t-script-o']; // accepted types for type attribute to execute tuxedo-script
  for(var k = 0; k < _o.length; k++) { // find which one matches
    __os__ = __os__ || document.querySelector('[type="text/' + _o[k] + '"]'); // finds only the first one
  }
  __os__ = __os__ || __ts__; // copy, or hold the input-element
  __ = ((__ts__.value || __ts__.innerHTML) + ""); // get the text of the element

  // channels
  for(;__.match(__nch__);) { // remove no.t.ch
    __.replace(__nch__, '$1');
    nch_[N] = RegExp.$1;
    __ = __.replace(__nch__, '_nch[' + N + ']nch_');
    N++;
  } __nch__ = /(_nch\[[\d]+\]nch_)/;
  for(;__.match(__sch__);) { // remove so.t.ch
    __.replace(__sch__, '$1');
    sch_[S] = RegExp.$1;
    __ = __.replace(__sch__, '_sch[' + S + ']sch_');
    S++;
  } __sch__ = /(_sch\[[\d]+\]sch_)/;
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  for(;__.match(__rx__);) { // remove regular expressions
    __.replace(__rx__, '$1');
    rx_[a] = RegExp.$1;
    __ = __.replace(__rx__, '_re[' + a + ']re_');
    a++;
  } __rx__ = /(_re\[[\d]+\]re_)/;
  /*
  for(;__.match(__cms__);) { // remove single-line comments
    __.replace(__cms__, '$1');
    cms_[b] = RegExp.$1;
    __ = __.replace(__cms__, '_cms:' + b + ':cms_');
    b++;
  } __cms__ = /(_cms\:[\d]+\:cms_)/;
  for(;__.match(__cmm__);) { // remove multi-line comments
    __.replace(__cmm__, '$1');
    cmm_[c] = RegExp.$1;
    __ = __.replace(__cmm__, '_cmm:' + c + ':cmm_');
    c++;
  } __cms__ = /(_cmm\:[\d]+\:cmm_)/;
  */
  for(;__.match(__dq__);) { // remove double-quotes
    __.replace(__dq__, '$1');
    dq_[x] = RegExp.$1;
    __ = __.replace(__dq__, '_dq[' + x + ']dq_');
    x++;
  } __dq__ = /(_dq\[[\d]+\]dq_)/;
  for(;__.match(__sq__);) { // remove single-quotes
    __.replace(__sq__, '$1');
    sq_[y] = RegExp.$1;
    __ = __.replace(__sq__, '_sq[' + y + ']sq_');
    y++;
  } __sq__ = /(_sq\[[\d]+\]sq_)/;
  for(;__.match(__ga__);) { // remove grave-accent quotes
    __.replace(__ga__, '$1');
    ga_[z] = RegExp.$1;
    __ = __.replace(__ga__, '_ga[' + z + ']ga_');
    z++;
  } __ga__ = /(_ga\[[\d]+\]ga_)/;

  __ = __
    .replace(/~/g, '-tilde-')
    .replace(/\$([1-9])/g, "~$1") // $1 fix
    .replace(/\\\//g, "\\\\\/")
    .replace(/\\([\/\\\&\?\:;\.@#%\$])/g, '~$1~');
  //.replace(/undefined/g, "~~u"); // undefined fix
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  __ = __ // tuxedo-script
  // [a-z\$_][\w\d\$_]* = proper JS variables
  // [a-z\$_][\w\d\.\$_]* = proper JS objects
  // pre-process
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&") // in this order to prevent &amp;gt; from becoming > and &amp;lt; < 
    .replace(/<(\w+.+)>/g, "&lt;$1&gt;") // replace HTML
    .replace(/([a-z\$_][\w\d\$_]*)(?:[\-]{2})([a-z\$_][\w\d\$_]*)/gi, "$1_$2") // automatic _
  // loops and statements
    .replace(/\((.+)\)\?(.+)\:/g, '($1),,,$2,,,,') // terenary operator
    .replace(/(\:|\})\?(.+)([\:\{])/g, "}else if ($2){")
    .replace(/\?([^#])(.+)([\:\{])(\s+)/g, "if($1$2){$4")
    .replace(/(\:\:|\}\{)/g, "}else{")
    .replace(/\-\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=$3,,$1>$4,,$1-=$5){$7")
    .replace(/\-\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1>$3,,$1-=$4){$6")
    .replace(/\-\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1>$3,,$1--){$5")
    .replace(/\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=$3,,$1<$4,,$1+=$5){$7")
    .replace(/\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1<$3,,$1+=$4){$6")
    .replace(/\?#([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1<$3,,$1++){$5")
    .replace(/\?\:/g, "do{")
    .replace(/\?(.+);/g, "while($1),,")
    .replace(/\?\((.+)\)/g, "switch($1){")
    .replace(/(try|catch|finally)\:/g, "$1{")

    .replace(/@def(a?u?l?t?\:?)/g, "default:")
    .replace(/@([^\n]+)\:/g, "case $1:")
  // comments
    .replace(/#\*#/g, "/**")
    .replace(/#\*/g, "/*")
    .replace(/##/g, "//*/")
  // @tags
    .replace(/case\saut\:/g, "author:")
    .replace(/case\slie\:/g, "license:")
    .replace(/case\sdat\:/g, "date:")
    .replace(/case\stie\:/g, "time:")
    .replace(/case\surl\:/g, "URL:")
    .replace(/case\sver\:/g, "Version:")
  // JS and shorthands
  //.replace(/([\d\w\$_]+)#/g, "let $1") // !/deprecated/-JS
    .replace(/([a-z\$_][\w\d\$_]*)#([a-z\$_][\w\d\$_]*)/g, "$1[$2]")
    .replace(/([a-z\$_][\w\d\$_]*)#00/gi, "$1[$1.length-1]")
    .replace(/#([0-9]+)/g, "[$1]")
    .replace(/#([a-z\$_][\w\d\$_]*)/gi, "var $1") // #([a-z\$_][\w\d\$_]*)
    .replace(/\$of/g, 'typeof')
    .replace(/\$del/g, "delete")
  //.replace(/\$args|\.\.\./g, "arguments") // !/deprecated/-TS
    .replace(/\$args/g, "arguments")
    .replace(/\$doc/g, "document")
    .replace(/\$win/g, "window")
    .replace(/\$nav/g, 'navigator')
    .replace(/\$loc/g, 'location')
    .replace(/\$cont/g, "continue")
    .replace(/\$con/g, "console")
    .replace(/\$(#|[Oo]bj)/g, 'Object')
  // shorthand methods
    .replace(/\.\$id/g, ".getElementById")
    .replace(/\.\$class/g, ".getElementsByClassName")
    .replace(/\.\$tag/g, ".getElementsByTagName")
    .replace(/\.\$html/g, ".innerHTML")
    .replace(/\.\$text/g, ".innerText")
    .replace(/\.\$val/g, ".value")
    .replace(/\.\$qy/g, ".querySelector")
    .replace(/\.\$Qy/g, ".querySelectorAll")
  // functions
    .replace(/<\-\s(.+)/g, "return $1")
    .replace(/([\:\=])\s*\$(.+)\s*(\:|\{)/g, "$1 function($2){")
    .replace(/\$([a-z\$_][\w\d\$_]*)\s+(.+)\s*(\:|\{)/gi, "function $1($2){")
    .replace(/\$([a-z\$_][\w\d\$_]*)\s*(\:|\{)/gi, "function $1(){")
    .replace(/\$\s*(\:|\{)/g, "function(){")
    .replace(/var\sfunction/g, "(function")
    .replace(/function\s\(/g, "$(")
  // TS / CSS
    .replace(/(.+)\:\s*(.+);/g, "$1,,,,$2,,")
  //.replace(/;;(\s+|\n+)/g, "})$1") // !/deprecated/-TS
    .replace(/;([\s+\n+,\}\)]+)/g, "}$1")
    .replace(/,,,,/g, ":")
    .replace(/,,,/g, "?")
    .replace(/,,/g, ";")
  //.replace(/case\s+([^\w\d\$_"'`]+)/g, "this$1") // !/deprecated/-TS
  //.replace(/(.+)@(.+)(\.|;|\s|\n)/g, "$1($2)$3") // !/deprecated/-TS
    .replace(/\/\/\*\/!/g, '"use strict"; // use strict embed');
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // [experimental] enable/disable features via ## +feature / ## -feature / ## *x: y

  var rq = (/\/\/\*\/\s*-\s*(eval|ugly|advance|html-editor|js-editor|clean|math|hide|legacy|wordy)/);
  for(;rq.test(__);) { // disable attributes
    __.replace(rq, '$1');
    var k = RegExp.$1;
    __ts__.setAttribute(k, "");
    __ = __.replace(rq, '//*/ disable ' + k);
  }

  var rq = (/\/\/\*\/\s*\+\s*(eval|ugly|advance|html-editor|js-editor|clean|math|hide|legacy|wordy)/);
  for(;rq.test(__);) { // enable attributes
    __.replace(rq, '$1');
    var k = RegExp.$1;
    __ts__.setAttribute(k, "!");
    __ = __.replace(rq, '//*/ enable ' + k);
  }

  _eval = __ts__.getAttribute("eval");
  _htmleditor = __ts__.getAttribute("html-editor");
  _jseditor = __ts__.getAttribute("js-editor");
  _clean = __ts__.getAttribute("clean");
  _math = __ts__.getAttribute("math");
  _advance = __ts__.getAttribute("advance");
  _ugly = __ts__.getAttribute("ugly");
  _hide = __ts__.getAttribute("hide");
  _legacy = __ts__.getAttribute("legacy");
  _wordy = __ts__.getAttribute("wordy");
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // other features

  S = 0;
  for(;__.match(__sch__);) { // put so.t.ch back
    __ = __.replace(__sch__, sch_[S]);
    S++;
  }

  if("!" === _legacy) { // JS related
    __ = __
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\&\=/gi, "$1 = $1&&") // &=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\|\=/gi, "$1 = $1||") // |=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\^\=(.+)([\.;\n]\s)/g, "var $1,,\nif($1 !== null){\n  $1 = $2$3\n}") // ^=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\?\=(.+)([\.;\n]\s)/g, "var $1,,\nif($1 === null){\n  $1 = $2$3\n}") // ?=
      .replace(/\[(\-?[\w\d\$_\.]+)\.\.(\-?[\w\d\$_\.]+)\]/g, ".slice($1, $2)")
      .replace(/\[\.\.(\-?[\w\d\$_]+)\]/g, ".slice(0, $2)")
      .replace(/\[(\-?[\w\d\$_]+)\.\.\]/g, ".slice($1)")
      .replace(/\[\.\]/g, ".slice(0)")
      .replace(/\[\*\]/g, ".split(\"\")")
      .replace(/(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)\s?\:(.+)(,?)/g, '"$1": $2$3')
      .replace(/\.(abstract|arguments|boolean|break|byte|case|catch|char|class|const|continue|debugger|default|delete|do|double|else|enum|eval|export|extends|false|final|finally|float|for|function|goto|if|implements|import|in|instanceof|int|interface|let|long|native|new|null|package|private|protected|public|return|short|static|super|switch|synchronized|this|throw|throws|transient|true|try|typeof|var|void|volatile|while|with|yield)([^\w\d\$_]+)/g, "[\"$1\"]$2")
    /* // very old tech, NA
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\*\=/g, "$1 = $1*") // *=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\/\=/g, "$1 = $1/") // /=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\+\=/g, "$1 = $1+") // +=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\-\=/g, "$1 = $1-") // -=
      .replace(/([a-z\$_][\w\d\.\$_]*)\s*\%\=/g, "$1 = $1%") // %=
    */
  }

  if ("!" === _advance) {
    __ = __ // advance, experimental features
      .replace(/(\s+)\.([\s\w\d\$_]+)\s([\s\w\d\$_]+)\{/g, "$1class $2 extends $3{")
      .replace(/(\s+)\.([\s\w\d\$_]+)\{/g, "$1class $2{")
      .replace(/(\s*)@\((.*)\)/g, "$1constructor($2)")
      .replace(/\*\./g, "super.")
      .replace(/(.+)\s*\=>\s*([a-z\$_][\w\d\$_]*)/gi, "const $2 = $1")
      .replace(/([\s\w\d\$_]+)\s*\-\->\s*(.+)/g, "$1 = () => $2")
      .replace(/\->/g, "=>")
      .replace(/\$\*(.+)\s*(\:|\{)/g, "void function($1){")
      .replace(/(?:var\s+)?prom\s([A-Za-z\$_][\.\w\d\$_]*)\s*\=?\s*\(/g, "var $1 = new PROMISSORYTUXEDO(\"$1\",");

    if("!" === _legacy) {
      // Splats
      var rq = /\(\s*\.\.\.,\s*([a-z\$_][\w\d\$_,\s]*)\)\s*\{/i; // empty beginning splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1');
        var k = RegExp.$1.split(',');
        __ = __.replace(rq, "( ){\n/splat/");
        for(var e = 0; e < k.length; e++) {
          __ = __.replace(/\/splat\//, "var " + k[e] + " = arguments[arguments.length-" + (e+1) + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//g, "");
      }

      var rq = /\(\s*([a-z\$_][\w\d\$_]*)\.\.\.,\s*([a-z\$_][\w\d\$_,\s]*)\)\s*\{/i; // beginning splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1,$2');
        var k = RegExp.$1;
        var K = RegExp.$2.split(',');
        __ = __.replace(rq, "( ){\n/splat/");
        __ = __.replace(/\/splat\//, "var " + k + " = (" + (K.length) + " <= arguments.length)?[].slice.call(arguments, 0, arguments.length-" + (K.length) + "):[];\n/splat/");
        for(var e = K.length; e > 0; e--) {
          __ = __.replace(/\/splat\//, "var " + K[e-1] + " = arguments[arguments.length-" + ((K.length-e)+1) + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//g, "");
      }

      var rq = /\(\s*(.+),\s*\.\.\.\s*\)\s*\{/i; // empty ending splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1');
        var k = RegExp.$1.split(',');
        __ = __.replace(rq, "( ){\n/splat/");
        for(var e = 0; e < k.length; e++) {
          __ = __.replace(/\/splat\//, "var " + k[e] + " = arguments[" + e + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//g, "");
      }

      var rq = /\(\s*(.+),\s*([a-z\$_][\w\d\$_,\s]*)\.\.\.\s*\)\s*\{/i; // ending splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1,$2');
        var k = RegExp.$1.split(',');
        var K = RegExp.$2;
        __ = __.replace(rq, "( ){\n/splat/");
        for(var e = 0; e < k.length; e++) {
          __ = __.replace(/\/splat\//, "var " + k[e] + " = arguments[" + e + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//, "var " + K + " = (" + (k.length+1) + " <= arguments.length)?[].slice.call(arguments, " + (k.length) + "):[];");
      }

      var rq = /\(\s*(.+),\s*\.\.\.,\s*(.+)\s*\)\s*\{/i; // empty middle splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1,$2');
        var K = RegExp.$1.split(',');
        var k = RegExp.$2.split(',');
        __ = __.replace(rq, "( ){\n/splat/");
        for(var e = 0; e < K.length; e++) {
          __ = __.replace(/\/splat\//, "var " + K[e] + " = arguments[" + e + "];\n/splat/");
        }
        for(var e = k.length; e > 0; e--) {
          __ = __.replace(/\/splat\//, "var " + k[e-1] + " = arguments[arguments.length-" + e + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//g, "");
      }

      var rq = /\(\s*(.+),\s*([a-z\$_][\w\d\$_,\s]*)\.\.\.,\s*(.+)\s*\)\s*\{/i; // middle splats
      for(;rq.test(__);) { // splats
        __.replace(rq, '$1,$2,$3');
        var K = RegExp.$1.split(',');
        var j = RegExp.$2;
        var k = RegExp.$3.split(',');
        __ = __.replace(rq, "( ){\n/splat/");
        for(var e = 0; e < K.length; e++) {
          __ = __.replace(/\/splat\//, "var " + K[e] + " = arguments[" + e + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//, "var " + j + " = (" + (K.length+k.length+1) + " <= arguments.length)?[].slice.call(arguments, " + (K.length) + ", arguments.length-" + (k.length) + "):[];\n/splat/");
        for(var e = K.length-1; e < K.length + k.length-1; e++) {
          __ = __.replace(/\/splat\//, "var " + k[e] + " = arguments[arguments.length-" + (k.length-e) + "];\n/splat/");
        }
        __ = __.replace(/\/splat\//g, "");
      }

      __ = __
        .replace(/([a-z\$_][\w\d\$_]*)\s*\(\s*([a-z\$_][\w\d\$_]*)\.\.\.\s*\)/gi, "$1.apply(null, $2)")
        .replace(/([a-z\$_][\w\d\$_]*)\s*\((.+),\s*([a-z\$_][\w\d\$_]*)\.\.\.\s*\)/gi, "$1.apply(null, [$2].concat([].slice.call($3)))")
        .replace(/([a-z\$_][\w\d\$_]*)\s*\(([a-z\$_][\w\d\$_]*)\.\.\.,\s*(.+)\s*\)/gi, "$1.apply(null, [].slice.call($3).concat([$2]))");
    }

    // Prom
    function PROMISSORYTUXEDO() {
      function PROMISSORYTUXEDO(n, p, s, l) {
        this.advance = _advance === "!";
        this.clean = _clean === "!";
        this.eval = _eval === "!";
        this.hide = _hide === "!";
        this.html_editor = _htmleditor === "!";
        this.js_editor = _jseditor === "!";
        this.legacy = _legacy === "!";
        this.math = _math === "!";
        this.ugly = _ugly === "!";
        this.wordy = _wordy === "!";

        this.name = n;
        // "strict" below
        if(!p || !s || !l) {
          return console.error("O_O bad lease for " + n + ", missing some arguments");
        }
        if(typeof p !== typeof Tuxedo) {
          return console.error("O_O bad promise, it should be a function");
        }
        if(typeof s !== typeof "") {
          return console.error("O_O bad signature, did you mean " + ("" + s));
        }
        if(typeof l !== typeof -1) {
          return console.error("O_O bad lifetime, did you mean " + (+l));
        }
        this.signature = s;
        this.promise = p.toString();
        this.contract = p;
        this.lifetime = l;
        setTimeout(function(){
          console.warn("O_O the lease for " + n + " is at its half-life");
        }, l/2);
        setTimeout(function(){
          window[n] = null;
          console.error("O_O the lease ended for " + n);
        }, l);
        console.log("O_O the lease for " + n + " is active");
      }

      PROMISSORYTUXEDO.prototype.toString = function() {
        return (Tuxedo.toString).toString().replace(/toString/g, (this.name || "PROMISSORYTUXEDO"));
      }
    };
    window.PROMISSORYTUXEDO = PROMISSORYTUXEDO;
  }

  if ("!" === _math) {
    __ = __ // enable math shortcuts
      .replace(/\|\|/g, "/or/")
      .replace(/\|\=/g, "/or-equ/")
      .replace(/([\w\d\$_]+)\(([^\n]+)\)\s\=([\s\w\d\$_\*\/\+\-%\^\\\|\.\(\)\[\];]+)\n/g, "function $1($2){\nreturn $3\n}\n")
      .replace(/([^\a-z+][\d]+)([a-z\$_]+)/gi, "$1 * $2")
      .replace(/([\w\d\$_-]+)\s*-tilde-\s*([\w\d\$_-]+)/g, "(($1 % $2 + $2) % $2)")
      .replace(/\|([^"'`;]+)\|/g, "%abs($1)")
      .replace(/\\([^\n"'`~\!@#,\:;]+)\\/g, "%sqrt($1)") // \x\
      .replace(/([\w\d\.\$_-]+)\s*(\^|\*\*)\s*([\w\d\.\$_-]+)/g, "%pow($1, $3)") // $1 ** $3 may not be supported
      .replace(/([\w\d\$\_]+)\s+_\s+([\w\d\$_]+)/g, "%floor($1 / $2)")
      .replace(/(\W)%([a-z\$_]+)/gi, "$1Math.$2")
      .replace(/\/or\//g, "||")
      .replace(/\/or\-equ\//g, "|=");
    Math.modulo = function(a, b) {
      a = +a; // Numnber(a)
      b = +b; // Numnber(b)
      return (a % b + b) % b; // ([a % b] + b) % b
    }
  }

  var rq = (/\/\/\*\/\s*\*([\w\d\$_]+)\:\s*([^\n]+)/);
  for(;rq.test(__);) { // shorthand variables, literal
    __.replace(rq, '$1 $2');
    var k = RegExp.$1;
    var K = RegExp.$2;
    var r = RegExp('\\$' + k, 'g');
    __ = __.replace(r, K).replace(rq, "//*/ " + K + " => $" + k);
  }

  var rq = (/\/\/\*\/\s*\*\*([\w\d\$_]+)\:\s*([^\n]+)/);
  for(;rq.test(__);) { // shorthand variables, parseable
    __.replace(rq, '$1 $2');
    var k = RegExp.$1;
    var K = RegExp.$2;
    var r = RegExp('\\$' + k, 'g');
    __ = __.replace(r, eval(K)).replace(rq, "//*/ " + eval(K) + " => $" + k);
  }

  if("!" === _wordy) { // words
    __ = __
      .replace(/var\s(does|do|NOT|AND|XOR|OR|isnt|on|yes|good|off|no|bad|equals|equal|is|when|where|from|unless|until)/g, "#0$1")
      .replace(/\\(does|do|NOT|AND|XOR|OR|isnt|on|yes|good|off|no|bad|equals|equal|is|when|where|from|unless|until)/g, "#00$1")
      .replace(/\sdoesn't\s/g, "!")
      .replace(/\sdoes\s/g, "!!")
      .replace(/([^\w\d\$_])(on|yes|good)([^\w\d\$_])/g, "$1true$3")
      .replace(/([^\w\d\$_])(off|no|bad)([^\w\d\$_])/g, "$1false$3")
      .replace(/\!\s?(equals|equal|is)\s/g, "!==")
      .replace(/\s(equals|equal|is)\s/g, "===")
      .replace(/\s?(does|do)\sNOT\s/g, "!")
      .replace(/\s(NOT|isnt|isn't)\s/g, "!")
      .replace(/(\W)AND(\W)/g, "$1 && $2")
      .replace(/(\!?)\sAND([\s\!])/g, "&& $2$1")
      .replace(/([a-z\$_][\w\d\$_]*)\s+XOR\s+([a-z\$_][\w\d\$_]*)/gi, "($1 || $2) && !$1")
      .replace(/(\W)OR(\W)/g, "$1 || $2")
      .replace(/(\!?)\sOR([\s\!])/g, "|| $2$1")
      .replace(/(var|const)\s([@%\w\d\$_]+)\s*([\*\/\+\-\%\&\|]?)\=\s*(.+)\s(if|when|where)\s([^;\n]+)([\.,;\n]\s)/g, "$1 $2;\nif($6){\n$2 $3= $4$7\n}")
      .replace(/([@%\w\d\$_]+)\s*([\*\/\+\-\%\&\|]?)\=\s*(.+)\s(if|when|where)\s([^;\n]+)([\.,;\n]\s)/g, "if($5){\n$1 $2= $3$6\n}")
      .replace(/(.+)\s+(if|when|where)\s([^;\n]+)([\.,]\n)/g, "if($3){\n$1$4\n}")
      .replace(/(var|const)\s([@%\w\d\$_]+)\s*([\*\/\+\-\%\&\|]?)\=\s*(.+)\s(unless)\s([^;\n]+)([\.,;\n]\s)/g, "$1 $2;\nif(!$6){\n$2 $3= $4$7\n}")
      .replace(/([@%\w\d\$_]+)\s*([\*\/\+\-\%\&\|]?)\=\s*(.+)\s(unless)\s([^;\n]+)([\.,;\n]\s)/g, "if(!$5){\n$1 $2= $3$6\n}")
      .replace(/(.+)\s+(unless)\s([^;\n]+)([\.,]\n)/g, "if(!$3){\n$1$4\n}")
      .replace(/([\w\d\$_]+)\s*\:\s*(.+)\sif\s(.+),/g, "$1,,,, ($3),,,$2,,,,null,")
      .replace(/if\s([^\n]+)\sthen\s([^\n]+)\selse\s([^\n]+)/g, '($1),,,$2,,,,$3') // terenary operator
      .replace(/(:|\})else\s?(if|when|where)(.+)([\:\{])/g, "}else if ($3){")
      .replace(/if\s(.+)([\:\{])(\s+)/g, "if($1){$3")
      .replace(/[\.;\}]\s+else\s/g, "}else{")
      .replace(/\s?else\s/g, "}else{")

    // from-while, and from loops and logics
      .replace(/([a-z\$_][\w\d\$_]*)\s*\=\s*(.+)\sin\s([a-z\$_][\w\d\$_]*)([\.;\n]\s?)/g, "$1 = $3[$2]$4")
      .replace(/([a-z\$_][\w\d\$_]*)\s*\=\s*(.+)\sfrom\s([a-z\$_][\w\d\$_]*)([\.;\n]\s?)/g, "$1 = $3.indexOf($2)$4")
      .replace(/(.+)\sfrom\s([a-z\$_][\w\d\$_]*)\swhile\s([a-z\$_][\w\d\$_]*)([\.;\n]\s?)/g, "for(var $2_index_counter = 0; $2_index_counter < $2.length; $2_index_counter++){\n  var $3 = $2[$2_index_counter],,\n  if($3){\n    $1$4\n  }\n}\n")
      .replace(/(.+)\sfrom\s([a-z\$_][\w\d\$_]*)\swhile\s([a-z\$_][\w\d\$_]*)([^;\n]+)([\.;\n]\s?)/g, "for(var $2_index_counter = 0; $2_index_counter < $2.length; $2_index_counter++){\n  var $3 = $2[$2_index_counter],,\n  if($3$4){\n    $1$5\n  }\n}\n")
      .replace(/([a-z\$_][\w\d\$_]*)\(([a-z\$_][\w\d\$_]*)([^\)]*)\)\sfrom\s([a-z\$_][\w\d\$_]*)([\.;\n]\s?)/g, "for(var $4_index_counter = 0; $4_index_counter < $4.length; $4_index_counter++){\n  var $2 = $4[$4_index_counter],,\n  $1($2)$5\n}\n")
      .replace(/(?:var\s)?([a-z\$_][\w\d\$_]*)\s*\+?\=\s*(?!var\s?)([a-z\$_][\w\d\$_]*)\sin\s([a-z\$_][\w\d\$_]*)\swhile\s(in|\.\.\.?)([\.;\n]\s?)/g, "var $1 = [],,\nfor(var $2 in $3){\n  $1.push($3[$2])$5\n}\n")
      .replace(/(?:var\s)?([a-z\$_][\w\d\$_]*)\s*\+?\=\s*(?!var\s?)([a-z\$_][\w\d\$_]*)\sin\s([a-z\$_][\w\d\$_]*)\swhile\s\2\sin\s\3([\.;\n]\s?)/g, "var $1 = [],,\nfor(var $2 in $3){\n  $1.push($3[$2])$4\n}\n")
      .replace(/(?:var\s)?([a-z\$_][\w\d\$_]*)\s*\+?\=\s*(?!var\s?)([a-z\$_][\w\d\$_]*)\sin\s([a-z\$_][\w\d\$_]*)([\.;\n]\s?)/g, "var $1 = [],,\nfor(var $2 in $3){\n  $1.push($3[$2])$4\n}\n")
      .replace(/([a-z\$_].+)\swhile\s([^;\n]+)([\.;\n]\s?)/gi, "while($2){\n  $1$3\n}\n")
      .replace(/([a-z\$_].+)\suntil\s([^;\n]+)([\.;\n]\s?)/gi, "while(!$2){\n  $1$3\n}\n")

      .replace(/\-for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=$3,,$1>$4,,$1-=$5){$7")
      .replace(/\-for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1>$3,,$1-=$4){$6")
      .replace(/\-for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1>$3,,$1--){$5")
      .replace(/for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=$3,,$1<$4,,$1+=$5){$7")
      .replace(/for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)\2([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1<$3,,$1+=$4){$6")
      .replace(/for\s+([^\n"'`,;]+)([,;]+)([^\n"'`,;]+)([\:\{])(\s+)/g, "for(var $1=0,,$1<$3,,$1++){$5")
      .replace(/\sdo\s*\n/g, "do{")
    //.replace(/while\s*(?=[^\(])(.+)([\)]$)/g, "while($1),,")
    //.replace(/until\s*(?=[^\(])(.+)([\)]$)/g, "while(!$1),,")
      .replace(/switch\s+([^\n]+)([\{\:])/g, "switch($1){")
      .replace(/switch\s+([^\n]+)/g, "switch($1){")
      .replace(/\(([\w\d\$_\.])\s*(\&\&|\|\|)\s*([\w\d\$_\.])\s*([\=\!]\=+)\s*([^\)]+)\)/g, "($1 $4 $5 $2 $3 $4 $5)")
      .replace(/([\w\d\$_\.]+)\s*(\&\&|\|\|)\s*([\w\d\$_\.]+)\s?\!\!\s?(exists|exist)/g, "(typeof ($1 $2 $3) !== 'undefined' && ($1 $2 $3) !== null)")
      .replace(/([\w\d\$_\.]+)\s*(\&\&|\|\|)\s*([\w\d\$_\.]+)\s?\!\s?(exists|exist)/g, "(typeof ($1 $2 $3) === 'undefined' && ($1 $2 $3) !== null)")
      .replace(/([\w\d\$_\.]+)\s*(\&\&|\|\|)\s*([\w\d\$_\.]+)\s(exists|exist)/g, "(typeof ($1 $2 $3) !== 'undefined' && ($1 $2 $3) !== null)")
      .replace(/([\w\d\$_\.]+)\s\!\s?(exists|exist)/g, "(typeof $1 === 'undefined' && $1 !== null)")
      .replace(/([\w\d\$_\.]+)\s(exists|exist)/g, "(typeof $1 !== 'undefined' && $1 !== null)")
      .replace(/else-(if|when|where)/g, "else if")
    //.replace(/([a-z\$_][\w\d\$_]*)\s*([\=\!]\=+)\s*([^\|\&]+)(\&\&|\|\|)([^\)\n])/g, "$1$2$3 $4 $1$2$5")
      .replace(/,,,,/g, ":")
      .replace(/,,,/g, "?")
      .replace(/,,/g, ";")
      .replace(/#00/g, "")
      .replace(/#0/g, "var ");
  }

  if ("!" === _ugly) {
    __ = __ // ugly
      .replace(/\/\/(?:\*\/)*(.+)/g, "/*$1*/")
    //.replace(/\s+/g, " ")
      .replace(/undefined/g, "void 0")
      .replace(/(true|\!false|\!\!true)/g, "!0")
      .replace(/(false|\!true|\!\!false)/g, "!1")
      .replace(/while\((.+)\)/g, "for(;$1;)")
      .replace(/Number\(/g, "(+")
      .replace(/\.toString\(\)/g, "+\"\"");
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // rebuild;

  x = y = z = a = 0;
  for(;__.match(__sq__);) { // put single quotes back
    __ = __.replace(__sq__, sq_[y]);
    if("!" === _legacy) { // TS related, and interpolation
      __ = __
        .replace(/\$\{([^'\}]+)\}/g, "' + ( $1 ) + '") // interpolation "${}"
        .replace(/''\s\+\s|\s\+\s''/g, "");
    }
    y++;
  }
  for(;__.match(__dq__);) { // put double quotes back
    __ = __.replace(__dq__, dq_[x]);
    if("!" === _legacy) { // TS related, and interpolation
      __ = __
        .replace(/\$\{([^"\}]+)\}/g, "\" + ( $1 ) + \"") // interpolation "${}"
        .replace(/""\s\+\s|\s\+\s""/g, "");
    }
    x++;
  }

  __ = __.replace(/`/g, "\\'"); // replace embeded graves

  for(;__.match(__ga__);) { // put grave accents back
    __ = __.replace(__ga__, ga_[z]);
    if("!" === _legacy) { // TS related, and interpolation
      __ = __
        .replace(/`/g, "'")
        .replace(/\$\{([^'\}]+)\}/g, "' + ( $1 ) + '") // interpolation `${}`
        .replace(/''\s\+\s|\s\+\s''/g, "");
    }
    z++;
  }
  for(;__.match(__rx__);) { // put regular expressions back
    __ = __.replace(__rx__, rx_[a]);
    a++;
  }

  __ = __
    .replace(/([\w\d\$_]+)@([\w\d\$_]+)/g, "$1.prototype.$2")
    .replace(/@([\w\$_]+)/g, "@.$1")
    .replace(/([^~])@/g, "$1this")
    .replace(/case\s([\w\d\$_]+)\s*\=\s?/g, "this.$1 = ")
    .replace(/([^\\\.])\.([\s\n;\}]+)/g, "$1;$2") // ;
    .replace(/~([1-9])/g, "/dol/$1") // $1 fix
    .replace(/\/dol\//g, "$")
    .replace(/~/g, '') // remove ~, fix \char
    .replace(/\-tilde\-/g, '~'); // make ~
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // handle other features

  if("!" === _htmleditor || _jseditor) {
    __ = __
      .replace(/\n{2,}/gm, "\n") // multiple \n
      .replace(/\n(a-z)/gi, "\n\n$1") // outside words, like function, if, etc.
      .replace(/\s*\+\s*(["'`])/g, "\n+$1") // + "'`
    //.replace(/(.+),\s*(.+)/g, "$1, $2") // commas
      .replace(/\}\s+(.+);/g, "}\n\n$1;") // anything following a }
      .replace(/([\)\]\};\+\-])\}/g, "$1\n}") // anything before a }
      .replace(/([\w\)\]\}]+)\s*(\{)([^\n]+)/g, "$1 $2\n$3") // before {
      .replace(/(\})\s*([\w\(\[\{]+)/g, "$1\n$2") // after }
      .replace(/\}\nelse/g, "} else")
      .replace(/([;\}])(\s|\n+)(var|const|console|if|for|switch|function|Object)/g, "$1\n$3") // var, const, etc.
      .replace(/([;\}])\n(if|for|switch|function|Object)/g, "$1\n\n$2") // var, const, etc. fix
      .replace(/([\(\[\{])\s+\//g, "$1\n\/") // comments
      .replace(/\{\s*\}/g, "{}") // fix {}
      .replace(/\.\s*([^\w\d\$_]+)/g, "$1") // fix .
      .replace(/\!\s*([^\=a-z\$_\(])/gi, "!== $1"); // fix wordy
    //.replace(/([\S])(\{|\(|\[)(\s+)/g, "$1 $2\n$3")
    //.replace(/\s\s(\})(\w+)/g, "$1\n$2");
  }

  N = 0;
  for(;__.match(__nch__);) { // put no.t.ch back
    __ = __.replace(__nch__, nch_[N]);
    N++;
  }

  TUX = __.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"); // make parsable
  if("!" === _eval) {
    eval(TUX); // eval or not
  }

  if("!" === _htmleditor) {
    __ = __
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>")
      .replace(/\s/g, "&nbsp;");
    __ += // clean-up, make more readable
      (("!" != _clean)?
       "<br/>/*---- TuxedoScript - Ephellon Dantzler ----*/<br/>":
       "");
  }
  if(!__os__.value) {
    __os__.innerHTML = __;
  } else {
    __os__.value = __.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }
  if("!" === _hide) {
    __os__.setAttribute("style", "display:none"); // hide or not
  }
  return TUX;
}

var tux, tuxedo, nm;
tux = tuxedo = {};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
tux = tuxedo = nm || { // nm
  get: {
    form: {
      data: function() {
        var x = 0;
        var l = window.location.search + "";
        if (/\?/.test(l) === !1) return !1;
        l = l
          .replace("?", "")
          .replace(/\\("|')/g, "\\\\\\$1")
          .replace(/[^\\]("|')/g, "\\$1");
        if (!l || "" === l) return !1;
        var a = encodeURI(l)
        .replace(/=/g, '":"').split("&");
        var R = '{"';
        for (;x < a.length - 1;) {
          R += a[x] + '","';
          x++;
        }
        R += a[x] + '"}';
        R = (R + "")
          .replace(",\n", ",");
        R = JSON.parse(decodeURI(R));
        return R;
      }
    }
  },
  storage: {
    set: function() {
      for (var e = 0, t = false; e < arguments.length;) {
        if ("undefined" != typeof Storage) {
          localStorage.setItem(arguments[e], arguments[e + 1]);
          e += 2;
          t = true;
        }
        e += 2;
      }
      return t;
    },
    check: function(e) {
      return !!tux.storage.get(e);
    },
    get: function(e) {
      return localStorage.getItem(e);
    },
    "delete": function(e) {
      localStorage.setItem(e, null);
      return !tux.storage.check(e);
    }
  },
  attr: function(e, t, a) {
    if (e) if (!a) return e.getAttribute(t); else return "!" != a ? e.setAttribute(t, a) : e.getAttribute(t);
  },
  id: function(e, t, a) {
    if ("!" != e && e) {
      var g = document.getElementById(e) || document.getElementById(e + " ");
      if (a) return tux.attr(g, t, a);
      if (t) if ("$html" != t) g.innerHTML = t; else return g.innerHTML;
      return g;
    }
  },
  "class": function(e, t, a, r) {
    if ("!" != e && e) {
      var g = document.getElementsByClassName(e);
      if (!r) {
        if (a) if ("$html" != a) g[t].innerHTML = a; else return g[t].innerHTML;
        return g;
      } else tux.attr(g[t], a, r);
    }
  },
  tag: function(e, t, a, r) {
    if ("!" != e && e) {
      var g = document.getElementsByTagName(e);
      if (!r) {
        if (a) if ("$html" != a) g[t].innerHTML = a; else return g[t].innerHTML;
        return g;
      } else tux.attr(g[t], a, r);
    }
  },
  ele: function(e, t, a, r) {
    if ("!" != e && e) {
      var g = document.querySelectorAll(e);
      if (g.length < 2) t = 0;
      if (!r) {
        if (a) if ("$html" != a) g[t].innerHTML = a; else return g[t].innerHTML;
        return g;
      } else tux.attr(g[t], a, r);
    }
  },
  save: function(e, t) {
    var k = window.location.pathname + "";
    t = t || k.substring(k.lastIndexOf("/") + 1, k.length) + ".cache";
    tux.storage.set(t, e);
    return tux.storage.check(t);
  },
  load: function(e, t, a, r) {
    a = a || !1;
    e = a ? encodeURI(name) : name;
    r = r || document.body;
    t = t || e.substr(0, e.indexOf("."));
    var k = window.location.pathname + "";
    e = e || k.substring(k.lastIndexOf("/") + 1, k.length) + ".cache";
    return tux.storage.get(name);
  },
  "delete": function(e) {
    var k = window.location.pathname + "";
    e = e || k.substring(k.lastIndexOf("/") + 1, k.length) + ".cache";
    var g = tux.storage.delete(name);
    return g;
  }
};

document.onreadystatechange = function(){ // Tuxedo() when the page is ready
  if(document.readyState === "complete") {
    TUX = Tuxedo();
  }
};