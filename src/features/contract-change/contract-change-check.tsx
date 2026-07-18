import { For, Show, createSignal } from 'solid-js'

import { compareOpenApi, type ComparisonResult } from '../../core/openapi/compare'
import { ContractParseError, parseContract } from './parse-contract'

const maxFileBytes = 2 * 1024 * 1024
const allowedExtensions = ['.json', '.yaml', '.yml']

const sampleBaseline = `openapi: 3.1.0
info:
  title: Billing API
  version: 1.0.0
paths:
  /invoices/{invoiceId}:
    get:
      responses:
        "200":
          description: Invoice
          content:
            application/json:
              schema:
                type: object
                properties:
                  invoiceId:
                    type: string
                  dueDate:
                    type: string
`

const sampleRevision = sampleBaseline.replace(
  `                  dueDate:
                    type: string`,
  `                  paymentDueAt:
                    type: string`,
)

interface SelectedContract {
  name: string
  source: string
}

function errorMessage(error: unknown): string {
  return error instanceof ContractParseError || error instanceof Error
    ? error.message
    : 'The comparison could not be completed.'
}

async function readContract(file: File): Promise<SelectedContract> {
  const lowerName = file.name.toLowerCase()
  if (!allowedExtensions.some((extension) => lowerName.endsWith(extension))) {
    throw new Error('Choose a .json, .yaml, or .yml file.')
  }
  if (file.size > maxFileBytes) throw new Error('Keep each contract under 2 MB.')
  return { name: file.name, source: await file.text() }
}

export function ContractChangeCheck() {
  const [baseline, setBaseline] = createSignal<SelectedContract>()
  const [revision, setRevision] = createSignal<SelectedContract>()
  const [result, setResult] = createSignal<ComparisonResult>()
  const [error, setError] = createSignal('')

  async function selectFile(kind: 'baseline' | 'revision', file?: File) {
    if (!file) return
    setError('')
    setResult()
    try {
      const selected = await readContract(file)
      if (kind === 'baseline') setBaseline(selected)
      else setRevision(selected)
    } catch (cause) {
      setError(errorMessage(cause))
    }
  }

  function compare() {
    const base = baseline()
    const next = revision()
    setError('')
    if (!base || !next) {
      setError('Choose both a baseline and a revised contract.')
      return
    }
    try {
      setResult(compareOpenApi(parseContract(base.source), parseContract(next.source)))
    } catch (cause) {
      setResult()
      setError(errorMessage(cause))
    }
  }

  function loadSample() {
    setBaseline({ name: 'billing-api-baseline.yaml', source: sampleBaseline })
    setRevision({ name: 'billing-api-revision.yaml', source: sampleRevision })
    setError('')
    setResult()
  }

  return (
    <main class="compare-page">
      <header class="compare-header shell">
        <a class="wordmark" href="/" aria-label="OpenAPI Studio home">
          <span class="compare-mark" aria-hidden="true">
            OS
          </span>
          <span>OpenAPI Studio</span>
        </a>
        <a class="nav-link" href="/">
          Back to overview
        </a>
      </header>

      <section class="compare-intro shell">
        <p class="section-label">Public product preview</p>
        <h1>Check a contract change before your users do.</h1>
        <p>
          Compare two OpenAPI 3.x files for a focused set of high-confidence breaking changes. Your
          files stay in this browser and disappear on reload.
        </p>
      </section>

      <section class="compare-workspace shell" aria-labelledby="compare-heading">
        <div class="compare-workspace-head">
          <div>
            <p class="section-label">Local comparison</p>
            <h2 id="compare-heading">Baseline against revision</h2>
          </div>
          <button class="text-button" type="button" onClick={loadSample}>
            Load breaking-change sample
          </button>
        </div>

        <div class="file-grid">
          <label class="file-card">
            <span class="file-number">01</span>
            <strong>Baseline contract</strong>
            <span>{baseline()?.name ?? 'Choose the current contract'}</span>
            <input
              type="file"
              accept=".json,.yaml,.yml,application/json,application/yaml,text/yaml"
              onChange={(event) => void selectFile('baseline', event.currentTarget.files?.[0])}
            />
          </label>
          <label class="file-card">
            <span class="file-number">02</span>
            <strong>Revised contract</strong>
            <span>{revision()?.name ?? 'Choose the proposed contract'}</span>
            <input
              type="file"
              accept=".json,.yaml,.yml,application/json,application/yaml,text/yaml"
              onChange={(event) => void selectFile('revision', event.currentTarget.files?.[0])}
            />
          </label>
        </div>

        <div class="compare-action">
          <button class="button button-dark" type="button" onClick={compare}>
            Check contract impact
          </button>
          <p>OpenAPI 3.x · JSON or YAML · 2 MB per file · no upload</p>
        </div>

        <p class="js-note">Comparison requires JavaScript to read both files locally.</p>
        <Show when={error()}>{(message) => <p class="error-banner">{message()}</p>}</Show>

        <Show when={result()}>
          {(comparison) => (
            <section class="results" aria-live="polite" aria-labelledby="results-heading">
              <div class="result-summary">
                <div>
                  <p class="section-label">Decision</p>
                  <h2 id="results-heading">
                    {comparison().breaking.length > 0
                      ? 'Breaking change detected.'
                      : 'No supported breaking changes detected.'}
                  </h2>
                </div>
                <strong class="result-count">{comparison().breaking.length}</strong>
              </div>

              <Show when={comparison().breaking.length > 0}>
                <ol class="change-list">
                  <For each={comparison().breaking}>
                    {(item) => (
                      <li>
                        <div class="change-context">
                          <span>{item.method?.toUpperCase()}</span>
                          <code>{item.path}</code>
                        </div>
                        <strong>{item.message}</strong>
                        <code>{item.location}</code>
                      </li>
                    )}
                  </For>
                </ol>
              </Show>

              <Show when={comparison().review.length > 0}>
                <div class="review-notes">
                  <h3>Review notes</h3>
                  <For each={comparison().review}>{(item) => <p>{item.message}</p>}</For>
                </div>
              </Show>

              <p class="coverage-note">
                This preview checks a focused subset of structural changes. It does not prove full
                behavioral compatibility or resolve external references.
              </p>
            </section>
          )}
        </Show>
      </section>
    </main>
  )
}
