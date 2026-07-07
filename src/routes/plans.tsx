import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { Counters } from "@/components/site/Counters";
import { PurpleCTA } from "@/components/site/CTAs";
import { ArrowRight, Check, Clock, WashingMachine, Cpu } from "lucide-react";

export const Route = createFileRoute("/plans")({
  head: () => ({
    meta: [
      { title: "Planos — WF Digital Soluções de TI" },
      {
        name: "description",
        content:
          "Planos mensais da WF Digital: Ponto Digital para controle de jornada e Lavanderia Residencial e Industrial para gestão completa da operação.",
      },
    ],
  }),
  component: PlansPage,
});

type PlanBlock = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  intro: string[];
  bulletsTitle: string;
  bullets: string[];
};

const blocks: PlanBlock[] = [
  {
    id: "ponto-digital",
    icon: Clock,
    title: "Plano de Ponto Digital",
    intro: [
      "Plano mensal com sistema completo para controle de ponto digital da sua empresa. Registre a jornada dos colaboradores de forma prática, segura e em conformidade com as necessidades de gestão.",
      "Ideal para empresas que buscam substituir controles manuais, planilhas e livros de ponto por uma solução moderna, com acesso online e relatórios prontos para fechamento mensal.",
      "Oferecemos suporte técnico, atualizações contínuas e configuração inicial para que sua empresa comece a usar o sistema sem complicação.",
    ],
    bulletsTitle: "O que está incluso",
    bullets: [
      "Registro de entrada, saída e intervalos",
      "Acesso online por computador e celular",
      "Cadastro ilimitado de colaboradores no plano",
      "Relatórios de jornada e banco de horas",
      "Ajustes e justificativas de ponto",
      "Backup automático das informações",
      "Suporte técnico incluso no plano mensal",
      "Atualizações e melhorias contínuas",
    ],
  },
  {
    id: "lavanderia",
    icon: WashingMachine,
    title: "Plano de Lavanderia Residencial e Industrial",
    intro: [
      "Plano mensal com sistema desenvolvido para lavanderias residenciais e industriais que precisam organizar pedidos, clientes, peças, entregas e financeiro em um único lugar.",
      "Controle todas as etapas do serviço, do recebimento à entrega, com histórico por cliente, valores, status e emissão de comprovantes. Ideal tanto para operações de bairro quanto para lavanderias que atendem hotéis, restaurantes, indústrias e grandes volumes.",
      "Com plano mensal, sua empresa começa a operar rapidamente, sem grande investimento inicial, contando com suporte e evolução contínua do sistema.",
    ],
    bulletsTitle: "Recursos do sistema",
    bullets: [
      "Cadastro de clientes residenciais e corporativos",
      "Controle de pedidos e ordens de serviço",
      "Registro de peças, quantidades e valores",
      "Status do serviço em cada etapa",
      "Controle de entregas e retiradas",
      "Financeiro por cliente e por período",
      "Relatórios operacionais e de faturamento",
      "Suporte técnico e atualizações inclusos",
    ],
  },
];

function PlansPage() {
  return (
    <SiteShell>
      <InternalHero title="Planos" crumb="Planos" />

      {/* Intro */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-5xl mx-auto mb-14">
          <div className="eyebrow mb-3 justify-center">Nossos Planos Mensais</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Planos mensais sob medida<br />para o dia a dia da sua empresa
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Oferecemos planos mensais para empresas que desejam contar com sistemas prontos, com baixo investimento inicial, suporte técnico incluso e evolução contínua. Escolha o plano ideal para o seu segmento e comece a operar com mais controle, organização e profissionalismo.
          </p>
        </div>
      </section>

      {/* Plan blocks */}
      <section className="section-y bg-section">
        <div className="container-x flex flex-col gap-10">
          {blocks.map((b, i) => (
            <article
              key={b.id}
              id={b.id}
              className="card-tech p-8 md:p-12 reveal scroll-mt-24"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-5 mb-6">
                <div className="card-tech-icon shrink-0">
                  <b.icon className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="eyebrow mb-2">Plano {String(i + 1).padStart(2, "0")}</div>
                  <h3 className="text-2xl md:text-3xl font-black leading-tight">{b.title}</h3>
                </div>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {b.intro.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8">
                <h4 className="font-black uppercase tracking-wider text-sm mb-4">{b.bulletsTitle}</h4>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {b.bullets.map((li) => (
                    <li key={li} className="flex items-start gap-2.5 text-sm">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-accent text-primary grid place-items-center shrink-0">
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{li}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link to="/contact" className="btn-primary inline-flex">
                  Contratar plano <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Closing block */}
      <section className="section-y bg-white">
        <div className="container-x max-w-4xl mx-auto text-center reveal">
          <div className="w-16 h-16 mx-auto grid place-items-center purple-gradient text-white mb-6">
            <Cpu className="w-7 h-7" />
          </div>
          <div className="eyebrow mb-3 justify-center">Tecnologia com Plano Mensal Acessível</div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            Comece hoje com um plano do tamanho da sua operação
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Nossos planos mensais foram pensados para empresas que querem começar rápido, sem grande investimento inicial, com suporte e evolução contínua. Fale com nossa equipe e descubra qual plano se encaixa melhor no seu negócio.
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Falar com um consultor <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Counters />
      <PurpleCTA />
    </SiteShell>
  );
}
