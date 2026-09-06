const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const somDeposito = new Audio("sons/deposito.mp3");

canvas.width = 1000;
canvas.height = 600;


// =====================
// ESTADO DO JOGO
// =====================

let tela = "cidade";

let cadastroConcluido = false;

let usuario = {
    nome: "",
    idade: "",
    email: "",
    apelido: "",
    interesse: "",
    conhecimento: ""
};

let campoCadastro = "nome";

let opcaoMenu = 0;

let opcaoConhecimento = 0;

let nomeObjetivoDigitado = "";

let valorObjetivo = "";

let prazoObjetivo = "";

let tipoPrazo = "meses";

let aporteMensal = "";

let opcaoTipoPrazo = 0;

let objetivo = {
    nome: "Viagem",
    meta: 8000,
    guardado: 0,
    prazo: 0,
    tipoPrazo: "meses",
    aporteMensal: 0,
    necessarioMensal: 0,
    concluido: false
};

let mostrarMensagemConquista = false;


// =====================
// MOEDAS
// =====================

let moedas = [];

let progressoAnimado = 0;


// =====================
// PERSONAGEM
// =====================

let personagem = {
    x: 500,
    y: 380,
    largura: 30,
    altura: 50
};


// =====================
// BANCO
// =====================

let banco = {
    x: 120,
    y: 120,
    largura: 180,
    altura: 220
};


// Porta do banco
let porta = {
    x: 190,
    y: 260,
    largura: 40,
    altura: 80
};


// Área para entrar no banco
let entradaBanco = {
    x: 180,
    y: 340,
    largura: 60,
    altura: 20
};


// =====================
// TECLAS
// =====================

let teclas = {};


// =====================
// TECLADO
// =====================

