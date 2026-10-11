// Ancient Indian Science course.
// Same rules as the other courses: every question must be answerable from
// earlier, non-deep teach cards in the same lesson.
// Units with a "topic" ask the learner's level first. Cards with lv: "new"
// show only to beginners; lv: "adv" only to "know the basics" / "know it well".
// The quiz rule must hold at EVERY level: an lv: "adv" question needs its
// teaching in an lv: "adv" (or unmarked) card before it.
// No exaggerated claims: say what's documented, and what's debated.
DH.COURSES = DH.COURSES || {};
DH.COURSES.science = {
  id: "science",
  title: "Ancient Indian Science",
  subtitle: "Grammar, zero, π, calculus, atoms, steel and surgery",
  icon: "ti-atom",
  color: "saffron",
  kind: "topic",
  units: [
    {
      title: "The first linguist",
      desc: "Pāṇini's grammar machine",
      topic: "linguistics", topicLabel: "linguistics and grammar",
      lessons: [
        {
          id: "s1-1", title: "Pāṇini's grammar machine",
          cards: [
            { t: "teach", title: "Eight chapters", body: "Around the 4th century BCE, in the northwest of the Indian subcontinent, a scholar named Pāṇini described the whole Sanskrit language in a book called the Aṣṭādhyāyī, 'eight chapters', using about 4,000 very short rules (sūtras).", src: "panini-summary" },
            { t: "teach", title: "A word factory", body: "Pāṇini's rules don't just list words. You start from a root, like bhū ('to be'), add an ending, and apply rules one after another until a correct word comes out, like bhavati, 'he/she/it is'. The rules generate the language.", },
            { t: "teach", title: "Like a recipe", body: "Think of it like a recipe book: a small set of instructions that can produce an enormous number of different dishes, or here, words and sentences.", lv: "new" },
            { t: "teach", title: "Watch the machine run", body: "Here's bhū → bhavati, step by step:\n• bhū + ti: root plus the ending for 'he/she/it'\n• bhū + a + ti: a rule inserts 'a' between them\n• bho + a + ti: another rule strengthens ū to o (called guṇa)\n• bhav + a + ti: o becomes av before a vowel\n• bhavati!", lv: "adv" },
            { t: "teach", title: "Naming things first", body: "The very first rules just define labels for groups of sounds, so later rules can use a short name instead of listing the sounds every time.", src: "panini-1.1.1" },
            { t: "mcq", tag: "core", q: "What does 'Aṣṭādhyāyī' mean?", opts: ["Eight chapters", "Four Vedas", "Grammar of the gods", "One thousand rules"], a: 0, why: "aṣṭa = eight, adhyāya = chapter." },
            { t: "mcq", tag: "trivia", q: "About how many rules (sūtras) are in the Aṣṭādhyāyī?", opts: ["About 4,000", "About 40", "About 400,000", "Exactly 108"], a: 0, why: "Around 4,000 short rules describe the whole language." },
            { t: "order", tag: "core", lv: "adv", q: "Put the steps from bhū to bhavati in order", items: ["bhū + ti", "bhū + a + ti", "bho + a + ti", "bhavati"] },
            { t: "mcq", tag: "think", q: "Why would Pāṇini define short labels (like 'guṇa') in his very first rules?", opts: ["So later rules can use a short name instead of repeating a list of sounds", "To make the book longer", "Because he forgot the sounds", "So nobody could understand it"], a: 0, why: "Define once, reuse everywhere: the same idea programmers use with named variables." },
            { t: "reflect", q: "Pick a word in your own language. Could you write rules that build it from smaller pieces?" }
          ]
        },
        {
          id: "s1-2", title: "Rules about rules",
          cards: [
            { t: "teach", title: "Fourteen lines of sounds", body: "Pāṇini's grammar uses a list of Sanskrit sounds in fourteen short lines, each ending with a marker letter. Naming a starting sound plus a marker means 'everything in between'. So 'ak' means the vowels a, i, u, ṛ and ḷ, in just two letters.", src: "shiva-sutras" },
            { t: "teach", title: "When rules clash", body: "Sometimes two rules could both apply. Pāṇini includes rules about rules (meta-rules) to settle it. One of the most famous: when two rules conflict, the later one wins.", src: "panini-1.4.2" },
            { t: "teach", title: "Made to be memorized", body: "The grammar was passed down by memorization, so shorter was better. A famous saying jokes that grammarians celebrate saving half a short vowel as much as the birth of a son!" },
            { t: "mcq", tag: "core", q: "In Pāṇini's shorthand, what does 'ak' stand for?", opts: ["The vowels a, i, u, ṛ and ḷ", "All consonants", "Only the letter a", "The whole alphabet"], a: 0, why: "Start sound 'a' plus the marker 'k' = everything from a up to that marker." },
            { t: "mcq", tag: "core", q: "According to Pāṇini 1.4.2, when two rules conflict...", opts: ["The later rule applies", "The earlier rule applies", "Neither applies", "The teacher decides"], a: 0, why: "'vipratiṣedhe paraṃ kāryam': in a conflict, the later one." },
            { t: "tf", tag: "trivia", q: "A famous saying jokes that grammarians celebrate saving half a short vowel like the birth of a son.", a: true, why: "Shortness mattered when everything was memorized." },
            { t: "mcq", tag: "think", q: "Why would a grammar meant to be memorized need to be so compact?", opts: ["Every extra sound is more to memorize and recite perfectly", "Paper was too expensive", "Because Sanskrit has few words", "To keep it secret"], a: 0, why: "Compression made a huge system memorizable." }
          ]
        },
        {
          id: "s1-3", title: "Pāṇini meets computer science",
          cards: [
            { t: "teach", title: "Generative grammar", body: "In the 1950s, the linguist Noam Chomsky made 'generative grammar' famous: a finite set of rules that can produce an unlimited number of sentences. Linguists often point out that Pāṇini's grammar works in a strikingly similar way, more than 2,000 years earlier.", src: "panini-summary" },
            { t: "teach", title: "Pāṇini–Backus form", body: "Programming languages are described with rule notations too. One, created around 1960, is called Backus–Naur form (BNF). In 1967 a computer scientist, Peter Ingerman, suggested calling it 'Pāṇini–Backus form' to honor the similarity." },
            { t: "teach", title: "Rules that rewrite", body: "Many of Pāṇini's rules say 'X becomes Y in front of Z'. For example, rule 6.1.77 (iko yaṇ aci) says i, u, ṛ, ḷ become y, v, r, l before a vowel. So iti + ādi becomes ityādi ('etc.'). Computer scientists call this kind of rule a context-sensitive rewrite rule.", lv: "adv" },
            { t: "mcq", tag: "core", q: "What does a generative grammar do?", opts: ["Uses a finite set of rules to produce unlimited sentences", "Lists every sentence ever said", "Translates between languages", "Corrects spelling only"], a: 0, why: "Finite rules, infinite output." },
            { t: "mcq", tag: "core", q: "Which programming-language notation was suggested to be renamed 'Pāṇini–Backus form'?", opts: ["Backus–Naur form (BNF)", "HTML", "Binary code", "Morse code"], a: 0, why: "Peter Ingerman suggested it in 1967." },
            { t: "mcq", tag: "core", lv: "adv", q: "By the rule 'iko yaṇ aci', what does iti + ādi become?", opts: ["ityādi", "itiādi", "itādi", "itvādi"], a: 0, why: "i becomes y before the vowel ā." },
            { t: "mcq", tag: "think", q: "Is calling Pāṇini's grammar a 'computer program' fair?", opts: ["Partly: both are step-by-step rule systems, but Pāṇini was describing a human language, not running on a machine", "Totally, he invented computers", "Not at all, they have nothing in common", "Only if it's written in English"], a: 0, why: "Good comparisons show similarities without erasing differences." },
            { t: "debate", q: "Is Pāṇini's grammar really like a computer program?", sides: ["Yes, it's an algorithm", "No, the comparison goes too far"] }
          ]
        }
      ]
    },
    {
      title: "Zero and the numbers we use",
      desc: "Place value, zero, and how they spread",
      topic: "numbers", topicLabel: "number systems and arithmetic",
      lessons: [
        {
          id: "s2-1", title: "Place value",
          cards: [
            { t: "teach", title: "Position matters", body: "In 205, the 2 means two hundreds, the 0 means no tens, and the 5 means five ones. A digit's value depends on its place. This decimal place-value system developed in India." },
            { t: "teach", title: "Holding the empty place", body: "Without a symbol for 'nothing here', you couldn't tell 25 from 205. The Sanskrit word for zero was śūnya, 'empty'." },
            { t: "teach", title: "Powers of ten", body: "Place value means each position is a power of ten: 205 = 2×10² + 0×10¹ + 5×10⁰. Compare Roman numerals, where 205 is CCV: no place value, no zero, and long multiplication is a nightmare.", lv: "adv" },
            { t: "teach", title: "An early date", body: "One of the earliest securely dated texts using place value with zero is the Lokavibhāga, a Jain text on cosmology from 458 CE. An even older manuscript, the Bakhshali manuscript, uses a dot for zero, but its exact age is debated.", src: "lokavibhaga" },
            { t: "mcq", tag: "core", q: "In the number 205, what does the 0 tell you?", opts: ["There are no tens", "There are no hundreds", "The number is zero", "Nothing; it's decoration"], a: 0, why: "Zero holds the tens place empty." },
            { t: "mcq", tag: "core", lv: "adv", q: "Which is 205 written with powers of ten?", opts: ["2×10² + 0×10¹ + 5×10⁰", "2×10 + 5", "20×10 + 5×10", "2 + 0 + 5"], a: 0, why: "Each place is a power of ten." },
            { t: "mcq", tag: "trivia", q: "What does śūnya, the Sanskrit word for zero, mean?", opts: ["Empty", "Circle", "Nothing at all to say", "Infinity"], a: 0, why: "Śūnya = empty." },
            { t: "mcq", tag: "trivia", q: "The Lokavibhāga, an early dated text with place value and zero, comes from which tradition?", opts: ["Jain", "Greek", "Roman", "Chinese"], a: 0, why: "A Jain cosmology text from 458 CE." },
            { t: "mcq", tag: "think", q: "Why is zero essential for place value?", opts: ["It holds an empty place, so 25 and 205 look different", "It makes numbers bigger", "It's needed only for money", "It isn't essential"], a: 0, why: "No zero, no way to mark an empty place." }
          ]
        },
        {
          id: "s2-2", title: "Zero becomes a number",
          cards: [
            { t: "teach", title: "Brahmagupta's rules", body: "In 628 CE, the astronomer Brahmagupta did something new: he treated zero as a number you can calculate with. His rules include: a number minus itself is zero; a number plus zero stays the same; a number times zero is zero.", src: "brahmagupta-zero" },
            { t: "teach", title: "Debts and fortunes", body: "Brahmagupta also gave rules for negative numbers, which he called 'debts', and positive numbers, 'fortunes'. For example: a debt minus zero is a debt." },
            { t: "teach", title: "His rules in symbols", body: "In modern notation, Brahmagupta's rules include: a − a = 0, a + 0 = a, a × 0 = 0, and for signs: a debt times a debt is a fortune, (−a) × (−b) = ab. That last one still confuses students today!", lv: "adv" },
            { t: "teach", title: "Not everything was right", body: "Brahmagupta also tried to define dividing by zero, but his answer doesn't match modern math, where dividing by zero is left undefined. Even great scientists get things wrong, and that's normal." },
            { t: "mcq", tag: "core", q: "Who gave the first known rules for calculating with zero, in 628 CE?", opts: ["Brahmagupta", "Pāṇini", "Āryabhaṭa", "Fibonacci"], a: 0, why: "In his Brāhmasphuṭasiddhānta." },
            { t: "mcq", tag: "core", q: "What did Brahmagupta call negative numbers?", opts: ["Debts", "Fortunes", "Shadows", "Ghosts"], a: 0, why: "Positive numbers were 'fortunes'." },
            { t: "tf", tag: "trivia", q: "Brahmagupta's rule for dividing by zero matches today's mathematics.", a: false, why: "Today dividing by zero is undefined." },
            { t: "mcq", tag: "core", lv: "adv", q: "By Brahmagupta's sign rules, a debt times a debt is...", opts: ["A fortune (positive)", "A debt (negative)", "Zero", "Undefined"], a: 0, why: "(−a) × (−b) = ab." },
            { t: "mcq", tag: "think", q: "Why might calling negative numbers 'debts' help people understand them?", opts: ["Everyone understands owing something: less than nothing", "Because only merchants used math", "It makes them positive", "It doesn't help"], a: 0, why: "A good metaphor makes an abstract idea concrete." }
          ]
        },
        {
          id: "s2-3", title: "From India to the world",
          cards: [
            { t: "teach", title: "Through Arabic", body: "Scholars writing in Arabic adopted the Indian numerals. In the 800s, al-Khwārizmī wrote about 'Indian reckoning'. Our word 'algorithm' comes from his name!", src: "numerals-travel" },
            { t: "teach", title: "Into Europe", body: "In 1202, the Italian mathematician Fibonacci promoted these numerals in Europe in his book Liber Abaci. Europeans called them 'Arabic numerals', since they arrived through Arabic writers, while Arabic writers often called them 'Indian numerals'." },
            { t: "mcq", tag: "core", q: "Why did Europeans call them 'Arabic numerals'?", opts: ["They reached Europe through Arabic-writing scholars", "They were invented in Arabia", "Fibonacci was Arab", "Because of their shape"], a: 0, why: "They traveled from India through the Arabic-speaking world." },
            { t: "mcq", tag: "trivia", q: "The word 'algorithm' comes from the name of...", opts: ["Al-Khwārizmī", "Fibonacci", "Brahmagupta", "Algebra"], a: 0, why: "A 9th-century scholar who wrote on Indian reckoning." },
            { t: "mcq", tag: "trivia", q: "Which book helped bring these numerals to Europe in 1202?", opts: ["Fibonacci's Liber Abaci", "Pāṇini's Aṣṭādhyāyī", "The Lokavibhāga", "Euclid's Elements"], a: 0, why: "Liber Abaci, 'the book of calculation'." },
            { t: "mcq", tag: "think", q: "What does the numerals' journey show about how science grows?", opts: ["Ideas improve as they pass between cultures", "One culture does everything alone", "Ideas never travel", "Only Europe matters"], a: 0, why: "India, the Arabic world and Europe each played a part." }
          ]
        }
      ]
    },
    {
      title: "Geometry at the fire altar",
      desc: "Ropes, pegs and the diagonal rule",
      topic: "geometry", topicLabel: "geometry (shapes, areas, the Pythagorean theorem)",
      lessons: [
        {
          id: "s3-1", title: "Rules of the cord",
          cards: [
            { t: "teach", title: "Śulba Sūtras", body: "The Śulba Sūtras ('rules of the cord'), written roughly between 800 and 200 BCE, are manuals for building Vedic fire altars. The altars had to have exact shapes and areas, some even shaped like a falcon.", src: "sulba-summary" },
            { t: "teach", title: "Ropes and pegs", body: "Builders used ropes and pegs to mark out squares, rectangles and other shapes on the ground. To get them exactly right, they needed real geometry." },
            { t: "mcq", tag: "core", q: "What does 'Śulba Sūtra' mean?", opts: ["Rules of the cord", "Song of the fire", "Book of numbers", "Rules of grammar"], a: 0, why: "śulba = cord or rope." },
            { t: "mcq", tag: "core", q: "What were the Śulba Sūtras used for?", opts: ["Building fire altars with exact shapes and areas", "Measuring rainfall", "Writing poetry", "Designing ships"], a: 0, why: "Precise altars needed precise geometry." },
            { t: "mcq", tag: "think", q: "What does the Śulba Sūtras show about where math comes from?", opts: ["Practical needs, like building, can drive real mathematical discoveries", "Math only comes from pure thought", "Religion and math never mix", "Altars didn't need accuracy"], a: 0, why: "Ritual precision led to genuine geometry." }
          ]
        },
        {
          id: "s3-2", title: "Baudhāyana's diagonal rule",
          cards: [
            { t: "teach", title: "The diagonal rule", body: "Baudhāyana's Śulba Sūtra states that the square drawn on a rectangle's diagonal has the same area as the two squares on its sides added together.", src: "baudhayana-diagonal" },
            { t: "teach", title: "In plain words", body: "Draw a rectangle. Make a square on its long side, a square on its short side, and a square on its diagonal. The diagonal's square is exactly as big as the other two combined. Builders could use this to make perfect right angles with just rope.", lv: "new" },
            { t: "teach", title: "In symbols", body: "For a right triangle with sides a and b and longest side c: a² + b² = c². The Śulba Sūtras also list whole-number examples (triples) like 3-4-5 and 5-12-13.", lv: "adv" },
            { t: "teach", title: "Who was first?", body: "Today we call it the Pythagorean theorem, after the Greek Pythagoras (6th century BCE). But the relationship was known independently in several places: in India in the Śulba Sūtras, and even earlier in Babylon. No one 'stole' it.", src: "sulba-summary" },
            { t: "mcq", tag: "core", q: "What does Baudhāyana's diagonal rule say?", opts: ["The square on the diagonal equals the two side squares added together", "The diagonal is twice the side", "All rectangles are squares", "The diagonal has no length"], a: 0, why: "The relationship we call the Pythagorean theorem." },
            { t: "mcq", tag: "core", lv: "adv", q: "Using a² + b² = c², what is c for the triple 5, 12, c?", opts: ["13", "17", "15", "11"], a: 0, why: "25 + 144 = 169 = 13²." },
            { t: "tf", tag: "trivia", q: "The diagonal relationship was also known in Babylon.", a: true, why: "Several cultures found it independently." },
            { t: "mcq", tag: "think", q: "Why might several ancient cultures have found the same rule independently?", opts: ["They all faced practical problems like building and measuring land", "They copied one book", "It was a lucky guess", "It's not a real rule"], a: 0, why: "Same problems, same mathematical truths." }
          ]
        },
        {
          id: "s3-3", title: "The square root of 2",
          cards: [
            { t: "teach", title: "A tricky number", body: "A square with sides of length 1 has a diagonal of length √2 (the square root of 2). It can never be written exactly as a fraction or a decimal that ends." },
            { t: "teach", title: "Baudhāyana's value", body: "Baudhāyana gave a recipe for this diagonal that is correct to five decimal places: about 1.41421. That's remarkably accurate for its time.", src: "baudhayana-root2" },
            { t: "teach", title: "The recipe in numbers", body: "His recipe is: 1 + 1/3 + 1/(3×4) − 1/(3×4×34) = 1.4142157… The true value is 1.4142136… He even says the result is 'saviśeṣa', 'with a small excess': he knew it was a tiny bit too big!", lv: "adv" },
            { t: "mcq", tag: "core", q: "Baudhāyana gave a very accurate value for which number?", opts: ["The square root of 2", "π", "Zero", "The speed of light"], a: 0, why: "The diagonal of a square with side 1." },
            { t: "mcq", tag: "trivia", q: "To how many decimal places was his value correct?", opts: ["Five", "One", "Twenty", "None"], a: 0, why: "About 1.41421." },
            { t: "mcq", tag: "core", lv: "adv", q: "What does 'saviśeṣa' in his rule tell us?", opts: ["The result is slightly too big, and he knew it", "The result is exact", "The result is much too small", "It's the author's name"], a: 0, why: "'With a small excess': honest about the error." },
            { t: "mcq", tag: "think", q: "Why would altar-builders need such an accurate √2?", opts: ["To make shapes with exact areas, like doubling a square's area", "For decoration only", "They didn't need it", "To count bricks"], a: 0, why: "Doubling a square's area means using its diagonal as the new side." }
          ]
        }
      ]
    },
    {
      title: "π, sines and the stars",
      desc: "Āryabhaṭa and the birth of trigonometry",
      topic: "trigonometry", topicLabel: "trigonometry (sine, cosine, angles)",
      lessons: [
        {
          id: "s4-1", title: "Āryabhaṭa's π",
          cards: [
            { t: "teach", title: "A young genius", body: "In 499 CE, a 23-year-old astronomer named Āryabhaṭa wrote the Āryabhaṭīya, 121 verses covering arithmetic, algebra, trigonometry and astronomy.", src: "aryabhata-summary" },
            { t: "teach", title: "π in a poem", body: "One verse gives π in words: add 4 to 100, multiply by 8, add 62,000. That's the circumference of a circle whose diameter is 20,000. So π ≈ 62,832 ÷ 20,000 = 3.1416.", src: "aryabhata-pi" },
            { t: "teach", title: "'Approximate'", body: "Āryabhaṭa called this value āsanna, 'approximate' or 'nearby'. He didn't claim it was exact." },
            { t: "teach", title: "A hint about irrational numbers", body: "Some historians read 'āsanna' as a sign Āryabhaṭa suspected π can never be written exactly, that it's irrational. That was only proven in Europe by Johann Lambert in 1761.", lv: "adv" },
            { t: "mcq", tag: "core", q: "What value of π does Āryabhaṭa give?", opts: ["3.1416", "3", "22", "3.5"], a: 0, why: "62,832 ÷ 20,000." },
            { t: "mcq", tag: "core", q: "What word did Āryabhaṭa use to describe his value of π?", opts: ["Āsanna: approximate", "Satya: exact", "Śūnya: empty", "Ananta: infinite"], a: 0, why: "He called it approximate, not exact." },
            { t: "mcq", tag: "trivia", lv: "adv", q: "Who proved that π is irrational, in 1761?", opts: ["Johann Lambert", "Āryabhaṭa", "Isaac Newton", "Fibonacci"], a: 0, why: "Over 1,200 years after Āryabhaṭa's hint." },
            { t: "mcq", tag: "think", q: "Why write numbers in verse instead of digits?", opts: ["Verses are easier to memorize and pass on accurately", "Digits didn't exist", "To hide the answer", "Poems are shorter"], a: 0, why: "Knowledge was often memorized and recited." }
          ]
        },
        {
          id: "s4-2", title: "Half-chords",
          cards: [
            { t: "teach", title: "Bowstrings", body: "Draw a circle and a line across it: that's a chord. Greek astronomers worked with whole chords. Indian astronomers switched to half-chords, which they called jyā, 'bowstring', because a chord with its arc looks like a bow.", src: "aryabhata-summary" },
            { t: "teach", title: "Why it mattered", body: "Half-chords made calculating the positions of the Sun, Moon and planets much easier. This half-chord is the ancestor of the 'sine' you learn in trigonometry.", lv: "new" },
            { t: "teach", title: "jyā = R sin θ", body: "In a circle of radius R, the half-chord for angle θ is R·sin θ. Āryabhaṭa gave a table of these values in steps of 3¾°, using R = 3438 (chosen so the circumference is about 21,600 arcminutes).", lv: "adv" },
            { t: "mcq", tag: "core", q: "What does 'jyā' mean?", opts: ["Bowstring", "Circle", "Star", "Triangle"], a: 0, why: "A chord and its arc look like a bow and string." },
            { t: "mcq", tag: "core", q: "What did Indian astronomers use instead of whole chords?", opts: ["Half-chords", "Squares", "Circles only", "No shapes at all"], a: 0, why: "The half-chord became the sine." },
            { t: "mcq", tag: "trivia", lv: "adv", q: "In what steps did Āryabhaṭa's table give its values?", opts: ["3¾ degrees", "1 degree", "45 degrees", "10 degrees"], a: 0, why: "24 steps of 3¾° make a quarter circle." },
            { t: "mcq", tag: "think", q: "Why might half-chords be easier than whole chords?", opts: ["They connect directly to right triangles, which are easy to calculate with", "They're shorter to write", "They're prettier", "They aren't easier"], a: 0, why: "Half a chord forms a right triangle with the radius." }
          ]
        },
        {
          id: "s4-3", title: "Where 'sine' comes from",
          cards: [
            { t: "teach", title: "A word's long journey", body: "Sanskrit jyā (bowstring) was borrowed into Arabic as jība. Arabic was often written without vowels, so it was later read as jayb, a real Arabic word meaning 'pocket' or 'fold'. Translators into Latin turned that into sinus ('fold'), which became English 'sine'.", src: "sine-word" },
            { t: "teach", title: "Eclipses explained", body: "Āryabhaṭa also explained eclipses scientifically: they're caused by the Earth's shadow falling on the Moon, or the Moon blocking the Sun, not by a demon (Rāhu) swallowing them.", src: "aryabhata-summary" },
            { t: "order", tag: "core", q: "Put the word's journey in order", items: ["jyā (Sanskrit)", "jība (Arabic)", "jayb (misread Arabic)", "sinus (Latin)", "sine (English)"] },
            { t: "mcq", tag: "core", q: "How did Āryabhaṭa explain eclipses?", opts: ["As shadows cast by the Earth and Moon", "As a demon swallowing the Sun", "As clouds", "As the Sun turning off"], a: 0, why: "A scientific explanation in 499 CE." },
            { t: "mcq", tag: "think", q: "The 'sine' story involves a misreading. What does that show?", opts: ["Knowledge passing between languages can change even its words", "Translators were careless people", "Math has no history", "Arabic has no vowels at all"], a: 0, why: "Ideas survive translation; sometimes the words get scrambled." },
            { t: "reflect", q: "Do you know any other English words that came from Sanskrit or other Indian languages?" }
          ]
        }
      ]
    },
    {
      title: "Infinity and the road to calculus",
      desc: "Poetry patterns and the Kerala school",
      topic: "calculus", topicLabel: "calculus and infinite series",
      lessons: [
        {
          id: "s5-1", title: "Math hidden in poetry",
          cards: [
            { t: "teach", title: "Short and long", body: "Sanskrit poetry is built from short (laghu) and long (guru) syllables. The scholar Piṅgala studied every possible pattern of them. With two choices per syllable, it's essentially a binary system.", src: "pingala-summary" },
            { t: "teach", title: "Famous patterns", body: "Later scholars studying poetic meter found two patterns now famous in math: the number triangle we call 'Pascal's triangle' (they called it meru-prastāra, 'Mount Meru arrangement'), and the sequence 1, 2, 3, 5, 8, 13…, where each number is the sum of the two before. The Jain scholar Hemacandra described that sequence around 1150, before Fibonacci." },
            { t: "teach", title: "Counting patterns", body: "With n syllables, each short or long, there are 2ⁿ patterns: 3 syllables give 8. And if a short syllable counts 1 beat and a long one 2, the number of patterns with a total of n beats follows 1, 2, 3, 5, 8…", lv: "adv" },
            { t: "mcq", tag: "core", q: "What was Piṅgala studying?", opts: ["Patterns of short and long syllables in poetry", "The stars", "Medicine", "Metals"], a: 0, why: "Poetic meter: a binary-like system." },
            { t: "mcq", tag: "trivia", q: "What did Indian scholars call 'Pascal's triangle'?", opts: ["Meru-prastāra", "Śulba", "Jyā", "Śūnya"], a: 0, why: "The 'Mount Meru arrangement'." },
            { t: "mcq", tag: "trivia", q: "Which Jain scholar described the 1, 2, 3, 5, 8… sequence around 1150?", opts: ["Hemacandra", "Pāṇini", "Āryabhaṭa", "Suśruta"], a: 0, why: "Before Fibonacci's book of 1202." },
            { t: "mcq", tag: "core", lv: "adv", q: "How many short/long patterns are there with 3 syllables?", opts: ["8", "6", "3", "9"], a: 0, why: "2 × 2 × 2 = 8." },
            { t: "mcq", tag: "think", q: "What does it say that these math patterns came from studying poetry?", opts: ["Math can be discovered anywhere patterns appear, even in art", "Poets were secretly mathematicians only", "Poetry is just math", "It's a coincidence with no meaning"], a: 0, why: "Patterns are everywhere, if you look carefully." }
          ]
        },
        {
          id: "s5-2", title: "The Kerala school",
          cards: [
            { t: "teach", title: "Mādhava", body: "In Kerala, in southwest India, around 1340–1425, a mathematician named Mādhava of Saṅgamagrāma started a school of astronomers and mathematicians that lasted about 200 years.", src: "kerala-school" },
            { t: "teach", title: "Adding forever", body: "Mādhava found ways to calculate π and sines by adding up an endless list of smaller and smaller numbers. Surprisingly, adding infinitely many numbers can give one exact answer.", lv: "new" },
            { t: "teach", title: "The series", body: "Mādhava's results include:\n• π/4 = 1 − 1/3 + 1/5 − 1/7 + …\n• sin x = x − x³/3! + x⁵/5! − …\n• and similar series for cosine and arctangent\nEurope found these around 250 years later (Gregory, Newton, Leibniz).", lv: "adv" },
            { t: "teach", title: "Written in Malayalam", body: "Mādhava's own writings on this are mostly lost. We know his results through students' texts, like Nīlakaṇṭha's Tantrasaṅgraha (1501) and Jyeṣṭhadeva's Yuktibhāṣā (about 1530), which gives explanations and proofs and is written in Malayalam, not Sanskrit." },
            { t: "mcq", tag: "core", q: "Where did the Kerala school of mathematics flourish?", opts: ["Kerala, in southwest India", "Kashmir", "Bengal", "Gujarat"], a: 0, why: "Founded by Mādhava of Saṅgamagrāma." },
            { t: "mcq", tag: "trivia", q: "In which language is the Yuktibhāṣā written?", opts: ["Malayalam", "Sanskrit", "Tamil", "Persian"], a: 0, why: "Unusual for the time: most science was in Sanskrit." },
            { t: "mcq", tag: "core", lv: "adv", q: "What comes next in Mādhava's series π/4 = 1 − 1/3 + 1/5 …?", opts: ["− 1/7", "+ 1/7", "− 1/6", "+ 1/9"], a: 0, why: "Odd denominators, alternating signs." },
            { t: "mcq", tag: "think", q: "Why is it surprising that adding infinitely many numbers can give an exact answer?", opts: ["You'd expect adding forever to grow forever, but shrinking pieces can add up to a fixed total", "It isn't surprising at all", "Because infinity is a number", "Because Mādhava cheated"], a: 0, why: "This idea of a limit is at the heart of calculus." }
          ]
        },
        {
          id: "s5-3", title: "Was it calculus?",
          cards: [
            { t: "teach", title: "What calculus is", body: "Calculus, developed by Newton and Leibniz in Europe in the late 1600s, is a general system for studying change (derivatives) and adding up infinitely small pieces (integrals), with methods that work for almost any problem." },
            { t: "teach", title: "The honest answer", body: "The Kerala school had key ingredients of calculus, like infinite series and early ideas about limits, centuries earlier. But they didn't build the full general system. So the fair verdict: major steps toward calculus, not all of calculus.", src: "kerala-school" },
            { t: "teach", title: "Did ideas travel?", body: "Some historians suggest Kerala's mathematics could have reached Europe, for example through Jesuit missionaries in Kerala in the 1500s. Others say there's no clear evidence. It's still debated." },
            { t: "mcq", tag: "core", q: "What's the fairest summary of the Kerala school's achievement?", opts: ["Major steps toward calculus, not the full system", "They invented all of calculus", "They had nothing to do with calculus", "They copied Newton"], a: 0, why: "Credit what's documented, without exaggerating." },
            { t: "tf", tag: "core", q: "It has been proven that Kerala's mathematics reached Europe.", a: false, why: "It's an open, debated question." },
            { t: "mcq", tag: "think", q: "Why is it important not to exaggerate a culture's achievements?", opts: ["Exaggeration hurts credibility; real achievements are impressive enough", "Exaggeration is always fine", "Nobody checks claims", "Because history doesn't matter"], a: 0, why: "Accurate pride beats inflated claims." },
            { t: "debate", q: "Should India get credit for calculus?", sides: ["Yes, the key ideas came first", "No, the full system came later in Europe"] }
          ]
        }
      ]
    },
    {
      title: "Physics",
      desc: "Atoms, a spinning Earth and why things fall",
      topic: "physics", topicLabel: "physics (motion, gravity, atoms)",
      lessons: [
        {
          id: "s6-1", title: "Atoms",
          cards: [
            { t: "teach", title: "Tiny eternal particles", body: "The Vaiśeṣika school, traditionally founded by the sage Kaṇāda, taught that everything physical is made of tiny, eternal particles that can't be divided, called paramāṇu.", src: "kanada-summary" },
            { t: "teach", title: "Building up", body: "Two paramāṇus join to make a pair (dvyaṇuka), and these combine further into everything we see." },
            { t: "teach", title: "Reason, not experiment", body: "This was a philosophical theory reached by reasoning, not tested with experiments. The Greek thinker Democritus had a similar idea around the same era." },
            { t: "teach", title: "What we know now", body: "Modern atoms turned out to be divisible after all: they're made of protons, neutrons and electrons, which were discovered through experiments in the 1890s–1930s. The ancient idea of tiny building blocks was a good guess; the details changed.", lv: "adv" },
            { t: "mcq", tag: "core", q: "What is a paramāṇu in Vaiśeṣika?", opts: ["A tiny, eternal, indivisible particle", "A planet", "A kind of fire", "A unit of time"], a: 0, why: "parama = ultimate, aṇu = tiny." },
            { t: "mcq", tag: "core", q: "What is a dvyaṇuka?", opts: ["A pair of paramāṇus", "A single atom", "A star", "A grammar rule"], a: 0, why: "dvi = two." },
            { t: "tf", tag: "trivia", q: "Kaṇāda proved the existence of atoms with experiments.", a: false, why: "It was a theory from reasoning." },
            { t: "mcq", tag: "think", q: "Is a theory reached only by reasoning 'science'?", opts: ["It's a valuable start, but science also needs testing with evidence", "Yes, always", "No, reasoning is useless", "Only if it's old"], a: 0, why: "Good ideas become science when they're tested." }
          ]
        },
        {
          id: "s6-2", title: "The spinning Earth",
          cards: [
            { t: "teach", title: "The boat", body: "Āryabhaṭa compared us to someone on a moving boat who sees the still shore moving backward. In the same way, he said, the stars seem to move west because the Earth itself is turning.", src: "aryabhata-boat" },
            { t: "teach", title: "Not everyone agreed", body: "Many later Indian astronomers, including Brahmagupta, rejected Āryabhaṭa's spinning Earth. Being right early doesn't mean being believed!" },
            { t: "teach", title: "Relative motion", body: "The boat example captures relative motion: motion only shows up relative to something else. The Italian scientist Galileo used a very similar ship example in 1632.", lv: "adv" },
            { t: "mcq", tag: "core", q: "What does Āryabhaṭa's boat comparison explain?", opts: ["The stars seem to move because the Earth turns", "Boats are faster than stars", "The Earth is flat", "Rivers flow west"], a: 0, why: "Apparent motion, from a moving viewpoint." },
            { t: "tf", tag: "trivia", q: "Brahmagupta rejected Āryabhaṭa's idea of a spinning Earth.", a: true, why: "Many later astronomers did." },
            { t: "mcq", tag: "trivia", lv: "adv", q: "Which European scientist used a similar ship example in 1632?", opts: ["Galileo", "Newton", "Einstein", "Copernicus"], a: 0, why: "To explain relative motion." },
            { t: "mcq", tag: "think", q: "Why might people reject a correct idea like the spinning Earth?", opts: ["It goes against everyday experience: we don't feel the Earth moving", "Because it's obviously wrong", "Because Āryabhaṭa was young", "Nobody rejected it"], a: 0, why: "Science sometimes has to overrule what we 'feel'." }
          ]
        },
        {
          id: "s6-3", title: "Why things fall",
          cards: [
            { t: "teach", title: "Brahmagupta", body: "The Persian scholar al-Bīrūnī, who studied Indian science around 1030, reports that Brahmagupta (7th century) taught that heavy things fall because it's the Earth's nature to attract and hold them.", src: "brahmagupta-gravity" },
            { t: "teach", title: "Bhāskara's 'power of attraction'", body: "Around 1150, Bhāskara II wrote that the Earth has an ākṛṣṭi-śakti, a 'power of attraction', that pulls heavy things toward it. He also asked: where could the Earth itself fall, when space is the same on every side?", src: "bhaskara-gravity" },
            { t: "teach", title: "Not yet Newton", body: "These were real insights about attraction. But they didn't give a formula, didn't say how attraction changes with distance, and didn't explain the orbits of planets. Isaac Newton's law of gravity (1687) did all of that." },
            { t: "teach", title: "Newton's formula", body: "Newton's law: F = G·m₁·m₂ / r². The force grows with both masses and weakens with the square of the distance: double the distance, and the force becomes one quarter as strong. The same law explains apples falling and the Moon orbiting.", lv: "adv" },
            { t: "mcq", tag: "core", q: "What did Bhāskara II call the Earth's pull?", opts: ["Ākṛṣṭi-śakti: power of attraction", "Śūnya: emptiness", "Jyā: bowstring", "Paramāṇu: atom"], a: 0, why: "ākṛṣṭi = attraction, śakti = power." },
            { t: "mcq", tag: "trivia", q: "Who reported Brahmagupta's view on falling objects?", opts: ["Al-Bīrūnī", "Fibonacci", "Galileo", "Pāṇini"], a: 0, why: "A Persian scholar who wrote a famous book on India." },
            { t: "tf", tag: "core", q: "Bhāskara II gave a mathematical formula for gravity like Newton's.", a: false, why: "His idea was qualitative: no formula." },
            { t: "mcq", tag: "core", lv: "adv", q: "In Newton's law, if two objects get twice as far apart, the force becomes...", opts: ["One quarter as strong", "Half as strong", "Twice as strong", "The same"], a: 0, why: "It depends on 1/r²: double r, and you get 1/4." },
            { t: "mcq", tag: "think", q: "What's the difference between Bhāskara's idea and Newton's law?", opts: ["Bhāskara described attraction in words; Newton made it precise and testable with math", "There's no difference", "Newton said things fall up", "Bhāskara's was more precise"], a: 0, why: "Qualitative vs. quantitative: both are steps, of different sizes." }
          ]
        }
      ]
    },
    {
      title: "Chemistry",
      desc: "Iron, steel, zinc and alchemy",
      topic: "chemistry", topicLabel: "chemistry (metals, reactions)",
      lessons: [
        {
          id: "s7-1", title: "The iron pillar",
          cards: [
            { t: "teach", title: "1,600 years, little rust", body: "In Delhi, at the Qutb complex, stands an iron pillar about 7 meters tall and over 1,600 years old, with a Sanskrit inscription naming a king 'Candra'. Iron normally rusts, but this pillar has resisted rust remarkably well.", src: "iron-pillar" },
            { t: "teach", title: "The secret", body: "Metallurgists found the iron contains a lot of phosphorus, which helped a thin, protective layer form on its surface and slow down rusting." },
            { t: "teach", title: "The protective layer", body: "Studies at IIT Kanpur identified the layer as including iron hydrogen phosphate and a compound called misawite (δ-FeOOH), which seals the surface. The ancient smiths' method of hammering hot iron, without removing all the phosphorus, made the difference.", lv: "adv" },
            { t: "mcq", tag: "core", q: "Where does the famous iron pillar stand?", opts: ["Delhi", "Mumbai", "Varanasi", "Chennai"], a: 0, why: "At the Qutb complex." },
            { t: "mcq", tag: "core", q: "Why has the pillar resisted rust?", opts: ["High phosphorus helped a protective surface layer form", "It's painted every year", "It's made of gold", "It never gets wet"], a: 0, why: "Chemistry, not magic." },
            { t: "mcq", tag: "think", q: "Why do scientists study an old pillar like this?", opts: ["Understanding why it lasts could help make better, longer-lasting materials", "Only for tourism", "To repaint it", "There's no reason"], a: 0, why: "Old technology can teach new lessons." }
          ]
        },
        {
          id: "s7-2", title: "Steel and zinc",
          cards: [
            { t: "teach", title: "Wootz steel", body: "South India produced a famous crucible steel called wootz, made by melting iron with carbon-rich materials in sealed clay pots. It was traded far away and used to make the legendary 'Damascus' sword blades.", src: "wootz-zinc" },
            { t: "teach", title: "Zinc at Zawar", body: "At Zawar in Rajasthan, archaeologists found evidence of zinc being produced by distillation, using special clay retorts that let zinc vapor drip downward and condense. This was an advanced chemical technique." },
            { t: "teach", title: "Why distill zinc?", body: "Zinc boils at about 907 °C, which is lower than the temperature needed to free it from its ore. So when you smelt it, it escapes as a gas. The Zawar method captured the vapor and cooled it back into metal.", lv: "adv" },
            { t: "mcq", tag: "core", q: "Wootz steel was used for which famous blades?", opts: ["Damascus blades", "Samurai swords only", "Roman shields", "Viking axes only"], a: 0, why: "Indian wootz was prized across the world." },
            { t: "mcq", tag: "core", q: "What metal was produced by distillation at Zawar?", opts: ["Zinc", "Gold", "Iron", "Copper"], a: 0, why: "Zawar, in Rajasthan." },
            { t: "mcq", tag: "core", lv: "adv", q: "Why was distillation needed to make zinc?", opts: ["Zinc turns to gas at a lower temperature than the one needed to smelt it", "Zinc is too heavy", "Zinc is poisonous", "Zinc melts at room temperature"], a: 0, why: "Boils at about 907 °C, so it escapes as vapor." },
            { t: "mcq", tag: "think", q: "What does 'Damascus' steel actually coming from India show?", opts: ["Names of products can hide where they really came from", "Damascus is in India", "Steel has no history", "Swords are only Indian"], a: 0, why: "Like 'Arabic numerals': named for the route, not the origin." }
          ]
        },
        {
          id: "s7-3", title: "Alchemy and caution",
          cards: [
            { t: "teach", title: "Rasaśāstra", body: "In medieval India, a tradition called Rasaśāstra worked with mercury (rasa) and minerals, aiming to make medicines and transform metals.", src: "rasashastra" },
            { t: "teach", title: "Real lab skills", body: "Its practitioners developed real laboratory techniques: furnaces, distillation and many purification steps." },
            { t: "teach", title: "A safety warning", body: "Many of its preparations contain mercury, lead or arsenic. Modern testing has found dangerous levels of heavy metals in some products sold today. Old doesn't automatically mean safe." },
            { t: "mcq", tag: "core", q: "In Rasaśāstra, what does 'rasa' mainly refer to?", opts: ["Mercury", "Juice", "Gold", "Fire"], a: 0, why: "Rasaśāstra centered on mercury." },
            { t: "tf", tag: "core", q: "Some Rasaśāstra products tested today have contained dangerous heavy metals.", a: true, why: "That's why caution matters." },
            { t: "mcq", tag: "think", q: "How can a tradition have real skills AND dangerous products?", opts: ["Technical skill doesn't guarantee that the goals or results are safe", "It can't", "Danger means no skill", "Skill means total safety"], a: 0, why: "Judge methods and results separately." },
            { t: "reflect", q: "How would you check whether a traditional remedy is safe?" }
          ]
        }
      ]
    },
    {
      title: "Medicine",
      desc: "Suśruta's surgery, Caraka's medicine, and testing cures",
      topic: "medicine", topicLabel: "biology and medicine",
      lessons: [
        {
          id: "s8-1", title: "Suśruta the surgeon",
          cards: [
            { t: "teach", title: "A surgery textbook", body: "The Suśruta Saṃhitā is a classical Sanskrit text on surgery. It describes about 120 instruments: around 101 blunt ones and 20 sharp ones.", src: "sushruta" },
            { t: "teach", title: "Practice first", body: "It insists students practice surgery on models first: cutting fruits and vegetables, and stitching leather bags, before treating real patients." },
            { t: "teach", title: "Famous operations", body: "It describes rebuilding a damaged nose using a flap of skin from the cheek, and treating cataracts (a clouded lens in the eye) by 'couching': pushing the clouded lens out of the line of sight." },
            { t: "teach", title: "Influence on modern surgery", body: "In 1794, a London magazine reported an Indian method of rebuilding a nose with skin from the forehead. British surgeons studied it, and it influenced the development of modern plastic surgery.", lv: "adv" },
            { t: "mcq", tag: "core", q: "About how many instruments does the Suśruta Saṃhitā describe?", opts: ["About 120", "About 5", "About 1,000", "None"], a: 0, why: "Around 101 blunt and 20 sharp." },
            { t: "mcq", tag: "core", q: "What did students practice on before real patients?", opts: ["Fruits, vegetables and leather bags", "Each other", "Nothing; they just started", "Statues"], a: 0, why: "Practice on models, a very modern idea." },
            { t: "mcq", tag: "trivia", q: "What eye condition did Suśruta treat by 'couching'?", opts: ["Cataracts", "Short-sightedness", "Color blindness", "Pink eye"], a: 0, why: "Pushing the clouded lens aside." },
            { t: "mcq", tag: "think", q: "Why is practicing on models such a good idea?", opts: ["Mistakes happen on fruit, not on patients", "Fruit is cheaper than surgery", "It's just tradition", "It isn't a good idea"], a: 0, why: "Surgical training still uses simulators today." }
          ]
        },
        {
          id: "s8-2", title: "Caraka and Āyurveda",
          cards: [
            { t: "teach", title: "The Caraka Saṃhitā", body: "The Caraka Saṃhitā is a classical text of Āyurveda on internal medicine. It explains health as a balance of three doṣas, called vāta, pitta and kapha.", src: "charaka" },
            { t: "teach", title: "Careful doctors", body: "It stresses examining the patient carefully, along with diet and lifestyle. It also gives a code of conduct for doctors: put the patient's welfare first, and keep what you learn about them private." },
            { t: "teach", title: "History, not advice", body: "This lesson is about history. Āyurveda's ideas, like the three doṣas, are not the same as tested modern medicine. For health problems, see a qualified doctor." },
            { t: "mcq", tag: "core", q: "According to the Caraka Saṃhitā, health is a balance of...", opts: ["Three doṣas: vāta, pitta and kapha", "Four elements only", "Atoms", "Numbers"], a: 0, why: "The three doṣas of Āyurveda." },
            { t: "mcq", tag: "core", q: "What does Caraka's code ask doctors to put first?", opts: ["The patient's welfare", "Their fees", "Their fame", "Ritual"], a: 0, why: "And to keep patients' information private." },
            { t: "mcq", tag: "think", q: "Caraka's ethics (patient first, keep secrets) sound modern. What does that suggest?", opts: ["Some ideas about good care are timeless, even when the science changes", "Caraka knew modern medicine", "Ethics never change", "It's a coincidence"], a: 0, why: "Old ethics can be wise even where old science is outdated." }
          ]
        },
        {
          id: "s8-3", title: "Testing old cures",
          cards: [
            { t: "teach", title: "How we test medicine", body: "Today, a treatment is trusted when careful studies show it works and is safe. The strongest kind is a randomized controlled trial: patients are randomly given the treatment or a placebo (a fake), and the results are compared.", src: "evidence-medicine" },
            { t: "teach", title: "Old and natural?", body: "Some traditional remedies have been tested this way; many haven't, or didn't hold up. A remedy being old or natural doesn't, on its own, show that it works or is safe." },
            { t: "mcq", tag: "core", q: "In a randomized controlled trial, the treatment is compared with...", opts: ["A placebo or an existing treatment", "Nothing", "The doctor's opinion", "An older book"], a: 0, why: "Comparison shows whether it really works." },
            { t: "tf", tag: "core", q: "If a remedy is natural, it must be safe.", a: false, why: "Natural doesn't automatically mean safe: remember Rasaśāstra's heavy metals." },
            { t: "mcq", tag: "think", q: "How can someone respect ancient medicine AND rely on modern evidence?", opts: ["Honor its history and ideas, while testing its claims before trusting them", "You can't do both", "Ignore all old medicine", "Trust everything old"], a: 0, why: "Respect and testing go together." },
            { t: "debate", q: "Should traditional remedies be tested just like modern medicines?", sides: ["Yes, same standard for all", "No, tradition is evidence enough"] }
          ]
        }
      ]
    }
  ]
};
