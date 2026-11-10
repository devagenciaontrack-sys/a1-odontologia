// Gera as páginas estáticas do site A1 Odontologia.
// Uso: node build.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));

/* ---------------------------------------------------------------
   Dados da clínica
---------------------------------------------------------------- */
const C = {
  name: 'A1 Odontologia',
  phone1: '(11) 4371-5359',
  phone1Href: 'tel:+551143715359',
  phone2: '(11) 4371-5360',
  phone2Href: 'tel:+551143715360',
  whats: '(11) 95000-3382',
  whatsNum: '5511950003382',
  email: 'contato@a1odontologia.com.br',
  address: 'Rua Manuel da Nóbrega, 211 — conjunto 21',
  district: 'Paraíso · São Paulo · SP',
  hoursWeek: 'Segunda a sexta · 8h às 19h',
  hoursSat: 'Sábados · 8h às 12h',
  cro: 'CRO CL 15.283',
  instagram: 'https://instagram.com/a1odontologia',
  facebook: 'https://www.facebook.com/A1ConsultorioOdontologico',
  mapQuery: 'Rua Manuel da Nóbrega, 211, São Paulo - SP',
};
const waLink = (text = 'Olá! Gostaria de agendar uma consulta na A1 Odontologia.') =>
  `https://wa.me/${C.whatsNum}?text=${encodeURIComponent(text)}`;

/* ---------------------------------------------------------------
   Ícones (traço 24x24)
---------------------------------------------------------------- */
const TOOTH = 'M7.2 3C4.6 3 3 5 3 7.6c0 2 .8 3.4 1.4 5 .6 1.7.7 3.6 1.2 5.6.4 1.6 1 2.8 2 2.8 1.4 0 1.5-2.6 2-4.4.3-1 .8-1.6 1.4-1.6h2c.6 0 1.1.6 1.4 1.6.5 1.8.6 4.4 2 4.4 1 0 1.6-1.2 2-2.8.5-2 .6-3.9 1.2-5.6.6-1.6 1.4-3 1.4-5C21 5 19.4 3 16.8 3c-2 0-2.9 1-4.8 1S9.2 3 7.2 3z';
const I = {
  tooth: `<path d="${TOOTH}"/>`,
  shield: '<path d="M12 3l7.5 3v5.6c0 4.6-3.1 7.9-7.5 9.4-4.4-1.5-7.5-4.8-7.5-9.4V6z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/>',
  sparkle: '<path d="M11 3.5l1.9 5.1L18 10.5l-5.1 1.9L11 17.5l-1.9-5.1L4 10.5l5.1-1.9z"/><path d="M18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/>',
  implant: '<path d="M6.5 3.5h11a2 2 0 012 2c0 2.6-2.4 4.5-7.5 4.5S4.5 8.1 4.5 5.5a2 2 0 012-2z"/><path d="M8.5 10.5h7M9 13h6M9.6 15.5h4.8M10.3 18h3.4M12 20.5v.5"/>',
  drop: '<path d="M12 3s6.5 6.6 6.5 11.2a6.5 6.5 0 01-13 0C5.5 9.6 12 3 12 3z"/><path d="M9 14.5a3 3 0 003 3"/>',
  canal: `<path d="${TOOTH}"/><path d="M12 8.2v5.2"/>`,
  braces: '<path d="M3 12h18"/><rect x="4.5" y="9" width="3.6" height="6" rx="1"/><rect x="10.2" y="9" width="3.6" height="6" rx="1"/><rect x="15.9" y="9" width="3.6" height="6" rx="1"/>',
  kid: '<circle cx="12" cy="12" r="9"/><path d="M8.5 14.2a4.2 4.2 0 007 0"/><path d="M9 9.6v.6M15 9.6v.6"/>',
  jaw: '<path d="M5 9a7 7 0 0114 0v2.4l-1.8 5.4a3.4 3.4 0 01-3.2 2.2h-4a3.4 3.4 0 01-3.2-2.2L5 11.4z"/><path d="M9 14.5h6"/>',
  scalpel: '<path d="M3.5 20.5L14 10l3 3-7.2 6.2a4 4 0 01-2.6 1z"/><path d="M14 10l5.5-5.5a1.4 1.4 0 012 2L16 12"/>',
  restore: `<path d="${TOOTH}"/><path d="M9.2 8.5l1.4 1.4 2.8-2.8"/>`,
  bolt: '<path d="M13 2.5L4.5 13.5H11l-1 8 8.5-11H12z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  phone: '<path d="M5 3.5h3.2l1.6 4.2-2.1 1.3a11 11 0 006.3 6.3l1.3-2.1 4.2 1.6V18a2.5 2.5 0 01-2.5 2.5A15.5 15.5 0 012.5 6 2.5 2.5 0 015 3.5z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.6a3.5 3.5 0 010 6.8M18 14.2a6.5 6.5 0 013.5 5.8"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="M8.6 14l-1.6 7 5-2.6 5 2.6-1.6-7"/>',
  flask: '<path d="M9.5 3h5M10.5 3v6L5 19a1.5 1.5 0 001.3 2h11.4A1.5 1.5 0 0019 19l-5.5-10V3"/><path d="M7.5 15h9"/>',
  car: '<path d="M5 16.5V12l1.8-4.6A2 2 0 018.7 6h6.6a2 2 0 011.9 1.4L19 12v4.5"/><path d="M3.5 12h17v4.5h-17z"/><path d="M6 16.5V19M18 16.5V19"/><circle cx="7.5" cy="14.2" r=".6"/><circle cx="16.5" cy="14.2" r=".6"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 018 0v3"/><path d="M12 14.5v2.2"/>',
  scan: '<path d="M4 8V5.5A1.5 1.5 0 015.5 4H8M16 4h2.5A1.5 1.5 0 0120 5.5V8M20 16v2.5a1.5 1.5 0 01-1.5 1.5H16M8 20H5.5A1.5 1.5 0 014 18.5V16"/><path d="M4 12h16"/>',
  laser: '<path d="M4 20l9-9"/><path d="M14.5 3.5v3M18 6l-2 2M20.5 9.5h-3"/><circle cx="14.5" cy="9.5" r="1.5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 3.8 5.6 3.8 9S14.6 18.4 12 21c-2.6-2.6-3.8-5.6-3.8-9S9.4 5.6 12 3z"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  wifi: '<path d="M2.5 9a14 14 0 0119 0M5.8 12.4a9.2 9.2 0 0112.4 0M9.2 15.8a4.4 4.4 0 015.6 0"/><circle cx="12" cy="19" r=".8"/>',
  mask: '<path d="M4 9c2.5-1 5-1.5 8-1.5s5.5.5 8 1.5v3.5c0 3.5-3.5 6-8 6s-8-2.5-8-6z"/><path d="M4 10.5H2.5M20 10.5h1.5M8.5 11.5h7M9 14.5h6"/>',
  heart: '<path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0112 7.3 4.3 4.3 0 0119.5 10c0 5.6-7.5 10-7.5 10z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0115 0"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[name] || I.tooth}</svg>`;
const ico = (name, cls = '') => `<span class="ico ${cls}">${svg(name)}</span>`;
const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const CHEVRON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const WA = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 21.8zM20.4 3.6A11.8 11.8 0 002 17.9L.3 24l6.3-1.6A11.8 11.8 0 0024 12c0-3.2-1.2-6.1-3.5-8.4z"/></svg>';
const IG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>';
const FB = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v1.9H8v3.2h2.6V21H14v-9.3h2.6l.4-3.2z"/></svg>';
const sm = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[name]}</svg>`;

/* ---------------------------------------------------------------
   Tratamentos
---------------------------------------------------------------- */
const T = [
  {
    slug: 'prevencao-clinico-geral', name: 'Clínico geral e prevenção', short: 'Prevenção',
    icon: 'shield', tags: ['Check-up digital', 'Limpeza', 'Cáries'],
    summary: 'Check-up digital que identifica problemas ainda no início, evitando tratamentos mais complexos.',
    title: 'A saúde do seu sorriso <em>começa pela prevenção</em>',
    lead: 'Com o check-up digital preventivo visualizamos e diagnosticamos problemas em estágio inicial — antes que virem dor, desconforto ou tratamentos longos.',
    body: `
