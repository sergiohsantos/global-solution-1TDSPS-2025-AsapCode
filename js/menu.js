
function toggleMenu(){
  const sb = document.getElementById('sidebar');
  if(!sb) return;
  sb.classList.toggle('open');
}


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sidebar-section-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.parentElement;
      section.classList.toggle('open');
    });
  });
});
