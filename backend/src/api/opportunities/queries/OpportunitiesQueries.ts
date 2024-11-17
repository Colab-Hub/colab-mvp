export const SELECT_OPPORTUNITIES = "SELECT * FROM opportunities";
export const SELECT_OPPORTUNITY_BY_ID = "SELECT * FROM opportunities WHERE id = $1";

export const INSERT_OPPORTUNITY = `
  INSERT INTO opportunities (
    id,
    title,
    type,
    description,
    start_date,
    end_date,
    location,
    is_remote,
    is_paid,
    contract_type,
    activity_area,
    experience_level,
    required_skills,
    time_commitment,
    languages,
    feedback_time,
    applicants_emails,
    how_many_applicants,
    hirer_email,
    hirer_name,
    hirer_phone,
    hirer_company,
    hirer_company_website,
    hirer_company_logo,
    created_at,
    updated_at,
    additional_info,
    is_active
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15, $16, $17, $18,
    $19, $20, $21, $22, $23, $24, $25, $26, $27, $28
  )
`;

export const DELETE_OPPORTUNITY = `
    UPDATE opportunities SET is_active = false WHERE id = $1 RETURNING *
`;
