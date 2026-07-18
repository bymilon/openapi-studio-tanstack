import { onMount } from 'solid-js'

import { recordConversion } from './record-conversion'

const applicationBody = `Hi OpenAPI Studio,

Team and product:
Current OpenAPI workflow:
The recurring problem costing us time:
Typical specification size:
Would we pay $29/workspace/month if this worked? Why or why not?

Best,
`.replaceAll('\n', '\r\n')

const applicationHref = `mailto:pitechae@gmail.com?subject=${encodeURIComponent('OpenAPI Studio design partner')}&body=${encodeURIComponent(applicationBody)}`

const repositoryHref = 'https://github.com/bymilon/openapi-studio-tanstack'

export function MarketingHome() {
  onMount(() => recordConversion('page_viewed'))

  return (
    <main>
      <header class="site-header mx-auto flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a class="wordmark" href="/" aria-label="OpenAPI Studio home">
          <span class="wordmark-mark" aria-hidden="true">
            {'{ }'}
          </span>
          OpenAPI Studio
        </a>
        <nav aria-label="Primary" class="flex items-center gap-3 sm:gap-5">
          <a class="nav-link hidden sm:inline-flex" href="#evidence">
            Evidence
          </a>
          <a
            class="button button-primary button-compact"
            href={applicationHref}
            onClick={() => recordConversion('design_partner_clicked')}
          >
            Join the pilot
          </a>
        </nav>
      </header>

      <section class="hero mx-auto grid w-full max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(30rem,1.12fr)] lg:items-center">
        <div class="hero-copy">
          <p class="status-line">
            <span class="status-dot" aria-hidden="true" /> Five-team design-partner pilot
          </p>
          <h1>Know exactly what changed in your API contract.</h1>
          <p class="hero-lead">
            OpenAPI Studio is being shaped with small API teams that need a clearer path from a
            contract edit to review and published documentation—without adopting a heavyweight API
            platform.
          </p>
          <div class="hero-actions">
            <a
              class="button button-primary"
              href={applicationHref}
              onClick={() => recordConversion('design_partner_clicked')}
            >
              Apply to become a design partner
            </a>
            <a class="text-link" href="#workflow">
              See the proposed workflow <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p class="availability">
            Free pilot · $29/workspace/month if it earns a place in your workflow
          </p>
        </div>

        <figure class="contract-artifact" aria-labelledby="artifact-title">
          <div class="artifact-bar">
            <div>
              <p id="artifact-title" class="artifact-title">
                Sample contract review
              </p>
              <p class="artifact-file">openapi.yaml · customers</p>
            </div>
            <span class="artifact-state">
              <span class="status-dot" aria-hidden="true" /> Valid
            </span>
          </div>

          <div class="operation-row">
            <span class="method">PATCH</span>
            <code>/customers/{'{customerId}'}</code>
            <span class="operation-label">Update customer</span>
          </div>

          <div class="diff" aria-label="Example OpenAPI contract change">
            <div class="diff-gutter" aria-hidden="true">
              18
            </div>
            <code>required:</code>
            <div class="diff-gutter diff-remove" aria-hidden="true">
              19 −
            </div>
            <code class="diff-remove">- email</code>
            <div class="diff-gutter diff-add" aria-hidden="true">
              19 +
            </div>
            <code class="diff-add">- emailAddress</code>
            <div class="diff-gutter diff-add" aria-hidden="true">
              20 +
            </div>
            <code class="diff-add">minLength: 1</code>
          </div>

          <div class="review-summary">
            <div>
              <span class="review-value">0</span>
              <span class="review-label">validation errors</span>
            </div>
            <div>
              <span class="review-value">2</span>
              <span class="review-label">reviewable changes</span>
            </div>
            <span class="review-ready">Ready for review</span>
          </div>

          <figcaption>
            Illustrative sample of the pilot direction—not a screenshot of a currently available
            editor.
          </figcaption>
        </figure>
      </section>

      <section id="workflow" class="workflow-section" aria-labelledby="workflow-heading">
        <div class="mx-auto grid w-full max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p class="section-context">The workflow under test</p>
            <h2 id="workflow-heading">One contract. Three decisions that stay connected.</h2>
          </div>
          <ol class="workflow-list">
            <li>
              <div class="workflow-heading">
                <span>Edit</span>
                <span class="workflow-state">Contract structure</span>
              </div>
              <p>Work with JSON or YAML without hiding the underlying OpenAPI 3.0/3.1 document.</p>
            </li>
            <li>
              <div class="workflow-heading">
                <span>Review</span>
                <span class="workflow-state">Meaningful change</span>
              </div>
              <p>
                Put validation and contract consequences beside the change a teammate must approve.
              </p>
            </li>
            <li>
              <div class="workflow-heading">
                <span>Publish</span>
                <span class="workflow-state">Shared truth</span>
              </div>
              <p>
                Derive documentation from the same canonical contract after the team accepts it.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section id="evidence" class="evidence-section" aria-labelledby="evidence-heading">
        <div class="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div class="evidence-intro">
            <p class="section-context">Evidence before claims</p>
            <h2 id="evidence-heading">Clear about what exists—and what does not.</h2>
            <p>
              Enterprise trust starts with accurate boundaries. This is an early design-partner
              program backed by public delivery work, not a finished self-serve product.
            </p>
          </div>
          <div class="evidence-columns">
            <div>
              <h3>Available to inspect today</h3>
              <ul class="evidence-list evidence-list-positive">
                <li>Public source and implementation history</li>
                <li>Passing automated delivery and accessibility checks</li>
                <li>Explicit OpenAPI 3.0 and 3.1 product scope</li>
                <li>Identifier-free first-party conversion events</li>
              </ul>
              <a
                class="text-link evidence-link"
                href={repositoryHref}
                onClick={() => recordConversion('repository_clicked')}
              >
                View source on GitHub <span aria-hidden="true">↗</span>
              </a>
              <a
                class="text-link evidence-link evidence-link-secondary"
                href="https://github.com/bymilon/openapi-studio-tanstack/actions"
                onClick={() => recordConversion('repository_clicked')}
              >
                View delivery checks <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div>
              <h3>Not being implied</h3>
              <ul class="evidence-list">
                <li>No production editor access yet</li>
                <li>No fabricated customers or testimonials</li>
                <li>No checkout, billing, or surprise charge</li>
                <li>No promise that every team is a fit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="offer-section" aria-labelledby="offer-heading">
        <div class="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p class="section-context">Founding offer</p>
            <h2 id="offer-heading">Five teams. A free pilot. Then $29 only if it works.</h2>
            <p class="offer-copy">
              Bring one real contract and one repeated workflow problem. We will confirm fit by
              email, schedule a focused conversation, and tell you plainly what the pilot can and
              cannot solve. This is founder-led; expect a personal reply from the builder within two
              business days.
            </p>
          </div>
          <div class="offer-action">
            <a
              class="button button-primary"
              href={applicationHref}
              onClick={() => recordConversion('design_partner_clicked')}
            >
              Apply for a pilot place
            </a>
            <p>
              No checkout. No fake instant access. Do not email a contract or confidential material
              before fit is confirmed.
            </p>
          </div>
        </div>
      </section>

      <footer class="site-footer mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>OpenAPI Studio · Built in public for teams that depend on the contract.</p>
        <div class="flex flex-wrap gap-x-6 gap-y-2">
          <a href={repositoryHref}>GitHub</a>
          <a href="mailto:pitechae@gmail.com">pitechae@gmail.com</a>
        </div>
      </footer>
    </main>
  )
}
