import { publicConfiguration } from '../../platform/configuration/public'

export function MarketingHome() {
  return (
    <main>
      <h1>Design APIs without losing the contract.</h1>
      <p>
        {publicConfiguration.appName} is being rebuilt as a focused workspace for editing,
        validating, publishing, and operating OpenAPI documents.
      </p>
    </main>
  )
}