<h2>O que é o check-up digital preventivo?</h2>
<p>A prevenção de doenças é a melhor condição de saúde para você e sua família. Na odontologia, a prevenção está em alta: com o <strong>check-up digital</strong> aliado a métodos preventivos, conseguimos evitar doenças ou tratá-las ainda no início.</p>
<p>Ele promove a manutenção da saúde bucal, que está diretamente ligada a uma boa qualidade de vida.</p>
<h2>O que acompanhamos no clínico geral</h2>
<ul>
  <li>Avaliação completa de dentes, gengiva e mordida</li>
  <li>Diagnóstico precoce de cáries e desgastes</li>
  <li>Limpeza profissional, remoção de tártaro e orientação de higiene</li>
  <li>Tratamento de cáries e pequenas restaurações</li>
  <li>Encaminhamento integrado para as especialidades, quando necessário</li>
</ul>
<div class="callout"><strong>Dica:</strong> o ideal é visitar o dentista a cada 6 meses. Problemas descobertos cedo são mais simples, rápidos e confortáveis de resolver.</div>`,
    faq: [
      ['Com que frequência devo fazer check-up?', 'Para a maioria das pessoas, a cada seis meses. Em alguns casos — tratamento ortodôntico, doença gengival ou implantes — o intervalo pode ser menor.'],
      ['O check-up é para crianças também?', 'Sim. A Sociedade Brasileira de Odontopediatria recomenda a primeira consulta logo após o surgimento dos primeiros dentes.'],
    ],
  },
  {
    slug: 'restauracao', name: 'Restauração dos dentes', short: 'Restaurações',
    icon: 'restore', tags: ['Cáries', 'Resina', 'Porcelana'],
    summary: 'Devolvemos função e estética a dentes com cárie ou fraturados, com resina ou porcelana.',
    title: 'Dentes restaurados com <em>aparência natural</em>',
    lead: 'Após a remoção de cáries ou a fratura de um dente, ele precisa ser restaurado para recuperar a mastigação e a estética do sorriso.',
    body: `
<h2>Como funciona</h2>
<p>A restauração recupera a forma e a função do dente comprometido. Utilizamos materiais modernos que se integram à cor natural dos dentes, tornando o tratamento praticamente imperceptível.</p>
<h2>Troca de restaurações antigas</h2>
<p>Também é possível <strong>substituir restaurações de amálgama (as prateadas)</strong> por restaurações em resina ou porcelana — mais estéticas e com excelente durabilidade.</p>
<div class="cards-2">
  <div class="mini-card"><h3>Resina composta</h3><p>Ideal para cáries e pequenas fraturas, feita em uma única sessão e na cor exata do seu dente.</p></div>
  <div class="mini-card"><h3>Porcelana (inlay / onlay)</h3><p>Indicada para perdas maiores de estrutura, com alta resistência e acabamento natural.</p></div>
</div>`,
    faq: [
      ['Restauração dói?', 'Não. O procedimento é feito com anestesia local e técnicas modernas, garantindo conforto durante todo o atendimento.'],
      ['Vale a pena trocar restaurações prateadas?', 'Quando estão desgastadas, infiltradas ou incomodam esteticamente, sim. Avaliamos cada caso na consulta.'],
    ],
  },
  {
    slug: 'estetica-dental', name: 'Estética dental', short: 'Estética',
    icon: 'sparkle', tags: ['Lentes de contato', 'Facetas', 'Clareamento'],
    summary: 'Lentes de contato, facetas de porcelana e clareamento para um sorriso harmônico e natural.',
    title: 'Um sorriso bonito <em>eleva a sua autoestima</em>',
    lead: 'Os tratamentos estéticos evoluíram muito. Hoje existem técnicas que devolvem forma, cor e textura aos dentes com resultado natural.',
    image: { src: 'caso-lentes.jpg', caption: 'Lentes de contato dental · caso clínico Dr. Bruno Aiello' },
    body: `
<h2>Estética com função</h2>
<p>A estética dental busca, com as técnicas e materiais mais modernos, devolver a função e a harmonia do sorriso. Para isso utilizamos <strong>facetas, lentes de contato de porcelana, inlays, onlays e coroas metal free</strong>, que recriam a forma, a cor e a textura dos dentes de maneira natural.</p>
<p>Lembre-se: além da saúde bucal, um sorriso bonito é fundamental na sua apresentação pessoal.</p>
<h2>Lentes de contato dental</h2>
<p>Lâminas ultrafinas de porcelana aplicadas sobre os dentes para corrigir cor, formato, pequenos desalinhamentos e espaços — em muitos casos <strong>sem desgaste dental</strong>.</p>
<h2>Clareamento</h2>
<p>Com o passar dos anos os dentes escurecem e ficam amarelados. O clareamento ajuda a recuperar a cor natural:</p>
<div class="cards-2">
  <div class="mini-card"><h3>A laser (consultório)</h3><p>Aplicação de gel clareador associado a uma fonte de luz, com resultado rápido.</p></div>
  <div class="mini-card"><h3>Com moldeiras (caseiro)</h3><p>Moldeira personalizada com gel clareador, clareando de forma gradual ao longo do uso.</p></div>
</div>
<p>Há ainda o <strong>clareamento interno</strong>, indicado para dentes que escureceram após trauma ou tratamento de canal.</p>`,
    faq: [
      ['Como o clareamento funciona?', 'Os dentes acumulam pigmentos, principalmente de alimentos e bebidas com corantes. O gel clareador quebra esses pigmentos, devolvendo uma cor mais clara.'],
      ['Lentes de contato desgastam os dentes?', 'Na maioria dos casos o desgaste é mínimo ou inexistente. A indicação é definida após avaliação e planejamento digital do sorriso.'],
      ['O clareamento causa sensibilidade?', 'Pode haver sensibilidade passageira. Usamos protocolos e produtos que reduzem esse desconforto.'],
    ],
  },
  {
    slug: 'implantes-carga-imediata', name: 'Implantes e carga imediata', short: 'Implantes',
    icon: 'implant', tags: ['Carga imediata', 'Prótese', 'Reabilitação'],
    summary: 'Raízes de titânio que substituem dentes perdidos — com possibilidade de dentes no dia seguinte.',
    title: 'Implantes dentários com <em>99% de sucesso</em>',
    lead: 'Implantes são raízes artificiais de titânio, instaladas na maxila ou mandíbula para substituir um ou mais dentes — devolvendo estética, função e qualidade de vida.',
    stats: [['99%', 'taxa de sucesso dos implantes'], ['24h', 'dentes no dia seguinte com carga imediata*'], ['45–60', 'dias, em média, entre cirurgia e prótese']],
    body: `
<h2>O que é um implante?</h2>
<p>A substituição do dente perdido permite confeccionar próteses sobre o implante, possibilitando a reabilitação estética e funcional e devolvendo autoestima a quem perdeu dentes — seja quem usa dentadura e não mastiga bem, seja quem tem vergonha de sorrir.</p>
<h2>Tempo de tratamento</h2>
<p>O tempo depende de cada caso. Em reabilitações da arcada inferior e superior, o intervalo entre a cirurgia e a instalação dos dentes costuma variar entre <strong>45 dias e 2 meses</strong> (quando não há enxerto ósseo).</p>
<h2>Carga imediata</h2>
<p>Dependendo da condição óssea do paciente, conseguimos <strong>instalar os dentes no dia seguinte à cirurgia</strong>. É a técnica chamada de carga imediata.</p>
<div class="callout">Na A1 Odontologia essas reduções de tempo são possíveis graças às técnicas e equipamentos cirúrgicos utilizados e aos <strong>implantes de primeira linha com superfície tratada por nanotecnologia</strong> (importados dos EUA, Suíça e França), que permitem recuperação mais rápida.</div>
<p class="small-note">* Conforme avaliação clínica e condição óssea de cada paciente.</p>`,
    faq: [
      ['Quem pode colocar implante?', 'A maioria dos adultos com boa saúde geral. Avaliamos a quantidade e qualidade óssea com exames de imagem; quando falta osso, pode ser indicado um enxerto.'],
      ['A cirurgia dói?', 'É feita com anestesia local e costuma ser bem tolerada. O pós-operatório é acompanhado de perto pela equipe.'],
      ['Quanto tempo dura um implante?', 'Com boa higiene e acompanhamento periódico, o implante pode durar a vida toda.'],
    ],
  },
  {
    slug: 'periodontia', name: 'Periodontia', short: 'Gengiva',
    icon: 'drop', tags: ['Gengivite', 'Periodontite', 'Sangramento'],
    summary: 'Prevenção e tratamento das doenças da gengiva e do osso que sustentam os dentes.',
    title: 'Gengiva saudável, <em>dentes firmes</em>',
    lead: 'A periodontia cuida da prevenção e do tratamento das doenças que afetam os tecidos de sustentação e proteção dos dentes — a gengiva e o osso.',
    body: `
