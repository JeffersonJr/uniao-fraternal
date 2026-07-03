export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readingTime: number; // in minutes
  imageUrl?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "7",
    slug: "o-que-e-a-verdade",
    title: "O que é a Verdade? Uma Perspectiva Maçônica",
    excerpt: "A busca incansável pela verdade é o objetivo primordial do Maçom. Mas afinal, o que é a verdade que tanto procuramos nas sessões e no estudo?",
    author: "Jefferson Campos",
    date: "10 de Abril de 2024",
    readingTime: 6,
    imageUrl: "/images/blog/cover_verdade.png",
    tags: ["Filosofia", "Verdade", "Reflexão"],
    content: `
      <p class="lead">A busca incansável pela verdade é um dos grandes pilares que sustentam o edifício da nossa Ordem. Desde os tempos mais antigos, filósofos, religiosos e cientistas se debruçam sobre essa questão monumental: O que é a verdade?</p>

      <p>Para nós, enquanto Construtores Sociais, a verdade não é apenas um conceito abstrato que mora nos livros empoeirados. Ela é uma prática diária. Encontrar a verdade significa rasgar os véus da ignorância, do preconceito e do fanatismo que aprisionam a mente humana.</p>

      <h3>A Verdade Relativa e a Verdade Absoluta</h3>
      
      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_verdade.png" alt="Símbolo da busca pela verdade" class="w-full object-cover h-[300px]" />
      </div>

      <p>A Maçonaria nos ensina a sermos tolerantes justamente porque reconhecemos que, no plano em que vivemos, a nossa percepção da verdade é limitada. O que hoje consideramos como um fato inquestionável, amanhã pode ser iluminado por uma nova descoberta. Portanto, a verdade que buscamos nas Lojas não é um dogma rígido, mas uma luz que orienta o nosso caminho.</p>

      <blockquote>"A Verdade é o centro, a essência e o princípio de todas as coisas. É o atributo divino."</blockquote>

      <p>Em Loja, o esquadro nos lembra da retidão das ações, e o compasso nos ensina a manter os nossos desejos e paixões dentro de limites justos. Quando usamos essas ferramentas de forma simbólica, estamos, na prática, construindo uma vida pautada na verdade de caráter.</p>

      <h3>O Trabalho Constante</h3>
      <p>O Maçom, portanto, deve ser um homem verdadeiro. Sua palavra deve valer mais do que qualquer contrato escrito, e sua conduta deve ser cristalina. A verdadeira resposta para "O que é a Verdade?" reside na coerência entre aquilo que pensamos, aquilo que dizemos e aquilo que efetivamente fazemos em prol da Humanidade.</p>
    `
  },
  {
    id: "6",
    slug: "simbolismo-do-templo-de-salomao",
    title: "O Simbolismo do Templo de Salomão",
    excerpt: "Uma análise da representação física e espiritual do Templo de Salomão, a estrutura basilar que orienta os trabalhos maçônicos.",
    author: "Jefferson Campos",
    date: "05 de Abril de 2024",
    readingTime: 7,
    imageUrl: "/images/blog/cover_templo.png",
    tags: ["Símbolos", "História", "Templo"],
    content: `
      <p class="lead">Nenhuma estrutura na história humana captura a imaginação maçônica como o Templo do Rei Salomão. Erguido em Jerusalém há quase três milênios, ele transcende a história para se tornar a mais pura alegoria da perfeição moral e espiritual.</p>

      <p>Na Maçonaria, o Templo de Salomão não é apenas uma lembrança de uma edificação antiga, mas o modelo do nosso próprio templo interior. Cada Maçom é, simultaneamente, o pedreiro e a própria pedra bruta sendo desbastada para se tornar uma pedra cúbica, perfeita para compor a obra divina.</p>

      <h3>As Duas Colunas</h3>
      <p>A entrada do Templo era adornada por duas majestosas colunas de bronze. Elas simbolizam, fundamentalmente, a estabilidade e a força. O equilíbrio do universo e das ações humanas depende da união perfeita entre o poder (a força para realizar) e o controle (a estabilidade para permanecer firme).</p>

      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_templo.png" alt="Esquadro e Compasso sobre a Pedra" class="w-full object-cover h-[300px]" />
      </div>

      <blockquote>"Não há construção duradoura que não esteja alicerçada em virtudes imaculadas."</blockquote>

      <h3>O Santuário Interior</h3>
      <p>Assim como o Templo físico possuía pátios, átrios e, finalmente, o Santo dos Santos (o local mais sagrado e íntimo), o ser humano também é construído em camadas. A iniciação maçônica propõe essa jornada de fora para dentro. Somente alcançando o nosso próprio santuário interior, o "Santo dos Santos" de nossa consciência, é que podemos compreender plenamente o nosso propósito.</p>

      <p>Estudar o Templo de Salomão é, em suma, estudar a nós mesmos. É entender que a construção do caráter humano exige silêncio, dedicação, ferramentas apropriadas e um projeto inspirado pela Sabedoria Universal.</p>
    `
  },
  {
    id: "5",
    slug: "quem-foi-hiram-abiff",
    title: "Quem foi Hiram Abiff? A Lenda do Arquiteto",
    excerpt: "Mito ou realidade? Conheça a lenda de Hiram Abiff, o arquiteto chefe do Templo de Salomão, cujo exemplo de honra e integridade é central para a Maçonaria.",
    author: "Jefferson Campos",
    date: "28 de Março de 2024",
    readingTime: 5,
    imageUrl: "/images/blog/cover_hiram.png",
    tags: ["História", "Lendas", "Hiram"],
    content: `
      <p class="lead">A figura de Hiram Abiff é a base do Terceiro Grau da Maçonaria. A sua lenda traz consigo os ensinamentos mais profundos sobre lealdade, honra e o verdadeiro sacrifício em nome do dever.</p>

      <p>De acordo com a tradição maçônica e os relatos bíblicos, Hiram era o Mestre Arquiteto contratado pelo Rei Salomão para coordenar e embelezar a construção do Templo de Jerusalém. Conhecido por sua sabedoria e habilidade como artesão de metais, ele dividiu os obreiros em classes, pagando-lhes de acordo com as suas habilidades e conhecimento.</p>

      <h3>O Valor do Segredo</h3>
      <p>A lenda de Hiram narra a inveja daqueles que, não querendo percorrer o árduo caminho do estudo e do trabalho, desejaram obter pela força as palavras e os sinais que lhes garantiriam salários de Mestre. A recusa heroica de Hiram em revelar o segredo confiado a ele, pagando com a própria vida por essa lealdade, é um dos mais fortes exemplos morais de toda a humanidade.</p>

      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_hiram.png" alt="Trolha Dourada e Pedra Cúbica" class="w-full object-cover h-[300px]" />
      </div>

      <blockquote>"É melhor perder a vida mortal do que ceder os princípios de um caráter inabalável."</blockquote>

      <h3>O Significado Simbólico</h3>
      <p>A morte e o renascimento simbólico representados pela lenda de Hiram Abiff não devem ser vistos como meros contos. Eles representam a imortalidade da alma e a eterna vitória da Verdade sobre a ignorância. O Mestre Arquiteto não morreu em vão; seu exemplo permanece vivo na atitude de cada Maçom que escolhe o caminho da retidão mesmo frente a enormes pressões.</p>

      <p>Inspirar-se em Hiram Abiff é lembrar, diariamente, que somos arquitetos do nosso próprio destino e que a nossa honra é o único tesouro que não nos pode ser roubado.</p>
    `
  },
  {
    id: "4",
    slug: "o-esoterismo-da-iniciacao-maconica",
    title: "O Esoterismo da Iniciação Maçônica",
    excerpt: "Para além da organização fraternal e social, a Maçonaria guarda um profundo caráter iniciático e esotérico. Entenda a transformação interior gerada pelo ritual.",
    author: "Jefferson Campos",
    date: "21 de Março de 2024",
    readingTime: 8,
    imageUrl: "/images/blog/cover_esoterismo.png",
    tags: ["Esoterismo", "Iniciação", "Mistérios"],
    content: `
      <p class="lead">A Maçonaria é frequentemente descrita como um sistema peculiar de moralidade, velado em alegorias e ilustrado por símbolos. Contudo, há uma dimensão que vai muito além das reuniões fraternais: o Esoterismo Inciático.</p>

      <p>A iniciação maçônica não é uma simples cerimônia de admissão em um clube. É uma representação teatral e psicológica profunda da morte do ego e do renascimento espiritual do indivíduo. É a passagem das "trevas" da ignorância para a "Luz" do conhecimento.</p>

      <h3>As Provas Simbólicas</h3>
      <p>Durante a sua recepção, o candidato é convidado a passar por provas simbólicas ligadas aos elementos primordiais: Terra, Ar, Água e Fogo. Essa jornada mimetiza o processo alquímico de purificação, onde a "Pedra Bruta" (o ser humano em seu estado não lapidado) sofre as fricções e lavagens necessárias para ser limpo dos seus vícios.</p>

      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_esoterismo.png" alt="A Luz Mística" class="w-full object-cover h-[300px]" />
      </div>

      <blockquote>"Na verdadeira Iniciação, o Templo que se ilumina não é feito de pedra e cimento, mas de carne, mente e espírito."</blockquote>

      <h3>A Câmara de Reflexões</h3>
      <p>Tudo começa no silêncio e na escuridão da Câmara de Reflexões. Ali, o homem comum confronta a sua finitude e o vazio das ambições materiais. O despojamento dos metais é a primeira grande lição esotérica: não importa a sua riqueza ou posição social do lado de fora, perante as leis do Universo, somos todos iguais e nus.</p>

      <p>Compreender o esoterismo maçônico exige dedicação constante. Os símbolos não entregam os seus segredos na primeira leitura. Eles precisam ser contemplados, meditados e vividos. É nessa prática interna que a verdadeira essência da Arte Real repousa.</p>
    `
  },
  {
    id: "3",
    slug: "aos-candidatos-a-maconaria",
    title: "Aos Candidatos à Maçonaria: O Que Esperar da Jornada",
    excerpt: "Um conselho sincero aos que batem à porta do Templo. Quais são os verdadeiros compromissos que você está prestes a assumir?",
    author: "Jefferson Campos",
    date: "17 de Março de 2024",
    readingTime: 4,
    imageUrl: "/images/blog/cover_candidatos.png",
    tags: ["Candidatos", "Instrução", "Sociedade"],
    content: `
      <p class="lead">Diariamente, homens de bem sentem um chamado interior que os levam a buscar a Maçonaria. Eles batem às nossas portas atraídos pelo mistério, pela irmandade ou pelo desejo de fazer o bem. Mas o que, de fato, a Maçonaria exige daqueles que a adentram?</p>

      <p>Se você procura vantagens financeiras, facilidades políticas ou benefícios materiais, está batendo na porta errada. A Maçonaria não é um grupo de ajuda mútua comercial. A primeira decepção de quem entra por motivos equivocados é rápida e implacável.</p>

      <h3>Trabalho e Estudo Contínuos</h3>
      <p>O que a Ordem oferece é o Trabalho. Trabalho constante sobre os próprios defeitos. Oferece as ferramentas necessárias para que você poli a sua moral, domine as suas paixões destrutivas e expanda os seus horizontes intelectuais.</p>

      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_candidatos.png" alt="Luvas Brancas e a Chave" class="w-full object-cover h-[300px]" />
      </div>

      <blockquote>"A Maçonaria só faz homens bons tornarem-se ainda melhores. Ela não tem o condão de transformar metais vis em ouro."</blockquote>

      <h3>O Juramento</h3>
      <p>Ao se tornar Maçom, você será recebido por irmãos que confiarão a você os seus segredos e a sua amizade incondicional, desde que você demonstre ser digno delas. Exigirá que você dedique parte do seu tempo à caridade, ao estudo e às sessões regulares, conciliando tudo isso com a sua vida familiar e profissional – que devem sempre vir em primeiro lugar.</p>

      <p>Se você tem um coração voltado para a construção de uma sociedade mais justa e igualitária, e está disposto a trabalhar arduamente para o seu próprio aprimoramento moral, então os nossos passos seguirão juntos na mesma direção.</p>
    `
  },
  {
    id: "2",
    slug: "os-desafios-da-educacao-maconica",
    title: "Os Desafios da Educação Maçônica no Século XXI",
    excerpt: "Como manter vivas as antigas tradições em um mundo dominado pela tecnologia e pelo pensamento acelerado.",
    author: "Jefferson Campos",
    date: "14 de Março de 2024",
    readingTime: 6,
    imageUrl: "/images/blog/cover_educacao.png",
    tags: ["Educação", "Atualidade", "Desafios"],
    content: `
      <p class="lead">Vivemos na era da informação instantânea e do pensamento acelerado. Em contraste com isso, a educação maçônica é uma arte baseada no ritmo orgânico, na observação prolongada, na repetição do ritual e no silêncio meditativo. O grande desafio atual é: como educar o Maçom contemporâneo?</p>

      <p>É inegável que a tecnologia nos trouxe inúmeros benefícios organizacionais. Contudo, o conhecimento esotérico e moral não pode ser "baixado" de um aplicativo. Ele precisa ser internalizado.</p>

      <h3>O Perigo da Superficialidade</h3>
      <p>Muitos Irmãos recém-iniciados, acostumados ao Google e ao acesso rápido, sentem-se frustrados ao perceber que não receberão as respostas sobre os símbolos prontas em um arquivo de PDF. O método maçônico baseia-se na "Instrução por Símbolos", o que significa que o discípulo deve deduzir o ensinamento por si mesmo, guiado discretamente pelos mestres.</p>

      <div class="my-10 rounded-2xl overflow-hidden shadow-elegant border border-border/50">
        <img src="/images/blog/content_educacao.png" alt="A Passagem do Conhecimento" class="w-full object-cover h-[300px]" />
      </div>

      <blockquote>"A verdadeira sabedoria não se ensina, descobre-se. O papel da Loja não é entregar o conhecimento mastigado, mas ensinar o irmão a como pensar e refletir."</blockquote>

      <h3>Recuperando o Silêncio</h3>
      <p>Para combater a superficialidade, é vital recuperar o respeito pelo silêncio, especialmente no Grau de Aprendiz. É no silêncio que o cérebro processa, pondera e amadurece as ideias que ouviu em Loja. Nós, como instituição, precisamos modernizar a nossa comunicação e a nossa logística sem perder o rito de passagem lento, cadenciado e intencional que transforma a consciência.</p>

      <p>O futuro da Maçonaria dependerá, essencialmente, do quanto nós seremos capazes de manter a pureza dessa educação atemporal sem dar as costas para a realidade do tempo presente.</p>
    `
  },
  {
    id: "1",
    slug: "conceitos-e-principios-da-maconaria",
    title: "Conceitos e Princípios da Maçonaria",
    excerpt: "Descubra como a Maçonaria molda o estado mental e a conduta de seus membros, guiando-os através de símbolos milenares em busca da perfeição.",
    author: "Jefferson Campos",
    date: "10 de Março de 2024",
    readingTime: 5,
    imageUrl: "/images/blog/cover_verdade.png", // reusing one since we only generated 6
    tags: ["Filosofia", "Princípios", "Símbolos"],
    content: `
      <p class="lead">Observamos que os SÍMBOLOS e ORNAMENTOS estão sempre presentes na vida do Maçom, porque eles são parte ativa dessa vida, participando em todos os momentos, imprimindo-lhe características que tornam o Maçom um homem diferente.</p>

      <p>Desde o instante em que recebeu a Luz, o Maçom começa a corrigir as suas atitudes procurando, sem a preocupação de modificar a sua conduta apenas na aparência, exteriorizar aquele estado mental que realmente o transformou, dando lugar a que essa evolução se faça, de dentro para fora.</p>

      <p>É o amadurecimento adquirido pela compreensão dos símbolos e a sua imediata aplicação no sentido real. É o Obreiro gozando dos seus direitos e deveres conscientemente, procurando, ao aplicar os conhecimentos que surgiram da assimilação dos conceitos maçônicos, criar possibilidades aos seus semelhantes de trilhar, como ele, o caminho que leva à perfeição.</p>

      <h3>Um Estado Mental em Ação</h3>
      <p>É o estado mental que o tornou Maçom, imprimindo-lhe a moral condicionada nas bases da verdadeira fraternidade — força capaz de unificar a humanidade. Então, a Maçonaria passa a fazer parte desse estado mental, praticando-a o Maçom, no gesto, na palavra, na ação.</p>

      <p>O Maçom só o será realmente, quando transmitir aos demais, pelo seu pensamento e a força da palavra, o que possui de mais puro nos conceitos maçônicos. Razão porque ele se distingue dando um sentido diferente às suas atitudes, imprimindo-lhes a tolerância, a compreensão, o respeito, acrescido da justiça e do equilíbrio.</p>

      <blockquote>"O Maçom que tem ao seu serviço a aplicação do COMPASSO medindo, delimitando a sua atividade, não pode esquecer a luta perene que fez da nossa Ordem a defensora oculta da Sociedade."</blockquote>

      <h3>O Resgate de Conceitos Milenares</h3>
      <p>Esta luta vem de longe. Vem de longa data, recuando-se a muitos séculos, permitindo relembrar que a trilogia que hoje é a base da nossa Instituição foi também há 700 anos a.C., base da doutrina de Zaratustra, filósofo persa que viveu no reinado de Dario. A doutrina determinava ao homem uma tríplice tarefa: <strong>converter o mau (Fraternidade), fazer do seu inimigo um amigo (Igualdade) e instruir o ignorante (Liberdade)</strong>.</p>

      <p>É bom lembrar que esta doutrina nunca foi uma religião nacional, porque os seus conceitos deixavam a cada um a liberdade de escolher o Princípio Criador que lhe conviesse, princípio que mantemos e defendemos vigorosamente até os dias de hoje.</p>

      <h3>Fundamentos da Lei Maçônica</h3>
      <p>O <strong>Princípio Moral</strong> é a lei fundamental como base de todas as relações humanas, contida nas sentenças – <em>"não faças aos outros o que não queres que te façam"</em> e <em>"o nosso direito termina quando começa o direito do nosso semelhante"</em>. Ao usarmos o instrumento que recebemos para o nosso trabalho na construção do grande Templo da Humanidade, não será difícil aplicarmos este princípio moral.</p>

      <p>A Maçonaria necessita de "homens livres e de bons costumes". Da seleção de candidatos, surgirão os líderes que farão da Maçonaria a Instituição capaz de promover as virtudes humanas. A esta responsabilidade o Maçom não pode, nem deve, fugir a escolher, conscientemente o seu novo Irmão, verificando homens de qualidades físicas, intelectuais e morais.</p>

      <h3>Conclusão: O Papel da Liderança Moral</h3>
      <p>Depois de iniciado, aprimorados os seus conhecimentos e exaltado ao demonstrar os progressos morais, o Maçom é investido de privilégios e deveres que o tornam apto a desempenhar as suas funções. Para alcançarmos o aprimoramento que nos levará a maiores conhecimentos, teremos de pesquisar, estudar, observar e assimilar as belezas que a filosofia nos reserva.</p>
      
      <p>Sem estes conhecimentos não podemos ser úteis à Sociedade. A Maçonaria precisa de líderes autênticos para a Humanidade, trabalhando incessantemente para a construção do seu grande ideal: o <strong>Templo da Paz e da Fraternidade</strong>.</p>
    `
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecommendedPosts(currentSlug: string, count: number = 2): BlogPost[] {
  // Filtra o post atual e retorna aleatoriamente "count" posts
  const others = blogPosts.filter(post => post.slug !== currentSlug);
  const shuffled = others.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
