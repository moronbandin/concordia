const greekGrammar = {
  cases:["NOM","VOC","AC","XEN","DAT"],
  caseNames:{NOM:"nominativo",VOC:"vocativo",AC:"acusativo",XEN:"xenitivo",DAT:"dativo"},
  declensions:[
    {id:"1",name:"1.ª",genders:["F","M"]},
    {id:"2",name:"2.ª",genders:["M","N"]},
    {id:"3",name:"3.ª",genders:["M","F","N"]}
  ],
  variants:{
    "1":[
      {id:"chora",label:"-α",word:"χώρα",gender:"F",article:"ἡ",note:"χώρα, χώρας",sg:{NOM:"χώρα",VOC:"χώρα",AC:"χώραν",XEN:"χώρας",DAT:"χώρᾳ"},pl:{NOM:"χῶραι",VOC:"χῶραι",AC:"χώρας",XEN:"χωρῶν",DAT:"χώραις"},endings:{sg:{NOM:"-α",VOC:"-α",AC:"-αν",XEN:"-ας",DAT:"-ᾳ"},pl:{NOM:"-αι",VOC:"-αι",AC:"-ας",XEN:"-ῶν",DAT:"-αις"}}},
      {id:"time",label:"-η",word:"τιμή",gender:"F",article:"ἡ",note:"τιμή, τιμῆς",sg:{NOM:"τιμή",VOC:"τιμή",AC:"τιμήν",XEN:"τιμῆς",DAT:"τιμῇ"},pl:{NOM:"τιμαί",VOC:"τιμαί",AC:"τιμάς",XEN:"τιμῶν",DAT:"τιμαῖς"},endings:{sg:{NOM:"-ή",VOC:"-ή",AC:"-ήν",XEN:"-ῆς",DAT:"-ῇ"},pl:{NOM:"-αί",VOC:"-αί",AC:"-άς",XEN:"-ῶν",DAT:"-αῖς"}}},
      {id:"neanias",label:"♂ -ας",word:"νεανίας",gender:"M",article:"ὁ",note:"νεανίας, νεανίου",sg:{NOM:"νεανίας",VOC:"νεανία",AC:"νεανίαν",XEN:"νεανίου",DAT:"νεανίᾳ"},pl:{NOM:"νεανίαι",VOC:"νεανίαι",AC:"νεανίας",XEN:"νεανιῶν",DAT:"νεανίαις"},endings:{sg:{NOM:"-ας",VOC:"-α",AC:"-αν",XEN:"-ου",DAT:"-ᾳ"},pl:{NOM:"-αι",VOC:"-αι",AC:"-ας",XEN:"-ῶν",DAT:"-αις"}}}
    ],
    "2":[
      {id:"logos",label:"♂ -ος",word:"λόγος",gender:"M",article:"ὁ",note:"λόγος, λόγου",sg:{NOM:"λόγος",VOC:"λόγε",AC:"λόγον",XEN:"λόγου",DAT:"λόγῳ"},pl:{NOM:"λόγοι",VOC:"λόγοι",AC:"λόγους",XEN:"λόγων",DAT:"λόγοις"},endings:{sg:{NOM:"-ος",VOC:"-ε",AC:"-ον",XEN:"-ου",DAT:"-ῳ"},pl:{NOM:"-οι",VOC:"-οι",AC:"-ους",XEN:"-ων",DAT:"-οις"}}},
      {id:"doron",label:"⚲ -ον",word:"δῶρον",gender:"N",article:"τό",note:"δῶρον, δώρου",sg:{NOM:"δῶρον",VOC:"δῶρον",AC:"δῶρον",XEN:"δώρου",DAT:"δώρῳ"},pl:{NOM:"δῶρα",VOC:"δῶρα",AC:"δῶρα",XEN:"δώρων",DAT:"δώροις"},endings:{sg:{NOM:"-ον",VOC:"-ον",AC:"-ον",XEN:"-ου",DAT:"-ῳ"},pl:{NOM:"-α",VOC:"-α",AC:"-α",XEN:"-ων",DAT:"-οις"}}}
    ],
    "3":[
      {id:"phylax",label:"♂ oclusiva",word:"φύλαξ",gender:"M",article:"ὁ",note:"φύλαξ, φύλακος",sg:{NOM:"φύλαξ",VOC:"φύλαξ",AC:"φύλακα",XEN:"φύλακος",DAT:"φύλακι"},pl:{NOM:"φύλακες",VOC:"φύλακες",AC:"φύλακας",XEN:"φυλάκων",DAT:"φύλαξι(ν)"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"-α",XEN:"-ος",DAT:"-ι"},pl:{NOM:"-ες",VOC:"-ες",AC:"-ας",XEN:"-ων",DAT:"variable"}}},
      {id:"soma",label:"⚲ -μα",word:"σῶμα",gender:"N",article:"τό",note:"σῶμα, σώματος",sg:{NOM:"σῶμα",VOC:"σῶμα",AC:"σῶμα",XEN:"σώματος",DAT:"σώματι"},pl:{NOM:"σώματα",VOC:"σώματα",AC:"σώματα",XEN:"σωμάτων",DAT:"σώμασι(ν)"},endings:{sg:{NOM:"variable",VOC:"variable",AC:"variable",XEN:"-ος",DAT:"-ι"},pl:{NOM:"-α",VOC:"-α",AC:"-α",XEN:"-ων",DAT:"variable"}}},
      {id:"polis",label:"♀ -ις",word:"πόλις",gender:"F",article:"ἡ",note:"πόλις, πόλεως",sg:{NOM:"πόλις",VOC:"πόλι",AC:"πόλιν",XEN:"πόλεως",DAT:"πόλει"},pl:{NOM:"πόλεις",VOC:"πόλεις",AC:"πόλεις",XEN:"πόλεων",DAT:"πόλεσι(ν)"},endings:{sg:{NOM:"variable",VOC:"-ι",AC:"-ιν",XEN:"-ως",DAT:"-ι"},pl:{NOM:"-εις",VOC:"-εις",AC:"-εις",XEN:"-ων",DAT:"variable"}}}
    ]
  }
};

