"use client";
import gsap from "gsap";
import { ReactLenis } from "lenis/dist/lenis-react";
import { useEffect, useRef } from "react";

const LenisProvider = () => {
    const lenisRef = useRef<any | null>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => gsap.ticker.remove(update);
    }, []);

    return <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />;
};

export default LenisProvider;