<h2>Gengivite</h2>
<p>A gengivite é uma inflamação dos tecidos gengivais ao redor do dente, geralmente causada pela placa bacteriana. A gengiva é tão importante quanto o dente — para mantê-la saudável, além da escovação, é fundamental passar o fio dental corretamente.</p>
<h2>Periodontite</h2>
<p>Se a gengivite não for tratada, a infecção pode se espalhar e comprometer a estrutura que sustenta os dentes: a gengiva começa a se soltar e retrair. A placa avança em direção às raízes, às fibras de sustentação e ao osso.</p>
<h2>Sinais de alerta</h2>
<ul>
  <li>Sangramento ao escovar ou passar fio dental</li>
  <li>Gengiva vermelha, inchada ou sensível</li>
  <li>Mau hálito persistente</li>
  <li>Retração gengival ou dentes "mais compridos"</li>
  <li>Dentes com mobilidade</li>
</ul>
<div class="callout">Para evitar problemas futuros, além da higiene bucal, o ideal é visitar o dentista <strong>a cada 6 meses</strong>.</div>`,
    faq: [
      ['Gengiva sangrando é normal?', 'Não. Sangramento é sinal de inflamação e deve ser avaliado — quanto antes, mais simples o tratamento.'],
    ],
  },
  {
    slug: 'endodontia-canal', name: 'Endodontia (canal)', short: 'Canal',
    icon: 'canal', tags: ['Sessão única', 'Indolor', 'Especialistas'],
    summary: 'Tratamento de canal moderno, rápido e indolor — 85% dos casos resolvidos em sessão única.',
    title: 'Tratamento de canal <em>rápido e indolor</em>',
    lead: 'Atualmente o tratamento de canal é simples, rápido, indolor e com alto índice de sucesso. Em nossa equipe, apenas especialistas tratam o seu caso.',
    stats: [['85%', 'dos casos resolvidos em sessão única'], ['98%', 'de sucesso com aparelhos específicos'], ['100%', 'dos tratamentos feitos por especialistas']],
    body: `
<h2>Quando é necessário?</h2>
<p>Todo dente possui em seu interior um tecido chamado <strong>polpa dentária</strong>. Por causa de cáries ou restaurações profundas, ou de uma batida ou trauma, esse tecido pode inflamar ou até necrosar (perder a vitalidade). Nesses casos é necessário o tratamento de canal.</p>
<h2>Como é feito</h2>
<p>O tratamento consiste na remoção do "nervo" inflamado ou dos restos do tecido sem vitalidade, fazendo a limpeza da parte interna do dente e das raízes e preparando esse espaço para ser preenchido por um material de vedação.</p>
<div class="callout">Muitas vezes dentes <strong>sem dor ou desconforto</strong> podem ter um problema de canal. Por isso as visitas periódicas são importantes — sem tratamento, o dente pode doer no futuro e a resolução fica mais complexa.</div>`,
    faq: [
      ['Tratamento de canal dói?', 'Com as técnicas de última geração que utilizamos, o tratamento é indolor.'],
      ['Preciso de várias sessões?', 'Em cerca de 85% dos casos o tratamento é concluído em uma única sessão.'],
    ],
  },
  {
    slug: 'ortodontia', name: 'Ortodontia e ortopedia facial', short: 'Ortodontia',
    icon: 'braces', tags: ['Invisalign', 'Autoligado', 'Adultos e crianças'],
    summary: 'Aparelhos autoligados e alinhadores invisíveis Invisalign para corrigir dentes e mordida.',
    title: 'Dentes alinhados, <em>do jeito que combina com você</em>',
    lead: 'A ortodontia diagnostica, previne e trata irregularidades dos dentes e da face. Além de alinhar o sorriso, melhora a fala, a deglutição, a estética facial e até a respiração.',
    body: `
<h2>Não é só para crianças</h2>
<p>Engana-se quem associa o aparelho apenas a crianças e adolescentes: o número de adultos que buscam corrigir os dentes é cada vez maior, tanto pela estética quanto pela função.</p>
<h2>Sistema autoligado</h2>
<p>Os aparelhos autoligados oferecem um tratamento superior <strong>no menor tempo possível e com menos consultas</strong>. Menores e mais estéticos, acumulam menos alimento por não usarem borrachinhas, são menos agressivos à mucosa e facilitam a higiene — melhorando inclusive o hálito.</p>
<h2>Invisalign</h2>
<p>O Invisalign utiliza alinhadores sequenciais feitos sob medida, praticamente invisíveis, que reposicionam os dentes passo a passo.</p>
<ul>
  <li>Você retira os alinhadores para comer, escovar e passar fio dental</li>
  <li>Sem fios ou metais que irritam a boca</li>
  <li>Troca dos alinhadores a cada duas semanas</li>
  <li>Acompanhamento por ortodontista credenciado</li>
  <li>Resultados entre 6 meses e 1 ano</li>
</ul>
<h2>Ortopedia funcional dos maxilares</h2>
<p>Para crianças, aparelhos removíveis corrigem problemas de mordida, respiração e posição dos dentes. O melhor momento é entre os <strong>5 e os 13 anos</strong>.</p>`,
    faq: [
      ['Invisalign funciona para qualquer caso?', 'Funciona para a grande maioria dos casos. A indicação é feita após avaliação e planejamento digital.'],
      ['Adulto pode usar aparelho?', 'Sim, não há idade limite, desde que dentes e gengiva estejam saudáveis.'],
    ],
  },
  {
    slug: 'odontopediatria', name: 'Odontopediatria', short: 'Crianças',
    icon: 'kid', tags: ['Primeira consulta', 'Ortopedia', 'Prevenção'],
    summary: 'Cuidado leve e acolhedor para o sorriso das crianças, desde os primeiros dentinhos.',
    title: 'O sorriso dos pequenos <em>merece o melhor cuidado</em>',
    lead: 'A odontopediatria preserva e restaura o movimento mais lindo de uma criança: o sorriso. Buscamos uma boca saudável, sem cáries, gengivite, bruxismo ou manchas.',
    body: `
