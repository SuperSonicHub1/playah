function O() {
}
function St(t, e) {
  for (const i in e)
    t[i] = e[i];
  return t;
}
function mt(t) {
  return t();
}
function at() {
  return /* @__PURE__ */ Object.create(null);
}
function F(t) {
  t.forEach(mt);
}
function xt(t) {
  return typeof t == "function";
}
function st(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Et(t) {
  return Object.keys(t).length === 0;
}
function Lt(t, e, i, n) {
  if (t) {
    const s = wt(t, e, i, n);
    return t[0](s);
  }
}
function wt(t, e, i, n) {
  return t[1] && n ? St(i.ctx.slice(), t[1](n(e))) : i.ctx;
}
function Mt(t, e, i, n) {
  if (t[2] && n) {
    const s = t[2](n(i));
    if (e.dirty === void 0)
      return s;
    if (typeof s == "object") {
      const r = [], l = Math.max(e.dirty.length, s.length);
      for (let f = 0; f < l; f += 1)
        r[f] = e.dirty[f] | s[f];
      return r;
    }
    return e.dirty | s;
  }
  return e.dirty;
}
function Ct(t, e, i, n, s, r) {
  if (s) {
    const l = wt(e, i, n, r);
    t.p(l, s);
  }
}
function Tt(t) {
  if (t.ctx.length > 32) {
    const e = [], i = t.ctx.length / 32;
    for (let n = 0; n < i; n++)
      e[n] = -1;
    return e;
  }
  return -1;
}
function X(t, e) {
  t.appendChild(e);
}
function q(t, e, i) {
  t.insertBefore(e, i || null);
}
function E(t) {
  t.parentNode.removeChild(t);
}
function j(t) {
  return document.createElement(t);
}
function rt(t) {
  return document.createTextNode(t);
}
function Ht() {
  return rt(" ");
}
function et(t, e, i, n) {
  return t.addEventListener(e, i, n), () => t.removeEventListener(e, i, n);
}
function At(t, e, i) {
  i == null ? t.removeAttribute(e) : t.getAttribute(e) !== i && t.setAttribute(e, i);
}
function nt(t, e, i) {
  e in t ? t[e] = typeof t[e] == "boolean" && i === "" ? !0 : i : At(t, e, i);
}
function Ot(t) {
  return Array.from(t.childNodes);
}
function jt(t, e) {
  e = "" + e, t.wholeText !== e && (t.data = e);
}
function A(t, e, i, n) {
  i === null ? t.style.removeProperty(e) : t.style.setProperty(e, i, n ? "important" : "");
}
let B;
function qt() {
  if (B === void 0) {
    B = !1;
    try {
      typeof window < "u" && window.parent && window.parent.document;
    } catch {
      B = !0;
    }
  }
  return B;
}
function zt(t, e) {
  getComputedStyle(t).position === "static" && (t.style.position = "relative");
  const n = j("iframe");
  n.setAttribute("style", "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"), n.setAttribute("aria-hidden", "true"), n.tabIndex = -1;
  const s = qt();
  let r;
  return s ? (n.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>", r = et(window, "message", (l) => {
    l.source === n.contentWindow && e();
  })) : (n.src = "about:blank", n.onload = () => {
    r = et(n.contentWindow, "resize", e);
  }), X(t, n), () => {
    (s || r && n.contentWindow) && r(), E(n);
  };
}
let D;
function P(t) {
  D = t;
}
function Nt() {
  if (!D)
    throw new Error("Function called outside component initialization");
  return D;
}
function It(t) {
  Nt().$$.on_mount.push(t);
}
const W = [], K = [], V = [], ft = [], yt = Promise.resolve();
let it = !1;
function pt() {
  it || (it = !0, yt.then(bt));
}
function ht() {
  return pt(), yt;
}
function Q(t) {
  V.push(t);
}
const $ = /* @__PURE__ */ new Set();
let J = 0;
function bt() {
  const t = D;
  do {
    for (; J < W.length; ) {
      const e = W[J];
      J++, P(e), Wt(e.$$);
    }
    for (P(null), W.length = 0, J = 0; K.length; )
      K.pop()();
    for (let e = 0; e < V.length; e += 1) {
      const i = V[e];
      $.has(i) || ($.add(i), i());
    }
    V.length = 0;
  } while (W.length);
  for (; ft.length; )
    ft.pop()();
  it = !1, $.clear(), P(t);
}
function Wt(t) {
  if (t.fragment !== null) {
    t.update(), F(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(Q);
  }
}
const G = /* @__PURE__ */ new Set();
let C;
function Pt() {
  C = {
    r: 0,
    c: [],
    p: C
  };
}
function Dt() {
  C.r || F(C.c), C = C.p;
}
function z(t, e) {
  t && t.i && (G.delete(t), t.i(e));
}
function R(t, e, i, n) {
  if (t && t.o) {
    if (G.has(t))
      return;
    G.add(t), C.c.push(() => {
      G.delete(t), n && (i && t.d(1), n());
    }), t.o(e);
  } else
    n && n();
}
function Ft(t, e) {
  R(t, 1, 1, () => {
    e.delete(t.key);
  });
}
function Rt(t, e, i, n, s, r, l, f, o, u, w, a) {
  let c = t.length, d = r.length, m = c;
  const T = {};
  for (; m--; )
    T[t[m].key] = m;
  const S = [], x = /* @__PURE__ */ new Map(), L = /* @__PURE__ */ new Map();
  for (m = d; m--; ) {
    const _ = a(s, r, m), y = i(_);
    let p = l.get(y);
    p ? n && p.p(_, e) : (p = u(y, _), p.c()), x.set(y, S[m] = p), y in T && L.set(y, Math.abs(m - T[y]));
  }
  const b = /* @__PURE__ */ new Set(), U = /* @__PURE__ */ new Set();
  function N(_) {
    z(_, 1), _.m(f, w), l.set(_.key, _), w = _.first, d--;
  }
  for (; c && d; ) {
    const _ = S[d - 1], y = t[c - 1], p = _.key, H = y.key;
    _ === y ? (w = _.first, c--, d--) : x.has(H) ? !l.has(p) || b.has(p) ? N(_) : U.has(H) ? c-- : L.get(p) > L.get(H) ? (U.add(p), N(_)) : (b.add(H), c--) : (o(y, l), c--);
  }
  for (; c--; ) {
    const _ = t[c];
    x.has(_.key) || o(_, l);
  }
  for (; d; )
    N(S[d - 1]);
  return S;
}
function vt(t) {
  t && t.c();
}
function lt(t, e, i, n) {
  const { fragment: s, on_mount: r, on_destroy: l, after_update: f } = t.$$;
  s && s.m(e, i), n || Q(() => {
    const o = r.map(mt).filter(xt);
    l ? l.push(...o) : F(o), t.$$.on_mount = [];
  }), f.forEach(Q);
}
function ot(t, e) {
  const i = t.$$;
  i.fragment !== null && (F(i.on_destroy), i.fragment && i.fragment.d(e), i.on_destroy = i.fragment = null, i.ctx = []);
}
function Ut(t, e) {
  t.$$.dirty[0] === -1 && (W.push(t), pt(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function ct(t, e, i, n, s, r, l, f = [-1]) {
  const o = D;
  P(t);
  const u = t.$$ = {
    fragment: null,
    ctx: null,
    props: r,
    update: O,
    not_equal: s,
    bound: at(),
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (o ? o.$$.context : [])),
    callbacks: at(),
    dirty: f,
    skip_bound: !1,
    root: e.target || o.$$.root
  };
  l && l(u.root);
  let w = !1;
  if (u.ctx = i ? i(t, e.props || {}, (a, c, ...d) => {
    const m = d.length ? d[0] : c;
    return u.ctx && s(u.ctx[a], u.ctx[a] = m) && (!u.skip_bound && u.bound[a] && u.bound[a](m), w && Ut(t, a)), c;
  }) : [], u.update(), w = !0, F(u.before_update), u.fragment = n ? n(u.ctx) : !1, e.target) {
    if (e.hydrate) {
      const a = Ot(e.target);
      u.fragment && u.fragment.l(a), a.forEach(E);
    } else
      u.fragment && u.fragment.c();
    e.intro && z(t.$$.fragment), lt(t, e.target, e.anchor, e.customElement), bt();
  }
  P(o);
}
class ut {
  $destroy() {
    ot(this, 1), this.$destroy = O;
  }
  $on(e, i) {
    const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return n.push(i), () => {
      const s = n.indexOf(i);
      s !== -1 && n.splice(s, 1);
    };
  }
  $set(e) {
    this.$$set && !Et(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
function tt(t) {
  const e = {};
  for (const n in t)
    e[n] = [i(t[n])];
  function i(n) {
    return function() {
      return {
        c: O,
        m: function(r, l) {
          q(r, n.cloneNode(!0), l);
        },
        d: function(r) {
          r && n.innerHTML && E(n);
        },
        l: O
      };
    };
  }
  return e;
}
function Bt(t) {
  class e extends HTMLElement {
    constructor() {
      super(), this.slotcount = 0;
      let n = t.shadow ? this.attachShadow({ mode: "open" }) : this;
      if (t.href && t.shadow) {
        let s = document.createElement("link");
        s.setAttribute("href", t.href), s.setAttribute("rel", "stylesheet"), n.appendChild(s);
      }
      t.shadow ? (this._root = document.createElement("div"), n.appendChild(this._root)) : this._root = n;
    }
    static get observedAttributes() {
      return t.attributes || [];
    }
    connectedCallback() {
      let n = t.defaults ? t.defaults : {}, s;
      if (n.$$scope = {}, Array.from(this.attributes).forEach((r) => n[r.name] = r.value), n.$$scope = {}, t.shadow) {
        s = this.getShadowSlots();
        let r = t.defaults ? t.defaults : {};
        r.$$scope = {}, this.observer = new MutationObserver(this.processMutations.bind(this, { root: this._root, props: r })), this.observer.observe(this, { childList: !0, subtree: !0, attributes: !1 });
      } else
        s = this.getSlots();
      this.slotcount = Object.keys(s).length, n.$$slots = tt(s), this.elem = new t.component({ target: this._root, props: n });
    }
    disconnectedCallback() {
      this.observe && this.observer.disconnect();
      try {
        this.elem.$destroy();
      } catch {
      }
    }
    unwrap(n) {
      let s = new DocumentFragment();
      for (; n.firstChild; )
        s.appendChild(n.removeChild(n.firstChild));
      return s;
    }
    getSlots() {
      const n = this.querySelectorAll("[slot]");
      let s = {};
      return n.forEach((r) => {
        s[r.slot] = this.unwrap(r), this.removeChild(r);
      }), this.innerHTML.length && (s.default = this.unwrap(this), this.innerHTML = ""), s;
    }
    getShadowSlots() {
      const n = this.querySelectorAll("[slot]");
      let s = {}, r = this.innerHTML.length;
      return n.forEach((l) => {
        s[l.slot] = document.createElement("slot"), s[l.slot].setAttribute("name", l.slot), r -= l.outerHTML.length;
      }), r > 0 && (s.default = document.createElement("slot")), s;
    }
    processMutations({ root: n, props: s }, r) {
      for (let l of r)
        if (l.type == "childList") {
          let f = this.getShadowSlots();
          Object.keys(f).length && (s.$$slots = tt(f), this.elem.$set({ $$slots: tt(f) }), this.slotcount != Object.keys(f).length && (Array.from(this.attributes).forEach((o) => s[o.name] = o.value), this.slotcount = Object.keys(f).length, n.innerHTML = "", this.elem = new t.component({ target: n, props: s })));
        }
    }
    attributeChangedCallback(n, s, r) {
      this.elem && r != s && this.elem.$set({ [n]: r });
    }
  }
  window.customElements.define(t.tagname, e);
}
function dt(t, e, i) {
  const n = t.slice();
  return n[23] = e[i], n;
}
const Jt = (t) => ({ item: t & 16 }), _t = (t) => ({ item: t[23].data });
function Vt(t) {
  let e;
  return {
    c() {
      e = rt("Missing template");
    },
    m(i, n) {
      q(i, e, n);
    },
    d(i) {
      i && E(e);
    }
  };
}
function gt(t, e) {
  let i, n, s;
  const r = e[15].default, l = Lt(r, e, e[14], _t), f = l || Vt();
  return {
    key: t,
    first: null,
    c() {
      i = j("svelte-virtual-list-row"), f && f.c(), n = Ht(), nt(i, "class", "svelte-1tqh76q"), this.first = i;
    },
    m(o, u) {
      q(o, i, u), f && f.m(i, null), X(i, n), s = !0;
    },
    p(o, u) {
      e = o, l && l.p && (!s || u & 16400) && Ct(
        l,
        r,
        e,
        e[14],
        s ? Mt(r, e[14], u, Jt) : Tt(e[14]),
        _t
      );
    },
    i(o) {
      s || (z(f, o), s = !0);
    },
    o(o) {
      R(f, o), s = !1;
    },
    d(o) {
      o && E(i), f && f.d(o);
    }
  };
}
function Gt(t) {
  let e, i, n = [], s = /* @__PURE__ */ new Map(), r, l, f, o, u = t[4];
  const w = (a) => a[23].index;
  for (let a = 0; a < u.length; a += 1) {
    let c = dt(t, u, a), d = w(c);
    s.set(d, n[a] = gt(d, c));
  }
  return {
    c() {
      e = j("svelte-virtual-list-viewport"), i = j("svelte-virtual-list-contents");
      for (let a = 0; a < n.length; a += 1)
        n[a].c();
      A(i, "padding-top", t[5] + "px"), A(i, "padding-bottom", t[6] + "px"), nt(i, "class", "svelte-1tqh76q"), A(e, "height", t[0]), nt(e, "class", "svelte-1tqh76q"), Q(() => t[18].call(e));
    },
    m(a, c) {
      q(a, e, c), X(e, i);
      for (let d = 0; d < n.length; d += 1)
        n[d].m(i, null);
      t[16](i), t[17](e), r = zt(e, t[18].bind(e)), l = !0, f || (o = et(e, "scroll", t[7]), f = !0);
    },
    p(a, [c]) {
      c & 16400 && (u = a[4], Pt(), n = Rt(n, c, w, 1, a, u, s, i, Ft, gt, null, dt), Dt()), (!l || c & 32) && A(i, "padding-top", a[5] + "px"), (!l || c & 64) && A(i, "padding-bottom", a[6] + "px"), (!l || c & 1) && A(e, "height", a[0]);
    },
    i(a) {
      if (!l) {
        for (let c = 0; c < u.length; c += 1)
          z(n[c]);
        l = !0;
      }
    },
    o(a) {
      for (let c = 0; c < n.length; c += 1)
        R(n[c]);
      l = !1;
    },
    d(a) {
      a && E(e);
      for (let c = 0; c < n.length; c += 1)
        n[c].d();
      t[16](null), t[17](null), r(), f = !1, o();
    }
  };
}
function Kt(t, e, i) {
  let { $$slots: n = {}, $$scope: s } = e, { items: r } = e, { height: l = "100%" } = e, { itemHeight: f = void 0 } = e, { start: o = 0 } = e, { end: u = 0 } = e, w = [], a, c, d, m = 0, T, S, x = 0, L = 0, b;
  async function U(h, g, v) {
    h.length < o && await _(h.length - 1, { behavior: "auto" });
    const { scrollTop: k } = c;
    await ht();
    let I = x - k, M = o;
    for (; I < g && M < h.length; ) {
      let Z = a[M - o];
      Z || (i(9, u = M + 1), await ht(), Z = a[M - o]), I += w[M] = v || Z.offsetHeight, M += 1;
    }
    i(9, u = M);
    const kt = h.length - u;
    b = (x + I) / u, i(6, L = kt * b), w.length = h.length;
  }
  async function N() {
    const { scrollTop: h } = c;
    for (let k = 0; k < a.length; k += 1)
      w[o + k] = f || a[k].offsetHeight;
    let g = 0, v = 0;
    for (; g < r.length; ) {
      const k = w[g] || b;
      if (v + k > h) {
        i(8, o = g), i(5, x = v);
        break;
      }
      v += k, g += 1;
    }
    for (; g < r.length && (v += w[g] || b, g += 1, !(v > h + m)); )
      ;
    i(9, u = g);
    const Y = r.length - u;
    for (b = v / u; g < r.length; )
      w[g++] = b;
    i(6, L = Y * b);
  }
  async function _(h, g) {
    const { scrollTop: v } = c, I = (h - o) * (f || b);
    g = {
      left: 0,
      top: v + I,
      behavior: "smooth",
      ...g
    }, c.scrollTo(g);
  }
  It(() => {
    a = d.getElementsByTagName("svelte-virtual-list-row"), i(13, S = !0);
  });
  function y(h) {
    K[h ? "unshift" : "push"](() => {
      d = h, i(3, d);
    });
  }
  function p(h) {
    K[h ? "unshift" : "push"](() => {
      c = h, i(2, c);
    });
  }
  function H() {
    m = this.offsetHeight, i(1, m);
  }
  return t.$$set = (h) => {
    "items" in h && i(10, r = h.items), "height" in h && i(0, l = h.height), "itemHeight" in h && i(11, f = h.itemHeight), "start" in h && i(8, o = h.start), "end" in h && i(9, u = h.end), "$$scope" in h && i(14, s = h.$$scope);
  }, t.$$.update = () => {
    t.$$.dirty & 1792 && i(4, T = r.slice(o, u).map((h, g) => ({ index: g + o, data: h }))), t.$$.dirty & 11266 && S && U(r, m, f);
  }, [
    l,
    m,
    c,
    d,
    T,
    x,
    L,
    N,
    o,
    u,
    r,
    f,
    _,
    S,
    s,
    n,
    y,
    p,
    H
  ];
}
class Qt extends ut {
  constructor(e) {
    super(), ct(this, e, Kt, Gt, st, {
      items: 10,
      height: 0,
      itemHeight: 11,
      start: 8,
      end: 9,
      scrollToIndex: 12
    });
  }
  get scrollToIndex() {
    return this.$$.ctx[12];
  }
}
function Xt(t) {
  let e, i = t[0].message + "", n;
  return {
    c() {
      e = j("article"), n = rt(i);
    },
    m(s, r) {
      q(s, e, r), X(e, n);
    },
    p(s, [r]) {
      r & 1 && i !== (i = s[0].message + "") && jt(n, i);
    },
    i: O,
    o: O,
    d(s) {
      s && E(e);
    }
  };
}
function Yt(t, e, i) {
  let { data: n } = e;
  return t.$$set = (s) => {
    "data" in s && i(0, n = s.data);
  }, [n];
}
class Zt extends ut {
  constructor(e) {
    super(), ct(this, e, Yt, Xt, st, { data: 0 });
  }
}
function $t(t) {
  let e, i;
  return e = new Zt({ props: { data: t[5] } }), {
    c() {
      vt(e.$$.fragment);
    },
    m(n, s) {
      lt(e, n, s), i = !0;
    },
    p(n, s) {
      const r = {};
      s & 32 && (r.data = n[5]), e.$set(r);
    },
    i(n) {
      i || (z(e.$$.fragment, n), i = !0);
    },
    o(n) {
      R(e.$$.fragment, n), i = !1;
    },
    d(n) {
      ot(e, n);
    }
  };
}
function te(t) {
  let e, i, n;
  return i = new Qt({
    props: {
      items: t[0],
      $$slots: {
        default: [
          $t,
          ({ item: s }) => ({ 5: s }),
          ({ item: s }) => s ? 32 : 0
        ]
      },
      $$scope: { ctx: t }
    }
  }), {
    c() {
      e = j("div"), vt(i.$$.fragment);
    },
    m(s, r) {
      q(s, e, r), lt(i, e, null), n = !0;
    },
    p(s, [r]) {
      const l = {};
      r & 1 && (l.items = s[0]), r & 96 && (l.$$scope = { dirty: r, ctx: s }), i.$set(l);
    },
    i(s) {
      n || (z(i.$$.fragment, s), n = !0);
    },
    o(s) {
      R(i.$$.fragment, s), n = !1;
    },
    d(s) {
      s && E(e), ot(i);
    }
  };
}
function ee(t, e, i) {
  let { url: n } = e, { server_url: s = new URL("./chat/live", new URL("/", window.location.toString())) } = e;
  const r = new URL(s);
  r.searchParams.set("url", n.toString()), r.protocol = "ws:";
  let l = [];
  return new WebSocket(r).addEventListener("message", (o) => {
    i(0, l = [...l, JSON.parse(o.data)]);
  }), t.$$set = (o) => {
    "url" in o && i(1, n = o.url), "server_url" in o && i(2, s = o.server_url);
  }, [l, n, s];
}
class ne extends ut {
  constructor(e) {
    super(), ct(this, e, ee, te, st, { url: 1, server_url: 2 });
  }
}
new Bt({
  component: ne,
  tagname: "live-chat",
  attributes: ["url", "server_url"]
});
export {
  ne as default
};
