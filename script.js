document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Kursor Kustom ---
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Follower ada delaynya
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Efek hover pada elemen tertentu
    const hoverTargets = document.querySelectorAll('a, button, .tilt-card');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => document.body.classList.add('hover'));
        target.addEventListener('mouseleave', () => document.body.classList.remove('hover'));
    });

    // --- 2. Efek 3D Tilt pada Kartu ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
    
    // --- 3. Efek Magnet pada Tombol ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 4. Animasi Scroll dengan Staggered Effect ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up, .timeline-item');
    
    animatedElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

});

// Animasi tombol saat diklik
function animateButton(button) {
    const ripple = button.querySelector('div');
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.opacity = '1';
    
    setTimeout(() => {
        ripple.style.animation = '';
        ripple.style.opacity = '0';
        ripple.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 600);
}

// Animasi input saat fokus
document.querySelectorAll('.animated-input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.querySelector('.input-line').style.width = '100%';
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.querySelector('.input-line').style.width = '0';
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Animasi loading saat form submit
document.getElementById('contact-form-simulasi').addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('span');
    const icon = submitBtn.querySelector('i');
    
    // Simpan teks asli
    const originalText = btnText.textContent;
    const originalIcon = icon.className;
    
    // Ubah ke mode loading
    btnText.textContent = 'Mengirim...';
    icon.className = 'fas fa-spinner fa-spin me-2';
    submitBtn.disabled = true;
    
    // Animasi pulsing
    submitBtn.style.animation = 'pulse 1.5s infinite';
    
    // Reset setelah 3 detik (jika redirect tidak terjadi)
    setTimeout(() => {
        btnText.textContent = originalText;
        icon.className = originalIcon;
        submitBtn.disabled = false;
        submitBtn.style.animation = '';
    }, 3000);
});

// Animasi floating untuk label
document.querySelectorAll('.form-group').forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');
    
    // Cek jika input sudah ada isinya
    if (input.value) {
        label.style.color = 'var(--primary-color)';
        label.style.transform = 'translateY(-25px) scale(0.9)';
    }
    
    input.addEventListener('input', function() {
        if (this.value) {
            label.style.color = 'var(--primary-color)';
            label.style.transform = 'translateY(-25px) scale(0.9)';
        } else {
            label.style.color = '';
            label.style.transform = '';
        }
    });
});

// Animasi karakter count untuk textarea
const textarea = document.getElementById('pesan');
if (textarea) {
    // Tambahkan counter
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align: right; font-size: 0.8rem; color: rgba(255, 255, 255, 0.5); margin-top: 5px;';
    counter.textContent = '0/500';
    textarea.parentElement.appendChild(counter);
    
    textarea.addEventListener('input', function() {
        const count = this.value.length;
        counter.textContent = `${count}/500`;
        
        // Animasi warna berdasarkan panjang
        if (count > 400) {
            counter.style.color = '#ff9800';
        } else if (count > 450) {
            counter.style.color = '#f44336';
        } else {
            counter.style.color = 'rgba(255, 255, 255, 0.5)';
        }
        
        // Animasi bounce jika mendekati limit
        if (count === 495) {
            counter.style.animation = 'bounceIn 0.5s';
            setTimeout(() => counter.style.animation = '', 500);
        }
    });
}

