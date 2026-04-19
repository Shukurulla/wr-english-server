export function gradeReading(submission, task) {
  let totalScore = 0;
  const gradedAnswers = [];

  for (const answer of submission.reading.answers) {
    const question = task.reading.questions.find(
      (q) => q._id.toString() === answer.questionId.toString()
    );
    if (!question) {
      gradedAnswers.push({ ...answer, isCorrect: false, pointsAwarded: 0 });
      continue;
    }

    let isCorrect = false;
    if (question.questionType === "matching_headings") {
      isCorrect = arraysEqual(
        normalizeArray(answer.answer),
        normalizeArray(question.correctAnswer)
      );
    } else {
      isCorrect = normalize(String(answer.answer)) === normalize(String(question.correctAnswer));
    }

    const pointsAwarded = isCorrect ? question.points : 0;
    totalScore += pointsAwarded;
    gradedAnswers.push({
      questionId: answer.questionId,
      answer: answer.answer,
      isCorrect,
      pointsAwarded
    });
  }

  return { totalScore: round1(totalScore), gradedAnswers };
}

export function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

export function round1(num) {
  return Math.round(num * 10) / 10;
}

export function snapToNearestBand(value, bands) {
  return bands.reduce((closest, b) =>
    Math.abs(b - value) < Math.abs(closest - value) ? b : closest
  );
}

function normalize(str) {
  return (str || "").trim().toLowerCase();
}

function normalizeArray(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((s) => normalize(String(s)));
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}
