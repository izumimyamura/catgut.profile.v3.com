'use client';

import React, { useState, useEffect } from 'react';

interface TechItem {
  id: string;
  title: string;
  filename: string;
  language: string;
  codeSnippet: string;
  description: string;
}

const LANGUAGES: TechItem[] = [
  {
    id: 'html',
    title: 'HTML5 Semantic Markup',
    filename: 'index.html',
    language: 'HTML5',
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Cat Guy — Creative Developer</title>
  </head>
  <body>
    <header class="hero-section">
      <h1>Cinematic Video & Web Development</h1>
      <p>Building high-performance interactive web experiences.</p>
    </header>
  </body>
</html>`,
    description: 'Structure-first web architecture utilizing clean semantic HTML5 elements for optimal SEO, accessibility, and high search engine ranking.',
  },
  {
    id: 'css',
    title: 'Modern CSS3 & Animations',
    filename: 'styles.css',
    language: 'CSS3',
    codeSnippet: `/* Glassmorphism & Responsive Container Styles */
.terminal-window {
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 14, 0.94);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.terminal-window:hover {
  border-color: rgba(234, 179, 8, 0.4);
  transform: translateY(-4px);
}`,
    description: 'Custom CSS Grid and Flexbox layouts, fluid typography, responsive media queries, keyframe animations, and modern glassmorphism aesthetics.',
  },
  {
    id: 'js',
    title: 'JavaScript (ES6+)',
    filename: 'app.js',
    language: 'JavaScript',
    codeSnippet: `// Asynchronous API Fetching & DOM Interactivity
async function fetchPortfolioProjects(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    const projects = await response.json();
    
    return projects.map(project => ({
      ...project,
      featured: project.views > 100000
    }));
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
}`,
    description: 'Core web interactivity using modern ES6+ features, asynchronous async/await pipelines, DOM manipulation, and dynamic event handling.',
  },
  {
    id: 'ts',
    title: 'TypeScript Type-Safety',
    filename: 'types.ts',
    language: 'TypeScript',
    codeSnippet: `// Strict Type Interfaces & Generics
export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate';

export interface DeveloperProfile {
  name: string;
  role: string;
  skills: Record<string, SkillLevel>;
  isAvailableForHire: boolean;
}

export function validateProfile<T extends DeveloperProfile>(profile: T): boolean {
  return profile.skills !== undefined && profile.isAvailableForHire;
}`,
    description: 'Enterprise-grade TypeScript engineering ensuring static type safety, reduced runtime bugs, robust interfaces, and clean documentation.',
  },
  {
    id: 'tsx',
    title: 'React 19 & Next.js (TSX)',
    filename: 'TerminalCard.tsx',
    language: 'React / Next.js',
    codeSnippet: `'use client';

import React, { useState, useEffect } from 'react';

export default function InteractiveTerminal({ title, codeSnippet }: { title: string; codeSnippet: string }) {
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    const timer = setInterval(() => setActive(prev => !prev), 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="terminal-container">
      <h2>{title}</h2>
      <pre><code>{codeSnippet}</code></pre>
    </div>
  );
}`,
    description: 'Modern component-driven architecture using React 19 and Next.js, featuring server-side rendering (SSR), dynamic routing, and WebGL hooks.',
  },
  {
    id: 'sql',
    title: 'SQL & Database Querying',
    filename: 'query.sql',
    language: 'SQL',
    codeSnippet: `-- Complex Relational Database Query
SELECT 
    users.id AS user_id,
    users.username,
    COUNT(projects.id) AS total_projects,
    SUM(projects.views) AS aggregate_views
FROM users
INNER JOIN projects ON users.id = projects.author_id
WHERE projects.status = 'published'
GROUP BY users.id, users.username
HAVING COUNT(projects.id) > 5
ORDER BY aggregate_views DESC;`,
    description: 'Relational database schema design, indexing, complex table JOIN operations, aggregations, and high-performance database querying.',
  },
  {
    id: 'c',
    title: 'C Programming',
    filename: 'memory.c',
    language: 'C',
    codeSnippet: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

void printList(Node* head) {
    Node* current = head;
    while (current != NULL) {
        printf("%d -> ", current->data);
        current = current->next;
    }
    printf("NULL\\n");
}

int main() {
    Node* head = (Node*)malloc(sizeof(Node));
    head->data = 100;
    head->next = NULL;
    printList(head);
    free(head);
    return 0;
}`,
    description: 'Low-level procedural programming focusing on manual memory management, pointers, dynamic memory allocation, and data structures.',
  },
  {
    id: 'cpp',
    title: 'C++ Object-Oriented Software',
    filename: 'engine.cpp',
    language: 'C++',
    codeSnippet: `#include <iostream>
#include <vector>
#include <memory>

class RenderObject {
public:
    virtual void render() const = 0;
    virtual ~RenderObject() = default;
};

class Mesh : public RenderObject {
private:
    std::string name;
public:
    Mesh(std::string n) : name(n) {}
    void render() const override {
        std::cout << "Rendering 3D Mesh: " << name << std::endl;
    }
};

int main() {
    std::vector<std.unique_ptr<RenderObject>> scene;
    scene.push_back(std::make_unique<Mesh>("KeyboardKeycap"));
    for (const auto& obj : scene) obj->render();
    return 0;
}`,
    description: 'High-performance Object-Oriented Programming (OOP) utilizing smart pointers, templates, custom memory management, and Standard Template Library (STL).',
  },
  {
    id: 'java',
    title: 'Java Enterprise Applications',
    filename: 'DataProcessor.java',
    language: 'Java',
    codeSnippet: `import java.util.List;
import java.util.stream.Collectors;

public class DataProcessor {
    private final List<String> records;

    public DataProcessor(List<String> records) {
        this.records = records;
    }

    public List<String> filterValidEntries() {
        return records.stream()
                .filter(record -> record != null && !record.isEmpty())
                .map(String::toUpperCase)
                .collect(Collectors.toList());
    }
}`,
    description: 'Robust Object-Oriented software engineering with strong typing, multi-threading, Stream API pipelines, and cross-platform reliability.',
  },
  {
    id: 'python',
    title: 'Python Scripting & Automation',
    filename: 'automation.py',
    language: 'Python',
    codeSnippet: `import os
import json
from dataclasses import dataclass

@dataclass
class VideoProject:
    name: str
    fps: int
    resolution: str

def process_video_metadata(directory_path: str):
    projects = []
    for file in os.listdir(directory_path):
        if file.endswith('.json'):
            with open(os.path.join(directory_path, file), 'r') as f:
                data = json.load(f)
                projects.append(VideoProject(**data))
    return [p.name for p in projects if p.fps >= 60]`,
    description: 'Versatile scripting for rapid prototyping, data parsing, backend API automation, mathematical processing, and workflow utility tool building.',
  },
];

