<div dir="rtl">

<div align="center">

# ⚡ المنظومة المعمارية لـ TidyFactor
### بنية الويب الأصلية للذكاء الاصطناعي، ونظم التصميم، ومهارات الوكلاء
**أسس برمجية معيارية، حتمية، وعالية الكفاءة في استهلاك السياق لبيئات العمل المشترك بين الإنسان ووكلاء الذكاء الاصطناعي.**

[![الموقع الرسمي](https://img.shields.io/badge/Website-tidyfactor.com-000000.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://tidyfactor.com)
[![التوثيق الفني](https://img.shields.io/badge/Docs-Documentation-blue.svg?style=for-the-badge&logo=gitbook&logoColor=white)](https://tidyfactor.com/documentation)
[![NPM Organization](https://img.shields.io/badge/NPM-@alwkala-CB3837.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/org/alwkala)
[![الترخيص: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg?style=for-the-badge)](LICENSE)
[![الإصدار v1.6.0](https://img.shields.io/badge/Release-v1.6.0-emerald.svg?style=for-the-badge)](https://github.com/TidyFactor/TidyFactor/releases/latest)

[ English ](README.md) • [ العربية ](README.ar.md) • [ فارسی ](README.fa.md) • [ Español ](README.es.md) • [ Português ](README.pt.md) • [ 简体中文 ](README.zh.md) • [ Deutsch ](README.de.md) • [ Français ](README.fr.md)

<br/>

```bash
# تشغيل المعالج التفاعلي الشامل عبر 10+ بيئات لوكلاء الذكاء الاصطناعي
npx @alwkala/tidyfactor init
```

</div>

---

## 🌟 لماذا توجد TidyFactor؟

لقد تغيرت أسس تطوير الويب. لم يعد الذكاء الاصطناعي مجرد أداة لتسريع الكتابة، بل أعاد تشكيل طريقة بناء البرمجيات واستيعابها وصيانتها.

تحتاج الأجيال القادمة من منصات الويب إلى بنية مصممة خصيصاً للتعاون الحتمي بين **المطورين البشريين ونماذج الذكاء الاصطناعي ووكلاء البرمجة الذاتية** (*Google Antigravity, Claude Code, Cursor, Codex, Windsurf, Cline*).

توفر **TidyFactor** موجهات مهارات خفيفة (~350 توكن)، وذاكرة تشغيلية متخصصة، ومعايير فحص صارمة قبل التوليد، ومنصات تشغيل متكاملة بدون تشتت في ذاكرة النماذج (Context Degradation).

---

## ⚡ طرق التثبيت السريع عبر المنصات المتعددة

### 1. عبر سطر أوامر Node.js (NPX) — بنية مزدوجة الحماية (NPM + Direct CDN)
```bash
# تشغيل معالج الإعداد التفاعلي ثلاثي المراحل
npx @alwkala/tidyfactor init

# تثبيت باقة عمل مخصصة
npx @alwkala/tidyfactor add pack:design
npx @alwkala/tidyfactor add pack:saas

# تثبيت مهارة محددة مع توجيه بيئة الـ IDE
npx @alwkala/tidyfactor add tidyfactor-styler --cursor
npx @alwkala/tidyfactor add tidyfactor-cinematic --claude
npx @alwkala/tidyfactor add tidyfactor-skill-architect --global

# فحص صحة بيئة العمل واكتشاف الوكلاء النشطين
npx @alwkala/tidyfactor doctor
```

### 2. سكربتات التثبيت المستقلة بسطر واحد (بدون الحاجة لـ Node.js)
```bash
# أنظمة Linux و macOS (عبر cURL و Bash مع قراءة تفاعلية عبر /dev/tty)
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- pack:design
curl -fsSL https://tidyfactor.com/api/v1/install.sh | bash -s -- all

# أنظمة Windows (عبر PowerShell 5.1 و 7+ بنقاء ASCII كامل)
irm https://tidyfactor.com/api/v1/install.ps1 | iex
$Skill = 'pack:design'; irm https://tidyfactor.com/api/v1/install.ps1 | iex
$Skill = 'all'; irm https://tidyfactor.com/api/v1/install.ps1 | iex
```

> 📖 **المستند الفني الشامل لبنية التوزيع ونقاط الـ REST API:** [DISTRIBUTION.md](DISTRIBUTION.md)

---

## 📦 باقات مسارات العمل الجاهزة (Workflow Packs)

| معرف الباقة | اسم الباقة | النطاق والتخصص | أمر التثبيت السريع |
| :--- | :--- | :--- | :--- |
| `pack:design` | **باقة التصميم والواجهات** | صفحات الهبوط الفاخرة + استوديو التصميم + محرك الـ RTL | `npx @alwkala/tidyfactor add pack:design` |
| `pack:saas` | **باقة تطبيقات الـ SaaS** | محرك Next.js 16 + Supabase RLS + التصميم + التسويق والتوثيق | `npx @alwkala/tidyfactor add pack:saas` |
| `pack:engineering` | **باقة الهندسة الكاملة** | مونويلث PHP 8.x + HTMX + سبا Vanilla JS + HTML ثابت | `npx @alwkala/tidyfactor add pack:engineering` |
| `pack:governance` | **باقة الحوكمة والعمليات** | معمار المهارات + منصة التوثيق + محرك إدارة GitHub | `npx @alwkala/tidyfactor add pack:governance` |
| `pack:growth` | **باقة النمو والتسويق** | محرك التسويق المباشر + الـ SEO + صفحات الهبوط والـ RTL | `npx @alwkala/tidyfactor add pack:growth` |

---

## 🏛️ مصفوفة مهارات المجتمع المعتمدة (12 مهارة)

| التصنيف | معرف المهارة | أوامر الاستدعاء الأساسية | الوصف المعماري | ملف المهارة (.skill) |
| :--- | :--- | :--- | :--- | :---: |
| **الحوكمة** | `tidyfactor-skill-architect` | `/init`, `/audit`, `/test`, `/grow` | محرك الحوكمة الشامل ومنهجية الانضباط الهيكلي للمهارات. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-skill-architect.skill) |
| **العمليات** | `tidyfactor-github` | `/audit`, `/oss`, `/ruleset`, `/readme`, `/action` | محرك عمليات وإدارة منصة GitHub وقواعد الفروع وسلاسل الإمداد. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-github.skill) |
| **التصميم** | `tidyfactor-cinematic` | `/film`, `/brand`, `/hero`, `/theme`, `/perf` | صفحات هبوط فاخرة مدفوعة بالتمرير بتسلسل فريمات Canvas. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-cinematic.skill) |
| **التصميم** | `tidyfactor-design` | `/study`, `/brief`, `/tokens`, `/palette`, `/layout` | استوديو التصميم بالكود الحي وبديل فيجما للوحات التحكم. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-design.skill) |
| **التصميم** | `tidyfactor-styler` | `/component`, `/section`, `/redesign`, `/rtl`, `/motion` | مصفف أطر العمل الجاهزة ومحرك صقل الواجهات العربية والـ RTL. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-styler.skill) |
| **الهندسة** | `tidyfactor-next` | `/brief`, `/init`, `/tenant`, `/rls`, `/auth`, `/api` | محرك SaaS متعدد المستأجرين مبني على Next.js 16 و React 19 و Supabase. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-next.skill) |
| **الهندسة** | `tidyfactor-php` | `/brief`, `/init`, `/admin`, `/plugins`, `/themes`, `/rbac` | مونوليث PHP 8.x حديث معزز بنظام ملحقات وقوالب وصلاحيات RBAC. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-php.skill) |
| **الهندسة** | `tidyfactor-htmx` | `/brief`, `/init`, `/fragments`, `/swap`, `/triggers` | محرك التفاعل عالي الكفاءة عبر بروتوكول Hypermedia مع الخوادم. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-htmx.skill) |
| **الهندسة** | `tidyfactor-js` | `/brief`, `/init`, `/store`, `/compo`, `/route`, `/pages` | تطبيق صفحة واحدة (SPA) تفاعلي خالي من أطر العمل الثقيلة. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-js.skill) |
| **الهندسة** | `tidyfactor-html` | `/brief`, `/init`, `/compo`, `/pages`, `/assets`, `/seo` | منصة ثابتة 100% تعتمد على Web Components وسرعة 100/100. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-html.skill) |
| **التوثيق** | `tidyfactor-doc` | `/init`, `/collect`, `/generate`, `/site`, `/mkdocs`, `/docsify` | منصة توثيق المشاريع البرمجية المزدوجة (MkDocs & Docsify). | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-doc.skill) |
| **النمو** | `tidyfactor-marketing` | `/strategy`, `/content`, `/social`, `/email`, `/advertising` | محرك التسويق المباشر، واستراتيجيات الـ SEO وصناعة المحتوى. | [⬇️ تحميل .skill](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-marketing.skill) |