window.addEventListener("keydown", function (evento) {

    teclas[evento.key] = true;


    // ==================================================
    // CADASTRO
    // ==================================================

    if (tela == "cadastro") {

        // =====================
        // NOME
        // =====================

        if (campoCadastro == "nome") {

            if (evento.key.length == 1) {
                usuario.nome += evento.key;
            }

            if (evento.key == "Backspace") {
                usuario.nome = usuario.nome.slice(0, -1);
            }

        }


        // =====================
        // IDADE
        // =====================

        if (campoCadastro == "idade") {

            if (evento.key >= "0" && evento.key <= "9") {
                usuario.idade += evento.key;
            }

            if (evento.key == "Backspace") {
                usuario.idade = usuario.idade.slice(0, -1);
            }

        }


        // =====================
        // E-MAIL
        // =====================

        if (campoCadastro == "email") {

            if (
                evento.key.length == 1 &&
                /[a-zA-Z0-9@._-]/.test(evento.key)
            ) {
                usuario.email += evento.key;
            }

            if (evento.key == "Backspace") {
                usuario.email = usuario.email.slice(0, -1);
            }

        }


        // =====================
        // APELIDO
        // =====================

        if (campoCadastro == "apelido") {

            if (evento.key.length == 1) {
                usuario.apelido += evento.key;
            }

            if (evento.key == "Backspace") {
                usuario.apelido = usuario.apelido.slice(0, -1);
            }

        }

    }
    
    // =================================================
    // VALOR PRAZO
    //==================================================
if (tela == "valorPrazo") {

    if (
        evento.key >= "0" &&
        evento.key <= "9"
    ) {

        prazoObjetivo += evento.key;

    }

    if (evento.key == "Backspace") {

        prazoObjetivo =
            prazoObjetivo.slice(0, -1);

    }

}
    // ==================================================
    // CRIAR OBJETIVO
    // ==================================================

    if (tela == "criarObjetivo") {

        if (evento.key.length == 1) {
            nomeObjetivoDigitado += evento.key;
        }

        if (evento.key == "Backspace") {
            nomeObjetivoDigitado =
                nomeObjetivoDigitado.slice(0, -1);
        }

    }


    // ==================================================
    // VALOR DO OBJETIVO
    // ==================================================

    if (tela == "valorObjetivo") {

        if (evento.key >= "0" && evento.key <= "9") {
            valorObjetivo += evento.key;
        }

        if (evento.key == "Backspace") {
            valorObjetivo =
                valorObjetivo.slice(0, -1);
        }

    }


    // ==================================================
    // MENU DO BANCO
    // ==================================================

    if (tela == "menuBanco") {

        if (evento.key == "ArrowDown") {

            opcaoMenu++;

            if (opcaoMenu > 5) {
                opcaoMenu = 0;
            }

        }


        if (evento.key == "ArrowUp") {

            opcaoMenu--;

            if (opcaoMenu < 0) {
                opcaoMenu = 5;
            }

        }

    }


    // ==================================================
    // MENU DE CONHECIMENTO
    // ==================================================

    if (tela == "conhecimento") {

        if (evento.key == "ArrowDown") {

            opcaoConhecimento++;

            if (opcaoConhecimento > 3) {
                opcaoConhecimento = 0;
            }

        }


        if (evento.key == "ArrowUp") {

            opcaoConhecimento--;

            if (opcaoConhecimento < 0) {
                opcaoConhecimento = 3;
            }

        }

    }
// ==================================================
// MENU DE PRAZO
// ==================================================

if (tela == "prazoObjetivo") {

    if (evento.key == "ArrowDown") {

        opcaoTipoPrazo++;

        if (opcaoTipoPrazo > 1) {
            opcaoTipoPrazo = 0;
        }

    }

    if (evento.key == "ArrowUp") {

        opcaoTipoPrazo--;

        if (opcaoTipoPrazo < 0) {
            opcaoTipoPrazo = 1;
        }

    }

}

    // ==================================================
    // ENTER
    // ==================================================

    if (evento.key == "Enter") {


        // =====================
        // BOAS-VINDAS
        // =====================

        if (tela == "boasVindas") {

            tela = "cadastro";

        }


        // =====================
        // CADASTRO
        // =====================

        else if (tela == "cadastro") {

            if (campoCadastro == "nome") {

                campoCadastro = "idade";

            }

            else if (campoCadastro == "idade") {

                campoCadastro = "email";

            }

            else if (campoCadastro == "email") {

                campoCadastro = "apelido";

            }

            else if (campoCadastro == "apelido") {

                tela = "conhecimento";

            }

        }


        // =====================
        // CONHECIMENTO
        // =====================

        else if (tela == "conhecimento") {

            let conhecimentos = [
                "iniciante",
                "basico",
                "intermediario",
                "avancado"
            ];

            usuario.conhecimento =
                conhecimentos[opcaoConhecimento];

            cadastroConcluido = true;

            tela = "criarObjetivo";

        }


        // =====================
        // NOME DO OBJETIVO
        // =====================

        else if (tela == "criarObjetivo") {

            if (nomeObjetivoDigitado.trim() != "") {

                tela = "valorObjetivo";

            }

        }


        // =====================
        // VALOR DO OBJETIVO
        // =====================

       else if (tela == "valorObjetivo") {

    if (valorObjetivo != "") {

        objetivo.nome = nomeObjetivoDigitado;
        objetivo.meta = Number(valorObjetivo);

        tela = "prazoObjetivo";

    }

}
// =====================
// PRAZO DO OBJETIVO
// =====================

else if (tela == "prazoObjetivo") {

    if (opcaoTipoPrazo == 0) {

        tipoPrazo = "meses";

    }

    else {

        tipoPrazo = "anos";

    }

    tela = "valorPrazo";

}
   else if (tela == "valorPrazo") {

    if (prazoObjetivo != "") {

        objetivo.prazo = Number(prazoObjetivo);
        objetivo.tipoPrazo = tipoPrazo;

        tela = "aporteObjetivo";
    }
}     

        // =====================
        // MENU DO BANCO
        // =====================

        else if (tela == "menuBanco") {

            if (opcaoMenu == 0) {

                nomeObjetivoDigitado = "";
                valorObjetivo = "";

                tela = "criarObjetivo";

            }

        }

    }

});


// =====================
// KEYUP
// =====================

window.addEventListener("keyup", function (evento) {

    teclas[evento.key] = false;

});


// ==================================================
// COLISÃO
// ==================================================

