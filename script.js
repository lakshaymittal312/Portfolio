// ✅ Navbar Smooth Scroll
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // Close mobile menu if open
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.getElementById("menuToggle");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
});

// ✅ Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });
}

// ✅ Navbar Scroll Effect
const headerSection = document.querySelector(".header-section");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    headerSection.classList.add("scrolled");
  } else {
    headerSection.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ✅ Contact Form Backend Submit
const form = document.getElementById("contactForm");
const formMsg = document.getElementById("formMsg");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    formMsg.innerText = "Sending...";
    formMsg.style.color = "var(--text-accent)";

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        formMsg.innerText = "✅ Message sent successfully!";
        formMsg.style.color = "#4ade80";
        form.reset();
        setTimeout(() => {
          formMsg.innerText = "";
        }, 5000);
      } else {
        formMsg.innerText = "❌ " + (result.message || "Something went wrong!");
        formMsg.style.color = "#f87171";
      }
    } catch (err) {
      formMsg.innerText = "❌ Server error. Try again later!";
      formMsg.style.color = "#f87171";
    }
  });
}

// ✅ Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all cards for animation
document.querySelectorAll(".card").forEach((card) => {
  observer.observe(card);
});
