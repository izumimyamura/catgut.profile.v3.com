'use client';
import React, { useState, useEffect } from 'react';
import './CardSwap.css';

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="card">{children}</div>;
};

export default function CardSwap({
  children,
  width = 700,
  height = 450,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3000,
  skewAmount = 6,
}: any) {
  const cards = React.Children.toArray(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, delay);
    return () => clearInterval(timer);
  }, [cards.length, delay]);

  return (
    <div
      className="card-swap-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative'
      }}
    >
      {cards.map((card, i) => {
        const order = (i - index + cards.length) % cards.length;
        const isTop = order === 0;

        return (
          <div
            key={i}
            className="card"
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: `translate3d(${order * (cardDistance / 2)}px, ${-order * (verticalDistance / 2)}px, ${-order * 50}px) skewY(${isTop ? 0 : -skewAmount}deg)`,
              zIndex: cards.length - order,
              opacity: order > 3 ? 0 : 1 - order * 0.15,
              pointerEvents: isTop ? 'auto' : 'none'
            }}
          >
            {card}
          </div>
        );
      })}
    </div>
  );
}
