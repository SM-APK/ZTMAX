/* =================================================
   WEBSITE CONFIG
================================================= */

const siteConfig = {

    logo: "IMAGE/LOGO.png",

    leftMenu: [
        { name: "HOME", link: "index.html" },
        { name: "CONTACT", link: "CONTACT.html" },
        { name: "ABOUT US", link: "ABOUT-US.html" },
        { name: "PRIVACY POLICY", link: "PRIVACY-POLICY.html" },
        { name: "T & C", link: "T&C.html" }
    ],

    rightMenu: [
        { name: "Dashboard", link: "Dashboard.html" },
        { name: "Settings", link: "Settings.html" },
        { name: "Logout", link: "#" }
    ],

tabs: [
    { name: "Home", link: "index.html" },
    { name: "Anime", link: "#" },
    { name: "Web Series", link: "#" },
    { name: "Movies", link: "#" },
    { name: "Games", link: "#" },
    { name: "Earn Money", link: "#" },
    { name: "Product Sell & Buy", link: "#" }
],

    footer: {
        email: "support@ztmax.com",
        copyright: "© 2026 All Copyright Reserved ZTMAX"
    }
};


/* =================================================
   LOAD EVERYTHING AFTER DOM READY
================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       LOAD LOGO
    ========================= */

    document.getElementById("logo-container-1010").innerHTML =
        `<img class="logo-1011" src="${siteConfig.logo}" alt="Logo">`;


    /* =========================
       LOAD LEFT MENU
    ========================= */

    let leftMenuHTML = `<ul class="menu-list-1014">`;

    siteConfig.leftMenu.forEach(item => {
        leftMenuHTML += `
            <li><a class="link-1016" href="${item.link}">${item.name}</a></li>
        `;
    });

    leftMenuHTML += `</ul>`;

    document.getElementById("left-menu-1013").innerHTML = leftMenuHTML;


    /* =========================
       LOAD RIGHT MENU
    ========================= */

    let rightMenuHTML = `
    <button id="menu-btn-1028" class="menu-btn-1028">MENU</button>
    <div id="dropdown-content-1029" class="dropdown-content-1029">
    <ul class="dropdown-list-1030">
    `;

    siteConfig.rightMenu.forEach(item => {
        rightMenuHTML += `
            <li><a href="${item.link}">${item.name}</a></li>
        `;
    });

    rightMenuHTML += `</ul></div>`;

    document.getElementById("right-menu-button-1027").innerHTML = rightMenuHTML;


    /* =========================
       LOAD TABS
    ========================= */

let tabsHTML = `<ul class="tabs-list-1042">`;

siteConfig.tabs.forEach(tab => {
    tabsHTML += `
        <li>
            <a class="tab-link-2000" href="${tab.link}">
                ${tab.name}
            </a>
        </li>
    `;
});

tabsHTML += `</ul>`;

document.getElementById("tabs-section-1041").innerHTML = tabsHTML;    tabsHTML += `</ul>`;

    document.getElementById("tabs-section-1041").innerHTML = tabsHTML;


    /* =========================
       LOAD FOOTER
    ========================= */

    document.getElementById("footer-1057").innerHTML = `
    <div class="footer-content-1058">
        <div class="help-section-1059">
            <p>Help Email: ${siteConfig.footer.email}</p>
        </div>

        <div class="footer-links-1061">
            <a href="PRIVACY-POLICY.html">Privacy Policy</a>
            <a href="T&C.html">T & C</a>
        </div>

        <div class="copyright-1064">
            <p>${siteConfig.footer.copyright}</p>
        </div>
    </div>
    `;


    /* =================================================
       EVENTS SECTION
    ================================================= */


    /* ===== Dropdown Toggle ===== */

    const menuBtn = document.getElementById("menu-btn-1028");
    const dropdown = document.getElementById("dropdown-content-1029");
    const main = document.querySelector("main");

    menuBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        dropdown.classList.toggle("active");
        main.classList.toggle("blur");
    });

    document.addEventListener("click", function () {
        dropdown.classList.remove("active");
        main.classList.remove("blur");
    });


    /* ===== Tabs Click Toggle ===== */

    document.querySelectorAll(".tab-parent").forEach(tab => {

        tab.addEventListener("click", function (e) {

            e.stopPropagation();

            const subtab = this.querySelector(".subtab-1044");

            document.querySelectorAll(".subtab-1044").forEach(menu => {
                if (menu !== subtab) {
                    menu.style.display = "none";
                }
            });

            subtab.style.display =
                subtab.style.display === "block" ? "none" : "block";

        });

    });

});
/* =================================================
   SCROLL HIDE / SHOW HEADER + TABS (Smooth + Responsive)
================================================= */

let lastScrollY = window.scrollY;
let ticking = false;

const header = document.getElementById("header-1007");
const tabs = document.getElementById("tabs-section-1041");

// Dynamically get heights
const headerHeight = header.offsetHeight;
const tabsHeight = tabs.offsetHeight;

window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (!ticking) {
        window.requestAnimationFrame(() => {

            // SCROLL DOWN → hide header + tabs (only if user scrolled more than 50px)
            if (currentScrollY > lastScrollY + 5 && currentScrollY > 50) {
                header.style.transform = `translateY(-${headerHeight}px)`;
                tabs.style.transform = `translateY(-${tabsHeight}px)`;
            } 
            // SCROLL UP → show header + tabs (even small scroll up)
            else if (currentScrollY < lastScrollY - 5) {
                header.style.transform = "translateY(0)";
                tabs.style.transform = "translateY(0)";
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });

        ticking = true;
    }
});
/* =================================================
   AUTO SCALE 2000px WEBSITE FOR ALL DEVICES
================================================= */

function scaleWebsite() {

    const wrapper = document.getElementById("site-wrapper");

    const baseWidth = 2000;  // Your design width
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const scale = screenWidth / baseWidth;

    wrapper.style.transform = `scale(${scale})`;

    // Adjust height so no cut issue
    wrapper.style.height = (screenHeight / scale) + "px";
}

window.addEventListener("resize", scaleWebsite);
window.addEventListener("load", scaleWebsite);
/* =====================================
   SCROLL REVEAL EFFECT
===================================== */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(section => {

        const sectionTop = section.getBoundingClientRect().top;
        const revealPoint = 100; // jitna jaldi show karna hai

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }

    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);