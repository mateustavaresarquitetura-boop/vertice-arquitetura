(() => {
  const phone = "5531975344356";
  const normalize = (text) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const responses = [
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
  const initialQuick = ["Projetos para Vigilância Sanitária","Projetos comerciais","Projetos residenciais","Qualificações do arquiteto","Avaliações e perícias"];
  const state = {opened:false, started:false, userMessages:[]};

  function init(){
    const root = document.createElement("div");
    root.innerHTML = `<button class="nexo-launcher" type="button" aria-label="Abrir o assistente virtual Nexo" aria-expanded="false"><img src="assets/nexo-assistente-vertice.webp" alt=""><span>Fale com o Nexo<small>Assistente virtual</small></span></button><section class="nexo-panel" role="dialog" aria-modal="false" aria-label="Assistente virtual Nexo"><header class="nexo-head"><img src="assets/nexo-assistente-vertice.webp" alt="Avatar do Nexo"><div class="nexo-head-copy"><strong>Nexo</strong><span><i class="nexo-status"></i> Assistente de IA da Vértice</span></div><button class="nexo-close" type="button" aria-label="Fechar assistente">×</button></header><div class="nexo-messages" aria-live="polite"></div><div class="nexo-note">Atendimento inicial automatizado. Informações técnicas dependem da análise do arquiteto responsável.</div><form class="nexo-form"><input type="text" maxlength="300" placeholder="Digite sua dúvida..." aria-label="Mensagem para o Nexo" autocomplete="off"><button class="nexo-send" type="submit" aria-label="Enviar mensagem">➜</button></form></section>`;
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
    const text=`Olá, Mateus! Conversei com o Nexo pelo site da Vértice. Tenho interesse em atendimento.${summary?` Minha necessidade: ${summary}`:""}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
  function cta(){const box=add("Deseja conversar diretamente com o Arq. Mateus?");const a=document.createElement("a");a.className="nexo-whatsapp";a.href=whatsapp();a.target="_blank";a.rel="noopener";a.textContent="Continuar pelo WhatsApp →";box.append(a)}
  function welcome(){state.started=true;add("Olá! Eu sou o <strong>Nexo</strong>, assistente virtual da Vértice. Posso explicar os serviços, as qualificações do Arq. Mateus e ajudar a direcionar seu projeto.");add("Sobre o que você gostaria de conversar?");quick()}
  function handle(value){add(value,"user");state.userMessages.push(value);const n=normalize(value);const match=responses.find(item=>item.test.test(n));setTimeout(()=>{add(match?match.text:"Posso ajudar com projetos comerciais, residenciais, estabelecimentos sujeitos à Vigilância Sanitária, avaliações, perícias e informações sobre a Vértice. Para analisar uma situação específica, o melhor caminho é falar com o Arq. Mateus.");if(/contato|whatsapp|orcamento|preco|contratar|proposta|falar/.test(n)||!match)cta();else quick(["Quero pedir um orçamento","Falar com o arquiteto","Conhecer outros serviços"])},260)}
  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