const greekAgreementExamples = [
  {id:"sophos-anthropos",label:"σοφὸς ἄνθρωπος",gender:"M",traits:"SG · ♂",meta:["ἄνθρωπος, ἀνθρώπου, ὁ","σοφός, σοφή, σοφόν"],words:{NOM:["ἄνθρωπος","σοφός"],VOC:["ἄνθρωπε","σοφέ"],AC:["ἄνθρωπον","σοφόν"],XEN:["ἀνθρώπου","σοφοῦ"],DAT:["ἀνθρώπῳ","σοφῷ"]},endings:{NOM:["-ος","-ός"],VOC:["-ε","-έ"],AC:["-ον","-όν"],XEN:["-ου","-οῦ"],DAT:["-ῳ","-ῷ"]}},
  {id:"agathe-politeia",label:"ἀγαθὴ πολιτεία",gender:"F",traits:"SG · ♀",meta:["πολιτεία, πολιτείας, ἡ","ἀγαθός, ἀγαθή, ἀγαθόν"],words:{NOM:["πολιτεία","ἀγαθή"],VOC:["πολιτεία","ἀγαθή"],AC:["πολιτείαν","ἀγαθήν"],XEN:["πολιτείας","ἀγαθῆς"],DAT:["πολιτείᾳ","ἀγαθῇ"]},endings:{NOM:["-α","-ή"],VOC:["-α","-ή"],AC:["-αν","-ήν"],XEN:["-ας","-ῆς"],DAT:["-ᾳ","-ῇ"]}},
  {id:"politikon-zoon",label:"πολιτικὸν ζῷον",gender:"N",traits:"SG · ⚲",meta:["ζῷον, ζῴου, τό","πολιτικός, πολιτική, πολιτικόν"],words:{NOM:["ζῷον","πολιτικόν"],VOC:["ζῷον","πολιτικόν"],AC:["ζῷον","πολιτικόν"],XEN:["ζῴου","πολιτικοῦ"],DAT:["ζῴῳ","πολιτικῷ"]},endings:{NOM:["-ον","-όν"],VOC:["-ον","-όν"],AC:["-ον","-όν"],XEN:["-ου","-οῦ"],DAT:["-ῳ","-ῷ"]}},
  {id:"kakos-bios",label:"κακὸς βίος",gender:"M",traits:"SG · ♂",meta:["βίος, βίου, ὁ","κακός, κακή, κακόν"],words:{NOM:["βίος","κακός"],VOC:["βίε","κακέ"],AC:["βίον","κακόν"],XEN:["βίου","κακοῦ"],DAT:["βίῳ","κακῷ"]},endings:{NOM:["-ος","-ός"],VOC:["-ε","-έ"],AC:["-ον","-όν"],XEN:["-ου","-οῦ"],DAT:["-ῳ","-ῷ"]}}
];

