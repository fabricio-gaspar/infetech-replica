import { useState } from "react";
import { useWhatsAppConfig, useChatbotFlow } from "@/hooks/usePublicContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";

type Msg = { from: "bot" | "user"; text: string };

export function WhatsAppFloatingButton() {
  const { data: cfg } = useWhatsAppConfig();
  const { data: steps } = useChatbotFlow();
  const { data: settings } = useSiteSettings();
  const [open, setOpen] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [done, setDone] = useState(false);

  if (!cfg?.enabled) return null;
  const phone = cfg.phone_number || settings?.whatsapp;
  if (!phone && !cfg.chatbot_enabled) return null;
  const pos = cfg.position === "bottom-left" ? "left-4" : "right-4";

  const openWa = (msg?: string) => {
    if (!phone) return;
    const text = encodeURIComponent(msg ?? cfg.greeting ?? "Olá!");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const startChatbot = () => {
    if (!steps || steps.length === 0) return openWa();
    setOpen(true); setStepIdx(0); setAnswers({}); setDone(false);
    setMessages([{ from: "bot", text: steps[0].prompt }]);
  };

  const submitStep = async (value: string) => {
    if (!steps || !value.trim()) return;
    const step = steps[stepIdx];
    const nextAnswers = { ...answers, [step.step_key]: value };
    setAnswers(nextAnswers);
    setMessages((m) => [...m, { from: "user", text: value }]);
    setText("");
    const nextIdx = stepIdx + 1;
    if (nextIdx < steps.length) {
      setStepIdx(nextIdx);
      setTimeout(() => setMessages((m) => [...m, { from: "bot", text: steps[nextIdx].prompt }]), 300);
    } else {
      // finalize
      const name = nextAnswers.name ?? nextAnswers.nome;
      const email = nextAnswers.email;
      const phoneA = nextAnswers.phone ?? nextAnswers.telefone;
      await supabase.from("quotes").insert({
        name: name ?? null,
        email: email ?? null,
        phone: phoneA ?? null,
        answers: nextAnswers,
        source: "chatbot",
        message: Object.values(nextAnswers).join(" | "),
      });
      setDone(true);
      setMessages((m) => [...m, { from: "bot", text: "Obrigado! Vamos redirecionar você ao WhatsApp." }]);
      toast.success("Recebemos sua solicitação!");
      setTimeout(() => {
        openWa(`Olá! ${name ? `Sou ${name}. ` : ""}${email ? `Meu e-mail: ${email}. ` : ""}Preciso de ajuda.`);
      }, 800);
    }
  };

  const currentStep = steps?.[stepIdx];

  return (
    <>
      {open && (
        <div className={`fixed bottom-24 ${pos} z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-white shadow-2xl rounded-lg border overflow-hidden flex flex-col`} style={{ height: 480 }}>
          <div className="bg-green-500 text-white px-4 py-3 flex items-center justify-between">
            <div>
              <div className="font-bold text-sm">Fale conosco</div>
              <div className="text-[11px] opacity-90">Costumamos responder em minutos</div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded p-1"><X className="w-4 h-4"/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-slate-50 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "bot" ? "justify-start" : "justify-end"}`}>
                <div className={`px-3 py-2 rounded-lg max-w-[80%] ${m.from === "bot" ? "bg-white border" : "bg-green-500 text-white"}`}>{m.text}</div>
              </div>
            ))}
          </div>
          {!done && currentStep && (
            <div className="border-t p-2 bg-white">
              {currentStep.input_type === "choice" && (currentStep.options as any[])?.length ? (
                <div className="flex flex-wrap gap-1">
                  {(currentStep.options as string[]).map((op) => (
                    <button key={op} onClick={() => submitStep(op)} className="text-xs px-3 py-1.5 rounded-full border hover:bg-green-50 hover:border-green-500">{op}</button>
                  ))}
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); submitStep(text); }} className="flex gap-1">
                  <input type={currentStep.input_type === "email" ? "email" : currentStep.input_type === "phone" ? "tel" : "text"} value={text} onChange={(e) => setText(e.target.value)} placeholder="Digite aqui…" className="flex-1 h-9 rounded border px-3 text-sm" autoFocus/>
                  <button type="submit" className="w-9 h-9 rounded bg-green-500 text-white grid place-items-center"><Send className="w-4 h-4"/></button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
      <button
        onClick={() => cfg.chatbot_enabled && steps?.length ? startChatbot() : openWa()}
        aria-label="Falar no WhatsApp"
        className={`fixed bottom-4 ${pos} z-40 w-14 h-14 rounded-full bg-green-500 text-white shadow-2xl hover:scale-105 transition grid place-items-center`}
      >
        <MessageCircle className="w-7 h-7"/>
      </button>
    </>
  );
}
