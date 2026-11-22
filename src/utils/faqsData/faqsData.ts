export const faqsData = [
  {
    que: 'How does URL shortening work?',
    ans: 'You paste a long URL into Scissor and we generate a short link that redirects visitors to the original address. When someone visits the short link, our server looks it up and forwards them to your destination instantly.',
  },
  {
    que: 'Is it necessary to create an account to use the URL shortening service?',
    ans: "Yes. Creating a free account lets us keep your links tied to you so you can view, edit, and track them later, and lets you use password protection, expiry dates, QR codes, and analytics.",
  },
  {
    que: 'Are the shortened links permanent? Will they expire?',
    ans: "By default your links don't expire. You can optionally set an expiry date, or an active-from/active-until window, when you create or edit a link, and the link will stop redirecting once that time passes.",
  },
  {
    que: 'Are there any limitations on the number of URLs I can shorten?',
    ans: 'There is no hard limit on how many links you can create. Shortening is rate-limited to protect the service from abuse, which in normal use you will never notice.',
  },
  {
    que: 'Can I customize the shortened URLs to reflect my brand or content?',
    ans: 'Yes, you can choose a custom alias instead of a randomly generated code when you create a link, as long as it is not already taken.',
  },
  {
    que: 'Can I track the performance of my shortened URLs?',
    ans: 'Yes. Every link comes with built-in analytics: total clicks, human vs. bot traffic, and click trends over time, all visible from your dashboard.',
  },
  {
    que: 'How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?',
    ans: 'Passwords are hashed, not stored in plain text, and you can password-protect any individual link. Click traffic is automatically classified to filter out bots, and sign-in supports optional two-factor authentication.',
  },
  {
    que: 'What is a QR code and what can it do?',
    ans: 'A QR code is a scannable image that encodes your short link. Scan it with any phone camera to open the link instantly, no typing required. Scissor generates a QR code for every link you create.',
  },
  {
    que: 'Is there an API available for integrating the URL shortening service into my own applications or websites?',
    ans: 'Yes. From the Developer Portal you can generate an API key and create or list links programmatically, subject to a rate limit shown in your dashboard.',
  },
];
