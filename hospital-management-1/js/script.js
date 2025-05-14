/**
 * HOSPITAL WEBSITE - ENHANCED JS
 * Features Added:
 * 1. Mobile-responsive navigation
 * 2. Smooth scrolling
 * 3. Scroll-to-top button
 * 4. Doctor appointment booking system
 * 5. Interactive testimonial slider
 * 6. Animated statistics counter
 * 7. Form validation with feedback
 * 8. Interactive health tools (BMI calculator)
 * 9. Department filtering system
 * 10. Emergency contact quick-access
 * 11. Dynamic current year in footer
 */

document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // 1. MOBILE NAVIGATION TOGGLE
    // ======================
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('fa-times');
            navbar.classList.remove('active');
        });
    });

    // ======================
    // 2. SMOOTH SCROLLING
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // 3. SCROLL-TO-TOP BUTTON
    // ======================
    const scrollTopBtn = document.querySelector('.scroll-top');
    window.addEventListener('scroll', function() {
        scrollTopBtn.classList.toggle('active', window.scrollY > 300);
        
        // Header shadow effect
        const header = document.querySelector('header');
        header.classList.toggle('shadow', window.scrollY > 0);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ======================
    // 4. APPOINTMENT BOOKING SYSTEM
    // ======================
    const bookButtons = document.querySelectorAll('.book-btn, .button[href="#contact"]');
    const appointmentForm = document.getElementById('appointment-form');
    
    // Initialize modal
    const initAppointmentModal = () => {
        const modalHTML = `
            <div class="appointment-modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>Book an Appointment</h3>
                    <form id="appointment-form">
                        <input type="text" placeholder="Full Name" required>
                        <input type="email" placeholder="Email" required>
                        <input type="tel" placeholder="Phone Number" required>
                        <select required>
                            <option value="">Select Department</option>
                            <option>Cardiology</option>
                            <option>Neurology</option>
                            <option>Pediatrics</option>
                        </select>
                        <input type="date" required>
                        <button type="submit" class="button">Confirm Appointment</button>
                    </form>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Modal functionality
        const modal = document.querySelector('.appointment-modal');
        const closeBtn = document.querySelector('.close-modal');
        
        bookButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.style.display = 'flex';
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    };
    initAppointmentModal();

    // ======================
    // 5. TESTIMONIAL SLIDER
    // ======================
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.review .box');
    
    if (testimonials.length > 0) {
        setInterval(() => {
            testimonials[currentTestimonial].classList.remove('active');
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].classList.add('active');
        }, 5000);
    }

    // ======================
    // 6. ANIMATED STATISTICS
    // ======================
    const statsSection = document.querySelector('.stats');
    const counters = document.querySelectorAll('.counter');
    
    if (statsSection) {
        const startCounters = () => {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / 100;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(startCounters, 20);
                } else {
                    counter.innerText = target + '+';
                }
            });
        };

        window.addEventListener('scroll', () => {
            if (window.scrollY > statsSection.offsetTop - 500) {
                startCounters();
            }
        });
    }

    // ======================
    // 7. FORM VALIDATION
    // ======================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Simple validation
            this.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '#ccc';
                }
            });

            if (isValid) {
                alert('Thank you for your message! We will contact you soon.');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // ======================
    // 8. BMI CALCULATOR
    // ======================
    const bmiCalculator = document.getElementById('bmi-calculator');
    if (bmiCalculator) {
        bmiCalculator.addEventListener('submit', function(e) {
            e.preventDefault();
            const height = parseFloat(this.querySelector('#height').value);
            const weight = parseFloat(this.querySelector('#weight').value);
            
            if (height && weight) {
                const bmi = (weight / ((height/100) ** 2)).toFixed(1);
                let result = '';
                
                if (bmi < 18.5) result = 'Underweight';
                else if (bmi < 25) result = 'Normal weight';
                else if (bmi < 30) result = 'Overweight';
                else result = 'Obese';
                
                document.getElementById('bmi-result').innerHTML = `
                    <p>Your BMI: <strong>${bmi}</strong></p>
                    <p>Category: <strong>${result}</strong></p>
                `;
            }
        });
    }

    // ======================
    // 9. DEPARTMENT FILTERING
    // ======================
    const filterButtons = document.querySelectorAll('.department-filter');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const department = this.getAttribute('data-department');
                
                document.querySelectorAll('.doctor-card').forEach(card => {
                    if (department === 'all' || card.getAttribute('data-department') === department) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // ======================
    // 10. EMERGENCY CONTACT
    // ======================
    const emergencyBtn = document.getElementById('emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            if (confirm('Call emergency services at 911?')) {
                window.location.href = 'tel:911';
            }
        });
    }

    // ======================
    // 11. DYNAMIC CURRENT YEAR
    // ======================
    document.getElementById('current-year').textContent = new Date().getFullYear();


});

// Additional helper functions
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}