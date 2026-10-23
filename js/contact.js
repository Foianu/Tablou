// Datele de contact și footer-ul, într-un singur loc pentru tot site-ul (RO + EN).
// Schimbi numărul / emailul aici și se actualizează pe toate paginile.

const CONTACT = {
    telefon: "+40775344737",          // pentru linkul de apel
    telefonAfisat: "0775 344 737",    // cum apare scris pe site
    whatsapp: "40775344737",          // fără + (așa cere WhatsApp)
    email: "tablou.tech@gmail.com",
    instagram: "https://www.instagram.com/tablou.tech/",
};

const FOOTER = {
    ro: {
        termeni: "Termeni și Condiții",
        confidentialitate: "Politica de Confidențialitate",
        livrare: "Comandă și Livrare",
        firma: "DES & DEV S.R.L. | CUI: 49665228 | Reg. Com.: J2024000324157 | Bucureşti",
    },
    en: {
        termeni: "Terms and Conditions",
        confidentialitate: "Privacy Policy",
        livrare: "Order & Delivery",
        firma: "DES & DEV S.R.L. | VAT ID: 49665228 | Trade Register No.: J2024000324157 | Bucharest",
    },
};


(function () {
    // rădăcina site-ului, dedusă din locația acestui script (.../js/contact.js)
    const ROOT = document.currentScript.src.replace(/js\/contact\.js.*$/, "");
    const text = FOOTER[document.documentElement.lang] || FOOTER.ro;

    // paginile legale stau în pages/ (sau en/pages/); prima pagină e cu un nivel mai sus
    const pagesDir = /\/pages\/[^\/]*$/.test(location.pathname) ? "" : "pages/";

    const LINKURI = {
        tel: "tel:" + CONTACT.telefon,
        whatsapp: "https://wa.me/" + CONTACT.whatsapp,
        email: "mailto:" + CONTACT.email,
        instagram: CONTACT.instagram,
    };

    function icon(tip, nume, marime) {
        const dim = marime ? ' width="' + marime + '" height="' + marime + '"' : "";
        // linkurile de apel și email nu au nevoie de fereastră nouă
        const target = tip === "tel" || tip === "email" ? "" : ' target="_blank" rel="noopener"';
        return '<div class="icons"><a href="' + LINKURI[tip] + '"' + target + '>' +
            '<img src="' + ROOT + 'img/intro/icon_' + nume + '.svg"' + dim + '></a></div>';
    }

    // <section id="contact-icons"></section>; data-marime="" = iconițe la mărimea lor naturală
    const iconsEl = document.getElementById("contact-icons");
    if (iconsEl) {
        const marime = iconsEl.dataset.marime !== undefined ? iconsEl.dataset.marime : "80";
        iconsEl.innerHTML = '<div class="footer-icons">' +
            icon("tel", "phone", marime) + icon("whatsapp", "whatsapp", marime) +
            icon("email", "email", marime) + icon("instagram", "insta", marime) + '</div>';
    }

    // <footer id="footer"></footer>
    const footerEl = document.getElementById("footer");
    if (footerEl) {
        footerEl.innerHTML =
            '<div class="footer"><div class="pages">' +
            '<a href="' + pagesDir + 'terms.html" target="_blank">' + text.termeni + '</a>' +
            '<a href="' + pagesDir + 'privacy.html" target="_blank">' + text.confidentialitate + '</a>' +
            '<a href="' + pagesDir + 'livrare.html" target="_blank">' + text.livrare + '</a>' +
            '<a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener"><img src="' + ROOT + 'img/intro/ANPC-SAL.png" width="160" height="40"></a>' +
            '<a href="https://consumer-redress.ec.europa.eu/index_en" target="_blank" rel="noopener"><img src="' + ROOT + 'img/intro/ANPC-SOL.png" width="160" height="40"></a>' +
            '</div><div class="company"><p>' + text.firma + '</p></div></div>';
    }

    // în text: <span data-contact="telefon">…</span>, <a data-contact="tel">…</a> etc.
    document.querySelectorAll("[data-contact]").forEach(function (el) {
        const tip = el.dataset.contact;
        if (tip === "telefon") el.textContent = CONTACT.telefonAfisat;
        else if (tip === "email-text") el.textContent = CONTACT.email;
        else if (LINKURI[tip]) el.href = LINKURI[tip];
    });
})();
