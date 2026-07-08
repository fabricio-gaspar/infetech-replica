import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";

import { Counters } from "@/components/site/Counters";

import {
  ArrowRight, Check, Code2, Sparkles, Wifi, Cpu, Shield, Bot, LifeBuoy,
  Cloud, ScrollText, BarChart3, Workflow, GraduationCap, Star,
} from "lucide-react";

type ServiceBlock = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  bulletsTitle: string;
  bullets: string[];
  featured?: boolean;
};

const blocks: ServiceBlock[] = [
  {
    id: "ciberseguranca",
    icon: Shield,
    title: "Segurança Digital e Proteção de Dados para Empresas",
    featured: true,
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Antivírus corporativo",
      "Backup seguro",
      "MFA / autenticação em duas etapas",
      "Proteção de e-mails",
      "Auditoria de segurança",
      "Gestão de senhas",
      "Treinamento contra golpes digitais",
      "Monitoramento de ameaças",
      "Plano de resposta a incidentes",
      "Segurança para Microsoft 365, Google Workspace e servidores",
    ],
  },
  {
    id: "automacao-ia",
    icon: Bot,
    title: "Automação de Processos com Inteligência Artificial",
    featured: true,
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Automação de atendimento",
      "Assistente de IA para empresas",
      "Chatbot com base de conhecimento",
      "IA para responder e-mails",
      "IA para organizar documentos",
      "IA para ler planilhas e gerar relatórios",
      "Agentes de IA para tarefas administrativas",
      "Automação de cobrança, cadastro, propostas e suporte",
      "Integração de IA com sistemas internos",
    ],
  },
  {
    id: "ti-gerenciada",
    icon: LifeBuoy,
    title: "Suporte de TI Gerenciado para Empresas",
    featured: true,
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Suporte remoto e presencial",
      "Manutenção preventiva",
      "Gestão de computadores",
      "Gestão de e-mails",
      "Monitoramento de servidores",
      "Monitoramento de backup",
      "Gestão de rede",
      "Gestão de usuários",
      "Relatório mensal de TI",
      "Atendimento para funcionários",
    ],
  },
  {
    id: "nuvem-backup",
    icon: Cloud,
    title: "Nuvem, Backup e Continuidade do Negócio",
    featured: true,
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Migração para nuvem",
      "Backup em nuvem",
      "Servidor em nuvem",
      "Acesso remoto seguro",
      "Recuperação de arquivos",
      "Ambiente para sistemas",
      "Hospedagem de banco de dados",
      "Disaster recovery",
      "Microsoft 365",
      "Google Workspace",
    ],
  },
  {
    id: "governanca-ia",
    icon: ScrollText,
    title: "Governança de IA e Proteção de Dados",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Política interna de uso de IA",
      "Treinamento para funcionários",
      "Mapeamento de riscos",
      "Definição do que pode ou não ser enviado para IA",
      "Controle de acesso",
      "Governança de dados",
      "Adequação básica à LGPD",
      "Auditoria de uso de ferramentas digitais",
    ],
  },
  {
    id: "dashboards-bi",
    icon: BarChart3,
    title: "Dashboards e Relatórios Inteligentes",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Dashboards em Power BI ou Looker Studio",
      "Relatórios automáticos",
      "Integração com planilhas",
      "Indicadores de vendas",
      "Indicadores financeiros",
      "Painel para gestão",
      "Relatórios por e-mail",
      "Análise de dados com IA",
    ],
  },
  {
    id: "integracoes",
    icon: Workflow,
    title: "Integração de Sistemas e Automação de Dados",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Integração com APIs",
      "Integração com planilhas",
      "Integração com WhatsApp",
      "Integração com emissão de notas",
      "Integração com sistemas financeiros",
      "Integração entre plataformas",
      "Automação entre sistemas",
      "Webhooks e sincronização de dados",
    ],
  },
  {
    id: "modernizacao",
    icon: Code2,
    title: "Modernização de Sistemas e Desenvolvimento Sob Medida",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Substituição de planilhas por sistema web",
      "Modernização de sistema antigo",
      "Criação de painel administrativo",
      "Desenvolvimento de sistema interno",
      "Migração de banco de dados",
      "Criação de portal para clientes",
      "Aplicações web sob medida",
    ],
  },
  {
    id: "redes",
    icon: Wifi,
    title: "Infraestrutura de Rede e Wi-Fi Empresarial",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Rede cabeada",
      "Wi-Fi corporativo",
      "Separação de rede para visitantes",
      "Firewall",
      "VPN",
      "Monitoramento de internet",
      "Organização de rack",
      "Switches gerenciáveis",
      "Controle de acesso à rede",
    ],
  },
  {
    id: "treinamentos",
    icon: GraduationCap,
    title: "Treinamento em Tecnologia, IA e Segurança Digital",
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Treinamento de IA para equipes",
      "Treinamento contra golpes digitais",
      "Treinamento de segurança",
      "Treinamento de ferramentas Google e Microsoft",
      "Treinamento de produtividade",
      "Treinamento de organização digital",
      "Capacitação para uso de sistemas internos",
    ],
  },
];

function ServicesPage() {
  return (
    <SiteShell>
      <InternalHero title="Serviços" crumb="Serviços" />

      {/* Intro */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-7xl mx-auto mb-14">
          <div className="eyebrow mb-3 justify-center">Nossos Serviços de Tecnologia</div>
          <h2 className="text-3xl md:text-5xl font-black leading-tight">
            Soluções completas em tecnologia<br />para modernizar a sua empresa
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Oferecemos soluções completas em tecnologia para empresas que desejam modernizar processos, aumentar a produtividade, reduzir custos e contar com uma estrutura mais segura e eficiente. Atuamos desde o desenvolvimento de sistemas personalizados até consultoria, infraestrutura, automação com inteligência artificial, hospedagem e implantação de redes.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Nosso objetivo é entender a necessidade de cada empresa e entregar soluções práticas, profissionais e sob medida.
          </p>
        </div>

      </section>

      

      {/* Detailed service blocks */}
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
                  <div className="eyebrow mb-2">Serviço {String(i + 1).padStart(2, "0")}</div>
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
          <div className="eyebrow mb-3 justify-center">Tecnologia Sob Medida para Sua Empresa</div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight">
            Cada empresa é única. A tecnologia certa também deve ser.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Cada empresa possui necessidades diferentes. Por isso, nosso trabalho é entender seu cenário, avaliar os desafios e oferecer soluções de tecnologia que realmente façam sentido para o seu negócio.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Seja para criar um sistema, automatizar processos com IA, melhorar a rede, implantar servidores, hospedar e-mails, desenvolver um site ou organizar a estrutura de TI, estamos prontos para ajudar sua empresa a evoluir com segurança, eficiência e profissionalismo.
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
