---
title: GitHub Copilot for data scientists
description: A five-slide briefing on Copilot in VS Code, HVE RPI and model selection.
---

## Presentation

A short briefing for Desjardins teams using GitHub Copilot for data science in VS Code.
The colors are Desjardins-inspired, not an official brand template.

### Français (présentation principale)

* [Lire la présentation Web](https://devopsabcs-engineering.github.io/dj-github-copilot-fundamentals/)
* [Télécharger le PowerPoint de cinq diapositives](./presentations/github-copilot-data-scientists-desjardins-fr.pptx)
* [Télécharger le PDF en français](./presentations/github-copilot-data-scientists-desjardins-fr.pdf)

### English

* [Read the English web presentation](https://devopsabcs-engineering.github.io/dj-github-copilot-fundamentals/en.html)
* [Download the five-slide English PowerPoint](./presentations/github-copilot-data-scientists-desjardins.pptx)
* [Download the English PDF](./presentations/github-copilot-data-scientists-desjardins.pdf)

The five sections cover the data-science workflow, completion/Ask/agentic interactions,
the [HVE Core RPI lifecycle](https://github.com/microsoft/hve-core/blob/main/docs/rpi/README.md),
model choice, and a synthetic credit-risk example.
Each PowerPoint includes presenter notes and source links in its own language.
French and English remain separate; the site opens in French and offers a language switch.

## Use the web version

Open [the French page](./index.html) or [the English page](./en.html) directly,
or serve the repository with a static HTTP server.
No build step, external libraries or network-loaded fonts are required.
The page supports mobile layouts and works as a readable document without JavaScript.

Select **Présenter** (French) or **Present slides** (English) for one section at a time.
Use the previous/next buttons or the left/right arrow keys to navigate.
Press Escape or select **Lire la page** / **Read page** to return to the full page.
Download the PDF for a fixed five-page print version.

## Publish to GitHub Pages

This repository already uses GitHub Actions as its Pages source.
The [Pages workflow](./.github/workflows/pages.yml) publishes only the web page and
presentation downloads after a push to `main`, or when run manually.
Commit and push these files to publish the new content; local changes are not live.
For another repository, set **Settings > Pages > Build and deployment > Source**
to **GitHub Actions** first.

## Model and data guidance

Auto routes among available models subject to your plan and administrator policies.
Hydrafusion is setup-dependent, not a universal Copilot option.
Large, medium and small refer to relative capability recommendations, not product labels,
parameter counts or reasoning-effort settings.

Use synthetic or approved de-identified data for the example.
Do not include client PII, credentials or confidential datasets in prompts.
Copilot output still requires technical review and the customer's model-risk controls.