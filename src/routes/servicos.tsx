import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";
import { Counters } from "@/components/site/Counters";
import { ServiceCard } from "@/components/site/ServiceCard";
import { usePublicServices, usePublicHeroCards } from "@/hooks/usePublicContent";
import { usePageSeoInject } from "@/hooks/usePageSeoInject";
import * as Icons from "lucide-react";
import {
  ArrowRight, Code2, Wifi, Cpu, Shield, Bot, LifeBuoy,
  Cloud, ScrollText, BarChart3, Workflow, GraduationCap,
} from "lucide-react";

export const Route = createFileRoute("/servicos")({
  head: () => ({ meta: [
    { title: "Serviços — WF Digital Soluções de TI" },
    { name: "description", content: "Cibersegurança, automação com IA, TI gerenciada, nuvem, governança de IA, dashboards, integrações, modernização de sistemas, redes e treinamentos." },
  ]}),
  component: ServicesPage,
});

type Service = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "ciberseguranca",
    icon: Shield,
    title: "Segurança Digital e Proteção de Dados",
    description:
      "Antivírus corporativo, backup seguro, MFA, proteção de e-mails e resposta a incidentes para blindar a operação da sua empresa.",
    featured: true,
  },
  {
    id: "automacao-ia",
    icon: Bot,
    title: "Automação de Processos com Inteligência Artificial",
    description:
      "Assistentes, chatbots e agentes de IA que automatizam atendimento, documentos, e-mails e tarefas administrativas.",
    featured: true,
  },
  {
    id: "ti-gerenciada",
    icon: LifeBuoy,
    title: "Suporte de TI Gerenciado para Empresas",
    description:
      "Plano mensal com suporte, monitoramento de servidores, rede, backup e gestão completa da TI da sua empresa.",
    featured: true,
  },
  {
    id: "nuvem-backup",
    icon: Cloud,
    title: "Nuvem, Backup e Continuidade do Negócio",
    description:
      "Migração para nuvem, servidores, Microsoft 365, Google Workspace e recuperação de desastres com acesso remoto seguro.",
    featured: true,
  },
  {
    id: "governanca-ia",
    icon: ScrollText,
    title: "Governança de IA e Proteção de Dados",
    description:
      "Políticas de uso de IA, mapeamento de riscos, controle de acesso e adequação básica à LGPD para sua empresa.",
  },
  {
    id: "dashboards-bi",
    icon: BarChart3,
    title: "Dashboards e Relatórios Inteligentes",
    description:
      "Painéis em Power BI e Looker Studio com indicadores de vendas, financeiro e relatórios automáticos por e-mail.",
  },
  {
    id: "integracoes",
    icon: Workflow,
    title: "Integração de Sistemas e Automação de Dados",
    description:
      "Conexão entre APIs, planilhas, WhatsApp, ERPs, notas fiscais e sincronização automática entre as suas plataformas.",
  },
  {
    id: "modernizacao",
    icon: Code2,
    title: "Modernização de Sistemas e Desenvolvimento Sob Medida",
    description:
      "Substituímos planilhas e sistemas antigos por aplicações web, portais para clientes e painéis administrativos.",
  },
  {
    id: "redes",
    icon: Wifi,
    title: "Infraestrutura de Rede e Wi-Fi Empresarial",
    description:
      "Cabeamento estruturado, Wi-Fi corporativo, firewall, VPN e organização de rack para uma rede estável e segura.",
  },
  {
    id: "treinamentos",
    icon: GraduationCap,
    title: "Treinamento em Tecnologia, IA e Segurança Digital",
    description:
      "Capacitação em IA, segurança digital, Microsoft e Google Workspace e uso profissional das ferramentas do dia a dia.",
  },
];

function ServicesPage() {
  usePageSeoInject("/servicos");
  const { data: dbServices } = usePublicServices();
  const list: Service[] = (dbServices && dbServices.length > 0)
    ? dbServices.map((s: any) => {
        const IconComp = (s.icon_name && (Icons as any)[s.icon_name]) || Shield;
        return {
          id: s.slug || s.id,
          icon: IconComp,
          title: s.title || s.name || "",
          description: s.description || s.short_description || s.full_description || "",
          featured: s.featured_on_home,
        };
      })
    : services;
  return (
    <SiteShell>
      <InternalHero title="Serviços" crumb="Serviços" />

      {/* Intro */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-3xl mx-auto mb-14">
          <div className="eyebrow mb-3 justify-center">Nossos Serviços de Tecnologia</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tight">
            Soluções completas em tecnologia<br />para modernizar a sua empresa
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Do desenvolvimento sob medida à consultoria em TI, infraestrutura, automação com IA, nuvem e redes — trabalhamos para entender a realidade da sua empresa e entregar soluções profissionais, seguras e sob medida.
          </p>
        </div>

        {/* Services grid */}
        <div className="container-x">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 reveal-stagger">
            {list.map((s, i) => (
              <div key={s.id} className="reveal">
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  description={s.description}
                  featured={s.featured}
                  index={i + 1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing block */}
      <section className="section-y bg-section">
        <div className="container-x max-w-4xl mx-auto text-center reveal">
          <div className="w-16 h-16 mx-auto grid place-items-center purple-gradient text-white mb-6 rounded-2xl">
            <Cpu className="w-7 h-7" />
          </div>
          <div className="eyebrow mb-3 justify-center">Tecnologia sob medida</div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight">
            Cada empresa é única. A tecnologia certa também deve ser.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Nosso trabalho é entender seu cenário, avaliar os desafios e oferecer soluções de tecnologia que realmente façam sentido para o seu negócio — com segurança, eficiência e profissionalismo.
          </p>
          <Link to="/contact" className="btn-primary mt-8 inline-flex">
            Entre em contato <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Counters />
    </SiteShell>
  );
}
