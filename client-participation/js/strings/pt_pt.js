// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

var s = {};

// Text on the card

s.participantHelpWelcomeText =
  "Bem-vindo a um novo tipo de conversa — <b>vote</b> nas declarações de outras pessoas — <b>quanto mais melhor.</b>";

s.agree = "Concordo";
s.disagree = "Discordo";
s.pass = "Passar / Não tenho a certeza";

s.writePrompt = "Partilhe a sua perspetiva (não está a responder — submeta uma declaração independente)";
s.anonPerson = "Anónimo";
s.importantCheckbox = "Importante/Significativo";
s.importantCheckboxDesc =
  "Assinale esta caixa se considerar que esta declaração é especialmente importante para si ou é altamente relevante para a conversa, independentemente do seu voto. Isto dará a esta declaração uma prioridade mais elevada em comparação com os seus outros votos na análise da conversa.";
s.howImportantPrompt = "Qual a importância desta declaração?";
s.howImportantLow = "Baixa";
s.howImportantMedium = "Média";
s.howImportantHigh = "Alta";

s.modSpam = "Spam";
s.modOffTopic = "Fora do tópico";
s.modImportant = "Importante";
s.modSubmitInitialState = "Saltar (nenhuma das anteriores), próxima declaração";
s.modSubmit = "Concluído, próxima declaração";

s.x_wrote = "escreveu:";
s.comments_remaining = "{{num_comments}} restantes";
s.comments_remaining2 = "{{num_comments}} declarações restantes";

// Text about phasing

s.noCommentsYet = "Ainda não existem declarações.";
s.noCommentsYetSoWrite = "Inicie esta conversa adicionando uma declaração.";
s.noCommentsYetSoInvite = "Inicie esta conversa convidando mais participantes, ou adicione uma declaração.";
s.noCommentsYouVotedOnAll = "Já votou em todas as declarações.";
s.noCommentsTryWritingOne = "Se tiver algo a acrescentar, experimente escrever a sua própria declaração.";
s.convIsClosed = "Esta conversa está encerrada.";
s.noMoreVotingAllowed = "Não é permitida mais votação.";

// For the visualization below

s.group_123 = "Grupo:";
s.comment_123 = "Declaração:";
s.majorityOpinion = "Opinião Maioritária";
s.majorityOpinionShort = "Maioria";
s.info = "Info";

s.helpWhatAmISeeingTitle = "O que estou a ver?";
s.helpWhatAmISeeing = "Está representado pelo círculo azul e agrupado com outras pessoas que partilham a sua perspetiva.";
s.heresHowGroupVoted = "Eis como o Grupo {{GROUP_NUMBER}} votou:";
s.one_person = "{{x}} pessoa";
s.x_people = "{{x}} pessoas";
s.acrossAllPtpts = "De todos os participantes:";
s.xPtptsSawThisComment = " viram esta declaração";
s.xOfThoseAgreed = "desses participantes concordaram";
s.xOfthoseDisagreed = "desses participantes discordaram";
s.opinionGroups = "Grupos de Opinião";
s.topComments = "Principais Declarações";
s.divisiveComments = "Declarações Divisivas";
s.pctAgreed = "{{pct}}% Concordaram";
s.pctDisagreed = "{{pct}}% Discordaram";
s.pctAgreedLong = "{{pct}}% de todos que votaram na declaração {{comment_id}} concordaram.";
s.pctAgreedOfGroup = "{{pct}}% do Grupo {{group}} Concordaram";
s.pctDisagreedOfGroup = "{{pct}}% do Grupo {{group}} Discordaram";
s.pctDisagreedLong = "{{pct}}% de todos que votaram na declaração {{comment_id}} discordaram.";
s.pctAgreedOfGroupLong = "{{pct}}% dos que estão no grupo {{group}} e votaram na declaração {{comment_id}} concordaram.";
s.pctDisagreedOfGroupLong = "{{pct}}% dos que estão no grupo {{group}} e votaram na declaração {{comment_id}} discordaram.";
s.participantHelpGroupsText =
  "Está representado pelo círculo azul e agrupado com outras pessoas que partilham a sua perspetiva.";
s.participantHelpGroupsNotYetText = "A visualização aparecerá assim que 7 participantes começarem a votar";
s.helpWhatAreGroupsDetail =
  "<p>Clique no seu grupo ou noutros para explorar as opiniões de cada grupo.</p><p>As opiniões maioritárias são aquelas mais amplamente partilhadas entre os grupos.</p>";

// Text about writing your own statement

s.helpWhatDoIDoTitle = " O que faço?";
s.helpWhatDoIDo =
  "Vote nas declarações de outras pessoas clicando em 'concordo' ou 'discordo'. Escreva uma declaração (mantenha cada uma numa única ideia). Convide os seus amigos para a conversa!";
s.writeCommentHelpText =
  "As suas perspetivas ou experiências estão em falta na conversa? Se sim, </b>adicione-as </b> na caixa abaixo — </b>uma de cada vez</b>.";
