// Bhagavad Gītā course (Literature).
// Same rules as the other courses: every question must be answerable from
// earlier, non-deep teach cards in the same lesson. Keep what the text SAYS
// separate from how schools and modern readers INTERPRET it.
DH.COURSES = DH.COURSES || {};
DH.COURSES.gita = {
  id: "gita",
  title: "Bhagavad Gītā",
  subtitle: "Kṛṣṇa's teaching on the battlefield",
  icon: "ti-book-2",
  color: "coral",
  kind: "literature",
  units: [
    {
      title: "The setting",
      desc: "A conversation on a battlefield",
      lessons: [
        {
          id: "g1-1", title: "A song inside an epic",
          cards: [
            { t: "teach", title: "Song of the Lord", body: "Bhagavad Gītā means 'Song of the Lord' (or 'of the Blessed One'). It's a dialogue of 700 verses in 18 chapters.", src: "gita-setting" },
            { t: "teach", title: "Inside the Mahābhārata", body: "The Gītā isn't a separate book: it sits inside the great epic, the Mahābhārata, in its sixth book, the Bhīṣma Parva. Two sides of one family, the Kauravas and the Pāṇḍavas, are about to fight a huge war at Kurukṣetra." },
            { t: "teach", title: "Who tells the story", body: "The very first verse is asked by the blind king Dhṛtarāṣṭra, father of the Kauravas. His minister Sañjaya, given divine sight by the sage Vyāsa, describes everything he sees on the battlefield, including the whole conversation.", src: "bg-1.1" },
            { t: "mcq", tag: "core", q: "What does 'Bhagavad Gītā' mean?", opts: ["Song of the Lord", "Book of war", "Story of kings", "Great epic"], a: 0, why: "gītā = song; bhagavad = of the Lord, the Blessed One." },
            { t: "mcq", tag: "core", q: "The Gītā is part of which larger work?", opts: ["The Mahābhārata", "The Rāmāyaṇa", "The Ṛg Veda", "The Devī Māhātmya"], a: 0, why: "In its sixth book, the Bhīṣma Parva." },
            { t: "mcq", tag: "trivia", q: "How many chapters does the Gītā have?", opts: ["18", "12", "700", "4"], a: 0, why: "18 chapters, 700 verses." },
            { t: "mcq", tag: "trivia", q: "Who narrates the battlefield conversation to King Dhṛtarāṣṭra?", opts: ["Sañjaya", "Vyāsa", "Arjuna", "Bhīṣma"], a: 0, why: "Vyāsa gave Sañjaya the divine sight to see it." },
            { t: "mcq", tag: "think", q: "The first verse calls the battlefield both 'the field of dharma' and 'the field of Kuru'. Why might that matter?", opts: ["It hints the war is also a test of what's right, not just a fight", "It's just two names for a farm", "It means no one will fight", "It's a mistake"], a: 0, why: "Many readers see the opening words as setting up the Gītā's big theme: dharma." }
          ]
        },
        {
          id: "g1-2", title: "Arjuna's crisis",
          cards: [
            { t: "teach", title: "Who's on the other side?", body: "Arjuna, the greatest Pāṇḍava archer, asks Kṛṣṇa to drive his chariot between the two armies. Across the field he sees his grandfather Bhīṣma, his teacher Droṇa, cousins and friends." },
            { t: "teach", title: "He puts down his bow", body: "Overwhelmed, Arjuna's bow, Gāṇḍīva, slips from his hand. He says he'd rather not win a kingdom than kill his own family, and sits down in his chariot, unwilling to fight." },
            { t: "teach", title: "Teach me", body: "Then Arjuna does something important: he admits he's confused about what's right, and asks Kṛṣṇa to teach him as a student. The rest of the Gītā is Kṛṣṇa's answer.", src: "bg-2.7" },
            { t: "mcq", tag: "core", q: "Why does Arjuna refuse to fight?", opts: ["He sees his own relatives and teachers on the other side", "He is afraid of losing", "He is injured", "He wants a bigger army"], a: 0, why: "Bhīṣma, Droṇa, cousins and friends." },
            { t: "mcq", tag: "trivia", q: "What is the name of Arjuna's bow?", opts: ["Gāṇḍīva", "Sudarśana", "Vajra", "Pināka"], a: 0, why: "It slips from his hand in his despair." },
            { t: "mcq", tag: "core", q: "In 2.7, what does Arjuna ask Kṛṣṇa to do?", opts: ["Teach him, as a student, what is truly best", "Fight in his place", "End the war by magic", "Take him home"], a: 0, why: "'I am your student. Teach me.'" },
            { t: "mcq", tag: "think", q: "Why might it matter that Arjuna admits he's confused before Kṛṣṇa teaches?", opts: ["Real learning starts with admitting you don't know", "Teachers only teach weak people", "It makes the book longer", "It doesn't matter"], a: 0, why: "Recognizing your own confusion opens the door to understanding." },
            { t: "reflect", q: "Have you ever faced a choice where two things you cared about pulled you in opposite directions?" }
          ]
        },
        {
          id: "g1-3", title: "Kṛṣṇa the charioteer",
          cards: [
            { t: "teach", title: "A charioteer who is God", body: "In the war, Kṛṣṇa agreed not to fight, only to drive Arjuna's chariot. He is Arjuna's friend and relative, but in the Gītā he reveals himself as God, the Supreme Lord." },
            { t: "teach", title: "A conversation, not a lecture", body: "The Gītā is a dialogue. Arjuna asks real questions and even pushes back: 'If knowledge is better than action, why are you urging me into this terrible action?' (3.1). Kṛṣṇa answers each one." },
            { t: "mcq", tag: "core", q: "What role does Kṛṣṇa take in the war?", opts: ["Arjuna's charioteer, without fighting", "Commander of the army", "A spy", "King of the Kauravas"], a: 0, why: "He drives the chariot and teaches." },
            { t: "tf", tag: "core", q: "In the Gītā, Arjuna only listens and never questions Kṛṣṇa.", a: false, why: "He asks questions and pushes back, like in 3.1." },
            { t: "mcq", tag: "think", q: "Why might a teaching be written as a conversation instead of a list of rules?", opts: ["It shows ideas being questioned and explained, which helps readers think too", "Conversations are shorter", "Rules weren't allowed", "So nobody understands it"], a: 0, why: "A dialogue models the questioning it hopes readers will do." },
            { t: "reflect", q: "If you could ask Kṛṣṇa one question in Arjuna's place, what would it be?" }
          ]
        }
      ]
    },
    {
      title: "The self",
      desc: "Kṛṣṇa's first answer: you are more than your body",
      lessons: [
        {
          id: "g2-1", title: "You never die",
          cards: [
            { t: "teach", title: "Childhood to old age", body: "Kṛṣṇa begins with the self (ātman): just as the self passes through childhood, youth and old age in one body, it passes on to another body. The wise aren't confused by this.", src: "bg-2.13" },
            { t: "teach", title: "Unborn, undying", body: "The self is never born and never dies. It isn't killed when the body is killed.", src: "bg-2.20" },
            { t: "mcq", tag: "core", q: "According to 2.20, what happens to the self when the body is killed?", opts: ["It is not killed", "It dies too", "It becomes a ghost", "It is reborn as Arjuna"], a: 0, why: "'na hanyate hanyamāne śarīre': it isn't killed when the body is." },
            { t: "mcq", tag: "core", q: "What does Kṛṣṇa compare the self's passing to a new body with?", opts: ["Passing through childhood, youth and old age", "A river reaching the sea", "A seed becoming a tree", "Day turning to night"], a: 0, why: "Gītā 2.13." },
            { t: "mcq", tag: "think", q: "Why might Kṛṣṇa start his answer with the eternal self?", opts: ["Arjuna's grief is about death, so Kṛṣṇa first changes how he sees death", "To change the subject", "Because the war is over", "To scare Arjuna"], a: 0, why: "Address the root of the worry first." }
          ]
        },
        {
          id: "g2-2", title: "Changing clothes",
          cards: [
            { t: "teach", title: "Old clothes, new clothes", body: "One of the Gītā's most famous images: as a person throws off worn-out clothes and puts on new ones, the self throws off worn-out bodies and takes new ones.", src: "bg-2.22" },
            { t: "teach", title: "Rebirth", body: "This idea, that the self takes body after body, is called rebirth (punarjanma). The Gītā treats it as the background for everything else it teaches." },
            { t: "mcq", tag: "core", q: "In 2.22, the body is compared to...", opts: ["Clothes", "A house", "A chariot", "A cage"], a: 0, why: "Worn-out clothes are swapped for new ones." },
            { t: "mcq", tag: "trivia", q: "What is the Sanskrit word for rebirth?", opts: ["Punarjanma", "Mokṣa", "Ātman", "Dharma"], a: 0, why: "punar = again, janma = birth." },
            { t: "mcq", tag: "think", q: "What does the clothes image suggest about death?", opts: ["It's a change of outer covering, not the end of the person", "It's the total end of everything", "Bodies are fashionable", "Clothes are alive"], a: 0, why: "The wearer continues; the clothes change." },
            { t: "reflect", q: "Does the clothes image make death seem less frightening to you, or not? Why?" }
          ]
        },
        {
          id: "g2-3", title: "Is that a good argument?",
          cards: [
            { t: "teach", title: "The real never ceases", body: "Kṛṣṇa says the unreal has no being and the real never stops being. The self is real; the changing body is not lasting.", src: "bg-2.16" },
            { t: "teach", title: "A hard question", body: "Kṛṣṇa uses this to tell Arjuna not to grieve, and to do his duty as a warrior. Readers have long asked: if the self can't die, does that make killing okay? Most traditional teachers say no: the Gītā is about doing one's rightful duty in a just war, not about harming people casually." },
            { t: "teach", title: "A battle inside", body: "Some readers, like Mahatma Gandhi, read the battlefield as a symbol: the war between good and bad tendencies inside every person." },
            { t: "mcq", tag: "core", q: "According to 2.16, what never ceases to be?", opts: ["The real", "The body", "The war", "Time"], a: 0, why: "'nābhāvo vidyate sataḥ': the real never stops being." },
            { t: "mcq", tag: "core", q: "How did Gandhi read the Gītā's battlefield?", opts: ["As a symbol of the struggle inside each person", "As a literal guide to war", "As fiction with no meaning", "As a history textbook"], a: 0, why: "An allegorical reading." },
            { t: "mcq", tag: "think", q: "Someone says, 'The self can't die, so harming people doesn't matter.' What do most traditional teachers reply?", opts: ["No: the Gītā is about rightful duty in a just war, not casual harm", "Yes, that's the point", "The Gītā never mentions the self", "Only kings can be harmed"], a: 0, why: "Context matters: the teaching is about duty and dharma." },
            { t: "debate", q: "Is the 'the self can't die' argument enough reason for Arjuna to fight?", sides: ["Yes, combined with his duty", "No, it isn't enough on its own"] }
          ]
        }
      ]
    },
    {
      title: "Action",
      desc: "How to act without getting stuck",
      lessons: [
        {
          id: "g3-1", title: "Not about the results",
          cards: [
            { t: "teach", title: "The most famous verse?", body: "Kṛṣṇa says: your right is to the action alone, never to its fruits. Don't act for the results, and don't use that as an excuse to stop acting.", src: "bg-2.47" },
            { t: "teach", title: "Karma yoga", body: "This is karma yoga, 'the discipline of action': doing what's right with full effort, but without being anxious or greedy about the outcome. It's also called niṣkāma karma, 'action without selfish desire'." },
            { t: "teach", title: "An example", body: "A student studies hard for an exam. Karma yoga doesn't say 'don't care about learning'. It says: give it your full effort, then let go of the worry about the grade, which isn't fully in your control." },
            { t: "mcq", tag: "core", q: "According to 2.47, your right is to...", opts: ["The action alone, not its fruits", "The results alone", "Neither action nor results", "Whatever you want"], a: 0, why: "'karmaṇy evādhikāras te mā phaleṣu kadācana'." },
            { t: "mcq", tag: "core", q: "What does 'karma yoga' mean?", opts: ["The discipline of action", "The yoga of breathing", "A kind of exercise", "Fate"], a: 0, why: "Doing right action without clinging to results." },
            { t: "tf", tag: "core", q: "Gītā 2.47 says that since results don't matter, you should stop acting.", a: false, why: "It says don't be attached to not acting either." },
            { t: "mcq", tag: "think", q: "Why might letting go of results actually help you act better?", opts: ["Worry about outcomes can freeze or distract you; focus on the work itself", "Results never matter in life", "It makes you lazy", "It doesn't help"], a: 0, why: "Many athletes and artists describe the same idea." },
            { t: "reflect", q: "Think of something you're working on. What part is in your control, and what isn't?" }
          ]
        },
        {
          id: "g3-2", title: "Your own dharma",
          cards: [
            { t: "teach", title: "Svadharma", body: "Kṛṣṇa says it's better to do your own dharma imperfectly than someone else's dharma perfectly. Your own duty is called svadharma.", src: "bg-3.35" },
            { t: "teach", title: "Arjuna's dharma", body: "For Arjuna, a kṣatriya (warrior), svadharma meant protecting people and fighting a just war, not leaving the battlefield." },
            { t: "teach", title: "A debated idea", body: "Later in the Gītā (chapter 18), svadharma is linked to the four social classes (varṇas). Some modern critics, like B. R. Ambedkar, argued the Gītā was used to defend the caste system. Other readers, including many modern teachers, understand svadharma as each person's own nature, talents and calling." },
            { t: "mcq", tag: "core", q: "What is 'svadharma'?", opts: ["Your own duty or dharma", "Someone else's duty", "A kind of prayer", "A battle formation"], a: 0, why: "sva = own." },
            { t: "mcq", tag: "core", q: "According to 3.35, which is better?", opts: ["Your own dharma done imperfectly", "Another's dharma done perfectly", "No dharma at all", "Whatever is easiest"], a: 0, why: "'śreyān svadharmo viguṇaḥ…'" },
            { t: "mcq", tag: "trivia", q: "Which modern critic argued the Gītā was used to defend caste?", opts: ["B. R. Ambedkar", "Mahatma Gandhi", "Charles Wilkins", "Sañjaya"], a: 0, why: "One of the important critical voices." },
            { t: "mcq", tag: "think", q: "Why does it matter whether svadharma means 'the duty of your birth group' or 'your own nature and calling'?", opts: ["One reading can limit people by birth; the other centers each person's real abilities", "It doesn't matter at all", "Both mean exactly the same", "Only the first is possible"], a: 0, why: "Interpretation changes how a teaching affects real lives." },
            { t: "debate", q: "Should 'svadharma' be read as your birth role, or your personal calling?", sides: ["Birth role, as traditionally taught", "Personal calling"] }
          ]
        },
        {
          id: "g3-3", title: "Whenever dharma declines",
          cards: [
            { t: "teach", title: "Age after age", body: "In chapter 4, Kṛṣṇa says: whenever dharma declines and adharma rises, I come forth, to protect the good, to destroy wrongdoing, and to re-establish dharma, age after age.", src: "bg-4.7-8" },
            { t: "teach", title: "Avatāra", body: "This is the classic statement of the avatāra idea: God 'descending' into the world in a form, like Rāma or Kṛṣṇa, when the world needs it." },
            { t: "mcq", tag: "core", q: "According to 4.7–8, when does Kṛṣṇa come into the world?", opts: ["Whenever dharma declines and adharma rises", "Only once, at the start of time", "Every new year", "Never"], a: 0, why: "'yadā yadā hi dharmasya glānir bhavati…'" },
            { t: "mcq", tag: "core", q: "What does 'avatāra' refer to?", opts: ["God descending into the world in a form", "A kind of chariot", "A battle", "A prayer"], a: 0, why: "Like Rāma and Kṛṣṇa." },
            { t: "mcq", tag: "think", q: "What hope does 4.7–8 offer to people living in hard times?", opts: ["That wrongdoing won't win in the end; dharma will be restored", "That nothing ever changes", "That people should do nothing", "None"], a: 0, why: "It's a promise of restoration." },
            { t: "reflect", q: "What does 'dharma declining' look like to you in the world today?" }
          ]
        }
      ]
    },
    {
      title: "Paths",
      desc: "The mind, devotion and the three qualities",
      lessons: [
        {
          id: "g4-1", title: "Mastering the mind",
          cards: [
            { t: "teach", title: "Your own friend", body: "Kṛṣṇa says: lift yourself up by your own effort and don't let yourself sink. You can be your own best friend, or your own worst enemy.", src: "bg-6.5" },
            { t: "teach", title: "A restless mind", body: "Arjuna objects that the mind is as hard to control as the wind. Kṛṣṇa agrees it's restless, but says it can be steadied by two things: practice (abhyāsa) and detachment (vairāgya).", src: "bg-6.35" },
            { t: "mcq", tag: "core", q: "According to 6.5, who is your own friend and enemy?", opts: ["Yourself", "Your teacher", "Your family", "Kṛṣṇa"], a: 0, why: "'ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ'." },
            { t: "match", tag: "core", q: "Match the term to its meaning", pairs: [["Abhyāsa", "Practice"], ["Vairāgya", "Detachment"]] },
            { t: "tf", tag: "core", q: "Kṛṣṇa tells Arjuna the mind is easy to control.", a: false, why: "He agrees it's restless, but says practice and detachment steady it." },
            { t: "mcq", tag: "think", q: "Why might honestly admitting 'the mind is hard to control' help?", opts: ["You stop expecting instant results and commit to steady practice", "It means you should give up", "It proves the Gītā is wrong", "It doesn't help"], a: 0, why: "Kṛṣṇa doesn't deny the difficulty: he gives a method." },
            { t: "reflect", q: "What's one small daily practice that could help steady your mind?" }
          ]
        },
        {
          id: "g4-2", title: "A leaf, a flower",
          cards: [
            { t: "teach", title: "Simple offerings", body: "Kṛṣṇa says that whoever offers him with love even a leaf, a flower, a fruit or some water, he accepts it. What matters is love, not how expensive the offering is.", src: "bg-9.26" },
            { t: "teach", title: "Bhakti", body: "This path of loving devotion is bhakti. Chapter 12, 'the yoga of devotion', describes the devotee Kṛṣṇa loves: one who hates no being, is friendly and compassionate, free of ego, steady in joy and sorrow, and forgiving.", src: "bg-12.13" },
            { t: "mcq", tag: "core", q: "According to 9.26, what makes an offering acceptable?", opts: ["That it's given with love", "That it's expensive", "That it's made of gold", "That a priest gives it"], a: 0, why: "Even a leaf or water, offered with devotion." },
            { t: "mcq", tag: "core", q: "Which quality describes the devotee in 12.13?", opts: ["Hating no being and being compassionate", "Being very rich", "Winning every battle", "Knowing many languages"], a: 0, why: "Friendly, compassionate, free of ego, forgiving." },
            { t: "mcq", tag: "trivia", q: "Which chapter of the Gītā is called 'the yoga of devotion'?", opts: ["Chapter 12", "Chapter 1", "Chapter 18", "Chapter 7"], a: 0, why: "Bhakti Yoga, chapter 12." },
            { t: "mcq", tag: "think", q: "Why might a simple offering matter as much as an expensive one?", opts: ["Devotion is about the heart, so anyone can offer, rich or poor", "Leaves are rare", "Gold is bad", "It doesn't"], a: 0, why: "Bhakti is open to everyone." }
          ]
        },
        {
          id: "g4-3", title: "Three qualities",
          cards: [
            { t: "teach", title: "The guṇas", body: "Chapter 14 teaches that everything in nature is made of three qualities (guṇas), which bind the self to the body:\n• sattva: clarity, goodness, calm\n• rajas: energy, passion, restlessness\n• tamas: dullness, laziness, confusion", src: "bg-14.5" },
            { t: "teach", title: "Mixed in everyone", body: "Every person and situation has all three, in different amounts. A good night's sleep can be healthy rest, while too much sleep is tamas. Ambition can be useful rajas, or turn into greed. The aim is to grow sattva and, finally, go beyond all three." },
            { t: "match", tag: "core", q: "Match the guṇa to its description", pairs: [["Sattva", "Clarity and calm"], ["Rajas", "Energy and restlessness"], ["Tamas", "Dullness and laziness"]] },
            { t: "mcq", tag: "core", q: "According to 14.5, what do the three guṇas do?", opts: ["Bind the self to the body", "Free the self instantly", "Create the Vedas", "Fight the war"], a: 0, why: "'nibadhnanti… dehe dehinam avyayam'." },
            { t: "mcq", tag: "think", q: "Someone scrolls their phone for hours, feeling foggy. Which guṇa is most at work?", opts: ["Tamas", "Sattva", "Rajas", "None"], a: 0, why: "Dullness and inertia." },
            { t: "reflect", q: "When do you feel most 'sattvic', clear and calm? What helps?" }
          ]
        }
      ]
    },
    {
      title: "Vision and ending",
      desc: "The cosmic form, the final teaching and its readers",
      lessons: [
        {
          id: "g5-1", title: "The cosmic form",
          cards: [
            { t: "teach", title: "Seeing everything", body: "In chapter 11, Arjuna asks to see Kṛṣṇa's universal form (viśvarūpa). Kṛṣṇa gives him divine sight, and Arjuna sees the whole universe, all beings, all time, within Kṛṣṇa. It is wondrous and terrifying." },
            { t: "teach", title: "'I am Time'", body: "Kṛṣṇa declares: I am Time, the destroyer of worlds. The word kāla means both 'time' and 'death'.", src: "bg-11.32" },
            { t: "teach", title: "An echo in 1945", body: "In 1945, after the first atomic bomb test, the physicist J. Robert Oppenheimer recalled this verse, translated as 'Now I am become Death, the destroyer of worlds.'", src: "gita-readers" },
            { t: "mcq", tag: "core", q: "What does Arjuna see in chapter 11?", opts: ["Kṛṣṇa's universal form, containing everything", "His future kingdom", "A peaceful garden", "The end of the war"], a: 0, why: "The viśvarūpa, the cosmic form." },
            { t: "mcq", tag: "core", q: "What does the Sanskrit word 'kāla' mean?", opts: ["Both time and death", "Only 'black'", "Chariot", "Song"], a: 0, why: "In 11.32, Kṛṣṇa says 'I am kāla'." },
            { t: "mcq", tag: "trivia", q: "Which scientist recalled Gītā 11.32 after the first atomic bomb test?", opts: ["J. Robert Oppenheimer", "Albert Einstein", "Isaac Newton", "Marie Curie"], a: 0, why: "'Now I am become Death, the destroyer of worlds.'" },
            { t: "mcq", tag: "think", q: "Why might seeing God as both beautiful and terrifying matter?", opts: ["It shows the divine includes everything, even change and destruction, not only what's comfortable", "God is only scary", "God is only pleasant", "It doesn't matter"], a: 0, why: "Chapter 11 refuses a 'comfortable only' picture." }
          ]
        },
        {
          id: "g5-2", title: "The final teaching",
          cards: [
            { t: "teach", title: "Take refuge in me", body: "Near the end, Kṛṣṇa says: let go of all dharmas and take refuge in me alone; I will free you from all sins; do not grieve. Many traditions see this as the Gītā's summit.", src: "bg-18.66" },
            { t: "teach", title: "Now decide", body: "But just before that, Kṛṣṇa says something remarkable: I have told you this deepest knowledge. Reflect on it fully, then do as you wish. He doesn't command blind obedience; he asks Arjuna to think and choose.", src: "bg-18.63" },
            { t: "teach", title: "Arjuna stands up", body: "Arjuna answers: my confusion is gone, my doubts are cleared, I will do as you say. The Gītā ends with Arjuna ready to act.", src: "bg-18.73" },
            { t: "mcq", tag: "core", q: "In 18.63, what does Kṛṣṇa tell Arjuna to do with the teaching?", opts: ["Reflect on it fully, then choose", "Obey without thinking", "Forget it", "Write it down"], a: 0, why: "'vimṛśyaitad aśeṣeṇa yathecchasi tathā kuru'." },
            { t: "mcq", tag: "core", q: "How does Arjuna respond at the end (18.73)?", opts: ["His confusion is gone and he's ready to act", "He runs away", "He stays confused", "He becomes a monk"], a: 0, why: "'naṣṭo mohaḥ': confusion destroyed." },
            { t: "mcq", tag: "think", q: "Why is it striking that Kṛṣṇa says 'do as you wish' after teaching?", opts: ["Even God's teaching asks for the student's own reflection and free choice", "It means nothing matters", "Kṛṣṇa doesn't care", "It's a translation error"], a: 0, why: "Understanding, not blind obedience." },
            { t: "debate", q: "Is it better to follow a great teacher's advice, or to reflect and decide for yourself?", sides: ["Follow the teacher", "Reflect and decide"] }
          ]
        },
        {
          id: "g5-3", title: "Many readers",
          cards: [
            { t: "teach", title: "Three commentators", body: "Each Vedānta founder wrote a commentary on the Gītā, and read it through their own philosophy: Śaṅkara stressed knowledge, Rāmānuja loving devotion, and Madhva devotion to Viṣṇu as supreme.", src: "gita-readers" },
            { t: "teach", title: "In the people's languages", body: "In 1290, the poet-saint Jñāneśvar retold the Gītā in Marathi as the Jñāneśvarī, so ordinary people could understand it. In 1785, Charles Wilkins published the first English translation." },
            { t: "teach", title: "American readers", body: "The Gītā reached American writers too. Henry David Thoreau wrote in Walden (1854) that each morning he bathed his mind in the Gītā's vast philosophy. Ralph Waldo Emerson read it closely; his poem 'Brahma' (1857) echoes Gītā 2.19, which says that whoever thinks the self kills, or is killed, does not understand." },
            { t: "teach", title: "Modern India", body: "During the freedom movement, Bal Gangadhar Tilak wrote the Gītā Rahasya in prison in Mandalay (1910–11), stressing action. Gandhi called the Gītā his 'mother'. Critics like Ambedkar challenged it. The Gītā is still argued about, which shows how alive it is." },
            { t: "match", tag: "core", q: "Match the commentator to their emphasis", pairs: [["Śaṅkara", "Knowledge"], ["Rāmānuja", "Loving devotion"], ["Madhva", "Viṣṇu as supreme"]] },
            { t: "mcq", tag: "trivia", q: "What is the Jñāneśvarī?", opts: ["A Marathi retelling of the Gītā (1290)", "A Tamil hymn", "An English translation", "A Sanskrit grammar"], a: 0, why: "By the poet-saint Jñāneśvar." },
            { t: "mcq", tag: "trivia", q: "Which American writer mentioned the Gītā in his book Walden?", opts: ["Henry David Thoreau", "Mark Twain", "Walt Whitman", "Edgar Allan Poe"], a: 0, why: "In 1854; his friend Emerson's poem 'Brahma' also echoes the Gītā." },
            { t: "mcq", tag: "trivia", q: "Who wrote the Gītā Rahasya in prison in Mandalay?", opts: ["Bal Gangadhar Tilak", "Mahatma Gandhi", "Charles Wilkins", "Rāmānuja"], a: 0, why: "In 1910–11, stressing action." },
            { t: "mcq", tag: "think", q: "One text, so many readings. What does that suggest?", opts: ["A rich text invites people to find different meanings, so read the text AND its readers", "Only one reading can be right", "The text has no meaning", "Everyone copied each other"], a: 0, why: "That's why DHARMAi shows the verse and the interpretations separately." },
            { t: "reflect", q: "Of all the ideas in this course, which one would you most want to remember?" }
          ]
        }
      ]
    }
  ]
};
