(() => {
    function initProcessSlider() {
        const track = document.querySelector('[data-process-track]');
        if (!track) return;

        const slides = Array.from(track.querySelectorAll('[data-process-slide]'));
        if (slides.length === 0) return;

        const dotsContainer = document.querySelector('[data-process-dots]');
        const prevBtn = document.querySelector('[data-process-prev]');
        const nextBtn = document.querySelector('[data-process-next]');

        let activeIndex = 0;

        function setActive(index) {
            activeIndex = Math.max(0, Math.min(slides.length - 1, index));

            if (dotsContainer) {
                Array.from(dotsContainer.children).forEach((dot, dotIndex) => {
                    const isActive = dotIndex === activeIndex;
                    dot.dataset.active = isActive ? 'true' : 'false';
                    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
                });
            }

            if (prevBtn) prevBtn.disabled = activeIndex === 0;
            if (nextBtn) nextBtn.disabled = activeIndex === slides.length - 1;
        }

        function scrollToIndex(index) {
            const targetIndex = Math.max(0, Math.min(slides.length - 1, index));
            slides[targetIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
            setActive(targetIndex);
        }

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'process-dot';
                dot.setAttribute('aria-label', `Step ${index + 1}`);
                dot.addEventListener('click', () => scrollToIndex(index));
                dotsContainer.appendChild(dot);
            });
        }

        prevBtn?.addEventListener('click', () => scrollToIndex(activeIndex - 1));
        nextBtn?.addEventListener('click', () => scrollToIndex(activeIndex + 1));

        let scrollTimeout = null;
        function updateFromScroll() {
            const trackRect = track.getBoundingClientRect();
            const centerX = trackRect.left + trackRect.width / 2;

            let bestIndex = 0;
            let bestDistance = Infinity;
            slides.forEach((slide, index) => {
                const rect = slide.getBoundingClientRect();
                const slideCenter = rect.left + rect.width / 2;
                const distance = Math.abs(slideCenter - centerX);
                if (distance < bestDistance) {
                    bestDistance = distance;
                    bestIndex = index;
                }
            });

            setActive(bestIndex);
        }

        track.addEventListener(
            'scroll',
            () => {
                if (scrollTimeout) window.clearTimeout(scrollTimeout);
                scrollTimeout = window.setTimeout(updateFromScroll, 80);
            },
            { passive: true }
        );

        setActive(0);
        updateFromScroll();
    }

    window.addEventListener('load', initProcessSlider);
})();

