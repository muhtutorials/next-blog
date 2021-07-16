import { useState, useEffect } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendData(data) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const returnedData = await response.json();

  if (!response.ok) {
    throw new Error(returnedData.message || 'Something went wrong.')
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('');
        setRequestError('');
      }, 3000)

      return () => clearTimeout(timer);
    }
  }, [requestStatus])

  async function sendMessageHandler(e) {
    e.preventDefault();

    setRequestStatus('pending');

    try {
      await sendData({ email, name, message });

      setRequestStatus('success');
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      setRequestStatus('error');
      setRequestError(error.message);
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is in its way'
    }
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error',
      message: requestError
    }
  }

  return (
    <section className={classes.contact} onSubmit={sendMessageHandler}>
      <h1>How can I help you?</h1>

      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input
              type='email'
              id='email'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='text'
              id='name'
              required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea
            id='message'
            rows='5'
            required
            value={message}
            onChange={e => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {
        notification &&
          <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
          />
      }
    </section>
  );
}