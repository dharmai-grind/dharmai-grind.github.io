// Navaratri course: permanent, but highlighted while the festival is on.
// Same rules as course-vishishtadvaita.js: every question must be answerable
// from earlier, non-deep teach cards in the same lesson.
DH.COURSES = DH.COURSES || {};
DH.COURSES.navaratri = {
  id: "navaratri",
  title: "Navaratri",
  subtitle: "Nine nights of the Goddess",
  icon: "ti-sparkles",
  color: "pink",
  festival: true,
  units: [
    {
      title: "The festival",
      desc: "Nine nights, many faces",
      lessons: [
        {
          id: "n1-1", title: "Nine nights",
          cards: [
            { t: "teach", title: "Nava + rātri", body: "Navarātri means 'nine nights'. The best known one, Śāradā Navarātri, falls in the lunar month of Āśvina (around September or October), and the tenth day is Vijayadaśamī, 'the day of victory'." },
            { t: "teach", title: "More than one", body: "There are actually several Navarātris in the year. Another popular one, Caitra Navarātri in spring, ends with Rāma Navamī, Rāma's birthday.", deep: true },
            { t: "teach", title: "Three times three", body: "In many South Indian homes the nine nights are grouped in threes: Durgā (strength), Lakṣmī (prosperity), then Sarasvatī (learning). In much of North India, each night honors one of nine forms of Durgā (Navadurgā). Customs vary." },
            { t: "mcq", tag: "core", q: "What does 'Navarātri' mean?", opts: ["Nine nights", "New moon", "Nine gods", "Night of lamps"], a: 0, why: "nava = nine, rātri = night." },
            { t: "order", tag: "core", q: "In the common South Indian grouping, put the goddesses in order of the nights", items: ["Durgā", "Lakṣmī", "Sarasvatī"] },
            { t: "tf", tag: "trivia", q: "The tenth day, right after the nine nights, is called Vijayadaśamī.", a: true, why: "vijaya = victory, daśamī = tenth day." },
            { t: "mcq", tag: "think", q: "Why might the nights move from strength (Durgā) to prosperity (Lakṣmī) to learning (Sarasvatī)?", opts: ["One popular reading: first remove what's harmful, then build what's good, then gain wisdom", "Alphabetical order", "It's random", "Because Sarasvatī is the youngest"], a: 0, why: "That's a common interpretation, not the only one. Can you think of another?" }
          ]
        },
        {
          id: "n1-2", title: "One festival, many faces",
          cards: [
            { t: "teach", title: "Across India", body: "Navarātri looks totally different depending on where you are:\n• Golu/Kolu doll steps in Tamil Nadu, Karnataka and Andhra\n• Durgā Pūjā pandals in Bengal\n• Garbā and Daṇḍiyā dances in Gujarat\n• Rāmlīlā plays and Dussehra in much of the North\n• the royal Dasara in Mysuru\n• Bathukamma flower stacks in Telangana", src: "navaratri-practice" },
            { t: "teach", title: "Learning begins", body: "In Kerala and elsewhere, Vijayadaśamī is the day for Vidyārambham: small children write their first letters, often in a plate of rice." },
            { t: "match", tag: "core", q: "Match the region to its tradition", pairs: [["Bengal", "Durgā Pūjā"], ["Gujarat", "Garbā and Daṇḍiyā"], ["Tamil Nadu", "Golu"], ["Telangana", "Bathukamma"]] },
            { t: "mcq", tag: "trivia", q: "On Vijayadaśamī in Kerala, young children often...", opts: ["Write their first letters (Vidyārambham)", "Fly kites", "Burn effigies", "Throw colored powder"], a: 0, why: "Vidyā = learning, ārambham = beginning." },
            { t: "mcq", tag: "think", q: "One festival, celebrated so differently. What does that suggest about Hindu traditions?", opts: ["They grow from shared texts AND local culture, so practice varies a lot", "Only one region does it correctly", "The festival has no meaning", "Everyone copied Bengal"], a: 0, why: "Shared roots, many branches. That's why DHARMAi marks regional customs separately from texts." },
            { t: "reflect", q: "How does YOUR family celebrate Navarātri, if it does? What's one thing you'd like to know the reason for?" }
          ]
        },
        {
          id: "n1-3", title: "Golu",
          cards: [
            { t: "teach", title: "Steps of dolls", body: "Golu (also Kolu or Bommai Kolu; Bombe Habba in Karnataka; Bommala Koluvu in Andhra) is a display of dolls on steps called padi. Families usually use an odd number of steps: 3, 5, 7, 9 or more." },
            { t: "teach", title: "What goes where", body: "A common arrangement puts deities on the top steps, then saints and great figures, then everyday life (markets, weddings, villages) lower down. Many families include a wooden couple called the marapācci bommai. Every family has its own way." },
            { t: "teach", title: "Visiting", body: "Friends and neighbors visit each other's Golus in the evenings, sing, and receive sundal (a spiced lentil or chickpea dish) and a small gift (tāmbūlam)." },
            { t: "mcq", tag: "core", q: "The steps of a Golu are called...", opts: ["Padi", "Pandal", "Garbo", "Mandapa"], a: 0, why: "Padi = step. A pandal is a Durgā Pūjā marquee in Bengal." },
            { t: "tf", tag: "trivia", q: "Golu steps are usually an odd number.", a: true, why: "3, 5, 7, 9 or 11 are common." },
            { t: "mcq", tag: "trivia", q: "What snack is traditionally given to Golu visitors?", opts: ["Sundal", "Jalebi", "Samosa", "Payasam only on day 1"], a: 0, why: "Often a different sundal each day!" },
            { t: "mcq", tag: "think", q: "Deities at the top, everyday life at the bottom. What idea might that arrangement express?", opts: ["A picture of the whole universe ordered from the divine down to daily life", "Heavier dolls go on top", "It's purely decoration", "The bottom step is least important"], a: 0, why: "One popular reading. Some also see it as the divine being present in every level of life." },
            { t: "debate", q: "Should Golu stick to traditional dolls, or is it great when people add new themes (space, Lego, cricket)?", sides: ["Keep it traditional", "New themes keep it alive"] }
          ]
        }
      ]
    },
    {
      title: "The Devī Māhātmya",
      desc: "The great text of the Goddess",
      lessons: [
        {
          id: "n2-1", title: "The Glory of the Goddess",
          cards: [
            { t: "teach", title: "700 verses", body: "The Devī Māhātmya ('Glory of the Goddess'), also called the Durgā Saptaśatī ('700 verses') or Caṇḍī Pāṭh, is a text of about 700 verses in 13 chapters, inside the Mārkaṇḍeya Purāṇa. Many people recite it during Navarātri.", src: "devi-mahatmya-summary" },
            { t: "teach", title: "A story inside a story", body: "It begins with a king, Suratha, who lost his kingdom, and a merchant, Samādhi, abandoned by his family. Both still can't stop worrying about what they lost. They ask the sage Medhas why, and he answers by telling of the Goddess." },
            { t: "teach", title: "Her hymn", body: "One of its most famous hymns honors the Goddess present in all beings as power, as intelligence, as compassion, and more.", src: "dm-5" },
            { t: "mcq", tag: "core", q: "Another name for the Devī Māhātmya is...", opts: ["Durgā Saptaśatī", "Rāmāyaṇa", "Bhagavad Gītā", "Lalitā Sahasranāma"], a: 0, why: "Saptaśatī = 'seven hundred', for its ~700 verses." },
            { t: "mcq", tag: "trivia", q: "The Devī Māhātmya is part of which Purāṇa?", opts: ["Mārkaṇḍeya Purāṇa", "Bhāgavata Purāṇa", "Viṣṇu Purāṇa", "Śiva Purāṇa"], a: 0, why: "It's chapters 81–93 of the Mārkaṇḍeya Purāṇa in the usual numbering." },
            { t: "mcq", tag: "think", q: "Why might the text START with a king and a merchant who can't let go of what they lost?", opts: ["It frames the Goddess's stories as an answer to a real human problem: attachment and suffering", "To fill space", "Because they are the villains", "To teach economics"], a: 0, why: "The mythic battles are told to help two worried people understand their minds." }
          ]
        },
        {
          id: "n2-2", title: "Three battles",
          cards: [
            { t: "teach", title: "Madhu and Kaiṭabha", body: "First story: while Viṣṇu sleeps on the cosmic ocean, two demons, Madhu and Kaiṭabha, threaten Brahmā. The Goddess, as the power of sleep (Yoganidrā), withdraws from Viṣṇu so he can wake and defeat them." },
            { t: "teach", title: "Mahiṣāsura", body: "Second story: the buffalo demon Mahiṣāsura conquers the gods. Their combined radiance and powers come together as the Goddess, who defeats him. That's why she's called Mahiṣāsuramardinī. Yet the text's own hymns praise her as the power behind everything, present in all beings, so she's more than just the sum of the gods." },
            { t: "teach", title: "Śumbha and Niśumbha", body: "Third story: the demon brothers Śumbha and Niśumbha. In this part, the fierce Kālī appears, defeats Caṇḍa and Muṇḍa (becoming Cāmuṇḍā), and swallows the blood of Raktabīja, a demon whose every drop of blood spawned a copy of himself.", src: "devi-mahatmya-summary" },
            { t: "order", tag: "core", q: "Put the three stories in the order they appear", items: ["Madhu and Kaiṭabha", "Mahiṣāsura", "Śumbha and Niśumbha"] },
            { t: "mcq", tag: "trivia", q: "Which demon multiplied from every drop of his blood?", opts: ["Raktabīja", "Mahiṣāsura", "Madhu", "Rāvaṇa"], a: 0, why: "rakta = blood, bīja = seed." },
            { t: "mcq", tag: "think", q: "Raktabīja keeps multiplying when struck. Many readers treat him as a symbol. Of what, most plausibly?", opts: ["Desires or bad habits that multiply when fought the wrong way", "Rain", "Kingdoms", "Numbers"], a: 0, why: "A popular interpretation, not stated in the text itself. Notice the difference between what a text SAYS and how people READ it." },
            { t: "mcq", tag: "think", q: "In the Mahiṣāsura story, the Goddess forms from all the gods' powers combined. Yet the hymns praise her as the power behind everything. How can both be true?", opts: ["Many readers say her 'emergence' is a manifestation of a power that was always there, not a creation", "They can't; the text is wrong", "The gods are lying", "It's a translation error"], a: 0, why: "A real puzzle worth thinking about! Different traditions answer it differently." }
          ]
        }
      ]
    },
    {
      title: "Victory",
      desc: "The last days",
      lessons: [
        {
          id: "n3-1", title: "Sarasvatī and Āyudha Pūjā",
          cards: [
            { t: "teach", title: "Books and tools rest", body: "Near the end of Navarātri, many families honor Sarasvatī by placing books, instruments and study materials before her. The books 'rest': in many homes students don't study that day, and take their books back, often on Vijayadaśamī, to begin learning anew. On Mahānavamī, the ninth day, Āyudha Pūjā honors tools, weapons, vehicles and machines: everything that helps us work." },
            { t: "teach", title: "A prayer before studying", body: "A widely recited prayer asks Sarasvatī for success at the start of learning.", src: "sarasvati-prayer" },
            { t: "mcq", tag: "core", q: "What is honored during Āyudha Pūjā?", opts: ["Tools, instruments and vehicles", "Only weapons from wars", "Only animals", "Only temples"], a: 0, why: "Āyudha = weapon or tool. Today that includes computers and cars!" },
            { t: "tf", tag: "trivia", q: "In many homes, students don't study on the day their books are placed before Sarasvatī.", a: true, why: "Customs vary from family to family." },
            { t: "mcq", tag: "think", q: "Why would a culture honor TOOLS once a year?", opts: ["To show gratitude for what supports our work and see the sacred in everyday things", "Because tools are gods", "To get new tools", "It's only for factories"], a: 0, why: "Gratitude and seeing the divine in daily life run through many Hindu practices." },
            { t: "reflect", q: "If you did an Āyudha Pūjā today, which 'tool' in your life would you thank?" }
          ]
        },
        {
          id: "n3-2", title: "Two victories",
          cards: [
            { t: "teach", title: "The Goddess wins", body: "For many, Vijayadaśamī celebrates the Goddess's victory over Mahiṣāsura. In Bengal, Durgā's images are immersed in water as she 'returns home'." },
            { t: "teach", title: "Rāma wins", body: "In much of North India, Vijayadaśamī (Dussehra) celebrates Rāma's victory over Rāvaṇa. Rāmlīlā plays end with huge Rāvaṇa effigies burned. Yes, our own Angada is in that story: before the war, Rāma sent him into Rāvaṇa's court as his messenger! His famous 'unmovable foot' scene, a Rāmlīlā favorite, comes from Tulsīdās's Hindi retelling.", src: "tulsidas-angada" },
            { t: "mcq", tag: "core", q: "In North Indian Dussehra, whose victory is celebrated?", opts: ["Rāma's victory over Rāvaṇa", "Kṛṣṇa's victory over Kaṃsa", "Arjuna's victory", "Indra's victory"], a: 0, why: "Rāmlīlā ends with burning effigies of Rāvaṇa." },
            { t: "mcq", tag: "think", q: "Two different stories for the same day. Which explanation is most reasonable?", opts: ["Different regions attached their important victory stories to the same 'day of victory'", "One story is fake", "They are the same story", "It's a calendar mistake"], a: 0, why: "Festivals collect meanings over centuries. Both are honored in tradition." },
            { t: "mcq", tag: "trivia", q: "Which vānara, our mascot, was Rāma's messenger to Rāvaṇa's court?", opts: ["Angada", "Sugrīva", "Vālī", "Jāmbavān"], a: 0, why: "That's me! Jāmbavān was a bear, by the way." },
            { t: "debate", q: "Should a festival keep one 'official' story, or is it richer with many?", sides: ["One shared story", "Many stories"] }
          ]
        }
      ]
    }
  ]
};
