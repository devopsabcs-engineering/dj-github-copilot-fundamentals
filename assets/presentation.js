    (() => {
      const slides = [...document.querySelectorAll(".slide")];
      const links = [...document.querySelectorAll(".chapter-nav a")];
      const present = document.querySelector("#present");
      const controls = document.querySelector("#present-controls");
      const previous = document.querySelector("#previous");
      const next = document.querySelector("#next");
      const counter = document.querySelector("#counter");
      const announcement = document.querySelector("#announcement");
      const french = document.documentElement.lang.startsWith("fr");
      const labels = french
        ? { present: "Présenter", read: "Lire la page", slide: "Diapositive", of: "sur" }
        : { present: "Present slides", read: "Read page", slide: "Slide", of: "of" };
      let active = 0;
      let presenting = false;

      function select(index, focus = false) {
        active = Math.max(0, Math.min(slides.length - 1, index));
        slides.forEach((slide, i) => slide.classList.toggle("is-active", i === active));
        links.forEach((link, i) => {
          if (i === active) link.setAttribute("aria-current", "step");
          else link.removeAttribute("aria-current");
        });
        counter.textContent = `${active + 1} / ${slides.length}`;
        previous.disabled = active === 0;
        next.disabled = active === slides.length - 1;
        if (presenting) {
          announcement.textContent = `${labels.slide} ${active + 1} ${labels.of} ${slides.length}: ${slides[active].querySelector("h1, h2").textContent}`;
        }
        if (focus) slides[active].focus({ preventScroll: true });
      }

      function navigate(index) {
        select(index, presenting);
        history.replaceState(null, "", `#${slides[active].id}`);
        if (presenting) window.scrollTo({ top: 0, behavior: "instant" });
      }

      function togglePresentation() {
        presenting = !presenting;
        document.body.classList.toggle("presenting", presenting);
        present.setAttribute("aria-pressed", String(presenting));
        present.textContent = presenting ? labels.read : labels.present;
        controls.hidden = !presenting;
        select(active, presenting);
        if (presenting) window.scrollTo({ top: 0, behavior: "instant" });
        else {
          slides[active].scrollIntoView({ block: "start", behavior: "instant" });
          present.focus({ preventScroll: true });
        }
      }

      links.forEach((link, index) => link.addEventListener("click", event => {
        if (!presenting) {
          select(index);
          return;
        }
        event.preventDefault();
        navigate(index);
      }));
      present.addEventListener("click", togglePresentation);
      previous.addEventListener("click", () => navigate(active - 1));
      next.addEventListener("click", () => navigate(active + 1));
      document.addEventListener("keydown", event => {
        if (!presenting || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
        if (event.target.closest("input, textarea, select, [contenteditable='true']")) return;
        if (event.key === "Escape") {
          event.preventDefault();
          togglePresentation();
        } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          navigate(active + (event.key === "ArrowRight" ? 1 : -1));
        }
      });
      function selectFromHash() {
        const index = slides.findIndex(slide => `#${slide.id}` === location.hash);
        if (index >= 0) select(index);
      }
      window.addEventListener("hashchange", selectFromHash);
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
          if (presenting) return;
          const visible = entries.filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (visible.length) select(slides.indexOf(visible[0].target));
        }, { rootMargin: "-15% 0px -35% 0px", threshold: [0, .25, .5, .75] });
        slides.forEach(slide => observer.observe(slide));
      }
      selectFromHash();
      select(active);
      present.hidden = false;
    })();
