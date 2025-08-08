const jwt = require("jsonwebtoken");

const secret = "ae28541f2a6a6a4e069d745372f2ac45342797662da0503d216a29e5b27639d7e6eaa081238f5c10989f08cfa011c5c4da84507635dea06382ad15742bbe55b1";
const now = Math.floor(Date.now() / 1000);
const exp = now + 60 * 60 * 24 * 365 * 5; // صالح 5 سنوات

const anonToken = jwt.sign(
  {
    role: "anon",
    iss: "supabase-demo",
    iat: now,
    exp: exp,
  },
  secret,
  { algorithm: "HS256" }
);

const serviceToken = jwt.sign(
  {
    role: "service_role",
    iss: "supabase-demo",
    iat: now,
    exp: exp,
  },
  secret,
  { algorithm: "HS256" }
);

console.log("ANON_KEY =", anonToken);
console.log("SERVICE_ROLE_KEY =", serviceToken);