const greekAgreementPlurals = {
  "sophos-anthropos":{words:{NOM:["ἄνθρωποι","σοφοί"],VOC:["ἄνθρωποι","σοφοί"],AC:["ἀνθρώπους","σοφούς"],XEN:["ἀνθρώπων","σοφῶν"],DAT:["ἀνθρώποις","σοφοῖς"]},endings:{NOM:["-οι","-οί"],VOC:["-οι","-οί"],AC:["-ους","-ούς"],XEN:["-ων","-ῶν"],DAT:["-οις","-οῖς"]}},
  "agathe-politeia":{words:{NOM:["πολιτεῖαι","ἀγαθαί"],VOC:["πολιτεῖαι","ἀγαθαί"],AC:["πολιτείας","ἀγαθάς"],XEN:["πολιτειῶν","ἀγαθῶν"],DAT:["πολιτείαις","ἀγαθαῖς"]},endings:{NOM:["-αι","-αί"],VOC:["-αι","-αί"],AC:["-ας","-άς"],XEN:["-ῶν","-ῶν"],DAT:["-αις","-αῖς"]}},
  "politikon-zoon":{words:{NOM:["ζῷα","πολιτικά"],VOC:["ζῷα","πολιτικά"],AC:["ζῷα","πολιτικά"],XEN:["ζῴων","πολιτικῶν"],DAT:["ζῴοις","πολιτικοῖς"]},endings:{NOM:["-α","-ά"],VOC:["-α","-ά"],AC:["-α","-ά"],XEN:["-ων","-ῶν"],DAT:["-οις","-οῖς"]}},
  "kakos-bios":{words:{NOM:["βίοι","κακοί"],VOC:["βίοι","κακοί"],AC:["βίους","κακούς"],XEN:["βίων","κακῶν"],DAT:["βίοις","κακοῖς"]},endings:{NOM:["-οι","-οί"],VOC:["-οι","-οί"],AC:["-ους","-ούς"],XEN:["-ων","-ῶν"],DAT:["-οις","-οῖς"]}}
};

const greekPredicateExamples = [
  {sentence:"Ὁ Σωκράτης ἐστι σοφός.",subject:"Ὁ Σωκράτης",attribute:"σοφός",traits:"NOM · SG · ♂"},
  {sentence:"Ὁ Σωκράτης Ἀθηναῖος ἐστι.",subject:"Ὁ Σωκράτης",attribute:"Ἀθηναῖος",traits:"NOM · SG · ♂"},
  {sentence:"Ὁ Σωκράτης καὶ ὁ Πλάτων Ἀθηναῖοι εἰσι.",subject:"Ὁ Σωκράτης καὶ ὁ Πλάτων",attribute:"Ἀθηναῖοι",traits:"NOM · PL · ♂"},
  {sentence:"Ἡμεῖς Ἀθηναῖοί ἐσμεν, ἀλλ᾽ ὑμεῖς Λακεδαιμόνιοι ἐστε.",subject:"Ἡμεῖς",attribute:"Ἀθηναῖοί",traits:"NOM · PL · ♂"},
  {sentence:"Ἔρως νέος καὶ καλός ἐστι, ἀλλ᾽ οὐ κακός.",subject:"Ἔρως",attribute:"νέος καὶ καλός",traits:"NOM · SG · ♂"},
  {sentence:"Δικαία ἡ πολιτεία.",subject:"ἡ πολιτεία",attribute:"Δικαία",traits:"NOM · SG · ♀ · cópula elidida"},
  {sentence:"Ὀρθή ἥδε ἡ ψυχή.",subject:"ἥδε ἡ ψυχή",attribute:"Ὀρθή",traits:"NOM · SG · ♀ · cópula elidida"},
  {sentence:"Ὁ ἄνθρωπος ζῷον πολιτικόν.",subject:"Ὁ ἄνθρωπος",attribute:"ζῷον πολιτικόν",traits:"NOM · SG · ⚲ · cópula elidida"}
];

