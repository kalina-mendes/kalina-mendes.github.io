# kalinamendes.com

Site pessoal de Kalina Mendes. HTML, CSS e JavaScript puro, sem frameworks e sem backend, pronto para o GitHub Pages com domínio próprio.

## Direção visual

- **Modo escuro**, fundo grafite `#0E0F13`, texto `#ECEEF3`, texto secundário `#989EAD`.
- **Destaque violeta** `#B69CFF`, tirado do fundo da foto de perfil. Combina com as fotos de música sem competir com elas.
- **Tipografia:** Instrument Sans nos textos e JetBrains Mono nas datas (formato `2025/2027`), rótulos e detalhes técnicos. As duas fontes estão dentro do projeto.
- **Personalidade de segurança, com sobriedade:** `$ whoami` no topo, moldura de "identidade verificada" na foto e títulos de seção temáticos (Perfil, Registro, Base técnica, Outra frequência, Canal seguro), cada um com um rótulo simples acima (`~/sobre`, `~/trajetoria`...). O menu usa nomes diretos.

## Estrutura

```
/
├── index.html
├── style.css
├── script.js
├── CNAME                         domínio kalinamendes.com
├── README.md
└── assets/
    ├── fonts/                    Instrument Sans e JetBrains Mono
    ├── icons/                    favicon.svg e apple-touch-icon.png
    └── images/                   foto de perfil, fotos de música e og-image.png
```

## Onde editar

Todo o texto está no `index.html`, dividido por comentários: `TOPO`, `SOBRE`, `TRAJETÓRIA`, `HABILIDADES`, `MÚSICA` e `CONTATO`. Edite só o texto entre as tags e salve (Ctrl+S).

- **Nova experiência ou formação:** copie um bloco `<li class="log-item">...</li>` inteiro dentro da lista certa e troque o conteúdo.
- **Nova tecnologia:** acrescente `<li>Nome</li>` na lista de etiquetas.
- **Trocar uma foto de música:** substitua o arquivo em `assets/images/` mantendo o mesmo nome, ou troque o `src` e o `alt` no `index.html`. O ideal é uma imagem vertical na proporção 4:5.
- **Seção de Projetos (futura):** quando o primeiro projeto existir, ela entra entre Trajetória e Habilidades.

## Publicar no GitHub Pages

1. Crie um repositório público em github.com (por exemplo, `kalinamendes.com` ou `site`).
2. Envie **o conteúdo** desta pasta (o `index.html` precisa ficar na raiz) em **Add file > Upload files** e clique em **Commit changes**.
3. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.

## Ligar o domínio kalinamendes.com

O arquivo `CNAME` já está no projeto. Falta configurar o domínio no site onde você o registrou (Registro.br, Hostinger, GoDaddy etc.), na área de **DNS**:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kalina-mendes.github.io |

Depois, em **Settings > Pages**, confira se o campo **Custom domain** mostra `kalinamendes.com`. Quando o GitHub terminar a verificação (pode levar de minutos a algumas horas), marque **Enforce HTTPS**.

## Acessibilidade e desempenho

- HTML semântico, link para pular ao conteúdo, foco visível e menu do celular que fecha com Esc.
- Com "reduzir movimento" ativado no aparelho, as animações são desligadas.
- Fotos de música com carregamento sob demanda (lazy loading).
- Peso total em torno de 600 KB, quase todo nas fotos.
