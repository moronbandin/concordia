const cases = ["NOM","VOC","AC","XEN","DAT","ABL"];
const caseNames = {NOM:"nominativo",VOC:"vocativo",AC:"acusativo",XEN:"xenitivo",DAT:"dativo",ABL:"ablativo"};
const numberNames = {sg:"singular",pl:"plural"};
const declensions = [
  {
    id:"1", name:"1.ª", genders:["F","M"], examples:[["puella","F"],["poeta","M"]],
    sg:{NOM:"puella",VOC:"puella",AC:"puellam",XEN:"puellae",DAT:"puellae",ABL:"puella"},
    pl:{NOM:"puellae",VOC:"puellae",AC:"puellas",XEN:"puellarum",DAT:"puellis",ABL:"puellis"},
    endings:{sg:{NOM:"-a",VOC:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},pl:{NOM:"-ae",VOC:"-ae",AC:"-as",XEN:"-arum",DAT:"-is",ABL:"-is"}}
  },
  {
    id:"2", name:"2.ª", genders:["M","N"], examples:[["dominus","M"],["templum","N"]],
    sg:{NOM:"dominus",VOC:"domine",AC:"dominum",XEN:"domini",DAT:"domino",ABL:"domino"},
    pl:{NOM:"domini",VOC:"domini",AC:"dominos",XEN:"dominorum",DAT:"dominis",ABL:"dominis"},
    endings:{sg:{NOM:"-us",VOC:"-e",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-i",VOC:"-i",AC:"-os",XEN:"-orum",DAT:"-is",ABL:"-is"}}
  },
  {
    id:"3", name:"3.ª", genders:["M","F","N"], examples:[["mercator","M"],["civis","F"],["corpus","N"]],
    sg:{NOM:"mercator",VOC:"mercator",AC:"mercatorem",XEN:"mercatoris",DAT:"mercatori",ABL:"mercatore"},
    pl:{NOM:"mercatores",VOC:"mercatores",AC:"mercatores",XEN:"mercatorum",DAT:"mercatoribus",ABL:"mercatoribus"},
    endings:{sg:{NOM:"variable",VOC:"variable",AC:"-em",XEN:"-is",DAT:"-i",ABL:"-e"},pl:{NOM:"-es",VOC:"-es",AC:"-es",XEN:"-um",DAT:"-ibus",ABL:"-ibus"}}
  },
  {
    id:"4", name:"4.ª", genders:["M","F","N"], examples:[["manus","F"],["exercitus","M"],["cornu","N"]],
    sg:{NOM:"manus",VOC:"manus",AC:"manum",XEN:"manus",DAT:"manui",ABL:"manu"},
    pl:{NOM:"manus",VOC:"manus",AC:"manus",XEN:"manuum",DAT:"manibus",ABL:"manibus"},
    endings:{sg:{NOM:"-us",VOC:"-us",AC:"-um",XEN:"-us",DAT:"-ui",ABL:"-u"},pl:{NOM:"-us",VOC:"-us",AC:"-us",XEN:"-uum",DAT:"-ibus",ABL:"-ibus"}}
  },
  {
    id:"5", name:"5.ª", genders:["F"], examples:[["res","F"]],
    sg:{NOM:"res",VOC:"res",AC:"rem",XEN:"rei",DAT:"rei",ABL:"re"},
    pl:{NOM:"res",VOC:"res",AC:"res",XEN:"rerum",DAT:"rebus",ABL:"rebus"},
    endings:{sg:{NOM:"-es",VOC:"-es",AC:"-em",XEN:"-ei",DAT:"-ei",ABL:"-e"},pl:{NOM:"-es",VOC:"-es",AC:"-es",XEN:"-erum",DAT:"-ebus",ABL:"-ebus"}}
  }
];

const nominalVariants = {
  "1": [
    {id:"insula",label:"insula",word:"insula",gender:"F",note:"insula / insulae",sg:{NOM:"insula",VOC:"insula",AC:"insulam",XEN:"insulae",DAT:"insulae",ABL:"insula"},pl:{NOM:"insulae",VOC:"insulae",AC:"insulas",XEN:"insularum",DAT:"insulis",ABL:"insulis"},endings:{sg:{NOM:"-a",VOC:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},pl:{NOM:"-ae",VOC:"-ae",AC:"-as",XEN:"-arum",DAT:"-is",ABL:"-is"}}},
    {id:"puella",label:"puella",word:"puella",gender:"F",note:"puella / puellae",sg:{NOM:"puella",VOC:"puella",AC:"puellam",XEN:"puellae",DAT:"puellae",ABL:"puella"},pl:{NOM:"puellae",VOC:"puellae",AC:"puellas",XEN:"puellarum",DAT:"puellis",ABL:"puellis"},endings:{sg:{NOM:"-a",VOC:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},pl:{NOM:"-ae",VOC:"-ae",AC:"-as",XEN:"-arum",DAT:"-is",ABL:"-is"}}},
    {id:"poeta",label:"poeta ♂",word:"poeta",gender:"M",note:"1.ª declinación, masculino",sg:{NOM:"poeta",VOC:"poeta",AC:"poetam",XEN:"poetae",DAT:"poetae",ABL:"poeta"},pl:{NOM:"poetae",VOC:"poetae",AC:"poetas",XEN:"poetarum",DAT:"poetis",ABL:"poetis"},endings:{sg:{NOM:"-a",VOC:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},pl:{NOM:"-ae",VOC:"-ae",AC:"-as",XEN:"-arum",DAT:"-is",ABL:"-is"}}}
  ],
  "2": [
    {id:"dominus",label:"-us",word:"dominus",gender:"M",note:"dominus / domini",sg:{NOM:"dominus",VOC:"domine",AC:"dominum",XEN:"domini",DAT:"domino",ABL:"domino"},pl:{NOM:"domini",VOC:"domini",AC:"dominos",XEN:"dominorum",DAT:"dominis",ABL:"dominis"},endings:{sg:{NOM:"-us",VOC:"-e",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-i",VOC:"-i",AC:"-os",XEN:"-orum",DAT:"-is",ABL:"-is"}}},
    {id:"puer",label:"puer",word:"puer",gender:"M",note:"-er non apocopado",sg:{NOM:"puer",VOC:"puer",AC:"puerum",XEN:"pueri",DAT:"puero",ABL:"puero"},pl:{NOM:"pueri",VOC:"pueri",AC:"pueros",XEN:"puerorum",DAT:"pueris",ABL:"pueris"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-i",VOC:"-i",AC:"-os",XEN:"-orum",DAT:"-is",ABL:"-is"}}},
    {id:"ager",label:"ager",word:"ager",gender:"M",note:"-er apocopado: agr-",sg:{NOM:"ager",VOC:"ager",AC:"agrum",XEN:"agri",DAT:"agro",ABL:"agro"},pl:{NOM:"agri",VOC:"agri",AC:"agros",XEN:"agrorum",DAT:"agris",ABL:"agris"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-i",VOC:"-i",AC:"-os",XEN:"-orum",DAT:"-is",ABL:"-is"}}},
    {id:"vir",label:"vir",word:"vir",gender:"M",note:"modelo en -ir",sg:{NOM:"vir",VOC:"vir",AC:"virum",XEN:"viri",DAT:"viro",ABL:"viro"},pl:{NOM:"viri",VOC:"viri",AC:"viros",XEN:"virorum",DAT:"viris",ABL:"viris"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-i",VOC:"-i",AC:"-os",XEN:"-orum",DAT:"-is",ABL:"-is"}}},
    {id:"templum",label:"neutro",word:"templum",gender:"N",note:"templum / templi",sg:{NOM:"templum",VOC:"templum",AC:"templum",XEN:"templi",DAT:"templo",ABL:"templo"},pl:{NOM:"templa",VOC:"templa",AC:"templa",XEN:"templorum",DAT:"templis",ABL:"templis"},endings:{sg:{NOM:"-um",VOC:"-um",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},pl:{NOM:"-a",VOC:"-a",AC:"-a",XEN:"-orum",DAT:"-is",ABL:"-is"}}}
  ],
  "3": [
    {id:"mercator",label:"M/F imp.",word:"mercator",gender:"M",note:"imparisílabo: mercator / mercatoris",sg:{NOM:"mercator",VOC:"mercator",AC:"mercatorem",XEN:"mercatoris",DAT:"mercatori",ABL:"mercatore"},pl:{NOM:"mercatores",VOC:"mercatores",AC:"mercatores",XEN:"mercatorum",DAT:"mercatoribus",ABL:"mercatoribus"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"-em",XEN:"-is",DAT:"-i",ABL:"-e"},pl:{NOM:"-es",VOC:"-es",AC:"-es",XEN:"-um",DAT:"-ibus",ABL:"-ibus"}}},
    {id:"civis",label:"M/F par.",word:"civis",gender:"M/F",note:"parisílabo",sg:{NOM:"civis",VOC:"civis",AC:"civem",XEN:"civis",DAT:"civi",ABL:"cive"},pl:{NOM:"cives",VOC:"cives",AC:"cives",XEN:"civium",DAT:"civibus",ABL:"civibus"},endings:{sg:{NOM:"-is",VOC:"-is",AC:"-em",XEN:"-is",DAT:"-i",ABL:"-e"},pl:{NOM:"-es",VOC:"-es",AC:"-es",XEN:"-ium",DAT:"-ibus",ABL:"-ibus"}}},
    {id:"corpus",label:"N imp.",word:"corpus",gender:"N",note:"neutro imparisílabo",sg:{NOM:"corpus",VOC:"corpus",AC:"corpus",XEN:"corporis",DAT:"corpori",ABL:"corpore"},pl:{NOM:"corpora",VOC:"corpora",AC:"corpora",XEN:"corporum",DAT:"corporibus",ABL:"corporibus"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"variable",XEN:"-is",DAT:"-i",ABL:"-e"},pl:{NOM:"-a",VOC:"-a",AC:"-a",XEN:"-um",DAT:"-ibus",ABL:"-ibus"}}},
    {id:"mare",label:"N par.",word:"mare",gender:"N",note:"neutro parisílabo",sg:{NOM:"mare",VOC:"mare",AC:"mare",XEN:"maris",DAT:"mari",ABL:"mari"},pl:{NOM:"maria",VOC:"maria",AC:"maria",XEN:"marium",DAT:"maribus",ABL:"maribus"},endings:{sg:{NOM:"-e",VOC:"-e",AC:"-e",XEN:"-is",DAT:"-i",ABL:"-i"},pl:{NOM:"-ia",VOC:"-ia",AC:"-ia",XEN:"-ium",DAT:"-ibus",ABL:"-ibus"}}}
  ]
};

const agreementExamples = [
  {id:"fluvius-magnus",label:"fluvius magnus",words:{NOM:["fluvius","magnus"],AC:["fluvium","magnum"],XEN:["fluvii","magni"],DAT:["fluvio","magno"],ABL:["fluvio","magno"]},endings:{NOM:["-us","-us"],AC:["-um","-um"],XEN:["-i","-i"],DAT:["-o","-o"],ABL:["-o","-o"]},meta:["2.ª declinación, masculino","adxectivo 2-1-2, masculino"],traits:"SG · M"},
  {id:"insula-graeca",label:"insula Graeca",words:{NOM:["insula","Graeca"],AC:["insulam","Graecam"],XEN:["insulae","Graecae"],DAT:["insulae","Graecae"],ABL:["insula","Graeca"]},endings:{NOM:["-a","-a"],AC:["-am","-am"],XEN:["-ae","-ae"],DAT:["-ae","-ae"],ABL:["-a","-a"]},meta:["1.ª declinación, feminino","adxectivo 2-1-2, feminino"],traits:"SG · F"},
  {id:"oppidum-magnum",label:"oppidum magnum",words:{NOM:["oppidum","magnum"],AC:["oppidum","magnum"],XEN:["oppidi","magni"],DAT:["oppido","magno"],ABL:["oppido","magno"]},endings:{NOM:["-um","-um"],AC:["-um","-um"],XEN:["-i","-i"],DAT:["-o","-o"],ABL:["-o","-o"]},meta:["2.ª declinación, neutro","adxectivo 2-1-2, neutro"],traits:"SG · N"},
  {id:"poeta-bonus",label:"poeta bonus",words:{NOM:["poeta","bonus"],AC:["poetam","bonum"],XEN:["poetae","boni"],DAT:["poetae","bono"],ABL:["poeta","bono"]},endings:{NOM:["-a","-us"],AC:["-am","-um"],XEN:["-ae","-i"],DAT:["-ae","-o"],ABL:["-a","-o"]},meta:["1.ª declinación, masculino","adxectivo 2-1-2, masculino"],traits:"SG · M"},
  {id:"hortus-pulcher",label:"hortus pulcher",words:{NOM:["hortus","pulcher"],AC:["hortum","pulchrum"],XEN:["horti","pulchri"],DAT:["horto","pulchro"],ABL:["horto","pulchro"]},endings:{NOM:["-us","variable"],AC:["-um","-um"],XEN:["-i","-i"],DAT:["-o","-o"],ABL:["-o","-o"]},meta:["2.ª declinación, masculino","adxectivo 2-1-2 en -er"],traits:"SG · M"},
  {id:"fiscus-plenus",label:"fiscus plenus",words:{NOM:["fiscus","plenus"],AC:["fiscum","plenum"],XEN:["fisci","pleni"],DAT:["fisco","pleno"],ABL:["fisco","pleno"]},endings:{NOM:["-us","-us"],AC:["-um","-um"],XEN:["-i","-i"],DAT:["-o","-o"],ABL:["-o","-o"]},meta:["2.ª declinación, masculino","adxectivo 2-1-2, masculino"],traits:"SG · M"}
];

function build212(id,label,stem,masculine,feminine,neuter){
  return {
    id,label,enunciation:`${masculine}, ${feminine}, ${neuter}`,
    M:{sg:{NOM:masculine,VOC:masculine.endsWith("us")?stem+"e":masculine,AC:stem+"um",XEN:stem+"i",DAT:stem+"o",ABL:stem+"o"},pl:{NOM:stem+"i",VOC:stem+"i",AC:stem+"os",XEN:stem+"orum",DAT:stem+"is",ABL:stem+"is"}},
    F:{sg:{NOM:feminine,VOC:feminine,AC:stem+"am",XEN:stem+"ae",DAT:stem+"ae",ABL:stem+"a"},pl:{NOM:stem+"ae",VOC:stem+"ae",AC:stem+"as",XEN:stem+"arum",DAT:stem+"is",ABL:stem+"is"}},
    N:{sg:{NOM:neuter,VOC:neuter,AC:neuter,XEN:stem+"i",DAT:stem+"o",ABL:stem+"o"},pl:{NOM:stem+"a",VOC:stem+"a",AC:stem+"a",XEN:stem+"orum",DAT:stem+"is",ABL:stem+"is"}}
  };
}

const adjectiveFamilies = {
  us:[
    build212("bonus","bo","bon","bonus","bona","bonum"),
    build212("clarus","claro","clar","clarus","clara","clarum"),
    build212("magnus","grande","magn","magnus","magna","magnum"),
    build212("parvus","pequeno","parv","parvus","parva","parvum"),
    build212("graecus","grego","Graec","Graecus","Graeca","Graecum"),
    build212("romanus","romano","Roman","Romanus","Romana","Romanum"),
    build212("pompeianus","pompeiano","Pompeian","Pompeianus","Pompeiana","Pompeianum"),
    build212("malus","malo","mal","malus","mala","malum"),
    build212("vacuus","baleiro","vacu","vacuus","vacua","vacuum"),
    build212("plenus","cheo","plen","plenus","plena","plenum")
  ],
  er:[
    build212("pulcher","fermoso","pulchr","pulcher","pulchra","pulchrum"),
    build212("liber","libre","liber","liber","libera","liberum")
  ]
};

function addAgreement(id,label,noun,nounEndings,adjectiveId,gender,nounMeta){
  const adjective = [...adjectiveFamilies.us,...adjectiveFamilies.er].find(item => item.id === adjectiveId);
  const adjectiveEndings = gender === "F"
    ? {NOM:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"}
    : gender === "N"
      ? {NOM:"-um",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"}
      : {NOM:adjective.M.sg.NOM.endsWith("us")?"-us":"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"};
  const words = {}; const endings = {};
  ["NOM","AC","XEN","DAT","ABL"].forEach(c => {
    words[c] = [noun[c],adjective[gender].sg[c]];
    endings[c] = [nounEndings[c],adjectiveEndings[c]];
  });
  agreementExamples.push({id,label,words,endings,meta:[nounMeta,`adxectivo 2-1-2, ${gender === "M"?"masculino":gender === "F"?"feminino":"neutro"}`],traits:`SG · ${gender}`});
}

addAgreement("fluvius-parvus","fluvius parvus",{NOM:"fluvius",AC:"fluvium",XEN:"fluvii",DAT:"fluvio",ABL:"fluvio"},{NOM:"-us",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"parvus","M","2.ª declinación, masculino");
addAgreement("insula-romana","insula Romana",{NOM:"insula",AC:"insulam",XEN:"insulae",DAT:"insulae",ABL:"insula"},{NOM:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},"romanus","F","1.ª declinación, feminino");
addAgreement("oppidum-parvum","oppidum parvum",{NOM:"oppidum",AC:"oppidum",XEN:"oppidi",DAT:"oppido",ABL:"oppido"},{NOM:"-um",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"parvus","N","2.ª declinación, neutro");
addAgreement("villa-magna","villa magna",{NOM:"villa",AC:"villam",XEN:"villae",DAT:"villae",ABL:"villa"},{NOM:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},"magnus","F","1.ª declinación, feminino");
addAgreement("puella-parva","puella parva",{NOM:"puella",AC:"puellam",XEN:"puellae",DAT:"puellae",ABL:"puella"},{NOM:"-a",AC:"-am",XEN:"-ae",DAT:"-ae",ABL:"-a"},"parvus","F","1.ª declinación, feminino");
addAgreement("vir-graecus","vir Graecus",{NOM:"vir",AC:"virum",XEN:"viri",DAT:"viro",ABL:"viro"},{NOM:"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"graecus","M","2.ª declinación en -ir");
addAgreement("puer-pompeianus","puer Pompeianus",{NOM:"puer",AC:"puerum",XEN:"pueri",DAT:"puero",ABL:"puero"},{NOM:"variable",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"pompeianus","M","2.ª declinación en -er");
addAgreement("mercator-bonus","mercator bonus",{NOM:"mercator",AC:"mercatorem",XEN:"mercatoris",DAT:"mercatori",ABL:"mercatore"},{NOM:"variable",AC:"-em",XEN:"-is",DAT:"-i",ABL:"-e"},"bonus","M","3.ª declinación, masculino");
addAgreement("servus-malus","servus malus",{NOM:"servus",AC:"servum",XEN:"servi",DAT:"servo",ABL:"servo"},{NOM:"-us",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"malus","M","2.ª declinación, masculino");
addAgreement("equus-pulcher","equus pulcher",{NOM:"equus",AC:"equum",XEN:"equi",DAT:"equo",ABL:"equo"},{NOM:"-us",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"pulcher","M","2.ª declinación, masculino");
addAgreement("fiscus-vacuus","fiscus vacuus",{NOM:"fiscus",AC:"fiscum",XEN:"fisci",DAT:"fisco",ABL:"fisco"},{NOM:"-us",AC:"-um",XEN:"-i",DAT:"-o",ABL:"-o"},"vacuus","M","2.ª declinación, masculino");

const pronounCases = ["NOM","AC","XEN","DAT","ABL"];
const pronounParadigms = [
  {id:"is",label:"is · ea · id",kind:"anafórico",model:"O composto idem, eadem, idem conserva este paradigma co elemento -dem.",sg:{NOM:["is","ea","id"],AC:["eum","eam","id"],XEN:["eius","eius","eius"],DAT:["ei","ei","ei"],ABL:["eo","ea","eo"]},pl:{NOM:["ei","eae","ea"],AC:["eos","eas","ea"],XEN:["eorum","earum","eorum"],DAT:["eis","eis","eis"],ABL:["eis","eis","eis"]}},
  {id:"iste",label:"iste · ista · istud",kind:"demostrativo",model:"Segue as terminacións pronominais en -ius no xenitivo singular e -i no dativo singular.",sg:{NOM:["iste","ista","istud"],AC:["istum","istam","istud"],XEN:["istius","istius","istius"],DAT:["isti","isti","isti"],ABL:["isto","ista","isto"]},pl:{NOM:["isti","istae","ista"],AC:["istos","istas","ista"],XEN:["istorum","istarum","istorum"],DAT:["istis","istis","istis"],ABL:["istis","istis","istis"]}},
  {id:"ille",label:"ille · illa · illud",kind:"demostrativo",model:"Ipse, ipsa, ipsum e alius, alia, aliud comparten o patrón pronominal de xenitivo en -ius e dativo en -i.",sg:{NOM:["ille","illa","illud"],AC:["illum","illam","illud"],XEN:["illius","illius","illius"],DAT:["illi","illi","illi"],ABL:["illo","illa","illo"]},pl:{NOM:["illi","illae","illa"],AC:["illos","illas","illa"],XEN:["illorum","illarum","illorum"],DAT:["illis","illis","illis"],ABL:["illis","illis","illis"]}},
  {id:"hic",label:"hic · haec · hoc",kind:"demostrativo",model:"É un paradigma propio: hai que recoñecer especialmente huius, huic, hunc, hanc e hoc.",sg:{NOM:["hic","haec","hoc"],AC:["hunc","hanc","hoc"],XEN:["huius","huius","huius"],DAT:["huic","huic","huic"],ABL:["hoc","hac","hoc"]},pl:{NOM:["hi","hae","haec"],AC:["hos","has","haec"],XEN:["horum","harum","horum"],DAT:["his","his","his"],ABL:["his","his","his"]}},
  {id:"qui",label:"qui · quae · quod",kind:"relativo",model:"O interrogativo quis, quid comparte boa parte deste paradigma, con formas como cuius, cui e quo.",sg:{NOM:["qui","quae","quod"],AC:["quem","quam","quod"],XEN:["cuius","cuius","cuius"],DAT:["cui","cui","cui"],ABL:["quo","qua","quo"]},pl:{NOM:["qui","quae","quae"],AC:["quos","quas","quae"],XEN:["quorum","quarum","quorum"],DAT:["quibus","quibus","quibus"],ABL:["quibus","quibus","quibus"]}}
];

const personalPronouns = {
  ego:{label:"ego · nos",sg:{NOM:"ego",VOC:"—",AC:"me",XEN:"mei",DAT:"mihi",ABL:"me"},pl:{NOM:"nos",VOC:"—",AC:"nos",XEN:"nostri / nostrum",DAT:"nobis",ABL:"nobis"}},
  tu:{label:"tu · vos",sg:{NOM:"tu",VOC:"tu",AC:"te",XEN:"tui",DAT:"tibi",ABL:"te"},pl:{NOM:"vos",VOC:"vos",AC:"vos",XEN:"vestri / vestrum",DAT:"vobis",ABL:"vobis"}}
};

const predicateExamples = [
  {sentence:"Nilus fluvius est.",subject:"Nilus",attribute:"fluvius",traits:"NOM · SG · ♂"},
  {sentence:"Danubius et Rhenus quoque fluvii sunt.",subject:"Danubius et Rhenus",attribute:"fluvii",traits:"NOM · PL · ♂"},
  {sentence:"Rubico non est fluvius magnus; Rubico est fluvius parvus.",subject:"Rubico",attribute:"fluvius parvus",traits:"NOM · SG · ♂"},
  {sentence:"Sicilia insula est.",subject:"Sicilia",attribute:"insula",traits:"NOM · SG · ♀"},
  {sentence:"Corsica et Sardinia et Britania insulae sunt.",subject:"Corsica et Sardinia et Britania",attribute:"insulae",traits:"NOM · PL · ♀"},
  {sentence:"Insulae Graecae multae sunt.",subject:"Insulae Graecae",attribute:"multae",traits:"NOM · PL · ♀"},
  {sentence:"Pompeii oppidum est.",subject:"Pompeii",attribute:"oppidum",traits:"NOM · SG · ⚲"},
  {sentence:"Bracara et Pompeii oppida sunt.",subject:"Bracara et Pompeii",attribute:"oppida",traits:"NOM · PL · ⚲"},
  {sentence:"Pompeii oppidum magnum est.",subject:"Pompeii",attribute:"oppidum magnum",traits:"NOM · SG · ⚲"},
  {sentence:"Bracara et Lucus et Brigantium oppida parva sunt.",subject:"Bracara et Lucus et Brigantium",attribute:"oppida parva",traits:"NOM · PL · ⚲"},
  {sentence:"Imperium Romanum magnum est.",subject:"Imperium Romanum",attribute:"magnum",traits:"NOM · SG · ⚲"},
  {sentence:"Nilus non rivus sed fluvius est.",subject:"Nilus",attribute:"fluvius",traits:"NOM · SG · ♂"},
  {sentence:"Oceanus Atlanticus magnus est.",subject:"Oceanus Atlanticus",attribute:"magnus",traits:"NOM · SG · ♂"},
  {sentence:"Creta insula Graeca est, Corsica insula Romana est.",subject:"Creta",attribute:"insula Graeca",traits:"NOM · SG · ♀"},
  {sentence:"Sicilia non insula parva sed insula magna est.",subject:"Sicilia",attribute:"insula magna",traits:"NOM · SG · ♀"},
  {sentence:"Pompeii non oppidum parvum sed oppidum magnum est.",subject:"Pompeii",attribute:"oppidum magnum",traits:"NOM · SG · ⚲"}
];

const sectionConfig = {
  nominal:{crumb:"Formas · Flexión nominal",tabs:["Visión xeral","1.ª","2.ª","3.ª","Por caso","Por xénero"],kind:"nominal"},
  statements:{crumb:"Formas · Enunciados",tabs:["Substantivos","Adxectivos","Pronomes e determinantes","Verbos"],kind:"statements"},
  agreement:{crumb:"Formas · Concordancia",tabs:["Nominal","Suxeito · atributo","Xénero","Número","Caso"],kind:"agreement"},
  adjectives:{crumb:"Formas · Adxectivos",tabs:["Visión xeral","-us · -a · -um","-er · -era · -erum","-is · -e","-ns · -ntis"],kind:"adjectives"},
  nominative:{crumb:"Casos · Nominativo",tabs:["Suxeito","Atributo","Concordancia verbal"],kind:"placeholder"},
  vocative:{crumb:"Casos · Vocativo",tabs:["Apelación","Formas"],kind:"placeholder"},
  accusative:{crumb:"Casos · Acusativo",tabs:["CD","Dirección","Contraste NOM / AC"],kind:"placeholder"},
  genitive:{crumb:"Casos · Xenitivo",tabs:["Posesión","Partitivo","Calidade"],kind:"placeholder"},
  dative:{crumb:"Casos · Dativo",tabs:["CI","Posesión","Interese"],kind:"placeholder"},
  ablative:{crumb:"Casos · Ablativo",tabs:["Instrumento","Lugar","Compañía","Causa"],kind:"placeholder"},
  pronouns:{crumb:"Formas · Flexión pronominal",tabs:["Visión xeral","is · ea · id","iste · ista · istud","ille · illa · illud","hic · haec · hoc","qui · quae · quod","Persoais","Posesivos"],kind:"pronouns"},
  verbs:{crumb:"Formas · Flexión verbal",tabs:["sum","Movemento","Acción transitiva","Fala"],kind:"placeholder"},
  prepositions:{crumb:"Estruturas · Preposicións",tabs:["ubi","quo","unde","cum / per"],kind:"placeholder"},
  connectors:{crumb:"Estruturas · Conectores",tabs:["Coordinación","Contraste","Comparación","Causa","Temporalidade"],kind:"placeholder"},
  questions:{crumb:"Estruturas · Interrogativas",tabs:["Identidade","Lugar","Causa e cantidade","Si / non"],kind:"placeholder"},
  participle:{crumb:"Estruturas · Participio",tabs:["Concertado","Ablativo absoluto","Valor temporal"],kind:"placeholder"},
  aci:{crumb:"Estruturas · Infinitivo / AcI",tabs:["Infinitivo","AcI","Transformación"],kind:"placeholder"},
  relative:{crumb:"Estruturas · Relativo",tabs:["Antecedente","Caso propio","Atracción"],kind:"placeholder"},
  cum:{crumb:"Estruturas · cum",tabs:["Preposición","Temporal","Causal","Concesivo"],kind:"placeholder"},
  ut:{crumb:"Estruturas · ut / ne",tabs:["Final","Completiva","Consecutiva"],kind:"placeholder"}
};

const courseExamples = {
  nominative:{
    Suxeito:[["Nilus est","Nilus realiza a función de suxeito"],["Danubius et Rhenus sunt","suxeito coordinado plural"],["Marcus Quintusque sunt","-que coordina dous núcleos"],["Italia insula non est","Italia é o suxeito"]],
    Atributo:[["Nilus fluvius est","fluvius identifica o suxeito"],["Sicilia insula est","insula concorda con Sicilia"],["Pompeii oppidum est","oppidum é neutro singular"],["Bracara et Pompeii oppida sunt","oppida é neutro plural"]],
    "Concordancia verbal":[["Nilus est","singular → est"],["Danubius et Rhenus sunt","plural → sunt"],["Corsica et Sardinia et Britania insulae sunt","varios núcleos → sunt"]]
  },
  vocative:{
    Apelación:[["Marce!","chamada directa a Marcus"],["Quinte!","chamada directa a Quintus"],["Caecili!","vocativo singular en -i"],["serve!","vocativo singular en -e"],["pueri!","apelación plural"]],
    Formas:[["Marcus → Marce","2.ª declinación en -us"],["Caecilius → Caecili","nomes propios en -ius"],["puer → puer","o vocativo coincide co nominativo"],["servi → servi","no plural coincide co nominativo"]]
  },
  functions:{
    "Con verbo":[["Nilus est","suxeito singular → est"],["Danubius et Rhenus sunt","dous suxeitos → sunt"],["Davus et Grumio sunt","coordinación con et"],["Marcus Quintusque sunt","coordinación con -que"]],
    Atributo:[["Nilus fluvius est","substantivo como atributo"],["Hermogenes mercator est","identidade e oficio"],["Syra ancilla est","atributo feminino"],["Clemens servus est","atributo masculino"],["Caecilius argentarius est","oficio"],["hortus pulcher est","adxectivo como atributo"],["Caecilius laetus est","estado"],["Medus tacitus est","estado"]]
  },
  accusative:{
    CD:[["Ursus pugnam videt","videt abre unha posición para CD"],["Hermogenes Caecilium pulsat","Caecilium recibe a acción"],["Caecilius Graecum vituperat","Graecum está en acusativo"],["Mercator nummos capit","CD plural"],["Medus pecuniam capit","CD feminino"],["Caecilius pecuniam numerat","transitividade visible"]],
    Dirección:[["ad oppidum","cara á cidade"],["ad forum","cara ao foro"],["ad villam","cara á vila"]],
    "Contraste NOM / AC":[["Hermogenes Caecilium pulsat","Hermogenes = NOM · Caecilium = AC"],["Caecilius Graecum vituperat","Caecilius = NOM · Graecum = AC"]]
  },
  genitive:{
    Posesión:[["villa Caecilii","a vila de Caecilius"],["pecunia mercatoris","o diñeiro do mercador"],["cubiculum Marci","o cuarto de Marcus"],["familia Aemiliae","a familia de Aemilia"]],
    Partitivo:[["multi servorum","moitos dos escravos"],["pauci nummorum","poucas das moedas"]],
    Calidade:[["vir magnae virtutis","un home de gran valor"],["fluvius magnae longitudinis","un río de gran lonxitude"]]
  },
  dative:{
    CI:[["poeta puellae rosam dat","puellae é a destinataria"],["Caecilius servo pecuniam dat","servo recibe a pecunia"],["Aemilia Marco respondet","Marco é o destinatario da resposta"]],
    Posesión:[["Caecilio villa est","o latín pode expresar posesión con dativo + sum"],["Marco pecunia est","Marco é o posuidor"]],
    Interese:[["Aemiliae laborat","a acción realízase para Aemilia"],["familiae pecuniam portat","a familia é a beneficiaria"]]
  },
  ablative:{
    Instrumento:[["pecuniam nummis numerat","instrumento co que se realiza a acción"],["stilō scribit","instrumento sen preposición"]],
    Lugar:[["in villa","situación"],["in foro","situación"],["in horto","situación"]],
    Compañía:[["cum Aemilia","compañía singular"],["cum servis","compañía plural"],["cum pueris suis","compañía + posesivo reflexivo"]],
    Causa:[["laetitia clamat","causa expresada en ablativo"],["quia pecuniam non habet","a mesma relación expresada cunha oración"]]
  },
  prepositions:{
    ubi:[["in villa","onde? na vila"],["in foro","onde? no foro"],["in horto","onde? no xardín"]],
    quo:[["ad oppidum","a onde?"],["ad forum","a onde?"],["ad villam","a onde?"]],
    unde:[["a villa","de onde?"],["ab horto","de onde?"],["e villa","de onde?"],["e Graecia","de onde?"],["ex argentaria","de onde?"]],
    "cum / per":[["per hortum","percorrido polo xardín"],["per forum","percorrido polo foro"],["cum Aemilia","compañía"],["cum servis","compañía plural"],["cum pueris suis","compañía + posesivo reflexivo"]]
  },
  pronouns:{
    "is · ea · id":[["Marcus venit; is laetus est","is retoma Marcus"],["Aemilia venit; ea laeta est","ea retoma Aemilia"],["oppidum magnum est; id in Italia est","id retoma oppidum"]],
    Singular:[["is · ea · id","NOM"],["eum · eam · id","AC"],["eo · ea · eo","ABL"]],
    Plural:[["ei · eae · ea","NOM"],["eos · eas · ea","AC"],["eis","DAT / ABL"]],
    Posesivos:[["pater meus · mater mea","xénero do substantivo"],["familia mea · soror mea · frater meus","parentesco"],["maritus meus · villa tua","persoa posuidora"],["cubiculum suum · argentaria sua","posesivo reflexivo"],["pecunia mea","posesión"]]
  },
  verbs:{
    sum:[["Nilus est","3.ª singular"],["Danubius et Rhenus sunt","3.ª plural"],["Marcus Quintusque sunt","-que coordina o suxeito"]],
    Movemento:[["eo · venio · advenio","ir e chegar"],["intro · exeo","entrar e saír"],["ambulo · curro · fugio","desprazamento"],["ad oppidum it quia in foro laborat","dirección + causa"]],
    "Acción transitiva":[["habeo · video · capio","posesión, percepción, toma"],["pulso · vitupero · accuso","acción sobre outra persoa"],["numero · quaero · voco · porto","accións recorrentes"],["specto · laboro · scribo","actividade"]],
    Fala:[["saluto · respondeo · interrogo · clamo","interacción verbal"],["te quaero quia pecuniam non habeo","fala + causa"]]
  },
  connectors:{
    Coordinación:[["Caecilius Aemiliaque","-que únese ao segundo termo"],["Marcus Quintusque","dous suxeitos"],["Davus Ursusque","dous suxeitos"],["rosae liliaque","dous substantivos"],["servi ancillaeque","coordinación mixta"],["et · -que · neque","tres relacións básicas"]],
    Contraste:[["non rivus sed fluvius","corrección do nome"],["non parvum sed magnum","contraste de atributo"],["non in Asia sed in Europa","contraste espacial"],["non pauci sed multi","contraste de cantidade"],["non vacuus sed plenus","contraste de estado"]],
    Comparación:[["tam magnus quam","igualdade"],["non tam magnus quam","desigualdade"]],
    Causa:[["ad oppidum it quia in foro laborat","movemento motivado polo traballo"],["per culinam ambulat quia coquus est","espazo + oficio"],["te quaero quia pecuniam non habeo","acción + causa"]],
    Temporalidade:[["postquam advenit, Caecilium salutat","unha acción sucede despois doutra"],["postquam pecuniam numerat, scribit","secuencia narrativa"]]
  },
  questions:{
    Identidade:[["quis?","quen?"],["quid?","que?"],["quae?","cal? / que cousas?"]],
    Lugar:[["ubi?","onde?"],["quo?","a onde?"],["unde?","de onde?"]],
    "Causa e cantidade":[["cur?","por que?"],["quot?","cantos?"]],
    "Si / non":[["num...?","espera resposta negativa"],["-ne...?","pregunta neutra"]]
  },
  cum:{
    Preposición:[["cum Aemilia","compañía"],["cum servis","compañía plural"],["cum pueris suis","o posesivo concorda con pueris"]],
    Temporal:[["cum advenit, Caecilium salutat","dúas accións relacionadas no tempo"]],
    Causal:[["cum pecuniam non habeat, mercatorem quaerit","a subordinada presenta a causa"]],
    Concesivo:[["cum fessus sit, laborat","un obstáculo que non impide a acción"]]
  }
};
