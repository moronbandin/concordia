

let state = {
  language:"latin",
  section:"nominal",
  tab:"Visión xeral",
  case:"AC",
  mode:"case",
  nominalVariant:{"1":"insula","2":"fluvius","3":"mercator"},
  greekVariant:{"1":"chora","2":"logos","3":"phylax"},
  showAdvanced:false,
  gender:"all",
  agreement:3,
  agreementCase:"NOM",
  adjectiveFamily:"us",
  adjective:"bonus",
  predicate:0,
  ambiguity:"bare"
};

const greekSectionConfig = {
  nominal:{crumb:"Formas · Flexión nominal grega",tabs:["Visión xeral","1.ª","2.ª","3.ª","Por caso","Por xénero"],kind:"nominal"},
  statements:{crumb:"Formas · Enunciados gregos",tabs:[],kind:"statements"},
  agreement:{crumb:"Formas · Concordancia grega",tabs:["Nominal","Suxeito · atributo","Xénero","Número","Neutro"],kind:"agreement"}
};

function currentConfig(){
  return state.language === "greek" ? greekSectionConfig[state.section] : sectionConfig[state.section];
}

const $ = selector => document.querySelector(selector);

const genderInfo = {
  M:{symbol:"♂",label:"masculino",className:"masculine"},
  F:{symbol:"♀",label:"feminino",className:"feminine"},
  N:{symbol:"⚲",label:"neutro",className:"neuter"},
  "M/F":{symbol:"♂ ♀",label:"masculino ou feminino",className:"common"}
};

function genderMark(code, withLabel=false){
  const info = genderInfo[code] || genderInfo.N;
  return `<span class="gender-marker ${info.className}" aria-label="${info.label}">${info.symbol}${withLabel?` <span>${info.label}</span>`:""}</span>`;
}

function endingMarkup(word, ending){
  if(!ending || ending === "variable") return word;
  const plain = ending.replace("-","");
  if(!plain || !word.endsWith(plain)) return word;
  return word.slice(0, -plain.length) + `<span class="ending">${plain}</span>`;
}

function adjectiveEnding(form, gender, number, grammaticalCase){
  const endings = {
    M:{sg:{NOM:form.endsWith("us")?"us":"",VOC:form.endsWith("e")?"e":"",AC:"um",XEN:"i",DAT:"o",ABL:"o"},pl:{NOM:"i",VOC:"i",AC:"os",XEN:"orum",DAT:"is",ABL:"is"}},
    F:{sg:{NOM:"a",VOC:"a",AC:"am",XEN:"ae",DAT:"ae",ABL:"a"},pl:{NOM:"ae",VOC:"ae",AC:"as",XEN:"arum",DAT:"is",ABL:"is"}},
    N:{sg:{NOM:"um",VOC:"um",AC:"um",XEN:"i",DAT:"o",ABL:"o"},pl:{NOM:"a",VOC:"a",AC:"a",XEN:"orum",DAT:"is",ABL:"is"}}
  };
  return endings[gender][number][grammaticalCase];
}

function pronounEnding(form, gender, number, grammaticalCase){
  if(number === "pl"){
    const plural = {M:{NOM:"i",AC:"os",XEN:"orum",DAT:"is",ABL:"is"},F:{NOM:"ae",AC:"as",XEN:"arum",DAT:"is",ABL:"is"},N:{NOM:"a",AC:"a",XEN:"orum",DAT:"is",ABL:"is"}};
    const expected = plural[gender][grammaticalCase];
    if(form.endsWith("ibus")) return "ibus";
    return form.endsWith(expected) ? expected : "";
  }
  if(grammaticalCase === "XEN" && form.endsWith("ius")) return "ius";
  if(grammaticalCase === "DAT" && form.endsWith("i")) return "i";
  if(grammaticalCase === "ABL") return gender === "F" && form.endsWith("a") ? "a" : form.endsWith("o") ? "o" : "";
  if(grammaticalCase === "AC"){
    const candidates = gender === "M" ? ["unc","um","em"] : gender === "F" ? ["anc","am"] : ["ud","id","oc","od"];
    return candidates.find(ending => form.endsWith(ending)) || "";
  }
  return "";
}

function setVisible(id){
  ["nominalView","statementsView","agreementView","adjectivesView","pronounsView","ambiguityView","placeholderView"].forEach(view => {
    $("#" + view).classList.toggle("hidden", view !== id);
  });
}

function nominalModel(decl){
  const variants = nominalVariants[decl.id];
  if(!variants) return {...decl,word:decl.examples[0][0],gender:decl.examples[0][1],note:"modelo principal"};
  return variants.find(item => item.id === state.nominalVariant[decl.id]) || variants[0];
}

function declensionCard(decl){
  const model = nominalModel(decl);
  const variants = nominalVariants[decl.id] || [];
  return `
    <article class="decl-card ${genderInfo[model.gender]?.className || "common"}">
      <div class="decl-head">
        <strong>${decl.name} declinación</strong>
        <span class="genders">${decl.genders.map(g => genderMark(g)).join("")}</span>
      </div>
      <div class="lexemes">
        <div class="lexeme">${model.word}<small>${genderMark(model.gender,true)}</small></div>
        <div class="lede">${model.note}</div>
        ${variants.length ? `<div class="variant-bar">${variants.map(item => `<button class="variant-button ${item.id===model.id?"active":""}" data-decl="${decl.id}" data-variant="${item.id}">${item.label}</button>`).join("")}</div>` : ""}
      </div>
      <div class="number-head"><span>CASO</span><span>SG</span><span>PL</span></div>
      <div class="forms">
        ${cases.map(c => `
          <div class="case-row ${c===state.case?"active":""}" data-case="${c}">
            <span class="case-label">${c}</span>
            <span class="form-word">${endingMarkup(model.sg[c], model.endings.sg[c])}</span>
            <span class="form-word">${endingMarkup(model.pl[c], model.endings.pl[c])}</span>
          </div>
        `).join("")}
      </div>
    </article>`;
}

