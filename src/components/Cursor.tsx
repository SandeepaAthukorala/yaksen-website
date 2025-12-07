"use client";

import React, { useEffect, useRef } from "react";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const moveCursor = (e: MouseEvent) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        };

        const handleHover = () => {
            cursor.classList.add("hovered");
        };

        const handleLeave = () => {
            cursor.classList.remove("hovered");
        };

        window.addEventListener("mousemove", moveCursor);

        // Add hover effect to interactive elements
        const interactiveElements = document.querySelectorAll("a, button, input, textarea, select, .cursor-pointer");
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, []);

    return <div ref={cursorRef} className="cursor-dot hidden md:block" />;
}
