import type { Metadata } from 'next';
import { LegalPageShell, LegalSection } from '@/components/LegalPageShell';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Divine Simparna Pvt. Ltd.',
  description:
    'Terms & Conditions for booking travel services with Divine Simparna Pvt. Ltd., including payments, cancellations, refunds, liabilities, and travel documents.'
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPageShell
      title="Terms & Conditions"
      subtitle="These Terms & Conditions govern the use of our website and the booking of travel packages and related services offered by Divine Simparna Pvt. Ltd."
    >
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By accessing our website, requesting a quotation, or confirming a booking with Divine Simparna Pvt. Ltd. (“Company”, “we”, “us”), you (“Customer”, “you”) agree to be bound
          by these Terms &amp; Conditions. If you do not agree, please do not use our services.
        </p>
        <p>
          These terms apply to domestic and international tour packages, customized itineraries, logistics-related travel coordination, and any ancillary services arranged through
          us.
        </p>
      </LegalSection>

      <LegalSection title="2. Company Information">
        <p>
          <strong>Divine Simparna Pvt. Ltd.</strong>
          <br />
          GST: 06AAMCD0334P1ZF
          <br />
          CIN: U52291HR2025PTC136386
          <br />
          PAN: AAMCD0334P
          <br />
          Email:{' '}
          <a href="mailto:info@divinesimparna.com" className="font-medium text-[#0B2548] underline decoration-[#C4A053]/60">
            info@divinesimparna.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="3. Services Offered">
        <p>
          We provide curated travel packages and related arrangements that may include transportation, accommodation, sightseeing, transfers, visa assistance guidance, and other
          travel logistics. Exact inclusions and exclusions are specified in your quotation, invoice, or confirmation. Services not listed as inclusions are not part of the package
          price.
        </p>
      </LegalSection>

      <LegalSection title="4. Booking Process">
        <ul className="list-disc space-y-2 pl-5">
          <li>A booking request may be submitted via our website form, email, phone, or authorized representatives.</li>
          <li>Submission of a form does not automatically confirm a booking until payment terms are met and a written confirmation is issued by us.</li>
          <li>You confirm that all information provided (names, dates, traveller counts, contact details, passport particulars) is accurate and complete.</li>
          <li>Name changes after booking may attract supplier penalties and are subject to airline/hotel policies.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Payments">
        <ul className="list-disc space-y-2 pl-5">
          <li>Prices are generally quoted in Indian Rupees (INR) unless otherwise stated, and may be exclusive of applicable taxes/GST unless mentioned.</li>
          <li>An advance deposit may be required to secure reservations. Final payment timelines will be shared in your quotation or invoice.</li>
          <li>Accepted payment methods may include bank transfer, UPI, cards, or other approved methods notified by us.</li>
          <li>Bookings remain provisional until the required payment is received and confirmed by the Company.</li>
          <li>For international packages, prices may change due to currency fluctuations, fuel surcharges, government taxes, or supplier rate revisions until fully paid and ticketed.</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Cancellations by the Customer">
        <p>
          Cancellation requests must be made in writing (email to{' '}
          <a href="mailto:info@divinesimparna.com" className="font-medium text-[#0B2548] underline decoration-[#C4A053]/60">
            info@divinesimparna.com
          </a>
          ). Cancellation charges depend on the destination, season, supplier rules, and how close the cancellation is to the travel date.
        </p>
        <p>Unless a specific package states otherwise, the following indicative structure may apply:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong>More than 45 days before departure:</strong> administrative fee plus supplier-non-refundable advances (if any).
          </li>
          <li>
            <strong>30–45 days before departure:</strong> up to 50% of the package cost (or higher if suppliers impose greater penalties).
          </li>
          <li>
            <strong>15–29 days before departure:</strong> up to 75% of the package cost.
          </li>
          <li>
            <strong>Less than 15 days / no-show:</strong> up to 100% of the package cost.
          </li>
        </ul>
        <p>
          Airline tickets, special fare components, festival-period bookings, cruise cabins, and peak-season hotel reservations are often non-refundable. Exact cancellation terms for
          your trip will be confirmed in writing at booking.
        </p>
      </LegalSection>

      <LegalSection title="7. Cancellations or Changes by the Company">
        <p>
          We reserve the right to cancel or modify itineraries due to force majeure, political unrest, natural disasters, epidemics, strikes, supplier failure, insufficient group
          size (for group departures), or circumstances beyond our reasonable control. In such cases, we will endeavour to offer an alternative date/package or a refund of recoverable
          amounts after deducting non-refundable supplier costs and reasonable administrative expenses.
        </p>
      </LegalSection>

      <LegalSection title="8. Refunds">
        <ul className="list-disc space-y-2 pl-5">
          <li>Approved refunds are processed only after recovery of amounts from respective suppliers (hotels/airlines/etc.).</li>
          <li>Refund timelines typically range from 15–45 working days depending on banking and supplier cycles.</li>
          <li>Refunds are usually made to the original payment source/account. Convenience fees, gateway charges, or bank fees may be non-refundable.</li>
          <li>No refund is applicable for unused services once the trip has commenced (including unused meals, sightseeing, rooms, or transfers).</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Amendments &amp; Itinerary Changes">
        <p>
          Date changes, room upgrades, add-ons, or itinerary modifications after confirmation are subject to availability and may incur additional charges. Sightseeing order and
          timings may change due to weather, traffic, local holidays, or operational reasons without altering the overall inclusions.
        </p>
      </LegalSection>

      <LegalSection title="10. Travel Documents, Visas &amp; Insurance">
        <ul className="list-disc space-y-2 pl-5">
          <li>Customers are solely responsible for ensuring valid passports, visas, permits, vaccinations, and other entry requirements for all destinations and transit points.</li>
          <li>We may provide guidance or assistance on visa processes, but visa approval remains at the discretion of the relevant embassy/consulate. Visa rejection does not automatically entitle a full refund of tour costs.</li>
          <li>Passports should typically remain valid for at least 6 months from the return date (or as required by the destination).</li>
          <li>Travel insurance is strongly recommended and may be mandatory for certain destinations. Customers should purchase suitable insurance covering medical emergencies, trip cancellation, loss of baggage, and related risks.</li>
        </ul>
      </LegalSection>

      <LegalSection title="11. Customer Responsibilities">
        <ul className="list-disc space-y-2 pl-5">
          <li>Arrive on time for transfers, flights, and scheduled activities. Missed services due to late arrival are non-refundable.</li>
          <li>Comply with destination laws, hotel rules, and airline regulations.</li>
          <li>Inform us of medical conditions, accessibility needs, or special requests at the time of booking.</li>
          <li>Safeguard personal belongings, travel documents, and valuables throughout the journey.</li>
        </ul>
      </LegalSection>

      <LegalSection title="12. Liability &amp; Limitations">
        <p>
          Divine Simparna Pvt. Ltd. acts as a travel organizer/facilitator and carefully selects third-party suppliers. While we take reasonable care in planning, we are not liable for:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Acts, omissions, delays, or defaults of airlines, hotels, transporters, or other independent suppliers.</li>
          <li>Flight delays/cancellations, lost baggage, accidents, injury, illness, or loss of property beyond our direct control.</li>
          <li>Changes arising from weather, natural disasters, political events, pandemics, strikes, or force majeure.</li>
          <li>Indirect, incidental, or consequential losses, including loss of enjoyment or opportunity.</li>
        </ul>
        <p>
          Our aggregate liability, if any, arising from a booking shall not exceed the total amount paid by the customer to the Company for the specific package or service in dispute,
          excluding non-refundable third-party costs already remitted to suppliers.
        </p>
      </LegalSection>

      <LegalSection title="13. Pricing Accuracy &amp; Website Content">
        <p>
          We endeavour to keep package descriptions, prices, and availability accurate. Occasional errors or outdated information may occur. We reserve the right to correct errors
          and to reconfirm pricing before final acceptance of a booking.
        </p>
      </LegalSection>

      <LegalSection title="14. Intellectual Property">
        <p>
          All website content, branding, logos, text, photography layouts, and materials belonging to Divine Simparna Pvt. Ltd. are protected by applicable intellectual property laws.
          Unauthorized reproduction or commercial use is prohibited.
        </p>
      </LegalSection>

      <LegalSection title="15. Governing Law &amp; Dispute Resolution">
        <p>
          These Terms &amp; Conditions are governed by the laws of India. Any dispute arising out of or in connection with our services shall first be attempted to be resolved
          amicably. Subject to that, courts having competent jurisdiction in Haryana, India, shall have exclusive jurisdiction, unless otherwise required by applicable law.
        </p>
      </LegalSection>

      <LegalSection title="16. Changes to Terms">
        <p>
          We may revise these Terms &amp; Conditions at any time by updating this page. Continued use of our website or services after updates constitutes acceptance of the revised
          terms for future bookings.
        </p>
      </LegalSection>

      <LegalSection title="17. Contact">
        <p>
          For questions about these Terms &amp; Conditions, bookings, cancellations, or refunds, please email{' '}
          <a href="mailto:info@divinesimparna.com" className="font-medium text-[#0B2548] underline decoration-[#C4A053]/60">
            info@divinesimparna.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
