
import { test, expect, Page } from '@playwright/test';

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    {
      id: 'Pos_Fun_0001',
      name: 'Convert Simple present tense sentence',
      input: 'mama vaeda karanavaa',
      expected: 'මම වැඩ කරනවා',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Conversion of present tense sentences',
      qualityFocus: 'Accuracy validation',
      description: 'Present tense is accurately converted in Sinhala. Proper spacing and word segmentation are maintained.'
    },
    {
      id: 'Pos_Fun_0002',
      name: 'Compound sentence with conjunction',
      input: 'mama paasalata yanna hadhanne, habaeyi mata amaaru nisaa payin yanna baee.',
      expected: 'මම පාසලට යන්න හදන්නෙ, හබැයි මට අමාරු නිසා පයින් යන්න බෑ.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Conjunction usage in Sinhala',
      qualityFocus: 'Accuracy validation',
      description: 'Sentence meaning is fully preserved. Conjunction "haebaeyi" correctly joins the clauses.'
    },
    {
      id: 'Pos_Fun_0003',
      name: 'Complex conditional sentence',
      input: 'oyaata hariyatama eeka kiyanna puluvannam mama ahalaa balannam.',
      expected: 'ඔයාට හරියටම ඒක කියන්න පුලුවන්නම් මම අහලා බලන්නම්.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Complex conditional sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Sentence meaning is fully preserved. Conditional structure "nam" is correctly applied.'
    },
    {
      id: 'Pos_Fun_0004',
      name: 'Interrogative question form.',
      input: 'oyaata badaginidha?',
      expected: 'ඔයාට බඩගිනිද?',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Imperative command sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Proper question form is applied. Question meaning is fully preserved.'
    },
    {
      id: 'Pos_Fun_0005',
      name: 'Imperative command form',
      input: 'naevatha balanna.',
      expected: 'නැවත බලන්න.',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Imperative command form sentence',
      qualityFocus: 'Accuracy validation',
      description: 'The sentence correctly conveys a command to repeat an action.'
    },
    {
      id: 'Pos_Fun_0006',
      name: 'Positive sentence form',
      input: 'api ehenam eeka hariyatama karamu.',
      expected: 'අපි එහෙනම් ඒක හරියටම කරමු.',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Positive sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Sentence meaning correctly expresses a positive intention.'
    },
    {
      id: 'Pos_Fun_0007',
      name: 'Negative sentence form.',
      input: 'ee gaena magen ahanna epaa.mama eeka oyaata kiyannee naehae.',
      expected: 'ඒ ගැන මගෙන් අහන්න එපා.මම ඒක ඔයාට කියන්නේ නැහැ.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Negative sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Sentence meaning correctly expresses a negative intention.'
    },
    {
      id: 'Pos_Fun_0008',
      name: 'Common Greeting',
      input: 'suba upandhinayak!',
      expected: 'සුබ උපන්දිනයක්!',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Input normalization for non english phrases',
      qualityFocus: 'Accuracy validation',
      description: 'Exact phrase match to known sinhala greetings.'
    },
    {
      id: 'Pos_Fun_0009',
      name: 'Polite request phrase.',
      input: 'karuNaakaralaa mata eya paehaedhiliva kiyanna puLuvandha?',
      expected: 'කරුණාකරලා මට එය පැහැදිලිව කියන්න පුළුවන්ද?',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Request / response – tests translation of polite requests',
      qualityFocus: 'Accuracy validation',
      description: 'Sentence meaning correctly express a polite request.'
    },
    {
      id: 'Pos_Fun_0010',
      name: 'Informal phrasing',
      input: 'eeyi, ooka karapan.',
      expected: 'ඒයි, ඕක කරපන්.',
      length: 'S',
      category: 'Daily conversational usage',
      grammarFocus: 'Informal sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Informal tone and meaning are fully preserved.'
    },
    {
      id: 'Pos_Fun_0011',
      name: 'Day to day expression.',
      input: 'mata badaginiyi.',
      expected: 'මට බඩගිනියි.',
      length: 'S',
      category: 'Daily language usage',
      grammarFocus: 'Day to day expression',
      qualityFocus: 'Accuracy validation',
      description: 'Everyday meaning of the expression is fully preserved.'
    },
    {
      id: 'Pos_Fun_0012',
      name: 'Imperative command form',
      input: 'oyaa kaaraNaava mokakdha kiyala hodhata hithalaa balanna.',
      expected: 'ඔයා කාරණාව මොකක්ද කියල හොදට හිතලා බලන්න.',
      length: 'M',
      category: 'Daily conversational usage',
      grammarFocus: 'Imperative command sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'The sentence correctly conveys a command to think and try.'
    },
    {
      id: 'Pos_Fun_0013',
      name: 'Multiple spaces, line breaks, and paragraph inputs',
      input: 'Api       heta   udheema nuvara   balaa   pitath  venavaa.   obath kaemathi           nam        apith  ekka  enna puLuvan.',
      expected: 'අපි       හෙට   උදේම නුවර   බලා   පිටත්  වෙනවා.   ඔබත් කැමති           නම්        අපිත්  එක්ක  එන්න පුළුවන්.',
      length: 'M',
      category: 'Formatting(spaces,line break,paragraphs)',
      grammarFocus: 'Contains main clause and conditional invitation',
      qualityFocus: 'Robustness validation',
      description: 'Input contains multiple spaces and paragraph-style formatting.'
    },
    {
      id: 'Pos_Fun_0014',
      name: 'Missing spaces / joined words (stress test)',
      input: 'mamabathkanavaa',
      expected: 'මමබත්කනවා',
      length: 'S',
      category: 'Formatting(spaces,pharagraphs),handling joined words',
      grammarFocus: 'Simple sentence, correct word separation',
      qualityFocus: 'Robustness validation',
      description: 'The input contains words that are joined together without spaces.'
    },
    {
      id: 'Pos_Fun_0015',
      name: 'Repeated words for emphasis.',
      input: 'Ovun obata podi podi kaaryayan tikak pavaraavi. Oba ema kaaryayan siyallama eka eka hariyata karanna oonii.',
      expected: 'ඔවුන් ඔබට පොඩි පොඩි කාර්යයන් ටිකක් පවරාවි. ඔබ එම කාර්යයන් සියල්ලම එක එක හරියට කරන්න ඕනී.',
      length: 'M',
      category: 'Daily conversational usage',
      grammarFocus: 'Repeated words handling',
      qualityFocus: 'Accuracy validation',
      description: 'Repetition for emphasis is correctly preserved.'
    },
    {
      id: 'Pos_Fun_0016',
      name: 'Tense variations (past tense)',
      input: 'Mama pereedhaa thaniyenma kanthooruvata gihin aavaa. ovun mata naevatha paemiNiya yuthu dhinaya dhanvaa evannam kivvaa.',
      expected: 'මම පෙරේදා තනියෙන්ම කන්තෝරුවට ගිහින් ආවා. ඔවුන් මට නැවත පැමිණිය යුතු දිනය දන්වා එවන්නම් කිව්වා.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Ensures correct English past tense conversion',
      qualityFocus: 'Accuracy validation',
      description: 'Input is a simple sentence in past tense.'
    },
    {
      id: 'Pos_Fun_0017',
      name: 'Tense variations.',
      input: 'mama labana maasayee gedhara gihin enna yanavaa. ee nisaa api iiLaGa sathiyee eyaava balanna yamu.',
      expected: 'මම ලබන මාසයේ ගෙදර ගිහින් එන්න යනවා. ඒ නිසා අපි ඊළඟ සතියේ එයාව බලන්න යමු.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Verifies tense conversion from Sinhala to English',
      qualityFocus: 'Accuracy validation',
      description: 'Input is a short sentence expressing future intention.'
    },
    {
      id: 'Pos_Fun_0018',
      name: 'pronoun variations',
      input: 'mata karadhara karanna epaa.mama dhaen paadam karanna hadhannee.',
      expected: 'මට කරදර කරන්න එපා.මම දැන් පාඩම් කරන්න හදන්නේ.',
      length: 'M',
      category: 'Daily language usage',
      grammarFocus: 'Imperative command sentence handling',
      qualityFocus: 'Accuracy validation',
      description: 'Input is short and imperative in tone.'
    },
    {
      id: 'Pos_Fun_0019',
      name: 'Slang and colloquial phrasing',
      input: 'siraavata, ela kiri machan, adha office meeting godak thibuna nisaa gedhara enna late vuNaa. eeka poddak amaaruyi vagee, namuth api eeka plan karala  thiyena nisaa poddak adjust karala karamu.',
      expected: 'සිරාවට, එල කිරි මචන්, අද office meeting ගොඩක් තිබුන නිසා ගෙදර එන්න late වුණා. ඒක පොඩ්ඩක් අමාරුයි වගේ, නමුත් අපි ඒක plan කරල  තියෙන නිසා පොඩ්ඩක් adjust කරල කරමු.',
      length: 'M',
      category: 'Slang/informal language',
      grammarFocus: 'Multiple clauses,conjuctions and dependent phrases',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains informal/slang language.'
    },
    {
      id: 'Pos_Fun_0020',
      name: 'Long paragraph with multiple simple sentences',
      input: 'Mama adha hospital yanna innee. mama doctor appointment ekak dhaalaa thiyennee. mata hariyata check-up eka karaganna oonee nisaa, adha mata veelaasaninma yanna venavaa. ee nisaa mama adha vaeda tika puLuvan tharam ikmanin ivarayak karaganna balanavaa. mata havasa thaniyen gedhara yanna kammaeli nisaa oyaata puluvandha office ivara velaa hospital eka gaavata aevith inna. ethakota api dhennatama ekata gedhara yanna puluvan. mama hithana vidhiyata havasa bas ekak thiyenavaa apita eeken ikmanata yanna puluvan.',
      expected: 'මම අද hospital යන්න ඉන්නේ. මම doctor appointment එකක් දාලා තියෙන්නේ. මට හරියට check-up එක කරගන්න ඕනේ නිසා, අද මට වේලාසනින්ම යන්න වෙනවා. ඒ නිසා මම අද වැඩ ටික පුළුවන් තරම් ඉක්මනින් ඉවරයක් කරගන්න බලනවා. මට හවස තනියෙන් ගෙදර යන්න කම්මැලි නිසා ඔයාට පුලුවන්ද office ඉවර වෙලා hospital එක ගාවට ඇවිත් ඉන්න. එතකොට අපි දෙන්නටම එකට ගෙදර යන්න පුලුවන්. මම හිතන විදියට හවස බස් එකක් තියෙනවා අපිට ඒකෙන් ඉක්මනට යන්න පුලුවන්.',
      length: 'L',
      category: 'Daily language usage',
      grammarFocus: 'Verifies handling of sentence boundaries',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains multiple simple sentences forming a short paragraph.'
    },
    {
      id: 'Pos_Fun_0021',
      name: 'Line breaks (multi-line input)',
      input: 'mama adha havasa pansalee puujaavata giyee naehae.                                      oyaalaa giyaadha?',
      expected: 'මම අද හවස පන්සලේ පූජාවට ගියේ නැහැ.                                      ඔයාලා ගියාද?',
      length: 'M',
      category: 'Formatting(spaces,line break,paragraphs)',
      grammarFocus: 'Interrogative statement',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains line breaks (multi-line) to test handling of paragraph-style input.'
    },

    {
      id: 'Pos_Fun_0022',
      name: 'English technical/brand terms embedded in Singlish',
      input: 'Mama adha raee vedhdhii Zoom meeting ekak dhaala hariyatama eeka karana vidhiya oyaata kiyalaa dhennam.Oyaata thiyennee oyaage sampuurNa visthara tika dhaalaa Whatsapp paNividayak evanna. oyaagee LinkedIn giNuma yaavathkaaliina karalaa thiyaaganna. mokadha eeka oyaava mee raekiyaavata hodhatama sudhusu kenek vidhihata pennanna loku udhavvak venavaa.  avasaanayee obava yam raekiyavakin thooragena aethnam ee bava obata ovun Email ossee obata dhaenum dhenu aetha.',
      expected: 'මම අද රෑ වෙද්දී Zoom meeting එකක් දාල හරියටම ඒක කරන විදිය ඔයාට කියලා දෙන්නම්.ඔයාට තියෙන්නේ ඔයාගෙ සම්පූර්ණ විස්තර ටික දාලා Whatsapp පණිවිඩයක් එවන්න. ඔයාගේ LinkedIn ගිණුම යාවත්කාලීන කරලා තියාගන්න. මොකද ඒක ඔයාව මේ රැකියාවට හොදටම සුදුසු කෙනෙක් විදිහට පෙන්නන්න ලොකු උදව්වක් වෙනවා.  අවසානයේ ඔබව යම් රැකියවකින් තෝරගෙන ඇත්නම් ඒ බව ඔබට ඔවුන් Email ඔස්සේ ඔබට දැනුම් දෙනු ඇත.',
      length: 'L',
      category: 'MixedSinglish + English',
      grammarFocus: 'Complex,multiple clauses with technical terms',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains multiple English technical/brand terms embedded in Sinhala context.'
    },
    {
      id: 'Pos_Fun_0023',
      name: 'English abbreviations and short forms',
      input: 'Mata bank eken ATM ekee PIN eka change karanna kiyala message ekak SMS vidhihata aavaa. passe mama bank app eka open karala, instructions tika hariyata follow karala, PIN eka update karala complete kalaa. Mama hithanavaa, mee vidhiyata karoth apita safe saha secure vidhihata ATM transactions manage karanna puluvan veyi kiyalaa. ee vagee banking tasks timely complete karanna naethnam, eka eka gaetalu aethivenna puluvan haekiyaavak thiyenavaa. ee nisaa mama organized way ekakin mehema small banking activities complete karanna hithanavaa, ee vagema future eken unnecessary problems adu karaganna puluvan veyi kiyalaa vishvaasa karanavaa.',
      expected: 'මට bank එකෙන් ATM එකේ PIN එක change කරන්න කියල message එකක් SMS විදිහට ආවා. පස්සෙ මම bank app එක open කරල, instructions ටික හරියට follow කරල, PIN එක update කරල complete කලා. මම හිතනවා, මේ විදියට කරොත් අපිට safe සහ secure විදිහට ATM transactions manage කරන්න පුලුවන් වෙයි කියලා. ඒ වගේ banking tasks timely complete කරන්න නැත්නම්, එක එක ගැටලු ඇතිවෙන්න පුලුවන් හැකියාවක් තියෙනවා. ඒ නිසා මම organized way එකකින් මෙහෙම small banking activities complete කරන්න හිතනවා, ඒ වගෙම future එකෙන් unnecessary problems අඩු කරගන්න පුලුවන් වෙයි කියලා විශ්වාස කරනවා.',
      length: 'L',
      category: 'Names / places / common English words',
      grammarFocus: 'Multiple clauses describing actions in sequence',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains English abbreviations and short forms ("ATM", "PIN", "SMS", "App") that should remain unchanged.'
    },
    {
      id: 'Pos_Fun_0024',
      name: 'Units and Numbers Conversion',
      input: 'Heta Malligee upandhinaya nisaa api loku happy mood ekakin innavaa. Oyaata heta havasata podi dheeval tikak genath dhenna puluvandha? mokadha mama shop eken 2 kg ka paan piti genath thiyenne cake hadhanna oonee nisaa. Api okkoma ekathu velaa gedhara kaeema tikak rasata hadhalaa, birthday decorations tikak podiyata karala, yaaluvantath invite karalaa lassanata celebrate karanna hithan innavaa. Ehema karoth eyath godak surprise venna puluvan.',
      expected: 'හෙට මල්ලිගේ උපන්දිනය නිසා අපි ලොකු happy mood එකකින් ඉන්නවා. ඔයාට හෙට හවසට පොඩි දේවල් ටිකක් ගෙනත් දෙන්න පුලුවන්ද? මොකද මම shop එකෙන් 2 kg ක පාන් පිටි ගෙනත් තියෙන්නෙ cake හදන්න ඕනේ නිසා. අපි ඔක්කොම එකතු වෙලා ගෙදර කෑම ටිකක් රසට හදලා, birthday decorations ටිකක් පොඩියට කරල, යාලුවන්ටත් invite කරලා ලස්සනට celebrate කරන්න හිතන් ඉන්නවා. එහෙම කරොත් එයත් ගොඩක් surprise වෙන්න පුලුවන්.',
      length: 'L',
      category: 'Names / places / common English words',
      grammarFocus: 'Compound sentences',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains numbers ("2 kg"), English words ("shop", "cake") that must remain unchanged.'
    },
    {
      id: 'Pos_Fun_0025',
      name: 'Informal conversational responses',
      input: 'hari, mama kohomahari eyaata eeka paehadhili karalaa kiyalaa, oyaata avashya dhee labaa ganna balannam. api passe eyaa ekka loku prashnayak vennee nathuva, kathaa baha karalaa eekata hariyata visadhumak ganna balamu. oyaa ee gaena godak lokuvata hithanna yanna epaa, oyaage hithata loku barak gannath epaa, mokadha mee velavee api haemooma ekathu velaa inna nisaa apita eeka pahasuven karanna puluvan kiyalaa mama vishvaasa karanavaa. Ikmaninma haemadheema hariyata sidhu velaa api haemootama sathutu venna puluvan veyi kiyala mama hithanavaa.',
      expected: 'හරි, මම කොහොමහරි එයාට ඒක පැහදිලි කරලා කියලා, ඔයාට අවශ්ය දේ ලබා ගන්න බලන්නම්. අපි පස්සෙ එයා එක්ක ලොකු ප්‍රශ්නයක් වෙන්නේ නතුව, කතා බහ කරලා ඒකට හරියට විසදුමක් ගන්න බලමු. ඔයා ඒ ගැන ගොඩක් ලොකුවට හිතන්න යන්න එපා, ඔයාගෙ හිතට ලොකු බරක් ගන්නත් එපා, මොකද මේ වෙලවේ අපි හැමෝම එකතු වෙලා ඉන්න නිසා අපිට ඒක පහසුවෙන් කරන්න පුලුවන් කියලා මම විශ්වාස කරනවා. ඉක්මනින්ම හැමදේම හරියට සිදු වෙලා අපි හැමෝටම සතුටු වෙන්න පුලුවන් වෙයි කියල මම හිතනවා.',
      length: 'L',
      category: 'Slang/informal language  in friendly tone',
      grammarFocus: 'Compound sentences',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains informal, conversational Sinhala with slang expressions.'
    },
    {
      id: 'Pos_Fun_0026',
      name: 'Sentences containing places and common English words that should remain as they are',
      input: 'Apita iiLaGa maase project eka submit karanna thiyenavaa ee nisaa, adha idhan hariyata plan karala vaeda karanna hithan inne. Api time table ekak hadhala, eka eka task podi podi vidhihata divide karagena, regular vidhihata vaeda karoth, deadline eka miss venne naethuva vaeda tika karaganna puluvan veyi kiyalaa mama loku visvaasayak thiyagena inne. Ehema karoth api okkotama stress naethuva, quality ekath hodhatama maintain karagena, project eka successfully submit karanna puluvan veyi kiyala mama hithanavaa.',
      expected: 'අපිට ඊළඟ මාසෙ project එක submit කරන්න තියෙනවා ඒ නිසා, අද ඉදන් හරියට plan කරල වැඩ කරන්න හිතන් ඉන්නේ. අපි time table එකක් හදල, එක එක task පොඩි පොඩි විදිහට divide කරගෙන, regular විදිහට වැඩ කරොත්, deadline එක miss වෙන්නෙ නැතුව වැඩ ටික කරගන්න පුලුවන් වෙයි කියලා මම ලොකු විස්වාසයක් තියගෙන ඉන්නේ. එහෙම කරොත් අපි ඔක්කොටම stress නැතුව, quality එකත් හොදටම maintain කරගෙන, project එක successfully submit කරන්න පුලුවන් වෙයි කියල මම හිතනවා.',
      length: 'L',
      category: 'Names / places / common English words',
      grammarFocus: 'Multiple clauses describing planning and confidence',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains common English words ("project", "deadline").'
    },
    {
      id: 'Pos_Fun_0027',
      name: 'Informal multi-clause conversational input',
      input: 'oyaa heta office enavanam mata kiyanna. ehemanam api dhennata puluvan heta havasata coffee ekak bonna yanna.naeththam ithin vena dhavasaka hambavenna  puluvan. oyaa kaemathi thaenak thiyenavanam mata kiyanna mama oyaava ethanata ekkagena yannam.ethakota apita puluvan nidhahasee katha baha karanna. mata oyaa ekka kathaa karanna godak dheeval thiyenavaa. mama hithanavaa ehema giyoth apita hodhatama enjoy karannath puluvan veyi kiyalaa.',
      expected: 'ඔයා හෙට office එනවනම් මට කියන්න. එහෙමනම් අපි දෙන්නට පුලුවන් හෙට හවසට coffee එකක් බොන්න යන්න.නැත්තම් ඉතින් වෙන දවසක හම්බවෙන්න  පුලුවන්. ඔයා කැමති තැනක් තියෙනවනම් මට කියන්න මම ඔයාව එතනට එක්කගෙන යන්නම්.එතකොට අපිට පුලුවන් නිදහසේ කත බහ කරන්න. මට ඔයා එක්ක කතා කරන්න ගොඩක් දේවල් තියෙනවා. මම හිතනවා එහෙම ගියොත් අපිට හොදටම enjoy කරන්නත් පුලුවන් වෙයි කියලා.',
      length: 'L',
      category: 'Daily language usage',
      grammarFocus: 'Multiple connected clauses with conditionals',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains informal, conversational Sinhala with multiple clauses and conditional phrases.'
    },
    {
      id: 'Pos_Fun_0028',
      name: 'Paragraph-style input',
      input: 'maarga sQQvarDhana aDhikaariya sathu maarga kotas 150k pamaNa vinaashayata pathva aethi. ehi samastha dhiga pramaaNaya kiloomiitar 95k pamaNa vana bava pravaahana AmathYA saDHahan kaLeeya.dhaenatamath eevaa repair kiriimata miliyana thunsiiyak pamaNa aayoojanaya karalaa thiyennee. labana maasayee sita sQQvarDhana katayuthu ikmanin sidhu kiriimata niyamithava aetha. mee sadhahaa ikmaninma nadaththu kiriimee saha kriyaathmaka kiriimee kaNdaayam sudhusu paridhi yodhavana bavath dhanvaa aetha.',
      expected: 'මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 150ක් පමණ විනාශයට පත්ව ඇති. එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 95ක් පමණ වන බව ප්‍රවාහන අමත්‍ය සඳහන් කළේය.දැනටමත් ඒවා repair කිරීමට මිලියන තුන්සීයක් පමණ ආයෝජනය කරලා තියෙන්නේ. ලබන මාසයේ සිට සංවර්ධන කටයුතු ඉක්මනින් සිදු කිරීමට නියමිතව ඇත. මේ සදහා ඉක්මනින්ම නඩත්තු කිරීමේ සහ ක්‍රියාත්මක කිරීමේ කණ්ඩායම් සුදුසු පරිදි යොදවන බවත් දන්වා ඇත.',
      length: 'L',
      category: 'Handling paragraph-style input with messy transliteration',
      grammarFocus: 'Multiple clauses and sentences in a paragraph',
      qualityFocus: 'Robustness validation',
      description: 'Paragraph-style input with multiple sentences concatenated.'
    },
    {
      id: 'Pos_Fun_0029',
      name: 'Dates and time format',
      input: 'mata oyath ekka enna vidhiyak naehae. mokadha mata dhesaembar 25 Christmas party ekakata invite karalaa thiyennee. mama heta 4.00 PM vagee vedhdhii office eken enavaa. aevith mama christmas gift ganna town ekata yanavaa. iitapassee eevath aragena gedhara aevillaa aapahu yanavaa. party eka ivara venna raeevena nisaa samaharavita mata ikmanin gedhara enna baeri veyi. ehema unoth mama oyaata call ekak dhiilaa ee gaena kiyannam,oyaa mama enakam balan innee naethuva nidhaaganna.',
      expected: 'මට ඔයත් එක්ක එන්න විදියක් නැහැ. මොකද මට දෙසැම්බර් 25 Christmas party එකකට invite කරලා තියෙන්නේ. මම හෙට 4.00 PM වගේ වෙද්දී office එකෙන් එනවා. ඇවිත් මම christmas gift ගන්න town එකට යනවා. ඊටපස්සේ ඒවත් අරගෙන ගෙදර ඇවිල්ලා ආපහු යනවා. party එක ඉවර වෙන්න රෑවෙන නිසා සමහරවිට මට ඉක්මනින් ගෙදර එන්න බැරි වෙයි. එහෙම උනොත් මම ඔයාට call එකක් දීලා ඒ ගැන කියන්නම්,ඔයා මම එනකම් බලන් ඉන්නේ නැතුව නිදාගන්න.',
      length: 'L',
      category: 'Mixed Singlish + English - tests translation of sentences',
      grammarFocus: 'multiple connected sentences forming coherent paragraph',
      qualityFocus: 'Accuracy validation',
      description: 'Input contains a mix of Sinhala and English words ("Christmas party", "4.00 PM")'
    },
  ],

  negative: [
    {
      id: 'Neg_Fun_0001',
      name: 'Empty input field handling',
      input: '',
      expected: 'error',
      length: 'S',
      category: 'Empty/cleared input handling',
      grammarFocus: 'S (≤30 characters)',
      qualityFocus: 'Robustness Validation',
      description: 'No text was enterd in the input field. The system does not show any error or warning message.',
      expectedStatus: 'Fail'
    },
    {
      id: 'Neg_Fun_0002',
      name: 'Random meaningless Input handling',
      input: 'ahhfhfu njkafrmmgi amkokkhlisdh',
      expected: 'error',
      length: 'S',
      category: 'Typographical error handling',
      grammarFocus: 'S (≤30 characters)',
      qualityFocus: 'Robustness Validation',
      description: 'The input contains random and meaningless characters. The system does not show any error or warning message.',
      expectedStatus: 'Fail'
    },
    {
      id: 'Neg_Fun_0003',
      name: 'Numbers-only input handling',
      input: '567844',
      expected: 'error',
      length: 'S',
      category: 'Punctuation/Numbers',
      grammarFocus: 'S (≤30 characters)',
      qualityFocus: 'Robustness validation',
      description: 'The input contains only numeric characters. The system does not provide any validation.',
      expectedStatus: 'Fail'
    },
   
    {
      id: 'Neg_Fun_0004',
      name: 'Mixed case Singlish with possessive form',
      input: 'Mee inne mage hodhama yaaluvaa.',
      expected: 'මේ ඉන්නෙ මගෙ හොදම යාලුවා.',
      actual: 'මේ ඉන්නේ mage හොදම යාලුවා.',
      length: 'S',
      category: 'Case sensitivity',
      grammarFocus: 'Simple sentence / Possessive form',
      qualityFocus: 'Partial transliteration',
      description: "Capitalized 'Mee' transliterates correctly but lowercase 'mage' is not transliterated, showing case sensitivity issues.",
      expectedStatus: 'Fail'
    },

    {
      id: 'Neg_Fun_0005',
      name: 'Singlish fruit name abbreviation handling',
      input: 'mee aBA valin rasata achchaaruvak dhaanna.',
      expected: 'මේ අඹ වලින් රසට අච්චාරුවක් දාන්න.',
      actual: 'මේ aBA වලින් රසට අච්චාරුවක් දාන්න.',
      length: 'S',
      category: 'Abbreviation handling',
      grammarFocus: 'Simple sentence',
      qualityFocus: 'Partial transliteration failure',
      description: "System fails to transliterate common Singlish abbreviations like 'aBA' (අඹ) while correctly transliterating other Singlish words.",
      expectedStatus: 'Fail'
    },


    {
      id: 'Neg_Fun_0006',
      name: 'Mixed symbols',
      input: 'mee @@ masa $$$ obee @@@ vidhuli &&&Bhaavithaya### aDhika vii aetha. ## bilpatha rupiyal 5,430 ki. dhina 7k thuLa @@@ gevanna. prashna saDHAhaa 1987 amathanna.',
      expected: 'error',
      length: 'M',
      category: 'Typographical error handling',
      grammarFocus: 'M (31–299 characters)',
      qualityFocus: 'Robustness validation',
      description: 'Input contains random symbols, punctuation, and numbers mixed with Singlish. System may fail to transliterate correctly due to unsupported characters.',
      expectedStatus: 'Fail'
    },
   
    {
      id: 'Neg_Fun_0007',
      name: 'Technical term with capitalization handling',
      input: 'mama dhaenata Cyber Security paeththen degree ekak karanne.',
      expected: 'මම දැනට cyber security පැත්තෙන් degree එකක් කරන්නේ.',
      actual: 'මම දැනට Cය්බෙර් Security පැත්තෙන් degree එකක් කරන්නේ.',
      length: 'M',
      category: 'Technical terms / Capitalization normalization',
      grammarFocus: 'Simple sentence / Present tense',
      qualityFocus: 'Mixed term handling',
      description: "Inconsistent handling: 'Cyber' partially transliterated to 'Cය්බෙර්', 'Security' retained but should be 'security', 'degree' correctly retained.",
      expectedStatus: 'Fail'
    },

  
    {
      id: 'Pos_Fun_0008',
      name: 'Mixed language with intentional English retention',
      input: 'Hi bro, api adha raeeta set vemudha?',
      expected: 'Hi bro, අපි අද රෑට set වෙමුද?',
      actual: 'හි bro, අපි අද රෑට සෙට් වෙමුද?',
      length: 'S',
      category: 'Code-mixing / Greeting handling',
      grammarFocus: 'Simple sentence / Interrogative',
      qualityFocus: 'English retention rules',
      description: "System incorrectly transliterates 'Hi' to 'හි' but should retain it as English. 'set' should be retained but gets transliterated.",
      expectedStatus: 'Fail'
    },

    {
      id: 'Neg_Fun_0009',
      name: 'English-only input handling',
      input: 'The quick brown fox jumps over the lazy dog while the golden sun slowly sets behind the distant hills, painting the wide sky with beautiful shades of orange, pink, and purple, as birds fly back to their nests, leaves softly rustle in the cool evening breeze, distant sounds of nature fill the air, and the peaceful countryside slowly prepares for a calm and quiet night.',
      expected: 'error',
      length: 'L',
      category: 'Mixed Singlish + English',
      grammarFocus: 'Complex sentence',
      qualityFocus: 'Robustness validation',
      description: 'The input contains only Englih words without Singlish Structure. User is not informed about invalid input format.',
      expectedStatus: 'Fail'
    },
    {
      id: 'Neg_Fun_0010',
      name: 'Long',
      input: 'shriilQQkaaveeaDhYaapana kSheethrayeedijitalparivarthanayaveegayensidhuveminaetha.apithavadhuratathsampradhaayikapanthikaamharapamaNakBhaavithaanokara,antharjaalayaharaa aDhYaapanikasampathsiyaluLamunvethagenayaamatasaelasumkaramu.meyataavashYAthaakShaNikayatithalapahasukamsavikiriima,guruvaruntanaviinaupakaraNasahapuhuNuvalabaadhiimasahasiyalupaasalvalataaDhiveegiiantharjaalasambanDhathaavaklabaadhiimaapageepramuKaavaDhaanayayomuvii aetha.',
      expected: 'error',
      length: 'L',
      category: 'Missing spaces',
      grammarFocus: 'Complex sentence',
      qualityFocus: 'Robustness validation',
      description: 'It does not indicate a successful conversion or failure. System may fail to parse or transliterate correctly.',
      expectedStatus: 'Fail'
    },
  ],

  ui: [
    {
      id: 'Pos_UI_Fun_0001',
      name: 'Verify real time conversion updates Sinhala output automaatically.',
      input: 'mama heta udeeta gedhara yanavaa.',
      expected: '.Sinhala output updates live without button press .',
      length: 'S',
      category: 'Usability flow(real time conversion)',
      grammarFocus: 'Simple sentence',
      qualityFocus: 'Real time output update behavior',
      description: 'Real time conversion works correctly. UI is responsive with no lag.'
    },
    {
      id: 'Neg_UI_Fun_0001',
      name: 'Verify UI elements disappear/reappear incorrectly on resize',
      input: '',
      expected: 'All UI elements should remain visible and accessible after resize, no overlapping, hiding or misalignment.',
      length: '',
      category: '',
      grammarFocus: '',
      qualityFocus: 'Error handling / input validation',
      description: 'UI layout should be responsive and reflow correctly. Buttons and fields should remain clickable and tappable.',
      expectedStatus: 'Fail'
    }
  ]
};

