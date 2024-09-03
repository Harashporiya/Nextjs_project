import {defineConfig} from "drizzle-kit"
export default defineConfig({
    schema:'./src/lib/db/schema.ts',
    out:'./drizzel',
    dialect:'postgresql',
    dbCredentials:{
        url:process.env.DATABASE_URL as string
    }
})