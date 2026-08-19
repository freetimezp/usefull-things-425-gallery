const characters = [
    {
        name: "Dreamer",
        description: "A little imagination can create a very big world.",
        image: "./assets/images/cartoon-01.png",
    },
    {
        name: "Explorer",
        description: "Every strange road leads somewhere interesting.",
        image: "./assets/images/cartoon-02.png",
    },
    {
        name: "Creator",
        description: "Ideas become real when you build them.",
        image: "./assets/images/cartoon-03.png",
    },
    {
        name: "Wonderer",
        description: "Be curious - is always new.",
        image: "./assets/images/cartoon-04.png",
    },
    {
        name: "Playmaker",
        description: "Best ideas start with play.",
        image: "./assets/images/cartoon-05.png",
    },
    {
        name: "Visionary",
        description: "See the world differently.",
        image: "./assets/images/cartoon-06.png",
    },
];

const character = document.querySelector(".character");
const characterImage = document.querySelector(".character img");

const characterName = document.querySelector(".info-content h2");
const characterDescription = document.querySelector(".info-content p");

const currentCounter = document.querySelector(".counter-current");

const galleryItems = document.querySelectorAll(".gallery-item");

let currentIndex = 0;
let isAnimating = false;

/* ==========================================
   LOADER
========================================== */

const loader = document.querySelector(".loader");
const loaderNumber = document.querySelector(".loader-number");
const loaderProgress = document.querySelector(".loader-line span");

const loaderObject = {
    value: 0,
};

gsap.to(loaderObject, {
    value: 100,
    duration: 1.8,
    ease: "power2.out",

    onUpdate: () => {
        loaderNumber.textContent = Math.round(loaderObject.value)
            .toString()
            .padStart(2, "0");

        loaderProgress.style.width = `${loaderObject.value}%`;
    },

    onComplete: () => {
        introAnimation();
    },
});

/* ==========================================
   INTRO
========================================== */

function introAnimation() {
    const tl = gsap.timeline();

    tl.to(loader, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
    })

        .from(
            ".header > *",
            {
                y: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            },
            "-=0.5",
        )

        .from(
            ".title-line-1",
            {
                x: -100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            },
            "-=0.5",
        )

        .from(
            ".title-line-2",
            {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            },
            "<",
        )

        .from(
            ".character-inner",
            {
                scale: 0.65,
                opacity: 0,
                rotate: -8,
                duration: 1.4,
                ease: "elastic.out(1, 0.65)",
            },
            "-=0.7",
        )

        .from(
            ".character-info",
            {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            },
            "-=0.7",
        )

        .from(
            ".gallery-item",
            {
                y: 50,
                opacity: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: "power3.out",
            },
            "-=0.6",
        )

        .from(
            ".side-text, .counter, .scroll",
            {
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
            },
            "-=0.4",
        );
}

/* ==========================================
   CHARACTER CHANGE
========================================== */

function changeCharacter(index) {
    if (index === currentIndex || isAnimating) return;

    isAnimating = true;

    const data = characters[index];

    const tl = gsap.timeline({
        onComplete: () => {
            currentIndex = index;
            isAnimating = false;
        },
    });

    tl.to(
        characterImage,
        {
            x: index > currentIndex ? -100 : 100,
            rotate: index > currentIndex ? -8 : 8,
            scale: 1.1,
            opacity: 0,
            duration: 0.45,
            ease: "power3.in",
        },
        0,
    )

        .to(
            ".info-content",
            {
                y: 15,
                opacity: 0,
                duration: 0.25,
            },
            0,
        )

        .set(characterImage, {
            attr: {
                src: data.image,
            },
            x: index > currentIndex ? 100 : -100,
            rotate: index > currentIndex ? 8 : -8,
        })

        .set(".info-content h2", {
            textContent: data.name,
        })

        .set(".info-content p", {
            textContent: data.description,
        })

        .set(currentCounter, {
            textContent: String(index + 1).padStart(2, "0"),
        })

        .to(characterImage, {
            x: 0,
            rotate: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
        })

        .to(
            ".info-content",
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power3.out",
            },
            "-=0.55",
        );

    galleryItems.forEach((item, i) => {
        item.classList.toggle("active", i === index);
    });
}

/* ==========================================
   NAVIGATION
========================================== */

galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
        const index = Number(item.dataset.index);

        changeCharacter(index);
    });
});

/* ==========================================
   MOUSE PARALLAX
========================================== */

const characterInner = document.querySelector(".character-inner");

const moveX = gsap.quickTo(characterInner, "x", {
    duration: 0.7,
    ease: "power3.out",
});

const moveY = gsap.quickTo(characterInner, "y", {
    duration: 0.7,
    ease: "power3.out",
});

const rotateX = gsap.quickTo(characterInner, "rotationX", {
    duration: 0.7,
    ease: "power3.out",
});

const rotateY = gsap.quickTo(characterInner, "rotationY", {
    duration: 0.7,
    ease: "power3.out",
});

window.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    moveX(x * 35);
    moveY(y * 25);

    rotateX(-y * 5);
    rotateY(x * 7);
});

/* ==========================================
   CHARACTER FLOAT
========================================== */

gsap.to(characterImage, {
    y: -12,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
});

/* ==========================================
   BACKGROUND PARALLAX
========================================== */

window.addEventListener("mousemove", (event) => {
    const x = event.clientX / window.innerWidth - 0.5;
    const y = event.clientY / window.innerHeight - 0.5;

    gsap.to(".blob-1", {
        x: x * 35,
        y: y * 25,
        duration: 1.5,
        ease: "power3.out",
        overwrite: true,
    });

    gsap.to(".blob-2", {
        x: -x * 45,
        y: -y * 30,
        duration: 1.8,
        ease: "power3.out",
        overwrite: true,
    });

    gsap.to(".blob-3", {
        x: x * 25,
        y: -y * 20,
        duration: 2,
        ease: "power3.out",
        overwrite: true,
    });
});

window.addEventListener("resize", () => location.reload());
