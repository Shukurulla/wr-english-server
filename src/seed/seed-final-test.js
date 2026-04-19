import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { FinalTest } from "../models/FinalTest.js";

const SEMESTER_1_QUESTIONS = [
  { prompt: "Which sentence is most appropriate for an informal letter?", options: ["I would be grateful if you could respond promptly.", "I am writing to inform you about...", "How have you been? I miss you a lot!", "Please find attached the document."], correctAnswerIndex: 2 },
  { prompt: "Semi-formal Letter: Choose the correct opening:", options: ["Hey dude!", "Dear Mr. Smith,", "Yo bro!", "Hi buddy!"], correctAnswerIndex: 1 },
  { prompt: "Which closing is best for a formal letter?", options: ["Cheers", "Best wishes", "Yours faithfully", "See you soon"], correctAnswerIndex: 2 },
  { prompt: "What should you include in a complaint letter?", options: ["Jokes", "Clear description of the problem", "Personal secrets", "Slang"], correctAnswerIndex: 1 },
  { prompt: "What is the main purpose of an application letter?", options: ["To complain", "To entertain", "To apply for a job or position", "To tell a story"], correctAnswerIndex: 2 },
  { prompt: "Transactional writing usually:", options: ["Tells a fictional story", "Exchanges information", "Uses poetry", "Is always informal"], correctAnswerIndex: 1 },
  { prompt: "Which sentence describes a place?", options: ["He is very tall and kind.", "The park is full of green trees and fresh air.", "She loves reading books.", "They are playing football."], correctAnswerIndex: 1 },
  { prompt: "Which sentence describes a person?", options: ["The house is large.", "He has blue eyes and short hair.", "The city is crowded.", "The building is old."], correctAnswerIndex: 1 },
  { prompt: "Describing Buildings: Which is correct?", options: ["The building has ten floors and glass walls.", "She is friendly.", "It is sunny today.", "He runs fast."], correctAnswerIndex: 0 },
  { prompt: "A good paragraph should:", options: ["Have no structure", "Include a topic sentence", "Be only one word", "Have no punctuation"], correctAnswerIndex: 1 },
  { prompt: "Skimming is used to:", options: ["Read every word carefully", "Find detailed information", "Get the main idea quickly", "Translate text"], correctAnswerIndex: 2 },
  { prompt: "Scanning is used to:", options: ["Find specific information", "Read slowly", "Understand grammar", "Write essays"], correctAnswerIndex: 0 },
  { prompt: "A story usually includes:", options: ["Only introduction", "Beginning, middle, and end", "Only dialogue", "Only description"], correctAnswerIndex: 1 },
  { prompt: "What makes a story interesting?", options: ["No details", "Repetition only", "Clear plot and characters", "No ending"], correctAnswerIndex: 2 },
  { prompt: "Formal writing avoids:", options: ["Slang", "Proper grammar", "Punctuation", "Structure"], correctAnswerIndex: 0 },
  { prompt: "Which is informal?", options: ["I would like to inform you", "Kindly respond", "Thanks a lot!", "Yours faithfully"], correctAnswerIndex: 2 },
  { prompt: "A complaint letter should be:", options: ["Rude", "Polite but firm", "Funny", "Emotional only"], correctAnswerIndex: 1 },
  { prompt: "Application writing: What should be included?", options: ["Skills and experience", "Jokes", "Songs", "Stories"], correctAnswerIndex: 0 },
  { prompt: "Good description uses:", options: ["No adjectives", "Many adjectives and details", "Only verbs", "Numbers only"], correctAnswerIndex: 1 },
  { prompt: "What is the first step before reading in detail?", options: ["Skimming", "Writing", "Ignoring text", "Memorizing"], correctAnswerIndex: 0 }
];

