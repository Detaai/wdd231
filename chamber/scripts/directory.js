// Fetch and display members as grid or list
async function fetchMembers() {
  const res = await fetch('data/members.json');
  const members = await res.json();
  return members;
}

function createMemberCard(member) {
  const div = document.createElement('div');
  div.className = 'course-card';
  if (member.membership === 2) div.classList.add('silver');
  if (member.membership === 3) div.classList.add('gold');
  div.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo">
    <h3>${member.name}</h3>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <a href="${member.website}" target="_blank">Website</a>
    <p>${member.info}</p>
    <span>Level: ${['Member','Silver','Gold'][member.membership-1]}</span>
  `;
  return div;
}

function createMemberListItem(member) {
  const div = document.createElement('div');
  div.className = 'course-card';
  if (member.membership === 2) div.classList.add('silver');
  if (member.membership === 3) div.classList.add('gold');
  div.style.flexDirection = 'row';
  div.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo">
    <div style="flex:1;text-align:left;">
      <h3>${member.name}</h3>
      <p>${member.address} | ${member.phone}</p>
      <a href="${member.website}" target="_blank">Website</a>
      <p>${member.info}</p>
      <span>Level: ${['Member','Silver','Gold'][member.membership-1]}</span>
    </div>
  `;
  return div;
}

async function renderDirectory(view = 'grid') {
  const members = await fetchMembers();
  const container = document.getElementById('members');
  container.innerHTML = '';
  members.forEach(member => {
    const card = view === 'grid' ? createMemberCard(member) : createMemberListItem(member);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderDirectory('grid');
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  function setActive(view) {
    if (view === 'grid') {
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
    } else {
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
    }
  }
  gridBtn.onclick = function() {
    setActive('grid');
    renderDirectory('grid');
  };
  listBtn.onclick = function() {
    setActive('list');
    renderDirectory('list');
  };
  setActive('grid');
  // Footer JS
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});
