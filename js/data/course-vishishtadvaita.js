// Vishishtadvaita course.
// Card types: teach, mcq, tf, match, order, reflect, debate.
// tag on question cards: "core" (always shown), "think" (critical thinking), "trivia".
// deep: true on a teach card = only shown for 10-minute lessons.
// src = id from sources.js; every quoted verse must come from there.
// RULE: every question must be answerable from teach cards that come BEFORE it
// in the same lesson and are NOT deep (deep cards are skipped in short/medium
// lessons). Thinking questions may ask you to reason, but never to recall
// a fact the lesson didn't teach.
DH.COURSES = DH.COURSES || {};
DH.COURSES.vishishtadvaita = {
  id: "vishishtadvaita",
  title: "Vishishtadvaita Vedanta",
  subtitle: "Rāmānuja's 'qualified non-dualism'",
  icon: "ti-flame",
  color: "teal",
  units: [
    {
      title: "Meet Vedanta",
      desc: "The big question all three schools ask",
      lessons: [
        {
          id: "v1-1", title: "What is Vedanta?",
          cards: [
            { t: "teach", title: "The end of the Veda", body: "Vedānta literally means 'the end of the Veda'. It names the Upaniṣads, the philosophical texts at the end of the Vedic collections, and the schools of thought that interpret them." },
            { t: "teach", title: "Three foundation texts", body: "Every Vedānta school builds on three texts, called the prasthāna-traya ('three starting points'):\n• the Upaniṣads, the philosophical end of the Vedas\n• the Bhagavad Gītā, Kṛṣṇa's teaching to Arjuna\n• the Brahma Sūtras of Bādarāyaṇa, short aphorisms summarizing the Upaniṣads\nA founder proves their view by writing commentaries on these three." },
            { t: "teach", title: "Same texts, different readings", body: "Three great teachers, Śaṅkara, Rāmānuja and Madhva, all commented on these same texts and reached very different conclusions. That is the fun of Vedānta: the debate is about how to read shared scripture." },
            { t: "mcq", tag: "core", q: "What does 'Vedānta' literally mean?", opts: ["The end of the Veda", "The beginning of the Veda", "The song of God", "The path of action"], a: 0, why: "Veda + anta (end). It refers to the Upaniṣads at the end of the Vedic corpus." },
            { t: "match", tag: "trivia", q: "Match the foundation text to its description", pairs: [["Upaniṣads", "Philosophical end of the Vedas"], ["Bhagavad Gītā", "Kṛṣṇa's teaching to Arjuna"], ["Brahma Sūtras", "Short aphorisms by Bādarāyaṇa"]] },
            { t: "mcq", tag: "think", q: "Three teachers read the same three texts and disagree. What does that suggest?", opts: ["Interpretation matters as much as the text itself", "Two of them didn't read the texts", "The texts contradict themselves on every page", "Only the oldest teacher can be right"], a: 0, why: "Shared scripture, different readings. Each school gives arguments for why its reading fits the texts best." },
            { t: "tf", tag: "trivia", q: "To found a Vedānta school, a teacher traditionally wrote commentaries on the three foundation texts.", a: true, why: "Commenting on the prasthāna-traya was how a Vedānta teacher showed their system was grounded in scripture." }
          ]
        },
        {
          id: "v1-2", title: "The big question",
          cards: [
            { t: "teach", title: "Now, the inquiry", body: "The Brahma Sūtras open with a single line: 'Now, therefore, the inquiry into Brahman.' All of Vedānta is an investigation of Brahman, the ultimate reality.", src: "bs-1.1.1" },
            { t: "teach", title: "A definition", body: "The second sūtra gives a definition: Brahman is that from which the world comes, by which it lives, and into which it returns.", src: "bs-1.1.2" },
            { t: "teach", title: "Where that comes from", body: "The sūtra echoes the Taittirīya Upaniṣad, where the sage Varuṇa teaches his son Bhṛgu to seek the source of all beings.", src: "tu-3.1", deep: true },
            { t: "mcq", tag: "core", q: "According to Brahma Sūtra 1.1.2, Brahman is...", opts: ["That from which the world originates, lives and dissolves", "A god who lives on a mountain", "The first word of the Vedas", "A ritual fire"], a: 0, why: "'janmādy asya yataḥ': from which the origin and so on of this world come." },
            { t: "mcq", tag: "think", q: "If Brahman is the cause of the world, what question does every Vedānta school then have to answer?", opts: ["How is the world related to Brahman? Is it real, a part, a body, or an appearance?", "How old is the world?", "Which language Brahman speaks", "How many gods there are"], a: 0, why: "This is the fork in the road. Advaita, Vishishtadvaita and Dvaita give different answers to exactly this question." },
            { t: "tf", tag: "trivia", q: "The very first sūtra of the Brahma Sūtras is 'athāto brahma-jijñāsā'.", a: true, why: "'Now, therefore, the inquiry into Brahman.'", src: "bs-1.1.1" },
            { t: "reflect", q: "If you could ask the source of everything one question, what would it be?" }
          ]
        },
        {
          id: "v1-3", title: "Three schools, one question",
          cards: [
            { t: "teach", title: "The question", body: "How is the individual self (jīva) related to Brahman? Three famous answers:" },
            { t: "teach", title: "Advaita: identical", body: "Śaṅkara: the self is ultimately identical with Brahman. The world of separate things appears through māyā.", src: "advaita-summary" },
            { t: "teach", title: "Dvaita: different", body: "Madhva: God, selves and matter are eternally different. Selves depend on God completely.", src: "dvaita-summary" },
            { t: "teach", title: "Vishishtadvaita: one, with parts", body: "Rāmānuja: there is one Brahman, but it is 'qualified' (viśiṣṭa) by real selves and real matter, which are its body. One reality, real internal distinctions. Advaita means 'non-dualism', so Viśiṣṭādvaita is called 'qualified non-dualism'. That is this course!", src: "ramanuja-sribhashya" },
            { t: "match", tag: "core", q: "Match the school to its founder", pairs: [["Advaita", "Śaṅkara"], ["Vishishtadvaita", "Rāmānuja"], ["Dvaita", "Madhva"]] },
            { t: "mcq", tag: "core", q: "'Viśiṣṭa-advaita' is often translated as...", opts: ["Qualified non-dualism", "Pure dualism", "Absolute illusion", "Non-violence"], a: 0, why: "Advaita = non-dual; viśiṣṭa = qualified or distinguished. One Brahman, qualified by selves and matter." },
            { t: "mcq", tag: "think", q: "Which school would most likely say 'the world is real AND it is not separate from Brahman'?", opts: ["Vishishtadvaita", "Advaita", "Dvaita", "None of them"], a: 0, why: "Advaita questions the world's ultimate reality; Dvaita stresses separateness. Rāmānuja keeps both: real, and inseparable from Brahman." },
            { t: "debate", q: "Is it better to say the self is identical to God, different from God, or part of God?", sides: ["Identical (Advaita)", "Part of, like a body (Vishishtadvaita)", "Different (Dvaita)"] }
          ]
        }
      ]
    },
    {
      title: "Rāmānuja and his lineage",
      desc: "History: from Tamil poet-saints to Śrīraṅgam",
      lessons: [
        {
          id: "v2-1", title: "The Āḻvārs",
          cards: [
            { t: "teach", title: "Poet-saints", body: "Long before Rāmānuja, twelve Tamil poet-saints called the Āḻvārs ('those immersed' in God) sang passionate hymns to Viṣṇu. Among them are Nammāḻvār and Āṇṭāḷ, the only woman Āḻvār.", src: "alvars" },
            { t: "teach", title: "4,000 hymns", body: "The sage Nāthamuni gathered their hymns into the Nālāyira Divya Prabandham ('4,000 divine compositions'). Here is the very first verse of Nammāḻvār's Tiruvāymoḻi, in Tamil. Notice the idea of God as having the highest good qualities. Rāmānuja's philosophy builds on exactly this.", src: "tvm-1.1.1" },
            { t: "teach", title: "Two Vedas", body: "Śrīvaiṣṇavas treat these Tamil hymns as equal in sanctity to the Sanskrit Vedas. That's why the tradition is called Ubhaya Vedānta, 'two-fold Vedānta': rigorous Sanskrit philosophy joined with heartfelt Tamil devotion, open even to those who don't read Sanskrit." },
            { t: "mcq", tag: "core", q: "Who compiled the Nālāyira Divya Prabandham?", opts: ["Nāthamuni", "Rāmānuja", "Śaṅkara", "Vyāsa"], a: 0, why: "Nāthamuni collected the 4,000 Tamil hymns of the Āḻvārs." },
            { t: "tf", tag: "trivia", q: "Āṇṭāḷ is the only woman among the twelve Āḻvārs.", a: true, why: "Her Tiruppāvai is still sung every year in the month of Mārgaḻi.", src: "tiruppavai-1" },
            { t: "mcq", tag: "think", q: "Why might it matter that a philosophy is rooted in both Sanskrit scripture AND Tamil devotional poetry?", opts: ["It joins scholarly argument with emotional devotion and makes the tradition accessible beyond Sanskrit readers", "It doesn't matter at all", "Because Tamil is older than Sanskrit", "So the texts can never be translated"], a: 0, why: "Ubhaya Vedānta joins rigorous Sanskrit philosophy with heartfelt Tamil bhakti." },
            { t: "reflect", q: "Is a poem a good source for philosophy? What can a hymn teach that an argument can't?" }
          ]
        },
        {
          id: "v2-2", title: "Rāmānuja's story",
          cards: [
            { t: "teach", title: "Early life", body: "Traditional biographies say Rāmānuja was born in Śrīperumbudūr, near today's Chennai, traditionally in 1017 CE. Historians debate the exact dates.", src: "ramanuja-life" },
            { t: "teach", title: "A disagreement about a monkey", body: "His first teacher, Yādavaprakāśa, explained a word in the Chāndogya Upaniṣad (kapyāsa) as comparing God's eyes to a monkey's backside! The story says Rāmānuja wept and offered a better reading: eyes like a lotus opened by the sun.", src: "cu-1.6.7" },
            { t: "teach", title: "A secret shouted from a tower", body: "A famous story: the teacher Tirukkōṭṭiyūr Nambi taught Rāmānuja a sacred mantra and told him to keep it secret. Rāmānuja climbed the temple tower and taught it to everyone. When warned he might suffer for it, he said he was happy if it helped all those people." },
            { t: "mcq", tag: "trivia", q: "Where was Rāmānuja born, according to tradition?", opts: ["Śrīperumbudūr", "Varanasi", "Udupi", "Kāladi"], a: 0, why: "Kāladi is Śaṅkara's birthplace; Udupi is associated with Madhva." },
            { t: "mcq", tag: "think", q: "In the tower story, Rāmānuja breaks his teacher's rule. What value does the story put above obedience?", opts: ["Compassion: sharing liberating knowledge with everyone", "Fame", "Winning arguments", "Keeping knowledge exclusive"], a: 0, why: "The story celebrates compassion. Notice it also creates a real tension: when, if ever, is breaking a teacher's instruction right?" },
            { t: "mcq", tag: "think", q: "The 'kapyāsa' story is about one word with two readings. What does it show about how Rāmānuja reads scripture?", opts: ["Readings should fit the dignity and overall meaning of the text", "Every word has only one dictionary meaning", "Teachers are always right", "Upaniṣads are about animals"], a: 0, why: "He argued for the reading that fit the whole context, a skill he used throughout the Śrī Bhāṣya." },
            { t: "debate", q: "Was Rāmānuja right to break his promise and share the mantra with everyone?", sides: ["Yes, compassion comes first", "No, a promise to a teacher should be kept"] }
          ]
        },
        {
          id: "v2-3", title: "What Rāmānuja wrote",
          cards: [
            { t: "teach", title: "The Śrī Bhāṣya", body: "His masterpiece is the Śrī Bhāṣya, a commentary on the Brahma Sūtras. Tradition says it fulfilled a wish of the earlier teacher Yāmunācārya.", src: "ramanuja-sribhashya" },
            { t: "teach", title: "Other works", body: "He also wrote a commentary on the Gītā (Gītā Bhāṣya), the Vedārtha Saṅgraha (an essay on reading the Upaniṣads), and the Gadya Traya, three prose prayers, including the Śaraṇāgati Gadya, a prayer of surrender. Tradition counts nine works in all.", src: "ramanuja-gitabhashya" },
            { t: "teach", title: "The teacher line", body: "Rāmānuja stands in a line of teachers, in this order:\n• Nāthamuni, who collected the Āḻvārs' hymns\n• Yāmunācārya, Nāthamuni's grandson\n• Rāmānuja\n• later, Vedānta Deśika (13th–14th century), whom you'll meet again in Unit 5" },
            { t: "teach", title: "Why no Upaniṣad commentary?", body: "Unlike Śaṅkara, Rāmānuja did not write separate commentaries on the Upaniṣads. His Vedārtha Saṅgraha and Śrī Bhāṣya do that job.", src: "ramanuja-vedarthasangraha", deep: true },
            { t: "match", tag: "core", q: "Match the work to what it comments on", pairs: [["Śrī Bhāṣya", "Brahma Sūtras"], ["Gītā Bhāṣya", "Bhagavad Gītā"], ["Śaraṇāgati Gadya", "A prayer of surrender"]] },
            { t: "order", tag: "trivia", q: "Put the teachers in historical order (earliest first)", items: ["Nāthamuni", "Yāmunācārya", "Rāmānuja", "Vedānta Deśika"] },
            { t: "mcq", tag: "think", q: "Why would a philosopher write a prayer (the Gadya) as well as commentaries?", opts: ["For Rāmānuja, right understanding and loving surrender belong together", "To make money", "Because commentaries were banned", "Prayers are easier to write"], a: 0, why: "In Vishishtadvaita, knowing God and loving God go together." }
          ]
        }
      ]
    },
    {
      title: "Three realities",
      desc: "Cit, acit and Īśvara",
      lessons: [
        {
          id: "v3-1", title: "Tattva-traya",
          cards: [
            { t: "teach", title: "Three realities", body: "Vishishtadvaita names three real things (tattva-traya):\n• cit: conscious selves (you, me, Angada)\n• acit: non-conscious matter (rocks, bodies, time)\n• Īśvara: the Lord, Nārāyaṇa, who is the self of both" },
            { t: "teach", title: "Scripture says three", body: "The Śvetāśvatara Upaniṣad speaks of 'the enjoyer, the enjoyed and the one who moves them'. Śrīvaiṣṇava teachers read this as:\n• the enjoyer (bhoktā) = the individual self, who experiences the world\n• the enjoyed (bhogya) = matter\n• the mover (preritā) = the Lord", src: "su-1.12" },
            { t: "match", tag: "core", q: "Match the term to its meaning", pairs: [["cit", "Conscious selves"], ["acit", "Non-conscious matter"], ["Īśvara", "The Lord"]] },
            { t: "mcq", tag: "core", q: "In Śvetāśvatara 1.12, 'the enjoyer' (bhoktā) is read as...", opts: ["The individual self", "Matter", "The Lord", "Food"], a: 0, why: "The self experiences (enjoys) the world; matter is what is enjoyed; the Lord moves both.", src: "su-1.12" },
            { t: "tf", tag: "trivia", q: "In Vishishtadvaita, time counts as a kind of acit (non-conscious reality).", a: true, why: "Matter, time and the special pure matter of Vaikuṇṭha are all acit." },
            { t: "mcq", tag: "think", q: "If there are three real things, why is it still called NON-dualism?", opts: ["Selves and matter never exist apart from the Lord; together they form one qualified whole", "Because two of them are fake", "It's a mistranslation", "Because cit and acit are the same thing"], a: 0, why: "Three distinct realities, but one inseparable whole. That's the 'qualified' in qualified non-dualism." }
          ]
        },
        {
          id: "v3-2", title: "The world as God's body",
          cards: [
            { t: "teach", title: "The inner controller", body: "The Bṛhadāraṇyaka Upaniṣad describes one who dwells in the earth, whose body the earth is, and who controls it from within: the antaryāmin.", src: "bau-3.7.3" },
            { t: "teach", title: "Body and soul", body: "Rāmānuja turns this into his central idea: selves and matter are the BODY (śarīra) of Brahman, and Brahman is their SOUL (śarīrin). A body exists for, is supported by, and is controlled by its soul." },
            { t: "teach", title: "Why this helps", body: "When your body gets a scratch, you don't become 'scratched' in your inner self. In the same way, the world can change and suffer while Brahman's own perfect nature stays untouched. That's the big problem the analogy solves: how a perfect Brahman can include an imperfect, changing world." },
            { t: "mcq", tag: "core", q: "In Rāmānuja's analogy, the world is to Brahman as...", opts: ["A body is to its soul", "A dream is to a dreamer", "A pot is to a potter", "A mirror is to a face"], a: 0, why: "śarīra–śarīrin bhāva: the body–soul relation." },
            { t: "mcq", tag: "think", q: "What problem does the body–soul analogy help Rāmānuja solve?", opts: ["How Brahman can include a changing, imperfect world without becoming imperfect", "How to count the stars", "Why rituals are long", "Why there are many languages"], a: 0, why: "The body changes; the soul's essential nature does not." },
            { t: "mcq", tag: "think", q: "Which is a fair OBJECTION someone could raise against the analogy?", opts: ["Our souls don't fully control our bodies (we get sick against our will), so is the analogy too strong?", "Bodies don't exist", "The Upaniṣads never mention bodies", "It's too short"], a: 0, why: "A good objection! Rāmānuja defines 'body' specially: whatever a soul supports, controls and uses for its purposes. You can test whether that definition is fair." },
            { t: "reflect", q: "Think of something you 'control from within'. How is it like or unlike how Rāmānuja describes God and the world?" }
          ]
        },
        {
          id: "v3-3", title: "Inseparable but distinct",
          cards: [
            { t: "teach", title: "Two birds", body: "The Muṇḍaka Upaniṣad pictures two birds on one tree: one eats the fruit, the other watches. Vishishtadvaita reads them as the individual self and the Lord, together but distinct.", src: "mu-3.1.1" },
            { t: "teach", title: "Apṛthak-siddhi", body: "Rāmānuja's key term is apṛthak-siddhi, 'inseparable existence'. Like the blueness of a lotus, which can't exist apart from the lotus but isn't the same as the lotus, selves can't exist apart from Brahman but are not identical to it." },
            { t: "mcq", tag: "core", q: "'Apṛthak-siddhi' means...", opts: ["Inseparable existence", "Total identity", "Complete separation", "Illusion"], a: 0, why: "a-pṛthak = not separate; siddhi = existence or establishment." },
            { t: "mcq", tag: "think", q: "Which pair best illustrates apṛthak-siddhi?", opts: ["A lotus and its blue color", "A cup and a saucer", "Two separate houses", "A dream and waking life"], a: 0, why: "The color can't exist on its own, yet it's distinct from the lotus. A cup and saucer can be separated." },
            { t: "mcq", tag: "think", q: "In the two-birds verse, how might an ADVAITIN read the two birds differently?", opts: ["As one self that only appears as two because of ignorance", "As two different trees", "As literally two birds", "They would ignore the verse"], a: 0, why: "Advaita would say the distinction belongs to the level of appearance. Same verse, different reading.", src: "mu-3.1.1" },
            { t: "debate", q: "Does the two-birds verse show that the self and God are truly different?", sides: ["Yes, two birds means two", "No, it's only a picture of how things appear"] }
          ]
        }
      ]
    },
    {
      title: "The self",
      desc: "Who are you, really?",
      lessons: [
        {
          id: "v4-1", title: "Are you your body?",
          cards: [
            { t: "teach", title: "Childhood, youth, old age", body: "The Gītā says the self passes through childhood, youth and old age, and then to another body. You aren't the changing body; you're the one who has it.", src: "bg-2.13" },
            { t: "teach", title: "Unborn, undying", body: "The self is never born and never dies.", src: "bg-2.20" },
            { t: "teach", title: "Real and many", body: "For Rāmānuja, there are countless real individual selves. Each is eternal, conscious, and a tiny 'part' (aṃśa) of the Lord. They are not pieces cut off from Brahman; they are part of Brahman's body.", src: "bg-15.7" },
            { t: "mcq", tag: "core", q: "According to Gītā 2.13, what passes through childhood, youth and old age?", opts: ["The embodied self", "The Sun", "The Vedas", "Time"], a: 0, why: "'dehinaḥ': the embodied one, the self who has the body.", src: "bg-2.13" },
            { t: "tf", tag: "core", q: "In Vishishtadvaita, there is only one individual self in the whole universe.", a: false, why: "There are countless distinct individual selves, all real, all part of Brahman's body." },
            { t: "mcq", tag: "think", q: "Your body's cells are almost completely replaced over years, but you feel like the same person. How does this support Gītā 2.13?", opts: ["Something stays the same through all the bodily change", "It proves we have no self", "It means cells are the self", "It has nothing to do with it"], a: 0, why: "The Gītā's argument works the same way: change in the body, continuity in the self." },
            { t: "reflect", q: "What is one thing about 'you' that has stayed the same since you were small?" }
          ]
        },
        {
          id: "v4-2", title: "'You are that': two readings",
          cards: [
            { t: "teach", title: "A famous sentence", body: "In the Chāndogya Upaniṣad, Uddālaka tells his son: 'tat tvam asi', 'You are that.'", src: "cu-6.8.7" },
            { t: "teach", title: "Advaita's reading", body: "For Advaita, this teaches strict identity: your true self IS Brahman, once you see past the limits that make you seem separate.", src: "advaita-summary" },
            { t: "teach", title: "Rāmānuja's reading", body: "Rāmānuja points out that both 'that' and 'you' can refer to Brahman: 'that' = Brahman as the cause of the world; 'you' = Brahman as the inner self of Śvetaketu (who is part of Brahman's body). One Brahman, two descriptions, and Śvetaketu stays real.", src: "ramanuja-vedarthasangraha" },
            { t: "teach", title: "A grammar point", body: "Sanskrit grammarians call two words that refer to one thing in different ways sāmānādhikaraṇya ('co-reference'), like 'the blue lotus': 'blue' and 'lotus' name one thing in two ways. Rāmānuja argues co-reference needs real differences between the two descriptions; otherwise, why use two words?", deep: true },
            { t: "mcq", tag: "core", q: "For Rāmānuja, in 'tat tvam asi', the word 'you' ultimately refers to...", opts: ["Brahman, as the inner self of Śvetaketu", "Only Śvetaketu's body", "Nothing; it's poetic", "Uddālaka"], a: 0, why: "Brahman, who has Śvetaketu as its body." },
            { t: "mcq", tag: "think", q: "What's the KEY difference between the Advaita and Vishishtadvaita readings of 'tat tvam asi'?", opts: ["Whether the individual self remains real and distinct after the identity is understood", "Whether the sentence is in Sanskrit", "Whether Uddālaka existed", "Whether Brahman exists"], a: 0, why: "Both accept Brahman. They disagree on whether 'you' dissolve into it or remain as its real mode." },
            { t: "debate", q: "Does 'tat tvam asi' mean you ARE Brahman, or that Brahman is your inner self?", sides: ["You are Brahman (Advaita)", "Brahman is your inner self (Vishishtadvaita)"] }
          ]
        },
        {
          id: "v4-3", title: "Rāmānuja's challenge to Advaita",
          cards: [
            { t: "teach", title: "Seven objections", body: "In the Śrī Bhāṣya, Rāmānuja lists seven objections (the sapta-vidha anupapatti) to the Advaita idea that the world arises from ignorance (avidyā).", src: "ramanuja-sribhashya" },
            { t: "teach", title: "Where does ignorance live?", body: "One objection: whose ignorance is it? If it belongs to Brahman, then Brahman (pure knowledge) is ignorant. If it belongs to the individual self, but Advaita says that self is itself produced by ignorance, then ignorance is needed before the self that has it.\nThis kind of argument is called a dilemma: it offers two options and argues that both lead to a problem." },
            { t: "teach", title: "Advaita answers back", body: "Advaitins have replies. Some say ignorance is beginningless, so there's no 'first' moment to explain; later Advaita teachers even disagreed among themselves about whether it rests in Brahman or in the self. Good philosophy hears both sides.", src: "advaita-summary" },
            { t: "mcq", tag: "core", q: "Rāmānuja's seven objections target which Advaita idea?", opts: ["That the world arises from avidyā (ignorance)", "That Brahman exists", "That the Gītā is scripture", "That bhakti is good"], a: 0, why: "All seven take aim at avidyā." },
            { t: "mcq", tag: "think", q: "The 'where does ignorance live' objection is a kind of...", opts: ["Dilemma: both possible answers seem to lead to a problem", "Personal insult", "Historical argument", "Appeal to popularity"], a: 0, why: "A dilemma offers two options and argues both fail. A great tool, and you can reply by finding a third option, as Advaitins try to." },
            { t: "mcq", tag: "think", q: "Which reply would an Advaitin most likely give?", opts: ["Ignorance is beginningless, so asking which came first, the self or ignorance, is the wrong question", "Rāmānuja is right, we give up", "Ignorance lives in the Vedas", "There is no Brahman"], a: 0, why: "Beginninglessness is a classic Advaita move: like a seed and a tree, neither needs to come first." },
            { t: "reflect", q: "Which do you find more convincing so far, the objection or the reply? Why?" }
          ]
        }
      ]
    },
    {
      title: "The path",
      desc: "Devotion, surrender and liberation",
      lessons: [
        {
          id: "v5-1", title: "Bhakti: loving devotion",
          cards: [
            { t: "teach", title: "Fix your mind on me", body: "Near its end, the Gītā gives a loving instruction: think of me, be devoted to me, and you will come to me.", src: "bg-18.65" },
            { t: "teach", title: "Bhakti as knowledge", body: "For Rāmānuja, bhakti isn't just emotion. It's a constant, loving remembrance of God, as steady as oil poured in an unbroken stream, built on right understanding and good action.", src: "ramanuja-gitabhashya" },
            { t: "teach", title: "Rare souls", body: "The Gītā says the one who knows 'Vāsudeva is everything' is a rare great soul.", src: "bg-7.19", deep: true },
            { t: "mcq", tag: "core", q: "For Rāmānuja, bhakti is best described as...", opts: ["Constant loving remembrance of God, grounded in knowledge", "A one-time emotion", "Only singing songs", "Avoiding all action"], a: 0, why: "He compares it to an unbroken stream of oil." },
            { t: "mcq", tag: "think", q: "Why might Rāmānuja insist that devotion and knowledge go TOGETHER?", opts: ["You can only truly love what you truly understand, and understanding God leads to love", "Knowledge is useless", "Love is useless", "Because the Gītā is long"], a: 0, why: "Head and heart, joined. A key contrast with views where knowledge alone liberates." },
            { t: "tf", tag: "trivia", q: "Bhagavad Gītā 18.65 begins 'man-manā bhava', 'fix your mind on me'.", a: true, why: "", src: "bg-18.65" }
          ]
        },
        {
          id: "v5-2", title: "Surrender (prapatti)",
          cards: [
            { t: "teach", title: "The final verse", body: "Śrīvaiṣṇavas call Gītā 18.66 the 'carama śloka' (final verse): take refuge in me alone, and I will free you.", src: "bg-18.66" },
            { t: "teach", title: "Prapatti", body: "Prapatti or śaraṇāgati ('taking refuge') is surrender to Nārāyaṇa together with Śrī (Lakṣmī). Unlike demanding forms of bhakti-yoga, it's open to everyone, regardless of caste, learning or ability.", src: "ramanuja-gadya" },
            { t: "teach", title: "'Letting go of all dharmas'?", body: "Does 18.66 tell people to stop doing good? Śrīvaiṣṇava teachers say no. They read it as: stop relying on your own efforts as the MEANS of salvation, and rely on God alone. Good conduct continues, but not as a price paid for liberation." },
            { t: "mcq", tag: "core", q: "What is the 'carama śloka'?", opts: ["Bhagavad Gītā 18.66", "The first verse of the Ṛg Veda", "Brahma Sūtra 1.1.1", "A Tamil hymn"], a: 0, why: "'Take refuge in me alone... do not grieve.'", src: "bg-18.66" },
            { t: "mcq", tag: "think", q: "Why might it matter that prapatti is open to everyone?", opts: ["Liberation then doesn't depend on caste, scholarship or ability", "It makes temples bigger", "It means no one needs to learn anything", "It isn't important"], a: 0, why: "Compare the tower story: the tradition repeatedly emphasizes access for all." },
            { t: "mcq", tag: "think", q: "'Letting go of all dharmas' (18.66) is debated. Which reading fits Śrīvaiṣṇava teaching best?", opts: ["Stop relying on your own efforts as the MEANS to liberation, and rely on God", "Stop being a good person", "Stop eating", "Ignore all scripture"], a: 0, why: "Teachers say good conduct continues, but not as the price paid for salvation." },
            { t: "reflect", q: "Is surrendering the same as giving up? What's the difference?" }
          ]
        },
        {
          id: "v5-3", title: "Monkey or kitten?",
          cards: [
            { t: "teach", title: "Two traditions", body: "After Rāmānuja, Śrīvaiṣṇavas developed two traditions: Vadakalai ('northern'), with Vedānta Deśika as its great teacher, and Tenkalai ('southern'), with Piḷḷai Lokācārya and Maṇavāḷa Māmuni. Both accept surrender; they differ on what surrender IS." },
            { t: "teach", title: "The baby monkey", body: "Vadakalai: like a baby monkey (markaṭa) that clings to its mother, the soul must make the small effort of surrendering, and grace does the rest.", src: "desika" },
            { t: "teach", title: "The kitten", body: "Tenkalai: like a kitten (mārjāra) carried by its mother in her mouth, the soul is saved by grace alone. Even surrender is not something the soul contributes as a means.", src: "pillai-lokacarya" },
            { t: "teach", title: "Respect both", body: "These are real, living traditions with many more subtle differences. Neither model says God's grace is unimportant, and neither says human response is meaningless. They disagree about emphasis and what counts as a 'means'.", deep: true },
            { t: "match", tag: "core", q: "Match the tradition to its analogy", pairs: [["Vadakalai", "Baby monkey clinging (markaṭa)"], ["Tenkalai", "Kitten carried (mārjāra)"]] },
            { t: "mcq", tag: "trivia", q: "Who is the great teacher of the Vadakalai tradition?", opts: ["Vedānta Deśika", "Maṇavāḷa Māmuni", "Śaṅkara", "Madhva"], a: 0, why: "Maṇavāḷa Māmuni is a central Tenkalai teacher." },
            { t: "mcq", tag: "think", q: "What's the real philosophical question behind the monkey/kitten debate?", opts: ["How much does the soul contribute to its own salvation, versus grace alone?", "Which animal is cuter?", "Which region is older?", "Whether God exists"], a: 0, why: "Grace and effort: a question also debated in many other religious traditions around the world." },
            { t: "debate", q: "Is surrender something the soul DOES, or something that happens through grace alone?", sides: ["The soul must cling (monkey)", "Grace carries the soul (kitten)"] }
          ]
        },
        {
          id: "v5-4", title: "What is liberation?",
          cards: [
            { t: "teach", title: "Mokṣa", body: "For Vishishtadvaita, liberation (mokṣa) means the self reaches Vaikuṇṭha, the Lord's abode, and experiences Brahman's bliss directly, without the limits of karma." },
            { t: "teach", title: "Still you", body: "The liberated self does NOT dissolve into Brahman. It stays a distinct, conscious self, now fully aware of being part of Brahman's body, and joyfully serving the Lord (kaiṅkarya). For Rāmānuja this matters: love needs two, a lover and a beloved." },
            { t: "teach", title: "Advaita sees it differently", body: "For Advaita, liberation is realizing that your self was always Brahman. Advaitins say this undivided bliss lacks nothing; any state that still has separation, even a loving one, is to them still limited.", src: "advaita-summary" },
            { t: "mcq", tag: "core", q: "In Vishishtadvaita, the liberated self...", opts: ["Remains distinct and serves the Lord in bliss", "Merges and vanishes into Brahman", "Is reborn as a god", "Becomes matter"], a: 0, why: "Distinct, blissful service (kaiṅkarya)." },
            { t: "mcq", tag: "think", q: "Compare: Advaita says liberation is realizing your identity with Brahman. What does Rāmānuja think would be LOST if that were true?", opts: ["The relationship of love between the self and God", "Nothing at all", "The Vedas", "Time"], a: 0, why: "For devotion, you need two: the lover and the beloved. That's a key reason Rāmānuja keeps selves real." },
            { t: "mcq", tag: "think", q: "And how might an Advaitin answer that worry?", opts: ["Pure undivided bliss lacks nothing; love-with-separation is still a limited state", "They'd agree completely", "They would say love is evil", "They don't believe in bliss"], a: 0, why: "Both sides think their picture of liberation is the fullest. Weighing them is the heart of comparative Vedānta." },
            { t: "debate", q: "Would you rather merge with the ocean, or be a drop that loves the ocean forever?", sides: ["Merge (Advaita)", "Remain and love (Vishishtadvaita)"] }
          ]
        }
      ]
    }
  ]
};
