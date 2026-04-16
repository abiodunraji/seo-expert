/**
 * Animate numeric stat counters using an ease-out cubic curve.
 * Observes the nearest <section> ancestor of the first [data-target] element
 * and fires once when it enters the viewport.
 *
 * @param selector - CSS selector for the counter elements (must have data-target)
 */
export function initStatCounters(selector: string = '.stat-value'): void {
  const firstStat = document.querySelector(selector);
  const section = firstStat?.closest('section');
  if (!section) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll<HTMLElement>(selector).forEach((stat) => {
          const target = parseInt(stat.getAttribute('data-target') ?? '0', 10);
          const duration = 2000;
          const startTime = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            stat.textContent = Math.floor(target * eased).toString();
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
}

/**
 * Animate expertise progress bars by setting their width when they
 * scroll into view.
 *
 * @param gridId - ID of the container element holding [data-width] fill elements
 */
export function initExpertiseBars(gridId: string = 'expertise-grid'): void {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll<HTMLElement>('.expertise-fill').forEach((fill) => {
          const width = fill.getAttribute('data-width') ?? '0';
          requestAnimationFrame(() => {
            fill.style.width = `${width}%`;
          });
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(grid);
}
