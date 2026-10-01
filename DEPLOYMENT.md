# Render Deployment

The `render.yaml` Blueprint deploys the Vite frontend as a Render Static Site from `Frontend/`. It builds the app, publishes `dist/`, rewrites client-side routes to `index.html`, and points API requests at the existing Render backend: `https://spendwise-by-rohan.onrender.com/api/v1`.

In Render, create a new Blueprint instance from this repository and apply the `render.yaml` configuration. Keep the existing backend service; the Blueprint only creates the frontend site.

The backend needs these environment variables:

- `MONGO_URL`: a production MongoDB connection string. Configure the database provider to accept connections from Render.
- `JWT_SECRET`: a long, randomly generated signing secret. Keep it private and consistent across deployments.

The frontend's `VITE_API_URL` is configured in the Blueprint and can be overridden in the Render dashboard. It should include the `/api/v1` prefix. The backend currently enables cross-origin requests; restrict allowed origins to the deployed frontend domain before production use.

For local backend setup, copy `Backend/.env.example` to `Backend/.env` and fill in the values.

Profile photos are stored as small data URLs in MongoDB and are limited to 1.8 MB. Existing transactions created before accounts were added have no owner and are not shown in new accounts.