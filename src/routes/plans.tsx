import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { usePublicPlans } from "@/hooks/usePublicContent";
import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import { Check } from "lucide-react";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Planos — WF Digital Soluções de TI" },
      {
        name: "description",
        content:
          "Planos mensais da WF Digital: Ponto Digital e Lavanderia Residencial e Industrial. Escolha o melhor plano para a sua empresa.",
      },
    ],
  }),
  component: PlansPage,
});

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
};

const plans: Plan[] = [
  {
    name: "Ponto Digital",
    price: "149",
    period: "/mês",
    description: "Controle de jornada digital para a sua equipe",
    features: [
      "Registro de entrada, saída e intervalos",
      "Acesso online por computador e celular",
      "Colaboradores ilimitados",
      "Banco de horas e relatórios",
      "Ajustes e justificativas de ponto",
      "Backup automático das informações",
      "Suporte técnico incluso",
      "Atualizações contínuas",
    ],
  },
  {
    name: "Lavanderia",
    price: "249",
    period: "/mês",
    description: "Gestão completa para lavanderias residenciais e industriais",
    features: [
      "Cadastro de clientes residenciais e corporativos",
      "Controle de pedidos e ordens de serviço",
      "Registro de peças, quantidades e valores",
      "Status do serviço em cada etapa",
      "Controle de entregas e retiradas",
      "Financeiro por cliente e período",
      "Relatórios operacionais e de faturamento",
      "Suporte técnico e atualizações inclusos",
    ],
    featured: true,
  },
];

function PlansPage() {
  usePageSeoInject("/plans");
  const { data: dbPlans } = usePublicPlans();
  const list: Plan[] = (dbPlans && dbPlans.length > 0)
    ? dbPlans.map((p: any) => ({
        name: p.name,
        price: String(p.price ?? "0"),
        period: p.period || "/mês",
        description: p.description || "",
        features: Array.isArray(p.features) ? p.features : [],
        featured: p.is_featured,
      }))
    : plans;
  return (
    <SiteShell>
      <InternalHero title="Planos" crumb="Planos" />

      <section className="section-y bg-white">
        <div className="container-x">
          <div className="text-center reveal max-w-2xl mx-auto mb-14">
            <div className="eyebrow mb-3 justify-center">Nossos Planos</div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">
              Escolha o melhor plano
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Planos mensais com suporte técnico incluso, sem grande investimento inicial. Comece rápido e conte com evolução contínua do sistema.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto reveal-stagger">
            {list.map((p) => (
              <article
                key={p.name}
                className={`reveal card-tech card-tech--plain p-10 md:p-12 flex flex-col ${p.featured ? "md:-translate-y-4" : ""}`}
              >
                <div className="text-center pb-8 border-b border-border">
                  <h3 className="text-2xl md:text-3xl font-black">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-8 flex items-start justify-center gap-1">
                    <span className="text-2xl font-black mt-3">R$</span>
                    <span className="text-6xl md:text-7xl font-black leading-none tracking-tight">{p.price}</span>
                    <span className="text-lg font-semibold text-muted-foreground mt-6">{p.period}</span>
                  </div>
                </div>

                <ul className="py-8 space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-accent text-primary grid place-items-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-col gap-3">
                  <Link to="/contact" className="btn-primary w-full">
                    Começar teste grátis
                  </Link>
                  <Link to="/contact" className="btn-secondary w-full">
                    Falar com especialista
                  </Link>
                  <p className="text-center text-xs text-muted-foreground mt-1">
                    7 dias grátis · sem cartão de crédito
                  </p>
                </div>

              </article>
            ))}
          </div>
        </div>
      </section>

    </SiteShell>
  );
}
