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
  // ---- Advaita ----
  "bau-1.4.10": {
    kind: "verse", work: "Bṛhadāraṇyaka Upaniṣad", ref: "1.4.10",
    sa: "अहं ब्रह्मास्मि ।",
    iast: "ahaṃ brahmāsmi",
    en: "I am Brahman.",
    tags: "aham brahmasmi i am brahman mahavakya great saying yajur veda advaita identity"
  },
  "ait-3.3": {
    kind: "verse", work: "Aitareya Upaniṣad", ref: "3.3",
    sa: "प्रज्ञानं ब्रह्म ।",
    iast: "prajñānaṃ brahma",
    en: "Consciousness is Brahman.",
    tags: "prajnanam brahma consciousness mahavakya great saying rig veda advaita"
  },
  "man-2": {
    kind: "verse", work: "Māṇḍūkya Upaniṣad", ref: "2",
    sa: "सर्वं ह्येतद् ब्रह्मायमात्मा ब्रह्म सोऽयमात्मा चतुष्पात् ।",
    iast: "sarvaṃ hy etad brahmāyam ātmā brahma so 'yam ātmā catuṣpāt",
    en: "All this is Brahman. This self is Brahman. This self has four quarters.",
    tags: "ayam atma brahma mahavakya great saying atharva veda mandukya four quarters waking dream sleep turiya advaita"
  },
  "bau-2.3.6": {
    kind: "verse", work: "Bṛhadāraṇyaka Upaniṣad", ref: "2.3.6",
    sa: "अथात आदेशो नेति नेति ।",
    iast: "athāta ādeśo neti neti",
    en: "Now, therefore, the teaching: 'not this, not this.'",
    tags: "neti neti not this negation brahman beyond description advaita"
  },
  "bau-2.4.5": {
    kind: "verse", work: "Bṛhadāraṇyaka Upaniṣad", ref: "2.4.5",
    sa: "आत्मा वा अरे द्रष्टव्यः श्रोतव्यो मन्तव्यो निदिध्यासितव्यो मैत्रेयि ।",
    iast: "ātmā vā are draṣṭavyaḥ śrotavyo mantavyo nididhyāsitavyo maitreyi",
    en: "It is the self, Maitreyī, that should be seen, heard about, reflected on and deeply meditated upon.",
    tags: "sravana manana nididhyasana hearing reflection meditation yajnavalkya maitreyi path knowledge advaita"
  },
  "bg-2.16": {
    kind: "verse", work: "Bhagavad Gītā", ref: "2.16",
    sa: "नासतो विद्यते भावो नाभावो विद्यते सतः । उभयोरपि दृष्टोऽन्तस्त्वनयोस्तत्त्वदर्शिभिः ॥",
    iast: "nāsato vidyate bhāvo nābhāvo vidyate sataḥ, ubhayor api dṛṣṭo 'ntas tv anayos tattva-darśibhiḥ",
    en: "The unreal has no being, and the real never ceases to be. Those who see the truth have seen the final word on both.",
    tags: "real unreal sat asat being reality truth"
  },
  "cu-6.1.4": {
    kind: "verse", work: "Chāndogya Upaniṣad", ref: "6.1.4",
    sa: "यथा सोम्यैकेन मृत्पिण्डेन सर्वं मृन्मयं विज्ञातं स्याद्वाचारम्भणं विकारो नामधेयं मृत्तिकेत्येव सत्यम् ।",
    iast: "yathā somyaikena mṛt-piṇḍena sarvaṃ mṛn-mayaṃ vijñātaṃ syād vācārambhaṇaṃ vikāro nāmadheyaṃ mṛttikety eva satyam",
    en: "Just as, dear one, by knowing one lump of clay, everything made of clay is known: the changed form is just a matter of words, a name. The truth is: it is only clay.",
    tags: "clay pot name form mithya world real brahman uddalaka advaita"
  },
  "brahma-satyam": {
    kind: "tradition", work: "Famous summary of Advaita", ref: "traditionally attributed to Śaṅkara",
    sa: "ब्रह्म सत्यं जगन्मिथ्या जीवो ब्रह्मैव नापरः ।",
    iast: "brahma satyaṃ jagan mithyā jīvo brahmaiva nāparaḥ",
    en: "Brahman is real; the world is mithyā (not ultimately real); the individual self is Brahman itself, not other.",
    tags: "brahma satyam jagan mithya world illusion advaita summary shankara"
  },
  "shankara-life": {
    kind: "tradition", work: "Traditional biographies of Śaṅkara", ref: "e.g. the Śaṅkara-digvijaya accounts",
    en: "Tradition says Śaṅkara was born in Kāladi, Kerala, became a renunciant as a boy, studied under Govinda Bhagavatpāda (a student of Gauḍapāda), traveled across India debating, and founded four monasteries (maṭhas). Traditional dates are 788–820 CE; many historians place him somewhat earlier in the 8th century.",
    tags: "shankara life kaladi crocodile govinda gaudapada mandana mishra debate mathas sringeri dwarka puri jyotirmath history"
  },
  "shankara-bsb": {
    kind: "summary", work: "Śaṅkara, Brahma Sūtra Bhāṣya", ref: "commentary on the Brahma Sūtras",
    en: "Śaṅkara's main commentary on the Brahma Sūtras. It opens by explaining 'superimposition' (adhyāsa): mistaking one thing for another, as when a rope is seen as a snake. It argues that the self is Brahman and that knowledge, not ritual action, is what liberates.",
    tags: "shankara brahma sutra bhashya adhyasa superimposition rope snake knowledge liberation advaita"
  },
  "gaudapada": {
    kind: "summary", work: "Gauḍapāda, Māṇḍūkya Kārikā", ref: "verses on the Māṇḍūkya Upaniṣad",
    en: "Gauḍapāda, the teacher of Śaṅkara's teacher, wrote verses on the Māṇḍūkya Upaniṣad. He compares the waking world to a dream and teaches that the self is the 'fourth' (turīya), beyond waking, dreaming and deep sleep.",
    tags: "gaudapada mandukya karika dream waking turiya advaita"
  },
  "advaita-path": {
    kind: "summary", work: "The Advaita path of knowledge", ref: "as taught by Śaṅkara and later Advaita teachers",
    en: "Advaita teaches a path of knowledge (jñāna). A seeker first needs four qualifications: discrimination between the lasting and the passing (viveka), dispassion (vairāgya), six inner virtues such as calm and self-control, and a longing for freedom (mumukṣutva). Then comes hearing the teaching (śravaṇa), reflecting on it (manana) and deep meditation (nididhyāsana). Good action and devotion purify the mind and prepare it for knowledge.",
    tags: "sadhana chatushtaya viveka vairagya mumukshutva sravana manana nididhyasana karma bhakti purify jnana path advaita"
  },
  "ramana": {
    kind: "summary", work: "Ramaṇa Maharṣi", ref: "teacher at Tiruvaṇṇāmalai, 1879–1950",
    en: "Ramaṇa Maharṣi, a modern sage at Tiruvaṇṇāmalai in Tamil Nadu, taught 'self-inquiry': asking 'Who am I?' and tracing the sense of 'I' back to its source. His teaching is often seen as a direct, living form of Advaita.",
    tags: "ramana maharshi who am i self inquiry tiruvannamalai modern advaita jivanmukti"
  },
  // ---- Dvaita ----
  "katha-2.2.13": {
    kind: "verse", work: "Kaṭha Upaniṣad", ref: "2.2.13",
    sa: "नित्यो नित्यानां चेतनश्चेतनानाम् एको बहूनां यो विदधाति कामान् ।",
    iast: "nityo nityānāṃ cetanaś cetanānām eko bahūnāṃ yo vidadhāti kāmān",
    en: "The eternal among eternals, the conscious among the conscious, the one among many, who grants their desires.",
    tags: "eternal among eternals one among many god souls distinct dvaita madhva katha"
  },
  "bg-15.16-18": {
    kind: "verse", work: "Bhagavad Gītā", ref: "15.16–18",
    sa: "द्वाविमौ पुरुषौ लोके क्षरश्चाक्षर एव च । क्षरः सर्वाणि भूतानि कूटस्थोऽक्षर उच्यते ॥ उत्तमः पुरुषस्त्वन्यः परमात्मेत्युदाहृतः । … अतोऽस्मि लोके वेदे च प्रथितः पुरुषोत्तमः ॥",
    iast: "dvāv imau puruṣau loke kṣaraś cākṣara eva ca, kṣaraḥ sarvāṇi bhūtāni kūṭastho 'kṣara ucyate; uttamaḥ puruṣas tv anyaḥ paramātmety udāhṛtaḥ … ato 'smi loke vede ca prathitaḥ puruṣottamaḥ",
    en: "There are two kinds of beings in the world, the perishable and the imperishable. All beings are perishable; the unchanging is called imperishable. But the highest being is another, called the Supreme Self … therefore I am known in the world and in the Veda as Puruṣottama, the Supreme Person.",
    tags: "purushottama supreme person three beings perishable imperishable god distinct dvaita gita chapter 15"
  },
  "madhva-life": {
    kind: "tradition", work: "Traditional biographies of Madhva", ref: "e.g. Nārāyaṇa Paṇḍita's Sumadhvavijaya",
    en: "Tradition says Madhva was born at Pājaka near Udupi in Karnataka, named Vāsudeva (usually dated 1238–1317; some scholars prefer 1199–1278). He studied under Acyutaprekṣa, an Advaita teacher, but came to disagree. As a monk he was named Pūrṇaprajña and later Ānandatīrtha. He installed the famous Kṛṣṇa image at Udupi and founded eight monasteries there. Followers revere him as an incarnation of Vāyu, the wind god, like Hanumān and Bhīma before him.",
    tags: "madhva life udupi pajaka vasudeva achyutapreksha purnaprajna anandatirtha krishna matha ashta matha vayu hanuman bhima history"
  },
  "madhva-works": {
    kind: "summary", work: "Madhva's works (Sarvamūla Granthas)", ref: "37 works",
    en: "Madhva wrote 37 works, together called the Sarvamūla Granthas, including commentaries on the Brahma Sūtras, the Gītā and the Upaniṣads, and the Mahābhārata Tātparya Nirṇaya, a summary of the Mahābhārata's meaning. He called his own philosophy Tattvavāda, 'the doctrine of reality'.",
    tags: "madhva works sarvamula granthas 37 commentary brahma sutra gita upanishad mahabharata tatparya nirnaya tattvavada"
  },
  "dvaita-doctrine": {
    kind: "summary", work: "Core teachings of Dvaita", ref: "as taught by Madhva and his tradition",
    en: "Dvaita teaches five real, eternal differences (pañca-bheda): between God and souls, God and matter, one soul and another, souls and matter, and one piece of matter and another. Viṣṇu alone is independent (svatantra); everything else is dependent (paratantra). The soul is like a reflection (pratibimba) of God (bimba): real, but wholly dependent on the original. The world is real, not an illusion.",
    tags: "pancha bheda five differences svatantra paratantra independent dependent bimba pratibimba reflection world real dvaita madhva"
  },
  "madhva-tat-tvam-asi": {
    kind: "summary", work: "Madhva's reading of 'tat tvam asi'", ref: "commentary on the Chāndogya Upaniṣad",
    en: "Madhva reads the Chāndogya passage so that it does not teach identity. One famous reading splits the Sanskrit differently: 'sa ātmā atat tvam asi', 'that is the self; you are NOT that'. He also explains the phrase as expressing the soul's likeness to and dependence on God, not sameness.",
    tags: "madhva tat tvam asi atat tvam asi chandogya reading identity difference dvaita"
  },
  "taratamya": {
    kind: "summary", work: "Tāratamya: gradation among souls", ref: "a distinctive Dvaita teaching",
    en: "Madhva taught tāratamya, a gradation among beings: Viṣṇu is supreme, then Lakṣmī, then the other gods and souls in rank. Each soul has its own innate nature (svarūpa), and even liberated souls differ in the bliss they enjoy. He also taught that some souls are not destined for liberation, one of the most debated ideas in Indian philosophy.",
    tags: "taratamya gradation hierarchy souls svarupa liberation bliss differ eternal souls dvaita madhva debated"
  },
  "vyasatirtha": {
    kind: "summary", work: "Vyāsatīrtha and Madhusūdana Sarasvatī", ref: "16th-century debate",
    en: "Vyāsatīrtha (1460–1539), a great Dvaita scholar, wrote the Nyāyāmṛta, a sharp critique of Advaita. The Advaita scholar Madhusūdana Sarasvatī replied with the Advaitasiddhi, and the debate continued for generations: one of the great long-running arguments in Indian philosophy.",
    tags: "vyasatirtha nyayamrta madhusudana sarasvati advaitasiddhi debate dvaita advaita history jayatirtha"
  },
  "haridasas": {
    kind: "tradition", work: "The Haridāsa movement", ref: "Kannada devotional singers, 15th–16th century",
    en: "The Haridāsas ('servants of Hari') spread Dvaita devotion through songs in Kannada, not just Sanskrit. Purandaradāsa, a student of Vyāsatīrtha, is called the grandfather of Carnatic music. A famous story says that when Kanakadāsa was kept out of the Udupi temple, Kṛṣṇa turned to face him through a small window, still called 'Kanakana Kiṇḍi' (Kanaka's window).",
    tags: "haridasa purandaradasa kanakadasa kanakana kindi udupi kannada songs carnatic music dvaita bhakti"
  },
  // ---- Science ----
  "panini-1.1.1": {
    kind: "verse", work: "Pāṇini, Aṣṭādhyāyī", ref: "1.1.1–2",
    sa: "वृद्धिरादैच् । अदेङ् गुणः ।",
    iast: "vṛddhir ādaic | adeṅ guṇaḥ",
    en: "'vṛddhi' is the name for ā, ai and au. 'guṇa' is the name for a, e and o. (The first two rules: Pāṇini defines technical labels for groups of sounds.)",
    tags: "panini ashtadhyayi grammar sutra rule vrddhi guna linguistics sanskrit technical term"
  },
  "panini-1.4.2": {
    kind: "verse", work: "Pāṇini, Aṣṭādhyāyī", ref: "1.4.2",
    sa: "विप्रतिषेधे परं कार्यम् ।",
    iast: "vipratiṣedhe paraṃ kāryam",
    en: "When two rules conflict, the later one applies.",
    tags: "panini conflict rule ordering meta rule later rule wins grammar algorithm"
  },
  "shiva-sutras": {
    kind: "verse", work: "Māheśvara (Śiva) Sūtras", ref: "first sūtra, used with Pāṇini's grammar",
    sa: "अइउण् । ऋऌक् । …",
    iast: "a i u ṇ | ṛ ḷ k | …",
    en: "Fourteen short lines listing the sounds of Sanskrit, each ending with a marker letter. By naming a start sound and a marker, Pāṇini can refer to a whole group: 'ak' means a, i, u, ṛ, ḷ.",
    tags: "shiva sutras maheshvara sutras pratyahara sound groups abbreviation panini compression linguistics"
  },
  "panini-summary": {
    kind: "summary", work: "Pāṇini, Aṣṭādhyāyī", ref: "c. 4th century BCE",
    en: "Pāṇini's Aṣṭādhyāyī ('eight chapters') describes Sanskrit in about 4,000 very short rules (sūtras). Starting from roots and endings, the rules apply step by step to generate correct words and sentences, with meta-rules that decide which rule applies when. Modern linguists compare it to generative grammar, and computer scientists to formal notations like Backus–Naur form.",
    tags: "panini ashtadhyayi generative grammar linguistics computer science backus naur chomsky rules sutras"
  },
  "lokavibhaga": {
    kind: "summary", work: "Lokavibhāga (Jain cosmology text)", ref: "dated 458 CE",
    en: "The Lokavibhāga, a Jain text on cosmology, is one of the earliest securely dated texts to use a decimal place-value system with a word for zero (śūnya, 'empty').",
    tags: "lokavibhaga jain place value decimal zero shunya earliest dated number system"
  },
  "brahmagupta-zero": {
    kind: "summary", work: "Brahmagupta, Brāhmasphuṭasiddhānta", ref: "628 CE, chapter 18",
    en: "Brahmagupta gave the first known rules for calculating with zero as a number: a number minus itself is zero; zero added to a number leaves it unchanged; a number times zero is zero. He also gave rules for negative numbers, which he called 'debts', and positive numbers, 'fortunes'. His rule for dividing by zero was not correct by modern standards.",
    tags: "brahmagupta brahmasphutasiddhanta zero rules arithmetic negative numbers debts fortunes 628 division by zero"
  },
  "numerals-travel": {
    kind: "summary", work: "How Indian numerals spread", ref: "historical overview",
    en: "Indian decimal numerals with zero were adopted by scholars writing in Arabic. Al-Khwārizmī wrote on 'Indian reckoning' in the 9th century, and Fibonacci promoted the system in Europe in his Liber Abaci (1202). That's why Europeans called them 'Arabic numerals'; Arabic writers often called them 'Indian numerals'.",
    tags: "hindu arabic numerals spread al khwarizmi fibonacci liber abaci europe arabic indian numerals history"
  },
  "baudhayana-diagonal": {
    kind: "verse", work: "Baudhāyana Śulba Sūtra", ref: "1.48 (numbering varies by edition)",
    sa: "दीर्घचतुरश्रस्याक्ष्णयारज्जुः पार्श्वमानी तिर्यङ्मानी च यत्पृथग्भूते कुरुतस्तदुभयं करोति ।",
    iast: "dīrgha-caturaśrasyākṣṇayā-rajjuḥ pārśvamānī tiryaṅmānī ca yat pṛthag-bhūte kurutas tad ubhayaṃ karoti",
    en: "The diagonal rope of a rectangle produces (an area equal to) both of what its length and width produce separately. In modern terms: the square on the diagonal equals the sum of the squares on the two sides.",
    tags: "baudhayana sulba sutra pythagorean theorem diagonal rectangle square geometry altar"
  },
  "baudhayana-root2": {
    kind: "verse", work: "Baudhāyana Śulba Sūtra", ref: "2.12 (numbering varies by edition)",
    sa: "प्रमाणं तृतीयेन वर्धयेत्तच्चतुर्थेनात्मचतुस्त्रिंशोनेन सविशेषः ।",
    iast: "pramāṇaṃ tṛtīyena vardhayet tac caturthenātma-catustriṃśonena saviśeṣaḥ",
    en: "Increase the measure by its third, and that (third) by its own fourth, less the thirty-fourth part of that; this is the diagonal (of a square), with a small excess. In numbers: √2 ≈ 1 + 1/3 + 1/(3×4) − 1/(3×4×34) ≈ 1.4142157.",
    tags: "baudhayana square root of 2 root two approximation sulba sutra diagonal of square"
  },
  "sulba-summary": {
    kind: "summary", work: "The Śulba Sūtras", ref: "c. 800–200 BCE",
    en: "The Śulba Sūtras ('rules of the cord') are manuals for building Vedic fire altars of exact shapes and areas using ropes and pegs. They include the diagonal rule (the 'Pythagorean' relationship), Pythagorean triples like 3-4-5 and 5-12-13, a close value for √2, and ways to turn a square into a circle of about the same area. The same diagonal relationship was also known independently elsewhere, for example in Babylon.",
    tags: "sulba sutras baudhayana apastamba katyayana altar geometry rope triples pythagorean babylon"
  },
  "aryabhata-pi": {
    kind: "verse", work: "Āryabhaṭa, Āryabhaṭīya", ref: "Gaṇitapāda 10 (499 CE)",
    sa: "चतुरधिकं शतमष्टगुणं द्वाषष्टिस्तथा सहस्राणाम् । अयुतद्वयविष्कम्भस्यासन्नो वृत्तपरिणाहः ॥",
    iast: "caturadhikaṃ śatam aṣṭaguṇaṃ dvāṣaṣṭis tathā sahasrāṇām, ayuta-dvaya-viṣkambhasyāsanno vṛtta-pariṇāhaḥ",
    en: "Add four to one hundred, multiply by eight, and add sixty-two thousand: this is the approximate (āsanna) circumference of a circle whose diameter is twenty thousand. That gives 62,832 ÷ 20,000 = 3.1416.",
    tags: "aryabhata aryabhatiya pi circumference diameter approximate asanna 3.1416 499"
  },
  "aryabhata-boat": {
    kind: "verse", work: "Āryabhaṭa, Āryabhaṭīya", ref: "Golapāda 9 (499 CE)",
    sa: "अनुलोमगतिर्नौस्थः पश्यत्यचलं विलोमगं यद्वत् । अचलानि भानि तद्वत् समपश्चिमगानि लङ्कायाम् ॥",
    iast: "anuloma-gatir nausthaḥ paśyaty acalaṃ vilomagaṃ yadvat, acalāni bhāni tadvat sama-paścima-gāni laṅkāyām",
    en: "Just as someone in a boat moving forward sees still objects (on the shore) moving backward, so the still stars are seen at the equator moving straight westward.",
    tags: "aryabhata earth rotation boat analogy relative motion stars move west physics astronomy"
  },
  "aryabhata-summary": {
    kind: "summary", work: "Āryabhaṭa, Āryabhaṭīya", ref: "499 CE",
    en: "Āryabhaṭa's Āryabhaṭīya, written when he was 23, covers arithmetic, algebra, trigonometry and astronomy in 121 verses. It gives π ≈ 3.1416, a table of sine differences, the idea that the Earth spins on its axis, and an explanation of eclipses as shadows cast by the Earth and Moon rather than a demon swallowing the Sun.",
    tags: "aryabhata aryabhatiya sine table jya trigonometry astronomy eclipses shadow earth rotation 499 kusumapura"
  },
  "sine-word": {
    kind: "summary", work: "The word 'sine'", ref: "history of a word",
    en: "Indian astronomers used half-chords of a circle, called jyā or jīvā ('bowstring'). Arabic writers borrowed the word as jība. Written without vowels, it was later read as jayb, a real Arabic word meaning 'pocket' or 'fold', which was translated into Latin as sinus, which became English 'sine'.",
    tags: "sine jya jiva bowstring arabic jiba jayb latin sinus etymology trigonometry word history"
  },
  "pingala-summary": {
    kind: "summary", work: "Piṅgala, Chandaḥśāstra, and its commentators", ref: "c. 2nd century BCE onward",
    en: "Piṅgala's study of poetic meter counts patterns of short (laghu) and long (guru) syllables, essentially a binary system. Later scholars working on meter found the triangle of numbers now called Pascal's triangle (the meru-prastāra, explained by Halāyudha in the 10th century) and the sequence 1, 2, 3, 5, 8, 13… (Virahāṅka, Gopāla, and the Jain scholar Hemacandra around 1150), well before Fibonacci.",
    tags: "pingala chandahshastra meter prosody binary laghu guru meru prastara pascal triangle halayudha fibonacci virahanka hemacandra jain"
  },
  "kerala-school": {
    kind: "summary", work: "The Kerala school of astronomy and mathematics", ref: "14th–16th century",
    en: "Mādhava of Saṅgamagrāma (c. 1340–1425) and his successors, such as Nīlakaṇṭha (Tantrasaṅgraha, 1501) and Jyeṣṭhadeva (Yuktibhāṣā, c. 1530, in Malayalam), found infinite series for π, sine, cosine and arctangent, including π/4 = 1 − 1/3 + 1/5 − 1/7 + …, about 250 years before similar results in Europe. These are major steps toward calculus, but not the full general system of Newton and Leibniz. Whether this knowledge reached Europe is still debated.",
    tags: "kerala school madhava sangamagrama nilakantha tantrasangraha jyesthadeva yuktibhasha infinite series pi sine cosine arctangent calculus newton leibniz"
  },
  "kanada-summary": {
    kind: "summary", work: "Kaṇāda, Vaiśeṣika Sūtra", ref: "c. 2nd century BCE (dates uncertain)",
    en: "The Vaiśeṣika school, traditionally founded by Kaṇāda, held that the physical world is made of tiny, eternal, indivisible particles (paramāṇu) that combine in pairs (dvyaṇuka) and larger groups to form everything we see. This was a philosophical theory reached by reasoning, not by experiments.",
    tags: "kanada vaisheshika atoms paramanu dvyanuka atomism physics matter philosophy"
  },
  "brahmagupta-gravity": {
    kind: "summary", work: "Brahmagupta on falling bodies, as reported by al-Bīrūnī", ref: "al-Bīrūnī's India, c. 1030",
    en: "The Persian scholar al-Bīrūnī, who studied Indian science, reports Brahmagupta's view that heavy things fall to the Earth because it is the Earth's nature to attract and hold them. This was an important idea about attraction, but not a mathematical law of gravity like Newton's.",
    tags: "brahmagupta gravity falling attraction earth al biruni physics newton"
  },
  "bhaskara-gravity": {
    kind: "verse", work: "Bhāskara II, Siddhānta Śiromaṇi", ref: "Golādhyāya, Bhuvanakośa 6 (c. 1150; numbering varies)",
    sa: "आकृष्टिशक्तिश्च मही तया यत् खस्थं गुरु स्वाभिमुखं स्वशक्त्या । आकृष्यते तत्पततीव भाति समे समन्तात् क्व पतत्वियं खे ॥",
    iast: "ākṛṣṭi-śaktiś ca mahī tayā yat khasthaṃ guru svābhimukhaṃ sva-śaktyā, ākṛṣyate tat patatīva bhāti same samantāt kva patatv iyaṃ khe",
    en: "The Earth has a power of attraction. With it, the Earth pulls a heavy object in the sky toward itself, so the object seems to fall. But where could the Earth itself fall, in space that is the same on every side?",
    tags: "bhaskara siddhanta shiromani gravity attraction akrshti shakti falling earth space physics"
  },
  "iron-pillar": {
    kind: "summary", work: "The Delhi iron pillar", ref: "c. 4th–5th century CE",
    en: "The iron pillar now at the Qutb complex in Delhi is over 1,600 years old and about 7 meters tall, with a Sanskrit inscription naming a king 'Candra'. It has resisted rusting remarkably well. Metallurgists explain this by its high phosphorus content and a thin protective layer that formed on its surface.",
    tags: "delhi iron pillar qutb rust resistance phosphorus passive layer metallurgy gupta chandra chemistry"
  },
  "wootz-zinc": {
    kind: "summary", work: "Wootz steel and Zawar zinc", ref: "metallurgy in ancient and medieval India",
    en: "South Indian crucible steel, known as wootz, was famous for its strength and patterns and was traded widely; it was used for 'Damascus' blades. At Zawar in Rajasthan, archaeologists found evidence of zinc being produced by distillation: zinc boils at a low temperature, so it was vaporized and collected by condensing it downward in special clay retorts, an advanced chemical technique.",
    tags: "wootz steel crucible damascus blades zawar zinc distillation retort rajasthan metallurgy chemistry"
  },
  "rasashastra": {
    kind: "summary", work: "Rasaśāstra (Indian alchemy)", ref: "medieval texts, e.g. Rasaratnasamuccaya",
    en: "Rasaśāstra was a medieval tradition of alchemy and medicine centered on mercury (rasa) and minerals. Its practitioners developed real laboratory skills: furnaces, distillation, purification steps. But many of its preparations contain mercury, lead or arsenic, and modern testing has found dangerous levels of heavy metals in some products sold today.",
    tags: "rasashastra alchemy mercury rasa minerals rasaratnasamuccaya distillation laboratory heavy metals safety chemistry"
  },
  "sushruta": {
    kind: "summary", work: "Suśruta Saṃhitā", ref: "core text c. early centuries BCE–CE (dates debated)",
    en: "The Suśruta Saṃhitā is a classical Sanskrit text on surgery. It describes over 100 instruments (about 101 blunt instruments and 20 sharp ones), reconstructing a nose using a flap of skin from the cheek, removing bladder stones, and treating cataracts by 'couching' (pushing the clouded lens out of the line of sight). It insists surgeons practice on models, such as fruits and leather bags, before operating.",
    tags: "sushruta samhita surgery instruments rhinoplasty nose reconstruction cheek flap cataract couching practice models medicine"
  },
  "charaka": {
    kind: "summary", work: "Caraka Saṃhitā", ref: "core text c. early centuries BCE–CE (dates debated)",
    en: "The Caraka Saṃhitā is a classical Āyurvedic text on internal medicine. It explains health as a balance of three doṣas (vāta, pitta and kapha), stresses careful diagnosis by examining the patient, diet and lifestyle, and lays out a code of conduct for doctors: put the patient's welfare first and keep their secrets.",
    tags: "charaka samhita ayurveda doshas vata pitta kapha diagnosis diet ethics physician oath medicine"
  },
  "evidence-medicine": {
    kind: "summary", work: "How medicine is tested today", ref: "modern scientific method",
    en: "Today a treatment is accepted when careful studies, especially randomized controlled trials comparing it with a placebo or existing treatment, show it works and is safe. Some traditional remedies have been tested this way; many have not, or have not held up. A remedy being old or natural doesn't by itself show that it works or is safe.",
    tags: "evidence based medicine clinical trial placebo randomized test safety traditional remedy ayurveda science method"
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