const SEMESTER_2_QUESTIONS = [
  { prompt: "Informal Letter: Which sentence fits an informal letter best?", options: ["I look forward to your cooperation.", "Just wanted to say hi and see how you're doing!", "Please be advised that...", "Enclosed you will find..."], correctAnswerIndex: 1 },
  { prompt: "Semi-formal Letter: Choose the correct greeting:", options: ["Dear Sir/Madam", "Hi bro!", "Dear Ms. Johnson,", "Yo!"], correctAnswerIndex: 2 },
  { prompt: "Formal Letter: Which phrase is suitable in a formal letter?", options: ["What's up?", "See ya!", "I am writing regarding...", "Catch you later"], correctAnswerIndex: 2 },
  { prompt: "What is important in a complaint letter?", options: ["Being unclear", "Giving exact details of the issue", "Using jokes", "Writing short only"], correctAnswerIndex: 1 },
  { prompt: "What should you highlight in an application letter?", options: ["Your hobbies only", "Your weaknesses", "Your qualifications and experience", "Your friends"], correctAnswerIndex: 2 },
  { prompt: "Transactional writing mainly focuses on:", options: ["Emotions", "Giving or requesting information", "Storytelling", "Poetry"], correctAnswerIndex: 1 },
  { prompt: "Describing Places: Choose the correct description:", options: ["She is very intelligent.", "The beach has soft sand and blue water.", "He plays football well.", "They are studying."], correctAnswerIndex: 1 },
  { prompt: "Which describes a person?", options: ["The room is dark.", "She has long hair and a friendly smile.", "The road is narrow.", "The park is quiet."], correctAnswerIndex: 1 },
  { prompt: "Describing Buildings: Choose the correct sentence:", options: ["The tower is tall with modern design.", "He is strong.", "It is raining.", "She sings well."], correctAnswerIndex: 0 },
  { prompt: "A paragraph must include:", options: ["Random ideas", "A clear main idea", "No sentences", "Only examples"], correctAnswerIndex: 1 },
  { prompt: "Skimming helps you to:", options: ["Understand every word", "Find grammar mistakes", "Quickly understand the general idea", "Translate text"], correctAnswerIndex: 2 },
  { prompt: "Scanning is useful for:", options: ["Finding names or numbers", "Writing essays", "Learning vocabulary", "Reading slowly"], correctAnswerIndex: 0 },
  { prompt: "A good story has:", options: ["Only characters", "Only ending", "A sequence of events", "No structure"], correctAnswerIndex: 2 },
  { prompt: "What improves storytelling?", options: ["No structure", "Interesting details and events", "Only short sentences", "No characters"], correctAnswerIndex: 1 },
  { prompt: "Formal writing uses:", options: ["Slang", "Abbreviations", "Correct grammar and structure", "Emojis"], correctAnswerIndex: 2 },
  { prompt: "Choose informal expression:", options: ["I would appreciate your reply", "Kind regards", "Can't wait to hear from you!", "Yours faithfully"], correctAnswerIndex: 2 },
  { prompt: "A good complaint letter is:", options: ["Angry", "Polite and clear", "Funny", "Too long"], correctAnswerIndex: 1 },
  { prompt: "What is important in application writing?", options: ["Personal jokes", "Relevant skills", "Songs", "Stories"], correctAnswerIndex: 1 },
  { prompt: "Good descriptive writing includes:", options: ["Strong details and adjectives", "No description", "Only verbs", "Only facts"], correctAnswerIndex: 0 },
  { prompt: "Before detailed reading, you should:", options: ["Scan", "Skip text", "Skim the text", "Memorize"], correctAnswerIndex: 2 }
];

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to MongoDB");

  let created = 0;

  const sem1 = await FinalTest.findOne({ semester: 1, academicYear: "2025-2026" });
  if (!sem1) {
    await FinalTest.create({
      semester: 1,
      academicYear: "2025-2026",
      title: "1-semestr yakuniy testi (Reading & Writing Theory)",
      totalQuestions: 20,
      pointsPerQuestion: 0.1,
      timeLimit: 1200,
      questions: SEMESTER_1_QUESTIONS
    });
    created++;
    console.log("Semester 1 final test created (20 questions)");
  } else {
    console.log("Semester 1 final test already exists");
  }

  const sem2 = await FinalTest.findOne({ semester: 2, academicYear: "2025-2026" });
  if (!sem2) {
    await FinalTest.create({
      semester: 2,
      academicYear: "2025-2026",
      title: "2-semestr yakuniy testi (Reading & Writing Theory)",
      totalQuestions: 20,
      pointsPerQuestion: 0.1,
      timeLimit: 1200,
      questions: SEMESTER_2_QUESTIONS
    });
    created++;
    console.log("Semester 2 final test created (20 questions)");
  } else {
    console.log("Semester 2 final test already exists");
  }

  console.log(`Final tests: ${created} created`);
  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => { console.error(err); process.exit(1); });