s.helpWriteListIntro = "O que faz uma boa declaração?";
s.helpWriteListStandalone = "Uma ideia independente";
s.helpWriteListRaisNew = "Uma nova perspetiva, experiência ou questão";
s.helpWriteListShort = "Redação clara e concisa (limitada a 140 caracteres)";
s.tip = "Dica:";
s.commentWritingTipsHintsHeader = "Dicas para escrever declarações";
s.tipCharLimit = "As declarações estão limitadas a {{char_limit}} caracteres.";
s.tipCommentsRandom =
  "As declarações são apresentadas aleatoriamente e não está a responder diretamente às declarações de outras pessoas: <b> está a adicionar uma declaração independente.<b>";
s.tipOneIdea =
  "Divida declarações longas que contenham múltiplas ideias. Isto torna mais fácil para os outros votarem na sua declaração.";
s.tipNoQuestions =
  "As declarações não devem estar na forma de pergunta. Os participantes concordarão ou discordarão das declarações que fizer.";
s.commentTooLongByChars = "Limite de comprimento da declaração excedido em {{CHARACTERS_COUNT}} caracteres.";
s.submitComment = "Submeter";
s.commentSent = "Declaração submetida! Apenas os outros participantes verão a sua declaração e concordarão ou discordarão.";

// Error notices

s.commentSendFailed = "Ocorreu um erro ao submeter a sua declaração.";
s.commentSendFailedEmpty = "Ocorreu um erro ao submeter a sua declaração - A declaração não deve estar vazia.";
s.commentSendFailedTooLong = "Ocorreu um erro ao submeter a sua declaração - A declaração é demasiado longa.";
s.commentSendFailedDuplicate = "Ocorreu um erro ao submeter a sua declaração - Já existe uma declaração idêntica.";
s.commentErrorDuplicate = "Duplicado! Essa declaração já existe.";
s.commentErrorConversationClosed = "Esta conversa está encerrada. Não podem ser submetidas mais declarações.";
s.xidRequired = "Esta conversa requer um XID (identificador externo) para participar. Por favor, utilize a ligação adequada que lhe foi fornecida.";
s.commentIsEmpty = "A declaração está vazia";
s.commentIsTooLong = "A declaração é demasiado longa";
s.hereIsNextStatement = "Voto bem-sucedido. Navegue para cima para ver a próxima declaração.";
s.voteErrorGeneric = "Desculpe, o seu voto não foi enviado. Por favor, verifique a sua ligação e tente novamente.";

// Text for the third party translation that appears on the cards

s.showTranslationButton = "Ativar tradução de terceiros";
s.hideTranslationButton = "Desativar Tradução";
s.thirdPartyTranslationDisclaimer = "Tradução fornecida por terceiros";

// Text about notifications and subscriptions and embedding

s.notificationsAlreadySubscribed = "Está subscrito para receber atualizações desta conversa.";
s.notificationsGetNotified = "Seja notificado quando chegarem mais declarações:";
s.notificationsEnterEmail = "Introduza o seu endereço de email para ser notificado quando chegarem mais declarações:";
s.labelEmail = "Email";
s.notificationsSubscribeButton = "Subscrever";
s.notificationsSubscribeErrorAlert = "Erro ao subscrever";

s.addPolisToYourSite = "<img style='height: 20px; margin: 0px 4px;' src='{{URL}}'/>";

// Footer

s.privacy = "Privacidade";
s.TOS = "Termos de Serviço";

// Experimental features

s.importantCheckbox = "Este comentário é importante";
s.howImportantPrompt = "Qual a importância desta declaração?";
s.howImportantLow = "Baixa";
s.howImportantMedium = "Média";
s.howImportantHigh = "Alta";
s.tipStarred = "Marcado como importante.";

s.modSpam = "Spam";
s.modOffTopic = "Fora do tópico";
s.modImportant = "Importante";
s.modSubmitInitialState = "Saltar (nenhuma das anteriores), próxima declaração";
s.modSubmit = "Concluído, próxima declaração";

s.topic_good_01 = "O que devemos fazer em relação à sala de ping pong?";
s.topic_good_01_reason = "questão aberta, qualquer pessoa pode ter uma opinião sobre as respostas a esta pergunta";
s.topic_good_02 = "O que pensa sobre a nova proposta?";
s.topic_good_02_reason = "questão aberta, qualquer pessoa pode ter uma opinião sobre as respostas a esta pergunta";
s.topic_good_03 = "Consegue pensar em algo que esteja a atrasar a produtividade?";

s.topic_bad_01 = "todos reportem a vossa prontidão para o lançamento";
s.topic_bad_01_reason =
  "pessoas de várias equipas irão votar nas respostas, mas podem não ter conhecimento suficiente para votar com confiança.";
s.topic_bad_02 = "quais são os nossos bloqueios de lançamento?";
s.topic_bad_02_reason = "";

module.exports = s;
