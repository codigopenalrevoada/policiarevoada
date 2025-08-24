// SISTEMA DE PROTEÇÃO AVANÇADA - CALCULADORA PENAL
// Este arquivo contém proteções contra inspeção de código fonte

(function() {
    'use strict';
    
    // Proteção contra inspeção de variáveis
    const _0x1a2b = {
        'check': function() {
            return !window.outerHeight || !window.outerWidth;
        },
        'detect': function() {
            const _0x3c4d = window.outerHeight - window.innerHeight;
            const _0x5e6f = window.outerWidth - window.innerWidth;
            return _0x3c4d > 160 || _0x5e6f > 160;
        }
    };
    
    // Proteção contra console
    const _0x7g8h = {
        'log': console.log,
        'warn': console.warn,
        'error': console.error,
        'info': console.info
    };
    
    // Sobrescrever console quando DevTools estiver aberto
    function _0x9i0j() {
        if (_0x1a2b.detect()) {
            console.log = function() {};
            console.warn = function() {};
            console.error = function() {};
            console.info = function() {};
            console.clear = function() {};
            
            // Mostrar mensagem de aviso
            document.body.innerHTML = '<div style="text-align:center;padding:50px;font-size:24px;color:red;">⚠️ ACESSO NEGADO ⚠️<br><br>Este site está protegido contra inspeção de código.</div>';
        }
    }
    
    // Verificar a cada 100ms
    setInterval(_0x9i0j, 100);
    
    // Proteção contra debugger
    setInterval(function() {
        if (_0x1a2b.detect()) {
            debugger;
        }
    }, 50);
    
    // Proteção contra inspeção de elementos
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            return false;
        }
    });
    
    // Proteção contra clique com botão direito
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Proteção contra teclas de atalho
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
            (e.ctrlKey && e.key === 'u')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Proteção contra inspeção de propriedades
    Object.defineProperty(document, 'hidden', {
        get: function() {
            return _0x1a2b.detect();
        }
    });
    
    // Proteção contra inspeção de elementos DOM
    const _0xk1l2 = document.querySelector;
    const _0xm3n4 = document.querySelectorAll;
    
    document.querySelector = function(selector) {
        if (_0x1a2b.detect() && selector.includes('script')) {
            return null;
        }
        return _0xk1l2.call(this, selector);
    };
    
    document.querySelectorAll = function(selector) {
        if (_0x1a2b.detect() && selector.includes('script')) {
            return [];
        }
        return _0xm3n4.call(this, selector);
    };
    
    // Proteção contra inspeção de variáveis globais
    window.addEventListener('load', function() {
        if (_0x1a2b.detect()) {
            window.location.href = 'about:blank';
        }
    });
    
    // Proteção contra inspeção de código fonte
    window.addEventListener('beforeunload', function() {
        if (_0x1a2b.detect()) {
            document.body.innerHTML = '';
        }
    });
    
})(); 