<h2>"Meu filho está com cárie!"</h2>
<p>A cárie sempre começa na cor <strong>branca</strong> e só depois se torna escura. A maioria dos pais não consegue identificar as cáries iniciais — por isso é tão importante fazer a primeira consulta o quanto antes. A Sociedade Brasileira de Odontopediatria recomenda que seja <strong>logo após o surgimento dos primeiros dentes</strong>.</p>
<h2>Mordida errada, chupeta, respiração pela boca?</h2>
<p>Os aparelhos removíveis corrigem problemas de mordida, respiração e posição dos dentes — e as crianças adoram usar! O melhor momento para essa correção está entre os <strong>5 e os 13 anos</strong>. A Dra. Helga Diesel trabalha com Ortopedia Funcional dos Maxilares.</p>
<h2>"O dente de leite está mole. Posso tirar em casa?"</h2>
<p>Não é recomendado. O dente pode estar preso à gengiva por um pedaço de raiz e a criança pode se machucar. O mais adequado é consultar um odontopediatra. Se o dente cair naturalmente, evite colocar a mão no espaço; se houver sangramento, ofereça um picolé ou faça compressa com gaze limpa.</p>`,
    faq: [
      ['Quando levar meu filho ao dentista pela primeira vez?', 'Logo após o nascimento dos primeiros dentes, por volta dos 6 meses a 1 ano de idade.'],
      ['Meu filho tem medo de dentista. E agora?', 'Nossa abordagem é lúdica e acolhedora, respeitando o tempo de cada criança para que a experiência seja positiva.'],
    ],
  },
  {
    slug: 'disfuncao-atm', name: 'Disfunções da ATM', short: 'ATM / DTM',
    icon: 'jaw', tags: ['Dor orofacial', 'Bruxismo', 'Estalos'],
    summary: 'Diagnóstico e tratamento de dores na mandíbula, estalos, bruxismo e dores de cabeça.',
    title: 'Dor na mandíbula <em>tem tratamento</em>',
    lead: 'Os distúrbios da ATM são o mau funcionamento da articulação da mandíbula, causado por desequilíbrio dentário, neuromuscular e articular. Também conhecido como dor orofacial.',
    body: `
<h2>Por que é importante tratar</h2>
<p>A disfunção pode afetar seriamente a qualidade de vida: a dor intensifica desequilíbrios hormonais, a irritabilidade e o estresse. Ruídos e estalos estão presentes na maioria dos casos e podem indicar problemas sérios na articulação.</p>
<h2>Quais são os sintomas?</h2>
<ul>
  <li>Dores de cabeça, irradiadas ou não para pescoço e ombros</li>
  <li>Dor de ouvido, ouvido "tampado" ou com zumbido</li>
  <li>Dor nas articulações da mandíbula e dificuldade para abrir a boca</li>
  <li>Sensação de dormência no rosto</li>
  <li>Ruídos ou estalos ao abrir e fechar a boca</li>
</ul>
<h2>Principais causas</h2>
<ul>
  <li>Mordida errada ou ausência de dentes</li>
  <li>Hábito noturno de ranger os dentes (bruxismo)</li>
  <li>Próteses mal ajustadas</li>
  <li>Espasmos musculares por tensão, ansiedade ou estresse</li>
  <li>Abertura excessiva da boca ou trauma na mandíbula</li>
</ul>`,
    faq: [
      ['Placa para bruxismo resolve?', 'A placa protege os dentes e alivia a musculatura, mas o tratamento ideal considera as causas — avaliamos cada caso individualmente.'],
    ],
  },
  {
    slug: 'cirurgia-bucomaxilofacial', name: 'Cirurgia bucomaxilofacial', short: 'Cirurgia',
    icon: 'scalpel', tags: ['Siso', 'Enxerto ósseo', 'Ortognática'],
    summary: 'Extração de sisos, enxertos ósseos, cirurgia ortognática e cirurgias da ATM.',
    title: 'Cirurgia com <em>segurança e precisão</em>',
    lead: 'A cirurgia bucomaxilofacial tem papel importante na estética, harmonia e função da face, em conjunto com a mordida.',
    body: `
<h2>Procedimentos que realizamos</h2>
<div class="cards-2">
  <div class="mini-card"><h3>Enxertos ósseos</h3><p>Restabelecem o osso em regiões onde o dente foi perdido há muito tempo, preparando para implantes.</p></div>
  <div class="mini-card"><h3>Terceiros molares (siso)</h3><p>Remoção preventiva de sisos inclusos, semi-inclusos ou erupcionados, que podem causar cáries, infecções e perda óssea.</p></div>
  <div class="mini-card"><h3>Cirurgia ortognática</h3><p>Em conjunto com a ortodontia, corrige alterações dento-esqueléticas que afetam mastigação, fala e harmonia facial.</p></div>
  <div class="mini-card"><h3>Cirurgia da ATM</h3><p>Indicada quando tratamentos conservadores não resolveram, como artroscopia ou reposicionamento do disco articular.</p></div>
</div>
<h2>Cistos e tumores</h2>
<p>Lesões intraósseas ou de tecidos moles às vezes são identificadas apenas em exames radiográficos de rotina. Nesses casos é necessária a biópsia e o tratamento cirúrgico por especialista.</p>`,
    faq: [
      ['Todo siso precisa ser extraído?', 'Nem sempre. A indicação depende da posição do dente e dos riscos que ele oferece — avaliamos com exame de imagem.'],
    ],
  },
];

/* ---------------------------------------------------------------
   Navegação / layout
---------------------------------------------------------------- */
const NAV = [
  ['index.html', 'Início'],
  ['a-clinica.html', 'A clínica'],
  ['equipe.html', 'Equipe'],
  ['tratamentos.html', 'Tratamentos', true],
  ['urgencia.html', 'Urgência'],
  ['contato.html', 'Contato'],
];

function layout({ path, title, description, body, active }) {
  const depth = path.split('/').length - 1;
  const b = depth ? '../'.repeat(depth) : '';
  const nav = NAV.map(([href, label, dd]) => {
    const cur = active === href ? ' aria-current="page"' : '';
    if (!dd) return `<a class="nav__link" href="${b}${href}"${cur}>${label}</a>`;
    return `<div class="nav__item">
      <button class="nav__link" type="button" aria-expanded="false" aria-haspopup="true"${cur}>${label} ${CHEVRON}</button>
      <div class="dropdown">
        ${T.map((t) => `<a href="${b}tratamentos/${t.slug}.html">${ico(t.icon)}<div><strong>${t.name}</strong><small>${t.tags.slice(0, 2).join(' · ')}</small></div></a>`).join('')}
        <a class="dropdown__all" href="${b}tratamentos.html">Ver todos os tratamentos ${ARROW}</a>
      </div>
    </div>`;
  }).join('\n');

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="theme-color" content="#0f4c52">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<link rel="icon" type="image/png" href="${b}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${b}assets/css/style.css">
<script>document.documentElement.classList.add('js')</script>
</head>
<body>
<a class="sr-only skip" href="#conteudo">Pular para o conteúdo</a>
<div class="topbar">
  <div class="container">
    <div class="topbar__group">
      <a class="topbar__item topbar__urgent" href="${b}urgencia.html"><span class="dot"></span> Atendimento de urgência</a>
      <span class="topbar__item">${sm('clock')} ${C.hoursWeek} · Sáb 8h às 12h</span>
    </div>
    <div class="topbar__group">
      <a class="topbar__item" href="${C.phone1Href}">${sm('phone')} ${C.phone1}</a>
      <a class="topbar__item topbar__hide-md" href="mailto:${C.email}">${sm('mail')} ${C.email}</a>
    </div>
  </div>
</div>
<header class="header">
  <div class="container">
    <a class="logo" href="${b}index.html" aria-label="A1 Odontologia — página inicial"><img src="${b}assets/img/logo-a1.png" alt="A1 Odontologia" width="89" height="58"></a>
    <nav class="nav" aria-label="Principal">
      ${nav}
      <div class="nav__mobile-cta">
        <a class="btn btn--primary" href="${b}contato.html#agendar">Agendar consulta</a>
        <a class="btn btn--ghost" href="${waLink()}" target="_blank" rel="noopener">${WA} ${C.whats}</a>
      </div>
    </nav>
    <div class="header__cta">
      <a class="btn btn--primary btn--sm" href="${b}contato.html#agendar">Agendar consulta</a>
      <button class="burger" type="button" aria-label="Abrir menu" aria-expanded="false"><span></span></button>
    </div>
  </div>
</header>
<div class="nav-backdrop"></div>
<main id="conteudo">
${body(b)}
</main>
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <a class="footer__logo" href="${b}index.html"><img src="${b}assets/img/logo-a1.png" alt="A1 Odontologia" width="86" height="56" loading="lazy"></a>
        <p>Odontologia multidisciplinar a 100 metros da Avenida Paulista. Ciência atualizada e cuidado humano em cada atendimento.</p>
        <div class="social">
          <a href="${C.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${IG}</a>
          <a href="${C.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${FB}</a>
          <a href="${waLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${WA}</a>
        </div>
      </div>
      <div>
        <h4>Navegue</h4>
        <ul>
          <li><a href="${b}a-clinica.html">A clínica</a></li>
          <li><a href="${b}a-clinica.html#diferenciais">Diferenciais</a></li>
          <li><a href="${b}equipe.html">Nossa equipe</a></li>
          <li><a href="${b}urgencia.html">Urgência</a></li>
          <li><a href="${b}contato.html">Contato</a></li>
        </ul>
      </div>
      <div>
        <h4>Tratamentos</h4>
        <ul>
          ${T.slice(0, 6).map((t) => `<li><a href="${b}tratamentos/${t.slug}.html">${t.name}</a></li>`).join('')}
          <li><a href="${b}tratamentos.html">Ver todos →</a></li>
        </ul>
      </div>
      <div>
        <h4>Visite-nos</h4>
        <ul>
          <li>${C.address}<br>${C.district}</li>
          <li><a href="${C.phone1Href}">${C.phone1}</a> · <a href="${C.phone2Href}">${C.phone2}</a></li>
          <li><a href="${waLink()}" target="_blank" rel="noopener">WhatsApp ${C.whats}</a></li>
          <li>${C.hoursWeek}<br>${C.hoursSat}</li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span>© <span data-year>2026</span> A1 Odontologia · ${C.cro}</span>
      <span>Informações sobre planos odontológicos devem ser consultadas por telefone antes do agendamento.</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${waLink()}" target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp">${WA}<span>Agende pelo WhatsApp</span></a>
<script src="${b}assets/js/main.js" defer></script>
</body>
</html>
`;
}