function renderSubnav(){
  const config = currentConfig();
  $("#crumb").textContent = config.crumb;
  $("#subnav").innerHTML = config.tabs.map(tab => `<button class="${tab===state.tab?"active":""}" data-tab="${tab}">${tab}</button>`).join("");
  document.querySelectorAll("#subnav button").forEach(button => {
    button.onclick = () => {
      state.tab = button.dataset.tab;
      if(state.section === "nominal"){
        state.mode = state.tab === "Por xénero" ? "gender" : state.tab === "Por caso" ? "case" : "paradigm";
      }
      if(state.section === "agreement"){
        const preferred = {
          "Nominal":"fluvius-magnus"
        }[state.tab];
        if(preferred) state.agreement = agreementExamples.findIndex(example => example.id === preferred);
      }
      render();
    };
  });
}

function renderModeControls(){
  const box = $("#modeControls");
  if(state.section === "nominal"){
    box.classList.remove("hidden");
    box.innerHTML = `
      <button class="${state.mode==="paradigm"?"active":""}" data-mode="paradigm">Declinación</button>
      <button class="${state.mode==="case"?"active":""}" data-mode="case">Caso</button>
      <button class="${state.mode==="gender"?"active":""}" data-mode="gender">Xénero</button>
    `;
    box.querySelectorAll("button").forEach(button => button.onclick = () => {
      state.mode = button.dataset.mode;
      render();
    });
  } else if(state.section === "agreement" && !["Suxeito · atributo","Xénero","Número","Neutro"].includes(state.tab)){
    box.classList.remove("hidden");
    const examples = state.language === "greek" ? greekAgreementExamples : agreementExamples;
    box.innerHTML = `<label class="example-select-label">Exemplo <select id="agreementSelect">${examples.map((example,index) => `<option value="${index}" ${index===state.agreement?"selected":""}>${example.label}</option>`).join("")}</select></label>`;
    $("#agreementSelect").onchange = event => {
      state.agreement = Number(event.target.value);
      render();
    };
  } else {
    box.classList.add("hidden");
  }
}

function renderNominal(){
  if(state.language === "greek"){
    renderGreekNominal();
    return;
  }
  setVisible("nominalView");
  $("#title").textContent = state.mode === "gender" ? "Declinación non é xénero" : "A flexión nominal como sistema";
  $("#lede").textContent = state.mode === "case"
    ? "Escolle un caso e mira como atravesa os paradigmas; 4.ª e 5.ª quedan como ampliación opcional."
    : state.mode === "gender"
      ? "O xénero aparece repartido polos paradigmas, non pegado a unha soa columna."
      : "Cada columna é un modelo; a fila activa mostra unha función compartida.";
  $("#conceptFact").textContent = state.mode === "gender" ? "Xénero" : "Flexión";
  $("#focusFact").textContent = state.mode === "case" ? `${caseNames[state.case]} en singular e plural` : "Paradigmas nominais";
  $("#signalFact").textContent = state.mode === "gender" ? "1.ª non sempre é feminino; 2.ª non sempre é masculino." : "Un caso pode verse horizontalmente en todas as declinacións.";

  if(state.mode === "gender"){
    renderGenderView();
    return;
  }

  const activeDecl = state.tab.match(/^([1-3])\.ª$/)?.[1];
  const coreDecls = declensions.slice(0,3);
  const visibleDecls = activeDecl ? coreDecls.filter(d => d.id === activeDecl) : coreDecls;
  const gridClass = visibleDecls.length === 1 ? "nominal-grid single" : "nominal-grid";
  $("#nominalView").innerHTML = `
    <div class="${gridClass}">
      ${visibleDecls.map(declensionCard).join("")}
    </div>
    <div class="ending-summary ${visibleDecls.length === 1 ? "single" : ""}">
      ${visibleDecls.map(decl => {
        const model = nominalModel(decl);
        return `<div class="ending-cell"><strong>${decl.name} · NOM / XEN</strong><span class="ending-pair">${model.endings.sg.NOM} / ${model.endings.sg.XEN}</span></div>`;
      }).join("")}
    </div>
    ${activeDecl ? "" : `<button class="optional-toggle" data-toggle-advanced>${state.showAdvanced?"Ocultar":"Mostrar"} 4.ª e 5.ª declinacións <span>${state.showAdvanced?"↑":"↓"}</span></button>`}
    ${!activeDecl && state.showAdvanced ? `<div class="optional-block"><div class="optional-title">Ampliación</div><div class="nominal-grid optional">${declensions.slice(3).map(declensionCard).join("")}</div></div>` : ""}
  `;
  document.querySelectorAll("[data-variant]").forEach(button => button.onclick = event => {
    event.stopPropagation();
    state.nominalVariant[button.dataset.decl] = button.dataset.variant;
    renderNominal();
  });
  const advancedToggle = document.querySelector("[data-toggle-advanced]");
  if(advancedToggle) advancedToggle.onclick = () => {
    state.showAdvanced = !state.showAdvanced;
    renderNominal();
  };
  document.querySelectorAll(".case-row").forEach(row => {
    row.onclick = () => {
      state.case = row.dataset.case;
      renderNominal();
    };
    row.onmouseenter = () => document.querySelectorAll(`[data-case="${row.dataset.case}"]`).forEach(peer => peer.classList.add("peer-hover"));
    row.onmouseleave = () => document.querySelectorAll(".case-row").forEach(peer => peer.classList.remove("peer-hover"));
  });
}

function greekModel(decl){
  const variants = greekGrammar.variants[decl.id];
  return variants.find(item => item.id === state.greekVariant[decl.id]) || variants[0];
}

function greekDeclensionCard(decl){
  const model = greekModel(decl);
  const variants = greekGrammar.variants[decl.id];
  return `
    <article class="decl-card greek-card ${genderInfo[model.gender].className}">
      <div class="decl-head">
        <strong>${decl.name} declinación</strong>
        <span class="genders">${decl.genders.map(gender => genderMark(gender)).join("")}</span>
      </div>
      <div class="lexemes">
        <div class="lexeme"><span class="greek-article">${model.article}</span> ${model.word}<small>${genderMark(model.gender,true)}</small></div>
        <div class="lede">${model.note}, ${model.article}</div>
        <div class="variant-bar">${variants.map(item => `<button class="variant-button ${item.id===model.id?"active":""}" data-greek-decl="${decl.id}" data-greek-variant="${item.id}">${item.label}</button>`).join("")}</div>
      </div>
      <div class="number-head"><span>CASO</span><span>SG</span><span>PL</span></div>
      <div class="forms">
        ${greekGrammar.cases.map(grammaticalCase => `
          <div class="case-row ${grammaticalCase===state.case?"active":""}" data-greek-case="${grammaticalCase}">
            <span class="case-label">${grammaticalCase}</span>
            <span class="form-word">${endingMarkup(model.sg[grammaticalCase],model.endings.sg[grammaticalCase])}</span>
            <span class="form-word">${endingMarkup(model.pl[grammaticalCase],model.endings.pl[grammaticalCase])}</span>
          </div>`).join("")}
      </div>
    </article>`;
}

