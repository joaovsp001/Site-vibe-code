document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Lógica Blindada do Timer de Urgência ---
    const banner = document.getElementById('urgency-banner');
    const timerDisplay = document.getElementById('timer-display');
    const timerMessage = document.getElementById('timer-message');
    
    if (banner && timerDisplay && timerMessage) {
        const DURATION_SECONDS = 3600; // 1 hora
        let endTime;
        const now = Math.floor(Date.now() / 1000); 

        try {
            const savedTime = localStorage.getItem('ofertaPremiumTime');
            endTime = parseInt(savedTime, 10);

            if (!endTime || isNaN(endTime)) {
                endTime = now + DURATION_SECONDS;
                localStorage.setItem('ofertaPremiumTime', endTime.toString());
            }
        } catch (e) {
            console.warn("Aviso: Navegador bloqueou storage.");
            endTime = now + DURATION_SECONDS;
        }

        const updateTimer = () => {
            const currentTime = Math.floor(Date.now() / 1000);
            let remainingTime = endTime - currentTime;

            if (remainingTime <= 0) {
                clearInterval(countdownInterval); 
                timerDisplay.style.display = "none"; 
                timerMessage.textContent = "⚠️ ÚLTIMA CHANCE: AS VAGAS ESTÃO QUASE ESGOTADAS!";
                banner.classList.add('expired'); 
                return;
            }

            const hours = Math.floor(remainingTime / 3600);
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            const formatTime = (time) => time.toString().padStart(2, '0');
            timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        };

        updateTimer();
        const countdownInterval = setInterval(updateTimer, 1000);
    }

    // --- 2. Lógica Refatorada do Carrossel (Usa scroll nativo) ---
    const track = document.getElementById('carouselTrack');
    if (track) {
        const nextBtn = document.querySelector('.next-btn');
        const prevBtn = document.querySelector('.prev-btn');

        nextBtn?.addEventListener('click', () => {
            // Rola para a direita usando a largura atual da caixa
            track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
        });

        prevBtn?.addEventListener('click', () => {
            // Rola para a esquerda
            track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
        });
    }
});