function colidiu(obj1, obj2) {

    return (
        obj1.x < obj2.x + obj2.largura &&
        obj1.x + obj1.largura > obj2.x &&
        obj1.y < obj2.y + obj2.altura &&
        obj1.y + obj1.altura > obj2.y
    );

}


// ==================================================
// TELA DE BOAS-VINDAS
// ==================================================

function desenharBoasVindas() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "FUTURE BANK",
        280,
        55
    );

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(
        "Bem-vindo!",
        400,
        160
    );

    ctx.font = "22px Arial";
    ctx.fillText(
        "Antes de entrar, vamos criar sua conta.",
        270,
        220
    );

    ctx.font = "20px Arial";
    ctx.fillText(
        "Pressione ENTER para começar.",
        350,
        300
    );

}


// ==================================================
// TELA DE CADASTRO
// ==================================================

function desenharCadastro() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "CRIAR CONTA",
        320,
        55
    );

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";
    ctx.fillText(
        "Vamos começar conhecendo você.",
        280,
        150
    );


    // NOME

    ctx.font = "22px Arial";
    ctx.fillText(
        "Nome:",
        300,
        220
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
        400,
        190,
        300,
        45
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        usuario.nome,
        410,
        220
    );


    // IDADE

    ctx.fillStyle = "black";
    ctx.fillText(
        "Idade:",
        300,
        280
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
        400,
        250,
        300,
        45
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        usuario.idade,
        410,
        280
    );


    // E-MAIL

    ctx.fillStyle = "black";
    ctx.fillText(
        "E-mail:",
        300,
        340
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
        400,
        310,
        300,
        45
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        usuario.email,
        410,
        340
    );


    // APELIDO

    ctx.fillStyle = "black";
    ctx.fillText(
        "Como gostaria de ser chamado?",
        300,
        400
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
        300,
        420,
        400,
        45
    );

    ctx.fillStyle = "black";
    ctx.fillText(
        usuario.apelido,
        310,
        450
    );


    // CAMPO ATUAL

    ctx.fillStyle = "darkblue";
    ctx.font = "18px Arial";

    if (campoCadastro == "nome") {

        ctx.fillText(
            "Digite seu nome",
            710,
            220
        );

    }

    if (campoCadastro == "idade") {

        ctx.fillText(
            "Digite sua idade",
            710,
            280
        );

    }

    if (campoCadastro == "email") {

        ctx.fillText(
            "Digite seu e-mail",
            710,
            340
        );

    }

    if (campoCadastro == "apelido") {

        ctx.fillText(
            "Digite como quer ser chamado",
            710,
            450
        );

    }


    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText(
        "Pressione ENTER para continuar.",
        350,
        500
    );

}


// ==================================================
// TELA DE CONHECIMENTO
// ==================================================

function desenharConhecimento() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "CONHECENDO VOCÊ",
        260,
        55
    );

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        usuario.apelido + ", queremos entender",
        280,
        160
    );

    ctx.fillText(
        "quanto você já conhece sobre dinheiro.",
        270,
        200
    );

    ctx.font = "22px Arial";

    ctx.fillText(
        "Use ↑ e ↓ para escolher:",
        350,
        270
    );


    let conhecimentos = [
        "Estou começando agora",
        "Sei um pouco sobre dinheiro",
        "Já tenho bons conhecimentos",
        "Entendo bastante de economia"
    ];


    ctx.font = "24px Arial";


    for (
        let i = 0;
        i < conhecimentos.length;
        i++
    ) {

        if (i == opcaoConhecimento) {

            ctx.fillStyle = "darkblue";

            ctx.fillText(
                "▶ " + conhecimentos[i],
                300,
                330 + (i * 45)
            );

        }

        else {

            ctx.fillStyle = "black";

            ctx.fillText(
                conhecimentos[i],
                330,
                330 + (i * 45)
            );

        }

    }


    ctx.font = "18px Arial";
    ctx.fillStyle = "black";

    ctx.fillText(
        "Pressione ENTER para continuar.",
        350,
        540
    );

}


// ==================================================
// MENU DO BANCO
// ==================================================

