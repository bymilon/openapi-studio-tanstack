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

export function MarketingHome() {
  onMount(() => recordConversion('page_viewed'))

  return (
    <main>
      <header class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <a
          class="font-mono text-sm font-bold tracking-[-0.04em]"
          href="/"
          aria-label="OpenAPI Studio home"
        >
          OPENAPI/STUDIO
        </a>
        <span class="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.68rem] tracking-[0.12em] uppercase">
          Design-partner pilot
        </span>
      </header>

      <section class="mx-auto grid min-h-[calc(100vh-5.5rem)] w-full max-w-6xl content-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_19rem] lg:items-end lg:py-24">
        <div>
          <p class="mb-6 font-mono text-xs font-bold tracking-[0.16em] text-moss uppercase">
            For small teams maintaining OpenAPI 3.0 and 3.1
          </p>
          <h1 class="max-w-[12ch] text-[clamp(3.4rem,9vw,7.8rem)] leading-[0.86] font-semibold tracking-[-0.075em] text-balance">
            Your API contract should not feel like a live grenade.
          </h1>
        </div>
        <div class="border-t border-ink/25 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-7">
          <p class="text-lg leading-8 text-ink/75">
            Edit, review, and publish OpenAPI contracts without YAML mistakes, silent breakage, or
            documentation drift.
          </p>
          <div class="mt-8 flex flex-col gap-3">
            <a
              class="group flex items-center justify-between rounded-sm bg-accent px-5 py-4 font-bold text-white outline-offset-4 hover:bg-[#963522] focus-visible:outline-2 focus-visible:outline-moss"
              href={applicationHref}
              onClick={() => recordConversion('design_partner_clicked')}
            >
              Apply to become a design partner
              <span class="cta-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <a
              class="group flex items-center justify-between rounded-sm border border-ink/30 px-5 py-4 font-bold outline-offset-4 hover:bg-white/35 focus-visible:outline-2 focus-visible:outline-moss"
              href="https://github.com/bymilon/openapi-studio-tanstack"
              onClick={() => recordConversion('repository_clicked')}
            >
              View source on GitHub
              <span class="cta-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
          <p class="mt-4 text-sm leading-6 text-ink/75">
            No checkout. No fake instant access. We start with a direct conversation.
          </p>
        </div>
      </section>

      <section class="border-y border-ink/20 bg-white/30" aria-labelledby="problem-heading">
        <div class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28">
          <div class="grid gap-8 lg:grid-cols-2">
            <h2
              id="problem-heading"
              class="max-w-[12ch] text-4xl leading-tight font-semibold tracking-[-0.045em] sm:text-6xl"
            >
              The contract is critical. The workflow around it is brittle.
            </h2>
            <p class="max-w-xl text-lg leading-8 text-ink/70 lg:pt-2">
              OpenAPI is supposed to align engineering, product, customers, and tooling. In
              practice, teams review raw diffs, repair indentation, and discover stale documentation
              after the API has already moved.
            </p>
          </div>
          <ol class="mt-16 grid border-t border-ink/20 sm:grid-cols-3">
            {[
              [
                '01',
                'Editing is fragile',
                'One malformed change can invalidate the document or quietly alter its meaning.',
              ],
              [
                '02',
                'Reviews lack context',
                'Text diffs hide the endpoint, schema, and compatibility consequences reviewers actually need.',
              ],
              [
                '03',
                'Published docs drift',
                'When editing and publishing are separate chores, consumers stop trusting the contract.',
              ],
            ].map(([number, title, description]) => (
              <li class="border-b border-ink/20 py-8 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                <span class="font-mono text-xs text-accent">{number}</span>
                <h3 class="mt-8 text-xl font-bold tracking-[-0.025em]">{title}</h3>
                <p class="mt-3 leading-7 text-ink/65">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        class="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 lg:py-28"
        aria-labelledby="workflow-heading"
      >
        <p class="font-mono text-xs font-bold tracking-[0.16em] text-moss uppercase">
          What we are building with design partners
        </p>
        <h2
          id="workflow-heading"
          class="mt-5 max-w-3xl text-4xl leading-tight font-semibold tracking-[-0.045em] sm:text-6xl"
        >
          One dependable path from contract change to published truth.
        </h2>
        <div class="mt-14 grid gap-4 md:grid-cols-3">
          {[
            [
              'Import',
              'Bring a real JSON or YAML contract in without flattening its OpenAPI semantics.',
            ],
            [
              'Review',
              'Understand validation issues and meaningful changes before they reach consumers.',
            ],
            [
              'Publish',
              'Generate documentation from the same canonical contract the team approved.',
            ],
          ].map(([title, description], index) => (
            <article class="min-h-64 rounded-sm bg-moss p-7 text-paper">
              <span class="font-mono text-xs text-paper/75">0{index + 1}</span>
              <h3 class="mt-16 text-3xl font-semibold tracking-[-0.04em]">{title}</h3>
              <p class="mt-4 leading-7 text-paper/85">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section class="bg-accent text-white" aria-labelledby="offer-heading">
        <div class="mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_22rem] lg:items-end lg:py-28">
          <div>
            <p class="font-mono text-xs font-bold tracking-[0.16em] uppercase">
              The design-partner offer
            </p>
            <h2
              id="offer-heading"
              class="mt-5 max-w-[13ch] text-4xl leading-tight font-semibold tracking-[-0.05em] sm:text-6xl"
            >
              Help shape the workflow before we scale the feature list.
            </h2>
            <p class="mt-7 max-w-2xl text-lg leading-8 text-white/95">
              Bring a real contract and the recurring problem around it. We will work directly with
              a small group of teams, prioritize repeated pain, and be explicit about what is not
              built yet.
            </p>
          </div>
          <div class="border-t border-white/35 pt-7">
            <p class="font-mono text-xs tracking-[0.14em] uppercase">
              Price hypothesis after pilot
            </p>
            <p class="mt-3 text-5xl font-semibold tracking-[-0.06em]">$29</p>
            <p class="mt-1 text-white/95">per workspace / month</p>
            <p class="mt-4 text-sm leading-6 text-white/95">
              Pilot scope and terms are confirmed in conversation. There is no charge today.
            </p>
            <a
              class="mt-8 flex items-center justify-between rounded-sm bg-ink px-5 py-4 font-bold text-paper outline-offset-4 hover:bg-moss focus-visible:outline-2 focus-visible:outline-white"
              href={applicationHref}
              onClick={() => recordConversion('design_partner_clicked')}
            >
              Start the conversation
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      <footer class="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-ink/65 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>OpenAPI Studio · Built in public for teams who depend on the contract.</p>
        <a class="underline hover:text-ink" href="mailto:pitechae@gmail.com">
          pitechae@gmail.com
        </a>
      </footer>
    </main>
  )
}
