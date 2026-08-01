type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
  shape: 'rect' | 'heart';
  life: number;
};

const COLORS = ['#FF3D8B', '#C2185B', '#8B5CF6', '#FFB07A', '#FF9BC0', '#FFFFFF'];

let canvas: HTMLCanvasElement | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let particles: Particle[] = [];
let rafId = 0;

function ensureCanvas(): CanvasRenderingContext2D | null {
  if (canvas && ctx) return ctx;

  canvas = document.createElement('canvas');
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:60';
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  resize();
  window.addEventListener('resize', resize);
  return ctx;
}

function resize() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function drawHeart(c: CanvasRenderingContext2D, size: number) {
  const s = size / 10;
  c.beginPath();
  c.moveTo(0, 3 * s);
  c.bezierCurveTo(0, 0, -5 * s, 0, -5 * s, 3 * s);
  c.bezierCurveTo(-5 * s, 6 * s, 0, 8 * s, 0, 10 * s);
  c.bezierCurveTo(0, 8 * s, 5 * s, 6 * s, 5 * s, 3 * s);
  c.bezierCurveTo(5 * s, 0, 0, 0, 0, 3 * s);
  c.fill();
}

function tick() {
  if (!ctx || !canvas) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  ctx.clearRect(0, 0, w, h);

  particles = particles.filter((p) => p.life > 0 && p.y < h + 60);

  particles.forEach((p) => {
    p.vy += 0.16;
    p.vx *= 0.995;
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life -= 1;

    ctx!.save();
    ctx!.translate(p.x, p.y);
    ctx!.rotate((p.rotation * Math.PI) / 180);
    ctx!.globalAlpha = Math.min(1, p.life / 40);
    ctx!.fillStyle = p.color;
    if (p.shape === 'heart') {
      drawHeart(ctx!, p.size);
    } else {
      ctx!.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    }
    ctx!.restore();
  });

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tick);
  } else {
    ctx.clearRect(0, 0, w, h);
    rafId = 0;
  }
}

export function fireConfetti(options?: { originX?: number; originY?: number; count?: number }) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const c = ensureCanvas();
  if (!c) return;

  const count = options?.count ?? 90;
  const ox = options?.originX ?? window.innerWidth / 2;
  const oy = options?.originY ?? window.innerHeight / 2;

  for (let i = 0; i < count; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 9;
    particles.push({
      x: ox,
      y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 5,
      size: 7 + Math.random() * 10,
      rotation: Math.random() * 360,
      spin: Math.random() * 12 - 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      shape: Math.random() > 0.55 ? 'heart' : 'rect',
      life: 120 + Math.random() * 60,
    });
  }

  if (!rafId) rafId = requestAnimationFrame(tick);
}