function renderGreekNominal(){
  setVisible("nominalView");
  const activeDecl = state.tab.match(/^([1-3])\.ª$/)?.[1];
  const visibleDecls = activeDecl ? greekGrammar.declensions.filter(decl => decl.id === activeDecl) : greekGrammar.declensions;
  if(state.mode === "gender"){
    $("#title").textContent = "Declinación non é xénero";
    $("#lede").textContent = "O artigo do enunciado fai visible o xénero, tamén cando a terminación non abonda.";
    $("#conceptFact").textContent = "Xénero en grego";
    $("#focusFact").textContent = "ὁ · ἡ · τό";
    $("#signalFact").textContent = "A declinación e o xénero son informacións distintas.";
    const groups = {M:[["νεανίας","1.ª"],["λόγος","2.ª"],["φύλαξ","3.ª"]],F:[["χώρα","1.ª"],["τιμή","1.ª"],["πόλις","3.ª"]],N:[["δῶρον","2.ª"],["σῶμα","3.ª"]]};
    $("#nominalView").innerHTML = `<div class="gender-view">${Object.entries(groups).map(([gender,items]) => `<article class="gender-column ${genderInfo[gender].className}"><h3>${genderMark(gender,true)}</h3>${items.map(([word,decl]) => `<div class="gender-item"><span>${word}</span><span>${decl} decl.</span></div>`).join("")}</article>`).join("")}</div>`;
    return;
  }
  $("#title").textContent = "A flexión nominal grega como sistema";
  $("#lede").textContent = state.mode === "case" ? "Un mesmo caso atravesa as tres declinacións; cada columna mostra singular e plural ao mesmo tempo." : "Explora cada paradigma e cambia o substantivo modelo sen abandonar a declinación.";
  $("#conceptFact").textContent = "Flexión grega";
  $("#focusFact").textContent = state.mode === "case" ? `${greekGrammar.caseNames[state.case] || "nominativo"} en singular e plural` : "Paradigmas nominais";
  $("#signalFact").textContent = "O grego conserva cinco casos; non ten ablativo.";
  $("#nominalView").innerHTML = `
    <div class="nominal-grid ${visibleDecls.length===1?"single":""}">${visibleDecls.map(greekDeclensionCard).join("")}</div>
    <div class="ending-summary ${visibleDecls.length===1?"single":""}">${visibleDecls.map(decl => { const model=greekModel(decl); return `<div class="ending-cell"><strong>${decl.name} · NOM / XEN</strong><span class="ending-pair">${model.sg.NOM} · ${model.sg.XEN}</span></div>`; }).join("")}</div>`;
  document.querySelectorAll("[data-greek-variant]").forEach(button => button.onclick = event => { event.stopPropagation(); state.greekVariant[button.dataset.greekDecl] = button.dataset.greekVariant; renderGreekNominal(); });
  document.querySelectorAll("[data-greek-case]").forEach(row => {
    row.onclick = () => { state.case = row.dataset.greekCase; renderGreekNominal(); };
    row.onmouseenter = () => document.querySelectorAll(`[data-greek-case="${row.dataset.greekCase}"]`).forEach(peer => peer.classList.add("peer-hover"));
    row.onmouseleave = () => document.querySelectorAll("[data-greek-case]").forEach(peer => peer.classList.remove("peer-hover"));
  });
}

function renderGenderView(){
  const groups = {
    M:[["poeta","1.ª"],["fluvius","2.ª"],["puer","2.ª"],["vir","2.ª"],["mercator","3.ª"]],
    F:[["insula","1.ª"],["puella","1.ª"],["Graecia","1.ª"],["uxor","3.ª"]],
    N:[["oppidum","2.ª"],["cubiculum","2.ª"],["ostium","2.ª"],["verbum","2.ª"],["peristylum","2.ª"],["corpus","3.ª"],["mare","3.ª"]]
  };
  $("#nominalView").innerHTML = `
    <div class="gender-view">
      ${Object.entries(groups).map(([code, items]) => `
        <article class="gender-column ${genderInfo[code].className}">
          <h3>${genderMark(code,true)}</h3>
          ${items.map(([word, decl]) => `<div class="gender-item"><span>${word}</span><span>${decl} decl.</span></div>`).join("")}
        </article>
      `).join("")}
    </div>
  `;
}

function renderStatements(){
  if(state.language === "greek"){
    renderGreekStatements();
    return;
  }
  setVisible("statementsView");
  $("#title").textContent = "O enunciado identifica a palabra";
  $("#lede").textContent = "Nos substantivos dáse sempre o nominativo singular e o xenitivo singular.";
  $("#conceptFact").textContent = "Enunciado nominal";
  $("#focusFact").textContent = "NOM SG + XEN SG";
  $("#signalFact").textContent = "A mesma forma illada pode pertencer a palabras e paradigmas diferentes.";
  $("#statementsView").innerHTML = `
    <div class="statement-demo">
      <div class="statement-rule">
        <span>NOMINATIVO SINGULAR</span><strong>+</strong><span>XENITIVO SINGULAR</span>
      </div>
      <p class="lesson-intro">O enunciado é a forma base coa que identificamos unha palabra e distinguimos a súa declinación.</p>
      <div class="ambiguity-question">
        <span>Se atopamos</span>
        <strong>templa</strong>
        <span>que palabra é?</span>
      </div>
      <div class="statement-paths">
        <article class="statement-path feminine">
          <span class="path-label">Se o enunciado é</span>
          <strong>templa, templae</strong>
          <span>templa é nominativo singular dunha palabra da 1.ª declinación.</span>
        </article>
        <article class="statement-path neuter">
          <span class="path-label">Se o enunciado é</span>
          <strong>templum, -i</strong>
          <span>templa é nominativo, vocativo ou acusativo plural neutro da 2.ª declinación.</span>
        </article>
      </div>
      <div class="statement-examples">
        <span><strong>insula, insulae</strong> · 1.ª</span>
        <span><strong>fluvius, fluvii</strong> · 2.ª</span>
        <span><strong>oppidum, oppidi</strong> · 2.ª ⚲</span>
        <span><strong>mercator, mercatoris</strong> · 3.ª</span>
      </div>
    </div>`;
}

