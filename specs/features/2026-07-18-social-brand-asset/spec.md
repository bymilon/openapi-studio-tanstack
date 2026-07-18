# Social Brand Asset

| Field      | Value                                                                           |
| ---------- | ------------------------------------------------------------------------------- |
| Feature ID | TSK-5                                                                           |
| Status     | SPEC_APPROVED                                                                   |
| Outcome    | Replace the full-page repository screenshot with a dedicated social brand asset |

## Requirements

- **REQ-001:** Provide a deterministic 1200×630 brand master and PNG social asset.
- **REQ-002:** Use the real OpenAPI Studio mark, type, redline palette, and an explicitly illustrative contract concept.
- **REQ-003:** Use the asset in the README and Open Graph/Twitter metadata.
- **REQ-004:** Include absolute image URL, dimensions, MIME type, alt text, and canonical URL.
- **REQ-005:** Avoid full-page screenshots, borrowed motifs, generated mockups, or claims of available product functionality.

## Validation

- PNG is exactly 1200×630 and visually inspected.
- Browser tests assert Open Graph dimensions and Twitter large-card metadata.
- Preview serves the PNG with a successful response and image content type.
