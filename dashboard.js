/* Basil Manager Dashboard — mockup behaviour
   All interactivity for the static mockup. No backend calls. */

(function () {
  "use strict";

  /* ---------- Responsive side menu ---------- */
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  const toggle = document.getElementById("sidebarToggle");

  function openSidebar() {
    sidebar.classList.add("open");
    backdrop.classList.add("show");
  }
  function closeSidebar() {
    sidebar.classList.remove("open");
    backdrop.classList.remove("show");
  }

  if (toggle) toggle.addEventListener("click", openSidebar);
  if (backdrop) backdrop.addEventListener("click", closeSidebar);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSidebar();
  });

  /* Close the drawer if resized up to desktop */
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) closeSidebar();
  });

  /* ---------- Menu card expand / collapse ---------- */
  document.querySelectorAll(".toggle-menu").forEach(function (btn) {
    btn.addEventListener("click", function () {
      this.closest(".menu-card").classList.toggle("open");
    });
  });

  /* ---------- Three-state allergen control ----------
     One selected state per allergen row. Classes map to
     CONTAINS / FREE_FROM / UNVERIFIED. */
  const STATE_CLASSES = ["sel-contains", "sel-free", "sel-unverified"];

  document.querySelectorAll(".tri-state").forEach(function (group) {
    const buttons = group.querySelectorAll("button");
    buttons.forEach(function (btn, index) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove.apply(b.classList, STATE_CLASSES);
        });
        btn.classList.add(STATE_CLASSES[index]);
      });
    });
  });
})();