function renderGreekStatements(){
  setVisible("statementsView");
  $("#title").textContent = "O enunciado identifica a palabra grega";
  $("#lede").textContent = "Nos substantivos dáse nominativo singular, xenitivo singular e artigo.";
  $("#conceptFact").textContent = "Enunciado nominal";
  $("#focusFact").textContent = "NOM SG + XEN SG + artigo";
  $("#signalFact").textContent = "O xenitivo revela o tema; o artigo indica o xénero.";
  $("#statementsView").innerHTML = `
    <div class="statement-demo greek-statement">
      <div class="statement-rule"><span>NOMINATIVO SINGULAR</span><strong>+</strong><span>XENITIVO SINGULAR</span><strong>+</strong><span>ARTIGO</span></div>
      <p class="lesson-intro">O enunciado é a forma base coa que identificamos un substantivo. Non é unha tradución: contén a información necesaria para saber como se declina e de que xénero é.</p>
      <div class="greek-enunciation-focus"><span>Non abonda con ver</span><strong>σῶμα</strong><span>O enunciado completo é</span><b>σῶμα, σώματος, τό</b></div>
      <div class="statement-paths three-paths">
        <article class="statement-path"><span class="path-label">NOM SG</span><strong>σῶμα</strong><span>forma pola que comeza o enunciado</span></article>
        <article class="statement-path"><span class="path-label">XEN SG</span><strong>σώματος</strong><span>revela o tema σωματ- e a 3.ª declinación</span></article>
        <article class="statement-path neuter"><span class="path-label">ARTIGO</span><strong>τό</strong><span>indica que o substantivo é neutro</span></article>
      </div>
      <div class="statement-examples greek-examples">
        <span><strong>χώρα, χώρας, ἡ</strong> · 1.ª ♀</span>
        <span><strong>λόγος, λόγου, ὁ</strong> · 2.ª ♂</span>
        <span><strong>δῶρον, δώρου, τό</strong> · 2.ª ⚲</span>
        <span><strong>φύλαξ, φύλακος, ὁ</strong> · 3.ª ♂</span>
        <span><strong>πόλις, πόλεως, ἡ</strong> · 3.ª ♀</span>
        <span><strong>σῶμα, σώματος, τό</strong> · 3.ª ⚲</span>
      </div>
    </div>`;
}

function renderAdjectives(){
  setVisible("adjectivesView");
  const overview = [
    {title:"Tres terminacións",form:"bonus · bona · bonum",text:"Modelo 2-1-2: masculino e neutro seguen a 2.ª; o feminino segue a 1.ª.",tag:"nivel inicial"},
    {title:"Tres terminacións en -er",form:"pulcher · pulchra · pulchrum",text:"Pode conservar o e, como liber, ou perdelo no resto do paradigma, como pulcher.",tag:"nivel inicial"},
    {title:"Dúas terminacións",form:"fortis · forte",text:"Masculino e feminino comparten -is; o neutro presenta -e.",tag:"máis adiante"},
    {title:"Unha terminación",form:"prudens · prudentis",text:"Os tres xéneros comparten nominativo; o xenitivo permite recuperar o tema prudent-.",tag:"máis adiante"}
  ];
  $("#title").textContent = "Modelos de flexión adxectiva";
  $("#lede").textContent = "O número de terminacións describe as formas do nominativo singular, non o número de xéneros.";
  $("#conceptFact").textContent = "Adxectivos";
  $("#focusFact").textContent = state.tab;
  $("#signalFact").textContent = "No nivel inicial trabállanse os modelos 2-1-2 en -us e en -er.";

  if(state.tab === "Visión xeral" || state.tab === "-is · -e" || state.tab === "-ns · -ntis"){
    const shown = state.tab === "Visión xeral" ? overview : state.tab === "-is · -e" ? [overview[2]] : [overview[3]];
    $("#adjectivesView").innerHTML = `<div class="lesson"><p class="lesson-intro">Un adxectivo flexiona para expresar os mesmos trazos ca o substantivo co que concorda.</p><div class="lesson-grid">${shown.map(item => `<article class="lesson-panel ${item.tag==="nivel inicial"?"active":""}"><h3>${item.title}</h3><div class="lesson-form">${item.form}</div><p>${item.text}</p><span class="lesson-tag">${item.tag}</span></article>`).join("")}</div></div>`;
    return;
  }

  const familyKey = state.tab.startsWith("-er") ? "er" : "us";
  const family = adjectiveFamilies[familyKey];
  if(!family.some(item => item.id === state.adjective)) state.adjective = family[0].id;
  const adjective = family.find(item => item.id === state.adjective);
  $("#focusFact").textContent = adjective.enunciation;
  $("#adjectivesView").innerHTML = `
    <div class="adjective-explorer">
      <div class="adjective-picker">
        ${family.map(item => `<button class="variant-button ${item.id===adjective.id?"active":""}" data-adjective="${item.id}">${item.enunciation}</button>`).join("")}
      </div>
      <div class="adjective-heading">
        <div><strong>${adjective.enunciation}</strong><span>${adjective.label}</span></div>
        <span class="lesson-tag">paradigma completo</span>
      </div>
      <div class="adjective-table-wrap">
        <table class="adjective-table">
          <thead>
            <tr><th rowspan="2">Caso</th><th colspan="2" class="gender-head masculine">${genderMark("M",true)}</th><th colspan="2" class="gender-head feminine">${genderMark("F",true)}</th><th colspan="2" class="gender-head neuter">${genderMark("N",true)}</th></tr>
            <tr><th>SG</th><th>PL</th><th>SG</th><th>PL</th><th>SG</th><th>PL</th></tr>
          </thead>
          <tbody>
            ${cases.map(c => `<tr class="${c===state.case?"active":""}" data-adjective-case="${c}"><th>${c}</th>${["M","F","N"].map(g => `<td class="gender-cell ${genderInfo[g].className}">${endingMarkup(adjective[g].sg[c],adjectiveEnding(adjective[g].sg[c],g,"sg",c))}</td><td class="gender-cell ${genderInfo[g].className}">${endingMarkup(adjective[g].pl[c],adjectiveEnding(adjective[g].pl[c],g,"pl",c))}</td>`).join("")}</tr>`).join("")}
          </tbody>
        </table>
      </div>
      ${familyKey === "er" ? `<div class="adjective-notes"><span><strong>Conserva o e</strong> liber, libera, liberum</span><span><strong>Perde o e</strong> pulcher, pulchra, pulchrum</span></div>` : `<div class="example-line">fluvius magnus · insula magna · oppidum magnum</div>`}
    </div>`;
  document.querySelectorAll("[data-adjective]").forEach(button => button.onclick = () => {
    state.adjective = button.dataset.adjective;
    renderAdjectives();
  });
  document.querySelectorAll("[data-adjective-case]").forEach(row => row.onclick = () => {
    state.case = row.dataset.adjectiveCase;
    renderAdjectives();
  });
}

