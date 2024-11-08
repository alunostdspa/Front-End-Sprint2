
//Registro incidentes
document.addEventListener('DOMContentLoaded', function () {
    function coletarDadosFormulario() {
        const gravidade = document.getElementById('sltGravidade').value;
        const descricao = document.getElementById('txtDescricao').value;
        const fotoInput = document.getElementById('fotoInput');
        let imagemSrc = '';

        // Vereficar se os campos estão preenchidos
        if (!gravidade) {
            alert("Por favor, selecione a gravidade do incidente.");
            return;
        }
        if (!descricao) {
            alert("Por favor, descreva o incidente.");
            return;
        }

        if (fotoInput && fotoInput.files.length > 0) {
            const file = fotoInput.files[0];
            const reader = new FileReader();
            reader.onloadend = function () {
                imagemSrc = reader.result;
                salvarDadosNoSessionStorage(gravidade, descricao, imagemSrc);
                redirecionarParaNotificacao();
            };
            reader.readAsDataURL(file);
        } else {
            salvarDadosNoSessionStorage(gravidade, descricao, imagemSrc);
            redirecionarParaNotificacao();
            limparCamposFormulario();
        }
    }
    // Linpar o formulario assim que for enviado
    function limparCamposFormulario() {
        document.getElementById('sltGravidade').value = '';        
        document.getElementById('txtDescricao').value = '';        
        const fotoInput = document.getElementById('fotoInput');
        fotoInput.value = '';                                       (foto)
        
        const fotoSelecionada = document.getElementById('fotoSelecionada');
        fotoSelecionada.style.display = 'none';                      pré-visualizada

        const imagemPreview = document.getElementById('imagemPreview');
        imagemPreview.style.display = 'none';                        
    }

    // Salvando no session storage
    function salvarDadosNoSessionStorage(gravidade, descricao, imagemSrc) {
        sessionStorage.setItem('gravidade', gravidade);
        sessionStorage.setItem('descricao', descricao);
        sessionStorage.setItem('imagemSrc', imagemSrc);
    }

    //Assim que enviar o forms será redirecionado para pagina notificação
    function redirecionarParaNotificacao() {
        window.location.href = 'notificacao.html';
    }

    // Mostrar  o ultimo form salvo quando acessar a pagina notificação
    if (window.location.pathname.includes('notificacao.html')) {
        const gravidade = sessionStorage.getItem('gravidade');
        const descricao = sessionStorage.getItem('descricao');
        const imagemSrc = sessionStorage.getItem('imagemSrc');
        const registrosContainer = document.getElementById('registros-container');

        //como será exibido na pagina notificacao
        if (gravidade && descricao) {
            registrosContainer.innerHTML = `
            <div class="notifica">
                <div class="notifica-foto">
                    <strong>Foto do Incidente:</strong>
                    <img src="${imagemSrc || 'image/default-image.png'}" alt="Foto do Incidente" style="max-width: 100%; height: auto;">
                </div>

                <div class="txtNotifica">
                    <div>
                    <strong>Gravidade:</strong> ${gravidade}
                    </div>
                    <br>
                    <div>
                    <strong>Descrição:</strong> ${descricao}
                    </div>
                </div>
            </div>
            `;
        }
    }

    // funcionaslidades botão enviar
    const enviarBtn = document.getElementById('enviarBtn');
    if (enviarBtn) {
        enviarBtn.addEventListener('click', coletarDadosFormulario);
    }
    // botão para upload de arquivo
    const uploadBtn = document.getElementById('uploadBtn');
    const fotoInput = document.getElementById('fotoInput');
    const fotoSelecionada = document.getElementById('fotoSelecionada');
    const imagemPreview = document.getElementById('imagemPreview');

    if (uploadBtn && fotoInput) {
        uploadBtn.addEventListener('click', function () {
            fotoInput.click(); 
        });

        fotoInput.addEventListener('change', function () {
            if (fotoInput.files.length > 0) {
                // Exibe a imagem 
                const file = fotoInput.files[0];
                const reader = new FileReader();

                reader.onloadend = function () {
                    fotoSelecionada.src = reader.result;
                    fotoSelecionada.style.display = 'block'; 
                    imagemPreview.style.display = 'block'; 
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
// Funcionalidades de todos os botões de outras paginas

function redirecionarRegistro(){
    window.location.href = 'selecao_incidente.html';
};

function redirecionarHistorico(){
    window.location.href = 'historico.html';
};

function redirecionarNotificacao(){
    window.location.href = 'notificacao.html';
};

function redirecionarIncidenteFoto(){
    window.location.href = 'registro_incidente_foto.html';
}

function redirecionarIncidente(){
    window.location.href = 'registro_incidente.html';
}


//Pagina Login

document.addEventListener("DOMContentLoaded", function() {
    // Verifica se o form de login existe
    const loginForm = document.getElementById("login-form");
    const errorMessageElement = document.getElementById("error-message");

    // Verifica se o usuário já está logado
    const usuarioLogado = localStorage.getItem("usuarioLogado"); 
    const usuarioSessionLogado = sessionStorage.getItem("usuarioLogado"); 

    // Se o usuário já estiver logado redireciona para a pagina home
    if (usuarioLogado || usuarioSessionLogado) {
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "home.html";  
        }
        return; 
    }
    //Form do Login
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();  

            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            // Verifica se os campos de usuário e senha foram preenchidos
            if (!username || !password) {
                alert("Por favor, preencha todos os campos!");
                return;
            }

            //Login fornecido
            let validUsername = "admin"; 
            let validPassword = "senha123"; 

            // Verifica se o login está correto
            if (username === validUsername && password === validPassword) {
                console.log("Login bem-sucedido!");  // Log para verificar o login

            
                if (!document.getElementById("manterLogado").checked) {
                    sessionStorage.setItem("usuarioLogado", username); 
                    console.log("Usuário armazenado no sessionStorage:", username); 
                } else {
                    // Caso "Manter logado" esteja marcado
                    localStorage.setItem("usuarioLogado", username); 
                    console.log("Usuário armazenado no localStorage:", username); 
                }

                // Redireciona para a pagina home.html
                window.location.href = "home.html";
            } else {
                // Exibe mensagem de erro se login estiver errado
                errorMessageElement.innerText = "Usuário ou senha incorretos!";
                errorMessageElement.style.display = 'block';

                sessionStorage.setItem('erro', 1);
                console.log("Erro armazenado no sessionStorage:", sessionStorage.getItem('erro'));
            }
        });
    } else {
        console.error('Formulário de login não encontrado');
    }
});