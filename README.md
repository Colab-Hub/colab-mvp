# colab-mvp

### create table opportunities
```sql
create table opportunities
(
id                    uuid         not null
primary key,
title                 varchar(255) not null,
type                  varchar(50)  not null,
description           text,
start_date            date         not null,
end_date              date         not null,
location              varchar(255) not null,
is_remote             boolean      not null,
is_paid               boolean      not null,
contract_type         text[]       not null,
activity_area         text[]       not null,
experience_level      text[]       not null,
required_skills       text[]       not null,
time_commitment       varchar(50)  not null,
languages             text[]       not null,
feedback_time         varchar(255) not null,
applicants_emails     text[],
how_many_applicants   integer,
hirer_email           varchar(255) not null,
hirer_name            varchar(255) not null,
hirer_phone           varchar(50),
hirer_company         varchar(255) not null,
hirer_company_website varchar(255),
hirer_company_logo    varchar(255),
created_at            timestamp    not null,
updated_at            timestamp    not null,
additional_info       text,
is_active             boolean default true
);
```

  
### create table users
```sql
create table users
(
    id                          uuid                                not null
        primary key,
    name                        varchar(255)                        not null,
    surname                     varchar(255)                        not null,
    age                         integer                             not null,
    areas_of_interest           text[]                              not null,
    subscription_level          varchar(50)                         not null,
    subscription_newsletter     boolean                             not null,
    subscribed_opportunities_id uuid[]                              not null,
    cellphone                   varchar(20)                         not null,
    email                       varchar(255)                        not null
        unique,
    password                    varchar(255)                        not null,
    additional_info             text,
    is_active                   boolean                             not null,
    created_at                  timestamp default CURRENT_TIMESTAMP not null,
    updated_at                  timestamp default CURRENT_TIMESTAMP not null
);
```

### create table user_addresses
```sql
create table user_addresses
(
    id           uuid                                not null
        primary key,
    user_id      uuid                                not null
        constraint fk_user
            references users,
    zip_code     varchar(20)                         not null,
    street       varchar(255)                        not null,
    number       varchar(50)                         not null,
    complement   varchar(255),
    neighborhood varchar(255)                        not null,
    city         varchar(255)                        not null,
    state        varchar(255)                        not null,
    country      varchar(255)                        not null,
    created_at   timestamp default CURRENT_TIMESTAMP not null,
    updated_at   timestamp default CURRENT_TIMESTAMP not null
);
```