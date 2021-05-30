class Produto {
    constructor(id, tipo, modelo, valor, quantidade) {
        this.id = id;
        this.tipo = tipo;
        this.modelo = modelo;
        this.valor = valor;
        this.quantidade = quantidade;
    }
}

function criarBotao(img, color, fun) {
    let button = document.createElement("button");
    button.classList = "btn btn-sm";
    button.type = "button";
    button.style = "background-color: " + color + "; padding:0; margin-right:5px; margin-bottom: 0px;"
    button.setAttribute("onclick", fun);
    button.innerHTML = '<img class="m-0" src="images/' + img + '">';
    return button;
}

function atualizarTabela() {
    let produtos_table = document.getElementById("produtos"); // Pegar referência da tabela.
    produtos_table.innerHTML = ""; // Remover todas as linhas.
    produtos.forEach(produto => {
        let tr = document.createElement("tr"); // Criar linha.
        let buttons = document.createElement("div");
        let mais = criarBotao("mais.png", "DodgerBlue", "adicionarProduto(this)");
        let menos = criarBotao("menos.png", "FireBrick", "removerProduto(this)");
        let destruir = criarBotao("destruir.png", "#363636", "destruirProduto(this)")
        let number = document.createElement("input");
        number.style = "width: 60px;"
        number.type = "number";
        number.min = 0;
        number.value = 0;
        let infos = [produto.id, produto.tipo, produto.modelo, "R$" + produto.valor.toString().replace(".", ","), produto.quantidade];
        for (let i = 0; i < infos.length; i++) {
            let info = document.createElement("td"); // Criar o elemento.
            info.innerHTML = infos[i]; // Guardar a informação no elemento.
            tr.appendChild(info); // Colocar o elemento com a informação em uma linha
        }
        buttons.appendChild(mais);
        buttons.appendChild(menos);
        buttons.appendChild(destruir);
        buttons.appendChild(number);
        tr.appendChild(buttons);
        produtos_table.appendChild(tr); // Adiciona a linha na tabela.
    });
}

function adicionarProduto(produto) {
    let quantidade = produto.parentElement.getElementsByTagName("input")[0].value;
    quantidade = parseInt(quantidade);
    let ID = parseInt(produto.parentElement.parentElement.getElementsByTagName("td")[0].innerHTML) - 1;
    produtos[ID].quantidade += quantidade;

    atualizarTabela();
}

function removerProduto(produto) {
    let quantidade = produto.parentElement.getElementsByTagName("input")[0].value;
    quantidade = parseInt(quantidade); // Recebe a quantidade do campo e transforma em número.
    let ID = parseInt(produto.parentElement.parentElement.getElementsByTagName("td")[0].innerHTML) - 1;
    produtos[ID].quantidade -= quantidade; // Subtrai a quantidade desejada do produto
    if (produtos[ID].quantidade < 0) produtos[ID].quantidade = 0;

    atualizarTabela();
}

function destruirProduto(produto) {
    let ID = parseInt(produto.parentElement.parentElement.getElementsByTagName("td")[0].innerHTML) - 1;
    let index = 0;
    for(let i=0; i<produtos.length; i++){
        if (produtos[i].id == ID) {
            index = i + 1;
            break;
        }
    }
    produtos.splice(index, 1);
    atualizarTabela();
}

let produtos = [];
produtos.push(new Produto(1, "Monitor", "Acer V226HQL", 656.1, 22));
produtos.push(new Produto(2, "Monitor", "Samsung LC24f390", 859.99, 12));
produtos.push(new Produto(3, "Teclado", "Fortrek Pro K7", 239.99, 122));
produtos.push(new Produto(4, "Teclado", "HyperX Alloy", 249.99, 56));
produtos.push(new Produto(5, "Mouse", "Redragon Cobra", 114.9, 99));
produtos.push(new Produto(6, "Mousepad", "Razer Fissure", 62.9, 58));
produtos.push(new Produto(7, "Notebook", "Acer Nitro 5", 5.399, 4));
produtos.push(new Produto(8, "Notebook", "Asus VivoBook", 2.754, 6));
produtos.push(new Produto(9, "Notebook", "Dell Inspiron i5402", 3.299, 12));
produtos.push(new Produto(10, "Notebook", "Apple MackBook Air", 8.899, 3));

atualizarTabela();