function pronounTable(paradigm){
  return `<div class="adjective-table-wrap pronoun-table-wrap"><table class="adjective-table pronoun-table">
    <thead><tr><th rowspan="2">Caso</th><th colspan="3">Singular</th><th colspan="3">Plural</th></tr>
    <tr><th class="gender-head masculine">${genderMark("M")}</th><th class="gender-head feminine">${genderMark("F")}</th><th class="gender-head neuter">${genderMark("N")}</th><th class="gender-head masculine">${genderMark("M")}</th><th class="gender-head feminine">${genderMark("F")}</th><th class="gender-head neuter">${genderMark("N")}</th></tr></thead>
    <tbody>${pronounCases.map(c => `<tr><th>${c}</th>${paradigm.sg[c].map((form,index) => { const g=["M","F","N"][index]; return `<td class="gender-cell ${genderInfo[g].className}">${endingMarkup(form,pronounEnding(form,g,"sg",c))}</td>`; }).join("")}${paradigm.pl[c].map((form,index) => { const g=["M","F","N"][index]; return `<td class="gender-cell ${genderInfo[g].className}">${endingMarkup(form,pronounEnding(form,g,"pl",c))}</td>`; }).join("")}</tr>`).join("")}</tbody>
  </table></div>`;
}

function renderPronouns(){
  setVisible("pronounsView");
  $("#conceptFact").textContent = "Pronomes";
  $("#focusFact").textContent = state.tab;
  $("#signalFact").textContent = "As formas codifican caso, número e xénero; non todos os paradigmas son idénticos.";

  if(state.tab === "Visión xeral"){
    $("#title").textContent = "Mapa dos paradigmas pronominais";
    $("#lede").textContent = "Compara as formas-sinal e abre cada paradigma para ver todos os casos, números e xéneros.";
    $("#pronounsView").innerHTML = `<div class="pronoun-dashboard">${pronounParadigms.map(item => `<button class="pronoun-summary" data-pronoun-tab="${item.label}"><span>${item.kind}</span><strong>${item.label}</strong><small>${item.sg.XEN[0]} · ${item.sg.DAT[0]}</small></button>`).join("")}</div>`;
    document.querySelectorAll("[data-pronoun-tab]").forEach(button => button.onclick = () => { state.tab = button.dataset.pronounTab; render(); });
    return;
  }

  if(state.tab === "Persoais"){
    $("#title").textContent = "Pronomes persoais";
    $("#lede").textContent = "Ego e tu teñen formas propias; o plural aparece no mesmo paradigma.";
    $("#pronounsView").innerHTML = `<div class="personal-grid">${Object.values(personalPronouns).map(item => `<article class="personal-panel"><h3>${item.label}</h3><div class="personal-table"><div><strong>Caso</strong><strong>SG</strong><strong>PL</strong></div>${["NOM","VOC","AC","XEN","DAT","ABL"].map(c => `<div><span>${c}</span><b>${item.sg[c]}</b><b>${item.pl[c]}</b></div>`).join("")}</div></article>`).join("")}</div>`;
    return;
  }

  if(state.tab === "Posesivos"){
    $("#title").textContent = "Posesivos";
    $("#lede").textContent = "O posesivo concorda coa cousa posuída, non coa persoa que posúe.";
    const possessives = [["meus · mea · meum","meu"],["noster · nostra · nostrum","noso"],["tuus · tua · tuum","teu"],["vester · vestra · vestrum","voso"],["suus · sua · suum","reflexivo"]];
    $("#pronounsView").innerHTML = `<div class="possessive-grid">${possessives.map(([forms,label]) => `<article><span>${label}</span><strong>${forms}</strong></article>`).join("")}</div><div class="example-line possessive-examples">pater meus · mater mea · familia mea · villa tua · cubiculum suum · argentaria sua</div>`;
    return;
  }

  const paradigm = pronounParadigms.find(item => item.label === state.tab) || pronounParadigms[0];
  $("#title").textContent = paradigm.label;
  $("#lede").textContent = paradigm.kind;
  $("#pronounsView").innerHTML = `<div class="pronoun-detail"><div class="pronoun-model"><strong>Formas relacionadas</strong><span>${paradigm.model}</span></div>${pronounTable(paradigm)}</div>`;
}

