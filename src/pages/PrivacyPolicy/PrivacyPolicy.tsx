import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from '../../components';

const LAST_UPDATED = 'November 18, 2026';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-white pt-24">
      <div className="w-[90%] max-w-[70ch] mx-auto pb-20">
        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-neutral-500 text-sm mb-10">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-8 text-neutral-700 leading-relaxed">
          <p>
            This Privacy Policy explains what information Scissor ("Scissor", "we", "us") collects when
            you use scissor.rahmlad.com and our link-shortening service, why we collect it, and the
            choices you have.
          </p>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">1. Information we collect</h2>
            <p className="mb-2">
              <strong>Account information.</strong> When you sign up, we collect your name, email
              address, and a password, which we store only as a salted cryptographic hash &mdash; we
              never store your password in plain text. If you sign in with Google, we receive your
              name, email address, and Google account ID instead. If you enable two-factor
              authentication, we store your authenticator secret in encrypted form.
            </p>
            <p className="mb-2">
              <strong>Link data.</strong> When you create a short link, we store the destination URL,
              the short code or alias, and any optional settings you choose, such as an expiry date or
              a password (which, like your account password, is stored hashed, not in plain text).
            </p>
            <p>
              <strong>Usage data.</strong> When someone visits one of your short links, we record the
              timestamp, the referring page, the visitor's IP address and user agent, and an automated
              classification of whether the visit looks like a bot. This is used solely to show you
              analytics for your own links and to filter bot traffic out of your click counts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">2. How we use this information</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To create and secure your account, and to authenticate you when you sign in</li>
              <li>To operate the link-shortening and redirect service you ask us to provide</li>
              <li>To show you analytics about clicks on your own links</li>
              <li>To send you account-related email: verifying your address, password resets, and team invitations you send or receive</li>
              <li>To detect abuse, enforce our Terms of Service, and keep the service secure</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">3. Cookies</h2>
            <p>
              We use a single, strictly necessary session cookie to keep you signed in. It is not used
              for advertising or cross-site tracking, and we do not run any third-party analytics or
              advertising trackers on scissor.rahmlad.com.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">4. Who we share information with</h2>
            <p>
              We do not sell your personal information. We share it only with the service providers
              that help us run Scissor, and only as needed for that purpose:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li><strong>Resend</strong> &mdash; to deliver transactional emails (verification, password reset, team invites)</li>
              <li><strong>Google</strong> &mdash; only if you choose to sign in with Google</li>
              <li>
                Optionally, a geolocation lookup (MaxMind GeoLite2) to show an aggregate country
                breakdown in your analytics, if your link owner's account has this enabled
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">5. Data retention</h2>
            <p>
              We keep your account and link data for as long as your account is active. Click records
              are retained to power your analytics; if you delete a link, its click history is deleted
              with it. You can request deletion of your account and associated data at any time by
              contacting us (below).
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">6. Security</h2>
            <p>
              Passwords and link passwords are hashed with bcrypt; two-factor authentication secrets
              are encrypted at rest. Access to the dashboard and API is protected by rate limiting, and
              all traffic to scissor.rahmlad.com and api.scissor.rahmlad.com is encrypted in transit.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">7. Your rights</h2>
            <p>
              You can review and update your name, email, and password at any time from your account
              Settings. To request a copy of your data, or to request that we delete your account and
              associated data, contact us using the details below.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">8. Children's privacy</h2>
            <p>Scissor is not directed at children under 13, and we do not knowingly collect information from them.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">9. Changes to this policy</h2>
            <p>
              If we make material changes to this policy, we will update the "Last updated" date above.
              Continued use of Scissor after a change means you accept the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-neutral-900 mb-2">10. Contact us</h2>
            <p>
              Questions about this policy or your data can be sent to{' '}
              <a className="text-primary underline" href="mailto:support@rahmlad.com">
                support@rahmlad.com
              </a>
              . See also our{' '}
              <Link className="text-primary underline" to="/terms-of-service">
                Terms of Service
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

export default PrivacyPolicy;
