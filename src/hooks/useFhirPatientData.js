import { useEffect, useState, useCallback } from 'react'
import {
  normalizePatient,
  normalizeMedications,
  normalizeConditions,
  normalizeAllergies,
  normalizeVitals,
  normalizeLabs,
  normalizeCarePlans,
} from '../lib/fhirDataTransformers'

/**
 * Custom hook that fetches all FHIR clinical data for the current patient context.
 * Returns normalized data for display and LLM system prompt.
 */
export default function useFhirPatientData(client) {
  const [data, setData] = useState({
    patient: null,
    medications: [],
    conditions: [],
    allergies: [],
    vitals: [],
    labs: [],
    carePlans: [],
    loading: true,
    error: null,
  })

  const fetchAll = useCallback(async () => {
    if (!client?.patient?.id) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: 'No patient context available.',
      }))
      return
    }

    const pid = client.patient.id

    try {
      const results = await Promise.allSettled([
        client.patient.read(),
        client.request(`MedicationRequest?patient=${pid}&status=active`),
        client.request(`Condition?patient=${pid}`),
        client.request(`AllergyIntolerance?patient=${pid}`),
        client.request(
          `Observation?patient=${pid}&category=vital-signs&_sort=-date&_count=20`
        ),
        client.request(
          `Observation?patient=${pid}&category=laboratory&_sort=-date&_count=20`
        ),
        client.request(`CarePlan?patient=${pid}&status=active`),
      ])

      const getValue = (r) => (r.status === 'fulfilled' ? r.value : null)

      setData({
        patient: normalizePatient(getValue(results[0])),
        medications: normalizeMedications(getValue(results[1])),
        conditions: normalizeConditions(getValue(results[2])),
        allergies: normalizeAllergies(getValue(results[3])),
        vitals: normalizeVitals(getValue(results[4])),
        labs: normalizeLabs(getValue(results[5])),
        carePlans: normalizeCarePlans(getValue(results[6])),
        loading: false,
        error: null,
      })
    } catch (err) {
      setData((prev) => ({
        ...prev,
        loading: false,
        error: err.message || String(err),
      }))
    }
  }, [client])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  return data
}
