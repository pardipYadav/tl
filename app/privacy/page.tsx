import type { Metadata } from 'next';
import { LegalPageShell, LegalSection } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Divine Simparna Pvt. Ltd.',
  description:
    'Privacy Policy of Divine Simparna Pvt. Ltd. — how we collect, use, store, and protect customer information for travel and related services.'
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      subtitle="This Privacy Policy explains how Divine Simparna Pvt. Ltd. collects, uses, discloses, and safeguards personal information when you use our website, booking services, and related travel offerings."
    >
      <LegalSection title="1. Introduction">
        <p>
          Divine Simparna Pvt. Ltd. (“Company”, “we”, “us”, or “our”) is committed to protecting the privacy of our customers and website visitors. By accessing our website or
          submitting a booking enquiry, you agree to the practices described in this Privacy Policy.
        </p>
        <p>
          This policy applies to personal information collected through our website, emails, phone consultations, WhatsApp/SMS communications, and booking or enquiry forms.
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>Identity &amp; contact details:</strong> name, email address, phone number, postal address, and emergency contact details.
          </li>
          <li>
            <strong>Travel details:</strong> preferred destinations, travel dates, number of travellers, budget range, trip preferences, and special requirements (dietary, accessibility, etc.).
          </li>
          <li>
            <strong>Travel document information:</strong> passport details, visa-related information, nationality, and date of birth, where required to arrange bookings, permits, or travel services.
          </li>
          <li>
            <strong>Payment &amp; billing information:</strong> billing name, GST details (if applicable), payment confirmation references, and transaction-related records. We do not store full card details on our servers when payments are processed by third-party gateways.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type, device information, pages visited, and cookies/analytics data used to improve website performance.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <p>We use personal information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Process booking enquiries, reservations, and customer support requests.</li>
          <li>Prepare customized itineraries, quotations, and travel proposals.</li>
          <li>Coordinate with airlines, hotels, transport providers, visa agents, and other suppliers necessary to fulfill your travel arrangements.</li>
          <li>Send booking confirmations, invoices, important trip updates, and service communications.</li>
          <li>Improve our website, services, and customer experience.</li>
          <li>Comply with legal, regulatory, accounting, and tax obligations (including GST records).</li>
          <li>Send promotional offers or newsletters only where you have opted in or as otherwise permitted by law. You may unsubscribe at any time.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Sharing of Information">
        <p>
          We do not sell your personal information. We may share limited information with trusted third parties only as needed to deliver services, including:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Hotels, airlines, cruise operators, local guides, transport partners, and destination suppliers.</li>
          <li>Payment processors and banking partners for secure payment handling.</li>
          <li>Visa facilitation agents and insurance providers where requested or required.</li>
          <li>Professional advisors and authorities where legally required.</li>
        </ul>
        <p>All such parties are expected to handle information responsibly and only for the intended purpose.</p>
      </LegalSection>

      <LegalSection title="5. Data Security &amp; Retention">
        <p>
          We implement reasonable administrative, technical, and organizational measures to protect personal information against unauthorized access, loss, misuse, or alteration.
          However, no method of online transmission or storage is fully secure, and we cannot guarantee absolute security.
        </p>
        <p>
          We retain personal and booking-related information for as long as necessary to provide services, resolve disputes, enforce agreements, and meet legal/tax retention
          requirements. Information no longer needed may be securely deleted or anonymized.
        </p>
      </LegalSection>

      <LegalSection title="6. Cookies &amp; Website Analytics">
        <p>
          Our website may use cookies and similar technologies to remember preferences, analyze traffic, and improve usability. You can manage cookie settings through your browser.
          Disabling cookies may affect certain website features.
        </p>
      </LegalSection>

      <LegalSection title="7. Your Rights &amp; Choices">
        <p>Subject to applicable law, you may request to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Access the personal information we hold about you.</li>
          <li>Correct inaccurate or incomplete information.</li>
          <li>Request deletion of certain information, where legally permissible.</li>
          <li>Withdraw consent for marketing communications.</li>
        </ul>
        <p>
          To exercise these rights, contact us at{' '}
          <a href="mailto:info@divinesimparna.com" className="font-medium text-[#0B2548] underline decoration-[#C4A053]/60">
            info@divinesimparna.com
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="8. Children’s Privacy">
        <p>
          Our services are intended for adults booking travel. Where a booking includes minors, information is collected from a parent/guardian or authorized adult traveller. We do
          not knowingly collect personal data directly from children without appropriate consent.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-Party Links">
        <p>
          Our website may contain links to third-party websites or payment portals. We are not responsible for the privacy practices or content of those external sites. Please review
          their policies separately.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. The updated version will be posted on this page
          with a revised “Last updated” date.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>For privacy-related questions or requests, please contact:</p>
        <p>
          <strong>Divine Simparna Pvt. Ltd.</strong>
          <br />
          Email:{' '}
          <a href="mailto:info@divinesimparna.com" className="font-medium text-[#0B2548] underline decoration-[#C4A053]/60">
            info@divinesimparna.com
          </a>
          <br />
          GST: 06AAMCD0334P1ZF · CIN: U52291HR2025PTC136386 · PAN: AAMCD0334P
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
