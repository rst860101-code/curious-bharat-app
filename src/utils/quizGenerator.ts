import { QuizQuestion } from '../types';

// Supplementary high-quality MCQs database to guarantee minimum 10 MCQs per topic
const SUPPLEMENTARY_QUESTIONS: Record<string, Omit<QuizQuestion, 'id'>[]> = {
  // Biology / Cell
  'cell': [
    {
      question: 'Which of the following is known as the "suicide bag" of a cell?',
      options: ['Lysosomes', 'Ribosomes', 'Mitochondria', 'Plastids'],
      correctAnswerIndex: 0,
      explanation: 'Lysosomes contain powerful digestive hydrolytic enzymes capable of breaking down all organic materials. When the cell gets damaged, lysosomes may burst and digest their own cell, hence they are called "suicide bags".'
    },
    {
      question: 'Which plastid gives a yellow or orange color to flowers and fruits?',
      options: ['Chloroplasts', 'Chromoplasts', 'Leucoplasts', 'Amyloplasts'],
      correctAnswerIndex: 1,
      explanation: 'Chromoplasts are colored plastids containing carotenoid pigments (yellow, orange, red) which give color to flowers and fruits to attract pollinators.'
    },
    {
      question: 'The nucleus of a prokaryotic cell is represented by which of the following?',
      options: ['Nucleolus', 'Nucleosome', 'Nucleoid', 'Nuclear membrane'],
      correctAnswerIndex: 2,
      explanation: 'Prokaryotes lack a nuclear membrane. Their genetic material is concentrated in an undefined region called the nucleoid, containing only naked nucleic acids.'
    },
    {
      question: 'Which of the following processes is responsible for gas exchange (O2 and CO2) in cells?',
      options: ['Active transport', 'Osmosis', 'Diffusion', 'Endocytosis'],
      correctAnswerIndex: 2,
      explanation: 'Diffusion is the spontaneous movement of substance molecules from a region of high concentration to a region of low concentration, driving gas exchange across the cell membrane.'
    },
    {
      question: 'Which cell organelle is primarily involved in lipid synthesis and detoxification?',
      options: ['Rough Endoplasmic Reticulum', 'Smooth Endoplasmic Reticulum', 'Golgi Apparatus', 'Lysosomes'],
      correctAnswerIndex: 1,
      explanation: 'The Smooth Endoplasmic Reticulum (SER) is responsible for synthesis of lipids, steroid hormones, and plays a crucial role in detoxifying poisons and drugs in liver cells.'
    },
    {
      question: 'The cell wall of fungi is composed of which substance?',
      options: ['Cellulose', 'Chitin', 'Hemicellulose', 'Peptidoglycan'],
      correctAnswerIndex: 1,
      explanation: 'Unlike plants which use cellulose, fungal cell walls are made of Chitin, a tough nitrogen-containing polysaccharide.'
    },
    {
      question: 'Which plant tissue is responsible for continuous cell division and growth?',
      options: ['Parenchyma', 'Meristematic tissue', 'Sclerenchyma', 'Collenchyma'],
      correctAnswerIndex: 1,
      explanation: 'Meristematic tissues consist of actively dividing cells found at the growing tips of roots and stems, enabling primary and secondary growth.'
    }
  ],
  // Chemistry / Atoms / Structure
  'atoms': [
    {
      question: 'What is the maximum number of electrons that can be accommodated in the M shell (n=3)?',
      options: ['2', '8', '18', '32'],
      correctAnswerIndex: 2,
      explanation: 'According to the Bohr-Bury formula (2n²), the maximum capacity of the M shell (n=3) is 2 * (3)² = 18 electrons.'
    },
    {
      question: 'Which subatomic particle was discovered by James Chadwick in 1932?',
      options: ['Proton', 'Electron', 'Neutron', 'Positron'],
      correctAnswerIndex: 2,
      explanation: 'James Chadwick discovered the neutron, a neutral subatomic particle located inside the nucleus, having a mass nearly equal to that of a proton.'
    },
    {
      question: 'Atoms of different elements with different atomic numbers but the same mass number are called:',
      options: ['Isotopes', 'Isobars', 'Isotones', 'Isomers'],
      correctAnswerIndex: 1,
      explanation: 'Isobars are atoms of different elements (having different atomic numbers) that possess the exact same mass number (e.g., Argon-40 and Calcium-40).'
    },
    {
      question: 'What is the valency of an oxygen atom (Atomic number = 8)?',
      options: ['2', '6', '4', '8'],
      correctAnswerIndex: 0,
      explanation: 'Oxygen (Z=8) has an electronic configuration of (2, 6). To complete its octet, it needs to gain 2 electrons, which gives it a valency of 8 - 6 = 2.'
    },
    {
      question: 'Which isotope is used in the medical treatment of cancer?',
      options: ['Uranium-235', 'Cobalt-60', 'Iodine-131', 'Carbon-14'],
      correctAnswerIndex: 1,
      explanation: 'Cobalt-60 is a radioactive isotope that emits high-energy gamma rays, which are utilized in radiotherapy to destroy cancer cells.'
    },
    {
      question: 'What is the charge of an alpha (α) particle used in Rutherford gold foil experiment?',
      options: ['+1', '+2', '-1', 'Neutral'],
      correctAnswerIndex: 1,
      explanation: 'An alpha particle is a helium nucleus (He²⁺), consisting of 2 protons and 2 neutrons, thus holding a net positive charge of +2.'
    }
  ],
  // Physics / Gravitation
  'gravitation': [
    {
      question: 'How does the gravitational force between two objects change if the distance between them is doubled?',
      options: ['It is doubled', 'It is halved', 'It is reduced to one-fourth', 'It is quadrupled'],
      correctAnswerIndex: 2,
      explanation: 'By Newton\'s Law of Gravitation, F is inversely proportional to the square of distance (r²). If distance is doubled (2r), the force becomes 1/(2)² = 1/4 of the original.'
    },
    {
      question: 'What is the value of the acceleration due to gravity (g) at the center of the Earth?',
      options: ['9.8 m/s²', '0 m/s²', 'Infinite', '1.6 m/s²'],
      correctAnswerIndex: 1,
      explanation: 'At the center of the Earth, the gravitational pull from the surrounding mass in all directions cancels out, resulting in a net acceleration due to gravity (g) of 0.'
    },
    {
      question: 'The value of the Universal Gravitational Constant (G) was first determined by:',
      options: ['Isaac Newton', 'Albert Einstein', 'Henry Cavendish', 'Galileo Galilei'],
      correctAnswerIndex: 2,
      explanation: 'While Isaac Newton formulated the gravitation law, Henry Cavendish was the first to measure the value of G (6.67 * 10⁻¹¹ N m²/kg²) using a torsion balance.'
    },
    {
      question: 'If an object weighs 60 N on Earth, what would be its approximate weight on the Moon?',
      options: ['60 N', '360 N', '10 N', '6 N'],
      correctAnswerIndex: 2,
      explanation: 'The acceleration due to gravity on the Moon is 1/6th of that on the Earth. Therefore, the weight on the Moon is 60 N * (1/6) = 10 N.'
    },
    {
      question: 'Which force keeps the planets revolving around the Sun in stable orbits?',
      options: ['Centrifugal force', 'Centripetal force provided by Gravity', 'Electrostatic force', 'Magnetic force'],
      correctAnswerIndex: 1,
      explanation: 'The gravitational force of attraction between the Sun and planets acts as a centripetal force, which pulls the planets towards the center and maintains circular/elliptical orbits.'
    },
    {
      question: 'What is the SI unit of pressure?',
      options: ['Newton', 'Joule', 'Pascal', 'Watt'],
      correctAnswerIndex: 2,
      explanation: 'The SI unit of pressure (force per unit area) is Pascal (Pa), which is equal to 1 Newton per square meter (N/m²).'
    }
  ],
  // Physics / Sound
  'sound': [
    {
      question: 'What is the audible range of sound frequencies for an average human ear?',
      options: ['2 Hz to 200 Hz', '20 Hz to 20,000 Hz', '200 Hz to 2,000,000 Hz', 'Above 20,000 Hz only'],
      correctAnswerIndex: 1,
      explanation: 'The human ear is sensitive to frequencies between 20 Hz and 20,000 Hz (20 kHz). Frequencies below 20 Hz are infrasonic, and above 20 kHz are ultrasonic.'
    },
    {
      question: 'Sound waves are categorized as which type of waves in air?',
      options: ['Transverse electromagnetic', 'Longitudinal mechanical', 'Torsional', 'Non-propagating'],
      correctAnswerIndex: 1,
      explanation: 'Sound waves in air are longitudinal mechanical waves because the particles of the medium vibrate back and forth parallel to the direction of wave propagation.'
    },
    {
      question: 'In which of the following media does sound travel the fastest at room temperature?',
      options: ['Air', 'Water', 'Iron/Steel', 'Vacuum'],
      correctAnswerIndex: 2,
      explanation: 'Sound requires a material medium to travel and is fastest in solids (like iron/steel) due to high elasticity and molecular density, followed by liquids, then gases.'
    },
    {
      question: 'The pitch of a sound is primarily determined by its:',
      options: ['Amplitude', 'Frequency', 'Velocity', 'Waveform'],
      correctAnswerIndex: 1,
      explanation: 'Pitch is the brain\'s interpretation of sound frequency. A higher frequency produces a high-pitched (shrill) sound, and a lower frequency produces a flat/grave sound.'
    },
    {
      question: 'What phenomenon is responsible for the reflection of sound resulting in multiple echoes?',
      options: ['Refraction', 'Reverberation', 'Diffraction', 'Dispersion'],
      correctAnswerIndex: 1,
      explanation: 'Reverberation is the persistence of sound in a closed space due to multiple, repeated reflections from walls, ceiling, and floor before it dies down.'
    },
    {
      question: 'What is the minimum distance required between source and obstacle to hear a distinct echo in air (at 22°C)?',
      options: ['1.7 meters', '17.2 meters', '34.4 meters', '172 meters'],
      correctAnswerIndex: 1,
      explanation: 'Since the sensation of sound persists in the human brain for 0.1s, the sound must travel to the obstacle and back in >0.1s. At a speed of 344 m/s, total roundtrip path is 34.4m, giving a minimum distance of 17.2m.'
    }
  ]
};

