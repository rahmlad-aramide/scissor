import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components';

const LAST_UPDATED = 'November 18, 2026';

const TermsOfService: React.FC = () => {
  return (
    <section className="bg-white pt-24">
      <div className="w-[90%] max-w-[70ch] mx-auto pb-20">
        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
        <p className="text-neutral-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <p>
            These Terms of Service ("Terms") govern your use of Scissor at scissor.rahmlad.com
            ("Scissor", "the Service"). By creating an account or using the Service, you agree to these
            Terms. If you do not agree, please do not use Scissor.
          </p>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">1. The Service</h2>
            <p>
              Scissor lets you shorten URLs, optionally protect or expire them, generate QR codes, and
              view analytics on clicks. Some features require a registered account; some are available
              through our API with an API key, subject to the rate limits shown in your Developer
              Portal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">2. Your account</h2>
            <p>
              You're responsible for keeping your password and any API keys confidential, and for all
              activity under your account. Tell us right away at{' '}
              <a className="text-primary underline" href="mailto:support@rahmlad.com">
                support@rahmlad.com
              </a>{' '}
              if you suspect unauthorized access. You must provide accurate information when you
              register and keep it up to date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">3. Acceptable use</h2>
            <p className="mb-2">You agree not to use Scissor to create or distribute links that:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Point to malware, phishing pages, or other content designed to harm or deceive visitors</li>
              <li>Are illegal, or that infringe someone else's intellectual property or other rights</li>
              <li>Are used to send spam or facilitate unsolicited bulk messaging</li>
              <li>Attempt to circumvent rate limits, probe for vulnerabilities, or disrupt the Service for other users</li>
            </ul>
            <p className="mt-2">
              You are solely responsible for the destination content behind any link you shorten. We
              reserve the right to disable any short link, and to suspend or terminate accounts, that
              violate this section.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">4. Your content</h2>
            <p>
              You retain ownership of the URLs, QR codes, and other content you create with Scissor. By
              using the Service you grant us the limited right to store and process that content solely
              to operate the Service &mdash; for example, to redirect visitors and show you analytics.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">5. API usage</h2>
            <p>
              If you use the Scissor API, you agree to stay within the rate limits shown in your
              Developer Portal and to keep your API keys secret. We may revoke keys that are abused or
              exposed publicly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">6. Service availability</h2>
            <p>
              We work to keep Scissor available and reliable, but the Service is provided "as is"
              without warranties of any kind, and we don't guarantee uninterrupted or error-free
              operation. We may modify or discontinue features with reasonable notice where practical.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">7. Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, Scissor and its operators are not liable for any
              indirect, incidental, or consequential damages arising from your use of the Service,
              including loss of data, revenue, or business arising from links you create or content you
              link to.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">8. Termination</h2>
            <p>
              You may stop using Scissor and request account deletion at any time. We may suspend or
              terminate accounts that violate these Terms, including the acceptable-use rules above.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">9. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we'll update
              the "Last updated" date above. Continuing to use Scissor after a change means you accept
              the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">10. Contact us</h2>
            <p>
              Questions about these Terms can be sent to{' '}
              <a className="text-primary underline" href="mailto:support@rahmlad.com">
                support@rahmlad.com
              </a>
              . See also our{' '}
              <Link className="text-primary underline" to="/privacy-policy">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default TermsOfService;
