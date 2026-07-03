import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ShieldCheck, Eye, ScrollText, Cookie } from "lucide-react";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade e Cookies — A.R.L.S. União Fraternal Nº 120" },
      { name: "description", content: "Política de Privacidade e Cookies em conformidade com a LGPD (Lei Geral de Proteção de Dados) da União Fraternal." },
    ],
  }),
  component: PoliticaPrivacidadePage,
});

function PoliticaPrivacidadePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 animate-fade-up text-center md:text-left">
            <p className="text-primary/70 font-bold uppercase tracking-[0.3em] text-xs mb-2">Segurança e Privacidade</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-primary">
              Política de Privacidade e Cookies
            </h1>
            <p className="text-muted-foreground text-sm mt-3">
              Última atualização: 2 de Junho de 2026. Em conformidade com a Lei Geral de Proteção de Dados (LGPD).
            </p>
            <div className="gold-divider w-24 mt-4 mx-auto md:mx-0" />
          </div>

          <div className="grid md:grid-cols-[250px_1fr] gap-10 items-start">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex flex-col gap-2 sticky top-28 bg-card border border-border p-4 rounded-2xl shadow-sm">
              <a href="#introducao" className="px-3 py-2 rounded-lg text-sm hover:text-gold transition-colors font-medium flex items-center gap-2">
                <ScrollText className="w-4 h-4 text-gold" /> 1. Introdução
              </a>
              <a href="#dados" className="px-3 py-2 rounded-lg text-sm hover:text-gold transition-colors font-medium flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold" /> 2. Coleta de Dados
              </a>
              <a href="#cookies" className="px-3 py-2 rounded-lg text-sm hover:text-gold transition-colors font-medium flex items-center gap-2">
                <Cookie className="w-4 h-4 text-gold" /> 3. Cookies
              </a>
              <a href="#direitos" className="px-3 py-2 rounded-lg text-sm hover:text-gold transition-colors font-medium flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold" /> 4. Seus Direitos (LGPD)
              </a>
            </aside>

            {/* Content */}
            <div className="space-y-10 text-muted-foreground leading-relaxed text-sm bg-card border border-border rounded-2xl p-6 md:p-10 shadow-elegant">
              {/* Section 1 */}
              <section id="introducao" className="scroll-mt-28 space-y-3">
                <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-2">
                  1. Introdução
                </h3>
                <p>
                  A <strong>A.R.L.S. União Fraternal Nº 120</strong>, filiada ao Grande Oriente Maçônico do Brasil (GOMB), está empenhada em proteger a privacidade e os dados pessoais de seus membros, visitantes e interessados.
                </p>
                <p>
                  Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos seus dados pessoais de acordo com a <strong>Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD)</strong>.
                </p>
              </section>

              {/* Section 2 */}
              <section id="dados" className="scroll-mt-28 space-y-3">
                <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-2">
                  2. Coleta e Uso de Dados
                </h3>
                <p>
                  Coletamos informações pessoais que você nos fornece voluntariamente ao interagir com nosso site, especificamente nos seguintes casos:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Formulário de Triagem ("Quero ser um Maçom")</strong>: Coletamos nome completo, e-mail, faixa etária, crença espiritual, conduta moral, disponibilidade de tempo, percepção de contribuições, motivação e um breve resumo pessoal. Esses dados servem exclusivamente para avaliar a afinidade com os valores maçônicos e, quando submetidos, são encaminhados para a nossa secretaria via integração oficial com o WhatsApp.
                  </li>
                  <li>
                    <strong>Formulário de Maçom Regular ("Junte-se a nós")</strong>: Coletamos nome, e-mail, telefone, grau maçônico, Loja de origem, potência e uma mensagem fraternal para dar início ao processo administrativo de regularização ou filiação.
                  </li>
                  <li>
                    <strong>Emissão de Carteirinha Virtual</strong>: Os dados dos membros para geração de carteirinhas (nome, CIM, e-mail, grau, data de iniciação e foto) são processados e armazenados de maneira segura no banco de dados local do navegador (LocalStorage) para preservar a privacidade do usuário contra servidores de terceiros.
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="cookies" className="scroll-mt-28 space-y-3">
                <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-2">
                  3. Cookies e Rastreamento
                </h3>
                <p>
                  Cookies são pequenos arquivos de texto enviados pelo site ao seu dispositivo. Nós utilizamos cookies apenas para finalidades estritamente necessárias e essenciais ao funcionamento do site:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Cookies de Sessão e Segurança</strong>: Utilizados para verificar integridade e manter estados de consentimento do usuário (como o aceite da LGPD).
                  </li>
                  <li>
                    <strong>Cookies de Preferências</strong>: Salvam suas preferências locais de navegação.
                  </li>
                </ul>
                <p>
                  Você pode gerenciar ou desativar os cookies nas configurações do seu navegador, embora isso possa afetar algumas funcionalidades do portal.
                </p>
              </section>

              {/* Section 4 */}
              <section id="direitos" className="scroll-mt-28 space-y-3">
                <h3 className="font-display text-2xl text-primary font-bold border-b border-border pb-2">
                  4. Seus Direitos sob a LGPD
                </h3>
                <p>
                  Você possui plenos direitos previstos em lei sobre os seus dados pessoais, incluindo:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Confirmação da existência do tratamento de dados.</li>
                  <li>Acesso aos seus dados pessoais sob nosso cuidado.</li>
                  <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
                  <li>Eliminação dos dados pessoais tratados com o seu consentimento.</li>
                  <li>Revogação do consentimento de uso de dados a qualquer momento.</li>
                </ul>
                <p>
                  Para exercer qualquer um dos seus direitos ou tirar dúvidas relacionadas à privacidade, envie um e-mail de contato para <a href="mailto:contato@arlsuniaofraternal.com.br" className="text-gold hover:underline">contato@arlsuniaofraternal.com.br</a>.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
