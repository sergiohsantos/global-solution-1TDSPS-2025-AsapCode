const ASAPCODE_MOCK_KEY = 'asapcode_mock_resources';

function asapcodeLoadMockResources(){
  try{
    const raw = localStorage.getItem(ASAPCODE_MOCK_KEY);
    if(!raw) return [];
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  }catch(e){
    console.error('Erro ao carregar recursos mockados do localStorage', e);
    return [];
  }
}

function asapcodeSaveMockResources(list){
  try{
    localStorage.setItem(ASAPCODE_MOCK_KEY, JSON.stringify(list));
  }catch(e){
    console.error('Erro ao salvar recursos mockados no localStorage', e);
  }
}

function asapcodeAddMockResource(resource){
  const list = asapcodeLoadMockResources();
  list.push({
    ...resource,
    created_at: resource.created_at || new Date().toISOString()
  });
  asapcodeSaveMockResources(list);
}

function asapcodeGenerateRequestId(prefix){
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${ts}-${rand}`;
}

function asapcodeShowMessage(elementId, message, isError){
  const el = document.getElementById(elementId);
  if(!el){
    alert(message);
    return;
  }
  el.textContent = message;
  el.style.color = isError ? '#f97373' : '#4ade80';
}

/* EKS */

function asapcodeCreateEks(){
  const name = document.getElementById('eksName').value.trim();
  const region = document.getElementById('eksRegion').value.trim();
  const env = document.getElementById('eksEnv').value.trim();
  const version = document.getElementById('eksVersion').value.trim();
  const nodeType = document.getElementById('eksNodeType').value.trim();
  const nodes = document.getElementById('eksNodes').value.trim();
  const cidr = document.getElementById('eksCidr').value.trim();

  if(!name){
    asapcodeShowMessage('eksMessage','Informe o nome do cluster.',true);
    return;
  }
  const requestId = asapcodeGenerateRequestId('eks');
  const ip = `10.${Math.floor(Math.random()*200)+10}.${Math.floor(Math.random()*200)+10}.10`;

  const resource = {
    type: 'EKS',
    name,
    ip,
    status: 'running',
    request_id: requestId,
    source: 'Catálogo mockado',
    region: region || 'us-east-1',
    env: env || 'dev',
    kubernetes_version: version || '1.29',
    node_group_type: nodeType || 'managed',
    nodes: parseInt(nodes||'3',10),
    cidr: cidr || '10.0.0.0/16'
  };

  asapcodeAddMockResource(resource);
  asapcodeShowMessage('eksMessage',`Cluster EKS mockado criado com Request ID ${requestId}. Abra o Dashboard para visualizar.`,false);
}

/* S3 */

function asapcodeCreateS3(){
  const name = document.getElementById('s3Name').value.trim();
  const region = document.getElementById('s3Region').value.trim();
  const bucketType = document.getElementById('s3Type').value.trim();
  const versioning = document.getElementById('s3Versioning').checked;
  const encryption = document.getElementById('s3Encryption').value.trim();

  if(!name){
    asapcodeShowMessage('s3Message','Informe o nome do bucket.',true);
    return;
  }
  const requestId = asapcodeGenerateRequestId('s3');
  const endpoint = `s3://${name}`;

  const resource = {
    type: 'S3',
    name,
    ip: endpoint,
    status: 'running',
    request_id: requestId,
    source: 'Catálogo mockado',
    region: region || 'us-east-1',
    bucket_type: bucketType || 'padrao',
    versioning: versioning,
    encryption: encryption || 'none'
  };

  asapcodeAddMockResource(resource);
  asapcodeShowMessage('s3Message',`Bucket S3 mockado criado com Request ID ${requestId}. Abra o Dashboard para visualizar.`,false);
}

/* IAM */

function asapcodeCreateIam(){
  const name = document.getElementById('iamName').value.trim();
  const kind = document.getElementById('iamType').value.trim();
  const principal = document.getElementById('iamPrincipal').value.trim();
  const policy = document.getElementById('iamPolicy').value.trim();

  if(!name){
    asapcodeShowMessage('iamMessage','Informe o nome da role/policy.',true);
    return;
  }
  const requestId = asapcodeGenerateRequestId('iam');

  const resource = {
    type: 'IAM',
    name,
    ip: '-',
    status: 'running',
    request_id: requestId,
    source: 'Catálogo mockado',
    iam_kind: kind || 'role',
    principal: principal || 'ec2.amazonaws.com',
    policy_preview: policy ? policy.slice(0,200) : ''
  };

  asapcodeAddMockResource(resource);
  asapcodeShowMessage('iamMessage',`Recurso IAM mockado criado com Request ID ${requestId}. Abra o Dashboard para visualizar.`,false);
}

/* RDS */

function asapcodeCreateRds(){
  const name = document.getElementById('rdsName').value.trim();
  const engine = document.getElementById('rdsEngine').value.trim();
  const instanceClass = document.getElementById('rdsClass').value.trim();
  const storage = document.getElementById('rdsStorage').value.trim();
  const multiAz = document.getElementById('rdsMultiAz').checked;
  const env = document.getElementById('rdsEnv').value.trim();
  const region = document.getElementById('rdsRegion').value.trim();

  if(!name){
    asapcodeShowMessage('rdsMessage','Informe o nome da instância.',true);
    return;
  }
  const requestId = asapcodeGenerateRequestId('rds');
  const ip = `10.${Math.floor(Math.random()*200)+10}.${Math.floor(Math.random()*200)+10}.15`;

  const resource = {
    type: 'RDS',
    name,
    ip,
    status: 'running',
    request_id: requestId,
    source: 'Catálogo mockado',
    engine: engine || 'postgres',
    instance_class: instanceClass || 'db.t3.micro',
    storage_gb: parseInt(storage||'20',10),
    multi_az: multiAz,
    env: env || 'dev',
    region: region || 'us-east-1'
  };

  asapcodeAddMockResource(resource);
  asapcodeShowMessage('rdsMessage',`Instância RDS mockada criada com Request ID ${requestId}. Abra o Dashboard para visualizar.`,false);
}