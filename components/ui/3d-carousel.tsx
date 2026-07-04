"use client";
import React, { useMemo, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ' +
  'width="160" height="220"><rect width="100%" height="100%" ' +
  'fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle"' +
  ' text-anchor="middle" fill="%234a5568" font-size="18">Image</text></svg>';

const CARD_W = 360;
const CARD_H = 220;
const RADIUS = 320;
const TILT_SENSITIVITY = 10;
const DRAG_SENSITIVITY = 0.5;
const INERTIA_FRICTION = 0.95;
const AUTOSPIN_SPEED = 0.08;
const IDLE_TIMEOUT = 2000;

export interface CarouselItem {
  image?: string;
  title: string;
  subtitle?: string;
  description: string;
  url?: string;
  tags?: string;
}

interface CardProps {
  item: CarouselItem;
  transform: string;
  cardW: number;
  cardH: number;
}

const Card = React.memo(({ item, transform, cardW, cardH }: CardProps) => (
  <div
    className="absolute"
    style={{
      width: cardW,
      height: cardH,
      transform,
      transformStyle: "preserve-3d",
      willChange: "transform",
    }}
  >
    <div
      className="w-full h-full rounded-2xl overflow-hidden bg-gray-900
                 border border-gray-700 shadow-lg
                 transition-transform duration-300 hover:scale-105 hover:shadow-2xl
                 hover:z-10 flex flex-col"
      style={{ backfaceVisibility: "hidden" }}
    >
      {item.image && (
        <div className="relative h-2/5 w-full flex-shrink-0 overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            width={cardW}
            height={cardH * 0.4}
            className="w-full h-full object-cover"
            loading="lazy"
            draggable="false"
            onError={(e) => {
              e.currentTarget.src = FALLBACK;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80" />
        </div>
      )}

      <div
        className={`flex flex-col gap-1 p-3 overflow-hidden ${item.image ? "flex-1" : "justify-center h-full"}`}
      >
        {item.subtitle && (
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono truncate">
            {item.subtitle}
          </span>
        )}
        <h3 className="text-white font-semibold text-sm leading-tight truncate">
          {item.title}
        </h3>
        <p className="text-gray-400 text-xs leading-snug line-clamp-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-1 gap-2">
          {item.tags && (
            <span className="text-[10px] text-emerald-400 font-mono truncate">
              {item.tags}
            </span>
          )}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-gray-500 hover:text-white underline flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            View project →
          </a>
        )}
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

interface ThreeDCarouselProps {
  items: CarouselItem[];
  radius?: number;
  cardW?: number;
  cardH?: number;
}

const ThreeDCarousel = React.memo(
  ({
    items,
    radius = RADIUS,
    cardW = CARD_W,
    cardH = CARD_H,
  }: ThreeDCarouselProps) => {
    const parentRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const rotationRef = useRef(0);
    const tiltRef = useRef(0);
    const targetTiltRef = useRef(0);
    const velocityRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef(0);
    const initialRotationRef = useRef(0);
    const lastInteractionRef = useRef(Date.now());
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!parentRef.current || isDraggingRef.current) return;
        lastInteractionRef.current = Date.now();
        const parentRect = parentRef.current.getBoundingClientRect();
        const mouseY = e.clientY - parentRect.top;
        const normalizedY = (mouseY / parentRect.height - 0.5) * 2;
        targetTiltRef.current = -normalizedY * TILT_SENSITIVITY;
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
      const animate = () => {
        if (!isDraggingRef.current) {
          if (Math.abs(velocityRef.current) > 0.01) {
            rotationRef.current += velocityRef.current;
            velocityRef.current *= INERTIA_FRICTION;
          } else if (Date.now() - lastInteractionRef.current > IDLE_TIMEOUT) {
            rotationRef.current += AUTOSPIN_SPEED;
          }
        }
        tiltRef.current += (targetTiltRef.current - tiltRef.current) * 0.1;
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotateX(${tiltRef.current}deg) rotateY(${rotationRef.current}deg)`;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
      };
    }, []);

    const handleDragStart = useCallback((clientX: number) => {
      lastInteractionRef.current = Date.now();
      isDraggingRef.current = true;
      velocityRef.current = 0;
      dragStartRef.current = clientX;
      initialRotationRef.current = rotationRef.current;
    }, []);

    const handleDragMove = useCallback((clientX: number) => {
      if (!isDraggingRef.current) return;
      lastInteractionRef.current = Date.now();
      const deltaX = clientX - dragStartRef.current;
      const newRotation =
        initialRotationRef.current + deltaX * DRAG_SENSITIVITY;
      velocityRef.current = newRotation - rotationRef.current;
      rotationRef.current = newRotation;
    }, []);

    const handleDragEnd = useCallback(() => {
      isDraggingRef.current = false;
      lastInteractionRef.current = Date.now();
    }, []);

    const cards = useMemo(
      () =>
        items.map((item, idx) => ({
          key: idx,
          item,
          transform: `rotateY(${(idx * 360) / items.length}deg) translateZ(${radius}px)`,
        })),
      [items, radius],
    );

    return (
      <div
        ref={parentRef}
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ userSelect: "none" }}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        <div
          className="relative"
          style={{
            perspective: 1500,
            perspectiveOrigin: "center",
            width: Math.max(cardW * 1.5, radius * 2.8),
            height: Math.max(cardH * 1.8, radius * 2),
          }}
        >
          <div
            ref={wheelRef}
            className="relative"
            style={{
              width: cardW,
              height: cardH,
              transformStyle: "preserve-3d",
              willChange: "transform",
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -cardW / 2,
              marginTop: -cardH / 2,
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.key}
                item={card.item}
                transform={card.transform}
                cardW={cardW}
                cardH={cardH}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

ThreeDCarousel.displayName = "ThreeDCarousel";

export default ThreeDCarousel;
