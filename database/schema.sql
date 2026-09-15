-- CampusOS Nexus PostgreSQL reference schema
-- Hibernate may create/update the schema locally; use this file for clean environments.

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS student_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255), bio VARCHAR(3000), university VARCHAR(255), degree VARCHAR(255),
    study_year VARCHAR(50), branch VARCHAR(255), github_url VARCHAR(500), linkedin_url VARCHAR(500),
    portfolio_url VARCHAR(500), resume_url VARCHAR(500), availability VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_interests (
    profile_id BIGINT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
    interest VARCHAR(255) NOT NULL,
    PRIMARY KEY (profile_id, interest)
);

CREATE TABLE IF NOT EXISTS skills (
    id BIGSERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL UNIQUE, category VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS student_skills (
    id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id) ON DELETE CASCADE, proficiency VARCHAR(50), evidence VARCHAR(500),
    UNIQUE (user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY, owner_id BIGINT NOT NULL REFERENCES users(id), title VARCHAR(255) NOT NULL,
    description VARCHAR(3000), domain VARCHAR(255), max_members INTEGER, deadline DATE,
    duration_weeks INTEGER, status VARCHAR(50) NOT NULL DEFAULT 'OPEN'
);

CREATE TABLE IF NOT EXISTS project_skills (
    id BIGSERIAL PRIMARY KEY, project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    skill_id BIGINT NOT NULL REFERENCES skills(id), UNIQUE (project_id, skill_id)
);

CREATE TABLE IF NOT EXISTS project_applications (
    id BIGSERIAL PRIMARY KEY, project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    message VARCHAR(1000), UNIQUE (project_id, user_id)
);

CREATE TABLE IF NOT EXISTS teams (
    id BIGSERIAL PRIMARY KEY, project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    created_by BIGINT REFERENCES users(id), name VARCHAR(255) NOT NULL, description VARCHAR(2000), domain VARCHAR(255),
    UNIQUE (project_id, name)
);

CREATE TABLE IF NOT EXISTS team_members (
    id BIGSERIAL PRIMARY KEY, team_id BIGINT NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, role VARCHAR(100), UNIQUE (team_id, user_id)
);

CREATE TABLE IF NOT EXISTS portfolios (
    id BIGSERIAL PRIMARY KEY, user_id BIGINT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL, description VARCHAR(2000), project_url VARCHAR(500), image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS reviews (
    id BIGSERIAL PRIMARY KEY, reviewer_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewed_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5), comment VARCHAR(1000), created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_projects_owner ON projects(owner_id);
CREATE INDEX IF NOT EXISTS idx_project_applications_project ON project_applications(project_id);
CREATE INDEX IF NOT EXISTS idx_student_skills_user ON student_skills(user_id);
