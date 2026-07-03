

window.addEventListener("load", () => {

    const animations = [
        { selector: ".top-tags", class: "from-top", delay: 0 },
        { selector: ".left h1", class: "from-left", delay: 0.3 },
        { selector: ".desc", class: "from-left", delay: 0.6 },
        { selector: ".live-line", class: "from-bottom", delay: 0.9 },
        { selector: ".buttons", class: "zoom-in", delay: 1.2 },
        { selector: ".site-link", class: "from-bottom", delay: 1.5 },
        { selector: ".right", class: "from-right", delay: 0.6 },
        { selector: ".stats", class: "from-bottom", delay: 1.8 },
    ];

    animations.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
            el.style.animationDelay = `${item.delay}s`;
            el.classList.add(item.class);
        }
    });

    // ===== HIDE INTRO =====
    setTimeout(() => {
        const intro = document.getElementById("intro");
        const site = document.getElementById("real-site");

        intro.classList.add("smooth-out");

        setTimeout(() => {
            intro.style.display = "none";
            site.style.display = "block";
            initScrollAnimations(); 
        }, 1200);
    }, 3800);
});


// ===============================
// SCROLL REVEAL (SECTIONS)
// ===============================
function initScrollAnimations() {
    const elements = document.querySelectorAll(
        ".slide-in-left, .slide-in-right, .slide-in-up"
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translate(0)";
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
}


// ===============================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".ul-list li");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(item => {
        item.classList.remove("active");

        const link = item.querySelector("a");
        if (link && link.getAttribute("href") === `#${current}`) {
            item.classList.add("active");
        }
    });
});

// ===============================
document.querySelectorAll('.ul-list li, a[href^="#"]').forEach(el => {
    el.addEventListener("click", function (e) {
        const anchor = this.tagName === 'LI' ? this.querySelector('a') : this;
        if (!anchor) return;
        
        const href = anchor.getAttribute("href");
        if (!href || !href.startsWith("#")) return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 120,
                behavior: "smooth"
            });
        }
    });
});

// ===============================
// CONTACT FORM (FormSubmit → Gmail)
// ===============================
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const formSubmitBtn = document.getElementById("form-submit-btn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const honey = contactForm.querySelector('input[name="_honey"]');
        if (honey && honey.value) return;

        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = "Sending...";
        formStatus.textContent = "";
        formStatus.className = "form-status";

        const formData = {
            name: contactForm.querySelector("#user_name").value.trim(),
            email: contactForm.querySelector("#user_email").value.trim(),
            message: contactForm.querySelector("#user_message").value.trim(),
            _subject: "New message from your portfolio website",
            _template: "table",
        };

        try {
            const response = await fetch("https://formsubmit.co/ajax/balapranav3010@gmail.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to send");

            formStatus.textContent = "Message sent! I'll get back to you soon.";
            formStatus.classList.add("success");
            contactForm.reset();
        } catch {
            formStatus.textContent = "Something went wrong. Please email me directly at balapranav3010@gmail.com";
            formStatus.classList.add("error");
        } finally {
            formSubmitBtn.disabled = false;
            formSubmitBtn.textContent = "Send Message";
        }
    });
}
