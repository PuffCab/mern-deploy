const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://mern-deploy-back.vercel.app"
    : "http://localhost:5001";
export { serverURL };
