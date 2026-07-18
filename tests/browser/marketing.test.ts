import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('presents a truthful design-partner conversion path', async ({ page }) => {
  const pageView = page.waitForRequest(
    (request) =>
      request.url().endsWith('/events/conversion') && request.postDataJSON().name === 'page_viewed',
  )

  await page.goto('/')
  await pageView

  await expect(page).toHaveTitle('OpenAPI Studio — Dependable OpenAPI workflows')
  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Know exactly what changed in your API contract.',
    }),
  ).toBeVisible()

  const application = page.getByRole('link', { name: 'Apply to become a design partner' })
  const applicationUrl = new URL((await application.getAttribute('href')) ?? '')
  expect(applicationUrl.protocol).toBe('mailto:')
  expect(applicationUrl.pathname).toBe('pitechae@gmail.com')
  expect(applicationUrl.searchParams.get('subject')).toBe('OpenAPI Studio design partner')
  expect(applicationUrl.searchParams.get('body')).toContain('Team and product:')
  expect(applicationUrl.searchParams.get('body')).toContain('Current OpenAPI workflow:')
  expect(applicationUrl.searchParams.get('body')).toContain(
    'The recurring problem costing us time:',
  )
  expect(applicationUrl.searchParams.get('body')).toContain('Typical specification size:')
  expect(applicationUrl.searchParams.get('body')).toContain(
    'Would we pay $29/workspace/month if this worked? Why or why not?',
  )
  await expect(page.getByText('No checkout. No fake instant access.')).toBeVisible()
  await expect(page.getByText('Illustrative sample of the pilot direction')).toBeVisible()
  await expect(page.getByText('No production editor access yet')).toBeVisible()
  await expect(page.getByText('Do not email a contract or confidential material')).toBeVisible()
  await expect(page.getByRole('link', { name: 'View source on GitHub' })).toHaveAttribute(
    'href',
    'https://github.com/bymilon/openapi-studio-tanstack',
  )
})

test('has no detectable accessibility violations and a usable tab order', async ({ page }) => {
  await page.goto('/')

  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([])

  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'OpenAPI Studio home' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Evidence' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Join the pilot' })).toBeFocused()
})

test('keeps the offer usable on a narrow screen without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 360, height: 800 },
  })
  const page = await context.newPage()

  await page.goto('/')

  await expect(page.getByRole('main')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Apply to become a design partner' })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Then \$29 only if it works/ })).toBeVisible()
  expect((await page.locator('body').evaluate((body) => body.scrollWidth)) <= 360).toBe(true)

  await context.close()
})
