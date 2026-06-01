document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. CUSTOM CURSOR (BALLOON FOLLOW & HOVER)
    ========================================== */
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Move the dot instantly under the pointer
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;

            // Outline follows smoothly with a slight delay
            // Reduced duration from 350ms to 150ms for better responsiveness
            cursorOutline.animate(
                {
                    left: `${x}px`,
                    top: `${y}px`
                },
                {
                    duration: 150,
                    fill: 'forwards'
                }
            );
        });

        // Enlarge cursor when hovering over buttons, links, and cards
        const hoverElements = document.querySelectorAll(
            'a, button, .copy-btn, .skill-card, .project-card, .cert-card, .timeline-card'
        );

        hoverElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(0, 242, 255, 0.1)';
                cursorOutline.style.borderColor = 'var(--accent-primary)';
            });

            elem.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '30px';
                cursorOutline.style.height = '30px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = 'rgba(0, 242, 255, 0.5)';
            });
        });
    }

    /* ==========================================
       2. COPY EMAIL FUNCTION
    ========================================== */
    const copyBtn = document.getElementById("copyEmail");
    const emailLink = document.querySelector(".email-link");
    const feedback = document.getElementById("copyFeedback");

    if (copyBtn && emailLink && feedback) {
        copyBtn.addEventListener("click", () => {
            const email = emailLink.textContent.trim();

            navigator.clipboard.writeText(email).then(() => {
                feedback.classList.add("show");

                setTimeout(() => {
                    feedback.classList.remove("show");
                }, 2000);
            });
        });
    }

    /* ==========================================
       3. SCROLL REVEAL ANIMATION (FIXED)
    ========================================== */
    const observerOptions = {
        threshold: 0.15, // Animation starts when 15% of the card becomes visible
        rootMargin: "0px 0px -50px 0px" // Adds bottom margin for a smoother reveal effect
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Directly make the element visible when it enters the viewport
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                obs.unobserve(entry.target); // Stop observing after first reveal
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".skill-card, .contact-card, .timeline-card, .project-card, .cert-card, .lang-card"
    );

    animatedElements.forEach(el => {
        // Initial hidden state before animation
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)"; // Slight upward lift effect
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

        observer.observe(el);
    });

});