function buildGreek212(id,label,stem,feminine){
  const feminineAlpha=feminine==="α";
  return {id,label,enunciation:`${stem}ός, ${stem}${feminineAlpha?"ά":"ή"}, ${stem}όν`,
    M:{sg:{NOM:stem+"ός",VOC:stem+"έ",AC:stem+"όν",XEN:stem+"οῦ",DAT:stem+"ῷ"},pl:{NOM:stem+"οί",VOC:stem+"οί",AC:stem+"ούς",XEN:stem+"ῶν",DAT:stem+"οῖς"}},
    F:{sg:{NOM:stem+(feminineAlpha?"ά":"ή"),VOC:stem+(feminineAlpha?"ά":"ή"),AC:stem+(feminineAlpha?"άν":"ήν"),XEN:stem+(feminineAlpha?"ᾶς":"ῆς"),DAT:stem+(feminineAlpha?"ᾷ":"ῇ")},pl:{NOM:stem+"αί",VOC:stem+"αί",AC:stem+"άς",XEN:stem+"ῶν",DAT:stem+"αῖς"}},
    N:{sg:{NOM:stem+"όν",VOC:stem+"όν",AC:stem+"όν",XEN:stem+"οῦ",DAT:stem+"ῷ"},pl:{NOM:stem+"ά",VOC:stem+"ά",AC:stem+"ά",XEN:stem+"ῶν",DAT:stem+"οῖς"}}
  };
}

const greekAdjectiveFamilies = {
  eta:[buildGreek212("agathos","bo","ἀγαθ","η"),buildGreek212("sophos","sabio","σοφ","η")],
  alpha:[buildGreek212("mikros","pequeno","μικρ","α")],
  two:[{id:"athanatos",label:"inmortal",enunciation:"ἀθάνατος, ἀθάνατον",M:{sg:{NOM:"ἀθάνατος",VOC:"ἀθάνατε",AC:"ἀθάνατον",XEN:"ἀθανάτου",DAT:"ἀθανάτῳ"},pl:{NOM:"ἀθάνατοι",VOC:"ἀθάνατοι",AC:"ἀθανάτους",XEN:"ἀθανάτων",DAT:"ἀθανάτοις"}},F:{sg:{NOM:"ἀθάνατος",VOC:"ἀθάνατε",AC:"ἀθάνατον",XEN:"ἀθανάτου",DAT:"ἀθανάτῳ"},pl:{NOM:"ἀθάνατοι",VOC:"ἀθάνατοι",AC:"ἀθανάτους",XEN:"ἀθανάτων",DAT:"ἀθανάτοις"}},N:{sg:{NOM:"ἀθάνατον",VOC:"ἀθάνατον",AC:"ἀθάνατον",XEN:"ἀθανάτου",DAT:"ἀθανάτῳ"},pl:{NOM:"ἀθάνατα",VOC:"ἀθάνατα",AC:"ἀθάνατα",XEN:"ἀθανάτων",DAT:"ἀθανάτοις"}}}]
};

const greekPronounCases=["NOM","AC","XEN","DAT"];
const greekPronouns={
  article:{label:"ὁ · ἡ · τό",kind:"artigo",note:"Non ten vocativo. Concorda co substantivo en caso, número e xénero.",sg:{NOM:["ὁ","ἡ","τό"],AC:["τόν","τήν","τό"],XEN:["τοῦ","τῆς","τοῦ"],DAT:["τῷ","τῇ","τῷ"]},pl:{NOM:["οἱ","αἱ","τά"],AC:["τούς","τάς","τά"],XEN:["τῶν","τῶν","τῶν"],DAT:["τοῖς","ταῖς","τοῖς"]}},
  hode:{label:"ὅδε · ἥδε · τόδε",kind:"demostrativo",note:"Declínase como o artigo co elemento -δε unido a cada forma.",sg:{NOM:["ὅδε","ἥδε","τόδε"],AC:["τόνδε","τήνδε","τόδε"],XEN:["τοῦδε","τῆσδε","τοῦδε"],DAT:["τῷδε","τῇδε","τῷδε"]},pl:{NOM:["οἵδε","αἵδε","τάδε"],AC:["τούσδε","τάσδε","τάδε"],XEN:["τῶνδε","τῶνδε","τῶνδε"],DAT:["τοῖσδε","ταῖσδε","τοῖσδε"]}}
};

const greekPersonalPronouns={
  ego:{label:"ἐγώ · ἡμεῖς",sg:{NOM:"ἐγώ",AC:"ἐμέ / με",XEN:"ἐμοῦ / μου",DAT:"ἐμοί / μοι"},pl:{NOM:"ἡμεῖς",AC:"ἡμᾶς",XEN:"ἡμῶν",DAT:"ἡμῖν"}},
  sy:{label:"σύ · ὑμεῖς",sg:{NOM:"σύ",AC:"σέ",XEN:"σοῦ",DAT:"σοί"},pl:{NOM:"ὑμεῖς",AC:"ὑμᾶς",XEN:"ὑμῶν",DAT:"ὑμῖν"}}
};
