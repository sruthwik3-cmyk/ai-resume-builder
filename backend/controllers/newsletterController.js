import Subscriber from '../models/Subscriber.js';

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
export const subscribeToNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email' });
  }

  try {
    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: 'You are already subscribed!' });
    }

    // Create new subscriber
    await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to the newsletter!',
    });
  } catch (error) {
    console.error('Newsletter Error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
