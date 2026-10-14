{
  "metadata": {
    "id": "Karavi.002",
    "title": "Screenshot-visible QR generator",
    "status": "complete",
    "planVersion": "1.0.0",
    "promptSpecVersion": "3.1.1",
    "updatedAtUtc": "2026-08-28T21:20:00Z"
  },
  "parityMatrix": [
    {"surface":"Management & Business","artifact":"scope","locale":"en-US","consumer":"product","owner":"Main","requiredChange":"Visible screenshot flows only; exclude SaaS billing/analytics","status":"ready","evidence":"Reference screenshot"},
    {"surface":"UX/UI","artifact":"home and shell","locale":"en-US","consumer":"web","owner":"Frontend","requiredChange":"Responsive multi-step generator and accessible states","status":"ready","evidence":"Reference screenshot and design skill"},
    {"surface":"Frontend","artifact":"Angular pages/services","locale":"en-US","consumer":"browser","owner":"Frontend","requiredChange":"Interactive QR type, data, customize, preview and download","status":"ready","evidence":"Current Angular source"},
    {"surface":"Backend & Architecture","artifact":"Barcode API","locale":"n/a","consumer":"Angular","owner":"Backend","requiredChange":"Reuse static generation API; dynamic tracking not introduced","status":"ready","evidence":"BarcodeService/Controller inventory"},
    {"surface":"Infrastructure & Security","artifact":"upload/input boundaries","locale":"n/a","consumer":"browser","owner":"Main","requiredChange":"Local-only preview, client validation, no external runtime assets","status":"ready","evidence":"package/angular configuration"},
    {"surface":"Quality & Testing","artifact":"build and preview","locale":"en-US","consumer":"release","owner":"QA","requiredChange":"Build plus interaction/accessibility smoke","status":"ready","evidence":"Angular scripts"},
    {"surface":"Content & SEO","artifact":"copy/title","locale":"en-US","consumer":"public web","owner":"Frontend","requiredChange":"NTK-specific copy; no copied QR TIGER claims","status":"ready","evidence":"Reference screenshot"}
  ],
  "parts": [
    {"id":"P1","status":"complete","allowedTransitions":[],"prerequisites":[],"children":[],"dependsOn":[],"owner":"Frontend","priority":"P1","blocker":null,"evidence":["Angular component shell and responsive UI"],"completionCriteria":"App shell and home markup/styles implement visible QR-generator flow."},
    {"id":"P2","status":"complete","allowedTransitions":[],"prerequisites":["P1"],"children":[],"dependsOn":["P1"],"owner":"Frontend","priority":"P1","blocker":null,"evidence":["Preview type/mode/tab interactions; real generation and download state"],"completionCriteria":"Type, static/dynamic, upload, customization and download interactions work."},
    {"id":"P3","status":"complete","allowedTransitions":[],"prerequisites":["P2"],"children":[],"dependsOn":["P2"],"owner":"QA","priority":"P1","blocker":null,"evidence":["Angular build; .NET build; Preview smoke"],"completionCriteria":"Angular build and Preview smoke pass."}
  ],
  "result": {
    "status": "complete",
    "evidence": ["npm run build", "dotnet build --no-restore", "Preview generation 200 and image render", "secret scan pass"],
    "knownLimitations": ["Dynamic scan tracking requires a future account and persistence service."]
  }
}
