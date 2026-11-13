(() => {
  const phone = "5531975344356";
  const normalize = text => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function loadSeo(){
    if(document.getElementById("vertice-seo-script")) return;
    const script = document.createElement("script");
    script.id = "vertice-seo-script";
    script.src = "assets/seo.js?v=20260809-3";
    script.defer = true;
    document.head.append(script);
  }
  loadSeo();

  const initialQuick = ["Projetos e serviços","Sobre o Arq. Mateus","Contatos e atendimento","Avaliações e perícias","Solicitar orçamento"];
  const projectQuick = ["Iniciar atendimento do projeto","Projetos para Vigilância Sanitária","Projetos comerciais","Projetos residenciais","Contatos e atendimento","Menu principal"];
  const profileQuick = ["Qualificações do arquiteto","Projetos para Vigilância Sanitária","Projetos comerciais","Avaliações e perícias","Contatos e atendimento","Menu principal"];
  const contactQuick = ["WhatsApp","E-mail","Instagram","Horário de atendimento","Solicitar orçamento","Menu principal"];
  const evaluationQuick = ["Avaliação de imóveis","Vistorias e inspeções","Laudos e pareceres","Solicitar orçamento","Contatos e atendimento","Menu principal"];
  const budgetQuick = ["Orçamento de projeto","Orçamento de avaliação ou perícia","Outro serviço","Menu principal"];

  const responses = [
    {test:/^projetos e servicos$|tipos de projeto|quais projetos|servicos da vertice/,text:"A <strong>Vértice</strong> atua com projetos para estabelecimentos de saúde e de interesse à saúde, projetos comerciais, residenciais e de interiores, além de avaliações imobiliárias, perícias, vistorias, laudos e pareceres técnicos. Escolha uma área para continuar.",quick:projectQuick},
    {test:/^iniciar atendimento do projeto$|^orcamento de projeto$|tenho um projeto|preciso de um projeto|quero fazer um projeto|gostaria de um projeto/,text:"Perfeito. Vou organizar as informações iniciais do seu projeto para que o Arq. Mateus receba um resumo objetivo pelo WhatsApp.",startLead:true},
    {test:/^sobre o arq\. mateus$|sobre o arquiteto|quem e mateus|quem e o arquiteto/,text:"Mateus José de Andrade Tavares é <strong>Arquiteto e Urbanista, CAU A302785-6</strong>, proprietário e responsável técnico da Vértice. Sua experiência na enfermagem e na segurança do paciente contribui especialmente para projetos de saúde, unindo visão assistencial, técnica e arquitetônica.",quick:profileQuick},
    {test:/^contatos e atendimento$|nossos contatos|formas de contato|canais de atendimento/,text:"Você pode falar com a Vértice pelo <strong>WhatsApp (31) 97534-4356</strong>, pelo e-mail <strong>vertice.arquitetura.contato@gmail.com</strong> ou pelos perfis <strong>@arquiteto.mateustavares</strong> e <strong>@vertice_arquiteturaeavaliacoes</strong> no Instagram.<br><br>Atendimento: segunda a sexta, das 08h às 19h30; sábado, das 09h às 13h.",quick:contactQuick,cta:true},
    {test:/^whatsapp$|numero do whatsapp|qual o whatsapp/,text:"O WhatsApp da Vértice é <strong>(31) 97534-4356</strong>. Você pode iniciar o atendimento pelo botão abaixo.",quick:contactQuick,cta:true},
    {test:/^e-mail$|^email$|qual o email/,text:"O e-mail da Vértice é <strong>vertice.arquitetura.contato@gmail.com</strong>. Ele é indicado para envio de documentos, propostas e apresentações mais detalhadas.",quick:contactQuick},
    {test:/^instagram$|redes sociais/,text:"A Vértice está no Instagram em <strong>@arquiteto.mateustavares</strong> e <strong>@vertice_arquiteturaeavaliacoes</strong>.",quick:contactQuick},
    {test:/horario de atendimento|horario|que horas atende/,text:"O atendimento da Vértice ocorre de <strong>segunda a sexta, das 08h às 19h30</strong>, e aos <strong>sábados, das 09h às 13h</strong>.",quick:contactQuick},
    {test:/qualifica|formacao|especializa|experiencia|mateus|arquiteto/,text:"Mateus José de Andrade Tavares é <strong>Arquiteto e Urbanista, CAU A302785-6</strong>, com pós-graduação em Projetos Hospitalares e Estabelecimentos de Saúde com ênfase em BIM e formação em auditoria, avaliações e perícias. Sua experiência assistencial e em segurança do paciente contribui especialmente para projetos de saúde.",quick:profileQuick},
    {test:/empresa|vertice|quem (e|sao)|sobre voces/,text:"A <strong>Vértice Arquitetura e Avaliações</strong> atua em Ipatinga e região com projetos arquitetônicos, projetos para saúde e atividades de interesse à saúde, projetos comerciais e residenciais, além de avaliações, perícias, vistorias, laudos e relatórios técnicos.",quick:initialQuick},
    {test:/vigilancia|sanitaria|saude|clinica|consultorio|farmacia|odont|estetica|laboratorio/,text:"A Vértice possui atuação especializada em <strong>estabelecimentos de saúde e de interesse à saúde</strong>, como clínicas, consultórios, farmácias, odontologia, estética e serviços de alimentação. O projeto considera fluxos, acessibilidade, higiene, materiais e requisitos aplicáveis ao processo de licenciamento sanitário.",quick:projectQuick},
    {test:/comercial|loja|lanchonete|restaurante|empresa|escritorio|sala comercial/,text:"Nos <strong>projetos comerciais</strong>, a Vértice organiza atendimento, circulação, operação, apoio e identidade do espaço. O trabalho busca equilibrar experiência do cliente, funcionalidade, viabilidade e exigências específicas da atividade.",quick:projectQuick},
    {test:/residencial|casa|apartamento|moradia|interior/,text:"Sim. A Vértice também desenvolve <strong>projetos arquitetônicos residenciais e de interiores</strong>, considerando rotina, conforto, aproveitamento do espaço, estética e orçamento. Posso encaminhar seu interesse para uma conversa inicial.",quick:projectQuick},
    {test:/avaliacao|pericia|vistoria|inspecao|laudo|parecer|imovel/,text:"A empresa realiza <strong>avaliações imobiliárias, perícias, vistorias, inspeções, laudos e pareceres técnicos</strong>. Para indicar o serviço adequado, é importante informar a finalidade, a cidade e o tipo de imóvel.",quick:evaluationQuick},
    {test:/^solicitar orcamento$|quero um orcamento|gostaria de um orcamento/,text:"Para direcionar corretamente, escolha o tipo de orçamento:",quick:budgetQuick},
    {test:/^orcamento de avaliacao ou pericia$/,text:"Certo. Para avaliações, perícias, vistorias, laudos ou pareceres, informe pelo WhatsApp a finalidade, a cidade e o tipo de imóvel.",quick:evaluationQuick,cta:true},
    {test:/^outro servico$/,text:"Descreva brevemente o serviço que procura ou fale diretamente com o Arq. Mateus pelo WhatsApp.",quick:contactQuick,cta:true},
    {test:/preco|valor|orcamento|quanto custa|custo/,text:"O valor depende do tipo de serviço, área, localização, complexidade e documentos necessários. Para projetos, posso fazer uma triagem inicial e organizar as informações antes de abrir o WhatsApp.",quick:budgetQuick},
    {test:/prazo|demora|tempo/,text:"O prazo varia conforme o serviço, a área, a complexidade e eventuais análises de órgãos públicos. Após conhecer o imóvel e o objetivo, a Vértice informa um cronograma compatível com o escopo.",quick:initialQuick},
    {test:/contato|whatsapp|telefone|falar|atendimento|contratar|proposta/,text:"Ótimo. Para continuar, clique no botão de WhatsApp abaixo. Se puder, informe na mensagem: <strong>cidade, tipo de imóvel, serviço desejado e área aproximada</strong>.",quick:contactQuick,cta:true}
  ];

  const leadSteps = [
    {key:"name",question:"Para começar, qual é o seu nome?"},
    {key:"city",question:"Em qual cidade e estado fica o imóvel?"},
    {key:"projectType",question:"Qual tipo de projeto você procura?",options:["Saúde / Vigilância Sanitária","Comercial","Residencial","Interiores","Reforma / adequação","Regularização"]},
    {key:"property",question:"Qual é o tipo de estabelecimento ou imóvel? Exemplo: clínica odontológica, farmácia, loja, residência ou escritório."},
    {key:"area",question:"Qual é a área aproximada do imóvel? Você pode informar em m² ou responder “ainda não sei”."},
    {key:"situation",question:"Qual é a situação atual?",options:["Imóvel existente","Obra nova","Reforma","Já possuo uma planta","Recebi exigência de órgão público","Ainda estou procurando o imóvel"]},
    {key:"need",question:"Qual é a principal necessidade ou o resultado que você espera do projeto?<br><br><strong>Explique exatamente o que precisa.</strong> Por exemplo: se você selecionou reforma de uma casa, informe se deseja reformar a casa inteira ou apenas um cômodo, como cozinha, banheiro, quarto ou sala."},
    {key:"deadline",question:"Existe prazo, urgência ou uma data prevista para iniciar?"},
    {key:"contact",question:"Qual telefone ou e-mail prefere usar para retorno?",options:["Usar o WhatsApp de envio","Prefiro informar depois"]}
  ];

  const state = {opened:false,started:false,userMessages:[],lead:null};

  function init(){
    const root=document.createElement("div");root.innerHTML=`<button class="nexo-launcher" type="button" aria-label="Abrir o assistente virtual Vito" aria-expanded="false"><img src="assets/vito-assistente-transparente.webp" alt=""><span>Fale com o Vito<small>Assistente virtual</small></span></button><section class="nexo-panel" role="dialog" aria-modal="false" aria-label="Assistente virtual Vito"><header class="nexo-head"><img src="assets/vito-assistente-transparente.webp" alt="Avatar do Vito"><div class="nexo-head-copy"><strong>Vito</strong><span><i class="nexo-status"></i> Assistente virtual da Vértice</span></div><button class="nexo-close" type="button" aria-label="Fechar assistente">×</button></header><div class="nexo-toolbar"><button class="nexo-main-menu" type="button">⌂ Menu principal</button><button class="nexo-restart" type="button">↻ Reiniciar conversa</button></div><div class="nexo-messages" aria-live="polite"></div><div class="nexo-note">Atendimento inicial automatizado. Informações técnicas dependem da análise do arquiteto responsável.</div><form class="nexo-form"><input type="text" maxlength="300" placeholder="Digite sua dúvida..." aria-label="Mensagem para o Vito" autocomplete="off"><button class="nexo-send" type="submit" aria-label="Enviar mensagem">➜</button></form></section>`;document.body.append(root);
    const launcher=root.querySelector(".nexo-launcher"),panel=root.querySelector(".nexo-panel"),close=root.querySelector(".nexo-close"),mainMenu=root.querySelector(".nexo-main-menu"),restart=root.querySelector(".nexo-restart"),form=root.querySelector(".nexo-form"),input=form.querySelector("input");
    const open=()=>{panel.classList.add("is-open");launcher.setAttribute("aria-expanded","true");state.opened=true;if(!state.started)welcome();setTimeout(()=>input.focus(),100)},shut=()=>{panel.classList.remove("is-open");launcher.setAttribute("aria-expanded","false");state.opened=false;launcher.focus()};
    launcher.addEventListener("click",()=>state.opened?shut():open());close.addEventListener("click",shut);mainMenu.addEventListener("click",showMainMenu);restart.addEventListener("click",restartConversation);document.querySelectorAll("[data-open-nexo]").forEach(el=>el.addEventListener("click",open));document.addEventListener("keydown",e=>{if(e.key==="Escape"&&state.opened)shut()});form.addEventListener("submit",e=>{e.preventDefault();const value=input.value.trim();if(!value)return;input.value="";handle(value)})
  }

  const messages=()=>document.querySelector(".nexo-messages");
  function add(text,type="bot"){const el=document.createElement("div");el.className=`nexo-message ${type}`;el.innerHTML=text;messages().append(el);messages().scrollTop=messages().scrollHeight;return el}
  function clearQuick(){messages()?.querySelectorAll(".nexo-quick").forEach(el=>el.remove())}
  function quick(labels=initialQuick){clearQuick();const wrap=document.createElement("div");wrap.className="nexo-quick";wrap.setAttribute("aria-label","Opções de resposta rápida");labels.forEach(label=>{const b=document.createElement("button");b.type="button";b.textContent=label;b.addEventListener("click",()=>handle(label));wrap.append(b)});messages().append(wrap);messages().scrollTop=messages().scrollHeight}
  function showMainMenu(){state.lead=null;clearQuick();add("Você voltou ao <strong>menu principal</strong>. Escolha o assunto que deseja conhecer:");quick(initialQuick)}
  function restartConversation(){const box=messages();if(box)box.innerHTML="";state.userMessages=[];state.lead=null;state.started=false;welcome()}
  function whatsapp(){const summary=state.userMessages.slice(-4).join(" | "),text=`Olá, Mateus! Conversei com o Vito pelo site da Vértice. Tenho interesse em atendimento.${summary?` Minha necessidade: ${summary}`:""}`;return`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
  function cta(){const box=add("Deseja conversar diretamente com o Arq. Mateus?");const a=document.createElement("a");a.className="nexo-whatsapp";a.href=whatsapp();a.target="_blank";a.rel="noopener";a.textContent="Continuar pelo WhatsApp →";box.append(a)}
  function welcome(){state.started=true;add("Olá! Eu sou o <strong>Vito</strong>, assistente virtual da Vértice. Posso apresentar os projetos e serviços, as qualificações do Arq. Mateus e os canais de atendimento.");add("Escolha uma das opções abaixo ou escreva sua dúvida:");quick(initialQuick)}

  function startProjectLead(){state.lead={active:true,index:0,data:{},review:false};clearQuick();add("Vou fazer uma triagem rápida. As respostas ficam somente nesta conversa e serão transferidas ao WhatsApp apenas quando você clicar no botão de envio.");askLeadStep()}
  function askLeadStep(){const lead=state.lead;if(!lead?.active)return;const step=leadSteps[lead.index];if(!step){showLeadSummary();return}add(`<strong>${lead.index+1} de ${leadSteps.length}</strong><br>${step.question}`);quick([...(step.options||[]),...(lead.index>0?["Voltar uma pergunta"]:[]),"Cancelar atendimento"])}
  function handleLead(value){const n=normalize(value),lead=state.lead;if(!lead)return;
    if(/menu principal|cancelar atendimento|cancelar triagem/.test(n)){add("Atendimento do projeto cancelado. Nenhuma informação foi enviada.");showMainMenu();return}
    if(/reiniciar conversa|nova conversa/.test(n)){restartConversation();return}
    if(lead.review){
      if(n==="enviar informacoes pelo whatsapp"){createLeadWhatsapp();return}
      if(n==="corrigir informacoes"){add("Sem problema. Vamos preencher novamente desde o início.");state.lead={active:true,index:0,data:{},review:false};askLeadStep();return}
    }
    if(n==="voltar uma pergunta"&&lead.index>0){lead.index--;delete lead.data[leadSteps[lead.index].key];askLeadStep();return}
    const step=leadSteps[lead.index];lead.data[step.key]=value;lead.index++;askLeadStep()
  }
  function showLeadSummary(){const d=state.lead.data;state.lead.review=true;const safe=v=>String(v||"Não informado").replace(/[<>]/g,"");add(`<strong>Resumo do atendimento de projeto</strong><div class="nexo-lead-summary"><span><b>Nome</b>${safe(d.name)}</span><span><b>Cidade/UF</b>${safe(d.city)}</span><span><b>Tipo de projeto</b>${safe(d.projectType)}</span><span><b>Estabelecimento ou imóvel</b>${safe(d.property)}</span><span><b>Área aproximada</b>${safe(d.area)}</span><span><b>Situação atual</b>${safe(d.situation)}</span><span><b>Necessidade principal</b>${safe(d.need)}</span><span><b>Prazo ou urgência</b>${safe(d.deadline)}</span><span><b>Contato preferencial</b>${safe(d.contact)}</span></div>`);add("Confira as informações. Ao prosseguir, elas serão colocadas em uma mensagem do WhatsApp para você revisar e enviar à Vértice. O site não envia nem armazena esses dados automaticamente.");quick(["Enviar informações pelo WhatsApp","Corrigir informações","Cancelar atendimento"])}
  function leadWhatsappUrl(){const d=state.lead.data,text=`Olá, Mateus! Vim pelo site da Vértice e fiz a triagem com o Vito.\n\n*SOLICITAÇÃO DE PROJETO*\n\n*Nome:* ${d.name||"Não informado"}\n*Cidade/UF:* ${d.city||"Não informado"}\n*Tipo de projeto:* ${d.projectType||"Não informado"}\n*Estabelecimento ou imóvel:* ${d.property||"Não informado"}\n*Área aproximada:* ${d.area||"Não informado"}\n*Situação atual:* ${d.situation||"Não informado"}\n*Necessidade principal:* ${d.need||"Não informado"}\n*Prazo ou urgência:* ${d.deadline||"Não informado"}\n*Contato preferencial:* ${d.contact||"Não informado"}\n\nAs informações foram fornecidas voluntariamente para atendimento e elaboração de proposta.`;return`https://wa.me/${phone}?text=${encodeURIComponent(text)}`}
  function createLeadWhatsapp(){clearQuick();const box=add("Tudo certo. Revise a mensagem no WhatsApp e toque em enviar para que o Arq. Mateus receba as informações.");const a=document.createElement("a");a.className="nexo-whatsapp";a.href=leadWhatsappUrl();a.target="_blank";a.rel="noopener";a.textContent="Enviar informações pelo WhatsApp →";box.append(a);state.lead=null;quick(["Menu principal","Reiniciar conversa"])}

  function handle(value){clearQuick();add(value,"user");state.userMessages.push(value);if(state.lead?.active){handleLead(value);return}const n=normalize(value);
    if(/^(menu principal|voltar ao menu principal|outras opcoes|inicio)$/.test(n)){setTimeout(showMainMenu,180);return}
    if(/^(reiniciar|reiniciar conversa|nova conversa|comecar de novo)$/.test(n)){setTimeout(restartConversation,180);return}
    const match=responses.find(item=>item.test.test(n));setTimeout(()=>{if(match){add(match.text);if(match.startLead){startProjectLead();return}if(match.cta)cta();quick(match.quick||initialQuick);return}add("Posso ajudar com projetos e serviços, informações sobre o Arq. Mateus, avaliações, perícias e contatos da Vértice. Escolha uma opção abaixo para continuar.");quick(initialQuick)},260)
  }

  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init):init();
})();
