import { useEffect, useRef, useState } from "react";

export const UseIntersectionObserver = (optinos?: IntersectionObserverInit) => {
    const [isIntersecting, setIsIntersecting] = useState(false);

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, optinos);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => observer.disconnect();
    }, [optinos]);

    return { targetRef, isIntersecting };
};
