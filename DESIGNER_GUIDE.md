# NeighborlyOne 디자이너 가이드

이 문서는 디자이너가 NeighborlyOne 웹사이트를 수정하고 스타일을 변경할 때 참고할 수 있는 가이드입니다.

## 📁 프로젝트 구조

```
web/
├── src/
│   ├── app/                        # 메인 애플리케이션 폴더
│   │   ├── page.jsx               # 홈페이지 (/)
│   │   ├── layout.jsx             # 공통 레이아웃
│   │   ├── global.css             # 전역 스타일
│   │   │
│   │   ├── components/            # 재사용 가능한 컴포넌트
│   │   │   ├── Logo.jsx          # 로고 컴포넌트
│   │   │   └── HeroSlideshow.jsx # 히어로 슬라이드쇼
│   │   │
│   │   ├── assets/                # 이미지 및 정적 파일
│   │   │   ├── logo.png          # 로고 이미지
│   │   │   └── hero/             # 히어로 섹션 이미지들
│   │   │
│   │   ├── login/                 # 로그인 페이지
│   │   │   └── page.jsx
│   │   ├── signup/                # 회원가입 페이지
│   │   │   └── page.jsx
│   │   ├── residents/             # For Residents 페이지
│   │   │   └── page.jsx
│   │   ├── about/                 # About Us 페이지
│   │   │   └── page.jsx
│   │   ├── terms/                 # Terms of Service 페이지
│   │   │   └── page.jsx
│   │   ├── privacy/               # Privacy Policy 페이지
│   │   │   └── page.jsx
│   │   ├── support/               # Support 페이지
│   │   │   └── page.jsx
│   │   └── polishing-up/          # App Pre-signup 페이지
│   │       └── page.jsx
│   │
│   └── __create/
│       └── favicon.png            # 파비콘
│
├── public/                         # 공용 정적 파일
│
├── docs/                          # 문서 폴더
├── scripts/                       # 스크립트 폴더
├── archived/                      # 백업 및 보관 파일
│
├── package.json                   # 의존성 관리
└── tailwind.config.js             # Tailwind CSS 설정

```

## 🎨 브랜드 컬러

프로젝트 전체에서 사용되는 주요 컬러:

