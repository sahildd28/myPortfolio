import React, { useState, useEffect, useRef, useCallback } from "react";
import { BsRobot, BsX, BsSend, BsChevronDown } from "react-icons/bs";
import { GiArtificialIntelligence } from "react-icons/gi";
import "./PortfolioChatbot.css";

// ── CONFIG — update this URL to your backend ──────────
const SSE_ENDPOINT = "http://localhost:8000/chat/stream";
// Your FastAPI backend should accept:
//   POST /chat/stream  body: { message: string, session_id: string }
//   and respond with SSE: data: {"token": "..."} or data: {"done": true}
// ──────────────────────────────────────────────────────

const GREETING = "Hi! I'm Sahil's AI assistant 👋 Ask me anything about his projects, skills, or experience.";

const QUICK_PROMPTS = [
  "What AI projects has Sahil built?",
  "Tell me about the RAN Optimizer",
  "What is Sahil's tech stack?",
  "Is Sahil open to new roles?",
];

function useSessionId() {
  const ref = useRef(null);
  if (!ref.current) {
    ref.current = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }
  return ref.current;
}

function TypingDots() {
  return (
    <div className="pcb-typing">
      <span /><span /><span />
    </div>
  );
}

function Message({ msg }) {
  return (
    <div className={`pcb-msg pcb-msg--${msg.role}`}>
      {msg.role === "assistant" && (
        <div className="pcb-avatar">
          <GiArtificialIntelligence />
        </div>
      )}
      <div className="pcb-bubble">
        {msg.content}
        {msg.streaming && <span className="pcb-stream-cursor">▋</span>}
      </div>
    </div>
  );
}

function PortfolioChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: "init", role: "assistant", content: GREETING, streaming: false },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const sessionId = useSessionId();

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setUnread(0);
      setHasOpened(true);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // Pulse notification after 4s if not opened
  useEffect(() => {
    if (hasOpened) return;
    const t = setTimeout(() => setUnread(1), 4000);
    return () => clearTimeout(t);
  }, [hasOpened]);

  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setLoading(true);

    // Add user message
    const userId = `u_${Date.now()}`;
    setMessages((prev) => [...prev, { id: userId, role: "user", content: userText, streaming: false }]);

    // Add empty assistant message for streaming
    const assistantId = `a_${Date.now()}`;
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", streaming: true }]);

    // Abort any previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    try {
      const response = await fetch(SSE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, session_id: sessionId }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop(); // Keep incomplete line

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);

            if (parsed.done) {
              // Stream complete
              setMessages((prev) =>
                prev.map((m) => m.id === assistantId ? { ...m, streaming: false } : m)
              );
              setLoading(false);
              if (!open) setUnread((u) => u + 1);
              break;
            }

            if (parsed.token) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: m.content + parsed.token }
                    : m
                )
              );
            }

            // Support plain text fallback: { "text": "..." }
            if (parsed.text) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: parsed.text, streaming: false } : m
                )
              );
              setLoading(false);
            }
          } catch {
            // Non-JSON token — treat as raw text
            if (data) {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, content: m.content + data } : m
                )
              );
            }
          }
        }
      }
    } catch (err) {
      if (err.name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "Sorry, I couldn't reach the server right now. Please try again.", streaming: false }
            : m
        )
      );
    } finally {
      setLoading(false);
      setMessages((prev) =>
        prev.map((m) => m.id === assistantId ? { ...m, streaming: false } : m)
      );
    }
  }, [input, loading, open, sessionId]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ── Floating button ── */}
      <button
        className={`pcb-fab ${open ? "pcb-fab--open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
      >
        {open ? <BsChevronDown /> : <BsRobot />}
        {!open && unread > 0 && (
          <span className="pcb-fab-badge">{unread}</span>
        )}
        {!open && (
          <span className="pcb-fab-ring" />
        )}
      </button>

      {/* ── Chat window ── */}
      <div className={`pcb-window ${open ? "pcb-window--open" : ""}`}>

        {/* Header */}
        <div className="pcb-header">
          <div className="pcb-header-avatar">
            <GiArtificialIntelligence />
            <span className="pcb-header-status" />
          </div>
          <div className="pcb-header-text">
            <strong>Sahil's AI Assistant</strong>
            <span>Ask me about projects & skills</span>
          </div>
          <button className="pcb-close" onClick={() => setOpen(false)}>
            <BsX />
          </button>
        </div>

        {/* Messages */}
        <div className="pcb-messages">
          {messages.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
          {loading && messages[messages.length - 1]?.content === "" && (
            <div className="pcb-msg pcb-msg--assistant">
              <div className="pcb-avatar"><GiArtificialIntelligence /></div>
              <div className="pcb-bubble"><TypingDots /></div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick prompts — show only at start */}
        {messages.length <= 2 && (
          <div className="pcb-quick">
            {QUICK_PROMPTS.map((q) => (
              <button key={q} className="pcb-quick-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="pcb-input-row">
          <textarea
            ref={inputRef}
            className="pcb-input"
            placeholder="Ask about Sahil's work..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={1}
            disabled={loading}
          />
          <button
            className={`pcb-send ${input.trim() && !loading ? "pcb-send--active" : ""}`}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            aria-label="Send"
          >
            <BsSend />
          </button>
        </div>

      </div>
    </>
  );
}

export default PortfolioChatbot;
