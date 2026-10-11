// The source library. Lessons and the AI tutor may only cite entries from here.
// Any classical language is welcome (Sanskrit, Tamil, Hindi/Awadhi, Telugu,
// Kannada...) as long as it's relevant to what the learner is studying.
// kind "verse": original text (sa = original script, olang = its language code,
//   default "sa"; iast = romanized) + a dharmAI translation (en).
//   Translations are our own plain-English renderings.
// kind "summary": a short summary of a work's position. NOT a quotation.
// kind "tradition": a practice or story passed down in communities, not from one text.
DH.SOURCES = {
  "bs-1.1.1": {
    kind: "verse", work: "Brahma Sūtra", ref: "1.1.1",
    sa: "अथातो ब्रह्मजिज्ञासा ।",
    iast: "athāto brahma-jijñāsā",
    en: "Now, therefore, the inquiry into Brahman.",
    tags: "brahman inquiry vedanta start question sutra badarayana"
  },
  "bs-1.1.2": {
    kind: "verse", work: "Brahma Sūtra", ref: "1.1.2",
    sa: "जन्माद्यस्य यतः ।",
    iast: "janmādy asya yataḥ",
    en: "(Brahman is that) from which the origin and so on (sustenance and dissolution) of this world come.",
    tags: "brahman cause world creation origin definition"
  },
  "tu-2.1": {
    kind: "verse", work: "Taittirīya Upaniṣad", ref: "2.1.1",
    sa: "सत्यं ज्ञानमनन्तं ब्रह्म ।",
    iast: "satyaṃ jñānam anantaṃ brahma",
    en: "Brahman is reality, knowledge, infinite.",
    tags: "brahman nature definition reality knowledge infinite upanishad"
  },
  "tu-3.1": {
    kind: "verse", work: "Taittirīya Upaniṣad", ref: "3.1.1",
    sa: "यतो वा इमानि भूतानि जायन्ते । येन जातानि जीवन्ति । यत्प्रयन्त्यभिसंविशन्ति । तद्विजिज्ञासस्व । तद्ब्रह्म ।",
    iast: "yato vā imāni bhūtāni jāyante, yena jātāni jīvanti, yat prayanty abhisaṃviśanti, tad vijijñāsasva, tad brahma",
    en: "That from which these beings are born, by which, once born, they live, and into which they enter when they depart: seek to know that. That is Brahman.",
    tags: "brahman cause world creation varuna bhrigu upanishad"
  },
  "cu-6.8.7": {
    kind: "verse", work: "Chāndogya Upaniṣad", ref: "6.8.7",
    sa: "स य एषोऽणिमैतदात्म्यमिदं सर्वं तत्सत्यं स आत्मा तत्त्वमसि श्वेतकेतो ।",
    iast: "sa ya eṣo 'ṇimaitad-ātmyam idaṃ sarvaṃ tat satyaṃ sa ātmā tat tvam asi śvetaketo",
    en: "That which is the subtlest essence: this whole world has it as its self. That is the real. That is the self. You are that, Śvetaketu.",
    tags: "tat tvam asi you are that self atman brahman identity uddalaka svetaketu mahavakya advaita"
  },
  "cu-1.6.7": {
    kind: "verse", work: "Chāndogya Upaniṣad", ref: "1.6.7",
    sa: "तस्य यथा कप्यासं पुण्डरीकमेवमक्षिणी ।",
    iast: "tasya yathā kapyāsaṃ puṇḍarīkam evam akṣiṇī",
    en: "His eyes are like a kapyāsa lotus. (The word kapyāsa was read in very different ways; see the Rāmānuja story.)",
    tags: "kapyasa lotus eyes ramanuja yadavaprakasha monkey interpretation"
  },
  "bau-3.7.3": {
    kind: "verse", work: "Bṛhadāraṇyaka Upaniṣad", ref: "3.7.3",
    sa: "यः पृथिव्यां तिष्ठन्पृथिव्या अन्तरो यं पृथिवी न वेद यस्य पृथिवी शरीरं यः पृथिवीमन्तरो यमयत्येष त आत्मान्तर्याम्यमृतः ।",
    iast: "yaḥ pṛthivyāṃ tiṣṭhan pṛthivyā antaro yaṃ pṛthivī na veda yasya pṛthivī śarīraṃ yaḥ pṛthivīm antaro yamayaty eṣa ta ātmāntaryāmy amṛtaḥ",
    en: "He who dwells in the earth, yet is other than the earth, whom the earth does not know, whose body the earth is, who controls the earth from within: he is your self, the inner controller, the immortal.",
    tags: "antaryami inner controller body sharira brahman world ramanuja"
  },
  "mu-3.1.1": {
    kind: "verse", work: "Muṇḍaka Upaniṣad", ref: "3.1.1",
    sa: "द्वा सुपर्णा सयुजा सखाया समानं वृक्षं परिषस्वजाते । तयोरन्यः पिप्पलं स्वाद्वत्त्यनश्नन्नन्यो अभिचाकशीति ॥",
    iast: "dvā suparṇā sayujā sakhāyā samānaṃ vṛkṣaṃ pariṣasvajāte, tayor anyaḥ pippalaṃ svādv atty anaśnann anyo abhicākaśīti",
    en: "Two birds, companions and friends, cling to the same tree. One of them eats the sweet fruit; the other, not eating, simply watches.",
    tags: "two birds self god jiva paramatma distinct tree difference"
  },
  "su-1.12": {
    kind: "verse", work: "Śvetāśvatara Upaniṣad", ref: "1.12",
    sa: "एतज्ज्ञेयं नित्यमेवात्मसंस्थं नातः परं वेदितव्यं हि किञ्चित् । भोक्ता भोग्यं प्रेरितारं च मत्वा सर्वं प्रोक्तं त्रिविधं ब्रह्ममेतत् ॥",
    iast: "etaj jñeyaṃ nityam evātma-saṃsthaṃ nātaḥ paraṃ veditavyaṃ hi kiñcit, bhoktā bhogyaṃ preritāraṃ ca matvā sarvaṃ proktaṃ trividhaṃ brahmam etat",
    en: "This, resting in the self, is always to be known; beyond it there is nothing more to know. Knowing the enjoyer, the enjoyed, and the one who moves them, all this is declared to be the threefold Brahman.",
    tags: "tattva traya three realities cit acit ishvara enjoyer enjoyed controller threefold"
  },
  "bg-2.13": {
    kind: "verse", work: "Bhagavad Gītā", ref: "2.13",
    sa: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा । तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥",
    iast: "dehino 'smin yathā dehe kaumāraṃ yauvanaṃ jarā, tathā dehāntara-prāptir dhīras tatra na muhyati",
    en: "Just as the embodied self passes through childhood, youth and old age in this body, so it passes on to another body. The wise are not confused by this.",
    tags: "self body rebirth atman change death soul"
  },
  "bg-2.20": {
    kind: "verse", work: "Bhagavad Gītā", ref: "2.20",
    sa: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः । अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
    iast: "na jāyate mriyate vā kadācin nāyaṃ bhūtvā bhavitā vā na bhūyaḥ, ajo nityaḥ śāśvato 'yaṃ purāṇo na hanyate hanyamāne śarīre",
    en: "It is never born and it never dies. It did not come into being and will not cease to be. Unborn, eternal, everlasting, ancient: it is not killed when the body is killed.",
    tags: "self eternal soul death unborn atman"
  },
  "bg-7.19": {
    kind: "verse", work: "Bhagavad Gītā", ref: "7.19",
    sa: "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते । वासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥",
    iast: "bahūnāṃ janmanām ante jñānavān māṃ prapadyate, vāsudevaḥ sarvam iti sa mahātmā sudurlabhaḥ",
    en: "At the end of many births, the wise one takes refuge in me, knowing 'Vāsudeva is everything.' Such a great soul is very rare.",
    tags: "vasudeva everything krishna devotion refuge wise all"
  },
  "bg-15.7": {
    kind: "verse", work: "Bhagavad Gītā", ref: "15.7",
    sa: "ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥",
    iast: "mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ, manaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati",
    en: "An eternal part of me, become a living self in the world of living beings, draws to itself the senses, with the mind as the sixth, which rest in nature.",
    tags: "jiva part amsha self god relation individual eternal"
  },
  "bg-18.65": {
    kind: "verse", work: "Bhagavad Gītā", ref: "18.65",
    sa: "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु । मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥",
    iast: "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru, mām evaiṣyasi satyaṃ te pratijāne priyo 'si me",
    en: "Fix your mind on me, be devoted to me, worship me, bow to me. You will come to me; I promise you truly, for you are dear to me.",
    tags: "bhakti devotion love worship promise"
  },
  "bg-18.66": {
    kind: "verse", work: "Bhagavad Gītā", ref: "18.66",
    sa: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    iast: "sarva-dharmān parityajya mām ekaṃ śaraṇaṃ vraja, ahaṃ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ",
    en: "Letting go of all dharmas, take refuge in me alone. I will free you from all sins. Do not grieve.",
    tags: "surrender prapatti sharanagati charama shloka refuge liberation moksha"
  },
  "dm-5": {
    kind: "verse", work: "Devī Māhātmya", ref: "ch. 5 (hymn of the gods)",
    sa: "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता । नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥",
    iast: "yā devī sarva-bhūteṣu śakti-rūpeṇa saṃsthitā, namas tasyai namas tasyai namas tasyai namo namaḥ",
    en: "To the Goddess who dwells in all beings in the form of power: salutations to her, salutations to her, salutations to her, again and again.",
    tags: "devi goddess shakti durga navaratri hymn all beings power"
  },
  "dm-11": {
    kind: "verse", work: "Devī Māhātmya", ref: "ch. 11 (Nārāyaṇī hymn)",
    sa: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
    iast: "sarva-maṅgala-māṅgalye śive sarvārtha-sādhike, śaraṇye tryambake gauri nārāyaṇi namo 'stu te",
    en: "Auspiciousness of all that is auspicious, gracious one, who brings every aim to fulfilment, our refuge, three-eyed Gaurī, Nārāyaṇī: salutations to you.",
    tags: "devi narayani goddess navaratri hymn refuge auspicious"
  },
  "sarasvati-prayer": {
    kind: "tradition", work: "Traditional prayer to Sarasvatī", ref: "widely recited",
    sa: "सरस्वति नमस्तुभ्यं वरदे कामरूपिणि । विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥",
    iast: "sarasvati namas tubhyaṃ varade kāma-rūpiṇi, vidyārambhaṃ kariṣyāmi siddhir bhavatu me sadā",
    en: "Sarasvatī, salutations to you, giver of boons, who takes any form she wishes. I am beginning my studies; may I always succeed.",
    tags: "sarasvati saraswati learning study vidyarambham navaratri prayer"
  },
  "tvm-1.1.1": {
    kind: "verse", work: "Nammāḻvār, Tiruvāymoḻi", ref: "1.1.1", olang: "ta",
    sa: "உயர்வற உயர்நலம் உடையவன் யவனவன் மயர்வற மதிநலம் அருளினன் யவனவன் அயர்வறும் அமரர்கள் அதிபதி யவனவன் துயரறு சுடரடி தொழுதெழென் மனனே",
    iast: "uyarvaṟa uyar nalam uṭaiyavaṉ yavaṉ avaṉ, mayarvaṟa mati nalam aruḷiṉaṉ yavaṉ avaṉ, ayarvaṟum amararkaḷ atipati yavaṉ avaṉ, tuyaraṟu cuṭar aṭi toḻutu eḻu eṉ maṉaṉē",
    en: "He who has the highest good, with nothing higher; he who graciously gave me clear understanding, free of confusion; he who is lord of the tireless immortals: my mind, worship his radiant feet that end all sorrow, and rise.",
    tags: "nammalvar tiruvaymoli alvar tamil divya prabandham auspicious qualities kalyana guna god narayana srivaishnava vadakalai tenkalai"
  },
  "tiruppavai-1": {
    kind: "verse", work: "Āṇṭāḷ, Tiruppāvai", ref: "1 (opening lines)", olang: "ta",
    sa: "மார்கழித் திங்கள் மதிநிறைந்த நன்னாளால் நீராடப் போதுவீர் போதுமினோ நேரிழையீர்",
    iast: "mārkaḻit tiṅkaḷ mati niṟainta naṉṉāḷāl, nīrāṭap pōtuvīr pōtumiṉō nēriḻaiyīr",
    en: "In the month of Mārgaḻi, on this fine day of the full moon, you who wish to come bathe, come along, you girls with lovely jewels!",
    tags: "andal tiruppavai margazhi alvar tamil woman divya prabandham srivaishnava"
  },
  "tulsidas-angada": {
    kind: "summary", work: "Tulsīdās, Rāmcaritmānas", ref: "Laṅkā Kāṇḍ (Awadhi, 16th century)",
    en: "In Tulsīdās's Awadhi retelling, Angada goes to Rāvaṇa's court as Rāma's envoy, plants his foot and challenges anyone to move it; none of the warriors can. This famous scene is from Tulsīdās and the Rāmlīlā tradition. In Vālmīki's Sanskrit Rāmāyaṇa, Angada instead delivers the message, is seized by guards, and leaps free, breaking part of the palace roof.",
    tags: "angada tulsidas ramcharitmanas ramlila foot ravana court envoy valmiki ramayana hindi awadhi dussehra"
  },
  "ramanuja-sribhashya": {
    kind: "summary", work: "Rāmānuja, Śrī Bhāṣya", ref: "commentary on the Brahma Sūtras",
    en: "Rāmānuja's main commentary on the Brahma Sūtras. It argues that Brahman (Nārāyaṇa) is real, full of good qualities, and has conscious selves and matter as its body. It also contains a long critique of the Advaita view that the world is a product of ignorance (avidyā).",
    tags: "ramanuja sri bhashya commentary vishishtadvaita brahma sutra critique advaita avidya"
  },
  "ramanuja-vedarthasangraha": {
    kind: "summary", work: "Rāmānuja, Vedārtha Saṅgraha", ref: "independent treatise",
    en: "A shorter essay by Rāmānuja summarizing how he reads the Upaniṣads, including texts like 'tat tvam asi', through the idea that Brahman has the world and selves as its body.",
    tags: "ramanuja vedartha sangraha tat tvam asi body coreference samanadhikaranya"
  },
  "ramanuja-gitabhashya": {
    kind: "summary", work: "Rāmānuja, Gītā Bhāṣya", ref: "commentary on the Bhagavad Gītā",
    en: "Rāmānuja's commentary on the Gītā. It reads the Gītā as teaching that loving devotion (bhakti) to Nārāyaṇa, supported by right action and knowledge, leads to liberation, and that the Lord is the self of all.",
    tags: "ramanuja gita bhashya bhakti devotion karma jnana"
  },
  "ramanuja-gadya": {
    kind: "summary", work: "Rāmānuja, Śaraṇāgati Gadya", ref: "prose prayer",
    en: "A prose prayer traditionally attributed to Rāmānuja, in which he takes refuge (śaraṇāgati) in Nārāyaṇa together with Śrī (Lakṣmī). It is central to the Śrīvaiṣṇava practice of surrender.",
    tags: "saranagati gadya surrender prapatti lakshmi sri ramanuja"
  },
  "desika": {
    kind: "summary", work: "Vedānta Deśika (Vadakalai tradition)", ref: "e.g. Rahasya Traya Sāra",
    en: "Vedānta Deśika (traditionally 1268–1369) is the great teacher of the Vadakalai tradition. He treats surrender (prapatti) as a deliberate act the seeker performs, supported by the Lord's grace: the 'baby monkey' (markaṭa) model.",
    tags: "vedanta desika vadakalai prapatti markata monkey rahasya traya sara"
  },
  "pillai-lokacarya": {
    kind: "summary", work: "Piḷḷai Lokācārya and Maṇavāḷa Māmuni (Tenkalai tradition)", ref: "e.g. Śrīvacana Bhūṣaṇam",
    en: "Piḷḷai Lokācārya and later Maṇavāḷa Māmuni are the great teachers of the Tenkalai tradition. They stress that the Lord's grace alone saves, and even surrender is not a means the soul provides: the 'kitten' (mārjāra) model.",
    tags: "pillai lokacharya manavala mamuni tenkalai prapatti marjara cat kitten srivacana bhushanam"
  },
  "alvars": {
    kind: "summary", work: "The Āḻvārs, Nālāyira Divya Prabandham", ref: "Tamil hymns, compiled by Nāthamuni",
    en: "The twelve Āḻvārs were Tamil poet-saints devoted to Viṣṇu (historians place them roughly in the 6th to 9th centuries CE). Their 4,000 hymns, the Nālāyira Divya Prabandham, were collected by Nāthamuni. Śrīvaiṣṇavas treat these Tamil hymns as scripture alongside the Sanskrit Vedas, which is why the tradition is called 'Ubhaya Vedānta' (two-fold Vedānta).",
    tags: "alvars nammalvar andal divya prabandham tamil nathamuni ubhaya vedanta history tiruvaymoli"
  },
  "ramanuja-life": {
    kind: "tradition", work: "Traditional biographies of Rāmānuja", ref: "e.g. Guruparamparā accounts",
    en: "Traditional accounts say Rāmānuja was born in Śrīperumbudūr (traditionally 1017, living 120 years), studied first under the teacher Yādavaprakāśa, later led the Śrīraṅgam community, and spread Śrīvaiṣṇava teaching widely, including a period in Karnataka (Melkote). Historians debate the exact dates.",
    tags: "ramanuja life biography sriperumbudur srirangam melkote yadavaprakasha history dates"
  },
  "advaita-summary": {
    kind: "summary", work: "Advaita Vedānta (Śaṅkara)", ref: "overview",
    en: "Advaita Vedānta, systematized by Śaṅkara (c. 8th century), holds that Brahman alone is ultimately real, that the individual self (ātman) is identical with Brahman, and that the world of many things appears through māyā/avidyā.",
    tags: "advaita shankara non dual maya avidya identity brahman atman"
  },
  "dvaita-summary": {
    kind: "summary", work: "Dvaita Vedānta (Madhva)", ref: "overview",
    en: "Dvaita Vedānta, founded by Madhva (traditionally 1238–1317), holds that God (Viṣṇu), individual selves and matter are eternally distinct, summed up in five kinds of difference (pañca-bheda). Selves depend completely on God.",
    tags: "dvaita madhva dualism difference pancha bheda vishnu"
  },
  "navaratri-practice": {
    kind: "tradition", work: "Navarātri customs", ref: "regional practice; varies by family",
    en: "Navarātri is celebrated very differently across regions: Golu/Kolu doll displays in Tamil Nadu, Karnataka and Andhra; Durgā Pūjā in Bengal; Garbā and Daṇḍiyā in Gujarat; Rāmlīlā ending in Dussehra in much of North India; Dasara in Mysuru; Bathukamma in Telangana; and Vidyārambham in Kerala. Families also differ on details.",
    tags: "navaratri golu kolu bommai durga puja garba dandiya ramlila dussehra dasara bathukamma vidyarambham regional customs"
  },
  "devi-mahatmya-summary": {
    kind: "summary", work: "Devī Māhātmya", ref: "Mārkaṇḍeya Purāṇa, about 700 verses in 13 chapters",
    en: "The Devī Māhātmya (also called Durgā Saptaśatī or Caṇḍī Pāṭh) is a text of about 700 verses in 13 chapters, found within the Mārkaṇḍeya Purāṇa. Scholars often date it to around the 5th or 6th century CE. It tells three stories of the Goddess defeating demons: Madhu and Kaiṭabha, Mahiṣāsura, and Śumbha and Niśumbha.",
    tags: "devi mahatmya durga saptashati chandi markandeya purana mahishasura madhu kaitabha shumbha nishumbha raktabija navaratri"
  }
};
