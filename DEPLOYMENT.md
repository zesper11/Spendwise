# Vercel Deployment

Import the repository into Vercel with the repository root as the project root. The root `vercel.json` builds the Vite app from `Frontend/`, serves its SPA routes, and sends `/api/*` requests to the Express function in `api/`.

Set these environment variables in the Vercel project settings:

- `MONGO_URL`: a production MongoDB connection string. Configure the database provider to accept connections from Vercel.
- `JWT_SECRET`: a long, randomly generated signing secret. Keep it private and consistent across deployments.

No frontend API URL is required for a single-domain deployment. The frontend sends production API requests to `/api/v1`; local development continues to use `http://localhost:5000/api/v1`.

For local setup, copy `Backend/.env.example` to `Backend/.env` and fill in the values. Deploy with the Vercel CLI from the repository root or connect the repository in the Vercel dashboard.

Profile photos are stored as small data URLs in MongoDB and are limited to 1.8 MB. Existing transactions created before accounts were added have no owner and are not shown in new accounts.