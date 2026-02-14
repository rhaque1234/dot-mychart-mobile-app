/**
 * Pure functions to normalize FHIR R4 Bundle responses into display-friendly shapes.
 */

function getCodeableConceptDisplay(cc) {
  if (!cc) return 'Unknown'
  return cc.text || cc.coding?.[0]?.display || cc.coding?.[0]?.code || 'Unknown'
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function getEntries(bundle) {
  return bundle?.entry?.map((e) => e.resource).filter(Boolean) || []
}

export function normalizePatient(resource) {
  if (!resource) return null
  const name = resource.name?.[0]
  const given = name?.given?.join(' ') || ''
  const family = name?.family || ''
  const fullName = `${given} ${family}`.trim() || 'Unknown Patient'

  let age = ''
  if (resource.birthDate) {
    const bd = new Date(resource.birthDate)
    const now = new Date()
    age = Math.floor((now - bd) / (365.25 * 24 * 60 * 60 * 1000))
  }

  const mrn =
    resource.identifier?.find(
      (id) => id.type?.coding?.[0]?.code === 'MR'
    )?.value || resource.id

  return {
    id: resource.id,
    name: fullName,
    firstName: given.split(' ')[0] || fullName,
    birthDate: formatDate(resource.birthDate),
    gender: resource.gender || 'unknown',
    age,
    mrn,
  }
}

export function normalizeMedications(bundle) {
  return getEntries(bundle).map((r) => {
    const medName =
      getCodeableConceptDisplay(r.medicationCodeableConcept) ||
      r.medicationReference?.display ||
      'Unknown Medication'

    const dosageInst = r.dosageInstruction?.[0]
    const dosage = dosageInst?.doseAndRate?.[0]?.doseQuantity
      ? `${dosageInst.doseAndRate[0].doseQuantity.value} ${dosageInst.doseAndRate[0].doseQuantity.unit || ''}`
      : dosageInst?.text || ''

    const route = getCodeableConceptDisplay(dosageInst?.route) || ''
    const frequency = dosageInst?.timing?.code?.text ||
      dosageInst?.timing?.repeat?.frequency
        ? `${dosageInst?.timing?.repeat?.frequency}x per ${dosageInst?.timing?.repeat?.period} ${dosageInst?.timing?.repeat?.periodUnit || ''}`
        : ''

    return {
      id: r.id,
      name: medName,
      status: r.status || 'unknown',
      dosage,
      route: route !== 'Unknown' ? route : '',
      frequency,
      authoredOn: formatDate(r.authoredOn),
    }
  })
}

export function normalizeConditions(bundle) {
  return getEntries(bundle).map((r) => ({
    id: r.id,
    display: getCodeableConceptDisplay(r.code),
    clinicalStatus: r.clinicalStatus?.coding?.[0]?.code || 'unknown',
    verificationStatus: r.verificationStatus?.coding?.[0]?.code || '',
    onsetDate: formatDate(r.onsetDateTime),
  }))
}

export function normalizeAllergies(bundle) {
  return getEntries(bundle).map((r) => {
    const reaction = r.reaction?.[0]
    return {
      id: r.id,
      substance: getCodeableConceptDisplay(r.code),
      category: r.category?.[0] || '',
      criticality: r.criticality || '',
      severity: reaction?.severity || '',
      reaction: reaction?.manifestation
        ?.map((m) => getCodeableConceptDisplay(m))
        .join(', ') || '',
    }
  })
}

export function normalizeVitals(bundle) {
  return getEntries(bundle).map((r) => ({
    id: r.id,
    code: r.code?.coding?.[0]?.code || '',
    display: getCodeableConceptDisplay(r.code),
    value: r.valueQuantity?.value ?? r.valueString ?? '',
    unit: r.valueQuantity?.unit || '',
    date: formatDate(r.effectiveDateTime),
    status: r.status || '',
  }))
}

export function normalizeLabs(bundle) {
  return getEntries(bundle).map((r) => {
    const refRange = r.referenceRange?.[0]
    let referenceRange = ''
    if (refRange?.low && refRange?.high) {
      referenceRange = `${refRange.low.value}-${refRange.high.value} ${refRange.high.unit || ''}`
    } else if (refRange?.text) {
      referenceRange = refRange.text
    }

    return {
      id: r.id,
      code: r.code?.coding?.[0]?.code || '',
      display: getCodeableConceptDisplay(r.code),
      value: r.valueQuantity?.value ?? r.valueString ?? '',
      unit: r.valueQuantity?.unit || '',
      date: formatDate(r.effectiveDateTime),
      referenceRange,
      status: r.status || '',
    }
  })
}

export function normalizeCarePlans(bundle) {
  return getEntries(bundle).map((r) => ({
    id: r.id,
    title: r.title || getCodeableConceptDisplay(r.category?.[0]) || 'Care Plan',
    status: r.status || 'unknown',
    category: r.category?.[0]?.coding?.[0]?.display || '',
    activities:
      r.activity?.map(
        (a) => a.detail?.code?.coding?.[0]?.display || a.detail?.description || ''
      ).filter(Boolean) || [],
  }))
}
