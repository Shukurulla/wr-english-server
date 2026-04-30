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
  },
  {
    type: "reading", semester: 1, order: 9, title: "Passage 9: Personality", topic: "personality", maxScore: 0.5,
    reading: {
      passage: `Personality is the set of characteristics, behaviors, and patterns that make an individual unique. Traits such as introversion, extroversion, openness, and emotional stability define personality and influence how people perceive the world, interact with others, and handle challenges. Genetics, upbringing, culture, and life experiences all shape personality, which can also evolve over time.\n\nUnderstanding personality is essential in education, work, and relationships. It helps people choose suitable careers, improve communication, and resolve conflicts. Introverted individuals might prefer independent work, while extroverted people often excel in teamwork and leadership. Social awareness and empathy further enrich personality, enabling meaningful connections and mutual understanding.\n\nPersonality assessments, such as the Myers-Briggs Type Indicator (MBTI), provide insights into behavior, helping individuals develop strengths and address weaknesses. Cultural background also influences personality. Some societies encourage group harmony and cooperation, while others promote individuality and independence. Recognizing these differences promotes tolerance and social cohesion.\n\nIn conclusion, personality is a dynamic and complex aspect of human life. Awareness of one's traits and tendencies improves relationships, self-development, and decision-making. By embracing individual differences, people can better navigate social and professional environments.`,
      questions: [
        { questionType: "multiple_choice", prompt: "Which of these is a personality trait?", options: ["Height", "Extroversion", "Favorite color", "Age"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Personality can be shaped by:", options: ["Life experiences", "Education", "Social interactions", "All of the above"], correctAnswer: "D", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Introverted people usually:", options: ["Enjoy independent work", "Prefer constant socializing", "Do not interact with others", "Avoid learning new skills"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Personality assessments are useful for:", options: ["Predicting career choices", "Determining favorite food", "Choosing hobbies", "None of the above"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Cultural background can influence:", options: ["Personality expression", "Eye color", "Height", "Musical taste"], correctAnswer: "A", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 10, title: "Passage 10: Fashion Style", topic: "fashion", maxScore: 0.5,
    reading: {
      passage: `Fashion is a way of expressing personality, mood, and cultural identity. People choose clothing, accessories, and hairstyles to communicate individuality and style. Some prefer classic and timeless designs, while others follow the latest trends seen on social media, magazines, and runways. Fashion is not only about appearance but also a reflection of creativity, lifestyle, and values.\n\nAccessories, shoes, and makeup can dramatically change a simple outfit. Many individuals use fashion to boost confidence, express emotions, or demonstrate social status. Sustainable fashion is growing in popularity as people seek eco-friendly materials and ethical brands. Social media has expanded access to fashion, allowing people to discover global trends, experiment with styles, and share personal looks online.\n\nFashion influences perception. Dressing appropriately for an occasion, workplace, or cultural event can enhance self-esteem and social acceptance. However, it can also create pressure to conform, leading to overspending or dissatisfaction. Mindful choices, prioritizing comfort and personal taste, help individuals enjoy fashion without stress.\n\nIn conclusion, fashion is a dynamic, expressive, and personal aspect of life. By understanding trends, embracing personal style, and making conscious choices, individuals can use fashion to communicate their identity and creativity.`,
      questions: [
        { questionType: "multiple_choice", prompt: "Fashion reflects:", options: ["Only trends", "Personality and culture", "Age", "Education level"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Accessories can:", options: ["Transform an outfit", "Be ignored", "Replace clothing", "Determine intelligence"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Sustainable fashion emphasizes:", options: ["Environmental awareness", "Expensive brands", "Popular celebrities", "Colors only"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Social media affects fashion by:", options: ["Sharing trends worldwide", "Limiting clothing choices", "Increasing stress only", "Teaching history"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Mindful fashion choices help:", options: ["Reduce stress and express individuality", "Predict the future", "Guarantee social popularity", "Improve memory"], correctAnswer: "A", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 11, title: "Passage 11: Sports and Health", topic: "sport", maxScore: 0.5,
    reading: {
      passage: `Regular participation in sports and physical activities plays a crucial role in maintaining both physical and mental health. In modern society, where sedentary lifestyles are increasingly common due to desk jobs and digital entertainment, engaging in sports has become more important than ever. Physical exercise helps strengthen muscles, improve cardiovascular health, and maintain a healthy body weight. Activities such as running, swimming, and cycling are particularly effective in improving endurance and overall fitness.\n\nBeyond physical benefits, sports also contribute significantly to mental well-being. Exercise stimulates the release of endorphins, which are chemicals in the brain responsible for feelings of happiness and relaxation. As a result, individuals who engage in regular physical activity often experience reduced stress, anxiety, and depression. Team sports, such as football or basketball, also encourage social interaction, cooperation, and communication among participants.\n\nIn addition, sports can help develop important life skills such as discipline, time management, and goal setting. Athletes must follow training schedules, maintain consistency, and strive to improve their performance over time. These qualities are transferable to other areas of life, including education and professional careers.\n\nHowever, excessive or improper participation in sports can lead to negative consequences. Overtraining without adequate rest may result in injuries, fatigue, and decreased performance. Therefore, it is essential to maintain a balanced approach that includes proper rest, nutrition, and guidance from coaches or professionals.\n\nIn conclusion, sports provide numerous benefits that extend beyond physical fitness. They enhance mental health, build social skills, and develop discipline. Nevertheless, individuals must ensure that they engage in physical activities responsibly to avoid potential risks and maximize long-term benefits.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is one major physical benefit of sports?", options: ["Increased stress", "Improved cardiovascular health", "Reduced communication", "Decreased energy"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What do endorphins do in the brain?", options: ["Cause fatigue", "Produce happiness", "Stop breathing", "Increase weight"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Which sport type improves social interaction?", options: ["Solo sports only", "Team sports", "Indoor games only", "Computer games"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What skill can sports help develop?", options: ["Driving", "Time management", "Painting", "Cooking"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "What may happen due to overtraining?", options: ["Better sleep", "Injuries and fatigue", "Increased height", "Improved eyesight"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 12, title: "Passage 12: Describing Appearance", topic: "appearance", maxScore: 0.5,
    reading: {
      passage: `Appearance is more than just physical traits like height, hair color, or clothing. It also includes posture, facial expressions, gestures, and overall grooming. Together, these aspects create the impression a person makes on others. A well-presented appearance can convey confidence, professionalism, and personality, while poor grooming or slouching might give a negative impression.\n\nDescribing someone accurately is important in many situations. Writers and journalists need detailed descriptions to make characters vivid or convey information clearly. In everyday life, descriptions help identify lost people or explain someone's features. Appearance can also indicate aspects of lifestyle. For instance, someone who dresses neatly may appear disciplined, while casual clothing might suggest a relaxed attitude.\n\nCultural factors influence how appearance is interpreted. In some cultures, bright colors may indicate status or celebration, while in others, modest clothing reflects tradition or respect. Accessories, hairstyles, and makeup further enhance individuality and self-expression. Appearance is not fixed; it can be changed intentionally through style choices, grooming habits, or posture improvements.\n\nIn conclusion, appearance is a combination of physical features, behavior, and grooming. Understanding its importance helps people communicate effectively, express personality, and navigate social and professional situations with confidence.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Posture is part of appearance.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Appearance only includes clothing.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Cultural norms influence perception of appearance.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Describing someone is useful in storytelling.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Appearance cannot be changed.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 13, title: "Passage 13: Scholarship Abroad", topic: "scholarship", maxScore: 0.5,
    reading: {
      passage: `Studying abroad has become increasingly popular among students seeking better educational opportunities and global exposure. Scholarships play a crucial role in making international education accessible, especially for students who cannot afford the high costs of studying in foreign countries.\n\nA scholarship is a financial award given to students based on academic achievement, talent, or financial need. These programs cover various expenses such as tuition fees, accommodation, travel, and sometimes even daily living costs. Many governments, universities, and international organizations offer scholarships to attract talented students from around the world.\n\nOne of the main benefits of studying abroad is exposure to different cultures and perspectives. Students have the opportunity to learn new languages, experience diverse traditions, and develop a global mindset. This cultural exchange helps improve communication skills and increases adaptability.\n\nIn addition, studying abroad enhances career opportunities. Graduates with international experience are often preferred by employers because they demonstrate independence, problem-solving skills, and cross-cultural understanding. Many students also build international networks that can be valuable in their future careers.\n\nHowever, applying for scholarships can be a challenging process. Students must prepare documents such as academic transcripts, recommendation letters, and personal statements. They may also need to pass language proficiency tests. Competition for scholarships is often high, requiring strong academic performance and well-prepared applications.\n\nDespite these challenges, scholarships provide life-changing opportunities for students. They not only reduce financial barriers but also open doors to high-quality education and international experiences.`,
      questions: [
        { questionType: "multiple_choice", prompt: "Scholarships help students cover _______ costs.", options: ["entertainment", "educational", "shopping", "tourism"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Scholarships are given based on achievement or _______.", options: ["age", "financial need", "nationality only", "appearance"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Studying abroad improves ________ understanding.", options: ["medical", "cultural", "physical", "musical"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Employers prefer students with ________ experience.", options: ["minimal", "international", "domestic only", "limited"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Scholarship applications require ________ documents.", options: ["no", "academic", "blank", "fictional"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 14, title: "Passage 14: Transport", topic: "transport", maxScore: 0.5,
    reading: {
      passage: `Paragraph A\nTransport systems are essential for the movement of people and goods. They play a vital role in economic development by connecting cities, regions, and countries. Efficient transport systems help reduce travel time and improve productivity.\n\nParagraph B\nPublic transport, such as buses, trains, and metros, is widely used in urban areas. It is often more affordable and environmentally friendly compared to private vehicles. Governments encourage the use of public transport to reduce traffic congestion and pollution.\n\nParagraph C\nTechnological advancements have improved transport systems significantly. Innovations such as electric vehicles, high-speed trains, and smart traffic systems have increased efficiency and sustainability. These developments aim to reduce environmental impact and improve safety.\n\nParagraph D\nDespite these improvements, transport systems face challenges such as traffic congestion, pollution, and infrastructure limitations. Rapid urbanization has increased the demand for transport, making it difficult for cities to keep up with growth.`,
      questions: [
        { questionType: "matching_headings", prompt: "Match heading to Paragraph A", options: ["Role of transport in economy", "Public transport advantages", "Technology in transport", "Transport challenges"], correctAnswer: "A", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match heading to Paragraph B", options: ["Role of transport in economy", "Public transport advantages", "Technology in transport", "Transport challenges"], correctAnswer: "B", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match heading to Paragraph C", options: ["Role of transport in economy", "Public transport advantages", "Technology in transport", "Transport challenges"], correctAnswer: "C", points: 0.1 },
        { questionType: "matching_headings", prompt: "Match heading to Paragraph D", options: ["Role of transport in economy", "Public transport advantages", "Technology in transport", "Transport challenges"], correctAnswer: "D", points: 0.1 },
        { questionType: "matching_headings", prompt: "Which paragraph mentions environmental benefits?", options: ["Role of transport in economy", "Public transport advantages", "Technology in transport", "Transport challenges"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 15, title: "Passage 15: Money", topic: "money", maxScore: 0.5,
    reading: {
      passage: `Money is an essential tool in modern life, used to purchase goods, access services, invest, and save for the future. Financial literacy is crucial for stability, independence, and planning. Learning to manage money wisely involves budgeting, saving, investing, and avoiding unnecessary debt. Poor money management can lead to stress, anxiety, and difficulties in both personal and professional life.\n\nBudgeting means planning income and expenses carefully. By understanding priorities, people can save for long-term goals, emergencies, or education. Investment strategies, such as stocks, bonds, or property, help grow wealth over time. Cultural and societal factors shape attitudes toward money; some cultures emphasize saving, while others encourage spending to enjoy life. Technology has also changed financial management. Online banking, mobile apps, and digital wallets make it easier to handle finances but require careful attention to security and spending.\n\nMoney affects social relationships as well. Financial stability reduces stress in families, while financial struggles may cause tension. Teaching financial skills to young people ensures they make informed choices, fostering responsibility and long-term success.\n\nIn conclusion, money is more than currency — it is a key to security, opportunity, and well-being. Developing budgeting, saving, and investing skills enables people to maintain a balanced and independent life.`,
      questions: [
        { questionType: "multiple_choice", prompt: "Money is primarily used for:", options: ["Writing letters", "Buying goods and services", "Measuring time", "Exercising"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Poor money management may cause:", options: ["Happiness", "Stress", "Creativity", "Travel"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Budgeting helps to:", options: ["Plan income and expenses", "Predict the future", "Improve memory", "Increase height"], correctAnswer: "A", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Investments:", options: ["Decrease wealth", "Help grow wealth over time", "Are only for the rich", "Have no effect"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Teaching financial literacy to young people:", options: ["Reduces responsibility", "Encourages financial mistakes", "Helps informed decision-making", "Is unnecessary"], correctAnswer: "C", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 16, title: "Passage 16: Social Media", topic: "social_media", maxScore: 0.5,
    reading: {
      passage: `Social media has transformed communication and interaction worldwide. Platforms like Instagram, Facebook, TikTok, and Twitter allow people to share photos, videos, and text with friends and family instantly. Beyond personal use, social media is used for marketing, education, activism, and professional networking.\n\nSocial media has both advantages and disadvantages. It allows users to access global information, join interest-based communities, and express creativity. News, tutorials, and cultural content are easily shared. However, overuse can lead to addiction, decreased productivity, and negative mental health effects. Exposure to misinformation, cyberbullying, or unrealistic comparisons can cause stress, anxiety, or low self-esteem. Experts recommend mindful usage, including setting time limits, verifying information, and balancing online and offline life.\n\nSocial media influences trends, fashion, and opinions. Celebrities, influencers, and brands use it to promote products, ideas, and social causes. While it offers connectivity and inspiration, responsible use is crucial to maintain well-being and meaningful interactions.\n\nIn conclusion, social media is a powerful tool that impacts communication, society, and personal lives. Understanding both its benefits and risks helps individuals use it effectively.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Social media allows global communication.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Overuse of social media has no negative effects.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Experts suggest mindful use to reduce risks.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "Social media has no influence on trends or opinions.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 },
        { questionType: "true_false_not_given", prompt: "It is used only for personal purposes.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 17, title: "Passage 17: Music", topic: "music", maxScore: 0.5,
    reading: {
      passage: `Music is a universal language that evokes emotions, memories, and cultural identity. It can motivate, relax, or energize, depending on the listener and context. Different genres, such as classical, jazz, pop, rock, and hip-hop, appeal to diverse audiences worldwide. Music influences mood, cognitive function, and creativity.\n\nListening actively or performing music develops concentration, memory, and problem-solving skills. Playing instruments or composing encourages discipline and self-expression. Music is also closely linked to cultural traditions; songs and instruments often tell stories about a community, history, or rituals. Festivals and celebrations frequently incorporate music, strengthening social cohesion and collective identity.\n\nMusic also offers psychological benefits. It reduces stress, alleviates anxiety, and improves well-being. Digital platforms allow people to discover new genres, share music globally, and connect with others who share similar tastes. Personal experiences and cultural background influence preferences, making music both universal and individual.\n\nIn conclusion, music is an essential part of human life with emotional, cognitive, and cultural significance. It connects people, enhances creativity, and provides a universal form of expression.`,
      questions: [
        { questionType: "multiple_choice", prompt: "Music can affect mood and ______.", options: ["height", "memories", "weight", "appearance"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Performing music develops concentration and ______.", options: ["fatigue", "creativity", "sleep", "anger"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Cultural traditions often include ______.", options: ["silence", "music", "exclusion", "noise"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Digital platforms help people ______ new music.", options: ["forget", "discover", "ignore", "ban"], correctAnswer: "B", points: 0.1 },
        { questionType: "multiple_choice", prompt: "Music preferences are influenced by personal experiences and ______.", options: ["weather", "culture", "altitude", "gravity"], correctAnswer: "B", points: 0.1 }
      ]
    }
  },
  {
    type: "reading", semester: 1, order: 18, title: "Passage 18: Food", topic: "food", maxScore: 0.5,
    reading: {
      passage: `Food plays a crucial role in maintaining human health and providing energy. A balanced diet ensures that the body receives all the necessary nutrients required for growth and development.\n\nDifferent cultures have unique cuisines that reflect their traditions and available ingredients. These traditional foods often carry historical significance and are passed down through generations.\n\nHealthy eating habits help prevent diseases and maintain physical fitness. Consuming excessive amounts of sugar, salt, and fat can lead to serious health conditions.\n\nCooking at home allows individuals to control ingredients and portion sizes. This often results in healthier meals compared to processed or fast food.`,
      questions: [
        { questionType: "matching_headings", prompt: "A balanced diet is important because...", options: ["prevent diseases", "historical traditions", "control ingredients", "provides nutrients", "cause health problems"], correctAnswer: "D", points: 0.1 },
        { questionType: "matching_headings", prompt: "Traditional foods reflect...", options: ["prevent diseases", "historical traditions", "control ingredients", "provides nutrients", "cause health problems"], correctAnswer: "B", points: 0.1 },
        { questionType: "matching_headings", prompt: "Healthy eating helps...", options: ["prevent diseases", "historical traditions", "control ingredients", "provides nutrients", "cause health problems"], correctAnswer: "A", points: 0.1 },
        { questionType: "matching_headings", prompt: "Home cooking is better because...", options: ["prevent diseases", "historical traditions", "control ingredients", "provides nutrients", "cause health problems"], correctAnswer: "C", points: 0.1 },
        { questionType: "matching_headings", prompt: "Excess sugar and fat can...", options: ["prevent diseases", "historical traditions", "control ingredients", "provides nutrients", "cause health problems"], correctAnswer: "E", points: 0.1 }
      ]
    }
  }
];

const READING_TASKS_SEM2 = [
  {
    type: "reading", semester: 2, order: 1, title: "Passage 1: Healthy Nutrition", topic: "nutrition", maxScore: 1.0,
    reading: {
      passage: `Healthy nutrition plays a vital role in maintaining a good quality of life. It is not only about eating enough food, but also about choosing the right kinds of food that provide essential nutrients such as vitamins, minerals, proteins, carbohydrates, and fats. A balanced diet helps people stay energetic, prevents diseases, and supports both physical and mental development.\n\nIn recent years, people have become more aware of the importance of healthy eating. Many individuals now prefer natural and organic food instead of processed products. Fresh fruits, vegetables, whole grains, and lean proteins are considered key components of a healthy diet. On the other hand, fast food and sugary drinks are often associated with health problems such as obesity, diabetes, and heart disease.\n\nAnother important aspect of healthy nutrition is maintaining regular eating habits. Skipping meals, especially breakfast, can negatively affect concentration and energy levels throughout the day. Experts recommend eating smaller portions more frequently rather than consuming large meals at once.\n\nHowever, maintaining a healthy diet is not always easy. Busy lifestyles, lack of time, and the availability of cheap fast food make it difficult for people to follow proper eating habits. In addition, cultural traditions and personal preferences also influence what people eat daily.\n\nEducation plays an important role in promoting healthy nutrition. Schools and communities should teach people about the benefits of healthy food choices. Governments can also help by providing guidelines and encouraging food companies to produce healthier options.\n\nIn conclusion, healthy nutrition is essential for a long and active life.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is healthy nutrition mainly about?", options: ["Eating more food", "Choosing the right food", "Avoiding all fats", "Skipping meals"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What is a benefit of a balanced diet?", options: ["Less sleep", "More diseases", "More energy", "Higher stress"], correctAnswer: "C", points: 0.2 },
        { questionType: "multiple_choice", prompt: "Why do people prefer organic food?", options: ["It is cheaper", "It is healthier", "It lasts longer", "It tastes worse"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What is a problem mentioned in the text?", options: ["Lack of food", "Busy lifestyle", "Too many vegetables", "No education"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What is the role of education?", options: ["To sell food", "To reduce prices", "To teach healthy habits", "To limit eating"], correctAnswer: "C", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 2, title: "Passage 2: Shopping", topic: "shopping", maxScore: 1.0,
    reading: {
      passage: `Shopping is an essential part of daily life, and it has changed significantly over the years. In the past, people used to visit local markets and small shops to buy everything they needed. Today, shopping has become more diverse with the introduction of supermarkets, shopping malls, and online stores.\n\nOne of the biggest changes in shopping is the rise of online shopping. Many people prefer to buy products on the internet because it is convenient and saves time. Customers can compare prices, read reviews, and order items from the comfort of their homes. Products are often delivered within a few days.\n\nHowever, traditional shopping still has its advantages. Visiting physical stores allows customers to see and try products before purchasing them. It also provides a social experience, as people can shop with friends or family.\n\nDespite its benefits, shopping can sometimes lead to problems. Many people tend to buy unnecessary items, especially during sales. This can result in financial difficulties. Moreover, excessive consumption contributes to environmental problems.\n\nAdvertisements and marketing strategies also influence customer behavior. Companies use attractive promotions to encourage people to buy more products.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Shopping methods have remained the same over time.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Online shopping helps people save time.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "All people prefer online shopping.", options: ["True", "False", "Not Given"], correctAnswer: "Not Given", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Shopping can cause financial problems.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Advertisements have no influence on buyers.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 3, title: "Passage 3: Foreign Language in Our Life", topic: "language", maxScore: 1.0,
    reading: {
      passage: `In today's globalized world, learning a foreign language has become increasingly important. It is necessary for communication, education, and career development.\n\nOne of the main reasons people learn foreign languages is for better career opportunities. Many international companies require employees who can speak multiple languages. Being multilingual gives job seekers an advantage.\n\nLearning a foreign language also improves cognitive abilities. People who speak more than one language often have better memory and problem-solving skills.\n\nForeign languages are also important in education. Students who study abroad need language skills to succeed. Access to foreign books and research also helps learners understand different cultures.\n\nHowever, learning a new language is not easy. It requires time, effort, and practice. Many learners face difficulties with grammar, pronunciation, and vocabulary.\n\nModern technology has made learning easier. Mobile apps and online courses allow people to study anytime and anywhere.`,
      questions: [
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 1", options: ["Technology in language learning", "Career benefits", "Learning difficulties", "Introduction", "Educational importance", "Mental benefits"], correctAnswer: "D", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 2", options: ["Technology in language learning", "Career benefits", "Learning difficulties", "Introduction", "Educational importance", "Mental benefits"], correctAnswer: "B", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 3", options: ["Technology in language learning", "Career benefits", "Learning difficulties", "Introduction", "Educational importance", "Mental benefits"], correctAnswer: "F", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 4", options: ["Technology in language learning", "Career benefits", "Learning difficulties", "Introduction", "Educational importance", "Mental benefits"], correctAnswer: "E", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 5", options: ["Technology in language learning", "Career benefits", "Learning difficulties", "Introduction", "Educational importance", "Mental benefits"], correctAnswer: "C", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 4, title: "Passage 4: Holidays and Traditions", topic: "traditions", maxScore: 1.0,
    reading: {
      passage: `Holidays and traditions are an important part of every culture. They bring families and communities together and help people celebrate their history, beliefs, and values. Every country has its own unique customs, but many share similar themes, such as giving thanks, remembering ancestors, or celebrating seasonal events.\n\nIn many countries, national holidays like Independence Day or National Day are celebrated with ceremonies, parades, and fireworks. Families often gather to share meals and enjoy entertainment. Religious holidays, such as Christmas, Eid, or Diwali, are also widely observed. During these festivals, people follow specific traditions, including special prayers, gift-giving, and cooking traditional foods.\n\nCultural festivals often include music, dance, and art. They provide an opportunity for people to experience different aspects of their heritage and to learn about their ancestors' way of life. In some regions, traditional clothing is worn to honor cultural identity.\n\nHolidays also play a role in strengthening social bonds. Friends and neighbors come together to celebrate, creating a sense of unity and belonging. Schools and communities often organize events to teach younger generations about traditions and their importance.\n\nOver time, some traditions evolve due to modernization, globalization, or changing lifestyles. For example, modern technology allows people to celebrate virtually with family members living far away. Despite these changes, the core values of holidays — gratitude, remembrance, and celebration — remain strong.\n\nIn conclusion, holidays and traditions help maintain cultural identity and foster social cohesion. By participating in these events, people connect with their heritage and strengthen relationships with their community.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is one purpose of holidays and traditions?", options: ["To earn money", "To celebrate culture", "To improve technology", "To travel"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "Which of these is a religious holiday mentioned?", options: ["Independence Day", "Diwali", "Labor Day", "National Day"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "How do cultural festivals help people?", options: ["Teach cooking skills", "Provide heritage experience", "Increase wealth", "Reduce work hours"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "How have some traditions changed?", options: ["They no longer exist", "They can be celebrated online", "They are illegal", "They are forgotten"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What do holidays strengthen in communities?", options: ["Trade", "Social bonds", "Competition", "Technology"], correctAnswer: "B", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 5, title: "Passage 5: Funny Situations", topic: "funny", maxScore: 1.0,
    reading: {
      passage: `Funny situations often make life more enjoyable. Everyone experiences moments that make them laugh, sometimes unexpectedly. Humor can occur in everyday life, at school, at work, or even at home.\n\nOne common scenario involves misunderstandings. For example, someone might mishear instructions and do the opposite of what was asked. These moments can be embarrassing initially but often become a source of laughter later.\n\nPranks and playful jokes are another source of humor. Friends and family members may play harmless tricks on each other. A classic example is hiding someone's belongings or pretending something unusual has happened. The surprise combined with the realization that it is harmless often creates a funny memory.\n\nAnimals can also be a source of amusement. Pets often do unexpected things, such as chasing their tail, jumping into water, or reacting curiously to new objects. Observing these behaviors can be delightful and bring joy to people.\n\nSometimes humor arises from everyday accidents. Spilled drinks, tripped feet, or misplaced objects can provoke laughter, especially when nobody is hurt. These incidents remind people not to take life too seriously and to enjoy simple moments.\n\nSharing funny experiences strengthens relationships. People enjoy telling stories, which creates a sense of connection. Laughter is also known to reduce stress and improve mood, making it an essential part of well-being.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Misunderstandings always cause serious problems.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Pranks are sometimes a source of humor.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Pets can behave in ways that make people laugh.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Accidents that hurt people are the main source of humor.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Sharing funny experiences can improve social connections.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 6, title: "Passage 6: Worst Situations", topic: "worst_situation", maxScore: 1.0,
    reading: {
      passage: `Everyone faces difficult or stressful situations in life. These experiences can be personal, social, or professional. While challenging, they often teach important lessons and help people develop resilience.\n\nA common type of difficult situation involves accidents or emergencies. For example, car accidents, injuries, or sudden illnesses can be frightening. People often need to act quickly and calmly to handle these situations effectively.\n\nAnother type of challenging experience is academic or work-related stress. Missing deadlines, failing exams, or facing high-pressure tasks can cause anxiety. Support from teachers, colleagues, or family members can help individuals manage these difficulties.\n\nFinancial problems also create stress. Losing a job, unexpected expenses, or debt can make daily life difficult. Planning and careful budgeting can mitigate some of these challenges.\n\nSocial conflicts, such as arguments with friends or misunderstandings in relationships, can also be emotionally distressing. Learning communication skills and conflict resolution helps people handle such situations better.\n\nDespite the difficulties, overcoming challenging situations often leads to personal growth. People learn patience, problem-solving, and resilience. Sharing experiences and seeking help from others can reduce stress and provide new perspectives.`,
      questions: [
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 1", options: ["Social conflicts", "Academic and work stress", "Introduction", "Personal growth", "Financial problems", "Accidents and emergencies"], correctAnswer: "C", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 2", options: ["Social conflicts", "Academic and work stress", "Introduction", "Personal growth", "Financial problems", "Accidents and emergencies"], correctAnswer: "F", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 3", options: ["Social conflicts", "Academic and work stress", "Introduction", "Personal growth", "Financial problems", "Accidents and emergencies"], correctAnswer: "B", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 4", options: ["Social conflicts", "Academic and work stress", "Introduction", "Personal growth", "Financial problems", "Accidents and emergencies"], correctAnswer: "E", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 5", options: ["Social conflicts", "Academic and work stress", "Introduction", "Personal growth", "Financial problems", "Accidents and emergencies"], correctAnswer: "D", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 7, title: "Passage 7: Living in Rural Areas", topic: "rural", maxScore: 1.0,
    reading: {
      passage: `Life in rural areas is often peaceful and close to nature. Villages and small towns provide a slower pace of life compared to big cities. People living in these areas often have strong connections with their neighbors and community.\n\nAgriculture is the main source of livelihood in many rural areas. People grow crops, raise livestock, and sell their produce in local markets. The reliance on natural resources creates a closer connection to the environment.\n\nRural areas have several advantages. Clean air, less noise, and scenic landscapes contribute to better physical and mental health. Communities are often tight-knit, and people support each other during festivals, harvests, or personal events.\n\nHowever, rural living has challenges. Limited access to healthcare, education, and modern infrastructure can affect quality of life. Young people often move to cities seeking better career opportunities, leaving older generations behind.\n\nCultural traditions are usually preserved in rural areas. Festivals, local crafts, and traditional cuisines are maintained, helping to keep cultural heritage alive.`,
      questions: [
        { questionType: "multiple_choice", prompt: "What is a major source of income in rural areas?", options: ["Factories", "Agriculture", "Technology", "Tourism"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What is an advantage of rural life?", options: ["Heavy traffic", "Clean air", "Lack of festivals", "High population"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "What is a challenge of living in villages?", options: ["Too many schools", "Limited healthcare", "Excess entertainment", "High pollution"], correctAnswer: "B", points: 0.2 },
        { questionType: "multiple_choice", prompt: "Why do some young people leave rural areas?", options: ["To find better jobs", "To plant crops", "To avoid festivals", "To experience traffic"], correctAnswer: "A", points: 0.2 },
        { questionType: "multiple_choice", prompt: "How is culture preserved in rural areas?", options: ["Through modernization", "By festivals and traditions", "By moving to cities", "Through advertisements"], correctAnswer: "B", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 8, title: "Passage 8: Living in Urban Areas", topic: "urban", maxScore: 1.0,
    reading: {
      passage: `Urban areas, including large cities and towns, are characterized by high population density and modern infrastructure. Life in cities is fast-paced and often full of opportunities.\n\nCities provide a wide range of jobs in industries such as technology, finance, education, and services. Residents also have access to better healthcare, schools, and entertainment facilities. Public transport makes commuting easier, and cultural diversity is often higher than in rural areas.\n\nHowever, urban living also comes with challenges. Traffic congestion, air pollution, noise, and crowded living spaces are common problems. The cost of living is usually higher, making it difficult for some residents to afford housing and basic necessities.\n\nSocial life in cities is vibrant. People can meet diverse communities, attend events, and access services conveniently. At the same time, urban residents may experience stress due to busy schedules and competition.\n\nDespite challenges, cities attract people because of their opportunities and modern amenities. Governments continue to develop infrastructure and urban planning to improve residents' quality of life.`,
      questions: [
        { questionType: "true_false_not_given", prompt: "Urban areas have low population density.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Cities offer a variety of job opportunities.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Noise and traffic are not issues in cities.", options: ["True", "False", "Not Given"], correctAnswer: "False", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Cost of living is higher in urban areas.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 },
        { questionType: "true_false_not_given", prompt: "Urban planning helps improve quality of life.", options: ["True", "False", "Not Given"], correctAnswer: "True", points: 0.2 }
      ]
    }
  },
  {
    type: "reading", semester: 2, order: 9, title: "Passage 9: Games and Exercises in Lessons", topic: "games", maxScore: 1.0,
    reading: {
      passage: `Educational games and exercises are widely used in classrooms to make learning engaging and effective. Teachers use interactive activities to help students understand concepts, practice skills, and retain information.\n\nGames can be physical, such as movement-based activities that reinforce learning. For example, students might act out scenes from history or solve math problems through a relay race. Physical games help kinesthetic learners absorb information through movement.\n\nBoard games, quizzes, and puzzles are popular tools for teaching vocabulary, grammar, and problem-solving skills. These activities encourage teamwork, strategic thinking, and communication among students.\n\nTechnology has introduced new ways to integrate games in lessons. Educational apps, interactive whiteboards, and online quizzes allow students to practice independently or compete with peers. Digital games often provide instant feedback, motivating learners to improve.\n\nExercises without competition are also useful. Mind maps, group discussions, and role-plays help students explore topics creatively. Combining games and exercises enhances engagement and makes learning more enjoyable.\n\nIn conclusion, using games and exercises during lessons improves student participation, motivation, and understanding. Teachers who incorporate these tools create dynamic learning environments that benefit all learners.`,
      questions: [
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 1", options: ["Role of technology", "Introduction to educational games", "Physical activity games", "Board games and puzzles", "Non-competitive exercises", "Conclusion"], correctAnswer: "B", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 2", options: ["Role of technology", "Introduction to educational games", "Physical activity games", "Board games and puzzles", "Non-competitive exercises", "Conclusion"], correctAnswer: "C", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 3", options: ["Role of technology", "Introduction to educational games", "Physical activity games", "Board games and puzzles", "Non-competitive exercises", "Conclusion"], correctAnswer: "D", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 4", options: ["Role of technology", "Introduction to educational games", "Physical activity games", "Board games and puzzles", "Non-competitive exercises", "Conclusion"], correctAnswer: "A", points: 0.2 },
        { questionType: "matching_headings", prompt: "Choose heading for Paragraph 5", options: ["Role of technology", "Introduction to educational games", "Physical activity games", "Board games and puzzles", "Non-competitive exercises", "Conclusion"], correctAnswer: "E", points: 0.2 }
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

  // Reading tasks (semester 2)
  for (const task of READING_TASKS_SEM2) {
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
