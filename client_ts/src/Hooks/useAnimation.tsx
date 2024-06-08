import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import './animation.css';
import Lenis from '@studio-freight/lenis';

export default function useAnimation(
    animateSelector:string,
    shownClass:string,
    scrollRefs?:(HTMLElement | null)[],
    clamp?:boolean
)
{
    const observer = useRef<IntersectionObserver>();
    const elementsRef = useRef<NodeListOf<Element>>();

    function refreshObserver()
    {
        elementsRef.current = document.querySelectorAll(animateSelector);
        if(observer.current)observer.current.disconnect();
        if(elementsRef.current.length == 0)return;
        observer.current = new IntersectionObserver((entries)=>{
            entries.forEach((element)=>{
                if(element.isIntersecting)
                {
                    element.target.classList.add(shownClass);
                    // element.target.animate({opacity:1,translate:0},{duration:1000,fill:"both"})
                }
                else
                {
                    element.target.classList.remove(shownClass);
                }
            })
        })
        elementsRef.current.forEach((element)=>{
            observer?.current?.observe(element);
        })
    }
    function onScroll()
    {
        scrollRefs?.forEach((element)=>{
            if(!element?.offsetTop || !element?.offsetHeight)return;
            let ratio = ((document.documentElement.scrollTop + window.screen.height/2)-element?.offsetTop)/element?.offsetHeight;
            if(clamp)
            {
                ratio = Math.max(0,ratio);
                ratio = Math.min(1,ratio);
            }
            element.style.setProperty("--scroll",`${ratio}`)
        })
    }

    useEffect(()=>{
        document.addEventListener("scroll",onScroll);

        const lenis = new Lenis()

        function raf(time:number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return ()=>{document.removeEventListener("scroll",onScroll)};
    },[]);

    useMemo(()=>{
        refreshObserver();
    },[animateSelector])
    useLayoutEffect(()=>{
        refreshObserver();
    },[])
}