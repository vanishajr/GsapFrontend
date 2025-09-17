import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CardsShowcase from './CardsShowcase';

gsap.registerPlugin(ScrollTrigger);

const ScrollText = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    
    if (!container || !textElement) return;

    const text = "No developers, No complexity. Just select, customise, and deploy. Go live within minutes, and let engagement soar.";
    const words = text.split(' ');

    let noCount = 0;
    textElement.innerHTML = words.map((word, index) => {
      const lower = word.toLowerCase();
      if (lower === 'no' || lower === 'no,') {
        noCount += 1;
        const which = noCount === 1 ? 'gradient-word1' : (noCount === 2 ? 'gradient-word2' : '');
        const cls = which ? `word ${which}` : 'word';
        return `<span class="${cls}" data-index="${index}">${word}</span>`;
      }
      return `<span class="word" data-index="${index}">${word}</span>`;
    }).join(' ');

    const wordElements = textElement.querySelectorAll('.word');

    const addGradient = (el, from, to) => {
      if (!el) return;
      el.style.color = '';
      el.classList.add(
        'bg-gradient-to-r',
        from,
        to,
        'text-transparent',
        'bg-clip-text'
      );
    };

    const removeGradient = (el, color = '#1B1B1B') => {
      if (!el) return;
      el.classList.remove(
        'bg-gradient-to-r',
        'from-orange-500',
        'to-blue-500',
        'from-purple-500',
        'to-pink-500',
        'text-transparent',
        'bg-clip-text'
      );
      el.style.color = color;
    };

    gsap.set(wordElements, { color: '#1B1B1B' });
    Array.from(wordElements).forEach((w) => removeGradient(w, '#1B1B1B'));

    const firstNoEl = textElement.querySelector('.gradient-word1');
    const developersEl = Array.from(wordElements).find(w => w.textContent.toLowerCase().startsWith('developers'));
    const secondNoEl = textElement.querySelector('.gradient-word2');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=320%',
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: false,
        onRefresh: () => {
          gsap.set(container, { 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          });
        }
      }
    });

    tl.to({}, {
      duration: 0.1,
      immediateRender: false,
      onStart: () => addGradient(firstNoEl, 'from-orange-500', 'to-blue-500'),
      onReverseComplete: () => removeGradient(firstNoEl)
    });

    if (developersEl) {
      tl.to(developersEl, {
        color: '#FFFFFF',
        duration: 0.15,
        ease: 'none',
        immediateRender: false
      }, '>');
    }

    tl.to({}, {
      duration: 0.1,
      immediateRender: false,
      onStart: () => addGradient(secondNoEl, 'from-orange-500', 'to-blue-500'),
      onReverseComplete: () => removeGradient(secondNoEl)
    }, '>');

    const excluded = new Set([firstNoEl, developersEl, secondNoEl].filter(Boolean));
    Array.from(wordElements)
      .filter(w => !excluded.has(w))
      .forEach((w) => {
        tl.to(w, {
          color: '#FFFFFF',
          duration: 0.1,
          ease: 'none',
          immediateRender: false
        }, '>');
      });

    tl.addLabel('textDone');

    tl.to({}, {
      duration: 0.01,
      immediateRender: false,
      onStart: () => removeGradient(firstNoEl),
      onReverseComplete: () => addGradient(firstNoEl, 'from-orange-500', 'to-blue-500')
    }, '+=0.1');

    if (developersEl) {
      tl.to(developersEl, {
        color: '#1B1B1B',
        duration: 0.15,
        ease: 'none',
        immediateRender: false
      }, '>=');
    }

    tl.to({}, {
      duration: 0.01,
      immediateRender: false,
      onStart: () => removeGradient(secondNoEl),
      onReverseComplete: () => addGradient(secondNoEl, 'from-orange-500', 'to-blue-500')
    }, '>=');

    const otherWordsForGrey = Array.from(wordElements)
      .filter(w => !new Set([firstNoEl, developersEl, secondNoEl].filter(Boolean)).has(w));
    tl.to(otherWordsForGrey, {
      color: '#1B1B1B',
      duration: 0.4,
      ease: 'none',
      stagger: 0.02,
      immediateRender: false
    }, '>=');

    tl.addLabel('textGrey');

    const cards = container.querySelectorAll('.cards .card');
    const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
    const setCardsInitial = () => {
      if (isMobile()) {
        gsap.set(cards, { opacity: 0, y: 200, x: 0, filter: 'brightness(0.6)' });
      } else {
        gsap.set(cards, { opacity: 0, x: 300, y: 0, filter: 'brightness(0.6)' });
      }
    };
    setCardsInitial();
    ScrollTrigger.addEventListener('refreshInit', setCardsInitial);

    tl.to(textElement, { opacity: 0, duration: 0.6, ease: 'none' }, 'textGrey+=0.1');

  tl.to(cards, {
          opacity: 1,
          x: 0,
          filter: 'brightness(1)',
          duration: 0.7,
          ease: 'power1.out',
          stagger: 0.35
        }, 'textGrey+=0.25');
      return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section 
        ref={containerRef}
        className="h-screen flex items-center justify-center px-4 relative"
      >
        <div className="max-w-4xl mx-auto w-full relative">
          <div className="flex items-center justify-center min-h-full">
            <p 
              ref={textRef}
              className="text-xl md:text-3xl lg:text-5xl font-medium text-center leading-tight tracking-tight"
              style={{
                lineHeight: '1.2',
                wordSpacing: '0.1em'
              }}
            >
            </p>
          </div>

          <CardsShowcase />
        </div>
      </section>
    </>
  );
};

export default ScrollText;