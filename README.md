# Backend (rwplatform)

Reading & Writing platforma backendi. Express.js + MongoDB.

## Boshlash

```bash
cp .env.example .env
# .env ichidagi qiymatlarni to'ldiring (JWT_SECRET, MONGO_URI, ANTHROPIC_API_KEY)

npm install
npm run dev
```

`http://localhost:4000/health` ochilsa — server ishlayapti.

## Mavjud endpoint'lar (hozir)

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET  /api/v1/auth/me`
- `POST /api/v1/auth/change-password`

## Keyingi qadamlar

`platform_architects/logic/03-api-specification.md` bo'yicha:
- Users / Groups CRUD
- Tasks bank
- Task assignments
- Submissions (Reading + Writing)
- AI evaluator (Claude)
- Grades + complaints
- Final test
- Reports
- Seed scriptlari (.docx fayllardan)