// Generic extra science/academic questions for fallback/any topic
const GENERIC_QUESTIONS: Omit<QuizQuestion, 'id'>[] = [
  {
    question: 'Which gas is released when a metal reacts with a dilute acid?',
    options: ['Oxygen', 'Carbon Dioxide', 'Hydrogen', 'Nitrogen'],
    correctAnswerIndex: 2,
    explanation: 'Metals react with acids to form metal salts and release Hydrogen gas, which can be tested using a burning splint (produces a pop sound).'
  },
  {
    question: 'What is the chemical name of common salt used in our kitchen?',
    options: ['Sodium Hydroxide', 'Sodium Chloride', 'Sodium Bicarbonate', 'Calcium Carbonate'],
    correctAnswerIndex: 1,
    explanation: 'Common kitchen table salt is Sodium Chloride (NaCl), formed by the neutralization reaction of hydrochloric acid and sodium hydroxide.'
  },
  {
    question: 'Which of the following is a non-metal that remains liquid at room temperature?',
    options: ['Mercury', 'Bromine', 'Chlorine', 'Phosphorus'],
    correctAnswerIndex: 1,
    explanation: 'Bromine is the only non-metallic element that is a liquid at standard room temperature. Mercury is also liquid, but it is a metal.'
  },
  {
    question: 'What is the power house of the eukaryotic cell?',
    options: ['Nucleus', 'Mitochondria', 'Golgi complex', 'Chloroplast'],
    correctAnswerIndex: 1,
    explanation: 'Mitochondria are the power houses of the cell because they synthesize energy in the form of ATP (Adenosine Triphosphate) molecules through cellular respiration.'
  },
  {
    question: 'Which law of motion states that for every action, there is an equal and opposite reaction?',
    options: ['First Law of Motion', 'Second Law of Motion', 'Third Law of Motion', 'Law of Gravitation'],
    correctAnswerIndex: 2,
    explanation: 'Newton\'s Third Law of Motion states that for every action, there is an equal, simultaneous, and opposite reaction.'
  },
  {
    question: 'What is the functional unit of heredity in living organisms?',
    options: ['Chromosome', 'DNA', 'Gene', 'Nucleus'],
    correctAnswerIndex: 2,
    explanation: 'Genes are the functional units of heredity, consisting of specific sequences of DNA located on chromosomes that code for specific proteins.'
  },
  {
    question: 'Which mirror is commonly used by dentists to see large images of teeth?',
    options: ['Concave mirror', 'Convex mirror', 'Plane mirror', 'Bifocal mirror'],
    correctAnswerIndex: 0,
    explanation: 'A Concave mirror forms a magnified, erect, and virtual image of an object when placed close (between focus and pole), making it ideal for dental exams.'
  },
  {
    question: 'The process of conversion of water vapor directly into solid ice is called:',
    options: ['Sublimation', 'Deposition', 'Condensation', 'Solidification'],
    correctAnswerIndex: 1,
    explanation: 'Deposition (or desublimation) is the thermodynamic process where a gas transforms directly into a solid without passing through the liquid phase.'
  },
  {
    question: 'What is the pH value of pure water at neutral state?',
    options: ['0', '5', '7', '14'],
    correctAnswerIndex: 2,
    explanation: 'Pure water has a neutral pH value of exactly 7 at 25°C.'
  },
  {
    question: 'Which organ in the human body secretes insulin to regulate sugar levels?',
    options: ['Liver', 'Pancreas', 'Kidneys', 'Thyroid'],
    correctAnswerIndex: 1,
    explanation: 'The Pancreas contains endocrine cells (Islets of Langerhans) that secrete the hormone insulin to reduce blood glucose concentration.'
  }
];

