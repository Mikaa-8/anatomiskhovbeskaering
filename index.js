// Safety: Always hide lightbox overlay on page load
document.addEventListener('DOMContentLoaded', function() {
    var lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('open');
        lightbox.style.display = '';
    }
});
// menu
const burger = document.querySelector(".burger");
const overlay = document.querySelector(".menu-overlay");

if(burger){
    burger.addEventListener("click", () => {
        overlay.classList.toggle("open");
    });
}

// close overlay when clicking a link
document.querySelectorAll(".menu-overlay a").forEach(link=>{
    link.addEventListener("click",()=>{
        overlay.classList.remove("open");
    });
});

// reveal animation with stagger
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("visible");
            // stagger child elements
            const children = entry.target.querySelectorAll("h2, h3, ul, p");
            children.forEach((child, index) => {
                child.style.opacity = "0";
                child.style.animation = `fadeInUp 0.5s cubic-bezier(.25,.46,.45,.94) forwards`;
                child.style.animationDelay = `${0.12 + index * 0.05}s`;
            });
        }
    });
},{threshold:0.15});

reveals.forEach(el=>observer.observe(el));


// Gallery lightbox logic (simple, robust)
document.addEventListener('DOMContentLoaded', function() {
    const galleryLinks = document.querySelectorAll('.gallery-item');
    const videoDescription = document.getElementById('videoDescription');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxVideo = document.getElementById('lightboxVideo');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!galleryLinks.length || !lightbox || !lightboxImg || !lightboxClose) return;

    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const img = link.querySelector('img');
            const video = link.querySelector('video');

            if (img) {
                lightboxImg.style.display = 'block';
                if (lightboxVideo) {
                    lightboxVideo.style.display = 'none';
                    lightboxVideo.pause();
                    lightboxVideo.removeAttribute('src');
                    lightboxVideo.load();
                }
                if (lightboxCaption) {
                    const descriptionId = link.getAttribute('data-description');
                    if (descriptionId) {
                        const descriptionElem = document.getElementById(descriptionId);
                        if (descriptionElem) {
                            lightboxCaption.innerHTML = descriptionElem.innerHTML;
                            lightboxCaption.style.display = 'block';
                        } else {
                            lightboxCaption.style.display = 'none';
                            lightboxCaption.innerHTML = '';
                        }
                    } else {
                        lightboxCaption.style.display = 'none';
                        lightboxCaption.innerHTML = '';
                    }
                }
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }

            if (video && lightboxVideo) {
                lightboxImg.style.display = 'none';
                lightboxImg.src = '';
                lightboxVideo.style.display = 'block';
                lightboxVideo.src = link.getAttribute('href') || '';
                lightboxVideo.load();
                lightboxVideo.play().catch(() => {});
                if (lightboxCaption) {
                    if (videoDescription) {
                        lightboxCaption.innerHTML = videoDescription.innerHTML;
                        lightboxCaption.style.display = 'block';
                    } else {
                        lightboxCaption.style.display = 'none';
                        lightboxCaption.innerHTML = '';
                    }
                }
            }

            lightbox.classList.add('open');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
        lightboxImg.style.display = 'block';
        if (lightboxVideo) {
            lightboxVideo.pause();
            lightboxVideo.removeAttribute('src');
            lightboxVideo.load();
            lightboxVideo.style.display = 'none';
        }
        if (lightboxCaption) {
            lightboxCaption.style.display = 'none';
            lightboxCaption.innerHTML = '';
        }
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeLightbox();
    });
});