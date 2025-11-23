async function asapcodeLoadDashboard(){
  const tbody = document.getElementById('resourceTableBody');
  const totalEl = document.getElementById('metricTotal');
  const ec2El = document.getElementById('metricEc2');
  const mockEl = document.getElementById('metricMock');
  if(!tbody) return;

  tbody.innerHTML = '<tr><td colspan="6">Carregando recursos...</td></tr>';

  const rows = [];

  /* ============================================================
     1) EC2 reais via backend FastAPI
     ============================================================ */
  try{
    const ids = JSON.parse(localStorage.getItem('asapcode_requests') || '[]');

    for (const id of ids) {
      try {
        const res = await fetch(`http://localhost:8000/api/status/${id}`);
        if (!res.ok) continue;

        const r = await res.json();

        rows.push({
          type: 'EC2',
          name: r.instance_name || r.instance_id || ('ec2-' + (r.request_id || '').slice(-6)),
          ip: r.public_ip || r.public_dns || '-',
          status: r.status || 'queued',
          request_id: r.request_id || id,
          source: 'Backend FastAPI'
        });
      } catch (e) {
        console.error('Erro ao carregar EC2 no dashboard', e);
      }
    }

  } catch (e) {
    console.error('Erro geral ao carregar EC2 no dashboard', e);
  }

  /* ============================================================
     2) Recursos mockados persistidos via localStorage
     (agora é A ÚNICA FONTE de mocks)
     ============================================================ */
  try {
    if (typeof asapcodeLoadMockResources === 'function') {
      const persisted = asapcodeLoadMockResources();

      for (const item of persisted) {
        rows.push({
          type: item.type || 'MOCK',
          name: item.name || '-',
          ip: item.ip || '-',
          status: item.status || 'running',
          request_id: item.request_id || '-',
          source: item.source || 'Catálogo mockado'
        });
      }
    }
  } catch (e) {
    console.error('Erro ao carregar recursos mockados persistidos', e);
  }

  /* ============================================================
     Ordenação (alfabética por tipo + nome)
     ============================================================ */
  rows.sort((a, b) => {
    if (a.type === b.type) {
      return (a.name || '').localeCompare(b.name || '');
    }
    return (a.type || '').localeCompare(b.type || '');
  });

  /* ============================================================
     Métricas
     ============================================================ */
  const total = rows.length;
  const ec2Count = rows.filter(r => r.type === 'EC2').length;
  const mockCount = total - ec2Count;

  if (totalEl) totalEl.textContent = total;
  if (ec2El) ec2El.textContent = ec2Count;
  if (mockEl) mockEl.textContent = mockCount;

  /* ============================================================
     Renderiza tabela
     ============================================================ */
  if (rows.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6">Nenhum recurso encontrado. Provisione uma EC2 ou crie recursos mockados.</td></tr>';
    return;
  }

  tbody.innerHTML = '';
  for (const r of rows) {
    const statusClass = (r.status || '').toLowerCase();
    tbody.innerHTML += `
      <tr>
        <td>${r.type}</td>
        <td>${r.name}</td>
        <td>${r.ip}</td>
        <td><span class="status-pill status-${statusClass}">${r.status}</span></td>
        <td>${r.request_id}</td>
        <td>${r.source}</td>
      </tr>
    `;
  }
}

document.addEventListener('DOMContentLoaded', asapcodeLoadDashboard);
