
function readInput(fallback) {
  if (fallback != null && String(fallback).length) return String(fallback);
  if (process.stdin && process.stdin.isTTY) return "";
  try {
    const fs = require("fs");
    if (typeof fs.readFileSync === "function") {
      // Non-blocking when no piped data: use readFileSync only if fd 0 has size or isn't a TTY.
      return fs.readFileSync(0, "utf8");
    }
  } catch (_) {}
  return "";
}

function stripTags(html) { return String(html).replace(/<[^>]+>/g, ""); }
function mdEscape(s) { return String(s).replace(/([\\`*_{}\[\]()#+\-.!])/g, "\\$1"); }
function run(argv) {
  const mode = argv[0] || "strip";
  const text = argv.slice(1).join(" ") || "<b>hi</b>";
  return mode === "escape" ? mdEscape(text) : stripTags(text);
}

module.exports = { readInput, stripTags, mdEscape, run };
