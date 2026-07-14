# Migration notes (Phase 0 audit)

Delete this file before final commit (Phase 5 QA).

## 1. `_pages/` inventory

| file | permalink | title | verdict |
|---|---|---|---|
| about.md | / | about | REAL — current bio (Bloomberg engineer + 4th year PhD, Ganguly + MacAvaney) |
| about-TABLET-6KA993F5.md | / | about | DELETE — git-conflict/tablet-sync artifact of older bio |
| about_einstein.md | — | — | DELETE — empty file, al-folio demo target |
| publications.md | /publications/ | publications | REAL — one-liner wrapping `{% bibliography %}` |
| repositories.md | /repositories/ | repositories | KEEP as candidate — pulls from `_data/repositories.yml`, real content |
| repositories-TABLET-6KA993F5.md | — | — | DELETE — tablet-sync artifact |
| cv.md | /cv/ | cv | STUB — no body, only points at `assets/pdf/cv.pdf`. Drop the page, link the PDF from `index.md` bio instead |
| teaching.md | /teaching/ | teaching | DELETE — template lorem, no real content |
| projects.md | /projects/ | projects | DELETE — needs `_projects/` collection (absent) |
| profiles.md | /people/ | people | DELETE — Einstein template |
| news.md | /news/ | news | DELETE — homepage news table replaces it |
| blog.md | /blog/ | blog | DELETE — no `_posts/`, no plan to blog |
| dropdown.md | — | submenus | DELETE — al-folio nav construct |
| 404.md | /404 | — | KEEP if trivially portable — otherwise drop |

Nav decision: **Home | Publications | Repositories**. No CV page (PDF linked in bio). No activities/teaching (no real content).

## 2. `_news/` — 14 entries, all real

Dates 2023-11 → 2026-03. Filenames inconsistent (`annoucement_*` typo alongside `announcement_*`). Homepage table renders 10 most recent, newest first. Keep as collection; rewrite loop to sort by date and slice.

Newest → oldest: 2026-03-09, 2025-12-16, 2025-06-23, 2025-04-05, 2025-03-10, 2025-02-15, 2024-12-16, 2024-12-08, 2024-09-23, 2024-09-20, 2024-06-08, 2024-05-16, 2024-04-15, 2023-11-01.

## 3. `_bibliography/papers.bib`

- 14 BibTeX entries.
- Custom fields actually used: **only `doi` and `selected`**. No `pdf`, `code`, `arxiv`, `html`, `abstract`, `bibtex_show`, `preview`, `slides`, `award`. Standard fields present: `author`, `title`, `booktitle`/`journal`, `year`, `url`, `doi`, `pages`, `volume`, `publisher`.
- Link derivation:
  - DOI link from `doi` field (all entries).
  - arXiv link when `journal = {CoRR}` and `volume = {abs-XXXX.YYYYY}` — parse from `url` (`arXiv.XXXX.YYYYY` suffix).
  - No PDF hosting on-site.
- Author normalisation: bold "Andrew Parry" and "A. Parry" in rendered author list.
- `papers-TABLET-6KA993F5.bib` → DELETE (tablet-sync artifact).

## 4. `_config.yml` values to preserve

- `title: Andrew Parry`
- `email: a.parry.1@research.gla.ac.uk` (also `contact_note` = `first_initial.last_name.1@research.gla.ac.uk`)
- `url: https://parry-parry.github.io`
- `github_username: Parry-Parry`
- `scholar_userid: F_S1DXkAAAAJ`
- `orcid_id: 0000-0001-5446-8328`
- `x_username: MrParryParry` (optional; drop if trimming)

Everything else (theme flags, mathjax, imagemagick, dark mode, third_party_libraries, jekyll_get_json, giscus, disqus, jekyll-archives, etc.) → discard.

## 5. `_data/` verdict

- `cv.yml` — has real Education block but broken HTML (`<\a>` instead of `</a>`) and only Education. Drop; link PDF instead.
- `repositories.yml` — real (github_users + 4 repos). Use for Repositories page.
- `coauthors.yml` — trivial (only supervisors). Drop; supervisor links live in bio prose.
- `venues.yml` — physics-demo (`AJP`, `PhysRev`, `Vision`). DELETE.

## 6. Assets

- `assets/pdf/cv.pdf` (60 KB) — KEEP, referenced from bio.
- `assets/pdf/example_pdf.pdf` — DELETE, demo.
- `assets/pdf/sigir_abs.pdf` (500 KB) — unreferenced. Drop unless owner objects.
- `assets/img/profile.jpg` (5.9 MB) — image not used by the 90s design. DELETE (or downscale later if owner wants a headshot).
- `assets/img/profile-TABLET-6KA993F5.jpg` — DELETE.
- `assets/img/logo.png`, `assets/img/profile_old.jpg`, `assets/img/publication_preview/` — DELETE.
- Entire `assets/{audio,bibliography,css,fonts,html,js,json,jupyter,plotly,video,webfonts}/` — DELETE. `assets/css/main.css` written fresh.
- No CNAME. Site publishes at `parry-parry.github.io` directly. No custom domain to preserve.

## 7. Deploy workflow

- `.github/workflows/deploy.yml` — al-folio `bin/deploy` script deploying to `gh-pages`. DELETE.
- `.github/workflows/jekyll.yml` — clean GitHub-Pages Actions workflow using `bundle exec jekyll build` + `actions/deploy-pages`. **Keep and use as basis** — already correct shape. Remove nothing but ensure Ruby 3.1, bundler cache. jekyll-scholar works because we run `bundle exec jekyll build` ourselves rather than relying on the Pages plugin safelist.
- `.github/workflows/deploy-image.yml` — Docker CI, guarded by `alshedivat` repo owner check. DELETE.
- `.github/workflows/deploy-docker-tag.yml` — DELETE.
- `.github/workflows/jekyll-TABLET-6KA993F5.yml` — DELETE (tablet-sync artifact).

Publishing source needs to be set to "GitHub Actions" in repo Pages settings (already the case if `jekyll.yml` has been running).

## 8. TABLET-6KA993F5 artefacts (pre-existing conflict remnants)

All to DELETE:
- `.github/workflows/jekyll-TABLET-6KA993F5.yml`
- `_pages/about-TABLET-6KA993F5.md`
- `_pages/repositories-TABLET-6KA993F5.md`
- `assets/img/profile-TABLET-6KA993F5.jpg`
- `_bibliography/papers-TABLET-6KA993F5.bib`

Currently untracked/staged per initial `git status`.

## 9. Deviations from plan

- Plan section 8 lists CV page as an option; audit shows CV content is only a PDF, so CV becomes an inline link in the bio and the nav drops it (plan explicitly permits this).
- Plan section 8 activities page dropped — no real talks/PC/tutorial data in the repo.
- Repositories page **added** to nav (plan didn't list it, but `_data/repositories.yml` is real content and rendering it as a plain list of GitHub links fits the design).
- Homepage news cap 10 (plan §8 says "the 10 most recent") — total entries currently 14, so 4 fall off.
