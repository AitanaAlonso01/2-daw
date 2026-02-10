const app = {
  user: null,
  currentDate: new Date(),
  selectedKey: null,

  login() {
    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value
    if (email === 'admin@system.com' && pass === '1234') {
      this.user = email
      document.getElementById('login-screen').classList.add('hidden')
      document.getElementById('app').classList.remove('hidden')
      this.render()
    } else {
      alert('Credenciales incorrectas')
    }
  },

  render() {
    const grid = document.getElementById('calendar-grid')
    grid.innerHTML = ''
    const y = this.currentDate.getFullYear()
    const m = this.currentDate.getMonth()

    document.getElementById('month-display').innerText =
      new Intl.DateTimeFormat('es-ES', {
        month: 'long',
        year: 'numeric',
      }).format(this.currentDate)

    const firstDay = new Date(y, m, 1).getDay()
    const daysInMonth = new Date(y, m + 1, 0).getDate()

    for (let i = 0; i < firstDay; i++)
      grid.appendChild(document.createElement('div'))

    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${y}-${m}-${d}`
      const div = document.createElement('div')
      div.className = `day ${this.hasEvents(key) ? 'has-event' : ''} ${this.selectedKey === key ? 'active' : ''}`
      div.innerHTML = `<strong>${d}</strong>`
      div.onclick = () => this.selectDay(d, key)
      grid.appendChild(div)
    }
  },

  saveEvent() {
    const name = document.getElementById('ev-name').value
    const time = document.getElementById('ev-time').value
    const editId = document.getElementById('edit-id').value
    if (!this.selectedKey || !name || !time) return

    let data = JSON.parse(localStorage.getItem(this.user) || '{}')
    if (!data[this.selectedKey]) data[this.selectedKey] = []

    if (editId) {
      // Modificar
      const idx = data[this.selectedKey].findIndex(e => e.id == editId)
      data[this.selectedKey][idx] = { id: Number(editId), name, time }
    } else {
      // Añadir
      data[this.selectedKey].push({ id: Date.now(), name, time })
    }

    localStorage.setItem(this.user, JSON.stringify(data))
    this.clearForm()
    this.showEvents()
    this.render()
  },

  deleteEvent(id) {
    let data = JSON.parse(localStorage.getItem(this.user))
    data[this.selectedKey] = data[this.selectedKey].filter(e => e.id !== id)
    localStorage.setItem(this.user, JSON.stringify(data))
    this.showEvents()
    this.render()
  },

  editEvent(id, name, time) {
    document.getElementById('ev-name').value = name
    document.getElementById('ev-time').value = time
    document.getElementById('edit-id').value = id
    document.getElementById('cancel-btn').classList.remove('hidden')
  },

  searchDate() {
    const val = document.getElementById('search-date').value
    if (val) {
      this.currentDate = new Date(val)
      const d = this.currentDate.getDate()
      this.selectedKey = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}-${d}`
      this.render()
      this.showEvents()
    }
  },

  // Métodos auxiliares
  selectDay(d, key) {
    this.selectedKey = key
    document.getElementById('selected-title').innerText = `Día ${d}`
    this.render()
    this.showEvents()
  },
  showEvents() {
    const list = document.getElementById('event-list')
    list.innerHTML = ''
    const events =
      JSON.parse(localStorage.getItem(this.user) || '{}')[this.selectedKey] ||
      []
    events
      .sort((a, b) => a.time.localeCompare(b.time))
      .forEach(ev => {
        const div = document.createElement('div')
        div.className = 'event-item'
        div.innerHTML = `<span>${ev.time} - ${ev.name}</span>
                <div>
                    <button onclick="app.editEvent(${ev.id}, '${ev.name}', '${ev.time}')">✎</button>
                    <button onclick="app.deleteEvent(${ev.id})">🗑</button>
                </div>`
        list.appendChild(div)
      })
  },
  hasEvents(key) {
    return !!JSON.parse(localStorage.getItem(this.user) || '{}')[key]?.length
  },
  clearForm() {
    document.getElementById('ev-name').value = ''
    document.getElementById('ev-time').value = ''
    document.getElementById('edit-id').value = ''
    document.getElementById('cancel-btn').classList.add('hidden')
  },
  changeMonth(step) {
    this.currentDate.setMonth(this.currentDate.getMonth() + step)
    this.render()
  },
}
