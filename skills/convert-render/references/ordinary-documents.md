# Ordinary document conversion

`import_document` imports one requested file into a project as a new Markdown document. The current MCP contract accepts `.docx`, `.pdf`, `.odt`, `.ods`, `.xlsx`, `.xlsm`, `.xlsb`, `.xls`, and `.numbers`, with at most 2 MB decoded bytes in standard base64. Read the current tool schema and actual refusal for exact runtime limits; do not infer app upload limits from MCP limits.

The file must have the declared extension and readable text; scanned-only documents are unsupported. Only the converted Markdown is retained: the original file and its images are not stored. Tell the user about those losses when they affect the requested result. Conversion requires write access, a paid plan, and an available/configured converter. Do not call import as a read-only diagnostic or to circumvent a plan/configuration refusal.

Use the actual returned ID, name, warnings, and decision. Automatic naming can select a numbered name for different content; an explicit requested name can conflict. If outcome is uncertain, inspect existing artifacts before retrying. Do not claim OCR, exact layout preservation, original-file retention, or successful import before the service returns evidence.