const ctaBand = (b) => `
<section class="section--tight">
  <div class="container">
    <div class="cta-band reveal">
      <div>
        <h2>Pronto para cuidar do <em>seu sorriso?</em></h2>
        <p>Agende sua avaliação. Nossa equipe retorna rapidamente para confirmar o melhor dia e horário para você.</p>
      </div>
      <div class="cta-band__actions">
        <a class="btn btn--light" href="${b}contato.html#agendar">Agendar consulta ${ARROW}</a>
        <a class="btn btn--outline-light" href="${waLink()}" target="_blank" rel="noopener">${WA} WhatsApp</a>
      </div>
    </div>
  </div>
</section>`;

const pageHero = (b, crumbs, eyebrow, title, lead, icon) => `
<section class="page-hero${icon ? ' page-hero--with-icon' : ''}">
  <div class="container">
    <div>
      <nav class="breadcrumb" aria-label="Você está em">
        <a href="${b}index.html">Início</a>
        ${crumbs.map(([h, l]) => `<span aria-hidden="true">/</span>${h ? `<a href="${b}${h}">${l}</a>` : `<span>${l}</span>`}`).join('')}
      </nav>
      <span class="eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      <p class="lead">${lead}</p>
    </div>
    ${icon ? `<div class="page-hero__icon">${svg(icon)}</div>` : ''}
  </div>
</section>`;

const DIFERENCIAIS = [
  ['scan', 'Equipamentos de última geração', 'Atendimento personalizado com tecnologia moderna e check-up digital.'],
  ['award', 'Especialistas, mestres e doutores', 'Profissionais com grande experiência em cada especialidade.'],
  ['flask', 'Melhores laboratórios', 'Parceria com os melhores laboratórios de prótese de São Paulo e do Brasil.'],
  ['pin', '100 m da Avenida Paulista', 'Localização privilegiada, próxima ao metrô Brigadeiro (Linha Verde).'],
  ['car', 'Estacionamento conveniado', 'Convênio com o estacionamento do Hotel Capcana.'],
  ['lock', 'Segurança privada', 'Edifício com segurança privada para sua tranquilidade.'],
  ['laser', 'Tratamentos com laser', 'Procedimentos mais confortáveis e com recuperação rápida.'],
  ['globe', 'Inglês e espanhol', 'Atendimento também em inglês e espanhol.'],
  ['calendar', 'Horários flexíveis', 'De segunda a sábado, com horários que cabem na sua rotina.'],
];

const DOCTORS = [
  {
    name: 'Dr. Bruno Aiello Barbosa', cro: 'CRO 88303', photo: 'dr-bruno.jpg', tag: 'Gestor clínico · Adultos',
    areas: ['Implantes', 'Prótese', 'Reabilitação oral', 'Estética'],
    cv: [
      'Graduação pela Universidade Sagrado Coração de Bauru (USC)',
      'Mestre e Doutor em Odontologia pela Faculdade de Odontologia de Bauru (USP)',
      'Professor do Mestrado em Implantologia da São Leopoldo Mandic',
      'Certificado pela Digital Smile Design',
      'Autor de livros e trabalhos publicados no Brasil e no exterior',
      'Membro da Sociedade Brasileira de Odontologia Estética (SBOE)',
    ],
  },
  {
    name: 'Dra. Helga Diesel', cro: 'CRO 104935', photo: 'dra-helga.jpg', tag: 'Gestora clínica · Crianças',
    areas: ['Clínica geral', 'Odontopediatria', 'Ortopedia funcional'],
    cv: [
      'Cirurgiã-dentista formada pela Universidade Estadual de Londrina',
      'Especialista em Odontopediatria pela Associação Maringaense de Odontologia',
      'Ortopedia Funcional dos Maxilares pela AONP',
      'Odontologia Hospitalar pelo Hospital Sírio-Libanês',
      'Membro da Associação Paulista de Odontopediatria',
    ],
  },
];

/* ---------------------------------------------------------------
   Páginas
---------------------------------------------------------------- */
const pages = [];

