// Îngreunează descărcarea pozelor: fără click-dreapta / „Salvează imaginea”,
// fără tragere cu mouse-ul și fără meniul de apăsare lungă pe telefon.
// Linkurile de pe poze funcționează normal. O captură de ecran rămâne posibilă.

(function () {
    const style = document.createElement("style");
    style.textContent =
        "img { -webkit-user-drag: none; user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; }";
    document.head.appendChild(style);

    // pozele de pe pagina produsului au pointer-events: none, deci click-ul ajunge pe #produs
    const PROTEJAT = "img, #produs";

    document.addEventListener("contextmenu", function (e) {
        if (e.target.closest && e.target.closest(PROTEJAT)) e.preventDefault();
    });

    document.addEventListener("dragstart", function (e) {
        if (e.target.tagName === "IMG") e.preventDefault();
    });

    // Ctrl+S (salvează pagina cu poze), Ctrl+U (sursa), F12 / Ctrl+Shift+I/J/C (unelte dezvoltator)
    document.addEventListener("keydown", function (e) {
        const key = e.key.toLowerCase();
        const ctrl = e.ctrlKey || e.metaKey;
        if (key === "f12" || (ctrl && (key === "s" || key === "u")) ||
            (ctrl && e.shiftKey && (key === "i" || key === "j" || key === "c"))) {
            e.preventDefault();
        }
    });
})();
