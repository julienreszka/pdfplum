# PDFPlum

Use this extension to generate PDF files with Handlebars, Puppeteer, and HTML. To use PDFPlum, follow these steps:

- Create a template using HTML and Handlebars.
- Package the resources into a ZIP file.
- Upload the ZIP file to a Firebase Storage bucket.

This extension exposes an HTTP endpoint, which, when called, triggers the extension.

Upon triggering, the extension downloads the template, runs Handlebars on it with the data provided in endpoint's JSON payload, and converts it to PDF. The generated PDF file is stored in a Firebase Storage bucket, and you can also configure the extension to return the PDF in the HTTP call response.

## Demo

For inspiration, check out the pre-made templates and their outputs in the [template-samples/](https://github.com/pdfplum/pdfplum/tree/main/template-samples) directory. Each includes HTML files and their resources. To use any of these templates in your extension, upload the `.zip` file to a Storage bucket and include the complete file path in the `TEMPLATE_PATH` extension parameter.

## Preparation

Before installing this extension, you need to:

- Create a template as described [here](https://github.com/pdfplum/pdfplum/tree/main/http-pdf-generator/PREINSTALL.md#the-template).
- [Set up Firebase Storage in your Firebase project.](https://firebase.google.com/docs/storage)
- Upload the template file (the zipped directory) to a Firebase Storage bucket.

Templates in this extension are based on Handlebars and can be configured using the features provided by Handlebars.

The printing mechanism is powered by [Puppeteer](https://pptr.dev/) which uses Chromium's PDF rendering engine.

## Why Puppeteer?

After testing various free PDF generation tools, including Google Docs API, Pandoc, makepdf, and others, Puppeteer was found to be the best for running in Cloud Functions and supporting easy templating with Handlebars. All other tools had limitations that prevented a complete end-to-end PDF templating solution. Third-party PDF APIs could be alternatives, but this extension aims to provide a free and straightforward solution.

## Usage

### The template

The template bundle is a ZIP file containing an `index.html` file. The bundle can optionally include media, fonts, CSS files, and more. The `index.html` file can access all files in the bundle, assuming they are served at the root (`/`).

For example, `images/flower.png` in the ZIP file will be served at `/images/flower.png`. The `index.html` file can also access online resources, such as loading a font, script, or CSS file from CDNs.

### The endpoint

The extension exposes an endpoint that generates a PDF file based on the template file and the provided JSON payload.

## How it all works

The template bundle is uncompressed, served, and loaded by a Chromium instance. Handlebars runs on all `.html`, `.txt`, and `.md` files, replacing their template placeholders with data from the `data` field of the JSON payload. After all network resources are fully loaded, a PDF file is generated from the rendered webpage.

If a bucket name is set in the `OUTPUT_STORAGE_BUCKET` extension parameter, the generated PDF file is saved in that bucket. If `RETURN_PDF_IN_RESPONSE` is enabled, the PDF file is returned in response to the HTTP call.

The PDF file is named according to the rules described [here](https://github.com/pdfplum/pdfplum/tree/main/http-pdf-generator/PARAMETERS.md#outputfilename).

## Billing

To install an extension, your project must be on the [Blaze (pay as you go) plan](https://firebase.google.com/pricing)

- This extension uses other Firebase and Google Cloud Platform services, which have associated charges if you exceed the service’s no-cost tier:
  - Cloud Functions (Node.js 10+ runtime. [See FAQs](https://firebase.google.com/support/faq#extensions-pricing))
  - Cloud Storage
