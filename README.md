# k4l1.com

Site pessoal de Kalina Mendes. HTML, CSS e JavaScript puro, sem frameworks e sem backend, publicado no GitHub Pages com o domínio próprio k4l1.com.

## Direção visual

- **Modo escuro**, fundo grafite `#0E0F13`, texto `#ECEEF3`, texto secundário `#989EAD`.
- **Destaque violeta** `#B69CFF`, tirado do fundo da foto de perfil. Combina com as fotos de música sem competir com elas.
- **Tipografia:** Instrument Sans nos textos e JetBrains Mono nas datas (formato `2025/2027`), rótulos e detalhes técnicos. As duas fontes estão dentro do projeto.
- **Personalidade de segurança, com sobriedade:** `$ whoami` no topo (digita "Hello, World!" e responde `k4l1`), codinome K4L1 na aba, moldura de "identidade verificada" na foto e títulos de seção temáticos (Perfil, Registro, Base técnica, Outra frequência, Canal seguro), cada um com um rótulo simples acima (`~/sobre`, `~/trajetoria`...). O menu usa nomes diretos.

## Estrutura

```
/
├── index.html
├── style.css
├── script.js
├── 404.html                      página de erro para endereços que não existem
├── CNAME                         domínio k4l1.com
├── README.md
└── assets/
    ├── fonts/                    Instrument Sans e JetBrains Mono
    ├── icons/                    favicon.svg e apple-touch-icon.png
    └── images/                   foto de perfil, fotos de música e og-image.png
.well-known/security.txt          como relatar falhas de segurança (RFC 9116)
```

## Detalhes escondidos

- **Console (F12):** um recado para quem inspeciona o site, definido no início do `script.js`.
- **404.html:** página no estilo terminal para endereços inexistentes. Usa caminhos absolutos (`/style.css`) porque o GitHub Pages a serve em qualquer endereço.
- **security.txt:** contato para relatar falhas. O campo `Expires` precisa ser renovado uma vez por ano (próximo vencimento: outubro de 2027).

## Onde editar

Todo o texto está no `index.html`, dividido por comentários: `TOPO`, `SOBRE`, `TRAJETÓRIA`, `HABILIDADES`, `MÚSICA` e `CONTATO`. Edite só o texto entre as tags e salve (Ctrl+S).

- **Nova experiência ou formação:** copie um bloco `<li class="log-item">...</li>` inteiro dentro da lista certa e troque o conteúdo.
- **Nova tecnologia:** acrescente `<li>Nome</li>` na lista de etiquetas.
- **Trocar uma foto de música:** substitua o arquivo em `assets/images/` mantendo o mesmo nome, ou troque o `src` e o `alt` no `index.html`. O ideal é uma imagem vertical na proporção 4:5.
- **Seção de Projetos (futura):** quando o primeiro projeto existir, ela entra entre Trajetória e Habilidades.

## Publicar no GitHub Pages

1. Crie um repositório público em github.com (o deste site é `kalina-mendes.github.io`).
2. Envie **o conteúdo** desta pasta (o `index.html` precisa ficar na raiz) em **Add file > Upload files** e clique em **Commit changes**.
3. Em **Settings > Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`, e salve.

## Domínio k4l1.com

O domínio foi registrado na HostGator. O arquivo `CNAME` está no projeto, e a zona DNS (HostGator > Domínios > Editar Zona Avançada de DNS) tem estes registros:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | kalina-mendes.github.io |

Depois, em **Settings > Pages**, confira se o campo **Custom domain** mostra `k4l1.com`. Quando o GitHub terminar a verificação (pode levar de minutos a algumas horas), marque **Enforce HTTPS**.

## Acessibilidade e desempenho

- HTML semântico, link para pular ao conteúdo, foco visível e menu do celular que fecha com Esc.
- Com "reduzir movimento" ativado no aparelho, as animações são desligadas.
- Fotos de música com carregamento sob demanda (lazy loading).
- Peso total em torno de 600 KB, quase todo nas fotos.
