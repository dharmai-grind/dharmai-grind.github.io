// Advaita course.
// Same rules as course-vishishtadvaita.js: every question must be answerable
// from earlier, non-deep teach cards in the same lesson.
DH.COURSES = DH.COURSES || {};
DH.COURSES.advaita = {
  id: "advaita",
  title: "Advaita Vedanta",
  subtitle: "Śaṅkara's non-dualism",
  icon: "ti-circle",
  color: "purple",
  units: [
    {
      title: "Meet Vedanta",
      desc: "The big question all three schools ask",
      lessons: [
        {
          id: "a1-1", title: "What is Vedanta?",
          cards: [
            { t: "teach", title: "The end of the Veda", body: "Vedānta literally means 'the end of the Veda'. It names the Upaniṣads, the philosophical texts at the end of the Vedic collections, and the schools of thought that interpret them." },
            { t: "teach", title: "Three foundation texts", body: "Every Vedānta school builds on three texts, the prasthāna-traya ('three starting points'):\n• the Upaniṣads, the philosophical end of the Vedas\n• the Bhagavad Gītā, Kṛṣṇa's teaching to Arjuna\n• the Brahma Sūtras of Bādarāyaṇa, short aphorisms summarizing the Upaniṣads" },
            { t: "teach", title: "Now, the inquiry", body: "The Brahma Sūtras begin: 'Now, therefore, the inquiry into Brahman.' Brahman is the ultimate reality, defined in the next sūtra as that from which the world comes, by which it lives, and into which it returns.", src: "bs-1.1.1" },
            { t: "mcq", tag: "core", q: "What does 'Vedānta' literally mean?", opts: ["The end of the Veda", "The beginning of the Veda", "The song of God", "The path of action"], a: 0, why: "Veda + anta (end)." },
            { t: "match", tag: "trivia", q: "Match the foundation text to its description", pairs: [["Upaniṣads", "Philosophical end of the Vedas"], ["Bhagavad Gītā", "Kṛṣṇa's teaching to Arjuna"], ["Brahma Sūtras", "Short aphorisms by Bādarāyaṇa"]] },
            { t: "mcq", tag: "core", q: "In Vedānta, 'Brahman' means...", opts: ["The ultimate reality, the source of the world", "A priest", "A holy river", "The first Veda"], a: 0, why: "Brahman is the ultimate reality. Don't mix it up with 'Brahmā', the creator god, or 'brāhmaṇa', a priest." },
            { t: "reflect", q: "If you could ask the source of everything one question, what would it be?" }
          ]
        },
        {
          id: "a1-2", title: "Three schools, one question",
          cards: [
            { t: "teach", title: "The question", body: "How is the individual self (jīva) related to Brahman? Three famous answers:" },
            { t: "teach", title: "Advaita: not two", body: "Śaṅkara: the self is ultimately identical with Brahman. The world of many separate things appears through māyā. 'Advaita' means 'not two': non-dualism. That's this course!", src: "advaita-summary" },
            { t: "teach", title: "The other two", body: "• Vishishtadvaita (Rāmānuja): one Brahman, with real selves and matter as its body\n• Dvaita (Madhva): God, selves and matter are eternally different\nDHARMAi has courses for both." },
            { t: "match", tag: "core", q: "Match the school to its founder", pairs: [["Advaita", "Śaṅkara"], ["Vishishtadvaita", "Rāmānuja"], ["Dvaita", "Madhva"]] },
            { t: "mcq", tag: "core", q: "'Advaita' literally means...", opts: ["Not two", "Two", "Qualified", "Devotion"], a: 0, why: "a (not) + dvaita (two-ness)." },
            { t: "mcq", tag: "think", q: "Which statement would an Advaitin agree with?", opts: ["Your deepest self and Brahman are ultimately one", "You are a body that God controls", "God and you are forever two", "There is no ultimate reality"], a: 0, why: "Identity of self and Brahman is the heart of Advaita." },
            { t: "debate", q: "Is it better to say the self is identical to God, different from God, or part of God?", sides: ["Identical (Advaita)", "Part of, like a body (Vishishtadvaita)", "Different (Dvaita)"] }
          ]
        }
      ]
    },
    {
      title: "Śaṅkara",
      desc: "History: the young monk who crossed India",
      lessons: [
        {
          id: "a2-1", title: "The young renunciant",
          cards: [
            { t: "teach", title: "Born in Kerala", body: "Tradition says Śaṅkara was born in Kāladi, in Kerala, traditionally in 788 CE. Many historians place him somewhat earlier in the 8th century.", src: "shankara-life" },
            { t: "teach", title: "The crocodile", body: "A famous story: young Śaṅkara wanted to become a renunciant (saṃnyāsin), but his widowed mother said no. One day a crocodile grabbed his leg in the river. He called out that he'd die unless she let him renounce the world. She agreed, and the crocodile let go. He promised to return when she died, and tradition says he kept that promise." },
            { t: "teach", title: "His teacher", body: "He found his teacher, Govinda Bhagavatpāda, on the banks of the Narmadā river. Govinda's own teacher was Gauḍapāda, who wrote famous verses on the Māṇḍūkya Upaniṣad." },
            { t: "mcq", tag: "trivia", q: "Where was Śaṅkara born, according to tradition?", opts: ["Kāladi, Kerala", "Udupi, Karnataka", "Śrīperumbudūr, Tamil Nadu", "Varanasi"], a: 0, why: "Udupi is linked with Madhva and Śrīperumbudūr with Rāmānuja." },
            { t: "order", tag: "trivia", q: "Put the teacher line in order, earliest first", items: ["Gauḍapāda", "Govinda Bhagavatpāda", "Śaṅkara"] },
            { t: "mcq", tag: "think", q: "In the crocodile story, why does Śaṅkara promise to come back to his mother?", opts: ["To show that renouncing the world doesn't mean abandoning love and duty to family", "Because he forgot something", "Because the crocodile asked him to", "To collect money"], a: 0, why: "A real tension: renunciants leave family life, yet the story honors his bond with his mother." },
            { t: "reflect", q: "Is it ever right to leave behind what your family wants for you, to follow a calling? Where's the line?" }
          ]
        },
        {
          id: "a2-2", title: "The great debate",
          cards: [
            { t: "teach", title: "A famous opponent", body: "Tradition tells of a debate between Śaṅkara and Maṇḍana Miśra, a great scholar of Mīmāṃsā, the school that put ritual action at the center of the Veda." },
            { t: "teach", title: "A wise judge", body: "The judge was Maṇḍana's wife, Ubhaya Bhāratī, herself a renowned scholar. Each debater wore a flower garland; whoever's garland wilted first would lose. Maṇḍana's wilted first." },
            { t: "teach", title: "What was at stake", body: "Śaṅkara argued that ritual action alone can't liberate; only knowledge of the self as Brahman can. After losing, Maṇḍana became Śaṅkara's student. Tradition identifies him with Sureśvara, a major Advaita teacher, though historians debate whether they were really the same person.", src: "shankara-bsb" },
            { t: "mcq", tag: "core", q: "Who judged the debate between Śaṅkara and Maṇḍana Miśra?", opts: ["Ubhaya Bhāratī", "Govinda Bhagavatpāda", "Rāmānuja", "The king of Kerala"], a: 0, why: "Maṇḍana's wife, a respected scholar in her own right." },
            { t: "mcq", tag: "core", q: "What did Śaṅkara argue is what really liberates?", opts: ["Knowledge of the self as Brahman", "Ritual action alone", "Wealth", "Winning debates"], a: 0, why: "Knowledge (jñāna), not ritual action, liberates in Advaita." },
            { t: "mcq", tag: "think", q: "The judge was the losing debater's own wife, and she judged fairly. What does the story suggest about the ideal of debate?", opts: ["Truth matters more than loyalty to a side", "Judges should always pick their family", "Debates don't matter", "Women couldn't be scholars"], a: 0, why: "The story celebrates fairness and learning, and a woman scholar at its center." },
            { t: "debate", q: "Can doing the right actions alone make someone free, or is understanding needed too?", sides: ["Action is enough", "Understanding is needed"] }
          ]
        },
        {
          id: "a2-3", title: "Four directions, many books",
          cards: [
            { t: "teach", title: "Four monasteries", body: "Tradition says Śaṅkara founded four monasteries (maṭhas) at the four corners of India:\n• Śṛṅgeri in the south\n• Dvārakā in the west\n• Purī in the east\n• Jyotirmaṭh in the north\nThey still exist today.", src: "shankara-life" },
            { t: "teach", title: "His commentaries", body: "Śaṅkara wrote commentaries on the Brahma Sūtras, the Bhagavad Gītā and many Upaniṣads. His Brahma Sūtra commentary is the foundation of Advaita.", src: "shankara-bsb" },
            { t: "teach", title: "Short life, big impact", body: "Tradition says he lived only 32 years, yet his ideas shaped Indian thought for over a thousand years. Many popular hymns are also credited to him, though scholars debate which he really wrote." },
            { t: "match", tag: "trivia", q: "Match the monastery to its direction", pairs: [["Śṛṅgeri", "South"], ["Dvārakā", "West"], ["Purī", "East"], ["Jyotirmaṭh", "North"]] },
            { t: "tf", tag: "trivia", q: "According to tradition, Śaṅkara lived only about 32 years.", a: true, why: "A short life with a huge legacy." },
            { t: "mcq", tag: "think", q: "Why might placing monasteries at four corners of India have mattered?", opts: ["It spread the teaching and tied distant regions into one tradition", "To guard the borders", "Because he got lost", "For better weather"], a: 0, why: "Four centers kept the teaching alive across the whole subcontinent." }
          ]
        }
      ]
    },
    {
      title: "One reality",
      desc: "Brahman, māyā and the snake that wasn't",
      lessons: [
        {
          id: "a3-1", title: "Brahman alone is real",
          cards: [
            { t: "teach", title: "A one-line summary", body: "A famous half-verse, traditionally attributed to Śaṅkara, sums up Advaita: Brahman is real; the world is mithyā (not ultimately real); the self is Brahman itself.", src: "brahma-satyam" },
            { t: "teach", title: "What 'real' means here", body: "For Advaita, 'real' (sat) means what never changes and never stops existing. The Gītā says the real never ceases to be. Since the world is always changing, it doesn't count as real in this strict sense.", src: "bg-2.16" },
            { t: "teach", title: "Not 'fake'", body: "Mithyā doesn't mean the world is a lie or that nothing matters. The Chāndogya Upaniṣad gives the classic image: a clay pot is useful and you can really drink from it, but 'pot' is just a name and a shape; what's really there is clay. In the same way, the world's many names and forms depend entirely on Brahman. You still have to do your homework!", src: "cu-6.1.4" },
            { t: "mcq", tag: "core", q: "For Advaita, what is 'real' in the strict sense?", opts: ["What never changes and never stops existing", "Anything you can touch", "Whatever most people believe", "Only the physical world"], a: 0, why: "Only Brahman fits that definition." },
            { t: "mcq", tag: "core", q: "'Mithyā' is best understood as...", opts: ["Not ultimately real, dependent on Brahman", "A total lie that doesn't matter", "Fully and independently real", "A kind of ritual"], a: 0, why: "Like a pot that is really just clay with a name and shape, the world depends on Brahman." },
            { t: "mcq", tag: "think", q: "Someone says, 'If the world is mithyā, nothing I do matters.' What would an Advaitin say?", opts: ["Within everyday life, actions and duties still fully matter", "Correct, nothing matters", "Only rituals matter", "Only money matters"], a: 0, why: "Advaita doesn't erase everyday responsibility. You'll see why in the lesson on levels of reality." },
            { t: "reflect", q: "Is something that keeps changing less 'real' than something that never changes? What do you think?" }
          ]
        },
        {
          id: "a3-2", title: "The rope and the snake",
          cards: [
            { t: "teach", title: "A scary evening", body: "Imagine walking at dusk and seeing a snake on the path. Your heart races. Then a lamp shows it was only a coiled rope. The snake was never there, but the rope was there all along." },
            { t: "teach", title: "Superimposition", body: "Śaṅkara calls this adhyāsa, 'superimposition': putting something onto what's really there. For Advaita, we superimpose a separate, limited self and a world of many things onto Brahman, the way the snake is put onto the rope.", src: "shankara-bsb" },
            { t: "teach", title: "Māyā", body: "The power behind this appearance is called māyā. Advaita teachers say māyā is strange: it isn't simply real (it disappears with knowledge) and isn't simply unreal (we really do experience it). It can't be described as either." },
            { t: "mcq", tag: "core", q: "In the rope–snake example, the rope stands for...", opts: ["Brahman, what is really there", "The world", "The snake's mother", "Ignorance"], a: 0, why: "The snake is the appearance; the rope is the reality underneath." },
            { t: "mcq", tag: "core", q: "'Adhyāsa' means...", opts: ["Superimposition: seeing one thing as another", "A kind of yoga pose", "Devotion", "A sacred river"], a: 0, why: "Like seeing a rope as a snake." },
            { t: "mcq", tag: "think", q: "What makes the snake disappear in the story?", opts: ["Light: seeing clearly what was there", "Running away", "Killing the snake", "Waiting for morning"], a: 0, why: "For Advaita, knowledge is the light that ends the illusion of separateness." },
            { t: "mcq", tag: "think", q: "Why do Advaita teachers say māyā is neither simply real nor simply unreal?", opts: ["We truly experience it, yet it vanishes when we know the truth", "Because nobody has studied it", "Because it's a type of food", "Because it's both a god and a goddess"], a: 0, why: "Like the snake: experienced, but not really there." }
          ]
        },
        {
          id: "a3-3", title: "Levels of reality",
          cards: [
            { t: "teach", title: "Three levels", body: "Śaṅkara mainly speaks of two levels, the everyday and the ultimate. Later Advaita teachers spelled out three:\n• pāramārthika: the ultimate level, where only Brahman is\n• vyāvahārika: the everyday level of people, places and duties\n• prātibhāsika: the merely apparent level, like dreams or the rope-snake" },
            { t: "teach", title: "God at the everyday level", body: "At the everyday level, Brahman appears as Īśvara, the Lord who creates and rules the world, and who is worshipped. So worship, ethics and duties are completely valid at this level." },
            { t: "teach", title: "With or without qualities", body: "Advaita speaks of Brahman 'without qualities' (nirguṇa), the ultimate truth, and Brahman 'with qualities' (saguṇa), Brahman as we relate to it in worship." },
            { t: "match", tag: "core", q: "Match the level to its example", pairs: [["Pāramārthika", "Brahman alone"], ["Vyāvahārika", "Everyday life and duties"], ["Prātibhāsika", "A dream or the rope-snake"]] },
            { t: "mcq", tag: "core", q: "In Advaita, Īśvara (the Lord) belongs to which level?", opts: ["The everyday (vyāvahārika) level", "The dream level", "No level at all", "Only the ultimate level, as a separate being"], a: 0, why: "Īśvara is Brahman as it appears in relation to the world." },
            { t: "mcq", tag: "think", q: "How do the three levels answer the worry 'if the world is mithyā, nothing matters'?", opts: ["At the everyday level, duties and ethics are fully real and binding", "They don't answer it", "They say the worry is correct", "They ban the question"], a: 0, why: "Your dream tiger can't hurt your real body, but in daily life, the stove is really hot!" },
            { t: "debate", q: "If God is 'only' Brahman seen through māyā, does that make worship less meaningful?", sides: ["Yes, it weakens worship", "No, worship still matters"] }
          ]
        }
      ]
    },
    {
      title: "Who am I?",
      desc: "The great sayings and the search for the self",
      lessons: [
        {
          id: "a4-1", title: "The four great sayings",
          cards: [
            { t: "teach", title: "Mahāvākyas", body: "Advaita highlights four 'great sayings' (mahāvākyas), one from an Upaniṣad of each of the four Vedas:\n• prajñānaṃ brahma: 'Consciousness is Brahman' (Ṛg Veda)\n• ahaṃ brahmāsmi: 'I am Brahman' (Yajur Veda)\n• tat tvam asi: 'You are that' (Sāma Veda)\n• ayam ātmā brahma: 'This self is Brahman' (Atharva Veda)" },
            { t: "teach", title: "I am Brahman", body: "From the Bṛhadāraṇyaka Upaniṣad:", src: "bau-1.4.10" },
            { t: "teach", title: "You are that", body: "From the Chāndogya Upaniṣad, a father's teaching to his son Śvetaketu. For Advaita, it means your true self is identical with Brahman.", src: "cu-6.8.7" },
            { t: "match", tag: "core", q: "Match the great saying to its meaning", pairs: [["Prajñānaṃ brahma", "Consciousness is Brahman"], ["Ahaṃ brahmāsmi", "I am Brahman"], ["Tat tvam asi", "You are that"], ["Ayam ātmā brahma", "This self is Brahman"]] },
            { t: "mcq", tag: "trivia", q: "How many mahāvākyas does Advaita usually highlight?", opts: ["Four, one from each Veda", "Two", "Seven", "One hundred and eight"], a: 0, why: "One from each of the four Vedas." },
            { t: "mcq", tag: "think", q: "Why might it matter that the great sayings come from all four Vedas?", opts: ["It shows the same teaching runs through the whole Veda, not just one text", "Each Veda disagrees", "It's a coincidence", "Because there are four directions"], a: 0, why: "For Advaita, the whole Veda points to the same truth." },
            { t: "reflect", q: "Say 'I am Brahman' slowly. What do you think the 'I' in that sentence refers to?" }
          ]
        },
        {
          id: "a4-2", title: "Not this, not this",
          cards: [
            { t: "teach", title: "Neti neti", body: "How do you describe something beyond all description? The Bṛhadāraṇyaka Upaniṣad says: 'not this, not this' (neti neti). Every label you try, Brahman is beyond it.", src: "bau-2.3.6" },
            { t: "teach", title: "Five layers", body: "The Taittirīya Upaniṣad describes five 'sheaths' (kośas) around the self, from outer to inner:\n• food (annamaya): the body\n• breath (prāṇamaya): life-energy\n• mind (manomaya): thoughts and feelings\n• intellect (vijñānamaya): understanding\n• bliss (ānandamaya): deep joy" },
            { t: "teach", title: "Peeling back", body: "Advaita uses neti neti on these layers: I am not the body, not the breath, not the mind, not the intellect, not even the bliss layer. What remains is pure awareness, the self that is Brahman." },
            { t: "mcq", tag: "core", q: "What does 'neti neti' mean?", opts: ["Not this, not this", "Yes, yes", "Here and there", "Now and then"], a: 0, why: "na iti = not so." },
            { t: "order", tag: "core", q: "Put the five sheaths in order, outermost first", items: ["Food (body)", "Breath", "Mind", "Intellect", "Bliss"] },
            { t: "mcq", tag: "think", q: "Why describe Brahman by saying what it is NOT?", opts: ["Any positive label would limit something that is limitless", "Because nobody knows any words", "To keep it secret", "Because Brahman doesn't exist"], a: 0, why: "Words describe limited things; Brahman is beyond limits." },
            { t: "mcq", tag: "think", q: "After 'peeling back' all five layers, what does Advaita say is left?", opts: ["Pure awareness: the self that is Brahman", "Nothing at all", "Another, smaller body", "Only the mind"], a: 0, why: "Not emptiness: the awareness that knew every layer." }
          ]
        },
        {
          id: "a4-3", title: "Waking, dreaming, sleeping",
          cards: [
            { t: "teach", title: "Four quarters", body: "The short Māṇḍūkya Upaniṣad says the self has four 'quarters':\n• waking\n• dreaming\n• deep, dreamless sleep\n• the 'fourth' (turīya): pure awareness underlying all three", src: "man-2" },
            { t: "teach", title: "The syllable Om", body: "The same Upaniṣad links these to the sacred syllable Om, said as A-U-M: A is waking, U is dreaming, M is deep sleep, and the silence after it is the fourth." },
            { t: "teach", title: "A dream argument", body: "Gauḍapāda points out that dreams feel completely real while you're in them. He uses this to ask: how sure are we that the waking world is ultimately real?", src: "gaudapada" },
            { t: "match", tag: "core", q: "Match the sound of Om to its state", pairs: [["A", "Waking"], ["U", "Dreaming"], ["M", "Deep sleep"], ["Silence", "Turīya, the fourth"]] },
            { t: "mcq", tag: "core", q: "What is turīya?", opts: ["The 'fourth': pure awareness beneath waking, dream and sleep", "A fourth Veda", "A kind of dream", "Deep sleep"], a: 0, why: "Turīya literally means 'the fourth'." },
            { t: "mcq", tag: "think", q: "What is the point of Gauḍapāda's dream comparison?", opts: ["Feeling real isn't proof that something is ultimately real", "Dreams are messages from gods", "Sleep is bad", "We should never sleep"], a: 0, why: "A dream feels completely real until you wake up." },
            { t: "debate", q: "Is the waking world more real than a dream, or just a longer, shared dream?", sides: ["More real", "Like a longer dream"] }
          ]
        }
      ]
    },
    {
      title: "The path",
      desc: "How Advaita says we become free",
      lessons: [
        {
          id: "a5-1", title: "Getting ready",
          cards: [
            { t: "teach", title: "Four qualifications", body: "Before studying the deepest teaching, Advaita asks for four qualifications (sādhana-catuṣṭaya):\n• viveka: telling apart what lasts from what passes\n• vairāgya: dispassion, not chasing what passes\n• six virtues, such as inner calm and self-control\n• mumukṣutva: a real longing for freedom", src: "advaita-path" },
            { t: "teach", title: "Action and devotion help", body: "Good action (karma) and devotion (bhakti) purify the mind and prepare it for knowledge. They're not thrown away; they get you ready." },
            { t: "match", tag: "core", q: "Match the qualification to its meaning", pairs: [["Viveka", "Telling the lasting from the passing"], ["Vairāgya", "Dispassion"], ["Mumukṣutva", "Longing for freedom"]] },
            { t: "mcq", tag: "core", q: "In Advaita, what role do good action and devotion play?", opts: ["They purify the mind and prepare it for knowledge", "They are useless", "They alone bring liberation", "They are forbidden"], a: 0, why: "Preparation, not the final step." },
            { t: "mcq", tag: "think", q: "Why might 'longing for freedom' be required before the teaching?", opts: ["Without real motivation, the teaching won't sink in or be practiced", "Because it's a rule with no reason", "To keep people out", "Because it's easy"], a: 0, why: "A teaching only transforms someone who truly wants it." },
            { t: "reflect", q: "Which of the four qualifications would be hardest for you? Why?" }
          ]
        },
        {
          id: "a5-2", title: "Hear, reflect, meditate",
          cards: [
            { t: "teach", title: "Three steps", body: "The sage Yājñavalkya tells his wife Maitreyī that the self should be heard about, reflected on and meditated upon.", src: "bau-2.4.5" },
            { t: "teach", title: "Śravaṇa, manana, nididhyāsana", body: "Advaita turns this into three steps:\n• śravaṇa: hearing the teaching from a teacher and the texts\n• manana: reflecting, removing doubts by reasoning\n• nididhyāsana: deep meditation until the truth is lived, not just known", src: "advaita-path" },
            { t: "order", tag: "core", q: "Put the three steps of the path in order", items: ["Śravaṇa (hearing)", "Manana (reflecting)", "Nididhyāsana (meditating)"] },
            { t: "mcq", tag: "core", q: "In the Bṛhadāraṇyaka Upaniṣad, who teaches Maitreyī about the self?", opts: ["Yājñavalkya", "Śaṅkara", "Uddālaka", "Kṛṣṇa"], a: 0, why: "Yājñavalkya, her husband, one of the great Upaniṣadic sages." },
            { t: "mcq", tag: "think", q: "Why include 'manana', reasoning, instead of just accepting the teaching?", opts: ["Doubts block understanding; reasoning clears them so knowledge can be firm", "Reasoning is forbidden", "Teachers don't like questions", "It's optional decoration"], a: 0, why: "Advaita values careful thinking, like what you're doing in this app!" }
          ]
        },
        {
          id: "a5-3", title: "Free while alive",
          cards: [
            { t: "teach", title: "Jīvanmukti", body: "Advaita teaches jīvanmukti, 'liberation while living'. Someone who has fully realized that the self is Brahman is free now, not just after death. They keep living and acting, but without the old sense of being a small, separate self." },
            { t: "teach", title: "A modern example", body: "Ramaṇa Maharṣi (1879–1950), at Tiruvaṇṇāmalai in Tamil Nadu, taught 'self-inquiry': asking 'Who am I?' and tracing the 'I' back to its source. Many see him as a living example of Advaita.", src: "ramana" },
            { t: "teach", title: "The critics", body: "Advaita has strong critics. Rāmānuja asked where ignorance (avidyā) could live, and Madhva argued that difference is real and obvious. Advaitins reply that ignorance is beginningless and that difference belongs to the everyday level. The debate has gone on for centuries.", src: "vyasatirtha" },
            { t: "mcq", tag: "core", q: "What is jīvanmukti?", opts: ["Liberation while still living", "Liberation only after death", "A type of ritual", "Rebirth as a god"], a: 0, why: "jīvan (living) + mukti (liberation)." },
            { t: "mcq", tag: "trivia", q: "What question is at the center of Ramaṇa Maharṣi's self-inquiry?", opts: ["Who am I?", "Where is God?", "What is time?", "Why is there evil?"], a: 0, why: "Trace the 'I' back to its source." },
            { t: "mcq", tag: "think", q: "Madhva argued that difference is obvious: you are clearly not me. How would an Advaitin likely reply?", opts: ["Difference is real at the everyday level, but not at the ultimate level", "They'd agree and give up Advaita", "They'd say people don't exist at any level", "They wouldn't reply"], a: 0, why: "The levels of reality let Advaita accept everyday difference without making it ultimate." },
            { t: "debate", q: "Would you rather merge with the ocean, or be a drop that loves the ocean forever?", sides: ["Merge (Advaita)", "Remain and love"] }
          ]
        }
      ]
    }
  ]
};