function desenharMenuBanco() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "FUTURE BANK",
        280,
        55
    );


    ctx.fillStyle = "black";
    ctx.font = "28px Arial";
    ctx.fillText(
        "👩 Aline",
        80,
        140
    );


    ctx.font = "22px Arial";

    if (usuario.conhecimento == "iniciante") {

        ctx.fillText(
            "Olá, " + usuario.apelido +
            "! Vamos começar pelo básico.",
            80,
            180
        );

    }

    else if (usuario.conhecimento == "basico") {

        ctx.fillText(
            "Olá, " + usuario.apelido +
            "! Vamos continuar aprendendo.",
            80,
            180
        );

    }

    else if (usuario.conhecimento == "intermediario") {

        ctx.fillText(
            "Olá, " + usuario.apelido +
            "! Podemos avançar um pouco mais.",
            80,
            180
        );

    }

    else if (usuario.conhecimento == "avancado") {

        ctx.fillText(
            "Olá, " + usuario.apelido +
            "! Vamos explorar conteúdos avançados.",
            80,
            180
        );

    }


    let opcoes = [
        "Criar Objetivo",
        "Meus Objetivos",
        "Depositar Dinheiro",
        "Aprender",
        "Conquistas",
        "Sair"
    ];


    ctx.font = "24px Arial";


    for (
        let i = 0;
        i < opcoes.length;
        i++
    ) {

        if (i == opcaoMenu) {

            ctx.fillStyle = "darkblue";

            ctx.fillText(
                "▶ " + opcoes[i],
                100,
                260 + (i * 45)
            );

        }

        else {

            ctx.fillStyle = "black";

            ctx.fillText(
                opcoes[i],
                130,
                260 + (i * 45)
            );

        }

    }

}


// ==================================================
// CRIAR OBJETIVO
// ==================================================

function desenharCriarObjetivo() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );


    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "CRIAR OBJETIVO",
        250,
        55
    );


    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        "Vamos criar seu objetivo!",
        300,
        160
    );


    ctx.font = "22px Arial";

    ctx.fillText(
        "Qual objetivo você quer alcançar?",
        300,
        220
    );


    // Campo

    ctx.fillStyle = "white";

    ctx.fillRect(
        300,
        250,
        400,
        50
    );


    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    ctx.fillText(
        nomeObjetivoDigitado,
        315,
        283
    );


    ctx.font = "18px Arial";

    ctx.fillText(
        "Digite o nome e pressione ENTER.",
        300,
        350
    );


    ctx.fillText(
        "Pressione ESC para voltar.",
        350,
        400
    );

}
// ==================================================
// PRAZO DO OBJETIVO
// ==================================================

function desenharPrazoObjetivo() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";

    ctx.fillText(
        "DEFINIR PRAZO",
        300,
        55
    );

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        "Em quanto tempo você quer alcançar sua meta?",
        200,
        160
    );

    ctx.font = "22px Arial";

    ctx.fillText(
        "Objetivo: " + objetivo.nome,
        300,
        220
    );

    ctx.fillText(
        "Meta: R$ " +
        objetivo.meta.toLocaleString("pt-BR"),
        300,
        260
    );

    ctx.font = "24px Arial";

    // Opção meses
    if (opcaoTipoPrazo == 0) {

        ctx.fillStyle = "darkblue";

        ctx.fillText(
            "▶ Meses",
            350,
            340
        );

    } else {

        ctx.fillStyle = "black";

        ctx.fillText(
            "Meses",
            380,
            340
        );

    }

    // Opção anos
    if (opcaoTipoPrazo == 1) {

        ctx.fillStyle = "darkblue";

        ctx.fillText(
            "▶ Anos",
            350,
            390
        );

    } else {

        ctx.fillStyle = "black";

        ctx.fillText(
            "Anos",
            380,
            390
        );

    }

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";

    ctx.fillText(
        "Use ↑ e ↓ para escolher.",
        350,
        460
    );

    ctx.fillText(
        "Pressione ENTER para continuar.",
        330,
        500
    );

    ctx.fillText(
        "Pressione ESC para voltar.",
        350,
        540
    );
}
// ==================================================
// VALOR DO PRAZO
// ==================================================

