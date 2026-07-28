/* ===========================================================
   BASIL — manager dashboard mockup
   Static only. No backend, no persistence.

   Tom: the data shapes below are the point of this file.
   MENU[].allergens is a 14-key map of three-state enums, never
   booleans, and every key defaults to UNVERIFIED. Anything that
   flattens that to true/false loses the difference between
   "confirmed safe" and "nobody has checked", which is the
   distinction the whole safety module is built on.
   =========================================================== */

/* The EU 14. Order matters — it is the order on every allergen sheet
   a kitchen already uses, so it is the order managers expect. */
const ALLERGENS = [
  { key: 'gluten',      name: 'Cereals containing gluten' },
  { key: 'crustaceans', name: 'Crustaceans' },
  { key: 'eggs',        name: 'Eggs' },
  { key: 'fish',        name: 'Fish' },
  { key: 'peanuts',     name: 'Peanuts' },
  { key: 'soya',        name: 'Soybeans' },
  { key: 'milk',        name: 'Milk' },
  { key: 'nuts',        name: 'Tree nuts' },
  { key: 'celery',      name: 'Celery' },
  { key: 'mustard',     name: 'Mustard' },
  { key: 'sesame',      name: 'Sesame' },
  { key: 'sulphites',   name: 'Sulphur dioxide / sulphites' },
  { key: 'lupin',       name: 'Lupin' },
  { key: 'molluscs',    name: 'Molluscs' }
];

const STATES = ['CONTAINS', 'FREE_FROM', 'UNVERIFIED'];
const STATE_CLASS = { CONTAINS: 'contains', FREE_FROM: 'freefrom', UNVERIFIED: 'unverified' };
const STATE_SHORT = { CONTAINS: 'Has', FREE_FROM: 'Free', UNVERIFIED: 'Unverified' };

/* Build a full allergen map, defaulting every key to UNVERIFIED,
   then overriding only what the manager has actually confirmed.
   This is deliberately the only way a map gets created. */
function allergenMap(overrides) {
  const map = {};
  ALLERGENS.forEach(a => { map[a.key] = 'UNVERIFIED'; });
  return Object.assign(map, overrides || {});
}

