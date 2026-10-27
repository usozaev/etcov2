# Эталонные концессии — сайт

Vite + React + TypeScript · GSAP/ScrollTrigger · Framer Motion · Lenis

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # сборка в dist/
npm run images -- "<папка с исходными фото>"   # сжать фото в public/images (webp, ≤2200px)
```

## Структура

```
src/
  data/         контент: projects.ts, team.ts, site.ts (контакты, цифры, услуги, этапы)
  components/   переиспользуемое: RevealText, RevealImage, Marquee, Magnetic, Counter,
                Cursor, Header + Menu, Preloader, PageTransition, Footer
  sections/     блоки главной: Hero, About, Stats, ProjectsStack, Services, Stages,
                Gallery, TeamPreview, Partners
  pages/        Home, Projects, ProjectDetail (/projects/:slug), Team, NotFound
  providers/    SmoothScroll (Lenis ↔ ScrollTrigger), AppReady (сигнал «прелоадер ушёл»)
public/images/  оптимизированные фото
```

Тексты и фото меняются в `src/data/*`, вёрстку трогать не нужно.
Новый проект — новый объект в `projects.ts`, страница `/projects/<slug>` появится сама.

## Анимации

- `<RevealText trigger="scroll" | "ready">`: текст выезжает из-под маски по словам или буквам
- `<RevealImage parallax={10}>`: раскрытие шторкой и параллакс
- `data-cursor="Текст"` на любом элементе: курсор превращается в круг с подписью
