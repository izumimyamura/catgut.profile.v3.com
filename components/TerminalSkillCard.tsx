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
    description: 'Structure-first web architecture utilizing clean semantic HTML5 elements for optimal SEO, accessibility, and search visibility.',
  },
  {
    id: 'css',
    title: 'Modern CSS3 & Animations',
    filename: 'styles.css',
    language: 'CSS3',
    codeSnippet: `/* Glassmorphism & Responsive Styles */
.terminal-window {
  display: flex;
  flex-direction: column;
  background: rgba(10, 10, 14, 0.94);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.terminal-window:hover {
  border-color: rgba(234, 179, 8, 0.4);
  transform: translateY(-4px);
}`,
    description: 'Custom CSS Grid and Flexbox layouts, fluid typography, media queries, keyframe animations, and modern glassmorphism aesthetics.',
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
    description: 'Core web logic using modern ES6+ syntax, asynchronous async/await execution pipelines, DOM manipulation, and dynamic event listeners.',
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
    description: 'Enterprise-grade TypeScript static type safety, compile-time error detection, robust interface declarations, and clean codebases.',
  },
  {
    id: 'tsx',
    title: 'React 19 & Next.js (TSX)',
    filename: 'TerminalCard.tsx',
    language: 'React / Next.js',
    codeSnippet: `'use client';

import React, { useState } from 'react';

export default function InteractiveTerminal({ title, codeSnippet }: { title: string; codeSnippet: string }) {
  const [active, setActive] = useState<boolean>(true);

  return (
    <div className="terminal-container">
      <h2>{title}</h2>
      <pre><code>{codeSnippet}</code></pre>
    </div>
  );
}`,
    description: 'Modern component-driven architecture leveraging React 19 and Next.js for server-side rendering (SSR), dynamic routing, and WebGL hooks.',
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
    description: 'Relational database schema modeling, indexing, multi-table JOIN queries, data grouping, and high-performance querying.',
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
    description: 'Low-level systems programming emphasizing manual memory management, raw pointers, memory allocation, and foundational data structures.',
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
    std::vector<std::unique_ptr<RenderObject>> scene;
    scene.push_back(std::make_unique<Mesh>("KeyboardKeycap"));
    for (const auto& obj : scene) obj->render();
    return 0;
}`,
    description: 'High-performance Object-Oriented Programming (OOP), smart pointers, template meta-programming, and C++ Standard Template Library (STL).',
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
    description: 'Robust object-oriented application development utilizing strong typing, multi-threading, Stream APIs, and enterprise design patterns.',
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
    description: 'Versatile scripting for rapid data processing, API automation, backend integration, file I/O operations, and tool development.',
  },
];

// VS Code / Xcode Syntax Highlighter Tokenizer
function highlightCode(code: string) {
  if (!code) return null;

  const tokenRegex = /(?:\/\/[^\n]*|\/\*[\s\S]*?\*\/|--[^\n]*|#[^\n]*)|(?:"(?:\\.|[^\\"])*"|'(?:\\.|[^\\'])*'|`(?:\\.|[^\\`])*`)|(?:\b(?:import|export|from|default|function|return|const|let|var|interface|type|class|public|private|virtual|struct|typedef|include|SELECT|FROM|WHERE|GROUP|BY|HAVING|ORDER|COUNT|SUM|INNER|JOIN|AS|ON|void|int|boolean|bool|try|catch|throw|new|await|async|if|else|while|for|def|typedef|override|final)\b)|(?:\b(?:string|number|boolean|List|Node|std|vector|unique_ptr|html|head|body|header|h1|p|div|span|meta|title|DOCTYPE|doctype)\b)|(?:\b\d+\b)|([a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  code.replace(tokenRegex, (match, fnName, offset) => {
    if (offset > lastIndex) {
      elements.push(<span key={`text-${lastIndex}`}>{code.substring(lastIndex, offset)}</span>);
    }

    let color = '#d4d4d8';

    if (match.startsWith('//') || match.startsWith('/*') || match.startsWith('--') || (match.startsWith('#') && !match.startsWith('#include'))) {
      color = '#6A9955';
    } else if (match.startsWith('"') || match.startsWith("'") || match.startsWith('`')) {
      color = '#CE9178';
    } else if (/^(import|export|from|default|function|return|const|let|var|interface|type|class|public|private|virtual|struct|typedef|include|SELECT|FROM|WHERE|GROUP|BY|HAVING|ORDER|COUNT|SUM|INNER|JOIN|AS|ON|void|int|boolean|bool|try|catch|throw|new|await|async|if|else|while|for|def|override|final)$/.test(match)) {
      color = '#569CD6';
    } else if (/^(string|number|boolean|List|Node|std|vector|unique_ptr|html|head|body|header|h1|p|div|span|meta|title|DOCTYPE|doctype)$/.test(match)) {
      color = '#4EC9B0';
    } else if (/^\d+$/.test(match)) {
      color = '#B5CEA8';
    } else if (fnName) {
      color = '#DCDCAA';
    }

    elements.push(
      <span key={`token-${offset}`} style={{ color }}>
        {match}
      </span>
    );

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < code.length) {
    elements.push(<span key={`text-end`}>{code.substring(lastIndex)}</span>);
  }

  return elements;
}

function SingleTerminalBox({ item }: { item: TechItem }) {
  // Default to showing explanation/details (false) instead of code
  const [showCode, setShowCode] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
      }, 12);

      return () => clearInterval(typingInterval);
    }
  }, [showCode, item.codeSnippet]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '920px',
        minHeight: '380px',
        maxHeight: '480px',
        margin: '0 auto 2.5rem auto',
        backgroundColor: 'rgba(12, 12, 16, 0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(234, 179, 8, 0.05)',
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
          padding: '0.7rem 1.2rem',
          backgroundColor: 'rgba(20, 20, 26, 0.98)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ff5f56', display: 'inline-block' }}></span>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ffbd2e', display: 'inline-block' }}></span>
          <span style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#27c93f', display: 'inline-block' }}></span>
        </div>

        <div style={{ fontSize: '0.82rem', color: '#EAB308', fontFamily: 'monospace', fontWeight: 700 }}>
          {item.filename}
        </div>

        <button
          onClick={() => setShowCode(!showCode)}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            borderRadius: '999px',
            padding: '0.3rem 0.9rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {showCode ? 'View Details' : 'View Code'}
        </button>
      </div>

      {/* Main Terminal Window Body */}
      <div
        style={{
          flex: 1,
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflowX: 'auto',
          overflowY: 'auto',
        }}
      >
        {showCode ? (
          <pre
            style={{
              width: '100%',
              margin: 0,
              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
              fontSize: '0.78rem',
              lineHeight: 1.5,
              whiteSpace: 'pre',
              wordBreak: 'normal',
              textAlign: 'left',
              animation: 'fadeIn 0.3s ease',
            }}
          >
            <code>
              {highlightCode(displayedCode)}
              {isTyping && <span style={{ color: '#EAB308', fontWeight: 'bold' }}>|</span>}
            </code>
          </pre>
        ) : (
          <div style={{ textAlign: 'left', width: '100%', padding: '1rem', animation: 'fadeIn 0.3s ease' }}>
            <span style={{ color: '#EAB308', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              {item.language}
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', margin: '0.5rem 0 0.8rem 0' }}>
              {item.title}
            </h3>
            <p style={{ color: '#d4d4d8', fontSize: '1.05rem', lineHeight: 1.6, margin: 0, maxWidth: '750px' }}>
              {item.description}
            </p>
          </div>
        )}
      </div>

      {/* Status Footer Bar */}
      <div
        style={{
          padding: '0.5rem 1.2rem',
          backgroundColor: 'rgba(15, 15, 18, 0.95)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.72rem',
          color: '#71717a',
          fontFamily: 'monospace',
        }}
      >
        <span>FILE: {item.filename}</span>
        <span style={{ color: '#EAB308', fontWeight: 600 }}>EXPLANATION VIEW</span>
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