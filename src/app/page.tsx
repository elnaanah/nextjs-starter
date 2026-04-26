'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
};

const AI_RESPONSES = [
  'أنا نموذج ذكاء اصطناعي متقدم، يسعدني مساعدتك في أي شيء تحتاجه. كيف يمكنني خدمتك اليوم؟',
  'سؤال رائع! دعني أفكر في هذا بعمق... هذا الموضوع يتضمن جوانب متعددة تستحق الدراسة والتحليل الدقيق.',
  'بالتأكيد! يمكنني مساعدتك في ذلك. إليك ما أعرفه حول هذا الموضوع بشكل مفصل وشامل.',
  'هذا سؤال ممتاز يعكس تفكيراً عميقاً. دعني أشرح لك الأمر بأبسط طريقة ممكنة.',
  'شكراً لسؤالك الثاقب! الإجابة تعتمد على عدة عوامل، لكن بشكل عام يمكنني القول...',
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const QUICK_PROMPTS = [
  { icon: '✍️', text: 'ساعدني في كتابة مقال' },
  { icon: '💻', text: 'اشرح لي مفهوماً برمجياً' },
  { icon: '🌍', text: 'ترجم نصاً إلى الإنجليزية' },
  { icon: '🧠', text: 'أجب عن سؤال فلسفي' },
  { icon: '📊', text: 'ساعدني في تحليل البيانات' },
  { icon: '🎯', text: 'ضع لي خطة عمل احترافية' },
];

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([
    { id: 'default', title: 'محادثة جديدة', messages: [], createdAt: new Date() }
  ]);
  const [activeChatId, setActiveChatId] = useState('default');
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages, streamingText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const newChat = () => {
    const id = generateId();
    const chat: Chat = { id, title: 'محادثة جديدة', messages: [], createdAt: new Date() };
    setChats(prev => [chat, ...prev]);
    setActiveChatId(id);
    setInput('');
  };

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isStreaming) return;

    const userMsg: Message = { id: generateId(), role: 'user', content, timestamp: new Date() };

    setChats(prev => prev.map(c =>
      c.id === activeChatId
        ? { ...c, title: c.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : c.title, messages: [...c.messages, userMsg] }
        : c
    ));
    setInput('');
    setIsStreaming(true);
    setStreamingText('');

    const response = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
    let i = 0;
    const interval = setInterval(() => {
      if (i < response.length) {
        setStreamingText(response.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        const aiMsg: Message = { id: generateId(), role: 'assistant', content: response, timestamp: new Date() };
        setChats(prev => prev.map(c =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, aiMsg] } : c
        ));
        setIsStreaming(false);
        setStreamingText('');
      }
    }, 18);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const bg = darkMode ? '#0d0d0f' : '#f5f5f0';
  const surface = darkMode ? '#141416' : '#ffffff';
  const surface2 = darkMode ? '#1c1c1f' : '#f0f0eb';
  const border = darkMode ? '#2a2a2e' : '#e0e0d8';
  const text = darkMode ? '#e8e8e6' : '#1a1a1a';
  const textMuted = darkMode ? '#888884' : '#666660';
  const textFaint = darkMode ? '#444442' : '#aaaaaa';
  const accent = '#7c6af7';
  const accentHover = '#6b59e6';

  return (
    <div style={{ display: 'flex', height: '100vh', background: bg, color: text, fontFamily: "'Inter', -apple-system, sans-serif", overflow: 'hidden', direction: 'rtl' }}>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 280 : 0,
        minWidth: sidebarOpen ? 280 : 0,
        background: surface,
        borderLeft: `1px solid ${border}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'all 0.25s ease',
      }}>
        {/* Sidebar Header */}
        <div style={{ padding: '16px', borderBottom: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>✦</div>
          <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.3px', whiteSpace: 'nowrap', overflow: 'hidden' }}>Aura AI</span>
        </div>

        {/* New Chat Button */}
        <div style={{ padding: '12px 12px 8px' }}>
          <button onClick={newChat} style={{
            width: '100%', padding: '10px 14px', background: accent, color: '#fff',
            border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 500,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
            transition: 'background 0.15s'
          }}
            onMouseEnter={e => (e.currentTarget.style.background = accentHover)}
            onMouseLeave={e => (e.currentTarget.style.background = accent)}
          >
            <span style={{ fontSize: 16 }}>+</span> محادثة جديدة
          </button>
        </div>

        {/* Chat List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
          <p style={{ fontSize: 11, color: textFaint, padding: '8px 8px 4px', textTransform: 'uppercase', letterSpacing: 1 }}>المحادثات</p>
          {chats.map(chat => (
            <button key={chat.id} onClick={() => setActiveChatId(chat.id)} style={{
              width: '100%', textAlign: 'right', padding: '10px 12px',
              background: chat.id === activeChatId ? surface2 : 'transparent',
              border: 'none', borderRadius: 8, cursor: 'pointer',
              color: chat.id === activeChatId ? text : textMuted,
              fontSize: 13.5, transition: 'all 0.15s', marginBottom: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { if (chat.id !== activeChatId) e.currentTarget.style.background = surface2; }}
              onMouseLeave={e => { if (chat.id !== activeChatId) e.currentTarget.style.background = 'transparent'; }}
            >
              💬 {chat.title}
            </button>
          ))}
        </div>

        {/* User Info */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `linear-gradient(135deg, ${accent}, #a78bfa)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>ب</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>بشار نعنع</p>
            <p style={{ fontSize: 11, color: textMuted, margin: 0 }}>الخطة المجانية</p>
          </div>
        </div>
      </div>

      {/* Main Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflow: 'hidden' }}>

        {/* Top Bar */}
        <div style={{
          height: 56, borderBottom: `1px solid ${border}`, display: 'flex',
          alignItems: 'center', padding: '0 20px', gap: 12, background: surface, flexShrink: 0
        }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
            background: 'none', border: 'none', color: textMuted, cursor: 'pointer',
            fontSize: 18, padding: '4px 6px', borderRadius: 6, transition: 'color 0.15s'
          }}
            onMouseEnter={e => (e.currentTarget.style.color = text)}
            onMouseLeave={e => (e.currentTarget.style.color = textMuted)}
          >☰</button>

          {/* Model Selector */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
            background: surface2, borderRadius: 8, border: `1px solid ${border}`, cursor: 'pointer'
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
            <span style={{ fontSize: 13.5, fontWeight: 500 }}>Aura Pro</span>
            <span style={{ color: textMuted, fontSize: 12 }}>▾</span>
          </div>

          <div style={{ flex: 1 }} />

          {/* Token Counter */}
          <span style={{ fontSize: 12, color: textFaint, fontVariantNumeric: 'tabular-nums' }}>0 / 128k tokens</span>

          {/* Theme Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: surface2, border: `1px solid ${border}`, color: text,
            borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 16, transition: 'all 0.15s'
          }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px 0' }}>
          {activeChat.messages.length === 0 && !isStreaming ? (
            // Empty State
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: 32 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${accent}22, ${accent}44)`, border: `1px solid ${accent}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>✦</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 8px', letterSpacing: '-0.5px' }}>كيف يمكنني مساعدتك؟</h1>
              <p style={{ color: textMuted, fontSize: 15, margin: '0 0 32px', textAlign: 'center' }}>اسألني عن أي شيء — أنا هنا للمساعدة.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, maxWidth: 600, width: '100%' }}>
                {QUICK_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => sendMessage(p.text)} style={{
                    padding: '12px 14px', background: surface, border: `1px solid ${border}`,
                    borderRadius: 12, cursor: 'pointer', color: text, fontSize: 13, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 8, transition: 'all 0.15s', textAlign: 'right'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = surface2; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.background = surface; }}
                  >
                    <span style={{ fontSize: 18 }}>{p.icon}</span>
                    <span style={{ flex: 1 }}>{p.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 28 }}>
              {activeChat.messages.map(msg => (
                <div key={msg.id} style={{ display: 'flex', gap: 14, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                  {/* Avatar */}
                  <div style={{
                    width: 34, height: 34, borderRadius: msg.role === 'user' ? '50%' : 10, flexShrink: 0,
                    background: msg.role === 'user' ? `linear-gradient(135deg, ${accent}, #a78bfa)` : surface2,
                    border: `1px solid ${border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: msg.role === 'user' ? 14 : 16, marginTop: 2
                  }}>
                    {msg.role === 'user' ? 'ب' : '✦'}
                  </div>
                  {/* Bubble */}
                  <div style={{
                    maxWidth: '78%', padding: '12px 16px',
                    background: msg.role === 'user' ? `${accent}22` : surface,
                    border: `1px solid ${msg.role === 'user' ? accent + '44' : border}`,
                    borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                    fontSize: 14.5, lineHeight: 1.7, color: text,
                  }}>
                    {msg.content}
                    <div style={{ fontSize: 11, color: textFaint, marginTop: 6, textAlign: msg.role === 'user' ? 'left' : 'right' }}>
                      {msg.timestamp.toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming */}
              {isStreaming && (
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: surface2, border: `1px solid ${border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, marginTop: 2
                  }}>✦</div>
                  <div style={{
                    maxWidth: '78%', padding: '12px 16px',
                    background: surface, border: `1px solid ${border}`,
                    borderRadius: '4px 18px 18px 18px',
                    fontSize: 14.5, lineHeight: 1.7, color: text,
                  }}>
                    {streamingText || <span style={{ display: 'flex', gap: 4, alignItems: 'center', height: 22 }}>
                      {[0, 1, 2].map(i => (
                        <span key={i} style={{
                          width: 7, height: 7, borderRadius: '50%', background: accent,
                          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                          display: 'inline-block'
                        }} />
                      ))}
                    </span>}
                    {streamingText && <span style={{ display: 'inline-block', width: 2, height: '1em', background: accent, marginRight: 2, verticalAlign: 'text-bottom', animation: 'blink 0.8s step-end infinite' }} />}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div style={{ padding: '12px 20px 20px', background: bg, flexShrink: 0 }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{
              background: surface, border: `1px solid ${border}`,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: darkMode ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.08)',
              transition: 'border-color 0.15s',
            }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = accent + '88')}
              onBlurCapture={e => (e.currentTarget.style.borderColor = border)}
            >
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="اكتب رسالتك هنا... (Enter للإرسال، Shift+Enter لسطر جديد)"
                disabled={isStreaming}
                rows={1}
                style={{
                  width: '100%', padding: '16px 18px 8px',
                  background: 'transparent', border: 'none', outline: 'none',
                  color: text, fontSize: 14.5, lineHeight: 1.6, resize: 'none',
                  fontFamily: 'inherit', direction: 'rtl',
                  maxHeight: 200, overflowY: 'auto',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 12px' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['📎 مرفق', '🌐 ويب', '🧠 تفكير عميق'].map((mode, i) => (
                    <button key={i} style={{
                      padding: '5px 10px', background: 'transparent', border: `1px solid ${border}`,
                      borderRadius: 20, color: textMuted, fontSize: 12, cursor: 'pointer', transition: 'all 0.15s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = textMuted; }}
                    >{mode}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 11, color: textFaint }}>{input.length} / 4096</span>
                  <button onClick={() => sendMessage()} disabled={!input.trim() || isStreaming} style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: input.trim() && !isStreaming ? accent : surface2,
                    border: 'none', cursor: input.trim() && !isStreaming ? 'pointer' : 'default',
                    color: input.trim() && !isStreaming ? '#fff' : textFaint,
                    fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s', flexShrink: 0
                  }}>
                    {isStreaming ? '⏸' : '↑'}
                  </button>
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, color: textFaint, marginTop: 8 }}>
              Aura AI قد يرتكب أخطاء. تحقق من المعلومات المهمة.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${border}; border-radius: 99px; }
        @keyframes pulse { 0%,100% { opacity: 0.3; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        textarea::placeholder { color: ${textFaint}; }
        button:active { transform: scale(0.97); }
      `}</style>
    </div>
  );
}
