const EFFECTIVE_DATE = "April 15, 2026";
const LAST_UPDATED = "April 15, 2026";
const DMCA_EMAIL = "admin@ytvidhub.com";

export default function DmcaPolicyPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-page)] text-[var(--text-secondary)]">
      <main className="article-shell article-body pb-16 md:pb-24">
        <header className="article-hero">
          <p className="article-kicker">Legal Documentation</p>
          <h1 className="article-h1">DMCA Policy</h1>
          <p className="max-w-2xl">
            This page explains how YTVidHub handles copyright complaints related to
            subtitle and transcript content processed through our tools.
          </p>
          <p className="mt-4 text-sm text-[var(--text-muted)]">
            Effective Date: {EFFECTIVE_DATE} | Last Updated: {LAST_UPDATED}
          </p>
        </header>

        <section className="article-section">
          <h2 className="article-h2">1. Scope of This Policy</h2>
          <p>
            YTVidHub provides tools for extracting and formatting publicly available
            subtitle/transcript text from YouTube links (including single-video and
            playlist workflows). Output formats may include SRT, VTT, TXT, and JSON.
          </p>
          <p className="mt-4">
            This DMCA Policy applies to copyright complaints about content accessed,
            processed, or displayed through YTVidHub.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">2. What We Process</h2>
          <p>
            Our service focuses on subtitle/transcript data processing. We do not claim
            ownership of creator content, and users are responsible for ensuring they have
            rights or lawful basis to use any content they request through the platform.
          </p>
          <p className="mt-4">
            If you are a copyright owner (or authorized representative) and believe your
            rights are being infringed through YTVidHub, please submit a DMCA notice.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">3. How to Submit a DMCA Notice</h2>
          <div className="article-card p-6 md:p-8">
            <p className="mb-3 text-sm font-semibold text-[var(--brand-600)]">
              DMCA Contact
            </p>
            <p>
              Email:{" "}
              <a
                className="text-[var(--brand-600)] hover:text-[var(--brand-700)] underline"
                href={`mailto:${DMCA_EMAIL}`}
              >
                {DMCA_EMAIL}
              </a>
            </p>
            <p className="mt-3 text-sm text-[var(--text-muted)]">
              Use subject line: <strong>DMCA Takedown Notice</strong>
            </p>
          </div>

          <p className="mt-5">
            To be actionable, your notice should include information required by 17 U.S.C.
            Section 512(c)(3):
          </p>
          <ul className="mt-4 space-y-3 list-disc pl-6">
            <li>Physical or electronic signature of the rights owner/authorized agent.</li>
            <li>Description of the copyrighted work claimed to be infringed.</li>
            <li>
              Precise location of the allegedly infringing material (for example exact
              YTVidHub URL, tool page, and relevant video/playlist URL).
            </li>
            <li>Your full contact details (name, address, phone, email).</li>
            <li>
              A good-faith statement that the disputed use is not authorized by law or by
              the rights owner.
            </li>
            <li>
              A perjury statement that the notice is accurate and that you are authorized
              to act.
            </li>
          </ul>
        </section>

        <section className="article-section">
          <h2 className="article-h2">4. Our Takedown Process</h2>
          <p>When we receive a complete and valid notice, we may take actions such as:</p>
          <ul className="mt-4 space-y-3 list-disc pl-6">
            <li>Removing or disabling access to identified material or outputs.</li>
            <li>Blocking repeated processing of specifically identified content.</li>
            <li>
              Notifying the affected user account when contact and context are available.
            </li>
            <li>Keeping internal records of notices and actions for compliance.</li>
          </ul>
          <p className="mt-4">
            Incomplete notices may require follow-up before action can be taken.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">5. Counter-Notice</h2>
          <p>
            If your content or access was affected by mistake or misidentification, you
            may submit a counter-notice under 17 U.S.C. Section 512(g)(3). Your
            counter-notice should include signature, identification of removed material,
            good-faith statement, contact details, and required jurisdiction/acceptance of
            service language.
          </p>
          <p className="mt-4">
            After receiving a valid counter-notice, we may restore material as allowed by
            DMCA timelines unless we receive notice of court action.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">6. Repeat Infringer Policy</h2>
          <p>
            We may suspend or terminate accounts that repeatedly trigger valid copyright
            complaints. We evaluate repeat-infringer status based on notice history,
            severity, and response behavior.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">7. Misrepresentation</h2>
          <p>
            Submitting knowingly false DMCA notices or counter-notices may create legal
            liability. Please provide accurate and complete information.
          </p>
        </section>

        <section className="article-section">
          <h2 className="article-h2">8. Policy Updates</h2>
          <p>
            We may update this page as our product, legal requirements, or enforcement
            process evolves. Changes take effect when posted with an updated date.
          </p>
        </section>

        <section className="article-section">
          <div className="article-card border-[var(--brand-100)] bg-[var(--brand-50)] p-6 md:p-8">
            <h2 className="article-h2 mb-3">Contact for DMCA</h2>
            <p>
              DMCA notices and counter-notices should be sent to{" "}
              <a
                className="text-[var(--brand-600)] hover:text-[var(--brand-700)] underline"
                href={`mailto:${DMCA_EMAIL}`}
              >
                {DMCA_EMAIL}
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
