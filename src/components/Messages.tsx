'use client';

import { useEffect, useRef } from 'react';
import { Message } from '@/types/chat';
import { Copy, RefreshCw, ThumbsUp, ThumbsDown, Edit2, Layers } from 'lucide-react';

const SUGGESTIONS = [
  { icon: '⚡', text: 'Write a React component' },
  { icon: '✉️', text: 'Draft a professional email' },
  { icon: '🔬', text: 'Explain quantum computing' },
  { icon: '📄', text: 'Summarize a document' },
  { icon: '🐛', text: 'Debug my code' },
  { icon: '💡', text: 'Brainstorm ideas' },
];

interface Props {
  messages: Message[];
  isTyping: boolean;
}

export default function Messages({ messages, isTyping }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (messages.length === 0 && !isTyping) {
    return (
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '32px 24px', textAlign: 'center', maxWidth: 600, width: '100%' }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#7c6af7,#a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(124,106,247,0.25)' }}>
            <Layers size={26} color="white" strokeWidth={1.8} />
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.5px', marginBottom: 10 }}>Good morning, Bashar 👋</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 380 }}>I&apos;m Aura, your AI assistant. I can help you with code, writing, analysis, and much more.</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {SUGGESTIONS.map(s => (
              <div key={s.text} style={{ padding: '8px 14px', borderRadius: 20, background: 'var(--surface)', border: '1px solid var(--border-mid)', fontSize: 13, color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all var(--t) var(--ease)' }}>
                <span>{s.icon}</span> {s.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '24px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
      {messages.map(msg => (
        <div key={msg.id} style={{ display: 'flex', padding: '6px 20px', maxWidth: 860, margin: '0 auto', width: '100%', gap: 14, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row' }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', background: msg.role === 'user' ? 'linear-gradient(135deg,#3b82f6,#60a5fa)' : 'linear-gradient(135deg,#7c6af7,#a78bfa)' }}>
            {msg.role === 'user' ? 'B' : 'A'}
          </div>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6, alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)' }}>{msg.role === 'user' ? 'You' : 'Aura'}</span>
              <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{msg.time}</span>
            </div>
            <div style={{
              padding: '11px 15px',
              borderRadius: msg.role === 'user' ? 'var(--radius-lg) 4px var(--radius-lg) var(--radius-lg)' : '4px var(--radius-lg) var(--radius-lg) var(--radius-lg)',
              background: msg.role === 'user' ? 'var(--user-bubble)' : 'var(--surface)',
              border: `1px solid ${msg.role === 'user' ? 'var(--user-border)' : 'var(--border)'}`,
              fontSize: 14, lineHeight: 1.65, color: 'var(--text)',
              maxWidth: 640, wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}>
              {msg.content}
            </div>
            {msg.role === 'assistant' && (
              <div style={{ display: 'flex', gap: 2 }}>
                {[Copy, RefreshCw, ThumbsUp, ThumbsDown].map((Icon, i) => (
                  <button key={i} style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)', transition: 'background var(--t) var(--ease)' }}>
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            )}
            {msg.role === 'user' && (
              <div style={{ display: 'flex', gap: 2 }}>
                {[Copy, Edit2].map((Icon, i) => (
                  <button key={i} style={{ width: 26, height: 26, borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-faint)', transition: 'background var(--t) var(--ease)' }}>
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {isTyping && (
        <div style={{ display: 'flex', padding: '6px 20px', maxWidth: 860, margin: '0 auto', width: '100%', gap: 14 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#7c6af7,#a78bfa)' }}>A</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6 }}>Aura</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '13px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px var(--radius-lg) var(--radius-lg) var(--radius-lg)' }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-faint)', animation: `typingBounce 1.2s ${delay}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes typingBounce {
          0%, 100% { transform: translateY(0); background: var(--text-faint); }
          50% { transform: translateY(-4px); background: var(--accent); }
        }
      `}</style>

      <div ref={bottomRef} />
    </div>
  );
}
