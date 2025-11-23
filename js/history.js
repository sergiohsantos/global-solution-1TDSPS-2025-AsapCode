
async function asapcodeLoadHistory(){
  const ids = JSON.parse(localStorage.getItem('asapcode_requests')||'[]');
  const tbody = document.querySelector('#historyTable tbody');
  if(!tbody) return;
  tbody.innerHTML = '';
  for(const id of ids){
    try{
      const res = await fetch(`http://localhost:8000/api/status/${id}`);
      if(!res.ok) continue;
      const r = await res.json();
      tbody.innerHTML += `
        <tr>
          <td>${r.request_id}</td>
          <td><span class="status-pill status-${r.status}">${r.status}</span></td>
          <td>${r.instance_id || '-'}</td>
          <td>${r.public_ip || '-'}</td>
          <td>${r.updated_at || '-'}</td>
        </tr>
      `;
    }catch(e){
      console.error(e);
    }
  }
}
document.addEventListener('DOMContentLoaded', asapcodeLoadHistory);