// HOME ------------------------------------------------------------
const NEEDS = [
  ['ortodontia', 'Alinhar os dentes', 'Invisalign, autoligado e ortopedia facial.'],
  ['implantes-carga-imediata', 'Repor dentes perdidos', 'Implantes com carga imediata.'],
  ['estetica-dental', 'Sorriso mais bonito', 'Lentes de contato, facetas e clareamento.'],
  ['odontopediatria', 'Cuidar dos filhos', 'Odontopediatria leve e acolhedora.'],
  ['prevencao-clinico-geral', 'Check-up e limpeza', 'Prevenção com check-up digital.'],
  ['restauracao', 'Tratar cáries', 'Restaurações em resina ou porcelana.'],
];
pages.push({
  path: 'index.html', active: 'index.html',
  title: 'A1 Odontologia | Clínica odontológica no Paraíso, São Paulo',
  description: 'Clínica odontológica a 100 m da Av. Paulista. Implantes com carga imediata, Invisalign, lentes de contato, odontopediatria e atendimento de urgência.',
  body: (b) => `
<section class="hero">
  <div class="container">
    <div>
      <span class="hero__badge reveal"><b>ABERTO</b> Atendendo normalmente · seg a sáb</span>
      <h1 class="reveal" data-delay="1">Cuidado que vem da alma e <em>passa pelo coração.</em></h1>
      <p class="lead reveal" data-delay="2">Odontologia multidisciplinar baseada na ciência mais atual — com especialistas, mestres e doutores a 100 metros da Avenida Paulista.</p>
      <div class="hero__actions reveal" data-delay="3">
        <a class="btn btn--primary" href="${b}contato.html#agendar">Agendar avaliação ${ARROW}</a>
        <a class="btn btn--ghost" href="${b}tratamentos.html">Conhecer tratamentos</a>
      </div>
      <div class="hero__meta reveal" data-delay="3">
        <div><strong>99%</strong><span>sucesso em implantes</span></div>
        <div><strong>85%</strong><span>canais em sessão única</span></div>
        <div><strong>10</strong><span>especialidades</span></div>
      </div>
    </div>
    <div class="hero__visual reveal" data-delay="2">
      <div class="hero__ring"></div>
      <div class="hero__arch"><img src="${b}assets/img/caso-lentes.jpg" alt="Sorriso com lentes de contato dental — caso clínico da A1 Odontologia" width="1600" height="1067"></div>
      <p class="hero__caption">Lentes de contato dental · caso clínico Dr. Bruno Aiello</p>
      <div class="float-card float-card--b">${ico('award')}<div><strong>Mestres e doutores</strong><span>na equipe clínica</span></div></div>
      <div class="float-card float-card--a">${ico('pin')}<div><strong>100 m da Paulista</strong><span>Metrô Brigadeiro</span></div></div>
    </div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    ${[0, 1].map(() => `<span>Implantes</span><span>Carga imediata</span><span>Invisalign</span><span>Lentes de contato</span><span>Clareamento</span><span>Odontopediatria</span><span>Ortopedia facial</span><span>Canal em sessão única</span>`).join('')}
  </div>
</div>

<section class="section section--white">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <span class="eyebrow">O que você precisa?</span>
        <h2>Um tratamento para <em>cada momento</em> do seu sorriso</h2>
      </div>
      <p class="lead">Escolha o que você procura e conheça como podemos ajudar. Na dúvida, agende uma avaliação — montamos um plano de tratamento completo para você.</p>
    </div>
    <div class="need-grid">
      <a class="need need--feature reveal" href="${b}urgencia.html">
        ${ico('bolt')}
        <div>
          <h3>Dor de dente ou dente quebrado?</h3>
          <p>Temos equipe de plantão para casos de urgência, de segunda a sábado.</p>
        </div>
        <span class="link-arrow" style="color:#8fd6db">Atendimento de urgência ${ARROW}</span>
      </a>
      ${NEEDS.map(([slug, h, p], i) => {
        const t = T.find((x) => x.slug === slug);
        return `<a class="need reveal" data-delay="${(i % 3) + 1}" href="${b}tratamentos/${slug}.html">${ico(t.icon)}<span class="need__arrow">${ARROW}</span><div><h3>${h}</h3><p>${p}</p></div></a>`;
      }).join('')}
    </div>
    <p style="text-align:center;margin-top:36px"><a class="link-arrow" href="${b}tratamentos.html">Ver todos os tratamentos ${ARROW}</a></p>
  </div>
</section>

<section class="section">
  <div class="container split">
    <div class="photo-stack reveal">
      <div class="photo-stack__main"><img src="${b}assets/img/dr-bruno.jpg" alt="Dr. Bruno Aiello ministrando aula" loading="lazy" width="908" height="764" style="object-position:62% 30%"></div>
      <div class="photo-stack__card"><strong>Ciência</strong><span>Tratamentos baseados em literatura e pesquisas mundiais atualizadas.</span></div>
    </div>
    <div class="reveal" data-delay="1">
      <span class="eyebrow">Nossa filosofia</span>
      <h2 style="margin-bottom:24px">Curar com ciência, <em>cuidar com sensibilidade</em></h2>
      <p class="quote">Trabalhamos para curar e cuidar de pessoas. A cura é sempre baseada em ciência; <em>o cuidado é dever de todos</em> em nossa clínica.</p>
      <ul class="checklist">
        <li>Equipe multidisciplinar — você no centro de todas as decisões</li>
        <li>Planejamento digital e equipamentos de última geração</li>
        <li>Implantes importados com tecnologia de superfície nanotecnológica</li>
      </ul>
      <a class="btn btn--dark" href="${b}a-clinica.html">Conheça a clínica ${ARROW}</a>
    </div>
  </div>
</section>

<section class="section section--teal">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <span class="eyebrow">Diferenciais</span>
        <h2>Por que escolher a <em>A1 Odontologia</em></h2>
      </div>
      <p class="lead">Da recepção ao pós-tratamento, cada detalhe foi pensado para que você se sinta seguro, confortável e bem cuidado.</p>
    </div>
    <div class="features reveal">
      ${DIFERENCIAIS.slice(0, 6).map(([i, h, p]) => `<div class="feature">${ico(i)}<h3>${h}</h3><p>${p}</p></div>`).join('')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container split split--reverse">
    <div class="team-teaser reveal">
      ${DOCTORS.map((d) => `<div class="team-mini"><img src="${b}assets/img/${d.photo}" alt="${d.name}" loading="lazy"><div class="team-mini__info"><strong>${d.name.replace(' Barbosa', '')}</strong><span>${d.areas.slice(0, 2).join(' · ')}</span></div></div>`).join('')}
    </div>
    <div class="reveal" data-delay="1">
      <span class="eyebrow">Nossa equipe</span>
      <h2 style="margin-bottom:22px">Especialistas que <em>cuidam de toda a família</em></h2>
      <p class="lead" style="margin-bottom:30px">A clínica é coordenada por dois gestores clínicos — um dedicado aos adultos e outro às crianças — com uma equipe de especialistas em cada área da odontologia.</p>
      <a class="btn btn--dark" href="${b}equipe.html">Conheça a equipe ${ARROW}</a>
    </div>
  </div>
</section>

<section class="section section--white">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Como funciona</span>
      <h2>Do agendamento ao <em>novo sorriso</em></h2>
    </div>
    <div class="steps">
      <div class="step reveal"><h3>Agendamento</h3><p>Pelo WhatsApp, telefone ou formulário — retornamos para confirmar.</p></div>
      <div class="step reveal" data-delay="1"><h3>Avaliação</h3><p>Check-up digital completo e conversa sobre suas expectativas.</p></div>
      <div class="step reveal" data-delay="2"><h3>Plano de tratamento</h3><p>Opções claras, etapas e prazos definidos com você.</p></div>
      <div class="step reveal" data-delay="3"><h3>Acompanhamento</h3><p>Manutenção periódica para o resultado durar.</p></div>
    </div>
  </div>
</section>

<section class="section--tight" style="padding-top:clamp(72px,10vw,128px)">
  <div class="container">
    <div class="urgent reveal">
      <div>
        <span class="eyebrow">Estamos de plantão</span>
        <h2>Dor de dente? <em>Dente quebrado?</em></h2>
        <p>Nos casos de urgência temos uma equipe pronta para atender você. Segunda a sexta das 8h às 19h e sábados das 8h às 12h.</p>
      </div>
      <div class="urgent__actions">
        <a class="btn btn--coral" href="${waLink('Olá! Preciso de um atendimento de urgência.')}" target="_blank" rel="noopener">${WA} Chamar no WhatsApp</a>
        <a class="btn btn--ghost" href="${C.phone1Href}">${sm('phone')} ${C.phone1}</a>
      </div>
    </div>
  </div>
</section>
${ctaBand(b)}`,
});

