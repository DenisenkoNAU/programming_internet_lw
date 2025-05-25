const form = document.getElementById('studentForm');
const jsonTableBody = document.querySelector('.table-json tbody');
const xmlTableBody = document.querySelector('.table-xml tbody');

let currentEditId = null;

function getFormData() {
  return {
    name: form.first_name.value,
    lastname: form.last_name.value,
    surname: form.middle_name.value,
    education: form.previous_school.value,
    faculty: form.faculty.value,
  };
}
function fillForm(item) {
  form.first_name.value = item.name;
  form.last_name.value = item.lastname;
  form.middle_name.value = item.surname;
  form.previous_school.value = item.education;
  form.faculty.value = item.faculty;

  currentEditId = item.id;
}

function fillXmlForm(record) {
  const name = record.querySelector('name')?.textContent || '';
  const lastname = record.querySelector('lastname')?.textContent || '';
  const surname = record.querySelector('surname')?.textContent || '';
  const education = record.querySelector('education')?.textContent || '';
  const faculty = record.querySelector('faculty')?.textContent || '';
  const id = record.querySelector('id')?.textContent || '';

  form.first_name.value = name;
  form.last_name.value = lastname;
  form.middle_name.value = surname;
  form.previous_school.value = education;
  form.faculty.value = faculty;

  currentEditId = id;
}

function clearForm() {
  form.reset();
  currentEditId = null;
}

async function saveData() {
  const payload = getFormData();

  if (currentEditId) {
    await fetch(`/api/json/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

  } else {
    await fetch('/api/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  }

  clearForm();
  await renderJsonTable();
}

async function saveXML() {
  const payload = getFormData();

  const xml = `
<record>
  <name>${payload.name}</name>
  <lastname>${payload.lastname}</lastname>
  <surname>${payload.surname}</surname>
  <education>${payload.education}</education>
  <faculty>${payload.faculty}</faculty>
</record>`.trim();

  if (currentEditId) {
    await fetch(`/api/xml/${currentEditId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/xml' },
      body: xml,
    });
  } else {
    await fetch('/api/xml', {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: xml,
    });
  }

  clearForm();
  await renderXmlTable();
}

async function renderJsonTable() {
  const res = await fetch('/api/json');
  const data = await res.json();

  jsonTableBody.innerHTML = '';

  data.forEach(item => {
    const row = jsonTableBody.insertRow();
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.lastname}</td>
      <td>${item.surname}</td>
      <td>${item.education}</td>
      <td>${item.faculty}</td>
      <td class="btn-wr">
        <button class="edit-btn" data-id="${item.id}">✏️</button>
        <button class="delete-btn" data-id="${item.id}">🗑️</button>
      </td>
    `;

    row.querySelector('.edit-btn').addEventListener('click', () => fillForm(item));
    row.querySelector('.delete-btn').addEventListener('click', async () => {
      await fetch(`/api/json/${item.id}`, { method: 'DELETE' });
      await renderJsonTable();
    });
  });
}

async function renderXmlTable() {
  const res = await fetch('/api/xml');
  const text = await res.text();

  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, 'application/xml');
  const records = xmlDoc.getElementsByTagName('record');

  xmlTableBody.innerHTML = '';

  for (let record of records) {
    const row = xmlTableBody.insertRow();
    const id = record.querySelector('id')?.textContent || '';

    row.innerHTML = `
      <td>${record.querySelector('name')?.textContent || ''}</td>
      <td>${record.querySelector('lastname')?.textContent || ''}</td>
      <td>${record.querySelector('surname')?.textContent || ''}</td>
      <td>${record.querySelector('education')?.textContent || ''}</td>
      <td>${record.querySelector('faculty')?.textContent || ''}</td>
      <td class="btn-wr">
        <button class="edit-btn" data-id="${id}">✏️</button>
        <button class="delete-btn" data-id="${id}">🗑️</button>
      </td>
    `;

    row.querySelector('.edit-btn').addEventListener('click', () => fillXmlForm(record));
    row.querySelector('.delete-btn').addEventListener('click', async () => {
      await fetch(`/api/xml/${id}`, { method: 'DELETE' });
      await renderXmlTable();
    });
  }
}

// Инициализация
renderJsonTable();
renderXmlTable();
