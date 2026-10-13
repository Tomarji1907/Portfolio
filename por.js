/* =========================================
   YASH TOMAR — PORTFOLIO INTERACTIONS
========================================= */

/* Floating background particles */
const particleContainer = document.getElementById("particles");

if (particleContainer) {
  for (let i = 0; i < 55; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 9 + Math.random() * 17 + "s";
    particle.style.animationDelay = -Math.random() * 20 + "s";
    particle.style.opacity = 0.12 + Math.random() * 0.35;
    particleContainer.appendChild(particle);
  }
}

/* Mobile navigation */
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

function closeMenu() {
  if (!navMenu || !menuBtn) return;

  navMenu.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");

  const icon = menuBtn.querySelector("i");
  if (icon) {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
}

if (menuBtn && navMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));

    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-bars", !isOpen);
      icon.classList.toggle("fa-xmark", isOpen);
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeProjectModal();
  }
});

/* Hero typing text */
const typingText = document.getElementById("typingText");

const typingWords = [
  "Web Development Learner",
  "Comfortable with HTML",
  "Improving my CSS",
  "Learning JavaScript",
  "Building practical projects",
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  if (!typingText) return;

  const currentWord = typingWords[wordIndex];

  if (!deleting) {
    charIndex++;
    typingText.textContent = currentWord.slice(0, charIndex);

    if (charIndex >= currentWord.length) {
      deleting = true;
      window.setTimeout(typeEffect, 1550);
      return;
    }
  } else {
    charIndex--;
    typingText.textContent = currentWord.slice(0, charIndex);

    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }

  window.setTimeout(typeEffect, deleting ? 35 : 75);
}

if (typingText) typeEffect();

/* Reveal sections on scroll */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -25px 0px",
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

/* Animate skill bars when the skills section appears */
const skillSection = document.getElementById("skills");

function animateSkillBars() {
  document.querySelectorAll(".progress i[data-width]").forEach((bar) => {
    bar.style.width = bar.dataset.width;
  });
}

if (skillSection && "IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkillBars();
          skillObserver.disconnect();
        }
      });
    },
    { threshold: 0.15 },
  );

  skillObserver.observe(skillSection);
} else {
  animateSkillBars();
}

/* Cat sleeps, tail swishes through CSS, eyes occasionally open */
const sleepingCat = document.getElementById("sleepingCat");

if (sleepingCat) {
  let catAwake = false;
  let catTimer;

  function blinkCat() {
    catAwake = !catAwake;
    sleepingCat.classList.toggle("cat-awake", catAwake);

    const nextDelay = catAwake ? 650 : 2200 + Math.random() * 2200;

    catTimer = window.setTimeout(blinkCat, nextDelay);
  }

  catTimer = window.setTimeout(blinkCat, 1800);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      window.clearTimeout(catTimer);
    } else {
      window.clearTimeout(catTimer);
      catTimer = window.setTimeout(blinkCat, 900);
    }
  });
}

/* Rotating task text in the studio */
const robotTask = document.getElementById("robotTask");

if (robotTask) {
  const tasks = [
    "Improving the page layout...",
    "Practising JavaScript basics...",
    "Refining responsive styles...",
    "Building one feature at a time...",
    "Testing a new interface idea...",
  ];

  let taskIndex = 0;

  window.setInterval(() => {
    taskIndex = (taskIndex + 1) % tasks.length;
    robotTask.textContent = tasks[taskIndex];
  }, 3000);
}

/* Project information modal */
const projectDetails = {
  todo: {
    code: "P / 01",
    type: "WEB APPLICATION",
    title: "To-Do Web App",
    description:
      "A task-management project designed to practise clear page structure, useful task states and a simple everyday workflow.",
    features: [
      "Organised task-list interface",
      "Readable task states and visual feedback",
      "Practise responsive layout and interaction",
      "Improve the experience through testing",
    ],
    tags: ["HTML", "CSS", "JavaScript practice"],
    status: "Personal learning project",
  },

  shop: {
    code: "P / 02",
    type: "FRONT-END UI",
    title: "Flipkart UI Clone",
    description:
      "A shopping-homepage-inspired design created to practise navigation, product presentation, spacing and responsive layouts.",
    features: [
      "Shopping-style header and search area",
      "Product-focused visual layout",
      "Reusable sections and styling",
      "Responsive design practice",
    ],
    tags: ["HTML", "CSS", "UI design"],
    status: "Front-end practice project",
  },

  portfolio: {
    code: "P / 03",
    type: "PERSONAL WEBSITE",
    title: "Developer Portfolio",
    description:
      "A personal website presenting my education, skills, selected projects and learning journey with a custom developer-studio illustration.",
    features: [
      "Responsive page sections",
      "Animated developer studio and wall display",
      "Honest skill descriptions",
      "Project information and contact form",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
    status: "Continuously improving",
  },
};

const projectModal = document.getElementById("projectModal");

function openProjectModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project || !projectModal) return;

  document.getElementById("modalCode").textContent = project.code;
  document.getElementById("modalType").textContent = project.type;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalStatus").textContent = project.status;

  const featureList = document.getElementById("modalFeatures");
  featureList.replaceChildren();

  project.features.forEach((feature) => {
    const item = document.createElement("li");
    item.textContent = feature;
    featureList.appendChild(item);
  });

  const tagContainer = document.getElementById("modalTags");
  tagContainer.replaceChildren();

  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.textContent = tag;
    tagContainer.appendChild(tagElement);
  });

  projectModal.hidden = false;
  document.body.style.overflow = "hidden";

  const closeButton = projectModal.querySelector(".modal-head button");

  if (closeButton) closeButton.focus();
}

function closeProjectModal() {
  if (!projectModal || projectModal.hidden) return;

  projectModal.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-project]").forEach((button) => {
  button.addEventListener("click", () => {
    openProjectModal(button.dataset.project);
  });
});

document.querySelectorAll("[data-close-project]").forEach((button) => {
  button.addEventListener("click", closeProjectModal);
});

/* Contact form: prepare an email draft */
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      if (formMessage) {
        formMessage.textContent = "Please complete all fields.";
      }
      return;
    }

    /*
      Replace this address with your real email address.
      The form opens the visitor's email application;
      it does not send email directly from the website.
    */
    const recipient = "sanatantomarji@gmail.com";

    const subject = encodeURIComponent("Portfolio contact from " + name);

    const body = encodeURIComponent(
      "Name: " +
        name +
        "\n" +
        "Email: " +
        email +
        "\n\n" +
        "Message:\n" +
        message,
    );

    if (formMessage) {
      formMessage.textContent =
        "Opening your email application to prepare the message...";
    }

    window.location.href =
      "mailto:" + recipient + "?subject=" + subject + "&body=" + body;
  });
}

/* Scroll progress and back-to-top button */
const scrollProgress = document.getElementById("scrollProgress");
const scrollTopButton = document.getElementById("scrollTop");

function updateScrollUI() {
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage =
    scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = percentage + "%";
  }

  if (scrollTopButton) {
    scrollTopButton.classList.toggle("show", window.scrollY > 500);
  }
}

window.addEventListener("scroll", updateScrollUI, { passive: true });
window.addEventListener("resize", updateScrollUI);
updateScrollUI();

if (scrollTopButton) {
  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Footer year */
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
