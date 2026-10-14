{
  "metadata": {"id":"Karavi.003","title":"Persian-first website localization","status":"complete","planVersion":"1.0.1","promptSpecVersion":"3.1.1","updatedAtUtc":"2026-08-29T06:10:00Z"},
  "parityMatrix": [
    {"surface":"Management & Business","artifact":"locale policy","locale":"fa-IR/en-US","consumer":"product","owner":"Main","requiredChange":"fa-IR default with persistent choice","status":"ready","evidence":"User request"},
    {"surface":"UX/UI","artifact":"shell/pages/forms","locale":"fa-IR/en-US","consumer":"browser","owner":"Frontend","requiredChange":"RTL/LTR, switcher, technical field direction","status":"ready","evidence":"Current Angular UI"},
    {"surface":"Frontend","artifact":"components/services","locale":"fa-IR/en-US","consumer":"browser","owner":"Frontend","requiredChange":"Remove user-facing hardcoded strings","status":"ready","evidence":"Source inventory"},
    {"surface":"Backend & Architecture","artifact":"API contract","locale":"n/a","consumer":"Angular","owner":"Backend","requiredChange":"No contract change; localize client messages","status":"not_applicable","evidence":"Existing API contract"},
    {"surface":"Infrastructure & Security","artifact":"browser storage","locale":"fa-IR/en-US","consumer":"browser","owner":"Frontend","requiredChange":"Safe locale persistence without external assets","status":"ready","evidence":"Browser capability"},
    {"surface":"Quality & Testing","artifact":"build/preview","locale":"fa-IR/en-US","consumer":"release","owner":"QA","requiredChange":"Locale and bidi smoke tests","status":"ready","evidence":"Angular scripts"},
    {"surface":"Content & SEO","artifact":"copy/title","locale":"fa-IR/en-US","consumer":"public web","owner":"Content","requiredChange":"Natural Persian and English parity","status":"ready","evidence":"Current public copy"}
  ],
  "parts": [
    {"id":"P1","status":"complete","allowedTransitions":[],"prerequisites":[],"children":[],"dependsOn":[],"owner":"Frontend","priority":"P1","blocker":null,"evidence":["LocalizationService applies fa-IR/en-US, lang, dir, title and localStorage persistence."],"completionCriteria":"Locale service supplies fa/en translations and applies locale/direction."},
    {"id":"P2","status":"complete","allowedTransitions":[],"prerequisites":["P1"],"children":[],"dependsOn":["P1"],"owner":"Frontend","priority":"P1","blocker":null,"evidence":["Shell, home, about and contact consume translation keys; technical fields enforce LTR."],"completionCriteria":"All current user-facing surfaces consume translations."},
    {"id":"P3","status":"complete","allowedTransitions":[],"prerequisites":["P2"],"children":[],"dependsOn":["P2"],"owner":"QA","priority":"P1","blocker":null,"evidence":["npm.cmd run build passed; preview verified fa-IR/rtl and en-US/ltr switch states."],"completionCriteria":"Build and Persian/English Preview smoke pass."}
  ]
}
