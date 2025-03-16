export const nordicLessons = {
  basic: [
    // Home row basics
    "fff jjj fff jjj",
    "asdf jklö asdf jklö",
    "fj dk sl öa fj dk sl öa",
    
    // Nordic characters introduction
    "åäö åäö åäö åäö",
    "så då nå gå lå",
    "här där får går står",
    
    // Common combinations
    "öka söka höka löka",
    "ärtsoppa värkar märker",
    "åska låda måla våga",
    
    // Mixed practice
    "högt lågt sålt värt",
    
    // Additional Basic Sentences
    "solen skiner idag",
    "månen lyser klart",
    "huset är blått",
    "katter sover mjukt",
    "fåglarna sjunger högt",
    "blommor växer snabbt",
    "trädens löv faller",
    "bilar kör långsamt",
    "barn leker ute",
    "hunden springer fort"
  ],
  
  intermediate: [
    // Common Swedish words
    "hej och välkommen hit",
    "tack så mycket för idag",
    "det är en fin dag idag",
    "jag ska gå till affären",
    "klockan är tre på dagen",
    
    // Letter combinations
    "stjärna sjö sjunga skön",
    "björk träd skog ängar",
    "över under genom från",
    "mellan bakom framför på",
    "först sist nästa förra",
    
    // Thematic content: Everyday Activities
    "Jag lagar mat varje dag",
    "Vi handlar i mataffären",
    "Han cyklar till jobbet",
    "De tvättar kläderna tillsammans",
    "Hon bakar bröd på morgonen",
    
    // Additional Intermediate Sentences
    "Vi går till parken ofta",
    "Solen går upp tidigt",
    "Barnen leker med bollar",
    "Pappa läser en bok",
    "Mamma lagar god mat",
    "Vi tittar på tecknat",
    "Bröderna spelar fotboll",
    "Systern målar ett hus",
    "Vi cyklar i trädgården",
    "Flickorna dansar glatt"
  ],
  
  advanced: [
    // Complex words
    "människor försöker förstå",
    "språk är fascinerande",
    "björnbär blåbär hallon",
    "kärlek glädje framgång",
    "höstlöv faller sakta ner",
    
    // Full sentences
    "Våren är här med sol och värme",
    "Köp färsk fisk från affären",
    "Åska hörs på långt håll",
    "Än är det långt kvar till mål",
    "Önskar dig en trevlig dag",
    
    // Thematic content: Nature
    "Blommorna blommar i vårsolen",
    "Träden står gröna under sommaren",
    "Fåglarna sjunger i morgonljuset",
    "Regnet faller mjukt på marken",
    "Snön ligger vit och tjock på bergen",
    
    // Additional Advanced Sentences
    "Morgonen börjar med fågelsång",
    "Sommaren är fylld av soliga dagar",
    "Efteråret färgar löven i rött och gult",
    "Vintrarna är kalla och snötäckta",
    "Bäckarna rinner snabbt genom skogen",
    "Fjällen majestätiskt reser sig högt",
    "Sjöar glittrar i solnedgången",
    "Skymningen målar himlen orange",
    "Dagarna blir längre på våren",
    "Nätterna är stilla och mörka"
  ],
  
  practice: [
    // Classic pangrams
    "Yxskaftbud, få vår whisky-qvart genöm tull",
    "Flygande bäckasiner söka hwila på mjuka tuvor",
    "Kära öde, ge vår säl fin mjuk qvist",
    "Höj ditt välde, färgstarka öga på qvistens zenit",
    
    // Modern practice texts
    "Åska över ön är sällsynt på våren",
    "Södra Sverige får mycket regn i år",
    "Björnen sover gott i sitt ide",
    "Älgen står stilla i skogsbrynet",
    "Över ån simmar en grå gås",
    "Hösten kommer med färgsprakande löv",
    
    // Thematic practice: Everyday Activities
    "Jag ska läsa en bok ikväll",
    "De tittar på en film tillsammans",
    "Han spelar gitarr i sitt hem",
    "Vi planerar en resa till fjällen",
    "Hon ringer sin vän för att prata",
    
    // Additional Practice Sentences
    "Barnen bygger sandslott på stranden",
    "Vi bakar kakor varje lördag",
    "Pappa planterar blommor i trädgården",
    "Mamma syr nya kläder till oss",
    "Flickorna leker med sina dockor",
    "Bröderna fixar cyklarna själva",
    "Systern ritar vackra bilder",
    "Vi spelar spel på kvällarna",
    "Hunden jagar bollar i parken",
    "Katterna spinner nöjt i solen"
  ]
};

export type LessonSet = {
  basic: string[];
  practice: string[];
  intermediate?: string[];
  advanced?: string[];
};
