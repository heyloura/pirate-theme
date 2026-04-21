// heyloura-pirate — placeholder scaffold JS.
// Handles theme toggle persistence and stubs the Konami easter egg.

(function () {
  const root = document.documentElement;
  const KEY = "heyloura-theme";

  const stored = localStorage.getItem(KEY);
  if (stored === "light" || stored === "dark") {
    root.setAttribute("data-theme", stored);
  }

  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const effective = current === "auto" || !current ? (prefersDark ? "dark" : "light") : current;
      const next = effective === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem(KEY, next);
    });
  }

  // Konami easter egg — kraken attack. Up Up Down Down Left Right Left Right B A
  const konami = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let idx = 0;
  document.addEventListener("keydown", (e) => {
    // Don't capture keystrokes while the user is typing into a form control or contenteditable.
    const t = e.target;
    if (t && (t.matches && t.matches("input, textarea, select, [contenteditable=''], [contenteditable='true']"))) {
      idx = 0;
      return;
    }
    if (e.key === konami[idx]) {
      idx++;
      if (idx === konami.length) {
        document.body.classList.remove("sea-monster-attacks");
        void document.body.offsetWidth; // force reflow so animation restarts on repeat triggers
        document.body.classList.add("sea-monster-attacks");
        setTimeout(() => document.body.classList.remove("sea-monster-attacks"), 4900);
        idx = 0;
      }
    } else {
      idx = 0;
    }
  });

  // --- Parrot speech bubble: rotate phrases on hover/focus ---
  const parrotPhrases = [
    "Squawk! Find me on the fediverse!",
    "Yarrr, follow the captain!",
    "Come aboard the fediverse!"
  ];
  const parrot = document.querySelector(".deck-parrot");
  const parrotBubble = parrot && parrot.querySelector(".parrot-bubble");
  if (parrot && parrotBubble) {
    let lastPhraseIdx = -1;
    const pickPhrase = () => {
      let i;
      do {
        i = Math.floor(Math.random() * parrotPhrases.length);
      } while (i === lastPhraseIdx && parrotPhrases.length > 1);
      lastPhraseIdx = i;
      parrotBubble.textContent = parrotPhrases[i];
    };
    pickPhrase();
    parrot.addEventListener("mouseenter", pickPhrase);
    parrot.addEventListener("focus", pickPhrase);
  }

  // --- Cannon fire: restart animation on each click ---
  const cannon = document.querySelector(".deck-cannon");
  if (cannon) {
    cannon.addEventListener("click", () => {
      cannon.classList.remove("firing");
      // force reflow so the animation restarts on subsequent clicks
      void cannon.offsetWidth;
      cannon.classList.add("firing");
      setTimeout(() => cannon.classList.remove("firing"), 1500);
    });
  }

  // --- Wheel spin: rotate on click, smooth-scroll to top ---
  const wheel = document.querySelector(".deck-wheel");
  if (wheel) {
    wheel.addEventListener("click", (e) => {
      e.preventDefault();
      wheel.classList.remove("spinning");
      void wheel.offsetWidth;
      wheel.classList.add("spinning");
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => wheel.classList.remove("spinning"), 800);
    });
  }
})();
