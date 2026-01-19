# Translation Plan: Portuguese (Portugal) - Pt-PT

## Executive Summary

This plan outlines the steps required to add European Portuguese (Pt-PT) translation support to the Polis application. Currently, Polis supports 30 languages including Brazilian Portuguese (`pt_br`) and Timor-Leste Portuguese (`pt_TL`), but lacks European Portuguese support.

## Current State Analysis

### Existing Portuguese Support
- **pt_br.js**: Brazilian Portuguese (177 lines) - full translation
- **pt_TL.js**: Timor-Leste Portuguese (177 lines) - full translation
- All Portuguese language codes currently map to `pt_br` by default (except explicit `pt_TL` requests)

### Translation Architecture
- **Client-side UI**: Static JavaScript translation files in `/client-participation/js/strings/`
- **Server-side content**: Google Cloud Translate API for comments and conversation metadata
- **Language detection**: Browser Accept-Language header + `ui_lang` query parameter
- **Format**: Simple key-value JavaScript objects exported as modules

## Implementation Plan

### Phase 1: Create Base Translation File

**File**: `/client-participation/js/strings/pt_pt.js`

**Steps**:
1. Copy `en_us.js` as the base template (177 lines)
2. Translate all string keys from English to European Portuguese
3. Pay special attention to:
   - Formal vs informal tone (Portuguese tends to be more formal than Brazilian)
   - European Portuguese vocabulary differences from Brazilian Portuguese
   - Special characters: á, é, í, ó, ú, â, ê, ô, à, ã, õ, ç
4. Maintain the same structure and template variables (e.g., `{{num_comments}}`)

**Key differences from pt_br to consider**:
- Verb forms and conjugations
- Vocabulary (e.g., "tela" vs "ecrã", "celular" vs "telemóvel")
- Pronoun usage ("você" vs "tu")
- Spelling variations

**Estimated lines**: ~177 lines (matching other Portuguese variants)

### Phase 2: Register Language in Translation System

**File**: `/client-participation/js/strings.js`

**Changes needed**:

1. **Add to translations object**:
```javascript
translations.pt_pt = require("./strings/pt_pt");
```

2. **Update language detection logic**:
```javascript
// Add mapping for Portuguese (Portugal) language codes
if (code === "pt-PT" || code === "pt_pt" || code === "pt-pt") {
  return "pt_pt";
}
```

3. **Update fallback logic** (if needed):
Currently `pt` maps to `pt_br`. Consider if this should be changed or if we should add explicit handling for:
- `pt-PT` → `pt_pt`
- `pt-BR` → `pt_br`
- `pt` → `pt_br` (keep as default for backward compatibility)

### Phase 3: Update End-to-End Tests

**File**: `/e2e/cypress/e2e/client-participation/i18n.cy.js`

**Changes**:

1. Add `pt_pt` to the test suite:
```javascript
const langsToTest = [
  // ... existing languages ...
  "pt_pt"
];
```

2. Ensure the test verifies:
   - Language loads correctly from Accept-Language header
   - UI elements display translated text
   - Dynamic language switching works
   - Comment form placeholder uses correct translation

### Phase 4: Translation Content Creation

**Translation approach options**:

**Option A: Professional Translation Service**
- Use a certified Portuguese (Portugal) translator
- Ensures cultural appropriateness and accuracy
- Best for production deployment
- **Recommended approach**

**Option B: AI-Assisted Translation with Native Review**
- Use AI tools (GPT-4, DeepL) to generate initial translation
- Have native European Portuguese speaker review and refine
- Cost-effective hybrid approach
- Good for quick iteration

**Option C: Community Translation**
- Open source contribution from Portuguese community
- Use existing pt_br as reference but adapt for European Portuguese
- Leverage GitHub collaboration

**Translation Keys to Prioritize** (total: ~80 unique keys):

**Critical UI elements**:
- `s.agree`, `s.disagree`, `s.pass` (voting buttons)
- `s.writePrompt`, `s.commentSent` (comment submission)
- `s.important` (comment visibility message)
- Error messages and validation text

**Secondary elements**:
- Help text and tooltips
- Visualization labels
- Moderation interface text

### Phase 5: Quality Assurance

**Testing checklist**:

1. **Functional Testing**:
   - [ ] Load conversation with `?ui_lang=pt_pt`
   - [ ] Test with Accept-Language: `pt-PT`
   - [ ] Verify all UI strings render in Portuguese (Portugal)
   - [ ] Check for missing translations using `window.missingTranslations()`
   - [ ] Test comment submission and voting flow
   - [ ] Verify visualization labels

2. **Visual Testing**:
   - [ ] Check text doesn't overflow containers
   - [ ] Verify special characters render correctly (ç, ã, õ, etc.)
   - [ ] Test on different browsers (Chrome, Firefox, Safari)
   - [ ] Responsive design on mobile devices

3. **E2E Test Suite**:
   - [ ] Run full i18n test suite
   - [ ] Verify pt_pt test passes
   - [ ] Check no regressions in other languages

4. **Linguistic Review**:
   - [ ] Native speaker review for naturalness
   - [ ] Consistency check across all strings
   - [ ] Verify appropriate formality level
   - [ ] Check technical terminology accuracy

### Phase 6: Documentation Updates

**Files to update**:

1. **README** (if exists): Add pt_pt to supported languages list
2. **CONTRIBUTING** (if exists): Document translation process for future contributors
3. **Changelog**: Document the addition of European Portuguese support

