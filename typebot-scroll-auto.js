// Typebot Scroll Automático Ultra-Otimizado para jsDelivr
// Versão compacta e eficiente para carregamento rápido
// @version 1.0.0
// @author Marcelo Agent Digital

(function() {
    'use strict';
    
    // Configuração otimizada
    const config = {
        interval: 3000,        // 3 segundos
        scrollStep: 300,       // pixels por scroll
        maxScrolls: 10,        // máximo de scrolls
        selectors: [
            '.typebot-container',
            '[data-testid="guest"]',
            '.bubble-container',
            'body'
        ]
    };
    
    let scrollCount = 0;
    let intervalId = null;
    
    // Função de scroll otimizada
    function smoothScroll() {
        if (scrollCount >= config.maxScrolls) {
            clearInterval(intervalId);
            return;
        }
        
        // Encontra container ativo
        const container = config.selectors
            .map(sel => document.querySelector(sel))
            .find(el => el && el.scrollHeight > el.clientHeight);
            
        if (container) {
            const currentScroll = container.scrollTop;
            const maxScroll = container.scrollHeight - container.clientHeight;
            
            if (currentScroll < maxScroll - 50) {
                container.scrollTo({
                    top: currentScroll + config.scrollStep,
                    behavior: 'smooth'
                });
                scrollCount++;
            }
        }
    }
    
    // Inicialização otimizada
    function initScroll() {
        // Aguarda carregamento
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initScroll);
            return;
        }
        
        // Aguarda Typebot aparecer
        setTimeout(() => {
            intervalId = setInterval(smoothScroll, config.interval);
        }, 1000);
    }
    
    initScroll();
    
    // Cleanup automático
    window.addEventListener('beforeunload', () => {
        if (intervalId) clearInterval(intervalId);
    });
})();
