import path from 'path';
import fs from 'fs';

function getPostData(body) {
  return {
    id: new Date().toISOString(),
    email: body.email,
    text: body.text
  };
}

function fetFeedbacks() {
  const filePath = getFilePath();
  const data = fs.readFileAsync(filePath);
  return JSON.parse(data);
}

function getFilePath() {
  return path.join(process.cwd(), 'data', 'feedback.json');
}

function addFeedback(newFeedback) {
  const feedbacks = getFilePath();
  feedbacks.push(newFeedback);
  fs.writeFileSync(filePath, feedbacks);
}

function handler(req, res) {
  if (req.method === 'POST') {
    const newFeedback = getPostData(req.body);
    addFeedback(newFeedback);
    res.status(201).json({ message: 'Feedback Added' });
  } else {
    const feedbacks = fetFeedbacks();
    res.status(200).json({ message: 'OK', feedbacks: feedbacks });
  }
}

export default handler;
