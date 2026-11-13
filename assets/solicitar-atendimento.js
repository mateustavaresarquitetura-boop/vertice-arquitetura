(function(){
  "use strict";
  const form=document.getElementById("solicitar-atendimento-form");
  if(!form)return;
  const status=document.getElementById("form-status");
  const phone="5531975344356";
  const labels={
    projeto_saude:"Projeto para estabelecimento de saúde",
    comercial:"Projeto comercial",
    residencial:"Projeto residencial",
    avaliacao:"Avaliação imobiliária",
    pericia:"Perícia, vistoria ou inspeção",
    regularizacao:"Regularização ou consultoria técnica",
    outro:"Outro atendimento"
  };
  function value(name){return String(new FormData(form).get(name)||"").trim();}
  function show(message,isError){status.textContent=message;status.classList.toggle("error",Boolean(isError));status.hidden=false;status.setAttribute("role",isError?"alert":"status");}
  form.addEventListener("submit",function(event){
    event.preventDefault();
    status.hidden=true;
    form.querySelectorAll("[aria-invalid]").forEach(function(el){el.removeAttribute("aria-invalid");});
    const required=["nome","telefone","cidade","servico","descricao"];
    const invalid=required.map(function(name){return form.elements[name];}).filter(function(el){return !String(el.value||"").trim();});
    if(!form.elements.consentimento.checked)invalid.push(form.elements.consentimento);
    if(invalid.length){invalid.forEach(function(el){el.setAttribute("aria-invalid","true");});invalid[0].focus();show("Revise os campos obrigatórios destacados antes de continuar.",true);return;}
    const lines=[
      "Olá, Mateus! Gostaria de solicitar um projeto ou atendimento pela Vértice.",
      "",
      "*Nome:* "+value("nome"),
      "*Telefone:* "+value("telefone"),
      value("email")?"*E-mail:* "+value("email"):"",
      "*Cidade/UF:* "+value("cidade"),
      "*Serviço:* "+(labels[value("servico")]||value("servico")),
      value("tipo_imovel")?"*Imóvel/estabelecimento:* "+value("tipo_imovel"):"",
      value("estagio")?"*Estágio atual:* "+value("estagio"):"",
      value("area")?"*Área aproximada:* "+value("area"):"",
      value("prazo")?"*Prazo ou urgência:* "+value("prazo"):"",
      "",
      "*Resumo da necessidade:*",
      value("descricao")
    ].filter(Boolean);
    const url="https://wa.me/"+phone+"?text="+encodeURIComponent(lines.join("\n"));
    show("Solicitação organizada. O WhatsApp será aberto para você revisar e enviar a mensagem.",false);
    const opened=window.open(url,"_blank","noopener");
    if(!opened){window.location.href=url;}
  });
})();
