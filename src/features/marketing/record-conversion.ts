type ConversionName = 'page_viewed' | 'design_partner_clicked' | 'repository_clicked'

export function recordConversion(name: ConversionName) {
  try {
    navigator.sendBeacon('/events/conversion', JSON.stringify({ name }))
  } catch {
    // Measurement must never block the conversion path.
  }
}
