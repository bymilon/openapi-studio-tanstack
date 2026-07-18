import { onMount } from 'solid-js'

import { recordConversion } from './record-conversion'

const applicationBody = `Hi OpenAPI Studio,

Team and product:
Current OpenAPI workflow:
The recurring contract problem costing us time:
Would we pay $29/workspace/month if this worked? Why or why not?

Best,
`.replaceAll('\n', '\r\n')

const applicationHref = `mailto:pitechae@gmail.com?subject=${encodeURIComponent('OpenAPI Studio design-partner research')}&body=${encodeURIComponent(applicationBody)}`
const repositoryHref = 'https://github.com/bymilon/openapi-studio-tanstack'

function Mark() {
  return (
    <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <path d="M4 7h11l5 7-5 7H4l5-7-5-7Z" />
      <path d="M36 19H25l-5 7 5 7h11l-5-7 5-7Z" />
    </svg>
  )
}

export function MarketingHome() {
  onMount(() => recordConversion('page_viewed'))

  return (
    <main>
      <div class="brand-hero">
        <header class="site-header shell">
          <a class="wordmark" href="/" aria-label="OpenAPI Studio home">
            <Mark />
            <span>OpenAPI Studio</span>
          </a>
          <nav aria-label="Primary">
            <a class="nav-link" href="#workflow">
              Workflow
            </a>
            <a class="nav-link nav-evidence" href="#evidence">
              Evidence
            </a>
            <a class="button button-dark button-compact" href="/compare">
              Try comparison
            </a>
          </nav>
        </header>

        <section class="hero shell">
          <div class="hero-copy">
            <p class="eyebrow">
              <span>Design-partner research</span> Five teams
            </p>
            <h1>Catch the breaking change before your users do.</h1>
            <p class="hero-lead">
              Compare a baseline and revised OpenAPI contract for high-confidence consumer breaks.
              Files stay in your browser.
            </p>
            <div class="hero-actions">
              <a class="button button-dark" href="/compare">
                Check a contract change <span aria-hidden="true">↗</span>
              </a>
              <a class="text-link" href="#workflow">
                See the workflow <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p class="availability">
              Free public preview. No account, upload, persistence, or claim of exhaustive analysis.
            </p>
          </div>

          <figure class="contract-artifact" aria-labelledby="artifact-title">
            <div class="artifact-top">
              <div>
                <p class="artifact-kicker">Product workflow · live comparison available</p>
                <p id="artifact-title" class="artifact-title">
                  billing-api.yaml <span>PR #184</span>
                </p>
              </div>
              <span class="impact-state">Impact detected</span>
            </div>
            <div class="operation-row">
              <span class="method">GET</span>
              <code>/invoices/{'{invoiceId}'}</code>
            </div>
            <div class="diff" aria-label="Example OpenAPI contract change">
              <span>42</span>
              <code>required:</code>
              <span class="removed">43 −</span>
              <code class="removed">- dueDate</code>
              <span class="added">43 +</span>
              <code class="added">- paymentDueAt</code>
            </div>
            <div class="impact-callout">
              <span class="impact-icon">!</span>
              <div>
                <p>Breaking change</p>
                <strong>Required response field removed</strong>
              </div>
            </div>
            <div class="review-summary">
              <span>
                <b>1</b> breaking change
              </span>
              <span>
                <b>2</b> review notes
              </span>
              <strong>Needs a decision</strong>
            </div>
            <figcaption>
              Illustrative prototype. This is not a screenshot of a currently available editor.
            </figcaption>
          </figure>
        </section>
      </div>

      <section class="pain-section">
        <div class="shell pain-grid">
          <p class="section-label">The problem</p>
          <div>
            <h2>Raw YAML tells you what moved. It rarely tells you what it costs.</h2>
            <p>The painkiller is a reviewable decision, not another text editor.</p>
          </div>
        </div>
      </section>

      <section id="workflow" class="workflow-section">
        <div class="shell">
          <div class="section-intro">
            <p class="section-label">Proposed workflow</p>
            <h2>The workflow we want to validate.</h2>
          </div>
          <ol class="workflow-list">
            <li>
              <span class="step-number">01</span>
              <div>
                <h3>See the removed field</h3>
                <p>Keep dueDate beside its response path, operation, and schema context.</p>
              </div>
            </li>
            <li>
              <span class="step-number">02</span>
              <div>
                <h3>Assess the consequence</h3>
                <p>Decide whether consumers can absorb the rename to paymentDueAt.</p>
              </div>
            </li>
            <li>
              <span class="step-number">03</span>
              <div>
                <h3>Approve the new truth</h3>
                <p>Publish only after the team resolves the breaking change.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section id="evidence" class="evidence-section">
        <div class="shell evidence-grid">
          <div>
            <p class="section-label">Current build status</p>
            <h2>See what exists today and what comes next.</h2>
          </div>
          <div class="evidence-copy">
            <p>
              OpenAPI Studio now includes a browser-local comparison preview for a focused set of
              high-confidence OpenAPI changes. Exhaustive validation, editing, saved projects,
              publishing, collaboration, and billing are not implemented. No invented customers. No
              fake screenshots. No checkout.
            </p>
            <a href="/compare">
              Try the local comparison <span>↗</span>
            </a>
            <a href={repositoryHref} onClick={() => recordConversion('repository_clicked')}>
              Follow the public build <span>↗</span>
            </a>
            <a
              href={`${repositoryHref}/actions`}
              onClick={() => recordConversion('repository_clicked')}
            >
              Inspect delivery checks <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <section class="offer-section">
        <div class="shell offer-grid">
          <div>
            <p class="section-label">Five-team research cohort</p>
            <h2>Bring the contract change your team keeps paying for.</h2>
          </div>
          <div class="price">
            <span>$</span>
            <strong>29</strong>
            <p>
              price hypothesis
              <br />
              product not available yet
            </p>
          </div>
          <div class="offer-action">
            <p class="offer-trust">
              Built and run by{' '}
              <a href="https://github.com/bymilon">Milon Biswas, independent founder</a>. Email only
              the problem and workflow first. Do not upload a contract or confidential material.
              Personal reply within two business days.
            </p>
            <a
              class="button button-light"
              href={applicationHref}
              onClick={() => recordConversion('design_partner_clicked')}
            >
              Apply by email <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer class="site-footer shell">
        <div class="footer-brand">
          <Mark />
          <span>OpenAPI Studio</span>
        </div>
        <p>Contract changes, made reviewable.</p>
        <div>
          <a href={repositoryHref}>GitHub</a>
          <a href="mailto:pitechae@gmail.com">Email</a>
        </div>
      </footer>
    </main>
  )
}
