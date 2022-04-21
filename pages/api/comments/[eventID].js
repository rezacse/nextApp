import dbHelper from '../dbHelper';

function getPostData(body, eventID) {
  return {
    email: body.email,
    name: body.name,
    comment: body.comment,
    eventId: eventID
  };
}

const handler = async (req, res) => {
  const eventID = req.query.eventID;

  if (req.method === 'POST') {
    let newComment = getPostData(req.body, eventID);
    try {
      const result = await dbHelper.add('comments', newComment);
      newComment = { ...newComment, id: result.insertedId };
    } catch (error) {
      res.status(500).json({ message: 'Something wrong at server end!' });
      return;
    }
    res.status(201).json({ message: 'Comment Added', comment: newComment });
  }

  if (req.method === 'GET') {
    try {
      const comments = await dbHelper.gets('comments', { _id: -1 });
      res.status(200).json({ message: 'OK', comments: comments });
    } catch (error) {
      res.status(500).json({ message: 'Something wrong at server end!' });
      return;
    }
  }
};

export default handler;
