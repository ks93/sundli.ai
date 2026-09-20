# Quiet Exception

The sundli.ai identity uses Manrope and a six-ray asterisk with an aligned, detached upper-right tip. The wordmark uses a superscript micro version; the standalone mark uses softened corners.

- **Paper / ink / cobalt:** `#F7F6F2`, `#20231F`, `#234FC8`. Dark colors follow the system preference.
- **Type:** Manrope 400 for prose, 500 for navigation, 550 in the outlined signature, 650 for headings. Reading text is 18px, with 1.7 line-height and a 65ch maximum measure.
- **Layout:** 72rem outer width; 16px mobile / 24px wide gutters; spacing based on 4px increments.
- **Editorial patterns:** linked essay titles, quiet dates, plain project descriptions, footnotes, and simple return links.
- **Interaction:** native navigation, Tab/Enter, a skip link, and visible focus. No command menu, custom shortcuts, status pills, or UI kit. Respect reduced motion.
- **Logo:** keep the signature at least 140px wide, leave clear space, and preserve the asterisk geometry. Use ink on light surfaces and white on dark.

The header retains “Contact” to preserve the existing site's information and URL. Manrope is self-hosted, so the design does not depend on a Google Fonts request. The page content is server rendered into a static export; only the active navigation marker needs a small client component.

## Where the asterisk appears

Use the micro mark for the browser favicon and small editorial marks. The browser SVG adapts to light/dark mode; the ICO fallback and Apple touch icon use the same identity. The footer uses a softened asterisk as a 44px-target home link with an accessible label. Posts with Markdown footnotes gain a small asterisk at the start of their notes; numbered references and backlinks remain intact.

The wordmark is not clipped: its 475 × 144 viewBox includes clear space on all four sides. The detached upper-right tip is intentional. Preserve the full image aspect ratio and do not crop the SVG to imitate that break.
