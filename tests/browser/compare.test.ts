import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('turns two local sample contracts into a breaking-change decision', async ({ page }) => {
  await page.goto('/compare')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Check a contract change before your users do.' }),
  ).toBeVisible()
  await expect(page.getByText('Your files stay in this browser')).toBeVisible()

  await page.getByRole('button', { name: 'Load breaking-change sample' }).click()
  await page.getByRole('button', { name: 'Check contract impact' }).click()

  await expect(page.getByRole('heading', { name: 'Breaking change detected.' })).toBeVisible()
  await expect(page.getByText('Response property "dueDate" was removed.')).toBeVisible()
  await expect(page.getByText('This preview checks a focused subset')).toBeVisible()
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])
})

test('rejects malformed and oversized contract inputs', async ({ page }) => {
  await page.goto('/compare')
  const inputs = page.locator('input[type="file"]')

  await inputs.nth(0).setInputFiles({
    name: 'baseline.yaml',
    mimeType: 'text/yaml',
    buffer: Buffer.from('openapi: ['),
  })
  await inputs.nth(1).setInputFiles({
    name: 'revision.yaml',
    mimeType: 'text/yaml',
    buffer: Buffer.from('openapi: 3.1.0\npaths: {}'),
  })
  await page.getByRole('button', { name: 'Check contract impact' }).click()
  await expect(page.getByText(/Unexpected flow-seq-end|Flow sequence/)).toBeVisible()

  await inputs.nth(0).setInputFiles({
    name: 'too-large.yaml',
    mimeType: 'text/yaml',
    buffer: Buffer.alloc(2 * 1024 * 1024 + 1),
  })
  await expect(page.getByText('Keep each contract under 2 MB.')).toBeVisible()
})

test('keeps the explanatory shell usable on mobile without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  })
  const page = await context.newPage()

  await page.goto('/compare')

  await expect(page.getByRole('heading', { name: 'Baseline against revision' })).toBeVisible()
  await expect(
    page.getByText('Comparison requires JavaScript to read both files locally.'),
  ).toBeVisible()
  expect((await page.locator('body').evaluate((body) => body.scrollWidth)) <= 360).toBe(true)

  await context.close()
})
