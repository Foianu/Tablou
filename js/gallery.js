// Construiește galeriile și paginile de produs din js/gallery-data.js.
// Funcționează la fel pe paginile RO (pages/) și EN (en/pages/), pentru că
// galeria, produs.html și pagina categoriei stau mereu în același folder.

// rădăcina site-ului, dedusă din locația acestui script (.../js/gallery.js)
const ROOT = document.currentScript.src.replace(/js\/gallery\.js.*$/, "");

function imgUrl(cat, path) {
    return ROOT + "img/" + cat + "/" + path;
}

function produsUrl(cat, id) {
    return "produs.html?c=" + encodeURIComponent(cat) + "&id=" + encodeURIComponent(id);
}

function el(tag, attrs, children) {
    const node = document.createElement(tag);
    for (const key in attrs || {}) node.setAttribute(key, attrs[key]);
    (children || []).forEach(function (child) { node.appendChild(child); });
    return node;
}


// galerie: <div id="galerie" data-cat="phones"></div>
function construiesteGaleria(container) {
    const cat = container.dataset.cat;
    const galerie = GALERII[cat];
    if (!galerie) return;

    const produse = galerie.galerie
        ? galerie.galerie.map(function (id) { return galerie.produse.find(function (p) { return p.id === id; }); }).filter(Boolean)
        : galerie.produse;

    const photos = produse.map(function (p) {
        const link = p.link
            ? el("a", { href: p.link, target: "_blank", rel: "noopener" })
            : el("a", { href: produsUrl(cat, p.id) });
        link.appendChild(el("img", { src: imgUrl(cat, p.coperta), class: "image", alt: p.titlu, loading: "lazy" }));
        return el("div", { class: "photo" }, [link]);
    });

    // fără randuri: toate pozele într-o singură grilă
    const randuri = galerie.randuri || [photos.length];
    let i = 0, r = 0;
    while (i < photos.length) {
        const n = randuri[r % randuri.length];
        container.appendChild(el("div", { class: "grid" }, photos.slice(i, i + n)));
        i += n;
        r++;
    }

    // grilele rămân direct în <section>, exact ca în HTML-ul vechi
    container.replaceWith.apply(container, Array.from(container.childNodes));
}


// pagina de produs: produs.html?c=phones&id=phone-10
function construiesteProdusul(container) {
    const params = new URLSearchParams(location.search);
    const cat = params.get("c");
    const galerie = GALERII[cat];
    const index = galerie ? galerie.produse.findIndex(function (p) { return p.id === params.get("id"); }) : -1;

    if (index < 0) {
        location.replace(galerie ? cat + ".html" : "../index.html");
        return;
    }

    const produse = galerie.produse;
    const produs = produse[index];
    document.title = produs.titlu;

    // săgețile: produsul anterior / următor, iar la capete înapoi la galerie
    const prev = produse[index - 1], next = produse[index + 1];
    document.getElementById("inapoi").href = prev ? produsUrl(cat, prev.id) : cat + ".html";
    document.getElementById("inainte").href = next ? produsUrl(cat, next.id) : cat + ".html";

    const blocuri = Array.isArray(produs.poze[0]) ? produs.poze : [produs.poze];
    const clasa = produs.coloane === 2 ? "grid-content-1" : "grid-content";
    let count = 0;

    blocuri.forEach(function (poze) {
        container.appendChild(el("div", { class: clasa }, poze.map(function (poza) {
            const img = el("img", { src: imgUrl(cat, produs.id + "/" + poza), width: "100%", alt: produs.titlu });
            if (count++ > 1) img.setAttribute("loading", "lazy");
            return img;
        })));
    });
}


const galerieEl = document.getElementById("galerie");
if (galerieEl) construiesteGaleria(galerieEl);

const produsEl = document.getElementById("produs");
if (produsEl) construiesteProdusul(produsEl);
