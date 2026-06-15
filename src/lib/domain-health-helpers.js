export const HEALTH_STATUSES = ['healthy', 'warning', 'missing', 'unknown']

const MOCK_HEALTH_BY_DOMAIN = {
  'chaudhery.com': {
    dns: 'healthy',
    nameservers: 'healthy',
    email: 'healthy',
    website: 'healthy',
    aRecord: '185.199.108.153',
    nameserverList: ['ns1.chaudhery.com', 'ns2.chaudhery.com'],
    mxRecords: ['mail.chaudhery.com'],
    websiteUrl: 'https://chaudhery.com',
    httpStatus: 200,
  },
  'viralpk.com': {
    dns: 'healthy',
    nameservers: 'healthy',
    email: 'healthy',
    website: 'healthy',
    aRecord: '45.86.155.120',
    nameserverList: ['ns1.spaceship.com', 'ns2.spaceship.com'],
    mxRecords: ['mail.viralpk.com'],
    websiteUrl: 'https://viralpk.com',
    httpStatus: 200,
  },
  'backupproof.dev': {
    dns: 'unknown',
    nameservers: 'healthy',
    email: 'missing',
    website: 'missing',
    aRecord: '—',
    nameserverList: ['ns1.backupproof.dev'],
    mxRecords: [],
    websiteUrl: 'https://backupproof.dev',
    httpStatus: null,
  },
  'unitystore.com.pk': {
    dns: 'unknown',
    nameservers: 'healthy',
    email: 'missing',
    website: 'missing',
    aRecord: '—',
    nameserverList: ['ns1.unitystore.com.pk'],
    mxRecords: [],
    websiteUrl: 'https://unitystore.com.pk',
    httpStatus: null,
  },
  'kotaddu.pk': {
    dns: 'unknown',
    nameservers: 'healthy',
    email: 'missing',
    website: 'missing',
    aRecord: '—',
    nameserverList: ['ns1.kotaddu.pk'],
    mxRecords: [],
    websiteUrl: 'https://kotaddu.pk',
    httpStatus: null,
  },
  'founder-os.chaudhery.com': {
    dns: 'healthy',
    nameservers: 'healthy',
    email: 'warning',
    website: 'healthy',
    aRecord: '45.86.155.120',
    nameserverList: ['ns1.chaudhery.com'],
    mxRecords: [],
    websiteUrl: 'https://founder-os.chaudhery.com',
    httpStatus: 200,
  },
}

export function getDefaultHealthForDomain(name) {
  const mock = MOCK_HEALTH_BY_DOMAIN[String(name || '').toLowerCase()]
  const today = new Date().toISOString().slice(0, 10)
  return {
    dns: mock?.dns || 'unknown',
    nameservers: mock?.nameservers || 'unknown',
    email: mock?.email || 'unknown',
    website: mock?.website || 'unknown',
    aRecord: mock?.aRecord || '—',
    nameserverList: mock?.nameserverList || [],
    mxRecords: mock?.mxRecords || [],
    websiteUrl: mock?.websiteUrl || (name ? `https://${name}` : ''),
    httpStatus: mock?.httpStatus ?? null,
    lastChecked: today,
  }
}

export function normalizeDomainHealth(record) {
  const defaults = getDefaultHealthForDomain(record.name)
  const health = record.health || {}
  return {
    ...defaults,
    ...health,
    nameserverList: health.nameserverList || defaults.nameserverList,
    mxRecords: health.mxRecords || defaults.mxRecords,
  }
}

export function healthVariant(status) {
  if (status === 'healthy') return 'success'
  if (status === 'warning') return 'warning'
  if (status === 'missing') return 'danger'
  return 'outline'
}

export function healthLabel(status) {
  if (!status) return 'Unknown'
  return status.charAt(0).toUpperCase() + status.slice(1)
}

export function healthSymbol(status) {
  if (status === 'healthy') return '✓'
  if (status === 'warning') return '!'
  if (status === 'missing') return '✕'
  return '—'
}