function renderAgreement(){
  if(state.language === "greek"){
    renderGreekAgreement();
    return;
  }
  setVisible("agreementView");
  if(state.tab === "Suxeito · atributo"){
    const example = predicateExamples[state.predicate];
    const marked = example.sentence
      .replace(example.subject,`<span class="syntax-subject">${example.subject}</span>`)
      .replace(example.attribute,`<span class="syntax-attribute">${example.attribute}</span>`);
    $("#title").textContent = "Concordancia entre suxeito e atributo";
    $("#lede").textContent = "O atributo queda en nominativo e comparte número e xénero co suxeito cando esas categorías son visibles.";
    $("#conceptFact").textContent = "Suxeito · atributo";
    $("#focusFact").textContent = example.traits;
    $("#signalFact").textContent = "O verbo copulativo conecta dúas expresións referidas á mesma entidade.";
    $("#agreementView").innerHTML = `<div class="predicate-lab">
      <div class="predicate-picker"><label>Exemplo <select id="predicateSelect">${predicateExamples.map((item,index) => `<option value="${index}" ${index===state.predicate?"selected":""}>${index+1}. ${item.sentence}</option>`).join("")}</select></label></div>
      <div class="predicate-sentence">${marked}</div>
      <div class="syntax-legend"><span><i class="subject-dot"></i>Suxeito</span><span><i class="attribute-dot"></i>Atributo</span><strong>${example.traits}</strong></div>
      <div class="predicate-actions"><button data-predicate-step="-1">← Anterior</button><button data-predicate-step="1">Seguinte →</button></div>
    </div>`;
    $("#predicateSelect").onchange = event => { state.predicate = Number(event.target.value); renderAgreement(); };
    document.querySelectorAll("[data-predicate-step]").forEach(button => button.onclick = () => {
      state.predicate = (state.predicate + Number(button.dataset.predicateStep) + predicateExamples.length) % predicateExamples.length;
      renderAgreement();
    });
    return;
  }
  if(state.tab === "Xénero"){
    $("#title").textContent = "Unha relación, tres xéneros";
    $("#lede").textContent = "O adxectivo cambia para compartir xénero, número e caso co substantivo.";
    $("#conceptFact").textContent = "Concordancia";
    $("#focusFact").textContent = "Contraste de xénero";
    $("#signalFact").textContent = "magnus · magna · magnum responden ao xénero do referente.";
    $("#agreementView").innerHTML = `<div class="gender-contrast">
      <article class="contrast-item masculine">${genderMark("M",true)}<div>fluvius <strong>magnus</strong></div></article>
      <article class="contrast-item feminine">${genderMark("F",true)}<div>insula <strong>magna</strong></div></article>
      <article class="contrast-item neuter">${genderMark("N",true)}<div>oppidum <strong>magnum</strong></div></article>
    </div>`;
    return;
  }
  if(state.tab === "Número"){
    const pairs = [["fluvius","fluvii","♂"],["insula","insulae","♀"],["villa","villae","♀"],["oppidum","oppida","⚲"],["cubiculum","cubicula","⚲"],["ostium","ostia","⚲"],["verbum","verba","⚲"],["peristylum","peristyla","⚲"]];
    $("#title").textContent = "O número transforma o paradigma";
    $("#lede").textContent = "O plural neutro en -a reaparece en varios substantivos do curso.";
    $("#conceptFact").textContent = "Número";
    $("#focusFact").textContent = "Singular / plural";
    $("#signalFact").textContent = "Nos neutros, NOM · VOC · AC plural coinciden en -a.";
    $("#agreementView").innerHTML = `<div class="number-pairs">${pairs.map(([sg,pl,symbol]) => `<div class="number-pair ${symbol==="♂"?"masculine":symbol==="♀"?"feminine":"neuter"}"><span>${sg}</span><span>→</span><strong>${pl}</strong><small>${symbol}</small></div>`).join("")}</div>`;
    return;
  }
  const example = agreementExamples[state.agreement];
  const c = state.agreementCase;
  const forms = example.words[c];
  const endings = example.endings[c];
  const traits = `${c} · ${example.traits}`;
  const genderCode = example.traits.split(" · ")[1];
  const traitMarkup = `${c} · ${example.traits.split(" · ")[0]} · ${genderMark(genderCode)}`;
  $("#title").textContent = "Concordan polos trazos, non pola superficie";
  $("#lede").textContent = "O sinal compartido baixa aos trazos gramaticais. As terminacións quedan visibles, pero non son a conexión principal.";
  $("#conceptFact").textContent = "Concordancia";
  $("#focusFact").textContent = traits;
  $("#signalFact").textContent = endings[0] === endings[1] ? "Aquí coinciden as terminacións, pero iso non é a regra." : "As terminacións diverxen e a concordancia permanece.";
  $("#agreementView").innerHTML = `
    <div class="agreement-stage ${genderInfo[genderCode].className}">
      <div class="phrase">
        <div class="token">
          <div class="latin-word">${endingMarkup(forms[0], endings[0])}</div>
          <div class="downline"></div>
          <div class="trait-chip">${traitMarkup}</div>
          <div class="meta"><span>${example.meta[0]}</span><span>terminación: ${endings[0]}</span></div>
        </div>
        <div class="token">
          <div class="latin-word">${endingMarkup(forms[1], endings[1])}</div>
          <div class="downline"></div>
          <div class="trait-chip">${traitMarkup}</div>
          <div class="meta"><span>${example.meta[1]}</span><span>terminación: ${endings[1]}</span></div>
        </div>
      </div>
      <div class="trait-band">
        <span class="trait-chip">CASO ${c}</span>
        <span class="trait-chip">${example.traits.split(" · ")[0]}</span>
        <span class="trait-chip">${genderMark(genderCode,true)}</span>
      </div>
      <div class="case-actions">
        ${["NOM","AC","XEN","DAT","ABL"].map(k => `<button class="${k===c?"active":""}" data-agreement-case="${k}">${k}</button>`).join("")}
      </div>
    </div>
  `;
  document.querySelectorAll("[data-agreement-case]").forEach(button => button.onclick = () => {
    state.agreementCase = button.dataset.agreementCase;
    renderAgreement();
  });
}