// A CLÍNICA ------------------------------------------------------
pages.push({
  path: 'a-clinica.html', active: 'a-clinica.html',
  title: 'A clínica | A1 Odontologia — São Paulo',
  description: 'Conheça a filosofia e os diferenciais da A1 Odontologia: especialistas, equipamentos modernos e localização a 100 m da Av. Paulista.',
  body: (b) => `
${pageHero(b, [[null, 'A clínica']], 'A1 Odontologia', 'Ciência para curar, <em>sensibilidade para cuidar</em>', 'Uma clínica multidisciplinar onde o paciente é sempre o centro das atenções.')}
<section class="section" style="padding-top:0">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Nossa filosofia</span>
      <p class="quote">"Trabalhamos para curar e cuidar de seres humanos com problemas orofaciais. A cura será sempre baseada em princípios científicos atualizados em literaturas e pesquisas mundiais. Já o cuidado com o ser humano é dever de todos em nossa clínica, <em>permeado pela sensibilidade que vem da alma e passa pelo coração.</em>"</p>
    </div>
    <div class="reveal" data-delay="1">
      <p class="lead" style="margin-bottom:22px">Nossa clínica segue um método de tratamento realizado por uma <strong>equipe multidisciplinar</strong>. Acreditamos que cirurgiões-dentistas capacitados nas diversas áreas da odontologia, trabalhando juntos, oferecem o melhor resultado de saúde e estética para o seu sorriso.</p>
      <ul class="checklist">
        <li>Diagnóstico integrado entre especialidades</li>
        <li>Planejamento digital do sorriso</li>
        <li>Materiais e implantes importados de primeira linha</li>
        <li>Acompanhamento próximo em todas as etapas</li>
      </ul>
      <a class="btn btn--dark" href="${b}equipe.html">Conheça a equipe ${ARROW}</a>
    </div>
  </div>
</section>
<section class="section section--white" id="diferenciais">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <span class="eyebrow">Nossos diferenciais</span>
        <h2>Pensado para o seu <em>conforto e segurança</em></h2>
      </div>
      <p class="lead">Estrutura completa, especialistas experientes e uma localização que facilita a sua rotina.</p>
    </div>
    <div class="features features--light reveal">
      ${DIFERENCIAIS.map(([i, h, p]) => `<div class="feature">${ico(i)}<h3>${h}</h3><p>${p}</p></div>`).join('')}
    </div>
    <p style="margin-top:20px;color:var(--ink-3);font-size:.92rem;text-align:center">Também oferecemos check-up digital e Wi-Fi gratuito para pacientes.</p>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="reveal">
      <span class="eyebrow">Localização</span>
      <h2 style="margin-bottom:20px">No Paraíso, a <em>100 metros da Paulista</em></h2>
      <p class="lead" style="margin-bottom:28px">Fácil acesso pelo metrô Brigadeiro (Linha Verde) e estacionamento conveniado com o Hotel Capcana.</p>
      <div class="info-list">
        <div class="info">${ico('pin')}<div><h3>Endereço</h3><p>${C.address}<br>${C.district}</p></div></div>
        <div class="info">${ico('clock')}<div><h3>Horário</h3><p>${C.hoursWeek}<br>${C.hoursSat}</p></div></div>
      </div>
    </div>
    <div class="map reveal" data-delay="1" style="aspect-ratio:1/1"><iframe title="Mapa da A1 Odontologia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed"></iframe></div>
  </div>
</section>
${ctaBand(b)}`,
});

