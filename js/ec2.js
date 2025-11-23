// ==========================================================
// Carrega tabela de EC2 consultando backend FastAPI (GET)
// ==========================================================
// Carrega dados de EC2 previamente provisionados do backend.
async function asapcodeLoadEC2(){
  const ids = JSON.parse(localStorage.getItem('asapcode_requests')||'[]');
  const tbody = document.querySelector('#ec2Table tbody');
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

// ==========================================================
// Provisiona EC2 via backend (POST)
// Adicionada validação HTML5 NATIVA antes de tudo
// ==========================================================
// Envia uma requisição ao backend para provisionar uma nova instância EC2.
async function asapcodeProvisionEC2(){

  // ---------- VALIDAÇÃO HTML5 (NÃO ALTERA SUA LÓGICA) ----------
  const form = document.querySelector('#ec2Modal form');
  if (!form.checkValidity()) {
      form.reportValidity();  // tooltip HTML5: “Preencha este campo”
      return;                 // interrompe antes da provisão
  }
  // --------------------------------------------------------------

  // ---------- SE CHEGOU AQUI → É O SEU CÓDIGO ORIGINAL ----------
  const name = document.getElementById('ec2_name').value;
  const region = document.getElementById('ec2_region').value;
  const ami = document.getElementById('ec2_ami').value;
  const type = document.getElementById('ec2_type').value;
  const vpc = document.getElementById('ec2_vpc').value;
  const subnet = document.getElementById('ec2_subnet').value;
  const sgs = document.getElementById('ec2_sg').value.split(',').map(s=>s.trim()).filter(Boolean);
  const userData = document.getElementById('ec2_user_data')
    ? document.getElementById('ec2_user_data').value.trim()
    : '';

  const payload = {
    name,
    region,
    ami_id: ami,
    instance_type: type,
    vpc_id: vpc,
    subnet_id: subnet,
    security_group_ids: sgs,
    key_name: null,
    user_data: userData || null
  };

  try{
    const resp = await fetch('http://localhost:8000/api/provision/ec2', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    });

    const data = await resp.json();

    let ids = JSON.parse(localStorage.getItem('asapcode_requests')||'[]');
    ids.push(data.request_id);
    localStorage.setItem('asapcode_requests', JSON.stringify(ids));

    closeEc2Modal();
    asapcodeLoadEC2();

  }catch(e){
    console.error(e);
    alert('Erro ao provisionar EC2 (ver console).');
  }
}

// ==========================================================
// Abre modal
// ==========================================================
// Abre o modal de criação de EC2.
function openEc2Modal(){
  const el = document.getElementById('ec2Modal');
  if(el) el.classList.add('open');
}

// ==========================================================
// Fecha modal
// ==========================================================
// Fecha o modal de criação de EC2.
function closeEc2Modal(){
  const el = document.getElementById('ec2Modal');
  if(el) el.classList.remove('open');
}

// ==========================================================
// Carrega tabela ao iniciar
// ==========================================================
document.addEventListener('DOMContentLoaded', asapcodeLoadEC2);
