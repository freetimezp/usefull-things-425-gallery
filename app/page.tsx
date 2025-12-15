"use client";
import Image from "next/image";

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

export default function Page() {
    return (
        <main className="my-[36.25svh] flex w-full flex-col items-center gap-[18.5svh]">
            {projects.map((project, index) => (
                <div key={index} className="flex h-fit w-[45vw] items-center overflow-hidden lg:w-[12.5vw]">
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
        </main>
    );
}
