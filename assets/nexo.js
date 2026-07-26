(() => {
  const phone = "5531975344356";
  const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const responses = [
    {test:/vertice saude|aplicativo|app|plataforma|checklist eas|biblioteca normativa|uso offline/,text:"O <strong>Vértice Saúde</strong> é uma plataforma em desenvolvimento para profissionais que projetam estabelecimentos de saúde. A proposta reúne gestão de projetos, Checklist EAS, conferências técnicas, biblioteca normativa, apoio especializado e uso offline, com sincronização segura quando houver conexão."},
    {test:/qualifica|formacao|especializa|experiencia|mateus|arquiteto/,text:"Mateus José de Andrade Tavares é <strong>Arquiteto e Urbanista, CAU A302785-6</strong>, com pós-graduação em Projetos Hospitalares e Estabelecimentos de Saúde com ênfase em BIM e formação em auditoria, avaliações e perícias. Sua experiência assistencial e em segurança do paciente contribui especialmente para projetos de saúde."},
    {test:/empresa|vertice|quem (e|sao)|sobre voces/,text:"A <strong>Vértice Arquitetura e Avaliações</strong> atua em Ipatinga e região com projetos arquitetônicos, projetos para saúde e atividades de interesse à saúde, projetos comerciais e residenciais, além de avaliações, perícias, vistorias, laudos e relatórios técnicos."},
    {test:/vigilancia|sanitaria|saude|clinica|consultorio|farmacia|odont|estetica|laboratorio/,text:"A Vértice possui atuação especializada em <strong>estabelecimentos de saúde e de interesse à saúde</strong>, como clínicas, consultórios, farmácias, odontologia, estética e serviços de alimentação. O projeto considera fluxos, acessibilidade, higiene, materiais e requisitos aplicáveis ao processo de licenciamento sanitário."},
    {test:/comercial|loja|lanchonete|restaurante|empresa|escritorio|sala comercial/,text:"Nos <strong>projetos comerciais</strong>, a Vértice organiza atendimento, circulação, operação, apoio e identidade do espaço. O trabalho busca equilibrar experiência do cliente, funcionalidade, viabilidade e exigências específicas da atividade."},
    {test:/residencial|casa|apartamento|moradia|interior/,text:"Sim. A Vértice também desenvolve <strong>projetos arquitetônicos residenciais e de interiores</strong>, considerando rotina, conforto, aproveitamento do espaço, estética e orçamento. Posso encaminhar seu interesse para uma conversa inicial."},
    {test:/avaliacao|pericia|vistoria|laudo|parecer|imovel/,text:"A empresa realiza <strong>avaliações imobiliárias, perícias, vistorias, inspeções, laudos e pareceres técnicos</strong>. Para indicar o serviço adequado, é importante informar a finalidade, a cidade e o tipo de imóvel."},
    {test:/preco|valor|orcamento|quanto custa|custo/,text:"O valor depende do tipo de serviço, área, localização, complexidade e documentos necessários. Envie a cidade, o tipo de imóvel e o que precisa; o Arq. Mateus poderá analisar o escopo e preparar uma proposta."},
    {test:/prazo|demora|tempo/,text:"O prazo varia conforme o serviço, a área, a complexidade e eventuais análises de órgãos públicos. Após conhecer o imóvel e o objetivo, a Vértice informa um cronograma compatível com o escopo."},
    {test:/contato|whatsapp|telefone|falar|atendimento|contratar|proposta/,text:"Ótimo. Para continuar, clique no botão de WhatsApp abaixo. Se puder, informe na mensagem: <strong>cidade, tipo de imóvel, serviço desejado e área aproximada</strong>."}
  ];
  const initialQuick = ["Vértice Saúde","Projetos para Vigilância Sanitária","Projetos comerciais","Projetos residenciais","Qualificações do arquiteto","Avaliações e perícias"];
  const state = {opened:false, started:false, userMessages:[]};

  function mountVerticeSaudePromo(){
    const anchor = document.getElementById("especialidades");
    if(!anchor || document.querySelector(".vs-home")) return;

    const style = document.createElement("style");
    style.id = "vs-home-styles";
    style.textContent = `
      .vs-home{position:relative;overflow:hidden;padding:110px 0;background:#fff}
      .vs-home:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(10,111,179,.035) 1px,transparent 1px),linear-gradient(rgba(10,111,179,.035) 1px,transparent 1px);background-size:52px 52px;pointer-events:none}
      .vs-home .wrap{position:relative;z-index:1}
      .vs-home-grid{display:grid;grid-template-columns:.83fr 1.17fr;gap:72px;align-items:center}
      .vs-home-copy{max-width:520px}
      .vs-home-kicker{display:inline-flex;align-items:center;gap:9px;margin-bottom:18px;padding:8px 11px;border:1px solid rgba(178,138,62,.32);background:#fffaf2;color:#9a6d20;font-size:10px;font-weight:850;letter-spacing:.13em;text-transform:uppercase}
      .vs-home-kicker i{width:7px;height:7px;border-radius:50%;background:#d4a43d;box-shadow:0 0 0 4px rgba(212,164,61,.13)}
      .vs-home h2{max-width:520px;margin:0;color:#25292c;font:400 clamp(42px,4.8vw,65px)/1.02 Georgia,serif;letter-spacing:-.045em}
      .vs-home h2 em{color:#b96843;font-weight:400}
      .vs-home-intro{margin:25px 0 0;color:#687075;font-size:16px;line-height:1.78}
      .vs-home-features{display:grid;grid-template-columns:1fr 1fr;gap:11px;margin:28px 0 0}
      .vs-home-features span{display:flex;align-items:center;gap:10px;min-height:48px;padding:12px 14px;border:1px solid #e3e5e5;background:#fbfbfa;color:#4e575c;font-size:12px;font-weight:700}
      .vs-home-features i{display:grid;place-items:center;flex:none;width:23px;height:23px;border-radius:50%;background:#eef4fa;color:#0a6fb3;font-style:normal;font-size:12px}
      .vs-home-actions{display:flex;align-items:center;gap:18px;margin-top:32px}
      .vs-home-link{display:inline-flex;align-items:center;justify-content:space-between;min-width:235px;min-height:56px;padding:0 20px;border:1px solid #0a6fb3;color:#0a6fb3;font-size:12px;font-weight:850;transition:.2s ease}
      .vs-home-link:hover{background:#0a6fb3;color:#fff;transform:translateY(-2px)}
      .vs-home-note{color:#7b8387;font-size:10px;line-height:1.5}
      .vs-home-preview{overflow:hidden;border:1px solid #ddd8cf;border-radius:10px;background:#fff;box-shadow:0 28px 70px rgba(54,46,34,.16);transform:rotate(.5deg)}
      .vs-home-preview-head{display:flex;align-items:center;justify-content:space-between;gap:15px;padding:17px 19px;border-bottom:1px solid #e6e3dd;background:#fbfbfa}
      .vs-home-preview-brand{display:flex;align-items:center;gap:10px}
      .vs-home-preview-brand img{display:block;width:110px;height:auto}
      .vs-home-preview-brand span{padding-left:10px;border-left:1px solid #d9d4cc;color:#b96843;font:400 17px Georgia,serif}
      .vs-home-status{padding:7px 10px;border-radius:20px;background:#e9f1e6;color:#55784f;font-size:9px;font-weight:800}
      .vs-home-ui{display:grid;grid-template-columns:150px 1fr;min-height:425px}
      .vs-home-side{display:flex;flex-direction:column;gap:6px;padding:18px 13px;border-right:1px solid #e6e3dd;background:#fafaf9}
      .vs-home-side span{padding:10px 11px;border-radius:4px;color:#60686c;font-size:10px}
      .vs-home-side span:first-child{background:#edf3f9;color:#0a6fb3;font-weight:850}
      .vs-home-side small{margin-top:auto;padding:11px;border-radius:4px;background:#e9f1e6;color:#5f765b;font-size:8px;line-height:1.4}
      .vs-home-main{padding:25px}
      .vs-home-project-top{display:flex;align-items:flex-start;justify-content:space-between;gap:14px}
      .vs-home-project-top small{color:#8a9194;font-size:8px}
      .vs-home-project-top h3{margin:6px 0 5px;font:400 23px Georgia,serif}
      .vs-home-project-top p{margin:0;color:#7a8286;font-size:9px}
      .vs-home-project-top b{padding:7px 9px;border-radius:3px;background:#e9f1e6;color:#4f7d4a;font-size:8px}
      .vs-home-tabs{display:flex;gap:20px;margin-top:25px;border-bottom:1px solid #e5e7e8;color:#788084;font-size:9px}
      .vs-home-tabs strong{padding-bottom:10px;border-bottom:2px solid #0a6fb3;color:#0a6fb3}
      .vs-home-progress{display:flex;align-items:center;justify-content:space-between;margin-top:20px;color:#667075;font-size:9px}
      .vs-home-bar{height:6px;margin-top:8px;overflow:hidden;border-radius:10px;background:#e7e9ea}.vs-home-bar i{display:block;width:68%;height:100%;background:#0a6fb3}
      .vs-home-checks{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:17px}
      .vs-home-checks article{padding:14px;border:1px solid #e1e4e4;border-radius:4px;background:#fff}
      .vs-home-checks strong{display:block;margin-bottom:10px;font-size:9px}
      .vs-home-checks span{display:block;margin-top:7px;color:#626b70;font-size:8px}.vs-home-checks span:before{content:"✓";margin-right:6px;color:#4b9848;font-weight:900}.vs-home-checks .pending:before{content:"○";color:#8c9498}
      .vs-home-ref{display:flex;gap:10px;margin-top:12px;padding:13px;border:1px solid #e1e4e4;border-radius:4px;background:#fcfcfb}.vs-home-ref i{color:#0a6fb3;font-style:normal;font-size:19px}.vs-home-ref strong{display:block;font-size:9px}.vs-home-ref small{display:block;margin-top:4px;color:#747c80;font-size:8px;line-height:1.45}
      @media(max-width:980px){.vs-home-grid{grid-template-columns:1fr;gap:48px}.vs-home-copy{max-width:720px}.vs-home-preview{max-width:780px}}
      @media(max-width:760px){.vs-home{padding:78px 0}.vs-home-features{grid-template-columns:1fr}.vs-home-actions{align-items:stretch;flex-direction:column}.vs-home-link{width:100%}.vs-home-note{align-self:flex-start}.vs-home-ui{grid-template-columns:1fr}.vs-home-side{display:none}.vs-home-main{padding:20px}.vs-home-checks{grid-template-columns:1fr}.vs-home-preview-brand img{width:94px}.vs-home-preview-brand span{font-size:14px}.vs-home-status{font-size:8px}}
    `;
    document.head.append(style);

    const section = document.createElement("section");
    section.className = "vs-home";
    section.setAttribute("aria-labelledby", "vs-home-title");
    section.innerHTML = `<div class="wrap vs-home-grid"><div class="vs-home-copy"><div class="vs-home-kicker"><i></i> Tecnologia para quem projeta o cuidado</div><h2 id="vs-home-title">Conheça o <em>Vértice Saúde.</em></h2><p class="vs-home-intro">Uma plataforma em desenvolvimento para organizar projetos, checklists, referências oficiais e conferências técnicas de estabelecimentos de saúde em uma rotina mais clara, segura e rastreável.</p><div class="vs-home-features"><span><i>✓</i> Gestão de projetos</span><span><i>✓</i> Checklist EAS</span><span><i>✓</i> Biblioteca normativa</span><span><i>✓</i> Uso offline</span></div><div class="vs-home-actions"><a class="vs-home-link" href="vertice-saude.html">Explorar o Vértice Saúde <span>→</span></a><span class="vs-home-note">Produto em desenvolvimento.<br>Apoio técnico com responsabilidade profissional.</span></div></div><div class="vs-home-preview" aria-label="Prévia conceitual da interface do Vértice Saúde"><div class="vs-home-preview-head"><div class="vs-home-preview-brand"><img src="assets/logo-vertice-colorida-transparente.png" alt="Vértice"><span>Saúde</span></div><b class="vs-home-status">Em desenvolvimento</b></div><div class="vs-home-ui"><aside class="vs-home-side"><span>⌂ Visão geral</span><span>▣ Projetos</span><span>☑ Checklist EAS</span><span>♙ Consultor</span><span>▤ Biblioteca normativa</span><span>☁ Uso offline</span><small>● Conteúdo atualizado<br>Sincronização segura</small></aside><div class="vs-home-main"><div class="vs-home-project-top"><div><small>Projeto ativo</small><h3>Hospital Materno Infantil</h3><p>Bloco cirúrgico · Revisão 02</p></div><b>Em andamento</b></div><div class="vs-home-tabs"><strong>Checklist</strong><span>Conferências</span><span>Documentos</span><span>Anotações</span></div><div class="vs-home-progress"><span>Progresso do checklist</span><b>68%</b></div><div class="vs-home-bar"><i></i></div><div class="vs-home-checks"><article><strong>1. Planejamento e condicionantes</strong><span>Programa de necessidades</span><span>Fluxos e setorização</span><span class="pending">Riscos assistenciais</span></article><article><strong>2. Ambiência e infraestrutura</strong><span>Conforto ambiental</span><span class="pending">Instalações prediais</span><span class="pending">Materiais e acabamentos</span></article></div><div class="vs-home-ref"><i>▤</i><div><strong>Referências oficiais organizadas</strong><small>Normas e resoluções associadas à etapa do projeto.</small></div></div></div></div></div></div>`;
    anchor.parentNode.insertBefore(section, anchor);
  }

  function init(){
    mountVerticeSaudePromo();
    const root = document.createElement("div");
    root.innerHTML = `<button class="nexo-launcher" type="button" aria-label="Abrir o assistente virtual Vito" aria-expanded="false"><img src="assets/nexo-assistente-vertice.webp" alt=""><span>Fale com o Vito<small>Assistente virtual</small></span></button><section class="nexo-panel" role="dialog" aria-modal="false" aria-label="Assistente virtual Vito"><header class="nexo-head"><img src="assets/nexo-assistente-vertice.webp" alt="Avatar do Vito"><div class="nexo-head-copy"><strong>Vito</strong><span><i class="nexo-status"></i> Assistente virtual da Vértice</span></div><button class="nexo-close" type="button" aria-label="Fechar assistente">×</button></header><div class="nexo-messages" aria-live="polite"></div><div class="nexo-note">Atendimento inicial automatizado. Informações técnicas dependem da análise do arquiteto responsável.</div><form class="nexo-form"><input type="text" maxlength="300" placeholder="Digite sua dúvida..." aria-label="Mensagem para o Vito" autocomplete="off"><button class="nexo-send" type="submit" aria-label="Enviar mensagem">➜</button></form></section>`;
    document.body.append(root);
    const launcher = root.querySelector(".nexo-launcher"), panel = root.querySelector(".nexo-panel"), close = root.querySelector(".nexo-close"), form = root.querySelector(".nexo-form"), input = form.querySelector("input");
    const open = () => {panel.classList.add("is-open");launcher.setAttribute("aria-expanded","true");state.opened=true;if(!state.started) welcome();setTimeout(()=>input.focus(),100)};
    const shut = () => {panel.classList.remove("is-open");launcher.setAttribute("aria-expanded","false");state.opened=false;launcher.focus()};
    launcher.addEventListener("click",()=>state.opened?shut():open()); close.addEventListener("click",shut);
    document.querySelectorAll("[data-open-nexo]").forEach(el=>el.addEventListener("click",open));
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.opened)shut()});
    form.addEventListener("submit",e=>{e.preventDefault();const value=input.value.trim();if(!value)return;input.value="";handle(value)});
  }
  function messages(){return document.querySelector(".nexo-messages")}
  function add(text,type="bot") {const el=document.createElement("div");el.className=`nexo-message ${type}`;el.innerHTML=text;messages().append(el);messages().scrollTop=messages().scrollHeight;return el}
  function quick(labels=initialQuick){const wrap=document.createElement("div");wrap.className="nexo-quick";labels.forEach(label=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",()=>handle(label));wrap.append(b)});messages().append(wrap);messages().scrollTop=messages().scrollHeight}
  function whatsapp(){
    const summary=state.userMessages.slice(-4).join(" | ");
    const text=`Olá, Mateus! Conversei com o Vito pelo site da Vértice. Tenho interesse em atendimento.${summary?` Minha necessidade: ${summary}`:""}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
  function cta(){const box=add("Deseja conversar diretamente com o Arq. Mateus?");const a=document.createElement("a");a.className="nexo-whatsapp";a.href=whatsapp();a.target="_blank";a.rel="noopener";a.textContent="Continuar pelo WhatsApp →";box.append(a)}
  function welcome(){state.started=true;add("Olá! Eu sou o <strong>Vito</strong>, assistente virtual da Vértice. Posso explicar os serviços, as qualificações do Arq. Mateus, apresentar o Vértice Saúde e ajudar a direcionar seu projeto.");add("Sobre o que você gostaria de conversar?");quick()}
  function handle(value){add(value,"user");state.userMessages.push(value);const n=normalize(value);const match=responses.find(item=>item.test.test(n));setTimeout(()=>{add(match?match.text:"Posso ajudar com o Vértice Saúde, projetos comerciais, residenciais, estabelecimentos sujeitos à Vigilância Sanitária, avaliações, perícias e informações sobre a Vértice. Para analisar uma situação específica, o melhor caminho é falar com o Arq. Mateus.");if(/contato|whatsapp|orcamento|preco|contratar|proposta|falar/.test(n)||!match)cta();else quick(["Conhecer o Vértice Saúde","Quero pedir um orçamento","Falar com o arquiteto","Conhecer outros serviços"])},260)}
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
