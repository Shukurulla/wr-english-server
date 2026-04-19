import "dotenv/config";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import { Task } from "../models/Task.js";

const READING_TASKS = [
  {
    type: "reading", semester: 1, order: 1, title: "Passage 1: Business and Management", topic: "business", maxScore: 0.5,
    reading: {
      passage: `Paragraph A\nTime management is a vital skill in the business world. Employees and managers must organize their tasks effectively to meet deadlines and maintain productivity. Good time management reduces stress and increases efficiency in the workplace.\n\nParagraph B\nTeamwork is essential for achieving organizational goals. When employees collaborate and share ideas, they can solve problems more effectively. Strong teamwork also builds trust and improves workplace relationships.\n\nParagraph C\nInnovation helps businesses stay competitive in a rapidly changing market. Companies that encourage creativity and new ideas are more likely to grow and succeed. Innovation can lead to improved products, services, and processes.\n\nParagraph D\nCustomer satisfaction is a key factor in business success. Organizations must understand customer needs and provide high-quality products or services. Satisfied customers are more likely to remain loyal and recommend the company to others.\n\nParagraph E\nTraining and development are important for improving employee skills. Companies that invest in staff training can enhance performance and increase job satisfaction. Continuous learning helps employees adapt to new challenges.`,
      questions: [
        { questionType: "matching_headings", prompt: "Match the headings to Paragraph A", options: ["Time management importance", "Teamwork benefits", "Role of innovation", "Customer satisfaction", "Employee training"], correctAnswer: "A", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match the headings to Paragraph B", options: ["Time management importance", "Teamwork benefits", "Role of innovation", "Customer satisfaction", "Employee training"], correctAnswer: "B", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match the headings to Paragraph C", options: ["Time management importance", "Teamwork benefits", "Role of innovation", "Customer satisfaction", "Employee training"], correctAnswer: "C", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match the headings to Paragraph D", options: ["Time management importance", "Teamwork benefits", "Role of innovation", "Customer satisfaction", "Employee training"], correctAnswer: "D", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match the headings to Paragraph E", options: ["Time management importance", "Teamwork benefits", "Role of innovation", "Customer satisfaction", "Employee training"], correctAnswer: "E", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 2, title: "Passage 2: Health", topic: "health", maxScore: 0.5,
    reading: {
      passage: `Health is one of the most valuable aspects of human life. A person's physical and mental well-being directly affects their ability to work, study, and enjoy daily activities. Maintaining good health requires a combination of proper nutrition, regular physical activity, adequate sleep, and a balanced lifestyle.\n\nA balanced diet is essential for providing the body with necessary nutrients. Foods rich in vitamins, minerals, proteins, carbohydrates, and fats help the body function properly. For example, fruits and vegetables supply vitamins and antioxidants, while proteins help in muscle repair and growth. On the other hand, excessive consumption of processed foods, sugar, and unhealthy fats can lead to various health problems such as obesity, diabetes, and heart disease.\n\nPhysical activity is another important factor in maintaining health. Regular exercise helps improve cardiovascular fitness, strengthen muscles, and maintain a healthy weight. It also plays a significant role in mental health by reducing stress, anxiety, and depression. Activities such as walking, running, swimming, or playing sports can all contribute to a healthier lifestyle.\n\nSleep is often overlooked, but it is equally important. Adequate sleep allows the body to recover and regenerate. Lack of sleep can negatively affect concentration, memory, and overall performance. Experts generally recommend that adults get between 7 to 9 hours of sleep per night.\n\nMental health is an essential component of overall well-being. Stress management techniques such as meditation, hobbies, and social interaction can help maintain emotional balance. In recent years, awareness of mental health issues has increased, and more people are seeking professional help when needed.\n\nIn conclusion, maintaining good health requires a holistic approach that includes proper diet, regular exercise, sufficient sleep, and attention to mental well-being. Individuals who prioritize their health are more likely to lead productive and fulfilling lives.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is essential for good health?", options: ["Only exercise", "Balanced lifestyle", "Only sleep", "Only diet"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What do fruits and vegetables provide?", options: ["Fats", "Vitamins and antioxidants", "Sugar", "Salt"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What can lack of sleep affect?", options: ["Height", "Memory and concentration", "Eye color", "Taste"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Exercise helps mainly in:", options: ["Reducing food intake", "Improving fitness and mental health", "Increasing sleep only", "Stopping metabolism"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Mental health can be improved by:", options: ["Ignoring problems", "Stress management techniques", "Avoiding people", "Sleeping all day"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 3, title: "Passage 3: Family Values", topic: "family", maxScore: 0.5,
    reading: {
      passage: `Family values are the foundation of social structure in many societies around the world. They represent the beliefs, principles, and moral standards that guide interactions among family members. These values are typically passed from one generation to the next and play a significant role in shaping individual behavior and attitudes.\n\nOne of the most important aspects of family values is respect. Children are often taught to respect their parents, elders, and other members of the family. This respect helps maintain harmony and order within the household. In addition, honesty is another key value that encourages trust and openness among family members. When individuals communicate honestly, misunderstandings are less likely to occur.\n\nAnother important element is responsibility. Family members are expected to contribute to the household in various ways, such as helping with chores or supporting each other emotionally. This sense of responsibility helps build cooperation and strengthens relationships. Moreover, families often emphasize the importance of education and personal development, encouraging children to work hard and achieve their goals.\n\nHowever, modern lifestyles have affected traditional family values. With the rise of technology and busy work schedules, many families spend less time together. This can lead to weaker relationships and reduced communication. Despite these challenges, many families make efforts to preserve their values by organizing regular gatherings and maintaining traditions.\n\nCultural differences also influence family values. In some cultures, extended families live together and play an important role in daily life, while in others, nuclear families are more common. Regardless of these differences, the core principles of love, support, and mutual respect remain consistent.\n\nIn conclusion, family values continue to play a vital role in shaping individuals and maintaining social stability. Although modern changes present challenges, strong family values help create supportive and harmonious environments.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Family values are passed from generation to generation.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Respect is not considered important in families.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Responsibility helps strengthen relationships.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "All cultures have the same family structure.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Technology has completely destroyed family values.", options: ["True", "False", "Not Given"], correctAnswer: "Not Given", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 4, title: "Passage 4: Education", topic: "education", maxScore: 0.5,
    reading: {
      passage: `Education is one of the most important factors in personal and societal development. It provides individuals with knowledge, skills, and opportunities that help them succeed in life. From early childhood to higher education, learning plays a crucial role in shaping a person's future.\n\nPrimary and secondary education focus on building basic skills such as reading, writing, and mathematics. These foundational skills are essential for further learning and everyday life. Schools also help students develop social skills by interacting with peers and teachers. In addition, education promotes critical thinking, allowing students to analyze information and solve problems effectively.\n\nHigher education, such as university studies, offers specialized knowledge in various fields. Students can choose subjects based on their interests and career goals. This level of education prepares individuals for professional careers and contributes to economic growth. Many countries invest heavily in education systems to ensure a skilled workforce.\n\nTechnology has transformed education in recent years. Online learning platforms, digital resources, and virtual classrooms have made education more accessible. Students can now learn from anywhere in the world, which is especially beneficial for those in remote areas. However, online learning also presents challenges, such as lack of direct interaction and self-discipline requirements.\n\nAnother important aspect of education is lifelong learning. In today's rapidly changing world, individuals must continue learning new skills to remain competitive in the job market. This includes attending courses, workshops, and training programs.\n\nIn conclusion, education is essential for both personal growth and societal progress. It equips individuals with the tools they need to succeed and contributes to the development of communities and nations.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is the main purpose of education?", options: ["Entertainment", "Personal and societal development", "Travel", "Sports"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What skills are taught in primary education?", options: ["Driving", "Reading and writing", "Cooking", "Painting"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What does higher education provide?", options: ["Basic skills only", "Specialized knowledge", "No skills", "Entertainment"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What is one advantage of online learning?", options: ["Less access", "More accessibility", "No flexibility", "Higher cost"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What is lifelong learning?", options: ["Learning only in school", "Continuous learning throughout life", "Learning only as a child", "No learning"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 5, title: "Passage 5: Global Problems (Environment)", topic: "environment", maxScore: 0.5,
    reading: {
      passage: `Environmental protection has become a global priority due to increasing awareness of climate change and pollution. Human activities such as industrial production, transportation, and deforestation have significantly impacted the natural environment.\n\nFactories release greenhouse gases into the atmosphere, contributing to global warming. This phenomenon leads to rising global temperatures, melting ice caps, and extreme weather events such as floods and droughts. Transportation systems, especially those powered by fossil fuels, also contribute to air pollution.\n\nAnother major issue is plastic waste. Plastics are widely used due to their durability and low cost, but they take hundreds of years to decompose. Improper disposal of plastic waste leads to pollution of oceans, harming marine life and ecosystems.\n\nTo combat these issues, many countries are adopting environmentally friendly policies. Renewable energy sources such as solar and wind power are being promoted as alternatives to fossil fuels. Recycling programs are also being implemented to reduce waste and conserve resources.\n\nIndividuals can contribute by making small changes in their daily lives. For example, reducing the use of plastic bags, conserving water, using public transportation, and recycling materials can collectively make a significant difference.\n\nEnvironmental education is also important. By raising awareness about environmental issues, people are more likely to adopt sustainable practices. Schools and organizations play a key role in educating future generations about protecting the planet.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Factories contribute to global warming.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Plastic decomposes quickly.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Renewable energy is being promoted.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Individuals cannot help the environment.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Education helps environmental awareness.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 6, title: "Passage 6: Technology", topic: "technology", maxScore: 0.5,
    reading: {
      passage: `Technology has rapidly evolved over the past few decades, transforming communication, education, business, and everyday life. The integration of digital tools has made processes faster, more efficient, and more accessible.\n\nIn communication, technology has enabled instant interaction across the globe. Email, messaging apps, and video conferencing allow people to stay connected regardless of distance. This has improved both personal relationships and professional collaboration.\n\nIn education, technology has introduced new learning methods. Online platforms, virtual classrooms, and educational applications allow students to learn at their own pace. Access to digital resources has made education more flexible and inclusive.\n\nIn business, technology has improved productivity through automation and data analysis. Companies can now process large amounts of information quickly and make informed decisions. Artificial intelligence and machine learning are increasingly used to optimize operations and reduce costs.\n\nHowever, technology also presents challenges. Cybersecurity threats, data privacy concerns, and job displacement due to automation are significant issues. Additionally, excessive use of technology can lead to reduced physical activity and social interaction.\n\nDespite these challenges, technology continues to play a vital role in modern society. Its benefits outweigh the drawbacks when used responsibly and effectively.`,
      questions: [
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 2", options: ["Communication", "Education", "Business", "Challenges", "Conclusion"], correctAnswer: "A", points: 0.1 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 3", options: ["Communication", "Education", "Business", "Challenges", "Conclusion"], correctAnswer: "B", points: 0.1 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 4", options: ["Communication", "Education", "Business", "Challenges", "Conclusion"], correctAnswer: "C", points: 0.1 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 5", options: ["Communication", "Education", "Business", "Challenges", "Conclusion"], correctAnswer: "D", points: 0.1 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 6", options: ["Communication", "Education", "Business", "Challenges", "Conclusion"], correctAnswer: "E", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 7, title: "Passage 7: Travel", topic: "travel", maxScore: 0.5,
    reading: {
      passage: `Travel is an important activity that allows people to explore different parts of the world. It provides opportunities for relaxation, adventure, and cultural exchange.\n\nTourism contributes significantly to economic growth. Many countries rely on tourism as a source of income. It creates jobs in sectors such as hospitality, transportation, and entertainment.\n\nCultural exchange is another benefit of travel. When people visit new places, they learn about different traditions, languages, and lifestyles. This helps promote understanding between cultures.\n\nHowever, tourism can also have negative effects. Overcrowding, pollution, and damage to natural environments are common problems in popular destinations.\n\nSustainable tourism aims to reduce these negative impacts. It encourages responsible travel practices such as respecting local cultures and minimizing environmental damage.`,
      questions: [
        { questionType: "matching_headings", prompt: "Which paragraph is about economic contribution?", options: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"], correctAnswer: "B", points: 0.1 },
        { questionType: "matching_headings", prompt: "Which paragraph is about cultural learning?", options: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"], correctAnswer: "C", points: 0.1 },
        { questionType: "matching_headings", prompt: "Which paragraph is about negative effects?", options: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"], correctAnswer: "D", points: 0.1 },
        { questionType: "matching_headings", prompt: "Which paragraph is about sustainable tourism?", options: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"], correctAnswer: "E", points: 0.1 },
        { questionType: "matching_headings", prompt: "Which paragraph is the general introduction?", options: ["Paragraph 1", "Paragraph 2", "Paragraph 3", "Paragraph 4", "Paragraph 5"], correctAnswer: "A", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 8, title: "Passage 8: Childhood Memories", topic: "childhood", maxScore: 0.5,
    reading: {
      passage: `Childhood is often remembered as a magical period filled with curiosity, exploration, and learning. Many people recall specific events that left a lasting impression, such as family vacations, birthday parties, or school competitions. Playtime with friends, outdoor adventures, and imaginative games often form vivid memories. These experiences influence the interests, personality, and values that adults develop later in life.\n\nFamily plays a vital role in childhood. Parents and siblings provide emotional support, teach moral lessons, and help guide behavior. Special family traditions, like celebrating holidays, cooking together, or telling stories, create lasting bonds and memories. Friendships also contribute to personal growth. Children learn cooperation, sharing, empathy, and problem-solving through their interactions with peers.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Childhood is remembered as a magical period.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Childhood experiences do not influence adult personality.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Family traditions create lasting bonds.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Children do not learn from friendships.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Most children prefer indoor activities.", options: ["True", "False", "Not Given"], correctAnswer: "Not Given", points: 0.1 }
      ]
    }
  }
];

const WRITING_TASKS_SEM1 = [
  { order: 1, title: "Essay: Business and Management", topic: "business", instructions: "What skills are necessary to succeed in business and management? Give your opinion. (180–200 words)", minWords: 180, maxWords: 200, guidingQuestions: ["What personal qualities are important for a good manager?", "How important is teamwork in business?", "Can leadership skills be learned or are they natural?"] },
  { order: 2, title: "Semi-official Letter: Health", topic: "health", instructions: "Write a semi-official letter to a doctor or a specialist you know. Explain your health condition and ask for advice. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What symptoms have you been experiencing?", "How long have you had this condition?", "What kind of advice or treatment are you expecting?"] },
  { order: 3, title: "Informal Letter: Family Values", topic: "family", instructions: "Write a letter to your friend. In your letter, describe your family values and traditions. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What traditions are most important in your family?", "How do your family values influence your daily life?", "Have your family traditions changed over time? Why or why not?"] },
  { order: 4, title: "Official Letter: Education", topic: "education", instructions: "Write an official letter to the university rector. Give your suggestions on how to improve the quality of education. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["What problems do students face in the current education system?", "How can teachers improve their teaching methods?", "What role does technology play in education quality?"] },
  { order: 5, title: "Essay: Global Problems", topic: "environment", instructions: "Choose one global problem and suggest possible solutions. (180–200 words)", minWords: 180, maxWords: 200, guidingQuestions: ["Why is this problem serious today?", "Who is most affected by this issue?", "What can individuals do to help solve this problem?"] },
  { order: 6, title: "Essay: Technology and Connection", topic: "technology", instructions: "Does technology improve or harm communication between people? Support your opinion. (180–200 words)", minWords: 180, maxWords: 200, guidingQuestions: ["How has technology changed communication?", "What are the advantages of online communication?", "Are there any negative effects of technology on relationships?"] },
  { order: 7, title: "Describing Places: Last Travel Experience", topic: "travel", instructions: "Describe a place you visited during your last trip. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["Where did you go and why did you choose this place?", "What did you like most about this place?", "Would you recommend it to others? Why?"] },
  { order: 8, title: "Describing Places: Childhood Memories", topic: "childhood", instructions: "Describe an important place from your childhood (your home, school, or neighborhood). (150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["Why is this place important to you?", "What memories do you have connected to it?", "How has this place changed over time?"] },
  { order: 9, title: "Describing People: Personality", topic: "personality", instructions: "Describe your close friend's personality. Include both positive and negative traits. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What are your friend's strongest qualities?", "What weaknesses does your friend have?", "How does your friend behave in difficult situations?"] },
  { order: 10, title: "Paragraph Writing: Fashion Style", topic: "fashion", instructions: "Write about your fashion style. (100–120 words)", minWords: 100, maxWords: 120, guidingQuestions: ["How would you describe your personal style?", "What influences your fashion choices?", "Do you follow trends or prefer your own style?"] },
  { order: 11, title: "Paragraph Writing: Sport", topic: "sport", instructions: "Write about the importance of sport in people's lives. (100–120 words)", minWords: 100, maxWords: 120, guidingQuestions: ["Why is sport important for health?", "What types of sports are most popular in your country?", "How does sport affect mental well-being?"] },
  { order: 12, title: "Describing People: Appearance", topic: "appearance", instructions: "Describe a person's physical appearance in detail. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What are the most noticeable features of this person?", "How would you describe their style or clothing?", "How does their appearance reflect their personality?"] },
  { order: 13, title: "Application Letter: Scholarship Abroad", topic: "scholarship", instructions: "Write an application letter for a scholarship abroad. Introduce yourself and explain why you should be selected. (180–200 words)", minWords: 180, maxWords: 200, guidingQuestions: ["What are your main academic achievements?", "How will this scholarship help your future career?", "What makes you different from other applicants?"] },
  { order: 14, title: "Complaint Letter: Transport", topic: "transport", instructions: "Write a complaint letter to a transport company. Describe a bad experience you recently had with their service. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["What exactly went wrong during your journey?", "How did this experience affect your plans?", "What solution do you expect from the company?"] },
  { order: 15, title: "Transactional Letter: Money", topic: "money", instructions: "Write a letter to a bank. Explain a problem with your account and request a solution. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["What problem did you notice with your account?", "When did the issue first occur?", "What action would you like the bank to take?"] },
  { order: 16, title: "Vocabulary + Writing: Social Media", topic: "social_media", instructions: "Select 10 words related to social media and use them in a short paragraph. (100–120 words)", minWords: 100, maxWords: 120, guidingQuestions: ["Which social media platforms do you use most?", "How does social media affect people's lives?", "What are the risks of using social media?"] },
  { order: 17, title: "Essay: Music", topic: "music", instructions: "Write about the influence of music on people's mood. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["How does music affect emotions?", "What type of music do people prefer and why?", "Can music help reduce stress?"] },
  { order: 18, title: "Essay: Food and Diet", topic: "food", instructions: "Write about the importance of a healthy diet. (150–180 words)", minWords: 150, maxWords: 180, guidingQuestions: ["What are the benefits of a healthy diet?", "What problems are caused by unhealthy eating?", "How can people improve their eating habits?"] }
];

const WRITING_TASKS_SEM2 = [
  { order: 1, title: "Healthy Nutrition (Description)", topic: "nutrition", instructions: "Write a short essay about healthy nutrition. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What is healthy nutrition?", "Why is it important for people?", "What kinds of food should people eat regularly?"] },
  { order: 2, title: "Shopping (Story)", topic: "shopping", instructions: "Write a story about a shopping experience. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["Where and when you went shopping", "What you wanted to buy", "A surprising or interesting situation that happened"] },
  { order: 3, title: "Foreign Language in Our Life", topic: "language", instructions: "Write about the importance of foreign languages in modern life. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["Why people learn foreign languages", "How it helps in education or career", "How it affects communication between people"] },
  { order: 4, title: "Holidays and Traditions", topic: "traditions", instructions: "Write about holidays and traditions in your country. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What are the most popular holidays?", "How do people celebrate them?", "Why are traditions important?"] },
  { order: 5, title: "Funny Situation (Story)", topic: "funny", instructions: "Write about a funny situation you have experienced. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["When and where it happened", "Who was with you", "Why it was funny"] },
  { order: 6, title: "Worst Situation (Story)", topic: "worst_situation", instructions: "Write about the worst situation you have experienced. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What happened", "How you felt at that time", "What you learned from this experience"] },
  { order: 7, title: "Living in Rural Areas", topic: "rural", instructions: "Write about life in rural areas. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What life is like in villages", "Advantages of living in rural areas", "Disadvantages of living in rural areas"] },
  { order: 8, title: "Living in Urban Areas", topic: "urban", instructions: "Write about life in urban areas. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What life is like in big cities", "Benefits of living in cities", "Problems people face in urban areas"] },
  { order: 9, title: "Games and Exercises During Lesson", topic: "games", instructions: "Write about using games and exercises in lessons. (120–150 words)", minWords: 120, maxWords: 150, guidingQuestions: ["What types of games are used in lessons", "How they help students learn", "Your personal opinion about using games in class"] }
];

async function seed() {
  await mongoose.connect(config.MONGO_URI);
  console.log("Connected to MongoDB");

  let created = 0;
  let skipped = 0;

  // Reading tasks (semester 1)
  for (const task of READING_TASKS) {
    const exists = await Task.findOne({ type: task.type, semester: task.semester, order: task.order });
    if (exists) { skipped++; continue; }
    await Task.create(task);
    created++;
  }

  // Writing tasks (semester 1)
  for (const w of WRITING_TASKS_SEM1) {
    const exists = await Task.findOne({ type: "writing", semester: 1, order: w.order });
    if (exists) { skipped++; continue; }
    await Task.create({
      type: "writing", semester: 1, order: w.order, title: w.title, topic: w.topic, maxScore: 0.5,
      writing: {
        instructions: w.instructions, minWords: w.minWords, maxWords: w.maxWords, timeLimit: 1200,
        rubric: { semester: 1, bands: [0.1, 0.2, 0.3, 0.4, 0.5] },
        guidingQuestions: w.guidingQuestions
      }
    });
    created++;
  }

  // Writing tasks (semester 2)
  for (const w of WRITING_TASKS_SEM2) {
    const exists = await Task.findOne({ type: "writing", semester: 2, order: w.order });
    if (exists) { skipped++; continue; }
    await Task.create({
      type: "writing", semester: 2, order: w.order, title: w.title, topic: w.topic, maxScore: 1.0,
      writing: {
        instructions: w.instructions, minWords: w.minWords, maxWords: w.maxWords, timeLimit: 1200,
        rubric: { semester: 2, bands: [0.2, 0.4, 0.6, 0.8, 1.0] },
        guidingQuestions: w.guidingQuestions
      }
    });
    created++;
  }

  console.log(`Tasks: ${created} created, ${skipped} skipped (already exist)`);
  await mongoose.disconnect();
  console.log("Done");
}

seed().catch((err) => { console.error(err); process.exit(1); });
