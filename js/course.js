// Course List Array
const courses = [
  { code: 'WDD 130', name: 'Web Fundamentals', credits: 2, completed: true, type: 'WDD' },
  { code: 'WDD 131', name: 'Dynamic Web Fundamentals', credits: 2, completed: true, type: 'WDD' },
  { code: 'WDD 231', name: 'Web Frontend Development I', credits: 2, completed: false, type: 'WDD' },
  { code: 'CSE 110', name: 'Introduction to Programming', credits: 2, completed: true, type: 'CSE' },
  { code: 'CSE 111', name: 'Programming with Functions', credits: 3, completed: true, type: 'CSE' },
  { code: 'CSE 210', name: 'Programming with Classes', credits: 4, completed: false, type: 'CSE' },
  { code: 'CSE 222', name: 'Data Structures', credits: 3, completed: false, type: 'CSE' }
];

function renderCourses(filter = 'ALL') {
  const container = document.getElementById('courseCards');
  let filtered = courses;
  if (filter === 'WDD') filtered = courses.filter(c => c.type === 'WDD');
  if (filter === 'CSE') filtered = courses.filter(c => c.type === 'CSE');
  container.innerHTML = '';
  let totalCredits = 0;
  filtered.forEach(course => {
    totalCredits += course.credits;
    const card = document.createElement('div');
    card.className = `course-card ${course.completed ? 'completed' : 'not-completed'}`;
    card.innerHTML = `<strong>${course.code}</strong>: ${course.name}<br>Credits: ${course.credits}`;
    if (course.completed) card.innerHTML += '<span style="float:right;color:green;font-weight:bold;">✔ Completed</span>';
    container.appendChild(card);
  });
  document.getElementById('creditTotal').textContent = `Total Credits: ${totalCredits}`;
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  document.getElementById('allBtn').onclick = () => renderCourses('ALL');
  document.getElementById('wddBtn').onclick = () => renderCourses('WDD');
  document.getElementById('cseBtn').onclick = () => renderCourses('CSE');
});
