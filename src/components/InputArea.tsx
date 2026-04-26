'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { Paperclip, Mic, Send, Globe, Zap, Code2 } from 'lucide-react';

interface Props {
  onSend: (text: string) => void;
  disabled: boolean;
}

export default function InputArea({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
    setValue(el.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.value = '';
      textareaRef.current.style.height = 'auto';
    }
  };

  const iconBtn: React.CSSProperties = {
    width: 32, height: 32, borderRadius: 'var(--radius-md)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-muted)', transition: 'background var(--t) var(--ease)',
  };

  return (
    <div style={{ flexShrink: 0, padding: '12px 20px 16px', borderTop: '1px solid var(--border)', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg)', border: '1px solid var(--border-mid)',
          borderRadius: 'var(--radius-xl)', padding: '4px 4px 4px 16px',
          display: 'flex', alignItems: 'flex-end', gap: 8,
          transition: 'border-color var(--t) var(--ease), box-shadow var(--t) var(--ease)',
          outline: 'none',
        }}>
          <textarea
            ref={textareaRef}
            placeholder="Message Aura..."
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              resize: 'none', fontSize: 14, lineHeight: 1.5, color: 'var(--text)',
              padding: '10px 0', maxHeight: 180, minHeight: 42, overflowY: 'auto',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4, flexShrink: 0 }}>
            <button style={iconBtn}><Paperclip size={15} /></button>
            <button style={iconBtn}><Mic size={15} /></button>
            <button
              onClick={handleSend}
              disabled={!value.trim() || disabled}
              style={{
                width: 36, height: 36, borderRadius: 'var(--radius-md)',
                background: (!value.trim() || disabled) ? 'var(--surface-3)' : 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: (!value.trim() || disabled) ? 'var(--text-faint)' : 'white',
                cursor: (!value.trim() || disabled) ? 'not-allowed' : 'pointer',
                transition: 'background var(--t) var(--ease), box-shadow var(--t) var(--ease)',
                border: 'none',
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, padding: '0 4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[{ icon: Globe, label: 'Web search' }, { icon: Zap, label: 'Deep think' }, { icon: Code2, label: 'Code mode' }].map(({ icon: Icon, label }) => (
              <button key={label} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-faint)', padding: '3px 8px', borderRadius: 'var(--radius-sm)', transition: 'background var(--t) var(--ease)', cursor: 'pointer', border: 'none', background: 'none', fontFamily: 'inherit' }}>
                <Icon size={12} />
                {label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 11.5, color: 'var(--text-faint)', fontVariantNumeric: 'tabular-nums' }}>
            {value.length} / 4096
          </span>
        </div>
      </div>
    </div>
  );
}
