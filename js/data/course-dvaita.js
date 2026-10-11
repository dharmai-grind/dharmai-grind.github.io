// Dvaita course.
// Same rules as course-vishishtadvaita.js: every question must be answerable
// from earlier, non-deep teach cards in the same lesson.
DH.COURSES = DH.COURSES || {};
DH.COURSES.dvaita = {
  id: "dvaita",
  title: "Dvaita Vedanta",
  subtitle: "Madhva's philosophy of real difference",
  icon: "ti-circles",
  color: "blue",
  units: [
    {
      title: "Meet Vedanta",
      desc: "The big question all three schools ask",
      lessons: [
        {
          id: "d1-1", title: "What is Vedanta?",
          cards: [
            { t: "teach", title: "The end of the Veda", body: "Vedānta literally means 'the end of the Veda'. It names the Upaniṣads, the philosophical texts at the end of the Vedic collections, and the schools of thought that interpret them." },
            { t: "teach", title: "Three foundation texts", body: "Every Vedānta school builds on three texts, the prasthāna-traya ('three starting points'):\n• the Upaniṣads, the philosophical end of the Vedas\n• the Bhagavad Gītā, Kṛṣṇa's teaching to Arjuna\n• the Brahma Sūtras of Bādarāyaṇa, short aphorisms summarizing the Upaniṣads" },
            { t: "teach", title: "Now, the inquiry", body: "The Brahma Sūtras begin: 'Now, therefore, the inquiry into Brahman.' Brahman is the ultimate reality: that from which the world comes, by which it lives, and into which it returns. For Dvaita, Brahman is Viṣṇu.", src: "bs-1.1.1" },
            { t: "mcq", tag: "core", q: "What does 'Vedānta' literally mean?", opts: ["The end of the Veda", "The beginning of the Veda", "The song of God", "The path of action"], a: 0, why: "Veda + anta (end)." },
            { t: "match", tag: "trivia", q: "Match the foundation text to its description", pairs: [["Upaniṣads", "Philosophical end of the Vedas"], ["Bhagavad Gītā", "Kṛṣṇa's teaching to Arjuna"], ["Brahma Sūtras", "Short aphorisms by Bādarāyaṇa"]] },
            { t: "mcq", tag: "core", q: "For Dvaita, Brahman, the ultimate reality, is...", opts: ["Viṣṇu", "The world itself", "Your own self", "A force with no qualities"], a: 0, why: "Madhva identifies Brahman with Viṣṇu, the supreme God." },
            { t: "reflect", q: "If you could ask the source of everything one question, what would it be?" }
          ]
        },
        {
          id: "d1-2", title: "Three schools, one question",
          cards: [
            { t: "teach", title: "The question", body: "How is the individual self (jīva) related to Brahman? Three famous answers:" },
            { t: "teach", title: "Dvaita: really different", body: "Madhva: God, selves and matter are eternally, really different. Selves depend on God completely, but are never God. 'Dvaita' means 'two-ness', or dualism. That's this course!", src: "dvaita-summary" },
            { t: "teach", title: "The other two", body: "• Advaita (Śaṅkara): the self is ultimately identical with Brahman\n• Vishishtadvaita (Rāmānuja): one Brahman, with real selves and matter as its body\nDHARMAi has courses for both." },
            { t: "match", tag: "core", q: "Match the school to its founder", pairs: [["Advaita", "Śaṅkara"], ["Vishishtadvaita", "Rāmānuja"], ["Dvaita", "Madhva"]] },
            { t: "mcq", tag: "core", q: "'Dvaita' literally means...", opts: ["Two-ness (dualism)", "Not two", "Qualified", "Surrender"], a: 0, why: "dvi = two." },
            { t: "mcq", tag: "think", q: "Which statement would a Dvaitin agree with?", opts: ["You depend on God completely, but you will never be God", "You are secretly God", "God is your body", "There is no God"], a: 0, why: "Real, eternal difference with total dependence." },
            { t: "debate", q: "Is it better to say the self is identical to God, different from God, or part of God?", sides: ["Identical (Advaita)", "Part of, like a body (Vishishtadvaita)", "Different (Dvaita)"] }
          ]
        }
      ]
    },
    {
      title: "Madhva",
      desc: "History: the teacher from Udupi",
      lessons: [
        {
          id: "d2-1", title: "The boy from Udupi",
          cards: [
            { t: "teach", title: "Born near Udupi", body: "Tradition says Madhva was born at Pājaka, near Udupi in Karnataka. His childhood name was Vāsudeva. The usual dates are 1238–1317, though some scholars prefer 1199–1278.", src: "madhva-life" },
            { t: "teach", title: "A student who disagreed", body: "He became a monk under Acyutaprekṣa, a teacher of Advaita. But Madhva came to disagree with Advaita. As a monk he was named Pūrṇaprajña ('full of wisdom') and later Ānandatīrtha." },
            { t: "teach", title: "Hanumān's line", body: "Madhva's followers revere him as the third incarnation of Vāyu, the wind god, after Hanumān in the Rāmāyaṇa and Bhīma in the Mahābhārata. (Angada knew Hanumān well!)", src: "madhva-life" },
            { t: "mcq", tag: "trivia", q: "Where was Madhva born, according to tradition?", opts: ["Pājaka, near Udupi", "Kāladi, Kerala", "Śrīperumbudūr", "Varanasi"], a: 0, why: "Kāladi is Śaṅkara's birthplace; Śrīperumbudūr is Rāmānuja's." },
            { t: "mcq", tag: "core", q: "Madhva's first teacher, Acyutaprekṣa, taught which school?", opts: ["Advaita", "Dvaita", "Vishishtadvaita", "Buddhism"], a: 0, why: "Madhva disagreed with his teacher and built a very different system." },
            { t: "order", tag: "trivia", q: "Put the three incarnations of Vāyu (as Madhva's followers see them) in order", items: ["Hanumān", "Bhīma", "Madhva"] },
            { t: "mcq", tag: "think", q: "Rāmānuja and Madhva both started with teachers they disagreed with. What does that say about Indian philosophy?", opts: ["Disagreeing with a teacher, carefully and respectfully, could produce whole new schools", "Students should never question teachers", "Teachers were always wrong", "It was a coincidence"], a: 0, why: "Debate and disagreement drove the tradition forward." }
          ]
        },
        {
          id: "d2-2", title: "Kṛṣṇa of Udupi",
          cards: [
            { t: "teach", title: "A storm at sea", body: "A famous story: a ship was caught in a storm off the coast near Udupi. Madhva helped it to safety, and from the ship's cargo he was given a lump of clay (gopīcandana). Inside was an image of Kṛṣṇa, which he installed at Udupi.", src: "madhva-life" },
            { t: "teach", title: "Eight monasteries", body: "Madhva founded eight monasteries (the aṣṭa maṭha) at Udupi. Their heads take turns caring for the Kṛṣṇa temple. This rotation is called paryāya. Each turn was once two months; in the 1500s the saint Vādirāja changed it to two years, and that's how it still works today." },
            { t: "mcq", tag: "core", q: "What was found inside the lump of clay from the ship?", opts: ["An image of Kṛṣṇa", "A golden book", "A seashell", "A sword"], a: 0, why: "The Kṛṣṇa image still worshipped at Udupi." },
            { t: "mcq", tag: "trivia", q: "What is the 'paryāya' at Udupi?", opts: ["The two-year rotation of temple care among the eight monasteries", "A boat race", "A type of sweet", "A Sanskrit poem"], a: 0, why: "Each of the eight maṭha heads takes a two-year turn." },
            { t: "tf", tag: "trivia", q: "Madhva founded eight monasteries at Udupi.", a: true, why: "The aṣṭa maṭha, 'eight monasteries'." },
            { t: "mcq", tag: "think", q: "Why might taking turns (paryāya) be a wise way to run a temple?", opts: ["It shares responsibility fairly and keeps every monastery invested", "Because nobody wanted the job", "To confuse visitors", "It isn't wise"], a: 0, why: "Shared, rotating leadership: an old idea that still works." },
            { t: "reflect", q: "Have you visited a temple or place with an interesting origin story? What is it?" }
          ]
        },
        {
          id: "d2-3", title: "Madhva's writings",
          cards: [
            { t: "teach", title: "37 works", body: "Madhva wrote 37 works, together called the Sarvamūla Granthas. They include commentaries on the Brahma Sūtras, the Gītā and the Upaniṣads.", src: "madhva-works" },
            { t: "teach", title: "The Mahābhārata matters", body: "Madhva gave special weight to the Mahābhārata. His Mahābhārata Tātparya Nirṇaya explains what he saw as its true meaning: the supremacy of Viṣṇu." },
            { t: "teach", title: "Tattvavāda", body: "Madhva called his own philosophy Tattvavāda, 'the doctrine of reality', because it insists that the world and its differences are real. The name 'Dvaita' came to be used more widely later." },
            { t: "mcq", tag: "core", q: "What did Madhva call his own philosophy?", opts: ["Tattvavāda, 'the doctrine of reality'", "Māyāvāda", "Viśiṣṭādvaita", "Sāṃkhya"], a: 0, why: "It stresses that the world and its differences are real." },
            { t: "mcq", tag: "trivia", q: "How many works did Madhva write, according to the tradition?", opts: ["37", "4", "108", "700"], a: 0, why: "The Sarvamūla Granthas." },
            { t: "mcq", tag: "think", q: "Why might Madhva have given special weight to the Mahābhārata, not just the Upaniṣads?", opts: ["He saw it as a key scripture for understanding Viṣṇu's supremacy", "Because it's short", "Because it's in Kannada", "He didn't like the Upaniṣads"], a: 0, why: "He used the epic alongside the Upaniṣads to support his view." }
          ]
        }
      ]
    },
    {
      title: "Five differences",
      desc: "Why Dvaita says difference is real",
      lessons: [
        {
          id: "d3-1", title: "Pañca-bheda",
          cards: [
            { t: "teach", title: "Five real differences", body: "Dvaita's signature teaching is pañca-bheda, five eternal differences:\n• God ≠ souls\n• God ≠ matter\n• soul ≠ soul\n• soul ≠ matter\n• matter ≠ matter", src: "dvaita-doctrine" },
            { t: "teach", title: "Why it matters", body: "For Madhva, difference isn't a mistake to get over. It's built into reality. You are really you, I am really me, and neither of us is God. Things are what they are." },
            { t: "mcq", tag: "core", q: "How many eternal differences does Dvaita teach?", opts: ["Five", "Two", "Three", "Seven"], a: 0, why: "pañca = five, bheda = difference." },
            { t: "tf", tag: "core", q: "In Dvaita, one soul is really and eternally different from another soul.", a: true, why: "Soul ≠ soul is one of the five differences." },
            { t: "mcq", tag: "think", q: "Which pair is NOT one of the five differences?", opts: ["God ≠ God", "Soul ≠ matter", "God ≠ souls", "Matter ≠ matter"], a: 0, why: "There's only one God, so there's nothing to differ from!" },
            { t: "mcq", tag: "think", q: "How does Dvaita's view of difference compare with Advaita's?", opts: ["Dvaita says difference is ultimately real; Advaita says it isn't ultimately real", "They agree completely", "Both say only matter is real", "Neither talks about difference"], a: 0, why: "This is the core disagreement between the two schools." }
          ]
        },
        {
          id: "d3-2", title: "Independent and dependent",
          cards: [
            { t: "teach", title: "Two kinds of reality", body: "Madhva divides everything into two kinds:\n• svatantra, 'independent': only Viṣṇu\n• paratantra, 'dependent': everything else, souls and matter", src: "dvaita-doctrine" },
            { t: "teach", title: "A reflection", body: "Madhva compares the soul to a reflection (pratibimba) of God, the original (bimba). A reflection is real and has its own place, but it depends completely on the original. It can never exist or act on its own." },
            { t: "teach", title: "Compare Rāmānuja", body: "Rāmānuja (Vishishtadvaita) uses a different picture: souls are God's BODY, inseparably connected to God the way a body is to its soul. Madhva's reflection keeps a sharper line: a reflection is never part of the original." },
            { t: "match", tag: "core", q: "Match the term to its meaning", pairs: [["Svatantra", "Independent: Viṣṇu alone"], ["Paratantra", "Dependent: everything else"], ["Bimba", "The original"], ["Pratibimba", "The reflection"]] },
            { t: "mcq", tag: "core", q: "In Madhva's analogy, the soul is like...", opts: ["A reflection that depends on the original", "A wave that is the ocean", "A body that God wears", "A dream"], a: 0, why: "Real, distinct and wholly dependent." },
            { t: "mcq", tag: "think", q: "How is the reflection image different from Rāmānuja's body–soul image?", opts: ["A reflection stays outside and separate from the original; a body is inseparably connected to its soul", "They're exactly the same", "Rāmānuja used reflections too", "Neither talks about dependence"], a: 0, why: "Both stress dependence, but Dvaita keeps a sharper line of difference." },
            { t: "debate", q: "Does depending completely on God make the self less real?", sides: ["Yes, total dependence means less real", "No, dependent things are still real"] }
          ]
        },
        {
          id: "d3-3", title: "The world is real",
          cards: [
            { t: "teach", title: "Not an illusion", body: "For Madhva, the world is real, not māyā or an illusion. Our senses and reasoning generally give us true knowledge of a real world, created and ruled by Viṣṇu." },
            { t: "teach", title: "The Supreme Person", body: "The Gītā's 15th chapter speaks of the perishable (all beings), the imperishable, and a third, highest being, Puruṣottama, the Supreme Person, distinct from both. Dvaita sees this as clear support for God's difference from everything else.", src: "bg-15.16-18" },
            { t: "mcq", tag: "core", q: "For Dvaita, the world is...", opts: ["Real, created and ruled by Viṣṇu", "An illusion like a dream", "Brahman in disguise", "Only in our minds"], a: 0, why: "Madhva insists the world is real." },
            { t: "mcq", tag: "core", q: "What does 'Puruṣottama' mean in Gītā 15?", opts: ["The Supreme Person", "The perishable world", "A sacred river", "A kind of soul"], a: 0, why: "puruṣa (person) + uttama (highest)." },
            { t: "mcq", tag: "think", q: "Why might Dvaita say trusting our senses matters for philosophy?", opts: ["If our senses usually show a real world of many things, difference must be real", "Senses are always wrong", "Philosophy ignores the senses", "To win arguments faster"], a: 0, why: "Everyday experience shows difference everywhere; Dvaita takes that seriously." },
            { t: "reflect", q: "What's one thing you're sure is real? How do you know?" }
          ]
        }
      ]
    },
    {
      title: "Reading the Upaniṣads",
      desc: "Same verses, different meanings",
      lessons: [
        {
          id: "d4-1", title: "'You are NOT that'?",
          cards: [
            { t: "teach", title: "The famous sentence", body: "In the Chāndogya Upaniṣad, a father teaches his son: 'tat tvam asi', usually translated 'You are that.' Advaita reads it as identity with Brahman.", src: "cu-6.8.7" },
            { t: "teach", title: "Madhva's split", body: "In Sanskrit, the words just before it are 'sa ātmā', joined to 'tat tvam asi'. Sounds at word boundaries blend together (this is called sandhi), so Madhva points out the joined sounds can also be read as 'sa ātmā atat tvam asi': 'that is the self; you are NOT that.'", src: "madhva-tat-tvam-asi" },
            { t: "teach", title: "Likeness, not sameness", body: "Madhva also explains the phrase as expressing the soul's likeness to and dependence on God, the way a reflection resembles the original without being it." },
            { t: "mcq", tag: "core", q: "How does Madhva's famous re-reading render the sentence?", opts: ["'You are NOT that'", "'You are that'", "'That is you'", "'You are everything'"], a: 0, why: "By reading 'atat' (not-that) in the joined Sanskrit." },
            { t: "mcq", tag: "think", q: "Why can the same Sanskrit be read two ways?", opts: ["In Sanskrit, joined sounds can hide where one word ends and the next begins", "Because Madhva changed the text", "Because it's a typo", "Because Sanskrit has no grammar"], a: 0, why: "Sound-joining (sandhi) can make word boundaries ambiguous." },
            { t: "mcq", tag: "think", q: "Besides the 'atat' reading, how else does Madhva explain the phrase?", opts: ["As likeness to and dependence on God, not sameness", "As strict identity", "As a joke", "As a ritual instruction"], a: 0, why: "Like a reflection: similar, but never the same." },
            { t: "debate", q: "Is it fair to re-read a famous sentence by splitting the Sanskrit differently?", sides: ["Yes, if the grammar allows it", "No, it ignores the usual meaning"] }
          ]
        },
        {
          id: "d4-2", title: "One among many",
          cards: [
            { t: "teach", title: "Eternal among eternals", body: "The Kaṭha Upaniṣad calls God 'the eternal among eternals, the conscious among the conscious, the one among many'. Dvaita reads this as many eternal, conscious souls, with God the supreme one among them.", src: "katha-2.2.13" },
            { t: "teach", title: "Two birds", body: "The Muṇḍaka Upaniṣad describes two birds on one tree: one eats the fruit, the other watches. For Dvaita, these are clearly two: the soul and God.", src: "mu-3.1.1" },
            { t: "mcq", tag: "core", q: "Dvaita reads 'the eternal among eternals' as showing...", opts: ["Many eternal souls, with God supreme among them", "That only one thing exists", "That souls are not eternal", "That God is a soul like us"], a: 0, why: "Many eternals, one supreme." },
            { t: "mcq", tag: "core", q: "In Dvaita's reading of the two-birds verse, the birds are...", opts: ["The soul and God, truly two", "One self appearing as two", "Two gods", "Two trees"], a: 0, why: "Two birds, two beings." },
            { t: "mcq", tag: "think", q: "An Advaitin reads the same two-birds verse as one self appearing as two. What does this show?", opts: ["Schools often agree on the texts but disagree on how to read them", "One school didn't read the verse", "The verse has no meaning", "Birds are important in Vedānta"], a: 0, why: "The debate is about interpretation, not which texts count." }
          ]
        },
        {
          id: "d4-3", title: "A ladder of beings",
          cards: [
            { t: "teach", title: "Tāratamya", body: "Madhva taught tāratamya, a gradation of beings: Viṣṇu is supreme, then Lakṣmī, then the other gods and souls in order of rank.", src: "taratamya" },
            { t: "teach", title: "Each soul's own nature", body: "Each soul has its own innate nature (svarūpa). Even in liberation, souls stay distinct and enjoy different degrees of bliss, each full to its own capacity, like cups of different sizes all filled to the brim." },
            { t: "teach", title: "A debated idea", body: "Madhva also taught that souls differ in their deepest nature, and that some are not destined for liberation. This is one of the most debated ideas in Indian philosophy, and other schools strongly disagree with it." },
            { t: "mcq", tag: "core", q: "What does 'tāratamya' mean in Dvaita?", opts: ["A gradation or ranking of beings", "Equality of all souls", "A type of meditation", "The five differences"], a: 0, why: "Viṣṇu at the top, then Lakṣmī, gods and souls in order." },
            { t: "mcq", tag: "core", q: "According to the cup analogy, liberated souls...", opts: ["Enjoy different amounts of bliss, each filled to its own capacity", "All become identical", "Feel no bliss", "Become gods"], a: 0, why: "Different sizes, all full." },
            { t: "mcq", tag: "think", q: "Why might the idea that some souls aren't destined for liberation be so debated?", opts: ["It raises hard questions about fairness and free will", "Because nobody understood it", "Because it's about food", "It isn't debated"], a: 0, why: "Thinking it through carefully, from several sides, is exactly what philosophy is for." },
            { t: "reflect", q: "Is a world where everyone is 'filled to their own capacity' fair? Why or why not?" }
          ]
        }
      ]
    },
    {
      title: "The path and legacy",
      desc: "Devotion, debate and song",
      lessons: [
        {
          id: "d5-1", title: "Knowledge, love and grace",
          cards: [
            { t: "teach", title: "Knowing leads to loving", body: "For Dvaita, liberation comes through bhakti built on knowledge (jñāna-pūrvaka bhakti): understanding God's greatness and your own dependence leads to deep, steady love for Viṣṇu." },
            { t: "teach", title: "Grace decides", body: "But effort alone isn't enough. Liberation finally comes through God's grace (prasāda). The soul then sees God directly and lives in bliss, still distinct, still serving." },
            { t: "teach", title: "Compare Advaita", body: "Advaita sees liberation very differently: realizing that your self was always Brahman, with no second left over. For Dvaita, that would erase the loving relationship between the soul and God." },
            { t: "mcq", tag: "core", q: "In Dvaita, what finally brings liberation?", opts: ["God's grace, after devotion built on knowledge", "Realizing you are God", "Ritual alone", "Winning debates"], a: 0, why: "Knowledge leads to devotion; grace completes it." },
            { t: "mcq", tag: "core", q: "'Jñāna-pūrvaka bhakti' means...", opts: ["Devotion built on knowledge", "Knowledge without devotion", "Action without thought", "Silent meditation"], a: 0, why: "jñāna (knowledge) + pūrvaka (preceded by) + bhakti (devotion)." },
            { t: "mcq", tag: "think", q: "How is Dvaita's idea of liberation different from Advaita's?", opts: ["The soul stays distinct and loves God, rather than realizing identity with Brahman", "They're identical", "Dvaita has no liberation", "Advaita says liberation is by grace alone"], a: 0, why: "Love needs two, Dvaita and Vishishtadvaita agree on that." }
          ]
        },
        {
          id: "d5-2", title: "The great debate continues",
          cards: [
            { t: "teach", title: "Vyāsatīrtha", body: "Centuries after Madhva, the brilliant Dvaita scholar Vyāsatīrtha (1460–1539) wrote the Nyāyāmṛta ('nectar of logic'), a sharp critique of Advaita.", src: "vyasatirtha" },
            { t: "teach", title: "Advaita answers", body: "The Advaita scholar Madhusūdana Sarasvatī replied with the Advaitasiddhi ('the proof of Advaita'). Then Dvaita scholars replied to the reply, and so on for generations: one of history's longest philosophical conversations." },
            { t: "match", tag: "core", q: "Match the scholar to their work", pairs: [["Vyāsatīrtha", "Nyāyāmṛta"], ["Madhusūdana Sarasvatī", "Advaitasiddhi"]] },
            { t: "mcq", tag: "trivia", q: "Which school did Vyāsatīrtha belong to?", opts: ["Dvaita", "Advaita", "Vishishtadvaita", "Mīmāṃsā"], a: 0, why: "He was one of Dvaita's greatest scholars." },
            { t: "mcq", tag: "think", q: "What's valuable about a debate that goes on for generations?", opts: ["Each side sharpens its ideas by answering the best objections", "Nothing; someone should have won", "It proves both sides are wrong", "It means nobody was paying attention"], a: 0, why: "Strong opponents make stronger arguments, on both sides." },
            { t: "debate", q: "Is difference real, or only how things look at the everyday level?", sides: ["Difference is real (Dvaita)", "Only at the everyday level (Advaita)"] }
          ]
        },
        {
          id: "d5-3", title: "Songs of the Haridāsas",
          cards: [
            { t: "teach", title: "Philosophy in song", body: "The Haridāsas ('servants of Hari') spread Dvaita devotion through songs in Kannada, the everyday language of the region, not just Sanskrit.", src: "haridasas" },
            { t: "teach", title: "Purandaradāsa", body: "Purandaradāsa, a student of Vyāsatīrtha, composed thousands of songs. He's called the grandfather (pitāmaha) of Carnatic music, and music students still start with lessons he designed." },
            { t: "teach", title: "Kanaka's window", body: "A famous story: the poet-saint Kanakadāsa was kept out of the Udupi temple. As he sang outside, the Kṛṣṇa image turned to face him through a small window. That window is still called 'Kanakana Kiṇḍi', Kanaka's window." },
            { t: "mcq", tag: "core", q: "In which language did the Haridāsas mainly sing?", opts: ["Kannada", "Sanskrit only", "Tamil", "Bengali"], a: 0, why: "The everyday language of Karnataka." },
            { t: "mcq", tag: "trivia", q: "Who is called the grandfather of Carnatic music?", opts: ["Purandaradāsa", "Kanakadāsa", "Madhva", "Vyāsatīrtha"], a: 0, why: "A student of Vyāsatīrtha who composed thousands of songs." },
            { t: "mcq", tag: "think", q: "What message does the story of Kanaka's window send?", opts: ["Devotion matters more than who is allowed in", "Windows are sacred", "Temples should have no doors", "Singing is forbidden"], a: 0, why: "The story challenges exclusion: God turns toward the devotee kept outside." },
            { t: "reflect", q: "Why might songs in an everyday language spread a philosophy faster than books?" }
          ]
        }
      ]
    }
  ]
};