function renderGreekAgreement(){
  setVisible("agreementView");
  if(state.tab === "Suxeito · atributo"){
    const example = greekPredicateExamples[state.predicate % greekPredicateExamples.length];
    const marked = example.sentence.replace(example.subject,`<span class="syntax-subject">${example.subject}</span>`).replace(example.attribute,`<span class="syntax-attribute">${example.attribute}</span>`);
    $("#title").textContent = "Concordancia entre suxeito e atributo";
    $("#lede").textContent = "O atributo refírese ao suxeito e comparte con el caso, número e, cando corresponde, xénero.";
    $("#conceptFact").textContent = "Suxeito · atributo";
    $("#focusFact").textContent = example.traits;
    $("#signalFact").textContent = "A concordancia permanece aínda que a cópula estea elidida.";
    $("#agreementView").innerHTML = `<div class="predicate-lab greek-predicate"><div class="predicate-picker"><label>Exemplo <select id="predicateSelect">${greekPredicateExamples.map((item,index) => `<option value="${index}" ${index===state.predicate%greekPredicateExamples.length?"selected":""}>${index+1}. ${item.sentence}</option>`).join("")}</select></label></div><div class="predicate-sentence">${marked}</div><div class="syntax-legend"><span><i class="subject-dot"></i>Suxeito</span><span><i class="attribute-dot"></i>Atributo</span><strong>${example.traits}</strong></div><div class="predicate-actions"><button data-predicate-step="-1">← Anterior</button><button data-predicate-step="1">Seguinte →</button></div></div>`;
    $("#predicateSelect").onchange = event => { state.predicate=Number(event.target.value); renderGreekAgreement(); };
    document.querySelectorAll("[data-predicate-step]").forEach(button => button.onclick = () => { state.predicate=(state.predicate+Number(button.dataset.predicateStep)+greekPredicateExamples.length)%greekPredicateExamples.length; renderGreekAgreement(); });
    return;
  }
  if(state.tab === "Xénero"){
    $("#title").textContent = "Unha relación, tres xéneros";
    $("#lede").textContent = "O adxectivo adopta a forma que corresponde ao xénero do substantivo.";
    $("#conceptFact").textContent = "Concordancia"; $("#focusFact").textContent = "Contraste de xénero"; $("#signalFact").textContent = "σοφός · σοφή · σοφόν expresan o mesmo trazo con formas distintas.";
    $("#agreementView").innerHTML = `<div class="gender-contrast greek-contrast"><article class="contrast-item masculine">${genderMark("M",true)}<div>σοφὸς <strong>ἄνθρωπος</strong></div></article><article class="contrast-item feminine">${genderMark("F",true)}<div>σοφὴ <strong>ψυχή</strong></div></article><article class="contrast-item neuter">${genderMark("N",true)}<div>σοφὸν <strong>ζῷον</strong></div></article></div>`;
    return;
  }
  if(state.tab === "Número"){
    const pairs=[["ὁ ἄνθρωπος","οἱ ἄνθρωποι","♂"],["ὁ θεός","οἱ θεοί","♂"],["ὁ πολίτης","οἱ πολῖται","♂"],["ἡ ψυχή","αἱ ψυχαί","♀"],["ἡ πολιτεία","αἱ πολιτεῖαι","♀"],["τὸ ζῷον","τὰ ζῷα","⚲"]];
    $("#title").textContent="O número transforma o sintagma"; $("#lede").textContent="Artigo, substantivo e adxectivo responden xuntos ao cambio de número."; $("#conceptFact").textContent="Número"; $("#focusFact").textContent="Singular ↔ plural"; $("#signalFact").textContent="No neutro, nominativo e acusativo plural rematan en -α.";
    $("#agreementView").innerHTML=`<div class="number-pairs">${pairs.map(([singular,plural,symbol])=>`<article><span>${singular}</span><b>→</b><span>${plural}</span><small>${symbol}</small></article>`).join("")}</div>`;
    return;
  }
  if(state.tab === "Neutro"){
    $("#title").textContent="O neutro ten un comportamento propio"; $("#lede").textContent="No neutro coinciden nominativo e acusativo; o plural en -α pode levar o verbo en singular."; $("#conceptFact").textContent="Neutro"; $("#focusFact").textContent="τὸ δίκαιον · τὰ δίκαια"; $("#signalFact").textContent="τὰ ζῷα ψυχὴν ἔχει: o suxeito neutro plural aparece con ἔχει en singular.";
    $("#agreementView").innerHTML=`<div class="neuter-lab"><article><span>Un concepto</span><strong>τὸ δίκαιον</strong><small>o xusto</small></article><article><span>Realidades concretas</span><strong>τὰ δίκαια</strong><small>as cousas xustas</small></article><div class="neuter-sentence">τὰ ζῷα <mark>ψυχὴν</mark> <b>ἔχει</b><small>suxeito neutro plural · verbo singular</small></div></div>`;
    return;
  }
  const example=greekAgreementExamples[state.agreement] || greekAgreementExamples[0];
  $("#title").textContent="As palabras concordan en trazos"; $("#lede").textContent="Cambia o caso e observa como substantivo e adxectivo responden xuntos."; $("#conceptFact").textContent="Concordancia nominal"; $("#focusFact").textContent=`${greekGrammar.caseNames[state.case]} · ${example.traits}`; $("#signalFact").textContent="Concordar significa compartir caso, número e xénero, non acabar necesariamente igual.";
  const words=example.words[state.case]; const endings=example.endings[state.case];
  $("#agreementView").innerHTML=`<div class="agreement-stage ${genderInfo[example.gender].className}"><div class="phrase">${words.map((word,index)=>`<div class="token"><div class="latin-word">${endingMarkup(word,endings[index])}</div><div class="meta"><span>${example.meta[index]}</span></div></div>`).join("")}</div><div class="trait-band"><span class="trait-chip">${state.case} · ${example.traits}</span></div><div class="case-actions">${greekGrammar.cases.map(grammaticalCase=>`<button class="${grammaticalCase===state.case?"active":""}" data-greek-agreement-case="${grammaticalCase}">${grammaticalCase}</button>`).join("")}</div></div>`;
  document.querySelectorAll("[data-greek-agreement-case]").forEach(button=>button.onclick=()=>{state.case=button.dataset.greekAgreementCase;renderGreekAgreement();});
}

