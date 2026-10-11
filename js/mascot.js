// Angada, the young vānara mascot, drawn as inline SVG.
// mood: "happy" | "cheer" | "think" | "oops"
DH.angada = function (size, mood) {
  size = size || 96;
  mood = mood || "happy";
  var eyes = {
    happy: '<path d="M38 50 q5 -6 10 0" /><path d="M62 50 q5 -6 10 0" />',
    cheer: '<path d="M37 49 q6 -8 12 0" /><path d="M61 49 q6 -8 12 0" />',
    think: '<circle cx="44" cy="49" r="4" fill="#2b1a0e" stroke="none"/><circle cx="68" cy="46" r="4" fill="#2b1a0e" stroke="none"/><circle cx="45.5" cy="47.5" r="1.3" fill="#fff" stroke="none"/><circle cx="69.5" cy="44.5" r="1.3" fill="#fff" stroke="none"/>',
    oops: '<circle cx="43" cy="49" r="4" fill="#2b1a0e" stroke="none"/><circle cx="67" cy="49" r="4" fill="#2b1a0e" stroke="none"/><circle cx="44.5" cy="47.5" r="1.3" fill="#fff" stroke="none"/><circle cx="68.5" cy="47.5" r="1.3" fill="#fff" stroke="none"/>'
  }[mood];
  var mouth = {
    happy: '<path d="M46 66 q9 8 18 0" />',
    cheer: '<path d="M44 64 q11 14 22 0 z" fill="#c2410c"/>',
    think: '<path d="M50 68 q6 -3 11 1" />',
    oops: '<ellipse cx="55" cy="68" rx="4" ry="5" fill="#7c2d12"/>'
  }[mood];
  var arms = mood === "cheer"
    ? '<path d="M24 88 q-14 -18 -8 -34" stroke="#8a5a2b" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M86 88 q14 -18 8 -34" stroke="#8a5a2b" stroke-width="9" fill="none" stroke-linecap="round"/>'
    : "";
  return '<svg class="angada" width="' + size + '" height="' + size + '" viewBox="0 0 110 110" role="img" aria-label="Angada the vanara">' +
    '<path d="M86 96 q22 -4 16 -26 q-3 -9 -10 -6" stroke="#8a5a2b" stroke-width="6" fill="none" stroke-linecap="round"/>' +
    arms +
    '<ellipse cx="55" cy="96" rx="26" ry="16" fill="#8a5a2b"/>' +
    '<ellipse cx="55" cy="99" rx="15" ry="10" fill="#f3d3a8"/>' +
    '<circle cx="18" cy="50" r="12" fill="#8a5a2b"/><circle cx="18" cy="50" r="7" fill="#f3d3a8"/>' +
    '<circle cx="92" cy="50" r="12" fill="#8a5a2b"/><circle cx="92" cy="50" r="7" fill="#f3d3a8"/>' +
    '<circle cx="55" cy="50" r="36" fill="#8a5a2b"/>' +
    '<path d="M48 15 q7 -10 14 0" fill="#8a5a2b"/>' +
    '<path d="M24 34 q31 -14 62 0" stroke="#f59e0b" stroke-width="7" fill="none" stroke-linecap="round"/>' +
    '<circle cx="55" cy="27" r="4" fill="#dc2626"/>' +
    '<path d="M30 52 q0 -14 13 -12 q12 1 12 10 q0 -9 12 -10 q13 -2 13 12 q2 24 -25 26 q-27 -2 -25 -26z" fill="#f3d3a8"/>' +
    '<g stroke="#2b1a0e" stroke-width="3" fill="none" stroke-linecap="round">' + eyes + mouth + '</g>' +
    '<circle cx="36" cy="60" r="4" fill="#f9a8a8" opacity=".7"/><circle cx="74" cy="60" r="4" fill="#f9a8a8" opacity=".7"/>' +
    '</svg>';
};