function desenharValorPrazo() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";

    ctx.fillText(
        "DEFINIR PRAZO",
        300,
        55
    );

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        "Quantos " + tipoPrazo + "?",
        350,
        180
    );

    ctx.fillStyle = "darkblue";
    ctx.font = "32px Arial";

    ctx.fillText(
        prazoObjetivo,
        470,
        270
    );

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";

    ctx.fillText(
        "Digite apenas números.",
        380,
        350
    );

    ctx.fillText(
        "Pressione ENTER para continuar.",
        330,
        450
    );

    ctx.fillText(
        "Pressione ESC para voltar.",
        350,
        500
    );
}

function desenharAporteObjetivo() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "darkblue";
    ctx.fillRect(0, 0, canvas.width, 80);

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("APORTE MENSAL", 330, 55);

    ctx.fillStyle = "black";
    ctx.font = "26px Arial";
    ctx.fillText("Quanto você pretende guardar por mês?", 250, 180);

    ctx.fillStyle = "darkblue";
    ctx.font = "32px Arial";
    ctx.fillText("R$ " + aporteMensal, 430, 270);

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText("Digite o valor que você pretende guardar.", 330, 350);
    ctx.fillText("Pressione ENTER para continuar.", 350, 450);
    ctx.fillText("Pressione ESC para voltar.", 350, 500);
}

// ==================================================
// DEFINIR VALOR
// ==================================================

function desenharValorObjetivo() {

    ctx.fillStyle = "#d9d9d9";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "darkblue";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        80
    );


    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(
        "DEFINIR META",
        300,
        55
    );


    ctx.fillStyle = "black";
    ctx.font = "26px Arial";

    ctx.fillText(
        "Quanto você quer alcançar?",
        300,
        160
    );


    ctx.font = "22px Arial";

    ctx.fillText(
        "Objetivo: " + nomeObjetivoDigitado,
        300,
        220
    );


    // Campo do valor

    ctx.fillStyle = "white";

    ctx.fillRect(
        300,
        250,
        400,
        50
    );


    ctx.fillStyle = "black";
    ctx.font = "24px Arial";

    ctx.fillText(
        "R$ " + valorObjetivo,
        315,
        283
    );


    ctx.font = "18px Arial";

    ctx.fillText(
        "Digite o valor e pressione ENTER.",
        300,
        350
    );


    ctx.fillText(
        "Pressione ESC para voltar.",
        350,
        400
    );

}


// ==================================================
// DESENHAR
// ==================================================