export function getTenQuestions(
  initialQuiz: QuizQuestion[] = [],
  topicId: string = '',
  topicTitle: string = '',
  subject: string = ''
): QuizQuestion[] {
  // Let's copy initial quiz questions
  const quizList = [...initialQuiz];

  // If we already have 10 or more, return them directly
  if (quizList.length >= 10) {
    return quizList;
  }

  // Find relevant category key based on ID, title, or subject
  let categoryKey = '';
  const searchStr = `${topicId} ${topicTitle} ${subject}`.toLowerCase();

  if (searchStr.includes('cell') || searchStr.includes('bio') || searchStr.includes('life')) {
    categoryKey = 'cell';
  } else if (searchStr.includes('atom') || searchStr.includes('chem') || searchStr.includes('reaction')) {
    categoryKey = 'atoms';
  } else if (searchStr.includes('gravit') || searchStr.includes('force') || searchStr.includes('phys')) {
    categoryKey = 'gravitation';
  } else if (searchStr.includes('sound') || searchStr.includes('wave')) {
    categoryKey = 'sound';
  }

  const suppQuestions = categoryKey ? SUPPLEMENTARY_QUESTIONS[categoryKey] : [];
  
  // Staggered pick from supplementary and generic list to avoid duplicates
  let addedCount = 0;
  const existingQuestionsText = new Set(quizList.map(q => q.question.toLowerCase().trim()));

  // 1. Try to add from relevant supplementary list
  for (const q of suppQuestions) {
    if (quizList.length >= 10) break;
    const cleanText = q.question.toLowerCase().trim();
    if (!existingQuestionsText.has(cleanText)) {
      quizList.push({
        ...q,
        id: `q-supp-${topicId || 'gen'}-${addedCount++}`
      });
      existingQuestionsText.add(cleanText);
    }
  }

  // 2. Try to add from generic list if still less than 10
  for (const q of GENERIC_QUESTIONS) {
    if (quizList.length >= 10) break;
    const cleanText = q.question.toLowerCase().trim();
    if (!existingQuestionsText.has(cleanText)) {
      quizList.push({
        ...q,
        id: `q-gen-${topicId || 'gen'}-${addedCount++}`
      });
      existingQuestionsText.add(cleanText);
    }
  }

  // Double check and pad with basic unique dummy questions if we somehow didn't hit 10
  let padIndex = 1;
  while (quizList.length < 10) {
    quizList.push({
      id: `q-pad-${topicId || 'gen'}-${padIndex}`,
      question: `Revision Practice Checkpoint Question #${padIndex}: What is a fundamental property of matter?`,
      options: ['It has mass and occupies space', 'It has no mass', 'It has infinite speed', 'It only exists in gaseous form'],
      correctAnswerIndex: 0,
      explanation: 'Matter is defined as any substance that possesses mass, volume, and takes up physical space.'
    });
    padIndex++;
  }

  return quizList;
}
