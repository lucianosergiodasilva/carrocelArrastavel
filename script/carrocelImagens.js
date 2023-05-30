const tabsBox = document.querySelector('.tabs-box'),
    allTabs = document.querySelectorAll('.tab'),
    arrowIcons = document.querySelectorAll('.icon i')

let isDragging = false

const handleIcons = () => {
    let scrollval = Math.round(tabsBox.scrollLeft)
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth //scrollwhidth retorna a largura do elemento, incluindo conteúdo ot visível na tela devido ao estouro. clientwidth retorna a largura visível de um elemento.
    arrowIcons[0].parentElement.style.display = scrollval > 0 ? 'flex' : 'none' //selecionando a div pai do ícone anterior (.icon da seta #left). se scrollval for maior que 0, mostre o ícone anterior ou oculte-o.
    arrowIcons[1].parentElement.style.display = maxScrollableWidth > scrollval ? 'flex' : 'none'
}

arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        tabsBox.scrollLeft += icon.id === 'left' ? -500 : 500 //Move .tabs-box no eixo X
        setTimeout(() => handleIcons(), 50) //Mostra a seta da esquerda após o primeiro clique na outra seta
    })
})

allTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // removendo a classe ativa da guia anterior e adicionando à guia clicada atual.
        tabsBox.querySelector('.active').classList.remove('active')
        tab.classList.add('active')
    })
})

const dragging = (e) => {
    if (!isDragging) return
    tabsBox.classList.add('dragging') //Adiciona a classe .DRAGGIN em .tabs-box na nora de arrastar. A classe .DRAGGIN bloqueia a seleção do texto em .tab para permitir arrastar o elemento
    tabsBox.scrollLeft -= e.movementX //.tabs-box segue o mouse no eixo X
    handleIcons()
}

const dragStop = () => {
    isDragging = false
    tabsBox.classList.remove('dragging') //Remove a classe .DRAGGIN de .tabs-box quando parar de arrastar
}

tabsBox.addEventListener('mousedown', () => isDragging = true)//arrasta .tabs-box no eixo X
tabsBox.addEventListener('mousemove', dragging)//.tabs-box segue o mouse no eixo X
document.addEventListener('mouseup', dragStop)//para de arrastar .tabs-box no eixo X