const MENU = [
  {
    id: 'bruschetta', section: 'Antipasti', name: 'Bruschetta al Pomodoro',
    desc: 'San Marzano tomato, garlic, basil, sourdough', price: '£5.49',
    modifiable: true,
    hidden: '',
    allergens: allergenMap({
      gluten: 'CONTAINS', crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM',
      peanuts: 'FREE_FROM', soya: 'FREE_FROM', milk: 'FREE_FROM', nuts: 'FREE_FROM',
      celery: 'FREE_FROM', mustard: 'FREE_FROM', sesame: 'FREE_FROM',
      lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free sourdough available, 24h notice' }
  },
  {
    id: 'arancini', section: 'Antipasti', name: 'Arancini di Ragù',
    desc: 'Fried risotto balls, beef ragù, mozzarella, basil aioli', price: '£6.49',
    modifiable: false,
    hidden: 'Fried in the shared fryer with the calamari.',
    allergens: allergenMap({
      gluten: 'CONTAINS', eggs: 'CONTAINS', milk: 'CONTAINS', celery: 'CONTAINS',
      crustaceans: 'UNVERIFIED', fish: 'UNVERIFIED',
      peanuts: 'FREE_FROM', soya: 'FREE_FROM', nuts: 'FREE_FROM',
      mustard: 'FREE_FROM', sesame: 'FREE_FROM', sulphites: 'FREE_FROM',
      lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: {}
  },
  {
    id: 'margherita', section: 'Pizza', name: 'Margherita Classic',
    desc: 'San Marzano tomato, fresh mozzarella, basil, olive oil', price: '£15.49',
    modifiable: true,
    hidden: '',
    allergens: allergenMap({
      gluten: 'CONTAINS', milk: 'CONTAINS',
      crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      soya: 'FREE_FROM', nuts: 'FREE_FROM', celery: 'FREE_FROM', mustard: 'FREE_FROM',
      sesame: 'FREE_FROM', sulphites: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free base, +£2.50', milk: 'Vegan mozzarella available' }
  },
  {
    id: 'special-house', section: 'Pizza', name: 'Special House',
    desc: 'San Marzano tomato, mozzarella, arugula, red onions, garlic oil', price: '£15.99',
    modifiable: true,
    hidden: '',
    allergens: allergenMap({
      gluten: 'CONTAINS', milk: 'CONTAINS',
      crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      soya: 'FREE_FROM', nuts: 'FREE_FROM', celery: 'FREE_FROM', mustard: 'FREE_FROM',
      sesame: 'FREE_FROM', sulphites: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free base, +£2.50', milk: 'Vegan mozzarella available' }
  },
  {
    id: 'pepperoni', section: 'Pizza', name: 'Pepperoni',
    desc: 'Tomato, mozzarella, spicy pepperoni, Calabrian chili honey', price: '£16.49',
    modifiable: true,
    hidden: '',
    allergens: allergenMap({
      gluten: 'CONTAINS', milk: 'CONTAINS', mustard: 'CONTAINS',
      crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      soya: 'FREE_FROM', nuts: 'FREE_FROM', celery: 'FREE_FROM',
      sesame: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free base, +£2.50' }
  },
  {
    id: 'ortolana', section: 'Pizza', name: 'Ortolana',
    desc: 'Tomato, roasted vegetables, vegan feta, olives, balsamic glaze', price: '£15.99',
    modifiable: true,
    hidden: 'Changed to vegan feta on 24 Jul — do not describe as vegetarian, it is now vegan.',
    allergens: allergenMap({
      gluten: 'CONTAINS', sulphites: 'CONTAINS',
      milk: 'UNVERIFIED', soya: 'UNVERIFIED', nuts: 'UNVERIFIED',
      crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      celery: 'FREE_FROM', mustard: 'FREE_FROM', sesame: 'FREE_FROM',
      lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free base, +£2.50' }
  },
  {
    id: 'funghi', section: 'Pizza', name: 'Funghi e Tartufo',
    desc: 'White sauce, shiitake and oyster mushrooms, thyme, truffle oil', price: '£17.99',
    modifiable: true,
    hidden: 'The white sauce is a béchamel base — confirm with the pass before telling any guest it is dairy free.',
    allergens: allergenMap({
      gluten: 'CONTAINS',
      milk: 'UNVERIFIED',
      crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      soya: 'FREE_FROM', nuts: 'FREE_FROM', celery: 'FREE_FROM', mustard: 'FREE_FROM',
      sesame: 'FREE_FROM', sulphites: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { gluten: 'Gluten-free base, +£2.50' }
  },
  {
    id: 'tiramisu', section: 'Dolci', name: 'Tiramisù',
    desc: 'Mascarpone, espresso, savoiardi, cocoa', price: '£6.49',
    modifiable: false,
    hidden: '',
    allergens: allergenMap({
      gluten: 'CONTAINS', eggs: 'CONTAINS', milk: 'CONTAINS',
      soya: 'UNVERIFIED', nuts: 'UNVERIFIED',
      crustaceans: 'FREE_FROM', fish: 'FREE_FROM', peanuts: 'FREE_FROM',
      celery: 'FREE_FROM', mustard: 'FREE_FROM', sesame: 'FREE_FROM',
      sulphites: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: {}
  },
  {
    id: 'panna', section: 'Dolci', name: 'Panna Cotta',
    desc: 'Vanilla cream, seasonal fruit, pistachio crumb', price: '£5.99',
    modifiable: true,
    hidden: '',
    allergens: allergenMap({
      milk: 'CONTAINS', nuts: 'CONTAINS',
      gluten: 'FREE_FROM', crustaceans: 'FREE_FROM', eggs: 'FREE_FROM', fish: 'FREE_FROM',
      peanuts: 'FREE_FROM', soya: 'FREE_FROM', celery: 'FREE_FROM', mustard: 'FREE_FROM',
      sesame: 'FREE_FROM', lupin: 'FREE_FROM', molluscs: 'FREE_FROM'
    }),
    notes: { nuts: 'Can be served without the pistachio crumb' }
  }
];

const STAFF = [
  { name: 'Ana Ferreira',      role: 'Server',      tiers: [3, 3, 2, 0], last: 'Today' },
  { name: 'Bikash Thapa',      role: 'Server',      tiers: [3, 2, 2, 0], last: 'Today' },
  { name: 'Oleksii Marchenko', role: 'Server',      tiers: [2, 2, 1, 0], last: 'Yesterday' },
  { name: 'Sofia Ramos',       role: 'Server',      tiers: [2, 1, 1, 0], last: '3 days ago' },
  { name: 'Tiago Nunes',       role: 'Runner',      tiers: [1, 1, 0, 0], last: '6 days ago' },
  { name: 'Marta Silva',       role: 'Supervisor',  tiers: [3, 3, 3, 0], last: 'Today' },
  { name: 'Joana Pires',       role: 'Host',        tiers: [2, 1, 0, 0], last: '2 days ago' }
];

/* ---------- Menu table ---------- */
function summarise(item) {
  let has = 0, free = 0, unv = 0;
  ALLERGENS.forEach(a => {
    const s = item.allergens[a.key];
    if (s === 'CONTAINS') has++;
    else if (s === 'FREE_FROM') free++;
    else unv++;
  });
  let out = '';
  if (has) out += '<span class="chip-allergen contains">' + has + ' contains</span> ';
  if (unv) out += '<span class="chip-allergen unverified">' + unv + ' unverified</span> ';
  if (!unv && free) out += '<span class="chip-allergen freefrom">confirmed</span>';
  return out;
}

function renderMenu() {
  const body = document.getElementById('menuBody');
  const term = (document.getElementById('menuSearch').value || '').toLowerCase();
  const section = document.getElementById('sectionFilter').value;
  body.innerHTML = '';

  MENU.filter(i =>
    (!term || i.name.toLowerCase().includes(term) || i.desc.toLowerCase().includes(term)) &&
    (!section || i.section === section)
  ).forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'expandable';
    tr.dataset.item = item.id;
    tr.innerHTML =
      '<td><div class="dish-name">' + item.name + '</div><div class="dish-desc">' + item.desc + '</div></td>' +
      '<td>' + item.section + '</td>' +
      '<td>' + item.price + '</td>' +
      '<td>' + summarise(item) + '</td>' +
      '<td>' + (item.modifiable
        ? '<span class="chip-status done">Yes</span>'
        : '<span class="chip-status not">No</span>') + '</td>' +
      '<td class="text-end"><i class="bi bi-chevron-down"></i></td>';
    tr.addEventListener('click', () => toggleMatrix(item, tr));
    body.appendChild(tr);
  });
}

function toggleMatrix(item, row) {
  const open = document.querySelector('tr.matrix-row');
  const wasThis = open && open.dataset.for === item.id;
  if (open) open.remove();
  if (wasThis) return;

  const tr = document.createElement('tr');
  tr.className = 'matrix-row';
  tr.dataset.for = item.id;

  let grid = '';
  ALLERGENS.forEach(a => {
    const state = item.allergens[a.key];
    const note = item.notes[a.key] || '';
    let tri = '<div class="tri">';
    STATES.forEach(s => {
      tri += '<button class="' + STATE_CLASS[s] + (s === state ? ' on' : '') +
             '" data-item="' + item.id + '" data-key="' + a.key + '" data-state="' + s + '">' +
             STATE_SHORT[s] + '</button>';
    });
    tri += '</div>';

    grid +=
      '<div class="allergen-row stacked">' +
        '<span class="allergen-name">' + a.name + '</span>' + tri +
        (state !== 'CONTAINS' && !note ? '' :
          '<input class="modify-note" placeholder="How can this dish be adapted?" value="' +
          note.replace(/"/g, '&quot;') + '">') +
      '</div>';
  });

  tr.innerHTML =
    '<td colspan="6" class="p-0"><div class="matrix-wrap">' +

      '<div class="matrix-title">Allergens — ' + item.name + '</div>' +
      '<div class="allergen-grid">' + grid + '</div>' +

      '<div class="mt-4">' +
        '<label class="form-label">What staff need to know that the menu does not say</label>' +
        '<textarea class="form-control" rows="2" placeholder="Shared fryer, hidden ingredients, prep that changes on a Sunday — anything a guest might ask about.">' +
        (item.hidden || '') + '</textarea>' +
        '<div class="help">These are the questions that catch servers out, so they carry the most weight in the quiz.</div>' +
      '</div>' +

      '<div class="decision" id="d-notes">' +
        '<div class="decision-head"><span class="decision-tag">Decision 7</span> Where do adaptation notes live?</div>' +
        '<div class="decision-body">' +
          '<div class="form-check"><input class="form-check-input" type="radio" name="noteScope" id="ns1" checked>' +
            '<label class="form-check-label" for="ns1"><strong>One note per allergen</strong> — as drawn above ' +
            '<span class="rec">Recommended — matches the spec</span></label></div>' +
          '<div class="form-check"><input class="form-check-input" type="radio" name="noteScope" id="ns2">' +
            '<label class="form-check-label" for="ns2"><strong>One note per dish</strong> — a single free-text box</label></div>' +
          '<div class="decision-why">Per allergen, because the answer genuinely differs. This pizza can lose the gluten for £2.50 and lose the dairy for nothing, ' +
          'and a server who has read one combined note has to work out which half applies to the guest in front of them. ' +
          'One note per dish is less to fill in once and worse every night after that.</div>' +
        '</div>' +
      '</div>' +

    '</div></td>';

  row.after(tr);

  tr.querySelectorAll('.tri button').forEach(b => {
    b.addEventListener('click', e => {
      e.stopPropagation();
      const it = MENU.find(m => m.id === b.dataset.item);
      it.allergens[b.dataset.key] = b.dataset.state;
      b.parentElement.querySelectorAll('button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      const summaryCell = row.children[3];
      summaryCell.innerHTML = summarise(it);
    });
  });

  tr.querySelectorAll('input, textarea, .decision').forEach(el => {
    el.addEventListener('click', e => e.stopPropagation());
  });
}

/* ---------- Staff table ---------- */
function tierPill(t) {
  if (!t) return '<span class="tier-pill locked">Locked</span>';
  return '<span class="tier-pill t' + t + '">Tier ' + t + '</span>';
}

function renderStaff() {
  const body = document.getElementById('staffBody');
  body.innerHTML = '';
  STAFF.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML =
      '<td class="dish-name">' + s.name + '</td>' +
      '<td>' + s.role + '</td>' +
      s.tiers.map(t => '<td>' + tierPill(t) + '</td>').join('') +
      '<td>' + s.last + '</td>';
    body.appendChild(tr);
  });
}

/* ---------- Navigation ---------- */
const TITLES = {
  venue: 'Venue', menu: 'Menu', safety: 'Safety & escalation',
  authority: 'Service authority', payment: 'Payment policy',
  staff: 'Staff', brief: 'The Brief', reports: 'Reports', account: 'Plan & users'
};

function go(id) {
  if (!TITLES[id]) id = 'venue';
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById('view-' + id).classList.add('active');
  document.querySelectorAll('.side-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + id);
  });
  document.getElementById('topbarTitle').textContent = TITLES[id];
  document.body.classList.remove('nav-open');
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', () => go(location.hash.slice(1)));

/* ---------- Toasts ---------- */
function toast(msg) {
  const host = document.getElementById('toastHost');
  const el = document.createElement('div');
  el.className = 'toast-b';
  el.textContent = msg;
  host.appendChild(el);
  setTimeout(() => el.remove(), 3600);
}

/* ---------- Wiring ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  renderStaff();
  go(location.hash.slice(1) || 'venue');

  document.getElementById('menuSearch').addEventListener('input', renderMenu);
  document.getElementById('sectionFilter').addEventListener('change', renderMenu);

  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  document.getElementById('sidebarBackdrop').addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });

  document.getElementById('notesToggle').addEventListener('change', e => {
    document.body.classList.toggle('show-notes', e.target.checked);
    toast(e.target.checked
      ? 'Build notes on — the dark panels are for Tom, not for a client.'
      : 'Build notes off.');
  });

  document.getElementById('venueSelect').addEventListener('change', e => {
    toast('Switched to ' + e.target.value + '. Each venue has its own menu, staff and policy.');
  });

  // Chip toggles
  document.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (chip) chip.classList.toggle('active');
  });

  // Anything not built in this mockup explains itself
  document.querySelectorAll('[data-toast]').forEach(b => {
    b.addEventListener('click', () => toast(b.dataset.toast));
  });
  document.querySelectorAll('[data-nav]').forEach(b => {
    b.addEventListener('click', () => { location.hash = '#' + b.dataset.nav; });
  });

  // Decision index jumps to the flag and flashes it
  document.querySelectorAll('#decisionIndex li').forEach((li, i) => {
    li.addEventListener('click', () => {
      const panel = bootstrap.Offcanvas.getInstance(document.getElementById('decisionsPanel'));
      if (panel) panel.hide();
      location.hash = '#' + li.dataset.target;
      setTimeout(() => {
        if (li.dataset.target === 'menu') {
          const first = document.querySelector('#menuBody tr.expandable');
          if (first && !document.querySelector('tr.matrix-row')) first.click();
        }
        document.querySelectorAll('.decision').forEach(f => f.classList.remove('flash'));
        const target = document.getElementById(li.dataset.flag);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          target.classList.add('flash');
        }
      }, 260);
    });
  });
});
