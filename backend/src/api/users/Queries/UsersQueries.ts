export const SELECT_USERS = "SELECT * FROM users";

export const SELECT_USER_BY_ID = "SELECT * FROM users WHERE id = $1";

export const INSERT_USER = `
INSERT INTO users (
    id,
    name,
    surname,
    age,
    areas_of_interest,
    subscription_level,
    subscription_newsletter,
    subscribed_opportunities_id,
    cellphone,
    email,
    password,
    additional_info,
    is_active,
    created_at,
    updated_at
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
    $11, $12, $13, $14, $15
)
`;

export const DELETE_USER = `
    UPDATE users SET is_active = false WHERE id = $1 RETURNING *
`;