### Phase 7: Server-Side Translation Support

**Google Cloud Translate API**:

The server already supports automatic translation via Google Cloud Translate API. Verify:

1. Language code `pt-PT` is recognized by Google Translate API
2. User-generated comments are automatically translated to European Portuguese when requested
3. Conversation metadata (topic, description) translates correctly

**Database considerations**:
- No schema changes needed (existing `comment_translations` and `conversation_translations` tables support any language code)
- Translations will be stored with `lang='pt-PT'` or `lang='pt_pt'` depending on implementation

## Implementation Checklist

### Development Tasks

- [ ] Create `/client-participation/js/strings/pt_pt.js` with all translations
- [ ] Update `/client-participation/js/strings.js` to register pt_pt
- [ ] Add language detection for pt-PT, pt_pt codes
- [ ] Update E2E tests in `/e2e/cypress/e2e/client-participation/i18n.cy.js`
- [ ] Run `window.missingTranslations()` to verify completeness
- [ ] Test manual language switching

### Quality Assurance Tasks

- [ ] Native speaker linguistic review
- [ ] Visual testing across browsers
- [ ] E2E test suite passes
- [ ] Mobile responsive testing
- [ ] Special character rendering verification
- [ ] Server-side translation API testing

### Documentation Tasks

- [ ] Update README with pt_pt in supported languages
- [ ] Document translation process
- [ ] Update changelog

### Deployment Tasks

- [ ] Merge to main branch
- [ ] Deploy to staging environment
- [ ] Smoke test in staging
- [ ] Deploy to production
- [ ] Announce new language support

## Files to Modify

| File Path | Type | Changes |
|-----------|------|---------|
| `/client-participation/js/strings/pt_pt.js` | New | Complete translation file (177 lines) |
| `/client-participation/js/strings.js` | Modified | Add pt_pt registration and detection |
| `/e2e/cypress/e2e/client-participation/i18n.cy.js` | Modified | Add pt_pt to test suite |

## Translation Reference Comparison

**Sample translations** (for reference):

| Key | en_us | pt_br | pt_pt (proposed) |
|-----|-------|-------|------------------|
| agree | Agree | Concordo | Concordo |
| disagree | Disagree | Discordo | Discordo |
| pass | Pass / Unsure | Pular / Não tenho certeza | Passar / Não tenho a certeza |
| writePrompt | Share your perspective... | Compartilhe sua perspectiva... | Partilhe a sua perspectiva... |
| commentSent | Statement submitted! | Afirmação enviada! | Declaração enviada! |

**Notable pt_br vs pt_pt differences**:
- "Compartilhe" (BR) → "Partilhe" (PT)
- "celular" (BR) → "telemóvel" (PT)
- "tela" (BR) → "ecrã" (PT)
- "você" (BR) → "tu/você" (PT - depends on formality)
- "certeza" usage: "tenho certeza" (BR) vs "tenho a certeza" (PT)

## Risk Assessment

### Low Risk
- Translation file is isolated and doesn't affect other languages
- Existing Portuguese variants serve as templates
- E2E tests will catch any integration issues

### Medium Risk
- Language code mapping conflicts (pt vs pt-PT vs pt-BR)
  - **Mitigation**: Explicit code mapping with fallback chain
- Translation quality if not reviewed by native speaker
  - **Mitigation**: Professional review or community validation

### Minimal Risk
- Server-side Google Translate already supports pt-PT
- Database schema supports arbitrary language codes
- No infrastructure changes required

## Success Criteria

1. **Functional**: Users can access Polis in European Portuguese via `?ui_lang=pt_pt` or Accept-Language header
2. **Complete**: All 80+ UI strings translated accurately
3. **Quality**: Native speaker approval of translations
4. **Tested**: E2E test suite passes with pt_pt
5. **Documented**: Language appears in official supported languages list

## Timeline Estimate

**Without specific deadlines** (as per Claude Code guidelines), here are the sequential steps:

1. **Translation creation**: Depends on chosen approach (professional vs community vs hybrid)
2. **Technical integration**: Code changes, testing, and review
3. **Quality assurance**: Native speaker review and testing
4. **Documentation**: Update relevant docs
5. **Deployment**: Merge and release

## Resources Needed

1. **Translation expertise**: Native European Portuguese speaker or professional translator
2. **Development time**: For code integration and testing
3. **QA time**: For thorough testing across devices/browsers
4. **Optional**: Access to European Portuguese-speaking users for beta testing

## Maintenance Considerations

**Ongoing maintenance**:
- When new UI strings are added to `en_us.js`, they must be added to `pt_pt.js`
- Consider establishing a translation workflow for future updates
- Document the process for contributors

**Translation synchronization**:
- Create a script to detect missing keys across language files
- Use `window.missingTranslations()` in development builds
- Consider CI/CD integration to check translation completeness

## Conclusion

Adding European Portuguese (Pt-PT) support to Polis is straightforward given the existing translation infrastructure. The main effort involves creating accurate, culturally appropriate translations of ~80 UI strings and integrating them into the existing system. With proper native speaker review, this addition will serve Portuguese-speaking users in Portugal, African Portuguese-speaking countries, and expatriate communities worldwide.

---

**Plan Version**: 1.0
**Created**: 2026-01-19
**Branch**: claude/plan-pt-pt-translation-JyAiz
**Status**: Ready for implementation
