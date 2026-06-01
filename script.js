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

            // డాట్ వెంటనే పాయింటర్ కింద మూవ్ అవుతుంది
            cursorDot.style.left = `${x}px`;
            cursorDot.style.top = `${y}px`;

            // అవుట్‌లైన్ కొద్దిగా స్మూత్ లాగ్‌తో ఫాలో అవుతుంది (350ms నుండి 150ms కి తగ్గించాను - లాగ్ లేకుండా ఉండటానికి)
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

        // బటన్స్, లింక్స్ మరియు కార్డ్స్ పైకి వెళ్ళినప్పుడు కర్సర్ పెద్దదయ్యే ఎఫెక్ట్
        const hoverElements = document.querySelectorAll('a, button, .copy-btn, .skill-card, .project-card, .cert-card, .timeline-card');
        
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
        threshold: 0.15, // 15% కార్డు స్క్రీన్‌పై కనిపించగానే అనిమేషన్ రన్ అవుతుంది
        rootMargin: "0px 0px -50px 0px" // కింద కొద్దిగా మార్జిన్ ఇస్తే అనిమేషన్ లుక్ బాగుంటుంది
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // క్లాస్ యాడ్ చేయకుండా నేరుగా ఇక్కడే ఒపాసిటీ 1 చేస్తున్నాం (ఫిక్స్)
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                obs.unobserve(entry.target); // ఒకసారి కనిపించాక మళ్ళీ అబ్జర్వర్ రన్ అవ్వదు
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        ".skill-card, .contact-card, .timeline-card, .project-card, .cert-card, .lang-card"
    );

    animatedElements.forEach(el => {
        // స్టార్టింగ్‌లో కార్డ్స్ కనిపించకుండా దాచడం
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)"; // 20px నుండి 30px కి మార్చాను, స్మూత్ లిఫ్ట్ ఎఫెక్ట్ కోసం
        el.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

        observer.observe(el);
    });

});