function SingleTerminalBox({ item }: { item: TechItem }) {
  const [showCode, setShowCode] = useState(true);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  // Typewriter write-on animation when code is visible
  useEffect(() => {
    if (showCode) {
      setDisplayedCode('');
      setIsTyping(true);
      let currentIndex = 0;

      const typingInterval = setInterval(() => {
        if (currentIndex < item.codeSnippet.length) {
          setDisplayedCode((prev) => prev + item.codeSnippet.charAt(currentIndex));
          currentIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }
  }, [showCode, item.codeSnippet]);

  // Smooth auto-toggle every 10 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setShowCode((prev) => !prev);
    }, 10000);

    return () => clearInterval(cycleInterval);
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        minHeight: '440px',
        margin: '0 auto 3rem auto',
        backgroundColor: 'rgba(10, 10, 14, 0.94)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '28px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(234, 179, 8, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* VS Code Window Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.8rem 1.4rem',
          backgroundColor: 'rgba(18, 18, 22, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
        </div>

        <div style={{ fontSize: '0.9rem', color: '#EAB308', fontFamily: 'monospace', fontWeight: 700 }}>
          {item.filename}
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '999px',
            padding: '0.35rem 1rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {showCode ? 'View Details' : 'View Code'}
        </button>
      </div>

      {/* Main Terminal Window */}
      <div style={{ flex: 1, padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {showCode ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#38bdf8',
              whiteSpace: 'pre-wrap',
              textAlign: 'left',
              animation: 'fadeIn 0.4s ease',
            }}
          >
            <code>
              {displayedCode}
              {isTyping && <span style={{ color: '#EAB308', fontWeight: 'bold' }}>|</span>}
            </code>
          </div>
        ) : (
          <div style={{ textAlign: 'left', width: '100%', animation: 'fadeIn 0.4s ease' }}>
            <span style={{ color: '#EAB308', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              {item.language}
            </span>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#fff', margin: '0.6rem 0 1rem 0' }}>
              {item.title}
            </h3>
            <p style={{ color: '#d4d4d8', fontSize: '1.2rem', lineHeight: 1.7, margin: 0 }}>
              {item.description}
            </p>
          </div>
        )}
      </div>

      {/* Footer Bar */}
      <div
        style={{
          padding: '0.6rem 1.4rem',
          backgroundColor: 'rgba(15, 15, 18, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.78rem',
          color: '#71717a',
          fontFamily: 'monospace',
        }}
      >
        <span>STATUS: ACTIVE</span>
        <span style={{ color: '#EAB308', fontWeight: 600 }}>AUTO-SWITCHING (10s)</span>
      </div>
    </div>
  );
}

export default function TerminalSkillCard() {
  return (
    <div style={{ width: '100%' }}>
      {LANGUAGES.map((lang) => (
        <SingleTerminalBox key={lang.id} item={lang} />
      ))}
    </div>
  );
}