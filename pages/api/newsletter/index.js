import dbHelper from '../dbHelper';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const email = req.body.email;
    if (!email || !email.includes('@')) {
      res.status(400).json({ message: 'Invalid Email' });
      return;
    }

    try {
      const document = { email: email };
      const result = await dbHelper.add('newsletters', document);
      res.status(201).json({ message: 'Subscribed', id: result.insertedId });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Something wrong at server end!' });
      return;
    }
  }
};

export default handler;