// EQUIPE ----------------------------------------------------------
pages.push({
  path: 'equipe.html', active: 'equipe.html',
  title: 'Nossa equipe | A1 Odontologia — dentistas especialistas em São Paulo',
  description: 'Conheça os gestores clínicos da A1 Odontologia: Dr. Bruno Aiello (implantes, prótese e estética) e Dra. Helga Diesel (odontopediatria e clínica geral).',
  body: (b) => `
${pageHero(b, [[null, 'Equipe']], 'Nossa equipe', 'Especialistas, mestres e <em>doutores</em>', 'Nossa equipe conta com profissionais de grande experiência em suas especialidades, coordenados por dois gestores clínicos.')}
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="team-grid">
      ${DOCTORS.map((d, i) => `
      <article class="doctor reveal" data-delay="${i + 1}">
        <div class="doctor__photo"><img src="${b}assets/img/${d.photo}" alt="${d.name}" loading="lazy"><span class="doctor__tag">${d.tag}</span></div>
        <div class="doctor__body">
          <h3>${d.name}</h3>
          <p class="doctor__cro">${d.cro}</p>
          <div class="chips">${d.areas.map((a) => `<span class="chip">${a}</span>`).join('')}</div>
          <ul class="checklist">${d.cv.map((c) => `<li>${c}</li>`).join('')}</ul>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>
<section class="section section--teal">
  <div class="container">
    <div class="section-head section-head--center">
      <span class="eyebrow">Equipe multidisciplinar</span>
      <h2>Um especialista para <em>cada necessidade</em></h2>
      <p class="lead">Além dos gestores clínicos, contamos com especialistas em todas as áreas — trabalhando juntos no seu plano de tratamento.</p>
    </div>
    <div class="features reveal">
      ${T.slice(0, 9).map((t) => `<a class="feature" href="${b}tratamentos/${t.slug}.html">${ico(t.icon)}<h3>${t.name}</h3><p>${t.summary}</p></a>`).join('')}
    </div>
  </div>
</section>
${ctaBand(b)}`,
});

// TRATAMENTOS (hub) ---------------------------------------------
pages.push({
  path: 'tratamentos.html', active: 'tratamentos.html',
  title: 'Tratamentos | A1 Odontologia — São Paulo',
  description: 'Implantes, ortodontia e Invisalign, estética dental, odontopediatria, canal, periodontia, ATM e cirurgia. Conheça os tratamentos da A1 Odontologia.',
  body: (b) => `
${pageHero(b, [[null, 'Tratamentos']], 'Tratamentos', 'Tudo para o seu sorriso <em>em um só lugar</em>', 'Para nossa equipe o paciente é sempre o centro das atenções. As diversas áreas da odontologia trabalham juntas para cuidar de você da melhor maneira.')}
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="tr-grid">
      ${T.map((t, i) => `
      <a class="tr-card reveal" data-delay="${(i % 3) + 1}" href="${b}tratamentos/${t.slug}.html">
        ${ico(t.icon)}
        <h3>${t.name}</h3>
        <p>${t.summary}</p>
        <div class="tags">${t.tags.map((x) => `<span>${x}</span>`).join('')}</div>
        <span class="link-arrow">Saiba mais ${ARROW}</span>
      </a>`).join('')}
      <a class="tr-card reveal" href="${b}urgencia.html" style="background:#fff4ef;border-color:#f6d3c6">
        ${ico('bolt', '')}
        <h3>Urgência odontológica</h3>
        <p>Dor de dente, dente quebrado ou trauma? Temos equipe de plantão para atender você.</p>
        <div class="tags"><span>Dor de dente</span><span>Dente quebrado</span></div>
        <span class="link-arrow" style="color:#d65a39">Saiba mais ${ARROW}</span>
      </a>
    </div>
  </div>
</section>
${ctaBand(b)}`,
});

// URGÊNCIA --------------------------------------------------------
pages.push({
  path: 'urgencia.html', active: 'urgencia.html',
  title: 'Urgência odontológica | A1 Odontologia — dor de dente em São Paulo',
  description: 'Dor de dente ou dente quebrado? A A1 Odontologia tem equipe de plantão de segunda a sábado. Agende pelo WhatsApp (11) 95000-3382.',
  body: (b) => `
${pageHero(b, [[null, 'Urgência']], 'Estamos de plantão', 'Dor de dente? <em>Dente quebrado?</em>', 'Nos casos de urgência temos uma equipe pronta para atender você — de segunda a sexta das 8h às 19h e aos sábados das 8h às 12h.', 'bolt')}
<section class="section" style="padding-top:0">
  <div class="container">
    <div class="urgent reveal">
      <div>
        <span class="eyebrow">Atendimento rápido</span>
        <h2>Fale agora com a <em>nossa equipe</em></h2>
        <p>Envie uma mensagem pelo WhatsApp contando o que aconteceu. Vamos encaixar seu atendimento o mais rápido possível.</p>
      </div>
      <div class="urgent__actions">
        <a class="btn btn--coral" href="${waLink('Olá! Preciso de um atendimento de urgência.')}" target="_blank" rel="noopener">${WA} ${C.whats}</a>
        <a class="btn btn--ghost" href="${C.phone1Href}">${sm('phone')} ${C.phone1}</a>
      </div>
    </div>
  </div>
</section>
<section class="section section--white">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Enquanto isso</span>
      <h2>O que fazer até a <em>sua consulta</em></h2>
    </div>
    <div class="protocol">
      <div class="mini-card reveal">${ico('tooth')}<div><h3>Dente quebrado</h3><p>Guarde o fragmento em leite ou soro fisiológico e traga para a consulta. Evite mastigar do lado afetado.</p></div></div>
      <div class="mini-card reveal" data-delay="1">${ico('drop')}<div><h3>Sangramento</h3><p>Faça compressão com gaze limpa por alguns minutos. Se não parar, procure atendimento imediatamente.</p></div></div>
      <div class="mini-card reveal">${ico('heart')}<div><h3>Dor de dente</h3><p>Evite alimentos muito quentes, frios ou doces. Não coloque medicamentos diretamente sobre o dente ou a gengiva.</p></div></div>
      <div class="mini-card reveal" data-delay="1">${ico('jaw')}<div><h3>Inchaço no rosto</h3><p>Compressas frias por fora ajudam a aliviar. Inchaço pode indicar infecção — não espere para ser avaliado.</p></div></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="section-head">
      <span class="eyebrow">Protocolo de atendimento</span>
      <h2>Para um atendimento <em>tranquilo e seguro</em></h2>
    </div>
    <div class="protocol">
      <div class="mini-card reveal">${ico('clock')}<div><h3>Cumpra o horário agendado</h3><p>Chegue com no máximo 10 minutos de antecedência — e não se atrase.</p></div></div>
      <div class="mini-card reveal" data-delay="1">${ico('users')}<div><h3>Acompanhantes</h3><p>Se for necessário, traga apenas um acompanhante.</p></div></div>
    </div>
  </div>
</section>
${ctaBand(b)}`,
});

// CONTATO ---------------------------------------------------------
pages.push({
  path: 'contato.html', active: 'contato.html',
  title: 'Contato e agendamento | A1 Odontologia — São Paulo',
  description: 'Agende sua consulta na A1 Odontologia. Rua Manuel da Nóbrega, 211, Paraíso, São Paulo. Telefone (11) 4371-5359 e WhatsApp (11) 95000-3382.',
  body: (b) => `
${pageHero(b, [[null, 'Contato']], 'Contato', 'Vamos agendar a <em>sua consulta?</em>', 'Preencha o formulário e fale direto com a nossa equipe pelo WhatsApp, ou use o canal que preferir.')}
<section class="section" style="padding-top:0" id="agendar">
  <div class="container contact-grid">
    <div class="info-list reveal">
      <a class="info" href="${waLink()}" target="_blank" rel="noopener"><span class="ico" style="background:#e3f9ea;color:#1ea952">${WA}</span><div><h3>WhatsApp</h3><p>${C.whats}</p></div></a>
      <div class="info">${ico('phone')}<div><h3>Telefones</h3><p><a href="${C.phone1Href}">${C.phone1}</a><br><a href="${C.phone2Href}">${C.phone2}</a></p></div></div>
      <div class="info">${ico('mail')}<div><h3>E-mail</h3><p><a href="mailto:${C.email}">${C.email}</a></p></div></div>
      <div class="info">${ico('pin')}<div><h3>Endereço</h3><p>${C.address}<br>${C.district}</p></div></div>
      <div class="info">${ico('clock')}<div><h3>Horário de atendimento</h3><p>${C.hoursWeek}<br>${C.hoursSat}</p></div></div>
    </div>
    <div class="form-card reveal" data-delay="1">
      <h2>Agende sua consulta</h2>
      <p>Nós ligamos para você! Envie seus dados e entraremos em contato para confirmar.</p>
      <form class="form" data-whatsapp-form="${C.whatsNum}">
        <div class="field field--full"><label for="f-nome">Nome completo</label><input id="f-nome" name="nome" autocomplete="name" required></div>
        <div class="field"><label for="f-tel">Telefone / WhatsApp</label><input id="f-tel" name="telefone" type="tel" inputmode="tel" autocomplete="tel" placeholder="(11) 90000-0000" required></div>
        <div class="field"><label for="f-trat">Tratamento</label>
          <select id="f-trat" name="tratamento">
            <option value="Avaliação geral">Avaliação geral</option>
            ${T.map((t) => `<option value="${t.name}">${t.name}</option>`).join('')}
            <option value="Urgência">Urgência</option>
          </select>
        </div>
        <div class="field field--full"><label>Melhor período</label>
          <div class="pills">
            <label><input type="radio" name="periodo" value="Manhã" checked><span>Manhã</span></label>
            <label><input type="radio" name="periodo" value="Tarde"><span>Tarde</span></label>
            <label><input type="radio" name="periodo" value="Noite (até 19h)"><span>Noite (até 19h)</span></label>
            <label><input type="radio" name="periodo" value="Sábado"><span>Sábado</span></label>
          </div>
        </div>
        <div class="field field--full"><label for="f-msg">Mensagem (opcional)</label><textarea id="f-msg" name="mensagem" placeholder="Conte um pouco sobre o que você precisa"></textarea></div>
        <button class="btn btn--primary" type="submit">${WA} Enviar pelo WhatsApp</button>
        <p class="form-note">${sm('shield').replace('<svg', '<svg width="18" height="18" style="flex:none;margin-top:2px"')} Informações sobre planos odontológicos devem ser consultadas por telefone antes do agendamento.</p>
      </form>
    </div>
  </div>
</section>
<section class="section--tight" style="padding-top:0">
  <div class="container">
    <div class="map reveal"><iframe title="Mapa da A1 Odontologia" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${encodeURIComponent(C.mapQuery)}&output=embed"></iframe></div>
  </div>
</section>`,
});

// PÁGINAS DE TRATAMENTO ------------------------------------------
for (const t of T) {
  pages.push({
    path: `tratamentos/${t.slug}.html`, active: 'tratamentos.html',
    title: `${t.name} | A1 Odontologia — São Paulo`,
    description: t.summary,
    body: (b) => `
${pageHero(b, [['tratamentos.html', 'Tratamentos'], [null, t.name]], t.name, t.title, t.lead, t.icon)}
<section class="section" style="padding-top:0">
  <div class="container article">
    <div class="prose">
      ${t.stats ? `<div class="stats-row reveal">${t.stats.map(([n, l]) => `<div class="stat"><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>` : ''}
      ${t.image ? `<figure class="case reveal" style="margin:0"><img src="${b}assets/img/${t.image.src}" alt="${t.image.caption}" loading="lazy"><figcaption>${t.image.caption}</figcaption></figure>` : ''}
      ${t.body}
      ${t.faq?.length ? `<h2>Dúvidas frequentes</h2><div class="faq">${t.faq.map(([q, a]) => `<details><summary>${q}</summary><div><p>${a}</p></div></details>`).join('')}</div>` : ''}
    </div>
    <aside class="aside">
      <div class="aside-card">
        <h3>Agende sua avaliação</h3>
        <p>Converse com um especialista em ${t.short.toLowerCase()} e receba um plano de tratamento personalizado.</p>
        <a class="btn btn--light" href="${b}contato.html?tratamento=${encodeURIComponent(t.name)}#agendar">Agendar consulta</a>
        <a class="btn btn--outline-light" href="${waLink(`Olá! Gostaria de saber mais sobre ${t.name}.`)}" target="_blank" rel="noopener">${WA} WhatsApp</a>
      </div>
      <nav class="aside-nav" aria-label="Outros tratamentos">
        <h4>Tratamentos</h4>
        ${T.map((x) => `<a href="${b}tratamentos/${x.slug}.html"${x.slug === t.slug ? ' aria-current="page"' : ''}>${x.name}</a>`).join('')}
      </nav>
    </aside>
  </div>
</section>
${ctaBand(b)}`,
  });
}

/* ---------------------------------------------------------------
   Escrita
---------------------------------------------------------------- */
for (const p of pages) {
  const out = join(ROOT, p.path);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, layout(p));
}

// 404 simples para o GitHub Pages
writeFileSync(join(ROOT, '404.html'), layout({
  path: '404.html', active: '', title: 'Página não encontrada | A1 Odontologia', description: 'Página não encontrada.',
  body: (b) => `${pageHero(b, [[null, '404']], 'Erro 404', 'Ops, essa página <em>não existe</em>', 'O endereço pode ter mudado. Que tal voltar para o início ou conhecer nossos tratamentos?')}
<section class="section" style="padding-top:0"><div class="container" style="display:flex;gap:12px;flex-wrap:wrap"><a class="btn btn--primary" href="${b}index.html">Ir para o início</a><a class="btn btn--ghost" href="${b}tratamentos.html">Ver tratamentos</a></div></section>`,
}));

console.log(`✔ ${pages.length + 1} páginas geradas.`);
