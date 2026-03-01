// MOBILE MENU TOGGLE
const menuToggle = document.getElementById('mobile-menu');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
});

// CLOSE MENU WHEN A LINK IS CLICKED
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
    });
});

// --- BACKGROUND SLIDER LOGIC ---
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    
    // Move to next slide (loop back to 0 if at the end)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Add active class to new slide
    slides[currentSlide].classList.add('active');
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// --- COUNTER ANIMATION LOGIC ---
const counters = document.querySelectorAll('.counter');
const speed = 2000; // The lower the number, the faster the count

const startCounters = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Determine the increment based on the target size
                const inc = target / speed;

                if (count < target) {
                    // Add the increment and call again
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    // Ensure it ends on the exact target number + the plus sign if needed
                    counter.innerText = target + "+";
                }
            };

            updateCount();
            // Stop observing once the animation has run once
            observer.unobserve(counter);
        }
    });
};

// Create the observer
const counterObserver = new IntersectionObserver(startCounters, {
    threshold: 0.5 // Trigger when 50% of the element is visible
});

// Attach observer to each counter
counters.forEach(counter => counterObserver.observe(counter));