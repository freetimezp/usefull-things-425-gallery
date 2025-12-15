"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const projects = [
    {
        src: "/img1.jpg",
        name: "Title One",
    },
    {
        src: "/img2.jpg",
        name: "Title Two",
    },
    {
        src: "/img3.jpg",
        name: "Title Three",
    },
    {
        src: "/img4.jpg",
        name: "Title Four",
    },
    {
        src: "/img5.jpg",
        name: "Title Five",
    },
];

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Page() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const handleScroll = () => {
            const viewportCenter = window.innerHeight / 2;
            let closestIndex = 0;
            let minDistance = Infinity;

            containerRefs.current.forEach((ref, index) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    const elementCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(viewportCenter - elementCenter);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                }
            });

            setActiveIndex(closestIndex);
        };

        handleScroll();

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>(".list-container").forEach((container) => {
            const scaleTl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });

            scaleTl
                .fromTo(
                    container,
                    {
                        scale: 0.5,
                    },
                    {
                        scale: 2,
                        ease: "none",
                    }
                )
                .to(container, {
                    scale: 0.5,
                    ease: "none",
                });
        });
    });

    return (
        <main className="my-[36.25svh] flex w-full flex-col items-center gap-[18.5svh]">
            {projects.map((project, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        containerRefs.current[index] = el;
                    }}
                    className="list-container flex h-fit w-[45vw] items-center overflow-hidden lg:w-[12.5vw]"
                >
                    <div className="relative h-[27.5svh] w-full">
                        <Image
                            src={project.src}
                            alt="product"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            ))}

            <div className="fixed bottom-5 left-0 px-5 flex w-full justify-between">
                <div className="flex gap-5">
                    <span>({String(activeIndex + 1).padStart(2, "0")})</span>
                    <span>{projects[activeIndex].name}</span>
                </div>
                <span>Scroll</span>
            </div>
        </main>
    );
}
