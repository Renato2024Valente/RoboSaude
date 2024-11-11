// Faz os olhos seguirem o cursor
document.addEventListener("mousemove", (event) => {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
        const rect = eye.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        eye.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
});

// Funções para animação da boca
function startMouthAnimation() {
    document.getElementById("mouth").classList.add("talking");
}

function stopMouthAnimation() {
    document.getElementById("mouth").classList.remove("talking");
}

// Função de síntese de voz sincronizada com animação da boca
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';

    // Inicia a animação da boca ao começar a falar
    utterance.onstart = () => {
        startMouthAnimation();
    };

    // Para a animação da boca quando termina de falar
    utterance.onend = () => {
        stopMouthAnimation();
    };

    speechSynthesis.speak(utterance);
}

// Função para definir saudação conforme o horário
function getGreeting() {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return "Bom dia";
    if (currentHour < 18) return "Boa tarde";
    return "Boa noite";
}

// Lógica do chatbot com tópicos de saúde e saudações
function botReply(message) {
    let response = "Bom dia!   Estou aqui para ajudar com suas dúvidas sobre saúde!";
    if (message.includes("bom dia") || message.includes("boa tarde") || message.includes("boa noite")) {
        response = `${getGreeting()}! Em que posso te ajudar hoje?`;
        return finalizeResponse(response);
    }

    // Saudação baseada na entrada do usuário e no horário
    if (message.includes("bom tarde") || message.includes("boa tarde") || message.includes("boa noite")) {
        response = `${getGreeting()}! Em que posso te ajudar hoje?`;
        return finalizeResponse(response);
    }

    // Saúde geral e bem-estar
    if (message.includes("dicas")) {
        response = "Para uma vida saudável, é recomendável uma dieta equilibrada rica em vegetais, frutas, grãos integrais, e proteínas magras. Além disso, praticar atividades físicas regularmente e manter-se hidratado são essenciais. Posso te ajudar com mais alguma coisa?";
    }
    // Glicose
    else if (message.includes("glicose")) {
        response = "Os níveis normais de glicose em jejum para uma pessoa saudável variam entre 70 e 99 mg/dL. Se os níveis estiverem consistentemente acima, pode ser sinal de pré-diabetes ou diabetes. É importante acompanhar com um profissional de saúde. Posso te ajudar com mais alguma coisa?";
    }
    // Peso e IMC
    else if (message.includes("peso") || message.includes("IMC")) {
        response = "O IMC (Índice de Massa Corporal) é calculado dividindo o peso em quilos pela altura em metros ao quadrado. Um IMC entre 18,5 e 24,9 é geralmente considerado saudável. Abaixo disso é classificado como abaixo do peso, e acima, como sobrepeso ou obesidade. Posso te ajudar com mais alguma coisa?";
    }
    // Pressão arterial
    else if (message.includes("pressão alta") || message.includes("hipertensão")) {
        response = "A hipertensão é diagnosticada quando a pressão arterial se mantém acima de 140/90 mmHg. Ela pode causar problemas graves no coração e rins, e requer acompanhamento regular. Controlar a alimentação e praticar exercícios ajuda no controle. Posso te ajudar com mais alguma coisa?";
    } else if (message.includes("pressão baixa") || message.includes("hipotensão")) {
        response = "A pressão arterial baixa, geralmente abaixo de 90/60 mmHg, pode causar tontura, fraqueza, e visão embaçada. Manter-se hidratado e evitar mudanças bruscas de posição pode ajudar. Posso te ajudar com mais alguma coisa?";
    }
    // Dor de cabeça e tipos
    else if (message.includes("dor de cabeça") || message.includes("enxaqueca")) {
        response = "Dores de cabeça podem ser causadas por tensão, desidratação, estresse, ou enxaqueca. Enxaquecas, por exemplo, frequentemente incluem náuseas e sensibilidade à luz. Tente identificar os gatilhos e controlar o estresse. Posso te ajudar com mais alguma coisa?";
    }
    // Infarto
    else if (message.includes("infarto") || message.includes("ataque cardíaco")) {
        response = "Sinais de infarto incluem dor intensa no peito, falta de ar, suor frio, e dor irradiada para o braço esquerdo ou mandíbula. É crucial buscar ajuda médica imediatamente se suspeitar de um infarto. Posso te ajudar com mais alguma coisa?";
    }
    // Inchaço nas pernas
    else if (message.includes("perna inchada") || message.includes("inchaço nas pernas")) {
        response = "Inchaço nas pernas pode ser causado por retenção de líquidos, problemas circulatórios ou insuficiência cardíaca. Consultar um médico ajuda a identificar a causa e o tratamento correto. Posso te ajudar com mais alguma coisa?";
    }
    // Problemas na tireoide
    else if (message.includes("tireoide")) {
        response = "Problemas na tireoide afetam o metabolismo. Hipotireoidismo pode causar cansaço e ganho de peso, enquanto hipertireoidismo leva à perda de peso e ansiedade. Um exame de sangue pode detectar alterações hormonais. Posso te ajudar com mais alguma coisa?";
    }
    // Dor de garganta
    else if (message.includes("dor de garganta")) {
        response = "Dores de garganta são comuns em infecções virais e bacterianas. Beber líquidos quentes e descansar ajudam. Se houver febre persistente ou placas brancas na garganta, consulte um profissional. Posso te ajudar com mais alguma coisa?";
    }
    // Febre
    else if (message.includes("febre")) {
        response = "Febre é um sinal de que o corpo está lutando contra uma infecção. Em adultos, temperaturas acima de 38°C são consideradas febre. Descanso e hidratação são importantes. Posso te ajudar com mais alguma coisa?";
    }
    // Infecção urinária
    else if (message.includes("infecção urinária") || message.includes("ardência ao urinar")) {
        response = "Infecções urinárias causam ardência ao urinar, urgência e dor abdominal. Beber bastante água e procurar tratamento ajudam a evitar complicações. Posso te ajudar com mais alguma coisa?";
    }

    addMessage('bot', response);
    speak(response);
}

// Função para adicionar mensagens ao chat
function addMessage(sender, text) {
    const messages = document.getElementById("messages");
    const message = document.createElement("div");
    message.className = sender === 'user' ? 'user-message' : 'bot-message';
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

// Configuração do reconhecimento de voz
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const voiceButton = document.getElementById("voice-button");
    voiceButton.addEventListener("click", () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'pt-BR';

        recognition.onresult = (event) => {
            const userText = event.results[0][0].transcript;
            addMessage('user', userText);
            botReply(userText); // Envia o texto para o bot responder
        };

        recognition.onerror = (event) => {
            console.error("Erro de reconhecimento de voz:", event.error);
        };

        recognition.start();
    });
} else {
    console.warn("Reconhecimento de fala não é suportado neste navegador.");
}
