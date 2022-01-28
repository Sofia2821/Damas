const tamanhoCelula = 40;
let pecaId = 0;
let lf = 0;
let la = 0;
let c = "";
document.body.append(criaTabuleiro());
document.body.background = 'PASTA-IMG/fundodamas.jpg';

function criaTabuleiro() {
    const tamanho = 8;
    let tabela = document.createElement('table');

    tabela.style.borderStyle = 'solid';
    tabela.style.borderSpacing = 0;
    tabela.style.margin = 'auto';
    tabela.style.borderColor = 'purple';

    for (let i = 0; i < tamanho; i++) {
        let linha = document.createElement('tr');
        tabela.append(linha);
        for (let j = 0; j < tamanho; j++) {
            let celula = document.createElement('td');
            linha.append(celula);
            celula.style.width = `${tamanhoCelula}px`;
            celula.style.height = `${tamanhoCelula}px`;
            if (i % 2 == j % 2) {
                celula.style.backgroundColor = '#f2cbf5';
                celula.classList.add("container");
                if (i * 8 + j <= 24) {
                    celula.append(criaPeca('black'));
                } else if (i * 8 + j >= 40) {
                    celula.append(criaPeca('red'));
                }
            } else {
                celula.style.backgroundColor = 'white';
            }
        }
    };
    return tabela;
}

function criaPeca(cor) {
    let imagem = document.createElement('img');
    imagem.setAttribute('src', `PASTA-IMG/${cor}.png`);
    imagem.setAttribute('width', `${tamanhoCelula-4}px`);
    imagem.setAttribute('height', `${tamanhoCelula-4}px`);
    imagem.setAttribute('draggable','true');
    imagem.classList.add("draggable");
    return imagem;
}

function dragstart(){
	document.addEventListener("dragstart", function(event) {
	  event.dataTransfer.setData("Text", event.target.id);
	  la = event.path[1].id;
	  c = event.path[0].className;
	  
	});
}

function dragend() {
	document.addEventListener("dragend", function(event) {
	});
}

function dragover() {
	document.addEventListener("dragover", function(event) {
	  event.preventDefault();
	});
}
function drop(){
	document.addEventListener("drop", function(event) {
		event.preventDefault();
		if ( event.target.className == "droptarget") {
			const data = event.dataTransfer.getData("Text");
				let w = event.path[0];
				let e = w.childElementCount;
				lf = event.target.id;
				console.log(event)
				if(e == '0' && la != lf && lf - la == 1 || lf - la == -1){
					if(c == "red" && la > lf || c == "black" && la < lf)
					event.target.appendChild(document.getElementById(data));
				}
		}
	});
}

dragstart();
dragend();
dragover();
drop();
