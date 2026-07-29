(() => {
  const normalize = value => String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  function initLibrary(){
    const heroForm = document.querySelector(".library-hero-search");
    const heroQuery = document.getElementById("library-hero-query");
    const query = document.getElementById("library-query");
    const clear = document.getElementById("library-clear");
    const filterButtons = [...document.querySelectorAll("[data-filter]")];
    const themeButtons = [...document.querySelectorAll("[data-theme-button]")];
    const cards = [...document.querySelectorAll("[data-reference-card]")];
    const sections = [...document.querySelectorAll("[data-reference-section]")];
    const count = document.getElementById("library-result-count");
    const empty = document.getElementById("library-empty");
    const resetButtons = [...document.querySelectorAll("[data-reset-library]")];

    if(!query || !cards.length) return;

    let activeCategory = "todos";

    const updateFilterButtons = () => {
      filterButtons.forEach(button => {
        const active = button.dataset.filter === activeCategory;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    };

    const applyFilters = () => {
      const term = normalize(query.value);
      let visibleCount = 0;

      cards.forEach(card => {
        const categoryMatch = activeCategory === "todos" || card.dataset.category === activeCategory;
        const searchable = normalize(`${card.dataset.search || ""} ${card.textContent}`);
        const termMatch = !term || searchable.includes(term);
        const visible = categoryMatch && termMatch;
        card.hidden = !visible;
        if(visible) visibleCount += 1;
      });

      sections.forEach(section => {
        const visibleCards = section.querySelectorAll("[data-reference-card]:not([hidden])").length;
        section.hidden = visibleCards === 0;
      });

      if(count) count.textContent = String(visibleCount);
      if(empty) empty.hidden = visibleCount !== 0;
      if(clear) clear.hidden = !query.value;
    };

    const setCategory = category => {
      activeCategory = category || "todos";
      updateFilterButtons();
      applyFilters();
    };

    const resetLibrary = () => {
      query.value = "";
      if(heroQuery) heroQuery.value = "";
      setCategory("todos");
      query.focus({preventScroll:true});
    };

    filterButtons.forEach(button => {
      button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
      button.addEventListener("click", () => setCategory(button.dataset.filter));
    });

    themeButtons.forEach(button => {
      button.addEventListener("click", () => {
        setCategory(button.dataset.themeButton);
        document.getElementById("biblioteca")?.scrollIntoView({behavior:"smooth", block:"start"});
      });
    });

    query.addEventListener("input", () => {
      if(heroQuery && heroQuery.value !== query.value) heroQuery.value = query.value;
      applyFilters();
    });

    heroQuery?.addEventListener("input", () => {
      query.value = heroQuery.value;
      applyFilters();
    });

    heroForm?.addEventListener("submit", event => {
      event.preventDefault();
      query.value = heroQuery?.value || "";
      applyFilters();
      document.getElementById("biblioteca")?.scrollIntoView({behavior:"smooth", block:"start"});
      setTimeout(() => query.focus({preventScroll:true}), 450);
    });

    clear?.addEventListener("click", resetLibrary);
    resetButtons.forEach(button => button.addEventListener("click", resetLibrary));

    document.querySelectorAll("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        const text = button.dataset.copy || "";
        const original = button.innerHTML;
        let copied = false;

        try{
          await navigator.clipboard.writeText(text);
          copied = true;
        }catch(error){
          const temporary = document.createElement("textarea");
          temporary.value = text;
          temporary.setAttribute("readonly", "");
          temporary.style.position = "fixed";
          temporary.style.opacity = "0";
          document.body.append(temporary);
          temporary.select();
          copied = document.execCommand("copy");
          temporary.remove();
        }

        button.classList.toggle("is-copied", copied);
        button.innerHTML = copied
          ? '<i class="ri-check-line"></i> Código copiado'
          : '<i class="ri-error-warning-line"></i> Não foi possível copiar';

        window.setTimeout(() => {
          button.classList.remove("is-copied");
          button.innerHTML = original;
        }, 2200);
      });
    });

    document.querySelectorAll('.menu nav a').forEach(link => {
      link.addEventListener("click", () => {
        const details = link.closest("details");
        if(details) details.open = false;
      });
    });

    updateFilterButtons();
    applyFilters();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", initLibrary)
    : initLibrary();
})();