function renderAmbiguity(){
  setVisible("ambiguityView");
  const contexts = {
    bare:{line:"puellae",hint:"sen contexto",active:["XEN SG","DAT SG","NOM PL","VOC PL"]},
    liber:{line:"liber puellae",hint:"un nome pide complemento",active:["XEN SG"]},
    veniunt:{line:"puellae veniunt",hint:"o verbo plural desambigua",active:["NOM PL"]},
    dono:{line:"poeta puellae rosam dat",hint:"dar activa un destinatario",active:["DAT SG"]}
  };
  const current = contexts[state.ambiguity];
  $("#title").textContent = "A forma non sempre abonda";
  $("#lede").textContent = "A análise aparece ao engadir sintaxe: algunhas posibilidades quedan vivas e outras apáganse.";
  $("#conceptFact").textContent = "Desambiguación";
  $("#focusFact").textContent = current.hint;
  $("#signalFact").textContent = "A morfoloxía abre posibilidades; a sintaxe selecciona.";
  const all = ["XEN SG","DAT SG","NOM PL","VOC PL"];
  $("#ambiguityView").innerHTML = `
    <div class="ambiguity">
      <div class="big-form">puellae</div>
      <div class="possibilities">
        ${all.map(item => `<div class="possibility ${current.active.includes(item)?"":"off"}"><div><strong>${item}</strong><span>${current.active.includes(item)?"posible":"descartado"}</span></div></div>`).join("")}
      </div>
      <div class="context-line"><div>${current.line}<small>${current.hint}</small></div></div>
      <div class="case-actions">
        <button class="${state.ambiguity==="bare"?"active":""}" data-ambiguity="bare">Que sabemos?</button>
        <button class="${state.ambiguity==="liber"?"active":""}" data-ambiguity="liber">liber puellae</button>
        <button class="${state.ambiguity==="veniunt"?"active":""}" data-ambiguity="veniunt">puellae veniunt</button>
        <button class="${state.ambiguity==="dono"?"active":""}" data-ambiguity="dono">dat</button>
      </div>
    </div>
  `;
  document.querySelectorAll("[data-ambiguity]").forEach(button => button.onclick = () => {
    state.ambiguity = button.dataset.ambiguity;
    renderAmbiguity();
  });
}

function renderPlaceholder(){
  setVisible("placeholderView");
  const examples = courseExamples[state.section]?.[state.tab] || [];
  const labels = {
    nominative:"Sintaxe do nominativo",vocative:"Sintaxe do vocativo",accusative:"Sintaxe do acusativo",
    genitive:"Sintaxe do xenitivo",dative:"Sintaxe do dativo",ablative:"Sintaxe do ablativo",
    prepositions:"Espazo e rexencia",verbs:"Verbos do curso",connectors:"Relacións entre ideas",questions:"Interrogativas"
  };
  $("#title").textContent = labels[state.section] || sectionConfig[state.section].crumb.split(" · ").pop();
  $("#lede").textContent = examples.length ? "As formas aparecen dentro do mesmo universo narrativo e léxico dos textos do curso." : "Esta sección queda preparada para incorporar exemplos da secuencia didáctica.";
  $("#conceptFact").textContent = sectionConfig[state.section].crumb.split(" · ").pop();
  $("#focusFact").textContent = state.tab;
  $("#signalFact").textContent = examples.length ? "A estrutura gramatical mantense ligada a referentes coñecidos." : "O patrón admite novas escenas sen alterar a navegación.";
  $("#placeholderView").innerHTML = examples.length ? `
    <div class="example-browser">
      ${examples.map(([latin,note]) => `<article class="course-example"><div class="example-latin">${latin}</div><div class="example-note">${note}</div></article>`).join("")}
    </div>
  ` : `<div class="agreement-stage"><p class="lede">Contido en preparación.</p></div>`;
}

function render(){
  const config = currentConfig();
  renderSubnav();
  renderModeControls();
  if(config.kind === "nominal") renderNominal();
  if(config.kind === "statements") renderStatements();
  if(config.kind === "agreement") renderAgreement();
  if(config.kind === "adjectives") renderAdjectives();
  if(config.kind === "pronouns") renderPronouns();
  if(config.kind === "placeholder") renderPlaceholder();
}

document.querySelectorAll(".navitem").forEach(button => {
  button.onclick = () => {
    document.querySelectorAll(".navitem").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    state.section = button.dataset.section;
    state.tab = sectionConfig[state.section].tabs[0];
    if(state.section === "nominal") state.mode = "case";
    if(state.section === "agreement") state.agreement = state.language === "greek" ? 0 : agreementExamples.findIndex(example => example.id === "fluvius-magnus");
    render();
  };
});

function setLanguage(language){
  state.language = language;
  document.documentElement.lang = language === "greek" ? "grc" : "gl";
  document.body.classList.toggle("greek-mode",language === "greek");
  document.querySelectorAll("[data-language]").forEach(button => button.classList.toggle("active",button.dataset.language === language));
  document.querySelectorAll(".navitem").forEach(item => item.hidden = language === "greek" && !item.hasAttribute("data-greek"));
  document.querySelectorAll(".navgroup").forEach(group => group.hidden = !group.querySelector(".navitem:not([hidden])"));
  if(language === "greek" && !greekSectionConfig[state.section]) state.section = "nominal";
  state.tab = currentConfig().tabs[0] || "";
  state.mode = "case";
  state.case = language === "greek" ? "AC" : state.case;
  state.agreement = 0;
  state.predicate = 0;
  document.querySelectorAll(".navitem").forEach(item => item.classList.toggle("active",item.dataset.section === state.section));
  render();
}

document.querySelectorAll("[data-language]").forEach(button => button.onclick = () => setLanguage(button.dataset.language));

const classroomToggle = $("#classroomToggle");
function setClassroomMode(active){
  document.body.classList.toggle("classroom",active);
  classroomToggle.setAttribute("aria-pressed",String(active));
  classroomToggle.innerHTML = active
    ? '<span aria-hidden="true">×</span><span>Saír do modo aula</span>'
    : '<span aria-hidden="true">⛶</span><span>Modo aula</span>';
}
classroomToggle.onclick = async () => {
  const entering = !document.body.classList.contains("classroom");
  setClassroomMode(entering);
  if(entering && !document.fullscreenElement){
    try{ await document.documentElement.requestFullscreen(); }catch(error){}
  } else if(!entering && document.fullscreenElement){
    await document.exitFullscreen();
  }
};
document.addEventListener("fullscreenchange",() => {
  if(!document.fullscreenElement && document.body.classList.contains("classroom")) setClassroomMode(false);
});

document.addEventListener("keydown", event => {
  const activeCases = state.language === "greek" ? greekGrammar.cases : cases;
  if(event.key === "ArrowDown" || event.key === "ArrowRight"){
    const index = activeCases.indexOf(state.case);
    state.case = activeCases[(index + 1) % activeCases.length];
    render();
  }
  if(event.key === "ArrowUp" || event.key === "ArrowLeft"){
    const index = activeCases.indexOf(state.case);
    state.case = activeCases[(index - 1 + activeCases.length) % activeCases.length];
    render();
  }
});

render();
