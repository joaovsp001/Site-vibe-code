document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // 1. TIMER DE URGÊNCIA (blindado com localStorage)
    // =============================================
    const banner      = document.getElementById('urgency-banner');
    const timerDisplay = document.getElementById('timer-display');
    const timerMsg    = document.getElementById('timer-message');

    if (banner && timerDisplay && timerMsg) {
        const DURATION = 3600; // 1 hora em segundos
        let endTime;
        const now = Math.floor(Date.now() / 1000);

        try {
            const saved = localStorage.getItem('gb_timer_end');
            endTime = parseInt(saved, 10);
            if (!endTime || isNaN(endTime) || endTime < now) {
                endTime = now + DURATION;
                localStorage.setItem('gb_timer_end', endTime.toString());
            }
        } catch (e) {
            endTime = now + DURATION; // fallback se localStorage bloqueado
        }

        const pad = n => String(n).padStart(2, '0');

        const tick = () => {
            const remaining = endTime - Math.floor(Date.now() / 1000);

            if (remaining <= 0) {
                clearInterval(interval);
                timerDisplay.style.display = 'none';
                timerMsg.textContent = '⚠️ ÚLTIMA CHANCE — VAGAS QUASE ESGOTADAS!';
                banner.classList.add('expired');
                return;
            }

            const h = Math.floor(remaining / 3600);
            const m = Math.floor((remaining % 3600) / 60);
            const s = remaining % 60;
            timerDisplay.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;
        };

        tick();
        const interval = setInterval(tick, 1000);
    }


    // =============================================
    // 2. ANIMAÇÕES DE SCROLL (Intersection Observer)
    // =============================================
    const animateEls = document.querySelectorAll('[data-animate], [data-animate-delay]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animateEls.forEach(el => observer.observe(el));
    } else {
        // fallback para browsers sem IntersectionObserver
        animateEls.forEach(el => el.classList.add('visible'));
    }


    // =============================================
    // 3. LINKS DE CHECKOUT — troca centralizada
    // =============================================
    // Quando tiver o link da Hotmart/Kiwify, troque AQUI:
    const CHECKOUT_URL = 'LINK_CHECKOUT_AQUI';

    if (CHECKOUT_URL !== 'LINK_CHECKOUT_AQUI') {
        document.querySelectorAll('a[href="LINK_CHECKOUT_AQUI"]').forEach(btn => {
            btn.href = CHECKOUT_URL;
        });
    }


    // =============================================
    // 4. HIGHLIGHT ATIVO NO FAQ ao abrir
    // =============================================
    document.querySelectorAll('details.faq-item').forEach(detail => {
        detail.addEventListener('toggle', () => {
            if (detail.open) {
                // fecha os outros abertos
                document.querySelectorAll('details.faq-item').forEach(other => {
                    if (other !== detail && other.open) other.open = false;
                });
            }
        });
    });


    // =============================================
    // 5. TRACKING SIMPLES DE CTAs (console log)
    // =============================================
    document.querySelectorAll('[id^="cta-"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.id;
            // Aqui você pode integrar: gtag('event', 'cta_click', { cta_id: id });
            console.log(`[GB] CTA clicado: ${id}`);
        });
    });

});