function desenhar() {


    // =====================
    // BOAS-VINDAS
    // =====================

    if (tela == "boasVindas") {

        desenharBoasVindas();

        return;
    }


    // =====================
    // CADASTRO
    // =====================

    if (tela == "cadastro") {

        desenharCadastro();

        return;
    }


    // =====================
    // CONHECIMENTO
    // =====================

    if (tela == "conhecimento") {

        desenharConhecimento();

        return;
    }


    // =====================
    // MENU
    // =====================

    if (tela == "menuBanco") {

        desenharMenuBanco();

        return;
    }


    // =====================
    // CRIAR OBJETIVO
    // =====================

    if (tela == "criarObjetivo") {

        desenharCriarObjetivo();

        return;
    }


    // =====================
    // VALOR DO OBJETIVO
    // =====================

    if (tela == "valorObjetivo") {

        desenharValorObjetivo();

        return;
    }
    
    if (tela == "prazoObjetivo") {

    desenharPrazoObjetivo();

    return;
}
if (tela == "valorPrazo") {

    desenharValorPrazo();

    return;
}
 if (tela == "aporteObjetivo") {
    desenharAporteObjetivo();
    return;
}   

    // ==================================================
    // BANCO
    // ==================================================

    if (tela == "banco") {

        ctx.fillStyle = "#d9d9d9";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        // Faixa superior

        ctx.fillStyle = "darkblue";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            80
        );


        ctx.fillStyle = "white";
        ctx.font = "40px Arial";

        ctx.fillText(
            "FUTURE BANK",
            280,
            55
        );


        ctx.fillStyle = "black";
        ctx.font = "24px Arial";

        ctx.fillText(
            "Bem-vindo!",
            360,
            120
        );


        // =====================
        // PAINEL DO OBJETIVO
        // =====================

        let painelX = 560;
        let painelY = 120;


        let progresso =
            progressoAnimado / objetivo.meta;


        let porcentagem =
            Math.floor(progresso * 100);


        let faltam =
            objetivo.meta - objetivo.guardado;


        ctx.fillStyle = "black";
        ctx.font = "28px Arial";

        ctx.fillText(
            "🎯 Objetivo",
            painelX,
            painelY
        );


        ctx.font = "20px Arial";

        ctx.fillText(
            "Nome: " + objetivo.nome,
            painelX,
            painelY + 45
        );


        ctx.fillText(
            "Meta: R$ " +
            objetivo.meta.toLocaleString("pt-BR"),
            painelX,
            painelY + 75
        );


        ctx.fillText(
            "Guardado: R$ " +
            objetivo.guardado.toLocaleString("pt-BR"),
            painelX,
            painelY + 105
        );


        ctx.fillText(
            "Faltam: R$ " +
            faltam.toLocaleString("pt-BR"),
            painelX,
            painelY + 135
        );


        // Barra

        ctx.fillStyle = "#cccccc";

        ctx.fillRect(
            painelX,
            painelY + 160,
            300,
            25
        );


        ctx.fillStyle = "green";

        ctx.fillRect(
            painelX,
            painelY + 160,
            300 * progresso,
            25
        );


        ctx.fillStyle = "black";
        ctx.font = "18px Arial";

        ctx.fillText(
            porcentagem + "%",
            painelX + 130,
            painelY + 195
        );


        // =====================
        // BALCÃO
        // =====================

        ctx.fillStyle = "#8B4513";

        ctx.fillRect(
            220,
            340,
            560,
            70
        );


        ctx.fillStyle = "white";
        ctx.font = "20px Arial";

        ctx.fillText(
            "ATENDIMENTO",
            415,
            385
        );


        // =====================
        // ATENDENTE
        // =====================

        ctx.fillStyle = "#F4C28B";

        ctx.beginPath();

        ctx.arc(
            500,
            310,
            18,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.fillStyle = "navy";

        ctx.fillRect(
            488,
            328,
            24,
            45
        );


        ctx.fillStyle = "red";

        ctx.beginPath();

        ctx.moveTo(500, 338);
        ctx.lineTo(495, 350);
        ctx.lineTo(505, 350);

        ctx.closePath();

        ctx.fill();


        ctx.fillStyle = "black";

        ctx.fillRect(
            475,
            332,
            13,
            6
        );

        ctx.fillRect(
            512,
            332,
            13,
            6
        );


        // =====================
        // COMPUTADOR
        // =====================

        ctx.fillStyle = "black";

        ctx.fillRect(
            450,
            295,
            40,
            25
        );


        ctx.fillStyle = "lightblue";

        ctx.fillRect(
            453,
            298,
            34,
            19
        );


        ctx.fillStyle = "black";

        ctx.fillRect(
            467,
            320,
            6,
            10
        );


        // =====================
        // CAIXA ELETRÔNICO
        // =====================

        ctx.fillStyle = "#555555";

        ctx.fillRect(
            850,
            250,
            90,
            180
        );


        ctx.fillStyle = "lightblue";

        ctx.fillRect(
            865,
            270,
            60,
            40
        );


        ctx.fillStyle = "#333333";

        ctx.fillRect(
            870,
            325,
            50,
            45
        );


        ctx.fillStyle = "black";

        ctx.fillRect(
            875,
            385,
            40,
            5
        );


        // =====================
        // CADEIRAS
        // =====================

        ctx.fillStyle = "#555";


        ctx.fillRect(
            70,
            430,
            35,
            8
        );

        ctx.fillRect(
            70,
            438,
            6,
            22
        );

        ctx.fillRect(
            99,
            438,
            6,
            22
        );


        ctx.fillRect(
            130,
            430,
            35,
            8
        );

        ctx.fillRect(
            130,
            438,
            6,
            22
        );

        ctx.fillRect(
            159,
            438,
            6,
            22
        );


        ctx.fillRect(
            190,
            430,
            35,
            8
        );

        ctx.fillRect(
            190,
            438,
            6,
            22
        );

        ctx.fillRect(
            219,
            438,
            6,
            22
        );


        // =====================
        // CONQUISTA
        // =====================

        if (mostrarMensagemConquista) {

            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";

            ctx.fillRect(
                180,
                150,
                640,
                220
            );


            ctx.fillStyle = "gold";
            ctx.font = "36px Arial";

            ctx.fillText(
                "🏆 OBJETIVO CONCLUÍDO!",
                250,
                220
            );


            ctx.fillStyle = "white";
            ctx.font = "26px Arial";

            ctx.fillText(
                "Parabéns!",
                420,
                270
            );


            ctx.font = "22px Arial";

            ctx.fillText(
                "Você conseguiu atingir sua meta.",
                290,
                320
            );


            ctx.font = "18px Arial";

            ctx.fillText(
                "Pressione ENTER para continuar",
                320,
                350
            );

        }


        // =====================
        // MOEDAS
        // =====================

        ctx.fillStyle = "gold";


        for (let moeda of moedas) {

            ctx.beginPath();

            ctx.arc(
                moeda.x,
                moeda.y,
                moeda.raio,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle = "#d4af37";

            ctx.beginPath();

            ctx.arc(
                moeda.x,
                moeda.y,
                moeda.raio - 3,
                0,
                Math.PI * 2
            );

            ctx.fill();


            ctx.fillStyle = "gold";

        }


        ctx.fillStyle = "black";
        ctx.font = "24px Arial";

        ctx.fillText(
            "Pressione ESC para sair",
            300,
            540
        );


        return;

    }


    // ==================================================
    // CIDADE
    // ==================================================

    ctx.fillStyle = "skyblue";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Grama

    ctx.fillStyle = "green";

    ctx.fillRect(
        0,
        450,
        canvas.width,
        150
    );


    // Rua

    ctx.fillStyle = "gray";

    ctx.fillRect(
        0,
        220,
        canvas.width,
        120
    );


    // Calçada

    ctx.fillStyle = "lightgray";

    ctx.fillRect(
        0,
        340,
        canvas.width,
        20
    );


    // Banco

    ctx.fillStyle = "saddlebrown";

    ctx.fillRect(
        banco.x,
        banco.y,
        banco.largura,
        banco.altura
    );


    // Janelas

    ctx.fillStyle = "lightblue";

    ctx.fillRect(
        140,
        150,
        50,
        60
    );

    ctx.fillRect(
        230,
        150,
        50,
        60
    );


    // Porta

    ctx.fillStyle = "black";

    ctx.fillRect(
        porta.x,
        porta.y,
        porta.largura,
        porta.altura
    );


    // Telhado

    ctx.fillStyle = "darkred";

    ctx.beginPath();

    ctx.moveTo(100, 120);
    ctx.lineTo(210, 40);
    ctx.lineTo(320, 120);

    ctx.closePath();

    ctx.fill();


    // Personagem

    ctx.fillStyle = "blue";

    ctx.fillRect(
        personagem.x,
        personagem.y,
        personagem.largura,
        personagem.altura
    );


    // Mensagem da porta

    if (colidiu(personagem, entradaBanco)) {

        ctx.fillStyle = "white";
        ctx.font = "24px Arial";

        ctx.fillText(
            "Pressione E para entrar no banco",
            250,
            40
        );

    }

}


// ==================================================
// ATUALIZAR
// ==================================================

function atualizar() {


    // ==================================================
    // MOVIMENTO NA CIDADE
    // ==================================================

    if (tela == "cidade") {


        // Direita

        if (teclas["ArrowRight"]) {

            if (
                personagem.x + personagem.largura <
                canvas.width
            ) {

                personagem.x += 5;

                if (colidiu(personagem, banco)) {

                    personagem.x -= 5;

                }

            }

        }


        // Esquerda

        if (teclas["ArrowLeft"]) {

            if (personagem.x > 0) {

                personagem.x -= 5;

                if (colidiu(personagem, banco)) {

                    personagem.x += 5;

                }

            }

        }


        // Cima

        if (teclas["ArrowUp"]) {

            if (personagem.y > 0) {

                personagem.y -= 5;

                if (colidiu(personagem, banco)) {

                    personagem.y += 5;

                }

            }

        }


        // Baixo

        if (teclas["ArrowDown"]) {

            if (
                personagem.y + personagem.altura <
                canvas.height
            ) {

                personagem.y += 5;

                if (colidiu(personagem, banco)) {

                    personagem.y -= 5;

                }

            }

        }

    }


    // ==================================================
    // ENTRAR NO BANCO
    // ==================================================

    if (
        tela == "cidade" &&
        colidiu(personagem, entradaBanco) &&
        teclas["e"]
    ) {

        if (cadastroConcluido == false) {

            tela = "boasVindas";

        }

        else {

            tela = "menuBanco";

        }


        teclas["e"] = false;

    }


    // ==================================================
    // ESC NA TELA DE OBJETIVO
    // ==================================================

    if (
        tela == "criarObjetivo" &&
        teclas["Escape"]
    ) {

        tela = "menuBanco";

        teclas["Escape"] = false;

    }


    // ==================================================
    // ESC NA TELA DE VALOR
    // ==================================================

    if (
        tela == "valorObjetivo" &&
        teclas["Escape"]
    ) {

        tela = "criarObjetivo";

        teclas["Escape"] = false;

    }


    // ==================================================
    // SAIR DO BANCO
    // ==================================================

    if (
        tela == "banco" &&
        teclas["Escape"]
    ) {

        tela = "cidade";

        personagem.x = 195;
        personagem.y = 350;

        teclas["Escape"] = false;

    }


    // ==================================================
    // FECHAR CONQUISTA
    // ==================================================

    if (
        mostrarMensagemConquista &&
        teclas["Enter"]
    ) {

        mostrarMensagemConquista = false;

        teclas["Enter"] = false;

    }


    // ==================================================
    // DEPOSITAR DINHEIRO
    // ==================================================

    if (
        tela == "banco" &&
        teclas["d"]
    ) {


        if (objetivo.guardado < objetivo.meta) {

            objetivo.guardado += 100;


            if (
                objetivo.guardado >
                objetivo.meta
            ) {

                objetivo.guardado =
                    objetivo.meta;

            }


            somDeposito.currentTime = 0;
            somDeposito.play();


            // Criar moedas

            for (let i = 0; i < 3; i++) {

                moedas.push({

                    x: 700 + Math.random() * 120,

                    y: 300 + Math.random() * 20,

                    raio: 8,

                    velocidade:
                        2 + Math.random() * 2,

                    direcao:
                        Math.random() * 2 - 1

                });

            }


            // Objetivo concluído

            if (
                objetivo.guardado ==
                objetivo.meta
            ) {

                objetivo.concluido = true;

                mostrarMensagemConquista = true;

            }

        }


        teclas["d"] = false;

    }


    // ==================================================
    // ANIMAÇÃO DA BARRA
    // ==================================================

    if (
        progressoAnimado <
        objetivo.guardado
    ) {

        progressoAnimado += 5;


        if (
            progressoAnimado >
            objetivo.guardado
        ) {

            progressoAnimado =
                objetivo.guardado;

        }

    }


    // ==================================================
    // ANIMAÇÃO DAS MOEDAS
    // ==================================================

    for (
        let i = moedas.length - 1;
        i >= 0;
        i--
    ) {

        moedas[i].y -=
            moedas[i].velocidade;

        moedas[i].x +=
            moedas[i].direcao;


        if (moedas[i].y < 150) {

            moedas.splice(i, 1);

        }

    }


    // ==================================================
    // DESENHAR
    // ==================================================

    desenhar();


    // ==================================================
    // PRÓXIMO FRAME
    // ==================================================

    requestAnimationFrame(atualizar);

}


// ==================================================
// INICIAR JOGO
// ==================================================

atualizar();