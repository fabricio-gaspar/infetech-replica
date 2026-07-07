import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { InternalHero } from "@/components/site/InternalHero";

import { Counters } from "@/components/site/Counters";
import { PurpleCTA } from "@/components/site/CTAs";
import {
  ArrowRight, Check, Code2, Sparkles, Globe, Mail, Server, Wifi,
  ClipboardCheck, Clock, Cpu,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [
    { title: "Serviços — WF Digital Soluções de TI" },
    { name: "description", content: "Sistemas personalizados, automação com IA, sites, hospedagem, e-mails empresariais, servidores em nuvem, redes e consultoria em TI." },
  ]}),
  component: ServicesPage,
});

type ServiceBlock = {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  intro: string[];
  bulletsTitle: string;
  bullets: string[];
};

const blocks: ServiceBlock[] = [
  {
    id: "sistemas",
    icon: Code2,
    title: "Desenvolvimento de Sistemas Personalizados",
    intro: [
      "Criamos sistemas sob medida para atender exatamente às necessidades da sua empresa. Desenvolvemos soluções para automatizar processos, organizar informações, controlar operações e facilitar a gestão do dia a dia.",
      "Com um sistema personalizado, sua empresa deixa de depender de planilhas, controles manuais e processos repetitivos, passando a contar com uma ferramenta desenvolvida de acordo com sua realidade.",
      "Ideal para empresas que precisam de controle interno, gestão de clientes, emissão de relatórios, integração entre setores, acompanhamento de serviços, financeiro, estoque, atendimento ou qualquer outro processo específico.",
    ],
    bulletsTitle: "Benefícios",
    bullets: [
      "Sistema desenvolvido conforme a necessidade da empresa",
      "Mais organização e controle das informações",
      "Redução de erros manuais",
      "Economia de tempo nas tarefas do dia a dia",
      "Relatórios e dados mais fáceis de acompanhar",
      "Possibilidade de evolução conforme o crescimento do negócio",
    ],
  },
  {
    id: "ia",
    icon: Sparkles,
    title: "Automação com Inteligência Artificial",
    intro: [
      "Implementamos automações com inteligência artificial para tornar sua empresa mais produtiva, ágil e inteligente. A IA pode ajudar em atendimentos, análise de dados, geração de relatórios, organização de informações, respostas automáticas, triagem de solicitações e diversas tarefas repetitivas.",
      "A automação com IA permite que sua equipe foque no que realmente importa, enquanto processos manuais são executados de forma mais rápida e eficiente.",
    ],
    bulletsTitle: "Aplicações possíveis",
    bullets: [
      "Atendimento automatizado",
      "Geração de respostas e mensagens",
      "Leitura e organização de documentos",
      "Automatização de tarefas administrativas",
      "Análise de dados e relatórios",
      "Integrações com sistemas, planilhas e ferramentas internas",
      "Criação de fluxos inteligentes para reduzir trabalho manual",
    ],
  },
  {
    id: "sites",
    icon: Globe,
    title: "Desenvolvimento de Sites e Hospedagem",
    intro: [
      "Desenvolvemos sites profissionais, modernos e responsivos para empresas que desejam fortalecer sua presença digital e transmitir mais confiança aos clientes.",
      "Criamos sites institucionais, páginas de apresentação de serviços, landing pages, sites comerciais e soluções personalizadas para divulgar sua empresa de forma clara, bonita e estratégica.",
      "Além do desenvolvimento, também oferecemos a hospedagem do site, garantindo que sua página esteja disponível na internet com estabilidade e suporte técnico.",
    ],
    bulletsTitle: "O que oferecemos",
    bullets: [
      "Criação de sites profissionais",
      "Layout moderno e adaptado para celular, tablet e computador",
      "Organização dos conteúdos e serviços da empresa",
      "Hospedagem do site",
      "Configuração de domínio",
      "Suporte para manutenção e melhorias",
      "Estrutura pensada para gerar mais credibilidade e atrair clientes",
    ],
  },
  {
    id: "emails",
    icon: Mail,
    title: "Hospedagem de E-mails Empresariais",
    intro: [
      "Oferecemos hospedagem de e-mails profissionais para empresas que desejam usar contas com o próprio domínio, como contato@suaempresa.com.br.",
      "Ter um e-mail empresarial transmite mais profissionalismo, segurança e confiança na comunicação com clientes, fornecedores e parceiros.",
      "Configuramos e-mails corporativos, caixas de entrada, acessos em computadores e celulares, além de auxiliar na organização e funcionamento das contas.",
    ],
    bulletsTitle: "Vantagens",
    bullets: [
      "E-mails com o domínio da empresa",
      "Mais credibilidade na comunicação",
      "Configuração em celular, computador e webmail",
      "Organização de contas por setor ou colaborador",
      "Suporte técnico para configuração e manutenção",
      "Solução ideal para empresas que querem uma comunicação mais profissional",
    ],
  },
  {
    id: "servidores",
    icon: Server,
    title: "Implantação de Servidores em Nuvem e Local",
    intro: [
      "Realizamos implantação e configuração de servidores em nuvem ou servidores locais, de acordo com a necessidade da empresa.",
      "Ajudamos sua empresa a ter uma estrutura mais organizada, segura e eficiente para armazenar arquivos, rodar sistemas, controlar acessos, hospedar aplicações e centralizar informações importantes.",
      "A solução pode ser feita em ambiente local, dentro da empresa, ou em nuvem, permitindo maior flexibilidade, acesso remoto e escalabilidade.",
    ],
    bulletsTitle: "Serviços inclusos",
    bullets: [
      "Configuração de servidores locais",
      "Implantação de servidores em nuvem",
      "Organização de arquivos e permissões",
      "Configuração de usuários e acessos",
      "Backup e segurança",
      "Hospedagem de sistemas internos",
      "Suporte e manutenção da estrutura",
    ],
  },
  {
    id: "plano-mensal",
    icon: Clock,
    title: "Sistema de Ponto e Lavanderia com Plano Mensal",
    intro: [
      "Disponibilizamos sistemas em modelo de plano mensal para empresas que precisam controlar melhor seus processos, como controle de ponto e gestão de lavanderia.",
      "O sistema de ponto ajuda no acompanhamento da jornada dos colaboradores, registros de entrada e saída, controle de horários e geração de informações para gestão.",
      "Já o sistema para lavanderia auxilia no controle de pedidos, clientes, peças, status dos serviços, entregas, valores e organização operacional.",
    ],
    bulletsTitle: "Ideal para empresas que desejam",
    bullets: [
      "Controlar processos de forma simples",
      "Reduzir controles manuais",
      "Ter acesso às informações com mais facilidade",
      "Utilizar um sistema com baixo custo inicial",
      "Contar com suporte e evolução contínua",
      "Trabalhar com plano mensal sem necessidade de grande investimento inicial",
    ],
  },
  {
    id: "redes",
    icon: Wifi,
    title: "Implantação de Rede Cabeada e Wi-Fi",
    intro: [
      "Projetamos e implantamos redes cabeadas e Wi-Fi para empresas que precisam de uma conexão mais estável, segura e organizada.",
      "Uma rede bem estruturada melhora o desempenho da internet, evita quedas, organiza os pontos de acesso e garante melhor funcionamento dos computadores, sistemas, impressoras, câmeras e demais equipamentos conectados.",
      "Atendemos desde pequenos escritórios até empresas que precisam de uma estrutura mais completa.",
    ],
    bulletsTitle: "O que fazemos",
    bullets: [
      "Instalação de rede cabeada",
      "Organização de pontos de rede",
      "Configuração de roteadores e switches",
      "Implantação de Wi-Fi empresarial",
      "Melhoria de sinal e cobertura",
      "Separação de rede para visitantes",
      "Configuração de segurança e controle de acesso",
      "Manutenção e suporte técnico",
    ],
  },
  {
    id: "consultoria",
    icon: ClipboardCheck,
    title: "Consultoria e Auditoria em TI",
    intro: [
      "Realizamos consultoria e auditoria em TI para identificar problemas, melhorar processos, aumentar a segurança e orientar a empresa nas melhores decisões tecnológicas.",
      "Analisamos a estrutura atual, equipamentos, rede, sistemas, servidores, segurança, backups, acessos e rotinas internas. Após a avaliação, apresentamos melhorias e soluções adequadas para tornar o ambiente de TI mais eficiente e confiável.",
    ],
    bulletsTitle: "A consultoria ajuda sua empresa a",
    bullets: [
      "Identificar falhas na estrutura atual",
      "Melhorar a segurança das informações",
      "Reduzir riscos de perda de dados",
      "Organizar processos internos",
      "Planejar investimentos em tecnologia",
      "Evitar gastos desnecessários",
      "Melhorar o desempenho dos sistemas e equipamentos",
    ],
  },
];

function ServicesPage() {
  return (
    <SiteShell>
      <InternalHero title="Serviços" crumb="Serviços" />

      {/* Intro */}
      <section className="section-y bg-white">
        <div className="container-x text-center reveal max-w-5xl mx-auto mb-14">
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
      <PurpleCTA />
    </SiteShell>
  );
}