> 📦 **حزمة الماستر المجمعة للـ 12 مهارة (.zip)**: [⬇️ تحميل مباشر من خادم TidyFactor](https://tidyfactor.com/downloads/tidyfactor-skills-suite.zip) | [مرآة GitHub](https://github.com/TidyFactor/TidyFactor/releases/latest/download/tidyfactor-skills-suite.zip)

---

## 🤖 مصفوفة التوافق مع بيئات وكلاء الذكاء الاصطناعي (10+ IDEs)

تم تصميم وهيكلة جميع مهارات TidyFactor لتكون متوافقة فورياً مع مختلف بيئات المطورين:

| بيئة الوكيل / IDE | مجلد التثبيت والتفعيل | آلية العمل |
| :--- | :--- | :--- |
| **Google Antigravity / Gemini** | `.agents/skills/<skill>/` | اكتشاف تلقائي فوري لسياق مساحة العمل |
| **Cursor IDE** | `.cursor/skills/<skill>/` | تحميل وتفعيل تلقائي لقواعد وأوامر المشروع |
| **Claude Code** | `.claude/skills/<skill>/` | حقن مباشر للأوامر والذاكرة التشغيلية |
| **Windsurf Cascade** | `.windsurf/skills/<skill>/` | تنفيذ المهام وقراءة قواعد المنظومة |
| **Cline / VS Code** | `.cline/skills/<skill>/` | دمج المهارات في أدوات الوكيل المخصصة |
| **OpenAI Codex** | `.agents/skills/<skill>/` | استيعاب التعليمات والمراجع البرمجية |
| **البيئة العامة للمستخدم** | `~/.gemini/config/skills/<skill>/` | إتاحة المهارات لجميع المشاريع عالمياً |

---

## 🏛️ المبادئ المعمارية الجوهرية الـ 5

1. **كفاءة السياق (Context-Efficiency)**: موجهات مهارات خفيفة (~350 توكن) مع إفصاح تدريجي يمنع الهلوسة ويستدعي الذاكرة عند الحاجة فقط.
2. **التنفيذ الحتمي (Deterministic Execution)**: منع التعديلات العشوائية عبر تغليف أدوات المترجمات الأصلية (`tsc`, `node`, `git`, OS APIs).
3. **العزل الأمني المحكم (Locked Tenant Isolation)**: ضبط حدود الأمان على مستوى قاعدة البيانات (PostgreSQL RLS) لمنع أي تسريب للبيانات.
4. **الأداء القائم على القياس (Evidence-Based Performance)**: القياس قبل التحسين، وفصل اختبارات التشغيل الباردة عن الساخنة بصرامة إحصائية.
5. **تناظر الكود (Human-Agent Code Symmetry)**: هيكلة برمجية واضحة ومقروءة بنفس الدرجة للمهندسين البشريين ولوكلاء الذكاء الاصطناعي.

---

## 👨‍💻 المنظمة والتواصل والدعم الرسمي

- 🌐 **الموقع الرسمي:** [https://tidyfactor.com/](https://tidyfactor.com/)
- 📚 **التوثيق الفني:** [https://tidyfactor.com/documentation](https://tidyfactor.com/documentation)
- 🤝 **الشريك الرسمي:** [وكالة الوكالة الرقمية (Alwkala Agency)](https://alwkala.com/)
- 🐙 **منظمة GitHub:** [github.com/TidyFactor](https://github.com/TidyFactor)
- 📧 **التواصل والاستفسارات:** [hello@tidyfactor.com](mailto:hello@tidyfactor.com)
- 📱 **واتساب:** [+20 101 665 6899](https://wa.me/201016656899)
- 📍 **المقر:** القاهرة، جمهورية مصر العربية

---

## 📜 الترخيص

تخضع هذه المنظومة لترخيص **Apache License 2.0**. جميع الحقوق محفوظة (c) 2026 [TidyFactor](https://tidyfactor.com) وشريكتها [Alwkala Digital Agency](https://alwkala.com).

</div>
