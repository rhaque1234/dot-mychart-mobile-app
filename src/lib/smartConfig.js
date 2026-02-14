export const SMART_SCOPES =
  'patient/*.* user/*.* launch launch/patient launch/encounter openid fhirUser profile offline_access'

export const TOKEN_DESCRIPTIONS = {
  access_token: 'The access token which is part of the token response. In this server this is a JWT but it can be any string elsewhere.',
  token_type: 'This should always have the fixed value Bearer.',
  expires_in: 'The lifetime of the access token in seconds.',
  scope: 'All the scopes granted after successful authorization.',
  id_token: 'The ID token (if any).',
  need_patient_banner: 'If false, the app can omit some patient information (like name, DOB and age) because that is already displayed within the EHR UI.',
  smart_style_url: 'Apps can use these style settings to make sure they blend well with the appearance of the hosting EHR.',
  patient: 'The ID of currently active patient within the EHR session.',
  encounter: 'The ID of currently active encounter within the EHR session.',
  refresh_token: 'Token for obtaining new access tokens.',
}
