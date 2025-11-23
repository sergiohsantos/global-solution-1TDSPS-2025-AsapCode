
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const ans = q.parentElement.querySelector('.faq-a');
      if(!ans) return;
      ans.classList.toggle('open');
    });
  });
});
