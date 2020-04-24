function autocomplete(inp, arr) {
    let allAttention;
    inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        allAttention = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          allAttention++;

          addActive(x);
        } else if (e.keyCode == 38) {
          allAttention--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (allAttention > -1) {
            if (x) x[allAttention].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (allAttention >= x.length) allAttention = 0;
      if (allAttention < 0) allAttention = (x.length - 1);
      x[allAttention].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      let x = document.getElementsByClassName("autocomplete-items");
      for (let i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
  let someWords = ["puppies","cats","dogs","of","to","and","a","in","is","it","you","that","he","was","for","on","are","with","as","I","his","they","be","at","one","have","this","from","or","had","by","hot","word","but","what","some","we","can","out","other","were","all","there","when","up","use","your","how","said","an","each","she","which","do","their","time","if","will","way","about","many","then","them","write","would","like","so","these","her","long","make","thing","see","him","two","has","look","more","day","could","go","come","did","number","sound","no","most","people","my","over","know","water","than","call","first","who","may","down","side","been","now","find","any","new","work","part","take","get","place","made","live","where","after","back","little","only","round","man","year","came","show","every","good","me","give","our","under","name","very","through","just","form","sentence","great","think","say","help","low","line","differ","turn","cause","much","mean","before","move","right","boy","old","too","same","tell","does","set","three","want","air","well","also","play","small","end","put","home","read","hand","port","large","spell","add","even","land","here","must","big","high","such","follow","act","why","ask","men","change","went","light","kind","off","need","house","picture","try","us","again","animal","point","mother","world","near","build","self","earth","father","head","stand","own","page","should","country","found","answer","school","grow","study","still","learn","plant","cover","food","sun","four","between","state","keep","eye","never","last","let","thought","city","tree","cross","farm","hard","start","might","story","saw","far","sea","draw","left","late","run","don't","while","press","close","night","real","life","few","north","open","seem","together","next","white","children","begin","go","grand"," ball"," yet"," wave"," drop"," heart"," am"," present"," heavy"," dance"," engine"," position"," arm"," wide"," sail"," material"," size"," vary"," settle"," speak"," weight"," general"," ice"," matter"," circle"," pair"," include"," divide"," syllable"," felt"," perhaps"," pick"," sudden"," count"," square"," reason"," length"," represent"," art"," subject"," region"," energy"," hunt"," probable"," bed"," brother"," egg"," ride"," cell"," believe"," fraction"," forest"," sit"," race"," window"," store"," summer"," train"," sleep"," prove"," lone"," leg"," exercise"," wall"," catch"," mount"," wish"," sky"," board"," joy"," winter"," sat"," written"," wild"," instrument"," kept"," glass"," grass"," cow"," job"," edge"," sign"," visit"," past"," soft"," fun"," bright"," gas"," weather"," month"," million"," bear"," finish"," happy"," hope"," flower"," clothe"," strange"," gone"," jump"," baby"," eight"," village"," meet"," root"," buy"," raise"," solve"," metal"," whether"," push"," seven"," paragraph"," third"," shall"," held"," hair"," describe"," cook"," floor"," either"," result"," burn"," hill"," safe"," cat"," century"," consider"," type"," law"," bit"," coast"," copy"," phrase"," silent"," tall"," sand"," soil"," roll"," temperature"," finger"," industry"," value"," fight"," lie"," beat"," excite"," natural"," view"," sense"," ear"," else"," quite"," broke"," case"," middle"," kill"," son"," lake"," moment"," scale"," loud"," spring"," observe"," child"," straight"," consonant"," nation"," dictionary"," milk"," speed"," method"," organ"," pay"," age"," section"," dress"," cloud"," surprise"," quiet"," stone"," tiny"," climb"," cool"," design"," poor"," lot"," experiment"," bottom"," key"," iron"," single"," stick"," flat"," twenty"," skin"," smile"," crease"," hole"," trade"," melody"," trip"," office"];
  autocomplete(document.getElementById("Busqueda"), someWords);