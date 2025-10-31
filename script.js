// Modal and main functionality
(function() {
    let scrollPosition = 0;

    function openModal() {
        scrollPosition = window.pageYOffset;
        const modal = document.getElementById('bookingModal');
        modal.style.display = 'block';
        modal.offsetHeight; // Trigger reflow
        modal.classList.add('show');
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.width = '100%';
    }

    function closeModal() {
        const modal = document.getElementById('bookingModal');
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition);
        }, 300);
    }

    // Initialize everything on DOM load
    document.addEventListener('DOMContentLoaded', function() {
        // Modal functionality
        const buttons = document.querySelectorAll('.package-btn');
        const closeBtn = document.querySelector('.kn-close');
        const modal = document.getElementById('bookingModal');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                openModal();
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) closeModal();
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal?.classList.contains('show')) {
                closeModal();
            }
        });

        // Form submission handling
        function handleFormSubmission(formId) {
            var form = document.getElementById(formId);
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action);
            xhr.send(formData);
            setTimeout(function() {
                window.location.href = 'https://crownpinekashmir.com/tour/thankyou.html';
            }, 1000);
        }

        // Form submission listeners
        const heroForm = document.getElementById('heroForm');
        const modalForm = document.getElementById('kn-booking-form');
        
        if (heroForm) {
            heroForm.addEventListener('submit', function(event) {
                event.preventDefault();
                handleFormSubmission('heroForm');
            });
        }
        
        if (modalForm) {
            modalForm.addEventListener('submit', function(event) {
                event.preventDefault();
                handleFormSubmission('kn-booking-form');
            });
        }

        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Set min date for date inputs
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        dateInputs.forEach(input => {
            input.min = today;
        });

        // Scroll animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Elements to animate
        const elements = document.querySelectorAll(
            '.package-card, .destination-card, .about-content, .feature, .about-image'
        );
        elements.forEach(el => observer.observe(el));

        // Handle window resize
        window.addEventListener('resize', () => {
            const navMenu = document.querySelector('.nav-menu');
            if (window.innerWidth > 768 && navMenu) {
                navMenu.classList.remove('active');
                document.querySelector('.menu-toggle')?.classList.remove('active');
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    });
})();






          
window.onload = function() {
  // Get the URL parameters
  const params = new URLSearchParams(window.location.search);
  // Retrieve the keyword from the 'keyword' parameter
  const keyword = params.get('keyword');

  // Replace only if the keyword is provided
  if (keyword) {
    // Get all elements by their id or class if needed
    const elements = document.querySelectorAll('#headline-text');

    // Loop through each element with the ID and replace text
    elements.forEach(function(element) {
      const originalText = element.innerText;
      const newText = originalText.replace(/Kashmir Tour Package/g, keyword); // Use /g for global replacement
      element.innerText = newText;
    });
  }
};



      