// Helper Class
class TranslatorPage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByPlaceholder(CONFIG.selectors.inputField);
  }

  async getOutputField() {
    return this.page.locator(CONFIG.selectors.outputContainer).first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.fill('');
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text: string) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      (selector) => {
        const elements = Array.from(document.querySelectorAll(selector));
        const output = elements.find(el => {
          const isInput = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInput && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      CONFIG.selectors.outputContainer,
      { timeout: 12000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text ? text.trim() : '';
  }

  async performTranslation(inputText: string) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// ===================== TEST SUITE =====================
test.describe('Singlish Translator', () => {
  let translator: TranslatorPage;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // --------- Positive Functional Tests ---------
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // --------- Negative Functional Tests ---------
  test.describe('Negative Functional Tests', () => {
    const sinhalaRegex = /[\u0D80-\u0DFF]/; // Matches Sinhala Unicode characters

    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.id} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);

        // FAIL if translator produces any Sinhala output
        const hasSinhala = sinhalaRegex.test(actualOutput);
        expect(hasSinhala).toBe(false);

        // Optional: also fail if output is non-empty
        expect(actualOutput.length).toBe(0);

        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  test.describe('SwiftTranslator - UI Functionality Tests', () => {

  
    test('Pos_UI_Fun_0001 - Verify real-time conversion updates Sinhala output automatically', async ({ page }) => {

      await page.goto('https://www.swifttranslator.com/');





      // Input field
      const singlishInput = page.getByPlaceholder('Input Your Singlish Text Here.');
      await expect(singlishInput).toBeVisible();

      // Type the text
      await singlishInput.fill('mama heta udeeta gedhara yanavaa.');

      // Wait for conversion
      await page.waitForTimeout(2000);

      // Find ANY element that contains Sinhala text
      const sinhalaOutput = page.locator('*').filter({
        hasText: /[\u0D80-\u0DFF]/ // Matches Sinhala Unicode range
      }).first();

      // Wait for it to appear
      await expect(sinhalaOutput).toBeVisible({ timeout: 10000 });

      // Get the output text
      const outputText = await sinhalaOutput.textContent();
      console.log('Found Sinhala output:', outputText?.substring(0, 50));

      // Assertions
      expect(outputText?.trim().length).toBeGreaterThan(0);
      expect(outputText).toMatch(/[\u0D80-\u0DFF]/);

    });
   
    // NEGATIVE UI TEST
    test('Neg_UI_Fun_0001 - Verify UI elements disappear/reappear incorrectly on resize', async ({ page }) => {
      await page.goto('https://www.swifttranslator.com/');

      // Resize to extreme small screen
      await page.setViewportSize({ width: 250, height: 350 });
      await page.waitForTimeout(1000);

      const allTextAreas = page.locator('textarea');

      //  Negative expectation (intentionally incorrect)
      await expect(allTextAreas.first()).not.toBeVisible();
    });



  });
});