- **Primary (Blue)**: `bg-blue-500` (#3B82F6)
  - Hover: `bg-blue-600`
  - Light: `bg-blue-100`
  
- **Secondary (Yellow)**: `bg-yellow-400` (#FACC15)
  - Hover: `bg-yellow-500`
  - Light: `bg-yellow-100`

- **Text Colors**:
  - Primary: `text-gray-900` (제목, 중요 텍스트)
  - Secondary: `text-gray-600` (본문 텍스트)
  - Muted: `text-gray-500` (보조 텍스트)

- **Background**:
  - Main: `bg-gray-50` (페이지 배경)
  - Card: `bg-white` (카드, 섹션)
  - Dark: `bg-gray-900` (다크 모드 요소)

## 📄 주요 페이지 구조

### 1. Homepage (`src/app/page.jsx`)
메인 랜딩 페이지로, 다음 섹션들로 구성:
- **Hero Section**: 슬라이드쇼 배경 + CTA 버튼
- **Problem Section**: 비즈니스 문제점 설명
- **Solution Section**: NeighborlyOne의 해결책
- **Pricing Section**: 3가지 플랜 (Free, Standard, Premium)
- **FAQ Section**: 자주 묻는 질문
- **Final CTA**: 풀 화면 폭 CTA 섹션 (파란색)
- **Footer**: 통일된 푸터 스타일

### 2. Authentication Pages
- **Login** (`src/app/login/page.jsx`)
- **Signup** (`src/app/signup/page.jsx`)
- **Forgot Password** (`src/app/forgot-password/page.jsx`)
- **Reset Password** (`src/app/reset-password/page.jsx`)

**공통 스타일**:
- 흰색 배경 카드 (`bg-white`)
- 깔끔한 입력 필드 (흰색 배경, 회색 테두리)
- 파란색 Primary 버튼

### 3. Content Pages
- **For Residents** (`src/app/residents/page.jsx`)
- **About Us** (`src/app/about/page.jsx`)
- **Terms** (`src/app/terms/page.jsx`)
- **Privacy** (`src/app/privacy/page.jsx`)
- **Support** (`src/app/support/page.jsx`)

**공통 요소**:
- 모든 페이지에 동일한 헤더/네비게이션
- 풀 폭 파란색 CTA 섹션 (Home과 동일)
- 동일한 Footer 스타일 (흰색 배경, 회색 텍스트)

## 🔧 스타일 수정 방법

### Tailwind CSS 사용
이 프로젝트는 Tailwind CSS를 사용합니다. 인라인 클래스로 스타일을 적용합니다.

**예시**:
```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
  Button Text
</button>
```

### 주요 Tailwind 유틸리티

**Spacing**:
- `p-4`: padding
- `m-4`: margin
- `px-4`: horizontal padding
- `py-4`: vertical padding
- `gap-4`: gap between flex/grid items

**Layout**:
- `flex`: flexbox
- `grid`: grid layout
- `items-center`: align items center
- `justify-between`: space between items
- `w-full`: full width
- `max-w-6xl`: maximum width

**Typography**:
- `text-xl`: text size
- `font-bold`: font weight
- `text-center`: text alignment

**Colors**:
- `bg-blue-500`: background color
- `text-white`: text color
- `border-gray-200`: border color

**Responsive Design**:
- `sm:`: small screens and up (640px+)
- `md:`: medium screens and up (768px+)
- `lg:`: large screens and up (1024px+)

예: `sm:text-4xl` = 작은 화면 이상에서 text-4xl 적용

## 🖼️ 이미지 변경 방법

### 로고 변경
1. 새 로고 파일을 `/src/app/assets/logo.png`에 저장
2. 파일명을 `logo.png`로 유지하거나
3. `src/app/components/Logo.jsx`에서 import 경로 수정

### 히어로 이미지 변경
1. 새 이미지들을 `/src/app/assets/hero/` 폴더에 저장
2. `src/app/components/HeroSlideshow.jsx` 파일 수정:
   - import 경로 업데이트
   - `heroImages` 배열에 이미지 추가/제거

### 파비콘 변경
1. 새 파비콘을 `/src/__create/favicon.png`에 저장
2. PNG 포맷 권장

## 🎯 통일된 디자인 원칙

### 1. CTA (Call-to-Action) 섹션
모든 페이지의 CTA는 동일한 스타일 사용:
```jsx
<section className="w-full bg-blue-500 text-white py-16 sm:py-24">
  <div className="flex flex-col items-center text-center gap-6 px-4">
    <h2 className="text-3xl sm:text-4xl font-bold">Heading</h2>
    <p className="max-w-xl text-lg">Description</p>
    <Link to="/signup" className="...bg-yellow-400 text-gray-900...">
      Button Text
    </Link>
  </div>
</section>
```

### 2. Footer
모든 페이지의 Footer는 동일한 스타일 사용:
```jsx
<footer className="w-full flex justify-center bg-white border-t border-gray-200">
  <div className="w-full max-w-6xl px-4 py-8">
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <p className="text-sm text-gray-600">© 2025 NeighborlyOne...</p>
      <div className="flex gap-6">
        {/* Links */}
      </div>
    </div>
  </div>
</footer>
```

### 3. 입력 필드 (Forms)
모든 입력 필드는 다음 스타일 사용:
```jsx
<input
  type="text"
  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors text-gray-900"
  placeholder="Placeholder"
/>
```

### 4. 버튼
**Primary Button**:
```jsx
<button className="bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors">
  Button Text
</button>
```

**Secondary Button**:
```jsx
<button className="bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
  Button Text
</button>
```

### 5. 카드 (Cards)
```jsx
<div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
  <h3 className="text-xl font-semibold text-gray-900 mb-2">Title</h3>
  <p className="text-gray-600">Description</p>
</div>
```

## 🛠️ 개발 환경

### 로컬 서버 실행
```bash
cd /Users/jaeminkoo/neione/web
npm run dev
```

기본 포트: `http://localhost:4000`

### 프로덕션 빌드
```bash
npm run build
```

## 📝 주요 수정 가이드라인

1. **일관성 유지**: 모든 페이지에서 동일한 컴포넌트 스타일 사용
2. **반응형 디자인**: `sm:`, `md:`, `lg:` breakpoints 사용
3. **접근성**: 적절한 색상 대비, `aria-label` 사용
4. **성능**: 이미지 최적화 (WebP 권장)
5. **브랜드 컬러 준수**: 파란색(Primary), 노란색(Secondary) 유지

## 🎨 컴포넌트 라이브러리

### 아이콘
프로젝트는 Heroicons (SVG)를 인라인으로 사용합니다:
```jsx
<svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
  <path d="..."/>
</svg>
```

## 🚀 배포

프로덕션 배포 시 `/scripts` 폴더의 스크립트 사용:
- `deploy-production.sh`: 프로덕션 서버에 배포
- `update-server.sh`: 서버 업데이트

## 📞 지원

질문이나 문제가 있을 경우:
- Email: neighborlyone0129@gmail.com
- Support Page: https://neighborlyone.com/support

---

**마지막 업데이트**: 2025년 11월

