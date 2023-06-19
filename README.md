## 페이크 스토어 샵

페이크 ip를 이용한 스토어 샵
$ https://fakestoreapi.com/

---

## id/pw로 로그인 하여 각각의 상품을 바구니에 담아보세요!

### 실행하기

```bash
$ git clone https://github.com/mmmiinn/fake-store-shop.git
$ yarn
$ yarn dev
```

### 빌드하기

아래 명령어를 통해 빌드를 실행합니다. 실행한 내용은 `build/` 폴더 밑에 생성됩니다.

```bash
$ yarn dev
```

### 폴더 구조

```
src
├── assets
│   └── images
├── components
│   └── cart
│       ├──cartItem
│       └──item
├── pages
│   ├── loginPage
│   ├── mainPage
│   └── notFound
├── scss
└── types
```

- `assets` : 정적파일 폴더
- `components`: 컴포넌트 폴더 - 페이지별로 폴더 구조 분리
- `pages`: 페이지 컴포넌트 폴더
- `scss`: scss 폴더
- `types`: typescript 타입 정의 폴더

## 기술 스택

### UI

styled-components

### 서버 상태 관리

react-Query
