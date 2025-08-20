// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    // Toggle del menú móvil
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });



    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.menu-item, .contact-item, .feature').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Formulario de contacto con WhatsApp
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los datos del formulario
            const formData = new FormData(this);
            const nombre = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const telefono = this.querySelector('input[type="tel"]').value;
            const mensaje = this.querySelector('textarea').value;
            
            // Validar campos requeridos
            if (!nombre || !email || !mensaje) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
                         // Crear mensaje para WhatsApp
             const whatsappMessage = `🍕 *Nuevo Pedido/Consulta - La Mia Mamma*
 
 👤 *Nombre:* ${nombre}
 📧 *Email:* ${email}
 📱 *Teléfono:* ${telefono || 'No proporcionado'}
 💬 *Mensaje:* ${mensaje}
 
 ---
 Enviado desde la página web de La Mia Mamma`;

            // Codificar el mensaje para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Número de WhatsApp
            const whatsappNumber = '+56928953758';
            
            // Crear URL de WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Cambiar texto del botón
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Abriendo WhatsApp...';
            submitBtn.disabled = true;
            
            // Abrir WhatsApp después de un breve delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Resetear formulario
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Mostrar confirmación
                alert('¡Perfecto! Se abrirá WhatsApp con tu mensaje. Si no se abre automáticamente, puedes copiar el número: +56 9 28953758');
            }, 1000);
        });
    }

    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Contador animado para precios (opcional)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = '$' + Math.floor(start).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = '$' + target.toLocaleString();
            }
        }
        updateCounter();
    }

    // Animar precios cuando entren en vista
    const priceObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceElement = entry.target;
                const priceText = priceElement.textContent.replace(/[^\d]/g, '');
                const priceNumber = parseInt(priceText);
                
                if (priceNumber && !priceElement.classList.contains('animated')) {
                    priceElement.classList.add('animated');
                    animateCounter(priceElement, priceNumber);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.price').forEach(price => {
        priceObserver.observe(price);
    });

    // Efecto hover mejorado para las tarjetas del menú
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Lazy loading para imágenes
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    // Marcar imágenes para lazy loading
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

        // Botón flotante de WhatsApp
    const whatsappFloatBtn = document.createElement('a');
    whatsappFloatBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
          whatsappFloatBtn.href = 'https://wa.me/56928953758?text=🍕 Hola! Me gustaría hacer un pedido o consultar sobre las pizzas de La Mia Mamma';
    whatsappFloatBtn.target = '_blank';
    whatsappFloatBtn.className = 'whatsapp-float';
    whatsappFloatBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-decoration: none;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        animation: pulse 2s infinite;
    `;
    
    document.body.appendChild(whatsappFloatBtn);

    // Botón flotante de llamada telefónica
    const phoneFloatBtn = document.createElement('a');
    phoneFloatBtn.innerHTML = '<i class="fas fa-phone"></i>';
    phoneFloatBtn.href = 'tel:+56928953758';
    phoneFloatBtn.className = 'phone-float';
    phoneFloatBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 90px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        text-decoration: none;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
        animation: pulsePhone 2s infinite;
    `;
    
    document.body.appendChild(phoneFloatBtn);

    // Botón de "Volver arriba"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 160px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #d4af37 0%, #b8941f 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(backToTopBtn);

    // Mostrar/ocultar botón de volver arriba
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });

    // Funcionalidad del botón volver arriba
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Efecto hover para el botón
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.4)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
    });
});

// Estilos adicionales para el menú móvil
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 80px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 80px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 1rem 0;
        }
        
        .nav-menu a {
            font-size: 1.2rem;
            padding: 1rem 2rem;
            display: block;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    }
`;
document.head.appendChild(style);
